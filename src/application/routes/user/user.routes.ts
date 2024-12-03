import { Router } from "express";
import { UserController } from "../../controllers/userController";


const router = Router();
const userController = new UserController();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;