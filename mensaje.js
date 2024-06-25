import express from 'express';
import Mensaje from './models/mensaje.js';  // Asegúrate de tener el modelo Mensaje

const router = express.Router();

router.post('/enviarMensaje', async (req, res) => {
    try {
        const { asesoriaId, mensaje, solicitante } = req.body;
        const nuevoMensaje = new Mensaje({
            asesoriaId,
            texto: mensaje,
            solicitante
        });
        await nuevoMensaje.save();
        res.redirect('/testEstudiantes');
    } catch (err) {
        console.error(err);
        res.redirect('/testEstudiantes'); // Puedes cambiar esta redirección según tu manejo de errores
    }
});

export default router;
