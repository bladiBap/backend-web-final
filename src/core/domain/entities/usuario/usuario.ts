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
