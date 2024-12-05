type rol = 'ADMIN' | 'USER';

export class Usuario {
    constructor(
        public nombre: string,
        public apellido: string,
        public correo: string,
        public rol: rol,
        public contrasena?: string,
        public id?: number
    ) { }
}

export class UsuarioWithPowerups{
    constructor(
        public nombre: string,
        public apellido: string,
        public correo: string,
        public rol: rol,
        public puntaje: number,
        public usuariopowerup : any,
        public contrasena?: string,
        public id?: number,
        // public powerups?: number
    ) { }
}
