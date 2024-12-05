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
        await db.usuariopowerup.create({
            data: {
                fk_usuario: userId,
                fk_powerup: powerupId,
                cantidad
            }
        })
    }
}