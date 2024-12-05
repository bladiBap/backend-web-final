import { Request, Response } from 'express';
import { CuestionarioRepositoryImpl } from "../../../infrastructure/repositories/cuestionario/cuestionarioRepositoryImpl";
import { CreateCuestionario } from '../../../core/domain/use-cases/cuestionario/createCuestionario';
import { PreguntaValidator } from './preguntaValidator';
import { UsuarioRepositoryImpl } from '../../../infrastructure/repositories/usuario/usuarioRepositoryImpl';
import { obtenerUsuario } from '../../../utils/jwt';

export class CuestionarioController {
    private cuestionarioRepository = new CuestionarioRepositoryImpl();
    private usuarioRepository = new UsuarioRepositoryImpl();
    private preguntaValidator = new PreguntaValidator(this.cuestionarioRepository);

    async getAllCuestionarios(req: Request, res: Response): Promise<void> {
        const cuestionarios = await this.cuestionarioRepository.findAll();
        res.json(cuestionarios);
    }

    async createCuestionario(req: Request, res: Response): Promise<void> {
        const { titulo, descripcion, fk_usuario, fk_topico, preguntas } = req.body;
        // Validación: Nombre no puede estar vacío
        if (!titulo || titulo.trim() === '') {
            res.status(400).json({ message: 'El titulo no puede estar vacío.' });
            return;
        }

        // Validación: Descripción no puede estar vacía
        if (!descripcion || descripcion.trim() === '') {
            res.status(400).json({ message: 'La descripción no puede estar vacía.' });
            return;
        }

        const usuario = await this.usuarioRepository.findById(fk_usuario);
        if (!usuario) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        const validation = await this.preguntaValidator.ValidatePreguntas(preguntas);
        if (!validation.valid) {
            res.status(400).json({ message: validation.message });
            return;
        }

        try {
            const createCuestionario = new CreateCuestionario(this.cuestionarioRepository);
            const cuestionario = await createCuestionario.execute({ 
                titulo, 
                descripcion,
                fk_usuario,
                fk_topico,
                preguntas
            });
            res.status(201).json({ ...cuestionario });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getCuestionarioById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const cuestionario = await this.cuestionarioRepository.findById(Number(id));
            if (!cuestionario) {
                res.status(404).json({ message: 'Cuestionario no encontrado' });
                return;
            }
            res.status(200).json({ ...cuestionario });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateCuestionario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { titulo, descripcion, fk_usuario, fk_topico, preguntas } = req.body;

        try {
            const cuestionario = await this.cuestionarioRepository.findById(Number(id));
            if (!cuestionario) {
                res.status(404).json({ message: 'Cuestionario no encontrado' });
                return;
            }

            if (!titulo || titulo.trim() === '') {
                res.status(400).json({ message: 'El titulo no puede estar vacío.' });
                return;
            }

            if (!descripcion || descripcion.trim() === '') {
                res.status(400).json({ message: 'La descripción no puede estar vacía.' });
                return;
            }

            const validation = await this.preguntaValidator.ValidatePreguntas(preguntas);
            if (!validation.valid) {
                res.status(400).json({ message: validation.message });
                return;
            }

            const updatedCuestionario = await this.cuestionarioRepository.update(
                Number(id), 
                { 
                    titulo, 
                    descripcion, 
                    fk_usuario,
                    fk_topico,
                    preguntas 
                }
            );
            res.status(200).json({ ...updatedCuestionario });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteCuestionario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const cuestionario = await this.cuestionarioRepository.findById(Number(id));
            if (!cuestionario) {
                res.status(404).json({ message: 'Cuestionario no encontrado' });
                return;
            }
            await this.cuestionarioRepository.delete(Number(id));
            res.status(200).json({ message: 'Cuestionario eliminado' });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getRanking(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const ranking = await this.cuestionarioRepository.getRanking(Number(id));
            res.json(ranking);
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async findByUserId(req: Request, res: Response): Promise<void> {
        const { token } = req.cookies;
        const usuario_id = obtenerUsuario(token);

        if (!usuario_id) {
            res.status(400).json({ message: 'Usuario no encontrado' });
            return;
        }

        try {
            const cuestionarios = await this.cuestionarioRepository.findByUser(usuario_id.id);
            res.json(cuestionarios);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}