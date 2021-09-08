import { Router } from 'express';

import { LoginRoute } from '../routes/auth';
import Constants from '../constants';

import { UserLoginMiddleware } from '../middlewares/auth';

const router = Router();

router.post(LoginRoute, UserLoginMiddleware, (_, res) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Realiza o login do usuário no sistema' */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    const error = res.locals.error;
    const user = res.locals.user;

    if(!error && user)
        res.status(200).json({
            message: Constants.SystemMessages.LoginSuccessfull,
            token: user.currentToken,
            user
        });
    else if(error && res.locals.errorType === Constants.ErrorTypeEnum.NotFound && !user)
        res.status(401).json({
            message: Constants.SystemMessages.InvalidLogin, 
            error: {...error, type: res.locals.errorType}
        });
    else
        res.status(500).json({
            message: Constants.SystemMessages.LoginUnexpectedError,
            error: {...error, type: res.locals.errorType}
        });
});

export default router;