import Entity from './Entity';

export default class User extends Entity {
    constructor(
        id=null,
        username,
        password,
        createdAt=null,
        isActive=null
    ) {
        super(id);
        
        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
        this.isActive = isActive;
    }

    static fromDatabase(user) {
        const userEntity = new User(
            user.id,
            user.username,
            user.password,
            user.created_at,
            user.is_active
        );
            
        return userEntity;
    }
}