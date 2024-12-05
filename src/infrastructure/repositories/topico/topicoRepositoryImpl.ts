import { Topic, TopicCreate, TopicWithCuestionarios } from "../../../core/domain/entities/topic";
import { TopicoRepository } from "../../../core/repositories/topico/topicoRepository";
import { db } from "../../database/connection";

export class TopicoRepositoryImpl implements TopicoRepository {
    async save(topico: TopicCreate): Promise<Topic> {
        const newTopico = await db.topico.create({
            data: {
                nombre: topico.nombre,
                descripcion: topico.descripcion,
            }
        });
        return newTopico;
    }

    async update(id: number, topico: TopicCreate): Promise<Topic> {
        const updatedTopico = await db.topico.update({
            where: { id },
            data: {
                nombre: topico.nombre,
                descripcion: topico.descripcion,
            }
        });
        return updatedTopico;
    }

    async findAll(): Promise<TopicWithCuestionarios[]> {
        return await db.topico.findMany({
            include: {
                cuestionarios: {
                    include: {
                        usuario: true,
                    },
                },
            },
        });
    }

    async findById(id: number): Promise<TopicWithCuestionarios | null> {
        return await db.topico.findUnique({
            where: { id },
            include: {
                cuestionarios: {
                    include: {
                        usuario: true,
                    },
                },
            },
        });
    }

    async delete(id: number): Promise<void> {
        await db.topico.delete({
            where: { id },
        });
    }

}