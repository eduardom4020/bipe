import PostgresRepository from "./postgresRepository";
import ObjectiveAnswer from '../../domain/entities/ObjectiveAnswer';
import Constants from '../constants';

export default class ObjectiveAnswerRepository extends PostgresRepository {
    constructor() {
        super();
        super.Init('objective_answer');
    }

    Query(queryStr, parameters) { 
        const queryRes = super.Query(queryStr, parameters);

        return queryRes
            .then(res => {
                const answers = res.rows.map(row => ObjectiveAnswer.fromDatabase(row));
                if(answers.length > 0)
                    return answers;
                
                throw Constants.Exceptions.NotFoundException;
            });
    }

    GetAnswersOptionsFromQuestionId(questionId) {
        const query = `
            select oa.*
            from question_objective_answers qoa 
            inner join question q 
                on qoa.question_id = q.id
            inner join objective_answer oa 
                on qoa.objective_answer_id = oa.id
            where q.id = $1::int
        `;

        const queryRes = super.Query(query, [questionId]);

        return queryRes
            .then(res => {
                const answersOptions = res.rows.map(row => ObjectiveAnswer.fromDatabase(row));
                if(answersOptions.length > 0)
                    return answersOptions;
                
                throw Constants.Exceptions.NotFoundException;
            });
    }
}