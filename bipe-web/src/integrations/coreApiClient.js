import axios from 'axios';
import CryptoJS from 'crypto-js';

import Constants from '../constants';

let Token = null;

const CoreApiClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    responseType: 'application/json',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, Access-Control-Allow-Origin, Access-Control-Allow-Methods, x-access-token, Access-Control-Allow-Headers, Referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, User-Agent'
    }
});

const Login = (username, password) => {
    const secretsString = JSON.stringify({username, password});
    
    const secrets = CryptoJS.AES.encrypt(secretsString, Constants.Security.CryptographySecret).toString();

    return CoreApiClient.post('/auth/login', {secrets})
        .then(res => {
            const { token } = res.data;

            if(token)
                Token = token;

            return {token};
        })
        .catch(err => {
            return {error: err.response.data, errorMessage: err.response.data.message};
        });
}

const NextFlashcard = () => {
    return CoreApiClient.get('/flashcard/next', { headers: { "x-access-token": Token } })
        .then(res => {
            const { question } = res.data;
            return { question };
        })
        .catch(err => {
            return {error: err.response.data, errorMessage: err.response.data.message};
        });
}

const AnswerFlashcard = (questionId, answerId) => {
    return CoreApiClient.post(
        '/flashcard/answer', 
        { questionId, answerId },
        { headers: { "x-access-token": Token } }
    )
        .then(res => {
            const { result } = res.data;
            return { result };
        })
        .catch(err => {
            return {error: err.response.data, errorMessage: err.response.data.message};
        });
}

// window.CoreApiTest = {};
// window.CoreApiTest.Login = Login;
// window.CoreApiTest.NextFlashcard = NextFlashcard;
// window.CoreApiTest.AnswerFlashcard = AnswerFlashcard;

export default {
    Login,
    NextFlashcard,
    AnswerFlashcard
}