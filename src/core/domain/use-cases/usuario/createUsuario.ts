import { UsuarioRepository } from "../../../repositories/usuario/usuarioRepository";
import { Usuario } from "../../entities/usuario/usuario";

export class CreateUsuario {
    constructor(private  usuarioRepository: UsuarioRepository) { }

    async execute(data: { nombre : string, apellido : string, correo : string, rol : Usuario["rol"], contrasena : string  }): Promise<Usuario> {
        const newUsuario = new Usuario(
            data.nombre,
            data.apellido,
            data.correo,
            data.rol,
            data.contrasena,
        );
        return await this.usuarioRepository.save(newUsuario);
    }
}