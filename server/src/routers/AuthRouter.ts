import { Router } from 'express';

import { AuthController } from '../controllers/Authcontroller';

class AuthRouter{
    public router: Router;
    constructor() {
        this.router = Router();
        this.postRoutes();
    }

    postRoutes() {

        this.router.post('/signin', AuthController.signIn);
        this.router.post('/signup', AuthController.signUp);
    }
}

export default new AuthRouter().router;