import { PowerUp, PowerUpCreate } from "../../../core/domain/entities/powerup";
import { PowerUpRepository } from "../../../core/repositories/powerup/powerupRepository";
import { db } from "../../database/connection";

export class PowerUpRepositoryImpl implements PowerUpRepository {
    async save(powerup: PowerUpCreate): Promise<PowerUp> {
        const newPowerup = await db.powerup.create({
            data: {
                nombre: powerup.nombre,
                descripcion: powerup.descripcion,
                fk_nivel: powerup.fk_nivel,
            },
            include: {
                nivel: true
            }
        });
        return newPowerup;
    }

    async update(id: number, powerup: PowerUpCreate): Promise<PowerUp> {
        const updatedPowerup = await db.powerup.update({
            where: { id },
            data: {
                nombre: powerup.nombre,
                descripcion: powerup.descripcion,
                fk_nivel: powerup.fk_nivel,
            },
            include: {
                nivel: true
            }
        });
        return updatedPowerup;
    }

    async findAll(): Promise<PowerUp[]> {
        return await db.powerup.findMany({
            include: {
                nivel: true
            }
        });
    }

    async findById(id: number): Promise<PowerUp | null> {
        return await db.powerup.findUnique({
            where: { id },
            include: {
                nivel: true
            }
        });
    }

    async delete(id: number): Promise<void> {
        await db.powerup.delete({
            where: { id },
        });
    }

}