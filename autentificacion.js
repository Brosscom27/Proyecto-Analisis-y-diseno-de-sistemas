import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usuarios = [{
    user: "Mario",
    correo: "tonoto@gmail.com",
    password: "tonoto",
    role: "alumno",
    boleta: "2022311400",
    curp: "COCM271003",
    campus: "UPIIT"
},
{
    user: "Samuel",
    correo: "tonoto2@gmail.com",
    password: "tonoto2",
    role: "asesor",
    telefono: "2461481975",
    area: "Matematicas",
    curp: "SAM24"
},
{
    user: "Selene",
    correo: "tonoto3@gmail.com",
    password: "tonoto3",
    role: "alumno",
    boleta: "2545155644",
    curp: "SELENE23",
    campus: "ESIA"
},
{
    user: "Ana",
    correo: "ana@gmail.com",
    password: "ana123",
    role: "alumno",
    boleta: "2023123456",
    curp: "ANAC901010",
    campus: "UPIICSA"
},
{
    user: "Carlos",
    correo: "carlos@gmail.com",
    password: "carlos123",
    role: "asesor",
    telefono: "5551234567",
    area: "Fisica",
    curp: "CARF750102HDFRRR00"
},
{
    user: "Laura",
    correo: "laura@gmail.com",
    password: "laura123",
    role: "alumno",
    boleta: "2019456789",
    curp: "LAUR870304HDFRRL01",
    campus: "UPIIG"
}]

export async function login(req,res){
    console.log(req.body)
    const user = req.body.user
    const password = req.body.password
    if(!user || !password){
        return res.status(400).send({status: "ERROR", message: "Los campos no estan completados"})
    }
    const userCheck = usuarios.find(usuarios => usuarios.user == user  && usuarios.password == password)
    if(!userCheck){
        return res.status(400).send({status: "ERROR", message: "Error login"})
    }

    const token = jsonwebtoken.sign(
        {user: userCheck.user}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRATION}
    );

    const coockieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000),
        path:"/"
    }

    res.cookie("jwt", token, coockieOption);

    const redirect = userCheck.role === "alumno" ? "testEstudiantes" : "testAsesores";
    res.send({ status: "ok", message: "Usuario logeado", redirect});
}
