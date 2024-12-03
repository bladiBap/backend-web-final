import { UserTask } from "@prisma/client";

export class User {
    constructor(
        public name: string,
        public lastname: string,
        public phone: string,
        public email: string,
        public password: string,
        public dateOfBirth: Date,
        public tasks: UserTask[],
        public id?: number,
    ) { }
}