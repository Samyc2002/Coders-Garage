import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import User from '../models/User';

export class UserController {

    static async getUser(req: Request, res: Response, next: NextFunction) {

        const email: string = req.query.Email as string;
        
        try {

            const user = await User.findOne({ Email: email });

            if(user === null) {

                res.status(200).json({
                    data: null,
                    success: false
                });
            }
            else {

                res.status(200).json({
                    data: user,
                    success: true
                });
            }
        } catch (error) {

            next(error);
        }
    }

    static async createUser(req: Request, res: Response, next: NextFunction) {

        const body = req.body;

        const newUser = new User(body);

        try {

            await newUser.save();

            res.status(201).json({
                data: newUser,
                success: true
            });
        } catch (error) {

            next(error);
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        
        try {

            const { City, Country, Image, Institute, Name, Password, State, UserName, questionsCreated, questionsSolved } = req.body;
    
            const email = req.body.Email;
            
            const result = await User.findByIdAndUpdate(Types.ObjectId(req.body._id), { $set: { City, Country, Image, Institute, Name, Password, State, UserName, questionsCreated, questionsSolved, Email: email } }, { new : true });

            res.status(200).json({
                data: result,
                success: true
            });
        } catch (error) {

            next(error);
        }
    }
}