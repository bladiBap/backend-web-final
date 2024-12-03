"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../application/controllers/userController");
const router = (0, express_1.Router)();
const userController = new userController_1.UserController();
// router.post("/login", login);
router.get("/usuarios", userController.getAllUsers);
router.get("/usuarios/:id", userController.getUserById);
router.post("/usuarios", userController.createUser);
router.put("/usuarios/:id", userController.updateUser);
router.delete("/usuarios/:id", userController.deleteUser);
exports.default = router;