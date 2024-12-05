import { Cuestionario, CuestionarioCreate, CuestionarioDetail } from "../../../core/domain/entities/cuestionarios/cuestionario";
import { CuestionarioRepository } from "../../../core/repositories/cuestionario/cuestionarioRepository";
import { db } from "../../database/connection";

export class CuestionarioRepositoryImpl implements CuestionarioRepository {
    async save(cuestionario: CuestionarioCreate): Promise<CuestionarioDetail> {
        const newCuestionario = await db.cuestionario.create({
            data: {
                titulo: cuestionario.titulo,
                descripcion: cuestionario.descripcion,
                fk_usuario: cuestionario.fk_usuario,
                fk_topico: cuestionario.fk_topico,
                preguntas: {
                    create: cuestionario.preguntas.map(pregunta => ({
                        ...pregunta,
                        opciones: {
                            create: pregunta.opciones
                        }
                    }))
                }
            },
            include: {
                preguntas: {
                    include: {
                        opciones: true
                    }
                }
            }
        });
        return newCuestionario;
    }

    async update(id: number, cuestionario: CuestionarioCreate): Promise<CuestionarioDetail> {
        await db.pregunta.deleteMany({
            where: { cuestionario_id: id },
        });
    
        // Actualizar el cuestionario y crear las nuevas preguntas y opciones
        const updatedCuestionario = await db.cuestionario.update({
            where: { id },
            data: {
                titulo: cuestionario.titulo,
                descripcion: cuestionario.descripcion,
                fk_topico: cuestionario.fk_topico,
                preguntas: {
                    create: cuestionario.preguntas.map((pregunta) => ({
                        enunciado: pregunta.enunciado,
                        orden: pregunta.orden,
                        opciones: {
                            create: pregunta.opciones.map((opcion) => ({
                                texto: opcion.texto,
                                es_correcta: opcion.es_correcta,
                            })),
                        },
                    })),
                },
            },
            include: {
                preguntas: {
                    include: {
                        opciones: true,
                    },
                },
            },
        });
        return updatedCuestionario;
    }

    async findAll(): Promise<CuestionarioDetail[]> {
        return await db.cuestionario.findMany({
            include: {
                preguntas: {
                    include: {
                        opciones: true
                    }
                }
            }
        });
    }

    async findById(id: number): Promise<CuestionarioDetail | null> {
        return await db.cuestionario.findUnique({
            where: { id },
            include: {
                preguntas: {
                    include: {
                        opciones: true
                    }
                }
            }
        });
    }

    async delete(id: number): Promise<void> {
        await db.cuestionario.delete({
            where: { id },
        });
    }

    async getRanking(id: number): Promise<any> {
        const ranking = await db.usuariopregunta.groupBy({
            by: ['fk_usuario'], // Agrupar por usuario
            _sum: {
                valor: true, // Sumar los puntos
            },
            where: {
                pregunta: {
                    cuestionario_id: id, // Filtrar por cuestionario
                },
            },
            orderBy: {
                _sum: {
                    valor: 'desc', // Ordenar por puntos acumulados
                },
            },
        });

        const detailedRanking = await Promise.all(
            ranking.map(async (rank) => {
                const user = await db.usuario.findUnique({
                    where: { id: rank.fk_usuario },
                    select: { nombre: true, apellido: true, puntaje: true },
                });
                return {
                    usuario: `${user?.nombre} ${user?.apellido}`,
                    puntaje: rank._sum.valor || 0,
                };
            })
        );
        
        return detailedRanking;
    }
}