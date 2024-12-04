import { Opcion } from "./opcion";

export class Pregunta {
    constructor(
        public enunciado: string,
        public opciones: Opcion[],
        public id?: number,
    ) { }
}

export class PreguntaCreate {
    constructor(
        public enunciado: string,
        public cuestionario_id: number,
        public opciones: Opcion[],
    ) { }
}