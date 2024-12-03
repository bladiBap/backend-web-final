import { UserTask } from "@prisma/client";

export class Task {
    constructor(
        public title: string,
        public details: string,
        public startDate: Date,
        public endDate: Date,
        public isCompleted: boolean,
        public users: UserTask[],
        public id?: number,
    ) { }
}