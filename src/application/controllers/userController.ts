import { Request, Response } from 'express';
import { UserRepositoryImpl } from '../../infrastructure/repositories/userRepositoryImpl';
import { CreateUser } from '../../core/domain/use-cases/user/createUser';
import { UpdateUser } from '../../core/domain/use-cases/user/updateUser';
import { DeleteUser } from '../../core/domain/use-cases/user/deleteUser';

export class UserController {
    private userRepository = new UserRepositoryImpl();

    async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await this.userRepository.findAll();
        res.json(users);
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const { name, lastname, phone, email, password, dateOfBirth } = req.body;
        const userEmail = await this.userRepository.findByEmail(email);
        if (userEmail) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        // Validación: Nombre y Apellido no pueden estar vacíos
        if (!name || name.trim() === '') {
            res.status(400).json({ message: 'El nombre no puede estar vacío.' });
            return;
        }

        if (!lastname || lastname.trim() === '') {
            res.status(400).json({ message: 'El apellido no puede estar vacío.' });
            return;
        }

        // Validación: Contraseña no puede estar vacía
        if (!password || password.trim() === '') {
            res.status(400).json({ message: 'La contraseña no puede estar vacía.' });
            return;
        }

        // Validación: Email no puede estar vacío
        if (!email || email.trim() === '') {
            res.status(400).json({ message: 'El email no puede estar vacío.' });
            return;
        }
        try {
            const createUser = new CreateUser(this.userRepository);
            const user = await createUser.execute({ name, lastname, phone, email, password, dateOfBirth });
            const { password: _, ...userWithoutPassword } = user;
            res.status(201).json({ ...userWithoutPassword });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const user = await this.userRepository.findById(Number(id));
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const { password: _, ...userWithoutPassword } = user;
            res.status(200).json({ ...userWithoutPassword });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const user = await this.userRepository.findById(Number(id));
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const { name, lastname, phone, email, dateOfBirth } = req.body;

        const userEmail = await this.userRepository.findByEmail(email);
        if (userEmail && (userEmail.id != idInt)) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }

        // Validación: Nombre y Apellido no pueden estar vacíos
        if (!name || name.trim() === '') {
            res.status(400).json({ message: 'El nombre no puede estar vacío.' });
            return;
        }

        // Validacion: Apellido no puede estar vacio
        if (!lastname || lastname.trim() === '') {
            res.status(400).json({ message: 'El apellido no puede estar vacío.' });
            return;
        }

        // Validación: Email no puede estar vacío
        if (!email || email.trim() === '') {
            res.status(400).json({ message: 'El email no puede estar vacío.' });
            return;
        }
        const password = user.password;
        try {
            const updateUser = new UpdateUser(this.userRepository);
            const updatedUser = await updateUser.execute({ idInt, name, lastname, phone, email, password, dateOfBirth });
            res.json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const user = await this.userRepository.findById(Number(id));
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        try {
            const deleteUser = new DeleteUser(this.userRepository);
            await deleteUser.execute(idInt);
            res.json({ message: 'User deleted successfully' });
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}