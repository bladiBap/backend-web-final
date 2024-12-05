import { PreguntaRepository } from "../../../repositories/cuestionario/preguntaRepository";

export class AddUsuarioRespuesta {
    constructor(private preguntaRepository: PreguntaRepository) { }

    async execute(
        data: { 
            pregunta_id: number, 
            usuario_id: number, 
            opcion_id: number, 
            puntos: number 
        }
    ): Promise<void> {
        await this.preguntaRepository.addUsuarioRespuesta(data.pregunta_id, data.usuario_id, data.opcion_id, data.puntos);
    }
}