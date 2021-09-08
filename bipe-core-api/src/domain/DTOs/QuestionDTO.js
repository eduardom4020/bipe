import DTO from './DTO';

import Question from "../entities/Question";
import Constants from '../constants';

export default class QuestionDTO extends DTO {

    constructor() {
        super();

        this.id = null;
        this.content = null;
        this.type = null;
        this.maxPoints = false;
    }

    static fromEntity(entity) {
        if(entity && typeof(entity) === 'object' && entity.constructor === Question) {
            const question = new QuestionDTO();
            question.id = entity.id;
            question.content = entity.content;
            question.type = entity.Type;
            question.maxPoints = entity.maxPoints;
            
            return question;
        }

        throw `${Constants.Exceptions.UnableToCastException} ${(entity && typeof(entity) === 'object' && entity.constructor) || 'undefined'} to QuestionDTO`;
    }
  
}