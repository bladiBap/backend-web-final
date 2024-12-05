import { NivelRepository } from "../../../repositories/nivel/nivelRepository";
import { Level, LevelCreate } from "../../entities/level";

export class UpdateNivel {
    constructor(
        private nivelRepository: NivelRepository
    ) { }

    async execute(
        data: { 
            idInt: number; 
            nombre: string;
            descripcion: string;
        }
    ): Promise<Level> {
        const nivel = await this.nivelRepository.findById(data.idInt);
        if (!nivel) {
            throw new Error("Nivel not found");
        }
        const updatedNivel = new LevelCreate(
            data.nombre,
            data.descripcion
        );
        return await this.nivelRepository.update(data.idInt, updatedNivel);
    }
}