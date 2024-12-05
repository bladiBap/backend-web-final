import { CuestionarioRepository } from "../../../repositories/cuestionario/cuestionarioRepository";
import { Cuestionario, CuestionarioCreate } from "../../entities/cuestionarios/cuestionario";
import { PreguntaCreate } from "../../entities/cuestionarios/pregunta";

export class CreateCuestionario {
    constructor(
        private cuestionarioRepository: CuestionarioRepository
    ) { }

    async execute(
        data: { 
            titulo: string; 
            descripcion: string;
            fk_usuario: number;
            fk_topico: number;
            preguntas: Omit<PreguntaCreate, "cuestionario_id">[];
        }
    ): Promise<Cuestionario> {
        const newCuestionario = new CuestionarioCreate(
            data.titulo,
            data.descripcion,
            data.fk_usuario,
            data.fk_topico,
            data.preguntas
        );
        return await this.cuestionarioRepository.save(newCuestionario);
    }
}