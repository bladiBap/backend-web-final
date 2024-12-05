import { UsuarioRepository } from "../../../repositories/usuario/usuarioRepository";

export class AssignPowerupToUser {
    constructor(private  usuarioRepository: UsuarioRepository) { }

    async execute(data: { userId: number, powerupId: number, cantidad : number  }): Promise<void> {
        await this.usuarioRepository.assignPowerupToUser(data.userId, data.powerupId, data.cantidad);
    }
}