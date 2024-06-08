import mongoose from "mongoose";

const asesoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    tutor: {
        type: String,
        required: true
    },
    contacto: {
        type: String,
        required: true
    }
})

const Asesoria = mongoose.model('Asesoria', asesoriaSchema)

export default Asesoria; 