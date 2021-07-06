import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import Interview from '../models/Interview';

export class InterviewController {

    static async getInterview(req: Request, res: Response, next: NextFunction) {

        try {

            const interview = await Interview.find();

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

            res.status(201).json({
                data: newInterview,
                success: true
            });
        } catch (error) {

            next(error);
        }
    }
}