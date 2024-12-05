import { UsuarioRepository } from "../../../repositories/usuario/usuarioRepository";
import { Usuario } from "../../entities/usuario/usuario";

export class GetUsuario {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async executeById(id: number): Promise<Usuario | null> {      
        return await this.usuarioRepository.findById(id);
    }

    async executeByEmail(correo: string): Promise<Usuario | null> {      
        return await this.usuarioRepository.findByEmail(correo);
    }
}