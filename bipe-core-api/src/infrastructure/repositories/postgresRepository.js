import AbstractRepository from "./abstractRepository";
import DataContext from '../data-contexts/postgresContext';

export default class PostgresRepository extends AbstractRepository {
    constructor() {
        super();
    }

    Init(tableName) {
        super.Init(tableName);
    }

    GetById(id) { 
        return new Promise((res, rej) => DataContext.query(`
                select * 
                from ${this.tableName}
                where id = $1::int
            `, 
            [id],
            res,
            rej    
        ));
    }

    Where(condition, parameters) { 
        return new Promise((res, rej) => DataContext.query(`
                select * 
                from ${this.tableName}
                where ${condition}
            `, 
            [parameters],
            res,
            rej    
        ));
    }
}