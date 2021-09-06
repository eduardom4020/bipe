import User from "../entities/User";
import Constants from '../constants';

export default class UserAuthDTO extends DTO {

    constructor() {
        this.username = null;
        this.password = null;
        this.isActive = false;
        this.currentToken = null;
    }

    static fromEntity(entity) {
        if(entity && typeof(entity) === 'object' && entity.constructor === User) {
            const userAuth = new UserAuthDTO();
            userAuth.username = entity.username;
            userAuth.password = entity.password;
            userAuth.isActive = entity.isActive;

            return userAuth;
        }

        throw `${Constants.Exceptions.UnableToCastException} ${(entity && typeof(entity) === 'object' && entity.constructor) || 'undefined'} to UserAuthDTO`;
    }
  
}