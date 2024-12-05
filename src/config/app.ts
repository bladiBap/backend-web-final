import express from "express";

import { CuestionarioController } from "../application/controllers/cuestionarios/cuestionarioController";
import { PreguntaController } from "../application/controllers/cuestionarios/preguntaController";
import { MisionController } from "../application/controllers/mision/misionController";
import { NivelController } from "../application/controllers/nivel/nivelController";
import { TopicoController } from "../application/controllers/topicos/topicoController";
import { PowerUpController } from "../application/controllers/powerup/powerupController";

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

const cuestionarioController = new CuestionarioController();
const preguntaController = new PreguntaController();
const misionController = new MisionController();

const nivelController = new NivelController();
const topicoController = new TopicoController();
const powerupController = new PowerUpController();

// Routes for Cuestionarios
app.get('/api/cuestionarios', (req, res) => cuestionarioController.getAllCuestionarios(req, res));
app.post('/api/cuestionarios', (req, res) => cuestionarioController.createCuestionario(req, res));
app.get('/api/cuestionarios/:id', (req, res) => cuestionarioController.getCuestionarioById(req, res));
app.put('/api/cuestionarios/:id', (req, res) => cuestionarioController.updateCuestionario(req, res));
app.delete('/api/cuestionarios/:id', (req, res) => cuestionarioController.deleteCuestionario(req, res));

// Routes for Preguntas
app.get('/api/preguntas', (req, res) => preguntaController.getAllPreguntas(req, res));
app.post('/api/preguntas', (req, res) => preguntaController.createPregunta(req, res));
app.get('/api/preguntas/:id', (req, res) => preguntaController.getPreguntaById(req, res));
app.put('/api/preguntas/:id', (req, res) => preguntaController.updatePregunta(req, res));
app.delete('/api/preguntas/:id', (req, res) => preguntaController.deletePregunta(req, res));

// Routes for Misiones

app.get("/api/mision", (req, res) => misionController.getAllMision(req, res));
app.post("/api/mision", (req, res) => misionController.createMision(req, res));
app.get("/api/mision/:id", (req, res) => misionController.getMisionById(req, res));
app.put("/api/mision/:id", (req, res) => misionController.updateMision(req, res));
app.delete("/api/mision/soft/:id", (req, res) => misionController.deleteSoftMision(req, res));

// Routes for Nivel
app.get('/api/niveles', (req, res) => nivelController.getAllNiveles(req, res));
app.post('/api/niveles', (req, res) => nivelController.createNivel(req, res));
app.get('/api/niveles/:id', (req, res) => nivelController.getNivelById(req, res));
app.put('/api/niveles/:id', (req, res) => nivelController.updateNivel(req, res));
app.delete('/api/niveles/:id', (req, res) => nivelController.deleteNivel(req, res));

// Routes for Topico
app.get('/api/topicos', (req, res) => topicoController.getAllTopicos(req, res));
app.post('/api/topicos', (req, res) => topicoController.createTopico(req, res));
app.get('/api/topicos/:id', (req, res) => topicoController.getTopicoById(req, res));
app.put('/api/topicos/:id', (req, res) => topicoController.updateTopico(req, res));
app.delete('/api/topicos/:id', (req, res) => topicoController.deleteTopico(req, res));

// Routes for Powerup
app.get('/api/powerup', (req, res) => powerupController.getAllPowerup(req, res));
app.post('/api/powerup', (req, res) => powerupController.createPowerup(req, res));
app.get('/api/powerup/:id', (req, res) => powerupController.getPowerUpById(req, res));
app.put('/api/powerup/:id', (req, res) => powerupController.updatePowerup(req, res));
app.delete('/api/powerup/:id', (req, res) => powerupController.deletePowerup(req, res));


// Server setup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Server on port", process.env.PORT || 4000);

export default app;