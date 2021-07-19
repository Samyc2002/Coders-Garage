import { Router } from 'express';

import { SubmisionController } from '../controllers/SubmissionController';

class SubmissionRouter{
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
    }

    getRoutes(){

        this.router.get('/:user', SubmisionController.getSubmissions);
    }

    postRoutes() {

        this.router.post('/', SubmisionController.makeSubmission);
    }
}

export default new SubmissionRouter().router;