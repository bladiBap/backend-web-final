import { NivelRepository } from "../../../repositories/nivel/nivelRepository";

export class DeleteNivel {
    constructor(
        private nivelRepository: NivelRepository
    ) { }

    async execute(
        id: number
    ): Promise<void> {
        return await this.nivelRepository.delete(id);
    }
}