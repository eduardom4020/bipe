import Constants from '../constants';

export default class DTO {
    constructor() {}
    
    static fromEntity(entity) { throw Constants.Exceptions.AbstractMethodException; }
}