import { UserController } from "@/controllers/UserController";
import express, { Request, Response } from "express";

const userController = new UserController();
const router = express.Router();

router.get("/:id", async(req: Request, res: Response) => await userController.getUserById(req, res));

export default router;