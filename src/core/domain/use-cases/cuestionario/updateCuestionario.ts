import { CuestionarioRepository } from "../../../repositories/cuestionario/cuestionarioRepository";
import { Cuestionario } from "../../entities/cuestionarios/cuestionario";

export class UpdateCuestionario {
    constructor(
        private cuestionarioRepository: CuestionarioRepository
    ) { }

    async execute(
        data: { idInt: number; titulo: string; descripcion: string }
    ): Promise<Cuestionario> {
        const cuestionario = await this.cuestionarioRepository.findById(data.idInt);
        if (!cuestionario) {
            throw new Error("Cuestionario not found");
        }
        const updatedCuestionario = new Cuestionario(
            data.titulo,
            data.descripcion,
            cuestionario.id
        );
        return await this.cuestionarioRepository.update(data.idInt, updatedCuestionario);
    }
}