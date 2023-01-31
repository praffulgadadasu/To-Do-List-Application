import express from 'express'
import { PrismaClient } from '@prisma/client'
import consola, { Consola } from 'consola'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import { auth as AuthRoute } from './routes/Auth';

export class Server{
    public app: express.Application;
    public logger: Consola = consola;
    private prisma: PrismaClient = new PrismaClient();
    public constructor(){
        this.app = express();
        this.app.use(express.json());
    }

    public start(){
        this.setConfig();
        this.setRequestLogger();
        this.setRoutes();

        this.app.listen(process.env.PORT, () =>{
            this.logger.success(`Server running successfully on port ${process.env.PORT}`);
        })
    }
    private setConfig(){
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(cors());
        this.app.use(cookieParser());
        dotenv.config();
    }

    private setRequestLogger(){
        this.app.use(async(req, res, next)=>{
            console.log(`[${req.method} - ${req.path}]`);
            next();
        });
    }
    private setRoutes(){
        this.app.use("/api/v1/auth", AuthRoute);
    }
}