import PostgresRepository from "./postgresRepository";
import Question from '../../domain/entities/Question';
import Constants from '../constants';
import ObjectiveAnswer from "../../domain/entities/ObjectiveAnswer";

export default class QuestionRepository extends PostgresRepository {
    constructor() {
        super();
        super.Init('question');
    }

    GetById(id) {
        const queryRes = super.GetById(id);

        return queryRes
            .then(res => {
                const questions = res.rows.map(row => Question.fromDatabase(row));
                if(questions.length > 0)
                    return questions[0];
                
                throw Constants.Exceptions.NotFoundException;
            });
    }

    PickRandomLimiting(limit) {
        const query = `
            select *
            from question
            order by random()
            limit $1::int
        `;

        const queryRes = super.Query(query, [limit]);

        return queryRes
            .then(res => {
                const questions = res.rows.map(row => Question.fromDatabase(row));
                if(questions.length > 0)
                    return questions;
                
                throw Constants.Exceptions.NotFoundException;
            });
    }
}