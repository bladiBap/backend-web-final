import { Cuestionario } from "../../domain/entities/cuestionarios/cuestionario";

export interface CuestionarioRepository {
    save(cuestionario: Cuestionario): Promise<Cuestionario>;
    update(id: number, cuestionario: Cuestionario): Promise<Cuestionario>;
    findAll(): Promise<Cuestionario[]>;
    findById(id: number): Promise<Cuestionario | null>;
    delete(id: number): Promise<void>;
    // findByTitle(title: string): Promise<Cuestionario | null>;
    // findByUser(userId: number): Promise<Cuestionario[]>;
}