import { Request, Response } from 'express';
import { MisionRepositoryImpl } from '../../../infrastructure/repositories/mision/misionRepositoryImpl';
import { CreateMision } from '../../../core/domain/use-cases/mision/createMision';
import { UpdateMision } from '../../../core/domain/use-cases/mision/updateMision';
import { DeleteMision } from '../../../core/domain/use-cases/mision/deleteMision';
import { GetMisionById } from '../../../core/domain/use-cases/mision/getMisionById';
import { GetAllMision } from '../../../core/domain/use-cases/mision/getAllMision';

export class MisionController {

    private misionRepository = new MisionRepositoryImpl();

    async getAllMision(req: Request, res: Response): Promise<void> {
        const misionClass = new GetAllMision(this.misionRepository);
        const misiones = await misionClass.execute();
        res.json(misiones);
    }

    async getMisionById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const misionClass = new GetMisionById(this.misionRepository);
        const mision = await misionClass.execute(idInt);
        if (!mision) {
            res.status(404).json({ message: 'Mision not found' });
            return;
        }
        res.json(mision);
    }

    async createMision(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion, objetivo, por_puntos, recompensa, fk_powerup } = req.body;
        if (!nombre || !descripcion || !objetivo || por_puntos === null || por_puntos === undefined || !recompensa || !fk_powerup) {
            res.status(400).json({ message: 'Los campos nombre, descripcion, objetivo, por_puntos, recompensa y fk_powerup son requeridos.' });
            return;
        }
        const createMision = new CreateMision(this.misionRepository);
        const mision = await createMision.execute({ nombre, descripcion, objetivo, por_puntos, recompensa, fk_powerup });
        res.json(mision);
    }

    async updateMision(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const misionClass = new GetMisionById(this.misionRepository);
        const mision = await misionClass.execute(idInt);
        if (!mision) {
            res.status(404).json({ message: 'Mision not found' });
            return;
        }
        const { nombre, descripcion, objetivo, por_puntos, recompensa, fk_powerup } = req.body;
        if (!nombre || !descripcion || !objetivo || por_puntos === null || por_puntos === undefined || !recompensa || !fk_powerup) {
            res.status(400).json({ message: 'Los campos nombre, descripcion, objetivo, por_puntos, recompensa y fk_powerup son requeridos.' });
            return;
        }
        const updateMision = new UpdateMision(this.misionRepository);
        const updatedMision = await updateMision.execute({ idInt, nombre, descripcion, objetivo, por_puntos, recompensa, fk_powerup });
        res.json(updatedMision);
    }

    async deleteSoftMision(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const misionClass = new GetMisionById(this.misionRepository);
        const mision = await misionClass.execute(idInt);
        if (!mision) {
            res.status(404).json({ message: 'Mision not found' });
            return;
        }
        const deleteMision = new DeleteMision(this.misionRepository);
        await deleteMision.executeSoft(idInt);
        res.json({ message: 'Mision deleted successfully' });
    }
}