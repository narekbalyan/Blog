import bcrypt from 'bcrypt';
import {User} from '../entity/User';
import { AppDataSource } from "../data-source";

class RegisterService {
    async register(body: object) {
        const {email, password}: any = body;

        const hashedPassword: string = await bcrypt.hash(password, 10);
        const credentials: object = {email, password: hashedPassword};
        const newUser: User = AppDataSource.getRepository(User).create(credentials);

        if (!(newUser.password && newUser.email)) {
            throw new Error("Missing password or email");
        }

        await AppDataSource.getRepository(User).save(newUser);
    }
}

export const registerService = new RegisterService();