export class Logro {
    constructor(
        public nombre: string,
        public descripcion: string,
        public objetivo: number,
        public por_puntos : boolean,
        public recompensa: number,
        public id?: number
    ) { }
}