import { QuestionRepository } from "../../infrastructure";
import Constants from '../constants';
import QuestionDTO from "../DTOs/QuestionDTO";

export const GetRandomQuestionsLimiting = async limit => {
    const questions = await QuestionRepository.PickRandomLimiting(limit);
    const questionsTyped = await Promise.all(questions.map(x => x.loadType()));
    const questionsDto = questionsTyped.map(x => QuestionDTO.fromEntity(x));

    return questionsDto;
}

export const GetRandomObjectiveQuestionsLimiting = async limit => {
    const questions = await GetRandomQuestionsLimiting(limit);
    const objectiveQuestions = questions.filter(x => x.type.id === Constants.QuestionTypeEnum.Objective);

    return objectiveQuestions;
}

export const GetRandomObjectiveQuestion = async () => {
    const questions = await GetRandomObjectiveQuestionsLimiting(1);
    const question = questions.length > 0 && questions[0];

    if(question)
        return question;

    throw Constants.Exceptions.NotFoundException;
}