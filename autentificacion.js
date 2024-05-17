import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const usuarios = [{
    user: "Mario",
    correo: "tonoto@gmail.com",
    password: "tonoto"
}]

export default async function login(req,res){
    console.log(req.body)
    const user = req.body.user
    const password = req.body.password
    if(!user || !password){
        return res.status(400).send({status: "ERROR", message: "Los campos no estan completados"})
    }
    const userCheck = usuarios.find(usuarios => usuarios.user == user)
    if(!userCheck){
        return res.status(400).send({status: "ERROR", message: "Error login"})
    }
    const passwordCheck = usuarios.find(usuarios => usuarios.password == password)

    if(!passwordCheck){
        return res.status(400).send({status: "ERROR", message: "Error loginn"})
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
    res.send({status: "ok", message: "Usuario logeado", redirect:"/inicio"})
}