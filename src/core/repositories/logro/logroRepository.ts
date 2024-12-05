import { Logro } from "../../domain/entities/logro/logro";

export interface LogroRepository {
    save(logro: Logro): Promise<Logro>;
    update(id: number, logro: Logro): Promise<Logro>;
    findAll(): Promise<Logro[]>;
    findById(id: number): Promise<Logro | null>;
    deleteHard(id: number): Promise<void>;
    deleteSoft(id: number): Promise<void>;
}