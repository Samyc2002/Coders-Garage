import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import Question from '../models/Question';

export class QuestionController{

    static async getQuestion(req: Request, res: Response, next: NextFunction) {

        try {
            
            const question = await Question.findOne({ QuestionID: req.body.QuestionID });

            if(question === null) {

                res.status(200).json({
                    data: null,
                    success: false
                });
            }
            else {

                res.status(200).json({
                    data: question,
                    success: true
                });
            }
        } catch (error) {
            
            next(error);
        }
    }

    static async createQuestion(req: Request, res: Response, next: NextFunction) {

        const body = req.body;

        const newQuestion = new Question(body);

        try {
            
            await newQuestion.save();

            res.status(201).json({
                data: newQuestion,
                success: true
            });
        } catch (error) {
            
            next(error);
        }
    }

    static async updateQuestion(req: Request, res: Response, next: NextFunction) {

        try {
            
            const { ProblemStatement, Input, Output, Constraints, SampleInput, SampleOutput, Explanation } = req.body;

            const id = req.body.QuestionID;

            const result = await Question.findByIdAndUpdate(Types.ObjectId(req.body._id), { $set: { ProblemStatement, Input, Output, Constraints, SampleInput, SampleOutput, Explanation, QuestionID: id } }, { new: true });
            
            res.status(200).json({
                data: result,
                success: true
            });
        } catch (error) {
            
            next(error);
        }
    }
}