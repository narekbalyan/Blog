import express, {Request, Response} from "express";
import {loginController} from "../controllers/login";

export const routerLogin = express.Router();

routerLogin.post('/', async (req: Request, res: Response) => {
    res.send(await loginController.login(req, res));
});