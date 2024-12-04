import { CuestionarioRepository } from "../../../repositories/cuestionario/cuestionarioRepository";

export class deleteCuestionario {
    constructor(
        private cuestionarioRepository: CuestionarioRepository
    ) { }

    async execute(
        id: number
    ): Promise<void> {
        return await this.cuestionarioRepository.delete(id);
    }
}