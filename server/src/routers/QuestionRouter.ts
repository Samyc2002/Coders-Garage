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
        this.router.get('/data', QuestionController.getQuestion);
    }

    postRoutes() {

        this.router.post('/', QuestionController.createQuestion);
        this.router.post('/tags', QuestionController.getQuestionByTags);
    }

    putRoutes() {

        this.router.put('/', QuestionController.updateQuestion);
    }
}

export default new QuestionRouter().router;