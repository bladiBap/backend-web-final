import { NivelRepository } from "../../../repositories/nivel/nivelRepository";
import { TopicoRepository } from "../../../repositories/topico/topicoRepository";
import { Level, LevelCreate } from "../../entities/level";
import { TopicCreate } from "../../entities/topic";

export class CreateTopico {
    constructor(
        private topicoRepository: TopicoRepository
    ) { }

    async execute(
        data: {
            nombre: string;
            descripcion: string;
        }
    ): Promise<Level> {
        const newTopico = new TopicCreate(
            data.nombre,
            data.descripcion
        );
        return await this.topicoRepository.save(newTopico);
    }
}