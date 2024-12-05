import { TopicoRepository } from "../../../repositories/topico/topicoRepository";

export class DeleteTopico {
    constructor(
        private topicoRepository: TopicoRepository
    ) { }

    async execute(
        id: number
    ): Promise<void> {
        return await this.topicoRepository.delete(id);
    }
}