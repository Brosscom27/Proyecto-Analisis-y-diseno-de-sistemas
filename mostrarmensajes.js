import express from 'express';
import Mensaje from "./models/mensaje.js";
import Asesoria from "./models/asesoria.js";

const router = express.Router();

router.get('/asesoriasmsj', async (req, res) => {
    try {
        // Filtrar solo las solicitudes pendientes
        const mensajes = await Mensaje.find({ estado: 'pendiente' }).populate('asesoriaId');
        res.render('asesoriasmsj', { mensajes });
    } catch (err) {
        console.error('Error al obtener mensajes:', err);
        res.redirect('/ruta?error=true');
    }
});


export default router;
