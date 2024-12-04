import { CuestionarioRepository } from "../../../repositories/cuestionario/cuestionarioRepository";
import { Cuestionario } from "../../entities/cuestionarios/cuestionario";

export class CreateCuestionario {
    constructor(
        private cuestionarioRepository: CuestionarioRepository
    ) { }

    async execute(
        data: { titulo: string; descripcion: string }
    ): Promise<Cuestionario> {
        const newCuestionario = new Cuestionario(
            data.titulo,
            data.descripcion,
        );
        return await this.cuestionarioRepository.save(newCuestionario);
    }
}