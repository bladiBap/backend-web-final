import { Pregunta, PreguntaCreate } from "../../domain/entities/cuestionarios/pregunta";

export interface PreguntaRepository {
    save(pregunta: PreguntaCreate): Promise<Pregunta>;
    update(id: number, pregunta: Omit<PreguntaCreate, "cuestionario_id">): Promise<Pregunta>;
    findAll(): Promise<Pregunta[]>;
    findById(id: number): Promise<Pregunta | null>;
    delete(id: number): Promise<void>;
}