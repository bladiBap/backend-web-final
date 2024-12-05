import { MisionRepository } from "../../../repositories/mision/misionRepository";
import { Mision } from "../../entities/mision/mision";

export class GetMisionById {
    constructor(private  misionRepository: MisionRepository) { }

    async execute(id: number): Promise<Mision | null> {      
        return await this.misionRepository.findById(id);
    }
}