import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {serialize} from 'cookie';

import { generarJWT, validarJWT } from '../../../utils/jwt';
import { UsuarioRepositoryImpl } from '../../../infrastructure/repositories/usuario/usuarioRepositoryImpl';
import { CreateUsuario } from '../../../core/domain/use-cases/usuario/createUsuario';
import { UpdateUsuario } from '../../../core/domain/use-cases/usuario/updateUsuario';
import { DeleteUsuario } from '../../../core/domain/use-cases/usuario/deleteUsuario';
import { GetUsuario } from '../../../core/domain/use-cases/usuario/getUsuario';
import { GetAllUsuario } from '../../../core/domain/use-cases/usuario/getAllUsuario';
import { AssignPowerupToUser } from '../../../core/domain/use-cases/usuario/assignPowerupToUser';
import { PowerUpRepositoryImpl } from '../../../infrastructure/repositories/powerup/powerupRepositoryImpl';

export class UsuarioController {

    private usuarioRepository = new UsuarioRepositoryImpl();
    private powerupRepository = new PowerUpRepositoryImpl();

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
        // console.log(token);
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
}