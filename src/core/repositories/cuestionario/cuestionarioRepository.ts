import { Cuestionario, CuestionarioCreate, CuestionarioDetail } from "../../domain/entities/cuestionarios/cuestionario";

export interface CuestionarioRepository {
    save(cuestionario: CuestionarioCreate): Promise<CuestionarioDetail>;
    update(id: number, cuestionario: CuestionarioCreate): Promise<CuestionarioDetail>;
    findAll(): Promise<CuestionarioDetail[]>;
    findById(id: number): Promise<CuestionarioDetail | null>;
    delete(id: number): Promise<void>;
    findByUser(userId: number): Promise<Cuestionario[]>;
    // findByTitle(title: string): Promise<Cuestionario | null>;
}