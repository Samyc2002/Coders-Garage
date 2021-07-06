import { Router } from 'express';

import { InterviewController } from '../controllers/InterviewController';

class InterviewRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
    }

    getRoutes() {

        this.router.get('/', InterviewController.getInterview);
    }

    postRoutes() {

        this.router.post('/', InterviewController.createInterview);
    }
}

export default new InterviewRouter().router;