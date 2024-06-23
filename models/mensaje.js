import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
    asesoriaId: {
        type: Schema.Types.ObjectId,
        ref: 'Asesoria',
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    estado: {type: String,
        default: 'pendiente'
    }
}, {
    timestamps: true
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

export default Mensaje;
