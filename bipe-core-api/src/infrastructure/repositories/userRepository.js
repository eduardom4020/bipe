import PostgresRepository from "./postgresRepository";
import User from '../../domain/entities/User';
import Constants from '../constants';

export default class UserRepository extends PostgresRepository {
    constructor() {
        super();
        super.Init('"user"');
    }

    GetById(id) {
        const queryRes = super.GetById(id);

        return queryRes
            .then(res => {
                const users = res.rows.map(row => User.fromDatabase(row));
                if(users.length > 0)
                    return users[0];
                
                throw Constants.Exceptions.NotFoundException;
            });
    }
}