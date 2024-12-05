import { LogroRepository } from "../../../repositories/logro/logroRepository";
import { Logro } from "../../entities/logro/logro";

export class CreateLogro {
    constructor(private  logroRepository: LogroRepository) { }

    async execute(data: { nombre: string; descripcion: string; objetivo: number; por_puntos: boolean; recompensa: number}): Promise<Logro> {
        const newLogro = new Logro(
            data.nombre,
            data.descripcion,
            data.objetivo,
            data.por_puntos,
            data.recompensa
        );
        return await this.logroRepository.save(newLogro);
    }
}