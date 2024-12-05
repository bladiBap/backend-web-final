import { UsuarioRepository } from "../../../repositories/usuario/usuarioRepository";

export class DeleteUsuario {
    constructor(private  usuarioRepository: UsuarioRepository) { }

    async execute(id: number): Promise<void> {
        return await this.usuarioRepository.delete(id);
    }
}