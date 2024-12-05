import { Level } from "./level";

export class PowerUp {
    constructor(
        public nombre: string,
        public descripcion: string,
        public nivel : Level,
        public id?: number,
    ) { }
}

export class PowerUpCreate {
    constructor(
        public nombre: string,
        public descripcion: string,
        public fk_nivel: number,
    ) { }
}