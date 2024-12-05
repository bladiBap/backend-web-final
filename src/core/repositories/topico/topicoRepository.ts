import { Topic, TopicCreate } from "../../domain/entities/topic";

export interface TopicoRepository {
    save(topico: TopicCreate): Promise<Topic>;
    update(id: number, topico: TopicCreate): Promise<Topic>;
    findAll(): Promise<Topic[]>;
    findById(id: number): Promise<Topic | null>;
    delete(id: number): Promise<void>;
}