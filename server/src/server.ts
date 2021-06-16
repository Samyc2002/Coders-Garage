import express from 'express';
import { Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';

import { getEnvironmentVariables } from './environments/env';
import { ContactEmail } from './middlewares/ContactEmail';

export class Server {
    public app: express.Application = express();
    
    constructor() {
        this.setConfigurations();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations() {
        this.connectMongoDb();
        this.configureBodyParser();
        this.configureNodemailer();
        this.app.use(cors());
        console.log('Configurations set up successfully');
    }

    async connectMongoDb() {
        const databaseUrl = getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        });
        mongoose.connection.on('open', () => {
          console.log('connection successfully made with database');
        });
    }

    configureBodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
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