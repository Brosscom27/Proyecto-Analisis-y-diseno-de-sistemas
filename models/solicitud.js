import mongoose from "mongoose";

const solicitudSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    }
})

const Solicitud = mongoose.model('Solicitud', solicitudSchema)

export default Solicitud; 