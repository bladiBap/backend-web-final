import { MisionRepository } from "../../../repositories/mision/misionRepository";
import { Mision } from "../../entities/mision/mision";

export class GetAllMision {
    constructor(private misionRepository: MisionRepository) { }

    async execute(): Promise<Mision[] | null> {      
        return await this.misionRepository.findAll();
    }
}