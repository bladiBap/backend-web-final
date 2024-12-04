import { PreguntaRepository } from "../../../repositories/cuestionario/preguntaRepository";
import { Opcion } from "../../entities/cuestionarios/opcion";
import { Pregunta, PreguntaCreate } from "../../entities/cuestionarios/pregunta";

export class UpdatePregunta {
    constructor(
        private preguntaRepository: PreguntaRepository
    ) { }

    async execute(
        data: { 
            idInt: number; 
            enunciado: string; 
            opciones: Opcion[] 
        }
    ): Promise<Pregunta> {
        const pregunta = await this.preguntaRepository.findById(data.idInt);
        if (!pregunta) {
            throw new Error("Pregunta not found");
        }
        const body = {
            enunciado: data.enunciado,
            opciones: data.opciones
        }
        return await this.preguntaRepository.update(data.idInt, body);
    }
}