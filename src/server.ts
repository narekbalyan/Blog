import { AppDataSource } from "./data-source";
import {config} from "dotenv";
import express from "express";
import cors from "cors";
import { routerRecords } from "./routes/records";
import { routerRegister } from "./routes/register";
import { routerLogin } from "./routes/login";
import { jwtVerify } from "./authentication/jwtVerify";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerDocument from "./swagger.json";
import fileupload from "express-fileupload";

config();

const app = express();
app.use(cors());

AppDataSource.initialize().then(async () => {
    const PORT = process.env.PORT || 3001;
    app.use(express.json());
    app.use(fileupload());

    app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerDocument)));

    app.use(jwtVerify);

    app.use("/api/register", routerRegister);
    app.use("/api/login", routerLogin);

    app.use("/api/records/", routerRecords);

    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });

}).catch(error => console.log(error))