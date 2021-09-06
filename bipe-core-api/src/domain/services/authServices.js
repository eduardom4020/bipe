import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';

import Constants from '../constants';
import { UserRepository } from '../../infrastructure';
import UserAuthDTO from '../DTOs/UserAuthDTO';

export const ExtractUserAndPasswordFromLogin = (secrets) => {
    const loginEncryptedData = CryptoJS.AES.decrypt(secrets, Constants.Security.CryptographySecret).toString(CryptoJS.enc.Utf8);
    const { username, encryptedPassword } = JSON.parse(loginEncryptedData);

    return { username, encryptedPassword };
};

export const GetAuthInfoByUsernameAndPassword = async (username, encryptedPassword) => {
    const condition = 'username = $1::string and password = $2::string';
    const parameters = [username, encryptedPassword];

    const users = await UserRepository.Where(condition, parameters);
    
    if(users.length > 0)
        return UserAuthDTO.fromEntity(users[0]);
}

export const GetAuthInfoByUsernameAndPasswordActiveOnly = async (username, encryptedPassword) => {
    const authInfoDto = await GetAuthInfoByUsernameAndPassword(username, encryptedPassword);

    if(authInfoDto.isActive)
        return authInfoDto;
}

export const GetAuthInfoByUserId = async (userId) => await UserRepository.GetById(userId);

export const GetAuthInfoByUserIdActiveOnly = async (userId) => {
    const authInfoDto = await GetAuthInfoByUserId(userId);

    if(authInfoDto.isActive)
        return authInfoDto;
}

export const GenerateAuthTokenUserId = userId => {
    const token = JWT.sign({ id: userId }, Constants.Security.JWTSecret, {
        expiresIn: 300 // expires in 5min
    });

    return token;
}

export const AuthorizeTokenUserId = token => new Promise((res, rej) =>
    JWT.verify(
        token, 
        Constants.Security.JWTSecret, 
        (err, decoded) => {
            if (err)
                rej(`${Constants.Exceptions.AuthorizationFailed} | ${err}`);
            
            const user = GetAuthInfoByUserIdActiveOnly(decoded.id);

            if(!user)
                rej(Constants.Exceptions.AuthorizationFailed);

            res(user);
        }
    )
);