import { Router } from 'express';

import { NextFlashcardRoute, AnswerFlashcardRoute } from '../routes/flashcard';
import Constants from '../constants';

import { GetNextQuestionMiddleware, AnswerQuestionMiddleware } from '../middlewares/question';

const router = Router();

router.get(NextFlashcardRoute, GetNextQuestionMiddleware, (_, res) => {

    const errorType = res.locals.errorType;
    const nextQuestion = res.locals.nextQuestion;

    if(errorType === Constants.ErrorTypeEnum.NotFound)
        res.status(404).json({
            message: Constants.SystemMessages.QuestionNotFound, 
            error: {type: errorType}
        });
    else if(errorType === Constants.ErrorTypeEnum.Unexpected)
        res.status(500).json({
            message: Constants.SystemMessages.QuestionUnexpectedError,
            error: {...res.locals.error, type: errorType}
        });
    else if(nextQuestion)
        res.status(200).json({
            message: Constants.SystemMessages.QuestionRetrieveSuccess,
            question: nextQuestion
        });
        
});

router.post(AnswerFlashcardRoute, AnswerQuestionMiddleware, (_, res) => {

    const errorType = res.locals.errorType;
    const result = res.locals.result;
    
    if(errorType === Constants.ErrorTypeEnum.NotFound)
        res.status(404).json({
            message: Constants.SystemMessages.QuestionAnswerNotFound, 
            error: {type: errorType}
        });
    else if(errorType === Constants.ErrorTypeEnum.Unexpected)
        res.status(500).json({
            message: Constants.SystemMessages.QuestionAnswerUnexpectedError,
            error: {...res.locals.error, type: errorType}
        });
    else if(result)
        res.status(200).json({
            message: result.isCorrect ? 
                Constants.SystemMessages.QuestionAnswerIsCorrect 
                : 
                Constants.SystemMessages.QuestionAnswerIsWrong,
            result
        });
        
});

export default router;