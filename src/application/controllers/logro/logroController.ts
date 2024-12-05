import { Request, Response } from 'express';
import { LogroRepositoryImpl } from '../../../infrastructure/repositories/logro/logroRepositoryImpl';
import { CreateLogro } from '../../../core/domain/use-cases/logro/createLogro';
import { UpdateLogro } from '../../../core/domain/use-cases/logro/updateLogro';
import { DeleteLogro } from '../../../core/domain/use-cases/logro/deleteLogro';
import { GetLogroById } from '../../../core/domain/use-cases/logro/getLogroById';
import { GetAllLogro } from '../../../core/domain/use-cases/logro/getAllLogro';

export class LogroController {

    private logroRepository = new LogroRepositoryImpl();

    async getAllLogro(req: Request, res: Response): Promise<void> {
        const logroClass = new GetAllLogro(this.logroRepository);
        const logros = await logroClass.execute();
        res.json(logros);
    }

    async getLogroById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const logroClass = new GetLogroById(this.logroRepository);
        const logro = await logroClass.execute(idInt);
        if (!logro) {
            res.status(404).json({ message: 'Logro not found' });
            return;
        }
        res.json(logro);
    }

    async createLogro(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion, objetivo, por_puntos, recompensa } = req.body;
        if (!nombre || !descripcion || !objetivo || por_puntos === null || por_puntos === undefined || !recompensa ) {
            res.status(400).json({ message: 'Los campos nombre, descripcion, objetivo, por_puntos y recompensa son requeridos.' });
            return;
        }
        const logroClass = new CreateLogro(this.logroRepository);
        const logro = await logroClass.execute({ nombre, descripcion, objetivo, por_puntos, recompensa });
        res.json(logro);
    }

    async updateLogro(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const logroClassId = new GetLogroById(this.logroRepository);
        const logro = await logroClassId.execute(idInt);
        if (!logro) {
            res.status(404).json({ message: 'Logro not found' });
            return;
        }
        const { nombre, descripcion, objetivo, por_puntos, recompensa } = req.body;
        if (!nombre || !descripcion || !objetivo || por_puntos === null || por_puntos === undefined || !recompensa) {
            res.status(400).json({ message: 'Los campos nombre, descripcion, objetivo, por_puntos y recompensa son requeridos.' });
            return;
        }
        const logroClass = new UpdateLogro(this.logroRepository);
        const updatedLogro = await logroClass.execute({ idInt, nombre, descripcion, objetivo, por_puntos, recompensa });
        res.json(updatedLogro);
    }

    async deleteSoftLogro(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const logroClassId = new GetLogroById(this.logroRepository);
        const logro = await logroClassId.execute(idInt);
        if (!logro) {
            res.status(404).json({ message: 'Logro not found' });
            return;
        }
        const logroClass = new DeleteLogro(this.logroRepository);
        await logroClass.executeSoft(idInt);
        res.json({ message: 'Logro deleted successfully' });
    }
}