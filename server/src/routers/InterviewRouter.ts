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

        this.router.post('/data', InterviewController.getInterview);
        this.router.post('/', InterviewController.createInterview);
        this.router.post('/email', InterviewController.emailInterviewee);
        this.router.post('/delete', InterviewController.deleteInterview);
    }
}

export default new InterviewRouter().router;