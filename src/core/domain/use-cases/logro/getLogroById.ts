import { LogroRepository } from "../../../repositories/logro/logroRepository";
import { Logro } from "../../entities/logro/logro";

export class GetLogroById {
    constructor(private  logroRepository: LogroRepository) { }

    async execute(id: number): Promise<Logro | null> {      
        return await this.logroRepository.findById(id);
    }
}