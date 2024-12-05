import { NivelRepository } from "../../../repositories/nivel/nivelRepository";
import { PowerUpRepository } from "../../../repositories/powerup/powerupRepository";
import { TopicoRepository } from "../../../repositories/topico/topicoRepository";
import { Level, LevelCreate } from "../../entities/level";
import { PowerUpCreate } from "../../entities/powerup";
import { TopicCreate } from "../../entities/topic";

export class CreatePowerup {
    constructor(
        private powerupRepository: PowerUpRepository
    ) { }

    async execute(
        data: {
            nombre: string;
            descripcion: string;
            fk_nivel: number;
        }
    ): Promise<Level> {
        const nivel = Number(data.fk_nivel);
        const newPowerup = new PowerUpCreate(
            data.nombre,
            data.descripcion,
            nivel
        );
        return await this.powerupRepository.save(newPowerup);
    }
}