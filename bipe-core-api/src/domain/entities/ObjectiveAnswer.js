import Entity from './Entity';

export default class ObjectiveAnswer extends Entity {

    constructor(
        id = null,
        content,
        label,
        isCorrect
    ) {
        super(id);

        this.content = content;
        this.label = label;
        this.isCorrect = isCorrect;
    }

    static fromDatabase(objectiveAnswer) {
        const objectiveAnswerEntity = new ObjectiveAnswer(
            objectiveAnswer.id,
            objectiveAnswer.html_content,
            objectiveAnswer.label,
            objectiveAnswer.is_correct
        );
            
        return objectiveAnswerEntity;
    }
}