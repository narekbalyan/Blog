import {Request, Response} from "express";
import { recordsService } from "../services/records";

class RecordsController {
    async getRecords(req: Request, res: Response) {
        return await recordsService.getRecords();
    }

    async getRecordById(req: Request, res: Response) {
        return await recordsService.getRecordById(req.params.id);
    }

    async createRecord(req: Request, res: Response) {
        return await recordsService.createRecord(req.body, req);
    }

    async deleteRecord(req: Request, res: Response) {
        return await recordsService.deleteRecord(req.params.id);
    }

    async updateRecord(req: Request, res: Response) {
        return await recordsService.updateRecord(req.params.id, req.body);
    }

    async uploadFile(req: Request, res: Response) {
        return await recordsService.uploadFile(req.files?.file, req);
    }
}

export const recordsController = new RecordsController();