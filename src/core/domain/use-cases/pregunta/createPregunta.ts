import { PreguntaRepository } from "../../../repositories/cuestionario/preguntaRepository";
import { Opcion } from "../../entities/cuestionarios/opcion";
import { Pregunta, PreguntaCreate } from "../../entities/cuestionarios/pregunta";

export class CreatePregunta {
    constructor(
        private preguntaRepository: PreguntaRepository
    ) {}

    async execute(
        data: { 
            enunciado: string; 
            cuestionario_id: number;
            opciones: Opcion[];
        }
    ) : Promise<Pregunta> {
        const newPregunta = new PreguntaCreate(
            data.enunciado,
            data.cuestionario_id,
            data.opciones
        )
        return await this.preguntaRepository.save(newPregunta);
    }
}