
import { Level, LevelCreate } from "../../../core/domain/entities/level";
import { NivelRepository } from "../../../core/repositories/nivel/nivelRepository";
import { db } from "../../database/connection";

export class NivelRepositoryImpl implements NivelRepository {
    async save(nivel: LevelCreate): Promise<Level> {
        const newNivel = await db.nivel.create({
            data: {
                nombre: nivel.nombre,
                descripcion: nivel.descripcion,
            }
        });
        return newNivel;
    }

    async update(id: number, nivel: LevelCreate): Promise<Level> {
        const updatedNivel = await db.nivel.update({
            where: { id },
            data: {
                nombre: nivel.nombre,
                descripcion: nivel.descripcion,
            }
        });
        return updatedNivel;
    }

    async findAll(): Promise<Level[]> {
        return await db.nivel.findMany();
    }

    async findById(id: number): Promise<Level | null> {
        return await db.nivel.findUnique({
            where: { id },
            include: {
                Powerup: true
            }
        });
    }

    async delete(id: number): Promise<void> {
        await db.nivel.delete({
            where: { id },
        });
    }

}