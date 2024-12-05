export class Mision {
    constructor(
        public nombre: string,
        public descripcion: string,
        public objetivo: number,
        public por_puntos : boolean,
        public recompensa: number,
        public fk_powerup? : number,
        public id?: number
    ) { }
}