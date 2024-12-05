import { Cuestionario, CuestionarioCreate, CuestionarioDetail } from "../../domain/entities/cuestionarios/cuestionario";

export interface CuestionarioRepository {
    save(cuestionario: CuestionarioCreate): Promise<CuestionarioDetail>;
    update(id: number, cuestionario: CuestionarioCreate): Promise<CuestionarioDetail>;
    findAll(): Promise<Cuestionario[]>;
    findById(id: number): Promise<CuestionarioDetail | null>;
    delete(id: number): Promise<void>;
    // findByTitle(title: string): Promise<Cuestionario | null>;
    // findByUser(userId: number): Promise<Cuestionario[]>;
}