import { Usuario } from "../../domain/entities/usuario/usuario";

export interface UsuarioRepository {
    save(usuario: Usuario): Promise<Usuario>;
    update(id: number, usuario: Usuario): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findById(id: number): Promise<Usuario | null>;
    findByEmail(correo: string): Promise<Usuario | null>;
    delete(id: number): Promise<void>;
    assignPowerupToUser(userId: number, powerupId: number, cantidad : number): Promise<void>;
}