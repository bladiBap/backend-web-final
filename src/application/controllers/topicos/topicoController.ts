import { Request, Response } from 'express';
import { TopicoRepositoryImpl } from '../../../infrastructure/repositories/topico/topicoRepositoryImpl';
import { CreateTopico } from '../../../core/domain/use-cases/topico/createTopico';
import { UpdateTopico } from '../../../core/domain/use-cases/topico/updateTopico';
import { DeleteTopico } from '../../../core/domain/use-cases/topico/deleteTopico';

export class TopicoController {
    private topicoRepository = new TopicoRepositoryImpl();

    async getAllTopicos(req: Request, res: Response): Promise<void> {
        const topicos = await this.topicoRepository.findAll();
        res.json(topicos);
    }

    async createTopico(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion } = req.body;
        // Validación: Nombre no puede estar vacío
        if (!nombre || nombre.trim() === '') {
            res.status(400).json({ message: 'El nombre no puede estar vacío.' });
            return;
        }

        // Validación: Descripción no puede estar vacía
        if (!descripcion || descripcion.trim() === '') {
            res.status(400).json({ message: 'La descripción no puede estar vacía.' });
            return;
        }

        try {
            const createTopico = new CreateTopico(this.topicoRepository);
            const topico = await createTopico.execute({
                nombre,
                descripcion
            });
            res.status(201).json({ ...topico });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getTopicoById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const topico = await this.topicoRepository.findById(Number(id));
            if (!topico) {
                res.status(404).json({ message: 'Topico no encontrado' });
                return;
            }
            res.status(200).json({ ...topico });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateTopico(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        try {
            const topico = await this.topicoRepository.findById(Number(id));
            if (!topico) {
                res.status(404).json({ message: 'Topico no encontrado' });
                return;
            }

            if (!nombre || nombre.trim() === '') {
                res.status(400).json({ message: 'El titulo no puede estar vacío.' });
                return;
            }

            if (!descripcion || descripcion.trim() === '') {
                res.status(400).json({ message: 'La descripción no puede estar vacía.' });
                return;
            }

            const updateTopico = new UpdateTopico(this.topicoRepository);
            const updatedTopico = await updateTopico.execute({
                idInt: Number(id),
                nombre,
                descripcion
            });
            res.status(201).json({ ...updatedTopico });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteTopico(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const topico = await this.topicoRepository.findById(Number(id));
            if (!topico) {
                res.status(404).json({ message: 'Topico no encontrado' });
                return;
            }
            const deleteTopico = new DeleteTopico(this.topicoRepository);
            await deleteTopico.execute(Number(id));
            res.status(200).json({ message: 'Topico eliminado' });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}