import Constants from '../constants';

export default class Entity {
    constructor(id) {
        this.id = id;
    }

    static fromDatabase(object) { throw Constants.Exceptions.AbstractMethodException }
}