import { LogroRepository } from "../../../repositories/logro/logroRepository";
import { Logro } from "../../entities/logro/logro";

export class GetAllLogro {
    constructor(private logroRepository: LogroRepository) { }

    async execute(): Promise<Logro[] | null> {      
        return await this.logroRepository.findAll();
    }
}