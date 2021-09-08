import { AuthServices } from '../../domain';
import Constants from '../constants';
import { AuthControllerRoute, LoginRoute } from '../routes/auth';
import { SwaggerRoute } from '../routes/apiDocs';

export const Authorize = (req, res, next) => {
    if(
        req.originalUrl.match(`${AuthControllerRoute}${LoginRoute}`) || 
        req.originalUrl.match(SwaggerRoute)
    )
        next();
    else {
        const token = req.headers['x-access-token'];
        if (!token)
            return res.status(401).json({
                message: Constants.SystemMessages.AuthorizationTokenNotProvided, 
                error: {
                    type: Constants.ErrorTypeEnum.TokenNotProvided
                }
            });

        AuthServices.AuthorizeTokenUserId(token)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(err => {
                if(err.tokenExpired)
                    res.status(401).json({
                        message: Constants.SystemMessages.TokenExpired, 
                        error: {
                            ...err,
                            type: Constants.ErrorTypeEnum.TokenExpired
                        }
                    });
                else
                    res.status(500).json({
                        message: Constants.SystemMessages.AuthorizationUnexpectedError,
                        error: {
                            ...err,
                            type: Constants.ErrorTypeEnum.Unexpected
                        }
                    });
            });
    }
};

export const UserLoginMiddleware = async (req, res, next) => {

    try {
        const authData = AuthServices.ExtractUserAndPasswordFromLogin(req.body.secrets);
        const user = await AuthServices.GetAuthInfoByUsernameAndPasswordActiveOnly(authData.username, authData.encryptedPassword);

        if(user) {
            user.currentToken = AuthServices.GenerateAuthTokenUserId(user.id);

            res.locals.user = user;
        }
        else {
            res.locals.error = {message: Constants.SystemMessages.InvalidLogin};
            res.locals.errorType = Constants.ErrorTypeEnum.NotFound;
        }
    } catch(ex) {
        res.locals.error = { internalError: ex.toString() };
        res.locals.errorType = Constants.ErrorTypeEnum.Unexpected;
    }

    next();
};