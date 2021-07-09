import { Router } from 'express';

import { QuestionController } from '../controllers/QuestionController';

class QuestionRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
    }

    getRoutes() {

        this.router.get('/', QuestionController.fetchQuestions);
    }

    postRoutes() {

        this.router.post('/', QuestionController.createQuestion);
        this.router.post('/data', QuestionController.getQuestion);
    }

    putRoutes() {

        this.router.put('/', QuestionController.updateQuestion);
    }
}

export default new QuestionRouter().router;