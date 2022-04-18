import {User} from "../entity/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";

dotenv.config();

class LoginService {
    async loginService(body: object) {
        const secretKey: string = process.env.SECRET_KEY || 'dummySecretKey';
        const {email, password}: any = body;

        const current_user: any = await AppDataSource.getRepository(User).createQueryBuilder('user')
            .where("user.email = :email", {email: email})
            .getOne() as User;

        if (!current_user) {
            throw new Error();
        }

        const isPassMatched: boolean = await bcrypt.compare(password, current_user.password);

        if (!isPassMatched) {
            throw new Error();
        }

        const userId = current_user.id;
        const current_user_id: object = {id: userId};

        const accessToken: string = jwt.sign(current_user_id, secretKey);

        delete current_user.password;

        return {
            ...current_user,
            token: accessToken
        };
    }
}

export const loginService = new LoginService();