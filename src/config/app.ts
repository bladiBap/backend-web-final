import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { CuestionarioController } from "../application/controllers/cuestionarios/cuestionarioController";
import { PreguntaController } from "../application/controllers/cuestionarios/preguntaController";
import { MisionController } from "../application/controllers/mision/misionController";
import { UsuarioController } from "../application/controllers/usuario/usuarioController";
import { LogroController } from "../application/controllers/logro/logroController";
import { NivelController } from "../application/controllers/nivel/nivelController";
import { TopicoController } from "../application/controllers/topicos/topicoController";
import { PowerUpController } from "../application/controllers/powerup/powerupController";

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use(morgan("dev"));

const cuestionarioController = new CuestionarioController();
const preguntaController = new PreguntaController();
const misionController = new MisionController();
const usuarioController = new UsuarioController();
const logroController = new LogroController();

const nivelController = new NivelController();
const topicoController = new TopicoController();
const powerupController = new PowerUpController();

// Routes for Cuestionarios
app.get('/api/cuestionarios', (req, res) => cuestionarioController.getAllCuestionarios(req, res));
app.post('/api/cuestionarios', (req, res) => cuestionarioController.createCuestionario(req, res));
app.get('/api/cuestionarios/usuario', (req, res) => cuestionarioController.findByUserId(req, res));
app.get('/api/cuestionarios/:id', (req, res) => cuestionarioController.getCuestionarioById(req, res));
app.put('/api/cuestionarios/:id', (req, res) => cuestionarioController.updateCuestionario(req, res));
app.delete('/api/cuestionarios/:id', (req, res) => cuestionarioController.deleteCuestionario(req, res));
app.get('/api/cuestionarios/:id/ranking', (req, res) => cuestionarioController.getRanking(req, res));

// Routes for Preguntas
app.get('/api/preguntas', (req, res) => preguntaController.getAllPreguntas(req, res));
app.post('/api/preguntas', (req, res) => preguntaController.createPregunta(req, res));
app.get('/api/preguntas/:id', (req, res) => preguntaController.getPreguntaById(req, res));
app.put('/api/preguntas/:id', (req, res) => preguntaController.updatePregunta(req, res));
app.delete('/api/preguntas/:id', (req, res) => preguntaController.deletePregunta(req, res));
app.post('/api/preguntas/usuario-respuesta', (req, res) => preguntaController.addUsuarioRespuesta(req, res));

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

// Routes for Usuarios
app.get("/api/usuario", (req, res) => usuarioController.getAllUsuario(req, res));
app.post("/api/usuario", (req, res) => usuarioController.createUsuario(req, res));
app.get("/api/usuario/id/:id", (req, res) => usuarioController.getUsuarioById(req, res));
app.post("/api/usuario/email", (req, res) => usuarioController.getUserByEmailAddress(req, res));
app.put("/api/usuario/:id", (req, res) => usuarioController.updateUsuario(req, res));
app.delete("/api/usuario/:id", (req, res) => usuarioController.deleteUsuario(req, res));
app.post("/api/usuario/login", (req, res) => usuarioController.login(req, res));
app.post("/api/usuario/logout", (req, res) => usuarioController.logout(req, res));
app.get("/api/usuario/me", (req, res) => usuarioController.getUserByToken(req, res));
app.post("/api/usuario/powerup", (req, res) => usuarioController.assignPowerupToUser(req, res));
app.get("/api/usuario/me/information", (req, res) => usuarioController.getAllInformationUser(req, res));
app.post("/api/usuario/cuestionario/complete", (req, res) => usuarioController.completeCuestionario(req, res));
app.post("/api/usuario/cuestionario/complete/logro", (req, res) => usuarioController.verifyCompleteLogroByCuestionario(req, res));
app.post("/api/usuario/cuestionario/complete/mision", (req, res) => usuarioController.verifyCompleteMisionCuestionario(req, res));

// Routes for Logros
app.get("/api/logro", (req, res) => logroController.getAllLogro(req, res));
app.post("/api/logro", (req, res) => logroController.createLogro(req, res));
app.get("/api/logro/:id", (req, res) => logroController.getLogroById(req, res));
app.put("/api/logro/:id", (req, res) => logroController.updateLogro(req, res));
app.delete("/api/logro/soft/:id", (req, res) => logroController.deleteSoftLogro(req, res));


// Server setup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Server on port", process.env.PORT || 4000);

export default app;