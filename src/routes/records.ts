import express, {Request, Response} from 'express';
import { recordsController } from "../controllers/records";

export const routerRecords = express.Router();

routerRecords.get("/", async (req: Request, res: Response) => {
    res.send(await recordsController.getRecords(req, res));
});

routerRecords.get("/:id", async (req: Request, res: Response) => {
    res.send(await recordsController.getRecordById(req, res));
});

routerRecords.post("/", async (req: Request, res: Response) => {
    res.send(await recordsController.createRecord(req, res));
});

routerRecords.delete("/:id", async (req: Request, res: Response) => {
    await recordsController.deleteRecord(req, res);

    res.sendStatus(200)
});

routerRecords.patch("/:id", async (req: Request, res: Response) => {
    res.send(await recordsController.updateRecord(req, res));
});

routerRecords.post("/upload", async(req, res) => {
    res.send(await recordsController.uploadFile(req, res));
})