import { Request, Response } from 'express';
import { PreguntaRepositoryImpl } from "../../../infrastructure/repositories/cuestionario/preguntaRepository";
import { CreatePregunta } from '../../../core/domain/use-cases/pregunta/createPregunta';
import { CuestionarioRepositoryImpl } from '../../../infrastructure/repositories/cuestionario/cuestionarioRepositoryImpl';

export class PreguntaController {
    private preguntaRepository = new PreguntaRepositoryImpl();
    private cuestionarioRepository = new CuestionarioRepositoryImpl

    async getAllPreguntas(req: Request, res: Response): Promise<void> {
        const preguntas = await this.preguntaRepository.findAll();
        res.json(preguntas);
    }

    async createPregunta(req: Request, res: Response): Promise<void> {
        const { enunciado, cuestionario_id, opciones } = req.body;
        // Validación: Nombre no puede estar vacío
        if (!enunciado || enunciado.trim() === '') {
            res.status(400).json({ message: 'El enunciado no puede estar vacío.' });
            return;
        }

        // Validación: Cuestionario no puede estar vacío
        if (cuestionario_id === undefined || cuestionario_id === null) {
            res.status(400).json({ message: 'El id del cuestionario no puede estar vacío.' });
            return;
        }

        if (!Number.isInteger(cuestionario_id)) {
            res.status(400).json({ message: 'El cuestionario debe ser un número entero.' });
            return;
        }

        const cuestionario = await this.cuestionarioRepository.findById(cuestionario_id);
        if (!cuestionario) {
            res.status(404).json({ message: 'Cuestionario no encontrado' });
            return;
        }

        // Validación: Opciones no pueden estar vacías
        if (!opciones || opciones.length === 0) {
            res.status(400).json({ message: 'Las opciones no pueden estar vacías.' });
            return;
        }

        if (opciones.some((opcion: any) => !opcion.texto || opcion.texto.trim() === '')) {
            res.status(400).json({ message: 'El texto de las opciones no puede estar vacío.' });
            return;
        }

        if (opciones.some((opcion: any) => opcion.es_correcta === undefined)) {
            res.status(400).json({ message: 'Las opciones deben tener un valor de es_correcta.' });
            return;
        }

        try {
            const createPregunta = new CreatePregunta(this.preguntaRepository);
            const pregunta = await createPregunta.execute({ enunciado, cuestionario_id, opciones });
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
        const { enunciado, opciones } = req.body;

        try {
            const pregunta = await this.preguntaRepository.findById(Number(id));
            if (!pregunta) {
                res.status(404).json({ message: 'Pregunta no encontrada' });
                return;
            }

            if (!enunciado || enunciado.trim() === '') {
                res.status(400).json({ message: 'El enunciado no puede estar vacío.' });
                return;
            }

            // Validación: Opciones no pueden estar vacías
            if (!opciones || opciones.length === 0) {
                res.status(400).json({ message: 'Las opciones no pueden estar vacías.' });
                return;
            }

            if (opciones.some((opcion: any) => !opcion.texto || opcion.texto.trim() === '')) {
                res.status(400).json({ message: 'El texto de las opciones no puede estar vacío.' });
                return;
            }

            if (opciones.some((opcion: any) => opcion.es_correcta === undefined)) {
                res.status(400).json({ message: 'Las opciones deben tener un valor de es_correcta.' });
                return;
            }

            const updatedPregunta = await this.preguntaRepository.update(Number(id), { enunciado, opciones });
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
}