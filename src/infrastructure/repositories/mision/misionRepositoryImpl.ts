import { db } from '../../database/connection';
import { Mision } from '../../../core/domain/entities/mision/mision';
import { MisionRepository } from '../../../core/repositories/mision/misionRepository';

export class MisionRepositoryImpl implements MisionRepository {

    async save(mision: Mision): Promise<Mision> {
        const newMision = await db.mision.create({
            data: {
                nombre: mision.nombre,
                descripcion: mision.descripcion,
                objetivo: mision.objetivo,
                por_puntos: mision.por_puntos,
                recompensa: mision.recompensa,
                fk_powerup: mision.fk_powerup ?? 0
            }
        });
        return newMision;
    }

    async update(id: number, mision: Mision): Promise<Mision> {
        const updatedMision = await db.mision.update({
            where: { id },
            data: {
                nombre: mision.nombre,
                descripcion: mision.descripcion,
                objetivo: mision.objetivo,
                por_puntos: mision.por_puntos,
                recompensa: mision.recompensa,
                fk_powerup: parseInt(mision.fk_powerup?.toString() ?? '0')
            }
        });
        return updatedMision;
    }

    async findAll(): Promise<Mision[]> {
        return await db.mision.findMany({
            where: { is_deleted: false },
            include: {
                powerup: true
            }
        });
    }

    async findById(id: number): Promise<Mision | null> {
        return await db.mision.findUnique({
            where: { 
                id,
                is_deleted: false
            }
        });
    }

    async deleteHard(id: number): Promise<void> {
        await db.mision.delete({
            where: { id }
        });
    }

    async deleteSoft(id: number): Promise<void> {
        await db.mision.update({
            where: { id },
            data: {
                is_deleted: true
            }
        });
    }
}