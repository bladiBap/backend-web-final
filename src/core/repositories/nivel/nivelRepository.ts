import { Level, LevelCreate } from "../../domain/entities/level";

export interface NivelRepository {
    save(nivel: LevelCreate): Promise<Level>;
    update(id: number, nivel: LevelCreate): Promise<Level>;
    findAll(): Promise<Level[]>;
    findById(id: number): Promise<Level | null>;
    delete(id: number): Promise<void>;
}