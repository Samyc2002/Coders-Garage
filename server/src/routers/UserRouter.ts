import { Router } from 'express';

import { UserController } from '../controllers/UserController';

class UserRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
    }

    getRoutes() {

        this.router.get('/', UserController.getUser);
    }

    postRoutes() {

        this.router.post('/', UserController.createUser);
        this.router.post('/data', UserController.getUser);
    }

    putRoutes() {

        this.router.put('/', UserController.updateUser);
    }
}

export default new UserRouter().router;