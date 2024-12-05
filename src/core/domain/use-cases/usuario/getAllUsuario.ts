import { UsuarioRepository } from "../../../repositories/usuario/usuarioRepository";
import { Usuario } from "../../entities/usuario/usuario";

export class GetAllUsuario {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async execute(): Promise<Usuario[] | null> {      
        return await this.usuarioRepository.findAll();
    }
}