import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export class UserController {
    static async getUser(req: Request, res: Response, next: NextFunction) {
        try {

            const user = User.find({ UserName: req.body.UserName });

            console.log(user);

            res.status(200).json({
                data: user,
                success: true
            });
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

            console.log(req.body);

            const update = req.body.data;
    
            const name = req.body.UserName;
            
            const result = await User.findByIdAndUpdate({UserName: name}, { ...update }, {new: true});

            res.status(200).json({
                data: result,
                success: true
            });
        } catch (error) {

            next(error);
        }
    }
}