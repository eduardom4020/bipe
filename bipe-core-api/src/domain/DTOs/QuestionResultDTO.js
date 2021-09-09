import DTO from './DTO';

export default class QuestionResultDTO extends DTO {

    constructor(
        isCorrect,
        explanation,
        earnedPoints,
        correctAnswerContent
    ) {
        super();

        this.isCorrect = isCorrect;
        this.explanation = explanation;
        this.earnedPoints = earnedPoints;
        this.correctAnswerContent = correctAnswerContent;
    }

}