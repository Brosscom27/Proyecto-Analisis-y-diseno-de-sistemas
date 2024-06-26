import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { usuarios, login } from "./autentificacion.js";
import DB from "./config/db.js";
import authenticateToken from "./middleware/middleware.js"; // Importa tu middleware de autenticación
import Mensaje from "./mensaje.js";
import AsesoriaRouter from "./mostrarmensajes.js";
import Estado from "./aceptar.js";
import ModelMensaje from './models/mensaje.js'; 

import Asesoria from "./models/asesoria.js";
import Solicitud from "./models/solicitud.js";

dotenv.config();

const port = process.env.PORT || 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

// Conectar a MongoDB
DB.connectDB(process.env.DB_URI);

// Usar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "layouts"));

app.listen(port, () => {
    console.log(`Conectado a http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/layouts/bienvenido.html");
});

app.post("/api/login", login);

app.get("/registrer", (req, res) => {
    res.sendFile(__dirname + "/layouts/iniciar_sesion.html");
});

// Ruta de cierre de sesión
app.post('/logout', (req, res) => {
    res.clearCookie('jwt'); // Asegúrate de usar el nombre de tu cookie de sesión
    res.status(200).send('Cierre de sesión exitoso');
});


// Vistas de prueba
app.get("/testEstudiantes", authenticateToken, async (req, res) => {
    const user = usuarios.find(usuarios => usuarios.user == req.user.user && usuarios.role == "alumno");
    if (!user) return res.redirect('/registrer');
    console.log(user);
    res.render("mainEstudiantes", { user });
});

app.get("/testAsesores", authenticateToken, async (req, res) => {
    const user = usuarios.find(usuarios => usuarios.user == req.user.user && usuarios.role == "asesor");
    if (!user) return res.redirect('/registrer');
    res.render("mainAsesores", { user });
});

app.use("/", authenticateToken, AsesoriaRouter);
app.use("/", authenticateToken, Estado);

app.get("/mensajes", authenticateToken, (req, res) => {
    res.render("mensajes");
});

app.get('/misMensajes', authenticateToken, async (req, res) => {
    try {
        const mensajes = await ModelMensaje.find({ solicitante: req.user.user }).populate('asesoriaId');
        res.render('misMensajes', { mensajes});
    } catch (error) {
        console.log("Error fetching messages:", error);
        res.status(500).send('Error al obtener mensajes');
    }
});




// Asesorias alumnos
app.get("/asesorias", authenticateToken, async (req, res) => {
    const asesorias = await Asesoria.find({});
    res.render('asesorias.ejs', { asesorias });
});

// Asesorias alumnos
app.get("/asesoriasProfesor", authenticateToken, async (req, res) => {
    const asesorias = await Asesoria.find({});
    res.render('asesoriasProfesores.ejs', { asesorias });
});

// Crear una asesoria (Recuerda que son dos rutas) Solo visible para maestros
app.get('/asesorias/new', authenticateToken, (req, res) => {
    res.render('asesoriasNew');
});

app.post('/asesorias', authenticateToken, async (req, res) => {
    const nuevaAsesoria = new Asesoria(req.body);
    await nuevaAsesoria.save();
    res.redirect('/asesoriasProfesor');
});

app.get('/solicitud', authenticateToken, (req, res) => {
    res.send('Has hecho una solicitud');
});

// Ventana de alumnos para crear una solicitud
app.get('/solicitud/new', authenticateToken, (req, res) => {
    res.render('solicitudNew');
});

app.post('/solicitud', authenticateToken, async (req, res) => {
    try {
        const nuevaSolicitud = new Solicitud(req.body);
        await nuevaSolicitud.save();
        res.status(200).json({ message: 'Tu solicitud ha sido enviada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar la solicitud' });
    }
});

app.use("/", authenticateToken, Mensaje);

// Mostrar una asesoría en específico, solo visible para alumnos
app.get('/asesorias/:id', authenticateToken, async (req, res) => {
    const user = usuarios.find(u => u.user === req.user.user);
    if (!user) return res.redirect('/registrer');

    const asesoriaId = req.params.id; // Asegúrate de usar el parámetro correcto de la URL
    const asesoria = await Asesoria.findById(asesoriaId);

    if (!asesoria) {
        return res.sendStatus(404); // Manejo de error si no se encuentra la asesoría
    }

    res.render('asesoriasShow', { user, asesoria });
});
