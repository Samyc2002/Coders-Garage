import express, { Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';

import { getEnvironmentVariables } from './environments/env';
import UserRouter from './routers/UserRouter';
import QuestionRouter from './routers/QuestionRouter';
import AuthRouter from './routers/AuthRouter';
import { ContactEmail } from './middlewares/ContactEmail';

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations() {
        this.connectMongoDb();
        this.configureBodyParser();
        this.configureNodemailer();
		const server = require("http").createServer(this.app);
		const io = require('socket.io')(server, {
			cors: {
				origin: '*',
				methods: [ 'GET', 'POST' ]
			}
		});
		this.app.use(cors());
		interface call{
			userToCall: any,
			signalData: any,
			from: string,
			name: string
		}
		io.on("connection", (socket: any) => {
			socket.emit("me", socket.id);
		
			socket.on("disconnect", () => {
				socket.broadcast.emit("callEnded")
			});
		
			socket.on("callUser", ({ userToCall, signalData, from, name }: call) => {
				io.to(userToCall).emit("callUser", { signal: signalData, from, name });
			});
		
			socket.on("answerCall", (data: any) => {
				io.to(data.to).emit("callAccepted", data.signal)
			});
		});
        console.log('Configurations set up successfully');
    }

    async connectMongoDb() {
        const databaseUrl = getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
        });
        mongoose.connection.on('open', () => {
          console.log('connected successfully to the database');
        });
    }

    setRoutes() {
      this.app.use('/user', UserRouter);
      this.app.use('/question', QuestionRouter);
      this.app.use('/auth', AuthRouter);
    }

    configureBodyParser() {
		this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        console.log('body-parser setup');
    }

    configureNodemailer() {
        const contactEmail = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'coders.garage.soi@gmail.com',
            pass: "I won't say"
          }
        });
        contactEmail.verify((error: any) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Ready to Send');
          }
        });
        const nodemailerData = ContactEmail.getInstance();
        nodemailerData.setContactEmail(contactEmail);
    }

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        });
    }

    handleErrors() {
        this.app.use((error: any, req: any, res: Response) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again',
                status_code: errorStatus,
                success: false
            });
        });
    }
}