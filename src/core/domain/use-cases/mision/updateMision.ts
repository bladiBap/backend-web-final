import { MisionRepository } from "../../../repositories/mision/misionRepository";
import { Mision } from "../../entities/mision/mision";

export class UpdateMision {
    constructor(private misionRepository: MisionRepository) { }

    async execute(data: { idInt: number; nombre: string; descripcion: string; objetivo: number; por_puntos: boolean; recompensa: number; fk_powerup: number }): Promise<Mision> {
        const mision = await this.misionRepository.findById(data.idInt);
        if (!mision) {
            throw new Error("Mision not found");
        }
        const updatedMision = new Mision(
            data.nombre,
            data.descripcion,
            data.objetivo,
            data.por_puntos,
            data.recompensa,
            data.fk_powerup,
            mision.id
        );
        return await this.misionRepository.update(data.idInt, updatedMision);
    }
}