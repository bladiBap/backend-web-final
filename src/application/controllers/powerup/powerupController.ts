import { Request, Response } from 'express';
import { CreateTopico } from '../../../core/domain/use-cases/topico/createTopico';
import { UpdateTopico } from '../../../core/domain/use-cases/topico/updateTopico';
import { DeleteTopico } from '../../../core/domain/use-cases/topico/deleteTopico';
import { PowerUpRepositoryImpl } from '../../../infrastructure/repositories/powerup/powerupRepositoryImpl';
import { CreatePowerup } from '../../../core/domain/use-cases/powerup/createPowerup';
import { NivelRepositoryImpl } from '../../../infrastructure/repositories/nivel/nivelRepositoryImpl';
import { UpdatePowerup } from '../../../core/domain/use-cases/powerup/updatePowerup';

export class PowerUpController {
    private powerupRepository = new PowerUpRepositoryImpl();
    private nivelRepository = new NivelRepositoryImpl();

    async getAllPowerup(req: Request, res: Response): Promise<void> {
        const powerups = await this.powerupRepository.findAll();
        res.json(powerups);
    }

    async createPowerup(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion, fk_nivel } = req.body;
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

        const nivel = await this.nivelRepository.findById(Number(fk_nivel));
        if (!nivel) {
            res.status(404).json({ message: 'Nivel no encontrado' });
            return;
        }

        try {
            const createPowerup = new CreatePowerup(this.powerupRepository);
            const powerup = await createPowerup.execute({
                nombre,
                descripcion,
                fk_nivel
            });
            res.status(201).json({ ...powerup });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getPowerUpById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const powerup = await this.powerupRepository.findById(Number(id));
            if (!powerup) {
                res.status(404).json({ message: 'Powerup no encontrado' });
                return;
            }
            res.status(200).json({ ...powerup });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updatePowerup(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, descripcion, fk_nivel } = req.body;

        try {
            const powerup = await this.powerupRepository.findById(Number(id));
            if (!powerup) {
                res.status(404).json({ message: 'Powerup no encontrado' });
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

            const nivel = await this.nivelRepository.findById(Number(fk_nivel));
            if (!nivel) {
                res.status(404).json({ message: 'Nivel no encontrado' });
                return;
            }

            const updatePowerup = new UpdatePowerup(this.powerupRepository);
            const updatedPowerup = await updatePowerup.execute({
                idInt: Number(id),
                nombre,
                descripcion,
                fk_nivel
            });
            res.status(201).json({ ...updatedPowerup });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deletePowerup(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const powerup = await this.powerupRepository.findById(Number(id));
            if (!powerup) {
                res.status(404).json({ message: 'Powerup no encontrado' });
                return;
            }
            const deleteTopico = new DeleteTopico(this.powerupRepository);
            await deleteTopico.execute(Number(id));
            res.status(200).json({ message: 'Powerup eliminado' });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}