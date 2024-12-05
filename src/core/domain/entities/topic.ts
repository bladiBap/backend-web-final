import { Cuestionario } from "./cuestionarios/cuestionario";

export class Topic {
    constructor(
        public nombre: string,
        public descripcion: string,
        public id?: number,
    ) { }
}

export class TopicWithCuestionarios {
    constructor(
        public nombre: string,
        public descripcion: string,
        public cuestionarios: Cuestionario[],
        public id?: number,
    ) { }
}

export class TopicCreate {
    constructor(
        public nombre: string,
        public descripcion: string,
    ) { }
}