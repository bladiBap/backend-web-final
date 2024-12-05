import { Pregunta, PreguntaCreate } from "./pregunta";

export class Cuestionario {
    constructor (
        public titulo: string,
        public descripcion: string,
        public id?: number,
    ) {}
}

export class CuestionarioDetail {
    constructor (
        public titulo: string,
        public descripcion: string,
        public preguntas: Pregunta[],
        public id?: number,
    ) {}
}

export class CuestionarioCreate {
    constructor (
        public titulo: string,
        public descripcion: string,
        public preguntas: Omit<PreguntaCreate, "cuestionario_id">[],
    ) {}
}