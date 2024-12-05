import { Request, Response } from 'express';
import { CuestionarioRepositoryImpl } from "../../../infrastructure/repositories/cuestionario/cuestionarioRepositoryImpl";
import { CreateCuestionario } from '../../../core/domain/use-cases/cuestionario/createCuestionario';
import { NivelRepositoryImpl } from '../../../infrastructure/repositories/nivel/nivelRepositoryImpl';
import { CreateNivel } from '../../../core/domain/use-cases/nivel/createNivel';
import { UpdateNivel } from '../../../core/domain/use-cases/nivel/updateNivel';
import { DeleteNivel } from '../../../core/domain/use-cases/nivel/deleteNivel';

export class NivelController {
    private nivelRepository = new NivelRepositoryImpl();

    async getAllNiveles(req: Request, res: Response): Promise<void> {
        const niveles = await this.nivelRepository.findAll();
        res.json(niveles);
    }

    async createNivel(req: Request, res: Response): Promise<void> {
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
            const createNivel = new CreateNivel(this.nivelRepository);
            const nivel = await createNivel.execute({
                nombre,
                descripcion
            });
            res.status(201).json({ ...nivel });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getNivelById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const nivel = await this.nivelRepository.findById(Number(id));
            if (!nivel) {
                res.status(404).json({ message: 'Nivel no encontrado' });
                return;
            }
            res.status(200).json({ ...nivel });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateNivel(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        try {
            const nivel = await this.nivelRepository.findById(Number(id));
            if (!nivel) {
                res.status(404).json({ message: 'Nivel no encontrado' });
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

            const updateNivel = new UpdateNivel(this.nivelRepository);
            const updatedNivel = await updateNivel.execute({
                idInt: Number(id),
                nombre,
                descripcion
            });
            res.status(201).json({ ...updatedNivel });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteNivel(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const nivel = await this.nivelRepository.findById(Number(id));
            if (!nivel) {
                res.status(404).json({ message: 'Nivel no encontrado' });
                return;
            }
            const deleteNivel = new DeleteNivel(this.nivelRepository);
            await deleteNivel.execute(Number(id));
            res.status(200).json({ message: 'Nivel eliminado' });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}