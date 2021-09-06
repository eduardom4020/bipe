import Constants from '../constants';

export default class DTO {
    static fromEntity(entity) { throw Constants.Exceptions.AbstractMethodException; }
}