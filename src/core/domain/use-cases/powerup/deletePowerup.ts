import { PowerUpRepository } from "../../../repositories/powerup/powerupRepository";

export class DeletePowerup {
    constructor(
        private powerupRepository: PowerUpRepository
    ) { }

    async execute(
        id: number
    ): Promise<void> {
        const idNum = Number(id);
        return await this.powerupRepository.delete(idNum);
    }
}