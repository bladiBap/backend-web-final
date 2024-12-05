import { db } from '../../database/connection';
import { Logro } from '../../../core/domain/entities/logro/logro';
import { LogroRepository } from '../../../core/repositories/logro/logroRepository';

export class LogroRepositoryImpl implements LogroRepository {

    async save(logro: Logro): Promise<Logro> {
        const newLogro = await db.logro.create({
            data: {
                nombre: logro.nombre,
                descripcion: logro.descripcion,
                objetivo: logro.objetivo,
                por_puntos: logro.por_puntos,
                recompensa: logro.recompensa
            }
        });
        return newLogro;
    }

    async update(id: number, logro: Logro): Promise<Logro> {
        const updatedLogro = await db.logro.update({
            where: { id },
            data: {
                nombre: logro.nombre,
                descripcion: logro.descripcion,
                objetivo: logro.objetivo,
                por_puntos: logro.por_puntos,
                recompensa: logro.recompensa
            }
        });
        return updatedLogro;
    }

    async findAll(): Promise<Logro[]> {
        return await db.logro.findMany({
            where: { is_deleted: false }
        });
    }

    async findById(id: number): Promise<Logro | null> {
        return await db.logro.findUnique({
            where: { 
                id,
                is_deleted: false
            }
        });
    }

    async deleteHard(id: number): Promise<void> {
        await db.logro.delete({
            where: { id }
        });
    }

    async deleteSoft(id: number): Promise<void> {
        await db.logro.update({
            where: { id },
            data: {
                is_deleted: true
            }
        });
    }
}