import {Request, Response} from "express";
import {loginService} from "../services/login";5

class LoginController {
    async login(req: Request, res: Response) {
        try {
            return await loginService.loginService(req.body)
        } catch (err) {
            res.sendStatus(404)
        }
    }
}

export const loginController = new LoginController()