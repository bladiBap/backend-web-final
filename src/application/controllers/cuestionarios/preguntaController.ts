import { Request, Response } from 'express';
import { PreguntaRepositoryImpl } from "../../../infrastructure/repositories/cuestionario/preguntaRepository";
import { CreatePregunta } from '../../../core/domain/use-cases/pregunta/createPregunta';
import { CuestionarioRepositoryImpl } from '../../../infrastructure/repositories/cuestionario/cuestionarioRepositoryImpl';
import { PreguntaValidator } from './preguntaValidator';
import { UsuarioRepositoryImpl } from '../../../infrastructure/repositories/usuario/usuarioRepositoryImpl';
import { obtenerUsuario } from '../../../utils/jwt';

export class PreguntaController {
    private preguntaRepository = new PreguntaRepositoryImpl();
    private cuestionarioRepository = new CuestionarioRepositoryImpl;
    private usuarioRepository = new UsuarioRepositoryImpl;
    private preguntaValidator = new PreguntaValidator(this.cuestionarioRepository);

    async getAllPreguntas(req: Request, res: Response): Promise<void> {
        const preguntas = await this.preguntaRepository.findAll();
        res.json(preguntas);
    }

    async createPregunta(req: Request, res: Response): Promise<void> {
        const { enunciado, orden, cuestionario_id, opciones } = req.body;
        const validation = await this.preguntaValidator.validatePregunta(req.body, false);
        if (!validation.valid) {
            res.status(400).json({ message: validation.message });
            return;
        }

        try {
            const createPregunta = new CreatePregunta(this.preguntaRepository);
            const pregunta = await createPregunta.execute({ enunciado, orden, cuestionario_id, opciones });
            res.status(201).json({ ...pregunta });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getPreguntaById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const pregunta = await this.preguntaRepository.findById(Number(id));
            if (!pregunta) {
                res.status(404).json({ message: 'Pregunta no encontrada' });
                return;
            }
            res.status(200).json({ ...pregunta });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updatePregunta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { enunciado, orden, opciones } = req.body;

        try {
            const pregunta = await this.preguntaRepository.findById(Number(id));
            if (!pregunta) {
                res.status(404).json({ message: 'Pregunta no encontrada' });
                return;
            }

            const validation = await this.preguntaValidator.validatePregunta(req.body, false);
            if (!validation.valid) {
                res.status(400).json({ message: validation.message });
                return;
            }

            const updatedPregunta = await this.preguntaRepository.update(Number(id), { enunciado, orden, opciones });
            res.status(200).json({ ...updatedPregunta });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deletePregunta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const pregunta = await this.preguntaRepository.findById(Number(id));
            if (!pregunta) {
                res.status(404).json({ message: 'Pregunta no encontrada' });
                return;
            }

            await this.preguntaRepository.delete(Number(id));
            res.status(204).json();
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addUsuarioRespuesta(req: Request, res: Response): Promise<void> {
        const { pregunta_id, opcion_id, puntos } = req.body;
        const { token } = req.cookies;
        const usuario_id = obtenerUsuario(token);

        if (!usuario_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        if (!pregunta_id  || !opcion_id || !Number.isNaN(puntos)) {
            res.status(400).json({ message: 'Los campos pregunta_id, opcion_id y puntos son requeridos.' });
            return;
        }

        const pregunta = await this.preguntaRepository.findById(pregunta_id)
        if (!pregunta) {
            res.status(404).json({ message: 'Pregunta no encontrada' });
            return;
        }

        try {
            await this.preguntaRepository.addUsuarioRespuesta(pregunta_id, usuario_id.id, opcion_id, puntos);
            res.status(204).json();
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}