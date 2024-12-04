import express from "express";

import { CuestionarioController } from "../application/controllers/cuestionarios/cuestionarioController";
import { PreguntaController } from "../application/controllers/cuestionarios/preguntaController";
import { MisionController } from "../application/controllers/mision/misionController";

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

const cuestionarioController = new CuestionarioController();
const preguntaController = new PreguntaController();
const misionController = new MisionController();

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


// Server setup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Server on port", process.env.PORT || 4000);

export default app;