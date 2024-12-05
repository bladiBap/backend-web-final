import { UsuarioRepository } from "../../../repositories/usuario/usuarioRepository";
import { Usuario } from "../../entities/usuario/usuario";

export class UpdateUsuario {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async execute(data: { idInt: number, nombre: string, apellido: string, correo: string, rol: Usuario["rol"]}): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findById(data.idInt);
        if (!usuario) {
            throw new Error("Usuario not found");
        }
        const updatedUsuario = new Usuario(
            data.nombre,
            data.apellido,
            data.correo,
            data.rol
        );
        return await this.usuarioRepository.update(data.idInt, updatedUsuario);
    }
}