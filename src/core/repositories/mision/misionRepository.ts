import { Mision } from "../../domain/entities/mision/mision";

export interface MisionRepository {
    save(mision: Mision): Promise<Mision>;
    update(id: number, mision: Mision): Promise<Mision>;
    findAll(): Promise<Mision[]>;
    findById(id: number): Promise<Mision | null>;
    deleteHard(id: number): Promise<void>;
    deleteSoft(id: number): Promise<void>;
}