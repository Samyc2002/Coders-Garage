import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { getEnvironmentVariables } from '../environments/env';

export class AuthController{
    
    static async signIn(req:Request, res: Response, next: NextFunction) {
        const { Email, Password } = req.body;

        try {
            
            const user = await User.findOne({ Email });

            if(!user) {
                res.status(200).json({
                    data: null,
                    success: false
                });
            }
            else {
                if(Password !== user.Password) {
                    res.status(200).json({
                        data: null,
                        success: false
                    });
                }
                else {
                    const token = jwt.sign({ Email: user.Email, id: user._id }, getEnvironmentVariables().jwt_secret, { expiresIn: '30d' });

                    res.status(200).json({
                        data: { formData: user, token },
                        success: true
                    });
                }
            }
        } catch (error) {
            
            next(error);
        }
    }

    static async signUp(req:Request, res: Response, next: NextFunction) {
        
        const { Email, Password, firstName, lastName } = req.body;

        try {
            
            const user = await User.findOne({ Email });

            if(user !== null) {
                res.status(200).json({
                    data: null,
                    success: false
                });
            }
            else {
                const result = await User.create({ Email, Password, Name: `${firstName} ${lastName}` });

                const token = jwt.sign({ Email: result.Email, id: result._id  }, getEnvironmentVariables().jwt_secret, { expiresIn: '30d' });

                res.status(200).json({
                    data: { formData: result, token },
                    success: true
                })
            }
        } catch (error) {
            
            next(error);
        }
    }
}