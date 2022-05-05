import { Router } from 'express';

import { InterviewController } from '../controllers/InterviewController';

class InterviewRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoutes();
    }

    getRoutes() {

        this.router.get('/', InterviewController.getInterview);
    }

    postRoutes() {

        this.router.post('/', InterviewController.createInterview);
        this.router.post('/email', InterviewController.emailInterviewee);
    }
    
    deleteRoutes() {
        
        this.router.delete('/:id', InterviewController.deleteInterview);
    }
}

export default new InterviewRouter().router;