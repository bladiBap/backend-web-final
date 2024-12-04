import { MisionRepository } from "../../../repositories/mision/misionRepository";

export class DeleteMision {
    constructor(private  misionRepository: MisionRepository) { }

    async executeSoft(id: number): Promise<void> {
        return await this.misionRepository.deleteSoft(id);
    }
}

// import { TaskRepository } from "../../../repositories/taskRepository";

// export class DeleteTask {
//     constructor(private taskRepository: TaskRepository) { }

//     async execute(id: number): Promise<void> {
//         return await this.taskRepository.delete(id);
//     }
// }