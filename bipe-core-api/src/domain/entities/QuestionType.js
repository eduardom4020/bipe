import Entity from './Entity';

export default class QuestionType extends Entity {

    constructor(
        id=null,
        name
    ) {
        super(id);

        this.name = name;
    }

    static fromDatabase(questionType) {
        const questionTypeEntity = new QuestionType(
            questionType.id,
            questionType.name
        );
            
        return questionTypeEntity;
    }

}