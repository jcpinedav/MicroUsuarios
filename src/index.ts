import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import * as cors from 'cors';
import * as helmet from 'helmet';
import routes from './routes/index';

const PORT = process.env.PORT || 3000;

createConnection().then(async () => {

    // create express app
    const app = express();
    //Middleware
    app.use(cors());
    app.use(helmet());

    app.use(express.json());
    //Rutas
    app.use('/', routes);
    // start express server
    app.listen(PORT);

}).catch(error => console.log(error));