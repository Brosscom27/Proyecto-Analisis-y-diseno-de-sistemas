import express from 'express';
import Mensaje from './models/mensaje.js';

const router = express.Router();

// Ruta para aceptar una solicitud de asesoría
router.post('/asesorias/:id/aceptar', async (req, res) => {
    try {
        const mensaje = await Mensaje.findById(req.params.id);
        if (mensaje) {
            // Lógica para aceptar la solicitud
            mensaje.estado = 'aceptada'; // Suponiendo que hay un campo 'estado'
            await mensaje.save();
        }
        res.redirect('/asesoriasmsj'); // Redirige de nuevo a la página de solicitudes
    } catch (err) {
        console.error('Error al aceptar la solicitud:', err);
        res.redirect('/asesoriasmsj?error=true'); // Manejo de errores
    }
});

// Ruta para rechazar una solicitud de asesoría
router.post('/asesorias/:id/rechazar', async (req, res) => {
    try {
        const mensaje = await Mensaje.findById(req.params.id);
        if (mensaje) {
            // Lógica para rechazar la solicitud
            mensaje.estado = 'rechazada'; // Suponiendo que hay un campo 'estado'
            await mensaje.save();
        }
        res.redirect('/asesoriasmsj'); // Redirige de nuevo a la página de solicitudes
    } catch (err) {
        console.error('Error al rechazar la solicitud:', err);
        res.redirect('/asesoriasmsj?error=true'); // Manejo de errores
    }
});

export default router;
