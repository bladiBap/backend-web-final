import { CuestionarioRepository } from "../../../repositories/cuestionario/cuestionarioRepository";
import { Cuestionario, CuestionarioCreate } from "../../entities/cuestionarios/cuestionario";
import { PreguntaCreate } from "../../entities/cuestionarios/pregunta";

export class UpdateCuestionario {
    constructor(
        private cuestionarioRepository: CuestionarioRepository
    ) { }

    async execute(
        data: { 
            idInt: number; 
            titulo: string;
            descripcion: string;
            fk_usuario: number;
            fk_topico: number;
            preguntas: Omit<PreguntaCreate, "cuestionario_id">[];
        }
    ): Promise<Cuestionario> {
        const cuestionario = await this.cuestionarioRepository.findById(data.idInt);
        if (!cuestionario) {
            throw new Error("Cuestionario not found");
        }
        const updatedCuestionario = new CuestionarioCreate(
            data.titulo,
            data.descripcion,
            data.fk_usuario,
            data.fk_topico,
            data.preguntas
        );
        return await this.cuestionarioRepository.update(data.idInt, updatedCuestionario);
    }
}