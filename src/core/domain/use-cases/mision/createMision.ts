import { MisionRepository } from "../../../repositories/mision/misionRepository";
import { Mision } from "../../entities/mision";

export class CreateMision {
    constructor(private  misionRepository: MisionRepository) { }

    async execute(data: { nombre: string; descripcion: string; objetivo: number; por_puntos: boolean; recompensa: number; fk_powerup: number }): Promise<Mision> {
        const newMision = new Mision(
            data.nombre,
            data.descripcion,
            data.objetivo,
            data.por_puntos,
            data.recompensa,
            data.fk_powerup
        );
        return await this.misionRepository.save(newMision);
    }
}

// import { TaskRepository } from "../../../repositories/taskRepository";
// import { Task } from "../../entities/task";

// export class CreateTask {
//     constructor(private taskRepository: TaskRepository) { }

//     async execute(data: { title: string; details: string; startDate: Date; endDate: Date, isCompleted : boolean }): Promise<Task> {
//         const newTask = new Task(
//             data.title,
//             data.details,
//             data.startDate,
//             data.endDate,
//             data.isCompleted,
//             []
//         );
//         return await this.taskRepository.save(newTask);
//     }
// }