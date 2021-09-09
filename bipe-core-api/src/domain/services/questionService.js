import { QuestionRepository, ObjectiveAnswerRepository } from "../../infrastructure";
import Constants from '../constants';
import QuestionDTO from "../DTOs/QuestionDTO";
import QuestionResultDTO from "../DTOs/QuestionResultDTO";

export const GetRandomQuestionsLimiting = async limit => {
    const questions = await QuestionRepository.PickRandomLimiting(limit);
    const questionsWithType = await Promise.all(questions.map(x => x.loadType()));
    const questionsWithTypeAnswer = await Promise.all(questionsWithType.map(x => x.loadAnswers()));
    const questionsDto = questionsWithTypeAnswer.map(x => QuestionDTO.fromEntity(x));

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

export const AnswerQuestion = async (questionId, answerId) => {
    const answer = await ObjectiveAnswerRepository.GetAnswerOfQuestion(questionId, answerId);

    let points = 0;
    let correctAnswerContent = null;
    let explanation = null;

    if(answer.isCorrect) {
        const question = await QuestionRepository.GetById(questionId);
        points = question.maxPoints;
        correctAnswerContent = answer.content;
        explanation = 'Resposta da Questão!';
    }
    

    const questionResult = new QuestionResultDTO(
        answer.isCorrect,
        explanation,
        points,
        correctAnswerContent
    );

    return questionResult;
}