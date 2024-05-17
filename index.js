import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import dotenv from "dotenv";
import login from "./autentificacion.js"

dotenv.config();

const port = process.env.PORT || 8000
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/public"));

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
