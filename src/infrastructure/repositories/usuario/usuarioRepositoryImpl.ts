import { db } from '../../database/connection';
import { Usuario, UsuarioWithPowerups } from '../../../core/domain/entities/usuario/usuario';
import { UsuarioRepository } from '../../../core/repositories/usuario/usuarioRepository';

export class UsuarioRepositoryImpl implements UsuarioRepository {

    async save(usuario: Usuario): Promise<Usuario> {
        const newUsuario = await db.usuario.create({
            data: {
                nombre: usuario.nombre,
                fk_nivel: 1,
                apellido: usuario.apellido,
                correo: usuario.correo,
                rol: usuario.rol || 'USER',
                contrasena: usuario.contrasena || ''
            }
        });
        return newUsuario;
    }

    async update(id: number, usuario: Usuario): Promise<Usuario> {
        const updatedUsuario = await db.usuario.update({
            where: { id },
            data: {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
        return updatedUsuario;
    }

    async findAll(): Promise<Usuario[]> {
        return await db.usuario.findMany({
            select: {
                id: true,
                nombre: true,
                apellido: true,
                correo: true,
                rol: true
            },
        });
    }

    async findById(id: number): Promise<UsuarioWithPowerups | null> {
        return await db.usuario.findUnique({
            where: { id },
            select: {
                id: true,
                nombre: true,
                apellido: true,
                correo: true,
                rol: true,
                nivel: true,
                puntaje: true,
                usuariopowerup: {
                    select: {
                        cantidad: true,
                        powerup: {
                            select: {
                                id: true,
                                nombre: true,
                                descripcion: true,
                            }
                        }
                    }
                }
            },
        });
    }

    async findByEmail(correo: string): Promise<Usuario | null> {
        return await db.usuario.findUnique({
            where: { correo },
            select: {
                id: true,
                nombre: true,
                apellido: true,
                correo: true,
                rol: true,
                contrasena: true,
                nivel: true,
                usuariopowerup: {
                    select: {
                        cantidad: true,
                        powerup: {
                            select: {
                                id: true,
                                nombre: true,
                                descripcion: true,
                            }
                        }
                    }
                }
            },
        });
    }

    async delete(id: number): Promise<void> {
        await db.usuario.delete({
            where: { id }
        });
    }

    async assignPowerupToUser(userId: number, powerupId: number, cantidad: number): Promise<void> {
        const existingPowerup = await db.usuariopowerup.findFirst({
            where: {
                fk_usuario: userId,
                fk_powerup: powerupId
            }
        });
        if (existingPowerup) {
            await db.usuariopowerup.update({
                where: {
                    fk_usuario_fk_powerup: {
                        fk_usuario: userId,
                        fk_powerup: powerupId
                    }
                },
                data: {
                    cantidad: existingPowerup.cantidad + cantidad
                }
            });
        }else{
            await db.usuariopowerup.create({
                data: {
                    fk_usuario: userId,
                    fk_powerup: powerupId,
                    cantidad
                }
            });
        }
    }

    async getAllInformation(userId: number): Promise<any> {
        const user = await db.usuario.findUnique({
            where: { id: userId },
            select: {
                id: true,
                nombre: true,
                apellido: true,
                correo: true,
                rol: true,
                nivel: true,
                puntaje: true,
                usuariopowerup: {
                    where: {
                        cantidad: {
                            gt: 0
                        }
                    },
                    select: {
                        cantidad: true,
                        powerup: {
                            select: {
                                id: true,
                                nombre: true,
                                descripcion: true,
                            }
                        }
                    }
                },
                usuariomision: {
                    select: {
                        mision: {
                            select: {
                                id: true,
                                nombre: true,
                                descripcion: true,
                                objetivo: true,
                                por_puntos: true,
                                recompensa: true,
                                fk_powerup: true
                            }
                        }
                    }
                },
                usuariologro: {
                    select: {
                        logro: {
                            select: {
                                id: true,
                                nombre: true,
                                descripcion: true,
                                objetivo: true,
                                por_puntos: true,
                                recompensa: true
                            }
                        }
                    }
                }
            },
        });

        return user;
    }

    async getCuestionariosCompletesByUserId(userId: number): Promise<any> {
        const currentDate = new Date();
        const cuestionarios = await db.usuariocuestionario.findMany({
            where: { 
                fk_usuario: userId,
                createdAT: {
                    gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
                }
            }
        });

        return cuestionarios
    }

    async verifyLogroUser (userId: number, logroId: number): Promise<boolean> {
        const logro = await db.usuariologro.findFirst({
            where: {
                fk_usuario: userId,
                fk_logro: logroId
            }
        });
        return logro ? true : false;
    }

    async verifyMisionUser (userId: number, misionId: number): Promise<boolean> {
        const mision = await db.usuariomision.findFirst({
            where: {
                fk_usuario: userId,
                fk_mision: misionId
            }
        });
        return mision ? true : false;
    }

    async completeLogro(userId: number, logroId: number): Promise<void> {
        await db.usuariologro.create({
            data: {
                fk_usuario: userId,
                fk_logro: logroId
            }
        });
    }

    async completeMision(userId: number, misionId: number): Promise<void> {
        await db.usuariomision.create({
            data: {
                fk_usuario: userId,
                fk_mision: misionId
            }
        });
    }

    async completeCuestionario (userId: number, cuestionarioId: number): Promise<void> {
        await db.usuariocuestionario.create({
            data: {
                fk_usuario: userId,
                fk_cuestionario: cuestionarioId
            }
        });
    }

    async updatePuntaje(userId: number, puntaje: number): Promise<void> {
        const user = await db.usuario.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        await db.usuario.update({
            where: { id: userId },
            data: {
                puntaje: user.puntaje + puntaje
            }
        });
    }
}