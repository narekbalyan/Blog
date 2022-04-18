import express, {Request, Response} from 'express';
import {registerController} from '../controllers/register';

export const routerRegister = express.Router();

routerRegister.post('/',async (req: Request, res: Response) => {
    await registerController.register(req, res)

    res.sendStatus(200);
});