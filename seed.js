import Asesoria from "./models/asesoria.js";
import DB from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();

DB.connectDB(process.env.DB_URI);

/*
const a = new Asesoria({
    nombre: "Física",
    horario: '5pm - 6pm',
    tutor: 'Mario'
})

a.save().then(a=> {
    console.log(a)
})
.catch(e => {
    console.log(e)
})
*/

/*
 
const seedAsesorias = [
    {
        nombre: "Quimica",
        horario: '5pm - 8pm',
        tutor: 'Monse'
    },
    {
        nombre: "Español",
        horario: '3pm - 4pm',
        tutor: 'Xime'
    },
    {
        nombre: "Quimica",
        horario: '1pm - 4pm',
        tutor: 'Selene'
    }
]

Asesoria.insertMany(seedAsesorias)
.then(res=> {
    console.log(res)
})
.catch(e => {
    console.log(e)
})
 */