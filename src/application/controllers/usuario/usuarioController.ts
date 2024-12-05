import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {serialize} from 'cookie';

import { generarJWT, validarJWT } from '../../../utils/jwt';
import { UsuarioRepositoryImpl } from '../../../infrastructure/repositories/usuario/usuarioRepositoryImpl';
import { LogroRepositoryImpl } from '../../../infrastructure/repositories/logro/logroRepositoryImpl';
import { MisionRepositoryImpl } from '../../../infrastructure/repositories/mision/misionRepositoryImpl';
import { CreateUsuario } from '../../../core/domain/use-cases/usuario/createUsuario';
import { UpdateUsuario } from '../../../core/domain/use-cases/usuario/updateUsuario';
import { DeleteUsuario } from '../../../core/domain/use-cases/usuario/deleteUsuario';
import { GetUsuario } from '../../../core/domain/use-cases/usuario/getUsuario';
import { GetAllUsuario } from '../../../core/domain/use-cases/usuario/getAllUsuario';
import { AssignPowerupToUser } from '../../../core/domain/use-cases/usuario/assignPowerupToUser';
import { CompleteCuestionario } from '../../../core/domain/use-cases/usuario/completeCuestionario';
import { PowerUpRepositoryImpl } from '../../../infrastructure/repositories/powerup/powerupRepositoryImpl';
import { GetAllLogro } from '../../../core/domain/use-cases/logro/getAllLogro';
import { GetAllMision } from '../../../core/domain/use-cases/mision/getAllMision';

export class UsuarioController {

    private usuarioRepository = new UsuarioRepositoryImpl();
    private powerupRepository = new PowerUpRepositoryImpl();
    private logroRepository = new LogroRepositoryImpl();
    private misionRepository = new MisionRepositoryImpl();

    async getAllUsuario(req: Request, res: Response): Promise<void> {
        const usuarioClass = new GetAllUsuario(this.usuarioRepository);
        const usuarios = await usuarioClass.execute();
        res.json(usuarios);
    }

