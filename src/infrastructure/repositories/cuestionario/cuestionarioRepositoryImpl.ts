import { Cuestionario } from "../../../core/domain/entities/cuestionarios/cuestionario";
import { CuestionarioRepository } from "../../../core/repositories/cuestionario/cuestionarioRepository";
import { db } from "../../database/connection";

export class CuestionarioRepositoryImpl implements CuestionarioRepository {
    async save(cuestionario: Cuestionario): Promise<Cuestionario> {
        const newCuestionario = await db.cuestionario.create({
            data: {
                titulo: cuestionario.titulo,
                descripcion: cuestionario.descripcion,
            }
        });
        return newCuestionario;
    }

    async update(id: number, cuestionario: Cuestionario): Promise<Cuestionario> {
        const updatedCuestionario = await db.cuestionario.update({
            where: { id },
            data: {
                titulo: cuestionario.titulo,
                descripcion: cuestionario.descripcion,
            }
        });
        return updatedCuestionario;
    }

    async findAll(): Promise<Cuestionario[]> {
        return await db.cuestionario.findMany();
    }

    async findById(id: number): Promise<Cuestionario | null> {
        return await db.cuestionario.findUnique({
            where: { id },
        });
    }

    async delete(id: number): Promise<void> {
        await db.cuestionario.delete({
            where: { id },
        });
    }

}