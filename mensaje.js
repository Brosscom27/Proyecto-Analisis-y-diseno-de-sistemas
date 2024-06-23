import express from "express";
const router = express.Router();
import Mensaje from "./models/mensaje.js";  // Asegúrate de tener el modelo Mensaje

router.post('/enviarMensaje', async (req, res) => {
    try {
        const nuevoMensaje = new Mensaje({
            asesoriaId: req.body.asesoriaId,
            texto: req.body.mensaje
        });
        await nuevoMensaje.save();
        res.redirect('/testEstudiantes');
        
    } catch (err) {
        console.error(err);
        res.redirect('/confirmacion?enviado=false');
    }
});

export default router;
