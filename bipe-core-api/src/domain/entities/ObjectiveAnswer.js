import Entity from './Entity';

export default class ObjectiveAnswer extends Entity {

    constructor(
        id = null,
        content,
        label
    ) {
        super(id);

        this.content = content;
        this.label = label;
    }

    static fromDatabase(objectiveAnswer) {
        const objectiveAnswerEntity = new ObjectiveAnswer(
            objectiveAnswer.id,
            objectiveAnswer.html_content,
            objectiveAnswer.label
        );
            
        return objectiveAnswerEntity;
    }
}