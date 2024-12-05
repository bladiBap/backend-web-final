export class Level {
    constructor(
        public nombre: string,
        public descripcion: string,
        public id?: number,
    ) { }
}


export class LevelCreate {
    constructor(
        public nombre: string,
        public descripcion: string,
    ) { }
}