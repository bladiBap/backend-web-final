import { PowerUp, PowerUpCreate } from "../../domain/entities/powerup";

export interface PowerUpRepository {
    save(powerup: PowerUpCreate): Promise<PowerUp>;
    update(id: number, powerup: PowerUpCreate): Promise<PowerUp>;
    findAll(): Promise<PowerUp[]>;
    findById(id: number): Promise<PowerUp | null>;
    delete(id: number): Promise<void>;
}