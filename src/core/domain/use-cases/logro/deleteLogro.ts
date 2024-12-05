import { LogroRepository } from "../../../repositories/logro/logroRepository";

export class DeleteLogro {
    constructor(private  logroRepository: LogroRepository) { }

    async executeSoft(id: number): Promise<void> {
        return await this.logroRepository.deleteSoft(id);
    }
}