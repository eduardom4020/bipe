import { QuestionServices } from '../../domain';
import Constants from '../constants';

export const GetNextQuestionMiddleware = async (_, res, next) => {
    try {
        const nextQuestion = await QuestionServices.GetRandomObjectiveQuestion();
        
        if(nextQuestion)
            res.locals.nextQuestion = nextQuestion;
        else {
            res.locals.errorType = Constants.ErrorTypeEnum.NotFound;
        }
    } catch(ex) {
        res.locals.error = { errorMessage: ex.toString() };
        res.locals.errorType = Constants.ErrorTypeEnum.Unexpected;
    }

    next();
}

export const AnswerQuestionMiddleware = async (req, res, next) => {
    try {
        const { questionId, answerId } = req.body;
        const result = await QuestionServices.AnswerQuestion(questionId, answerId);
        
        if(result)
            res.locals.result = result;
        else 
            res.locals.errorType = Constants.ErrorTypeEnum.NotFound;
    } catch(ex) {
        res.locals.error = { errorMessage: ex.toString() };
        res.locals.errorType = Constants.ErrorTypeEnum.Unexpected;
    }

    next();
}