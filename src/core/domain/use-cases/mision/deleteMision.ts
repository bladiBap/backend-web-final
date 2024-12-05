import { MisionRepository } from "../../../repositories/mision/misionRepository";

export class DeleteMision {
    constructor(private  misionRepository: MisionRepository) { }

    async executeSoft(id: number): Promise<void> {
        return await this.misionRepository.deleteSoft(id);
    }
}