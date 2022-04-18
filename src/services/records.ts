import { Record } from "../entity/Record";
import { AppDataSource } from "../data-source"
import jwt from "jsonwebtoken";
import { Request } from "express"

class RecordsService {
    async getRecords() {
        const records = await AppDataSource.getRepository(Record)
        .createQueryBuilder("record")
        .where("record.status = :status", {status: "active"})
        .getMany();

        return {
            records
        }
    }

    async getRecordById(id: string) {
        const record = await AppDataSource.getRepository(Record)
        .createQueryBuilder("record")
        .where("record.status = :status AND record.id = :id", {status: "active", id: id})
        .getOne();

        return record;
    }

    async createRecord(body: object, req: Request) {
        const authHeader: string = req.headers['Authorization'] || req.headers['authorization'] || req.body['token'];

        const token: string = authHeader && authHeader.split(' ')[1];

        const secret_key: string = process.env.SECRET_KEY as string;
        const tokenData: { id: string } = jwt.verify(token, secret_key) as { id: string };

        const {id}: { id: string } = tokenData;

        const record = AppDataSource.getRepository(Record).create(body);
        record.status = "active";
        record.created = new Date();
        record.userId = id;
        record.user_id = id;

        return await AppDataSource.manager.save(record);
    }

    async deleteRecord(id: string) {
        const record = await AppDataSource.getRepository(Record).findOneBy({
            id
        });

        if(record) {
            record.status = "inactive";
            AppDataSource.manager.save(record);
        }
    }

    async updateRecord(id: string, body: object) {
        const record = await AppDataSource.getRepository(Record).findOneBy({
            id
        });

        if (record) {
            AppDataSource.getRepository(Record).merge(record, body);

            record.updated = new Date();

            return await AppDataSource.manager.save(record);

        }
    }

    async uploadFile(file: any, req: Request) {
        const authHeader: string = req.headers['Authorization'] || req.headers['authorization'] || req.body['token'];

        const token: string = authHeader && authHeader.split(' ')[1];

        const secret_key: string = process.env.SECRET_KEY as string;
        const tokenData: { id: string } = jwt.verify(token, secret_key) as { id: string };

        const {id}: { id: string } = tokenData;
        
        const record: any = AppDataSource.getRepository(Record).create();
        record.file_data = file.data.toString("base64");
        record.file_name = file.name;
        record.created = new Date();
        record.status = "active";
        record.userId = id;
        record.user_id = id;
    
        return await AppDataSource.manager.save(record);
    }
}

export const recordsService = new RecordsService();