import Entity from './Entity';
import { QuestionTypeRepository, ObjectiveAnswerRepository } from '../../infrastructure';

export default class Question extends Entity {

    constructor(
        id = null,
        content,
        typeId,
        maxPoints,
        label
    ) {
        super(id);

        this.content = content;
        this.typeId = typeId;
        this.maxPoints = maxPoints;
        this.label = label;

        this.Type = null;
        this.AnswersOptions = null;
    }

    static fromDatabase(question) {
        const questionEntity = new Question(
            question.id,
            question.html_content,
            question.type_id,
            question.max_points,
            question.label
        );
            
        return questionEntity;
    }

    async loadType() {
        try {
            this.Type = await QuestionTypeRepository.GetById(this.typeId);
            return this;
        }
        catch(ex) {
            console.log('Unable to load question type.', ex);
        }

    }

    async loadAnswers() {
        try {
            this.AnswersOptions = await ObjectiveAnswerRepository.GetAnswersOptionsFromQuestionId(this.id);
            return this;
        }
        catch(ex) {
            console.log('Unable to load question answers options.', ex);
        }
    }
}