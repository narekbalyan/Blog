import {NextFunction, Response} from "express";
import jwt from "jsonwebtoken";
import {User} from "../entity/User";
import { AppDataSource } from "../data-source";

export async function jwtVerify(req: any, res: Response, next: NextFunction) {

    try {
        if (checkUrlMatching(req.url)) {
            return next();
        }
    
        const authHeader: string = req.headers['authorization'] || req.headers['Authorization'] || req.body['token'];
    
        if (!authHeader) {
            throw new Error("Unauthorized")
        }
    
        const token: string  = authHeader && authHeader.split(' ')[1]; 
    
        if (!token) {
            throw new Error("Unauthorized")
        }
    
        const secret_key: string = process.env.SECRET_KEY as string;
        const tokenData: {id: string } = jwt.verify(token, secret_key) as {id: string};
    
        if (!tokenData) {
            throw new Error("Unauthorized")
        }

        const {id}: {id: string } = tokenData;
        
        const user: User | null = await AppDataSource.getRepository(User).findOneBy({
            id
        });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        next();
    } catch (err) {
        res.sendStatus(401);
    }
}

function checkUrlMatching(url: string): boolean {
    const nonTokenizedUrls = ['/register', '/login', '/docs'];
    const actualUrl = url.replace('/api', '');
    let hasMatched = false;

    for (const key in nonTokenizedUrls) {
        if (actualUrl === nonTokenizedUrls[key]) {
            hasMatched = true;
            break;
        }
    }

    return hasMatched;
}