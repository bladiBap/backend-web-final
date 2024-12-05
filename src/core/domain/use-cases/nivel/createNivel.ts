import { NivelRepository } from "../../../repositories/nivel/nivelRepository";
import { Level, LevelCreate } from "../../entities/level";

export class CreateNivel {
    constructor(
        private nivelRepository: NivelRepository
    ) { }

    async execute(
        data: {
            nombre: string;
            descripcion: string;
        }
    ): Promise<Level> {
        const newLevel = new LevelCreate(
            data.nombre,
            data.descripcion
        );
        return await this.nivelRepository.save(newLevel);
    }
}