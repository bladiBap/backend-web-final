import { MisionRepository } from "../../../repositories/mision/misionRepository";
import { Mision } from "../../entities/mision/mision";

export class CreateMision {
    constructor(private  misionRepository: MisionRepository) { }

    async execute(data: { nombre: string; descripcion: string; objetivo: number; por_puntos: boolean; recompensa: number; fk_powerup: number }): Promise<Mision> {
        let fkPowerup = parseInt(data.fk_powerup.toString());
        const newMision = new Mision(
            data.nombre,
            data.descripcion,
            data.objetivo,
            data.por_puntos,
            data.recompensa,
            fkPowerup
        );
        return await this.misionRepository.save(newMision);
    }
}