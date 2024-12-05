import { TopicoRepository } from "../../../repositories/topico/topicoRepository";
import { Topic, TopicCreate } from "../../entities/topic";

export class UpdateTopico {
    constructor(
        private topicoRepository: TopicoRepository
    ) { }

    async execute(
        data: { 
            idInt: number; 
            nombre: string;
            descripcion: string;
        }
    ): Promise<Topic> {
        const topico = await this.topicoRepository.findById(data.idInt);
        if (!topico) {
            throw new Error("Topico not found");
        }
        const updatedTopico = new TopicCreate(
            data.nombre,
            data.descripcion
        );
        return await this.topicoRepository.update(data.idInt, updatedTopico);
    }
}