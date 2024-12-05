import { PowerUpRepository } from "../../../repositories/powerup/powerupRepository";
import { PowerUp, PowerUpCreate } from "../../entities/powerup";

export class UpdatePowerup {
    constructor(
        private powerupRepository: PowerUpRepository
    ) { }

    async execute(
        data: { 
            idInt: number; 
            nombre: string;
            descripcion: string;
            fk_nivel: number;
        }
    ): Promise<PowerUp> {
        const powerup = await this.powerupRepository.findById(data.idInt);
        if (!powerup) {
            throw new Error("Powerup not found");
        }
        const updatedPowerup = new PowerUpCreate(
            data.nombre,
            data.descripcion,
            data.fk_nivel
        );
        return await this.powerupRepository.update(data.idInt, updatedPowerup);
    }
}