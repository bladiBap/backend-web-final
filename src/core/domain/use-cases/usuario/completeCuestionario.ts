import { UsuarioRepository } from "../../../repositories/usuario/usuarioRepository";

export class CompleteCuestionario {
    constructor(private  usuarioRepository: UsuarioRepository) { }

    async execute(userId: number, cuestionarioId: number): Promise<void> {
        await this.usuarioRepository.completeCuestionario(userId, cuestionarioId);
    }
}