import { MisionRepository } from "../../../repositories/mision/misionRepository";
import { Mision } from "../../entities/mision";

export class UpdateMision {
    constructor(private misionRepository: MisionRepository) { }

    async execute(data: { idInt: number; nombre: string; descripcion: string; objetivo: number; por_puntos: boolean; recompensa: number; fk_powerup: number }): Promise<Mision> {
        const mision = await this.misionRepository.findById(data.idInt);
        if (!mision) {
            throw new Error("Mision not found");
        }
        const updatedMision = new Mision(
            data.nombre,
            data.descripcion,
            data.objetivo,
            data.por_puntos,
            data.recompensa,
            data.fk_powerup,
            mision.id
        );
        return await this.misionRepository.update(data.idInt, updatedMision);
    }
}

// import { TaskRepository } from "../../../repositories/taskRepository";
// import { Task } from "../../entities/task";

// export class UpdateTask {
//     constructor(private taskRepository: TaskRepository) { }

//     async execute(data: { idInt: number; title: string; details: string; startDate: Date; endDate: Date; isCompleted: boolean }): Promise<Task> {
//         const task = await this.taskRepository.findById(data.idInt);
//         if (!task) {
//             throw new Error("Task not found");
//         }
//         const updatedTask = new Task(
//             data.title,
//             data.details,
//             data.startDate,
//             data.endDate,
//             data.isCompleted,
//             task.users,
//             task.id
//         );
//         return await this.taskRepository.update(data.idInt, updatedTask);
//     }
// }