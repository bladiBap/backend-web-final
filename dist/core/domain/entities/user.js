"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, lastname, phone, email, password, dateOfBirth, tasks) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.tasks = tasks;
    }
}
exports.User = User;
