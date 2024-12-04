import { PreguntaRepository } from "../../../repositories/cuestionario/preguntaRepository";

export class DeletePregunta {
    constructor(
        private preguntaRepository: PreguntaRepository
    ) { }

    async execute(
        id: number
    ): Promise<void> {
        return await this.preguntaRepository.delete(id);
    }
}