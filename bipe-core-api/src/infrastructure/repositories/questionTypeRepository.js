import PostgresRepository from "./postgresRepository";
import QuestionType from '../../domain/entities/QuestionType';
import Constants from '../constants';

export default class QuestionTypeRepository extends PostgresRepository {
    constructor() {
        super();
        super.Init('question_type');
    }

    GetById(id) {
        const queryRes = super.GetById(id);

        return queryRes
            .then(res => {
                const questionTypes = res.rows.map(row => QuestionType.fromDatabase(row));
                if(questionTypes.length > 0)
                    return questionTypes[0];
                
                throw Constants.Exceptions.NotFoundException;
            });
    }
}