import { LogroRepository } from "../../../repositories/logro/logroRepository";
import { Logro } from "../../entities/logro/logro";

export class UpdateLogro {
    constructor(private logroRepository: LogroRepository) { }

    async execute(data: { idInt: number; nombre: string; descripcion: string; objetivo: number; por_puntos: boolean; recompensa: number}): Promise<Logro> {
        const logro = await this.logroRepository.findById(data.idInt);
        if (!logro) {
            throw new Error("Logro not found");
        }
        const updatedLogro = new Logro(
            data.nombre,
            data.descripcion,
            data.objetivo,
            data.por_puntos,
            data.recompensa,
            logro.id
        );
        return await this.logroRepository.update(data.idInt, updatedLogro);
    }
}