    async getUsuarioById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const usuarioClass = new GetUsuario(this.usuarioRepository);
        const usuario = await usuarioClass.executeById(idInt);
        if (!usuario) {
            res.status(404).json({ message: 'Usuario not found' });
            return;
        }
        usuario.contrasena = '';
        res.json(usuario);
    }

    async createUsuario(req: Request, res: Response): Promise<void> {
        const { nombre, apellido, correo, contrasena, rol} = req.body;
        if (!nombre || !apellido || !correo || !contrasena || !rol) {
            res.status(400).json({ message: 'Los campos nombre, apellido, correo, contrasena y rol son requeridos.' });
            return;
        }
        const usuarioClass = new CreateUsuario(this.usuarioRepository);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
        const usuario = await usuarioClass.execute({ nombre, apellido, correo, contrasena : contrasenaEncriptada, rol });
        usuario.contrasena = '';
        res.json(usuario);
    }

    async updateUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const usuarioClass = new GetUsuario(this.usuarioRepository);
        const usuario = await usuarioClass.executeById(idInt);
        if (!usuario) {
            res.status(404).json({ message: 'Usuario not found' });
            return;
        }
        const { nombre, apellido, correo, rol } = req.body;
        if (!nombre || !apellido || !correo || !rol) {
            res.status(400).json({ message: 'Los campos nombre, apellido, correo y rol son requeridos.' });
            return;
        }

        const updateUsuario = new UpdateUsuario(this.usuarioRepository);
        const updatedUsuario = await updateUsuario.execute({ idInt, nombre, apellido, correo, rol });
        updatedUsuario.contrasena = '';
        res.json(updatedUsuario);
    }

    async deleteUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const usuarioClass = new GetUsuario(this.usuarioRepository);
        const usuario = await usuarioClass.executeById(idInt);
        if (!usuario) {
            res.status(404).json({ message: 'Usuario not found' });
            return;
        }
        const deleteUsuario = new DeleteUsuario(this.usuarioRepository);
        await deleteUsuario.execute(idInt);
        res.json({ message: 'Usuario deleted successfully' });
    }

    async login(req: Request, res: Response): Promise<void> {
        const { correo, contrasena } = req.body;
        if (!correo || !contrasena) {
            res.status(400).json({ message: 'Los campos correo y contrasena son requeridos.' });
            return;
        }
        const usuarioClass = new GetUsuario(this.usuarioRepository);
        const usuario = await usuarioClass.executeByEmail(correo);
        if (!usuario) {
            res.status(404).json({ message: 'Usuario not found' });
            return;
        }
        const contrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena ?? '');
        if (!contrasenaCorrecta) {
            res.status(401).json({ message: 'Credentials are incorrect' });
            return;
        }
        usuario.contrasena = '';
        const token = generarJWT(usuario);
        const NodeEnv = process.env.NODE_ENV || 'development';
        const serializedToken = serialize('token', token, {
            httpOnly: true,
            secure: NodeEnv === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/'
        });
        res.setHeader('Set-Cookie', serializedToken);
        res.json({message: 'Login successful'});
    }

    async logout(req: Request, res: Response): Promise<any> {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const tokenDecoded = validarJWT(token);
        if (!tokenDecoded) return res.status(401).json({ message: 'Unauthorized' });
        const NodeEnv = process.env.NODE_ENV || 'development';
        const serializedToken = serialize('token', '', {
            httpOnly: true,
            secure: NodeEnv === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        });
        res.setHeader('Set-Cookie', serializedToken);
        res.json({ message: 'Logout successful' });
    }

    async getUserByToken(req: Request, res: Response): Promise<any> {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const tokenDecoded = validarJWT(token);
        if (!tokenDecoded) return res.status(401).json({ message: 'Unauthorized' });
        res.json(tokenDecoded);
    }


    async assignPowerupToUser(req: Request, res: Response): Promise<void> {
        const { userId, powerupId, cantidad } = req.body;
        if (!userId || !powerupId || !cantidad) {
            res.status(400).json({ message: 'Los campos id, powerupId y cantidad son requeridos.' });
            return;
        }

        const powerup = this.powerupRepository.findById(powerupId);
        if (!powerup) {
            res.status(404).json({ message: 'Powerup not found' });
            return;
        }

        const assignPowerup = new AssignPowerupToUser(this.usuarioRepository);
        await assignPowerup.execute({ userId, powerupId, cantidad });
        res.json({ message: 'Powerup assigned to user successfully' });
    }

    async getUserByEmailAddress(req: Request, res: Response): Promise<any> {
        const { correo } = req.body;
        const usuarioClass = new GetUsuario(this.usuarioRepository);
        const usuario = await usuarioClass.executeByEmail(correo);
        if (!usuario) {
            res.status(404).json({ message: 'Usuario not found' });
            return;
        }
        usuario.contrasena = '';
        res.json(usuario);
    }

    async getAllInformationUser(req: Request, res: Response): Promise<any> {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const tokenDecoded = validarJWT(token);
        if (!tokenDecoded) return res.status(401).json({ message: 'Unauthorized' });
        if (typeof tokenDecoded === 'object' && tokenDecoded !== null && 'id' in tokenDecoded) {
            const allInformation = await this.usuarioRepository.getAllInformation(tokenDecoded.id);
            res.json(allInformation);
        }else{
            res.status(401).json({ message: 'Token invalid' });
        }
    }

    async verifyCompleteLogroByCuestionario(req: Request, res: Response): Promise<any> {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const tokenDecoded = validarJWT(token);
        if (!tokenDecoded) return res.status(401).json({ message: 'Unauthorized' });
        if (typeof tokenDecoded === 'object' && tokenDecoded !== null && 'id' in tokenDecoded) {
            const cuestionarios = await this.usuarioRepository.getCuestionariosCompletesByUserId(tokenDecoded.id);
            const user = await this.usuarioRepository.findById(tokenDecoded.id);
            const cantidadCuestionarios = cuestionarios.length;
            const logros = await new GetAllLogro(this.logroRepository).execute();
            if (!logros) return res.status(404).json({ message: 'Logros not found' });
            if (!user) return res.status(404).json({ message: 'User not found' });
            for (const logro of logros) {
                if (logro.id === undefined) continue;
                if (user.puntaje === undefined) continue;
                const areLogro = await this.usuarioRepository.verifyLogroUser(tokenDecoded.id, logro.id);
                if (areLogro) continue
                if (cantidadCuestionarios >=  logro.objetivo && logro.por_puntos === false) { 
                    await this.usuarioRepository.completeLogro(tokenDecoded.id, logro.id);
                    await this.usuarioRepository.updatePuntaje(tokenDecoded.id, logro.recompensa);
                }

                if (user.puntaje >= logro.objetivo && logro.por_puntos === true) {
                    await this.usuarioRepository.completeLogro(tokenDecoded.id, logro.id);
                    await this.usuarioRepository.updatePuntaje(tokenDecoded.id, logro.recompensa);
                }
            }
            res.json("Cuestionarios Verificados");
        }else{
            res.status(401).json({ message: 'Token invalid' });
        }
    }

    async verifyCompleteMisionCuestionario(req: Request, res: Response): Promise<any> {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const tokenDecoded = validarJWT(token);
        if (!tokenDecoded) return res.status(401).json({ message: 'Unauthorized' });
        if (typeof tokenDecoded === 'object' && tokenDecoded !== null && 'id' in tokenDecoded) {
            const cuestionarios = await this.usuarioRepository.getCuestionariosCompletesByUserId(tokenDecoded.id);
            const user = await this.usuarioRepository.findById(tokenDecoded.id);
            const cantidadCuestionarios = cuestionarios.length;
            const misiones = await new GetAllMision(this.misionRepository).execute();
            if (!misiones) return res.status(404).json({ message: 'Misiones not found' });
            if (!user) return res.status(404).json({ message: 'User not found' });
            for (const mision of misiones) {
                if (mision.id === undefined) continue;
                if (mision.fk_powerup === undefined) continue;
                if (user.puntaje === undefined) continue;
                const areMision = await this.usuarioRepository.verifyMisionUser(tokenDecoded.id, mision.id);
                if (areMision) continue
                if (cantidadCuestionarios >=  mision.objetivo && mision.por_puntos === false) { 
                    await this.usuarioRepository.completeMision(tokenDecoded.id, mision.id);
                    await this.usuarioRepository.assignPowerupToUser(tokenDecoded.id, mision.fk_powerup, 1);
                }

                if (user.puntaje >= mision.objetivo && mision.por_puntos === true) {
                    await this.usuarioRepository.completeMision(tokenDecoded.id, mision.id);
                    await this.usuarioRepository.updatePuntaje(tokenDecoded.id, mision.recompensa);
                }
            }
            res.json("Cuestionarios Verificados");
        }else{
            res.status(401).json({ message: 'Token invalid' });
        }
    }

    async completeCuestionario(req: Request, res: Response): Promise<any> {
        const { token } = req.cookies;
        const { fk_cuestionario } = req.body;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const tokenDecoded = validarJWT(token);
        if (!tokenDecoded) return res.status(401).json({ message: 'Unauthorized' });
        if (typeof tokenDecoded === 'object' && tokenDecoded !== null && 'id' in tokenDecoded) {
            const complete = new CompleteCuestionario(this.usuarioRepository);
            await complete.execute(tokenDecoded.id, fk_cuestionario);
            res.json({ message: 'Cuestionario completado' });
        }else{
            res.status(401).json({ message: 'Token invalid' });
        }
    }
}