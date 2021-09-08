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