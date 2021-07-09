import { Request, Response, NextFunction, response } from 'express';
import nodemailer from 'nodemailer';

import Interview from '../models/Interview';

export class InterviewController {

    static async getInterview(req: Request, res: Response, next: NextFunction) {

        try {

            const interview = await Interview.findOne({ RoomId: req.body.RoomId });

            res.status(200).json({
                data: interview,
                success: true
            })
        } catch (error) {

            next(error);
        }
    }

    static async createInterview(req: Request, res: Response, next: NextFunction) {

        const body = req.body;

        const newInterview = new Interview(body);

        try {

            await newInterview.save();

            const message = {

                to: `${req.body.IntervieweeEmail}`,
                from: `Coder's Garage <`+`${req.body.InterviewerEmail}>`,
                subject: `Interview scheduled on ${req.body.StartTime}`,
                text: `This email confirms your interview shedule on ${req.body.StartTime}. Thank You.`,
                html: `<p>This email confirms your interview shedule on ${req.body.StartTime}.<br><br>Thank You.</p>`
            };

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'coders.garage.soi@gmail.com',
                  pass: "I won't say"
                }
            });

            transporter.sendMail(message, (err, info) => {
                if(err) console.log(err);
                else {
                    console.log(`Message sent Successfully. See details at ${nodemailer.getTestMessageUrl(info)}`);
                }
            })

            res.status(201).json({
                data: newInterview,
                success: true
            });
        } catch (error) {

            next(error);
        }
    }

    static async emailInterviewee(req: Request, res: Response, next: NextFunction) {

        const interview = req.body;

        const message = {

            to: `${interview.IntervieweeEmail}`,
            from: `Coder's Garage <`+`${interview.InterviewerEmail}>`,
            subject: `Interviewer ID`,
            text: `Use this ID to connect to interviewer ${interview.id}. Thank You.`,
            html: `<p>Use this ID to connect to interviewer ${interview.id}.<br><br>Thank You.</p>`
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'coders.garage.soi@gmail.com',
              pass: "I won't say"
            }
        });

        transporter.sendMail(message, (err, info) => {
            if(err) console.log(err);
            else {
                console.log(`Message sent Successfully. Get details here ${nodemailer.getTestMessageUrl(info)}`);
            }
        })

        res.status(200).json({
            data: message,
            success: true
        })
    }
}