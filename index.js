import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';
import {fileURLToPath} from "url";
import dotenv from "dotenv";
import {usuarios, login} from "./autentificacion.js";
import DB from "./config/db.js";
import authenticateToken from "./middleware/middleware.js";
import Mensaje from "./mensaje.js";
import AsesoriaRouter from "./mostrarmensajes.js";
import Estado from "./aceptar.js"

import Asesoria from "./models/asesoria.js";
import Solicitud from "./models/solicitud.js";

dotenv.config();


const port = process.env.PORT || 8000
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

//Conectar a mongo
DB.connectDB(process.env.DB_URI);

//Usar EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "layouts"))

app.listen(port, () =>{
    console.log(`Conect http:localhost:${port}`)
});

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/layouts/bienvenido.html");
});

app.post("/api/login", login);

app.get("/registrer", (req, res) =>{
    res.sendFile(__dirname + "/layouts/iniciar_sesion.html");
});


//Vistas de prueba
app.get("/testEstudiantes", authenticateToken, async (req,res) => {
    const user = await usuarios.find(usuarios => usuarios.user == req.user.user && usuarios.role == "alumno")
    console.log(user)
    res.render("mainEstudiantes", {user})
})

app.get("/testAsesores", authenticateToken, async (req,res) => {
    const user = await usuarios.find(usuarios => usuarios.user == req.user.user && usuarios.role == "asesor")
    res.render("mainAsesores", {user})
})

app.use("/", AsesoriaRouter);

app.use("/", Estado)

app.get("/mensajes", (req,res) => {
    res.render("mensajes")
})

//Asesorias alumnos
app.get("/asesorias", async (req, res) => {
    const asesorias = await Asesoria.find({})
    res.render('asesorias.ejs', {asesorias})
});

//Asesorias alumnos
app.get("/asesoriasProfesor", async (req, res) => {
    const asesorias = await Asesoria.find({})
    res.render('asesoriasProfesores.ejs', {asesorias})
});

//Crear una asesoria (Recurda que son dos rutas) Solo visible para maestros
app.get('/asesorias/new',(req,res) => {
    res.render('asesoriasNew')
})

app.post('/asesorias', async(req,res) => {
    const nuevaAsesoria = new Asesoria(req.body);
    await nuevaAsesoria.save();
    res.redirect(`/asesoriasProfesor`)
})

app.get('/solicitud', (req,res) => {
    res.send('Has hecho una solicitud')
})

//Ventana de alumnos para crear una solicitud
app.get('/solicitud/new',(req,res) => {
    res.render('solicitudNew')
})

app.post('/solicitud', async (req, res) => {
    try {
        const nuevaSolicitud = new Solicitud(req.body);
        await nuevaSolicitud.save();
        res.status(200).json({ message: "Tu solicitud ha sido enviada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al enviar la solicitud" });
    }
});

app.use("/", Mensaje);



//Mostrar una asesoría en específico, solo visible para alumnos
app.get('/asesorias/:id', async(req,res) => {
    const {id} = req.params;
    const asesoria = await Asesoria.findById(id);
    res.render('asesoriasShow', {asesoria})
})




