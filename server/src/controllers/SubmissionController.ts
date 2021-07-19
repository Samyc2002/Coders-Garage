import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import Submission from '../models/submissions';

export class SubmisionController {

    static async getSubmissions(req: Request, res: Response, next: NextFunction) {

        try {
            
            const submissions = await Submission.find({ Creator: req.params.user });
            
            res.status(200).json({
                data: submissions,
                status: true
            });
        } catch (error) {
            
            console.log(error);
        }
    }

    static async makeSubmission(req: Request, res: Response, next: NextFunction) {

        const newSubmission = new Submission(req.body);

        try {
            
            await newSubmission.save();

            res.status(200).json({
                data: newSubmission,
                status: true
            });
        } catch (error) {
            
            console.log(error);
        }
    }
}