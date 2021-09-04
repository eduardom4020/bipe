import Entity from './Entity';

export default class User extends Entity {
    constructor(
        username,
        password,
        createdAt=null,
        isActive=null
    ) {
        super();

        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
        this.isActive = isActive;
    }

    static fromDatabase(user) {
        const userEntity = new User(
            user.username,
            user.password,
            user.created_at,
            user.is_active
        );

        userEntity.id = user.id;
            
        return userEntity;
    }
}