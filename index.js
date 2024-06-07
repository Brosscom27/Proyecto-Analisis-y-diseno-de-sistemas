import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import dotenv from "dotenv";
import login from "./autentificacion.js"
import data from "./data.json" assert { type: "json" };
import DB from "./config/db.js";

import Asesoria from "./models/asesoria.js";

dotenv.config();

const port = process.env.PORT || 8000
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const asesorias = data;

app.use(express.json());

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

app.get("/inicio", (req, res) => {
    res.sendFile(__dirname + "/layouts/main.html")
});

app.post("/api/login", login);

app.get("/registrer", (req, res) =>{
    res.sendFile(__dirname + "/layouts/iniciar_sesion.html");
});


//Vistas de prueba
app.get("/testEstudiantes", (req,res) => {
    res.render("mainEstudiantes")
})

app.get("/testAsesores", (req,res) => {
    res.render("mainAsesores")
})

app.get("/mensajes", (req,res) => {
    res.render("mensajes")
})

app.get("/asesorias", async (req, res) => {
    const asesorias = await Asesoria.find({})
    res.render('asesorias.ejs', {asesorias})
});