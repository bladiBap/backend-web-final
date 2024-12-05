import { PreguntaCreate, Pregunta } from "../../../core/domain/entities/cuestionarios/pregunta";
import { PreguntaRepository } from "../../../core/repositories/cuestionario/preguntaRepository";
import { db } from "../../database/connection";

export class PreguntaRepositoryImpl implements PreguntaRepository {
    async save(pregunta: PreguntaCreate): Promise<Pregunta> {
        const newPregunta = await db.pregunta.create({
            data: {
                enunciado: pregunta.enunciado,
                cuestionario_id: pregunta.cuestionario_id,
                orden: pregunta.orden,
                opciones: {
                    create: pregunta.opciones
                }
            },
            include: {
                opciones: true
            }
        })
        return newPregunta;
    }
    async update(
        id: number, 
        pregunta: Omit<PreguntaCreate, "cuestionario_id">
    ): Promise<Pregunta> {
        const updatedPregunta = await db.pregunta.update({
            where: { id },
            data: {
                enunciado: pregunta.enunciado,
                orden: pregunta.orden,
                opciones: {
                    deleteMany: {},
                    create: pregunta.opciones
                }
            },
            include: {
                opciones: true
            }
        });
        return updatedPregunta;
    }
    async findAll(): Promise<Pregunta[]> {
        return await db.pregunta.findMany({
            include: {
                opciones: true
            }
        });
    }
    async findById(id: number): Promise<Pregunta | null> {
        return await db.pregunta.findUnique({
            where: { id },
            include: {
                opciones: true
            }
        });
    }
    async delete(id: number): Promise<void> {
        await db.pregunta.delete({
            where: { id }
        });
    }
}