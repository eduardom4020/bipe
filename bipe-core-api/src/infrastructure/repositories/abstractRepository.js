import Constants from '../constants';

export default class AbstractRepository {
    Init(tableName) {
        this.tableName = tableName;
    }

    GetById(id) { throw Constants.Exceptions.AbstractMethodException }
    GetAll() { throw Constants.Exceptions.AbstractMethodException }
    Where(condition, parameters) { throw Constants.Exceptions.AbstractMethodException }
    Query(queryStr) { throw Constants.Exceptions.AbstractMethodException }
    
    Add(entity) { throw Constants.Exceptions.AbstractMethodException }
    Delete(entity) { throw Constants.Exceptions.AbstractMethodException }
    Edit(entity) { throw Constants.Exceptions.AbstractMethodException }
}