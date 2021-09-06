import { Router } from 'express';

import { LoginRoute } from '../routes/auth';
import { AuthServices } from '../../domain';
import Constants from '../constants';

const router = Router();

router.post(LoginRoute, (req, res) => {
    try {
        const authData = AuthServices.ExtractUserAndPasswordFromLogin(req.body.secrets);
        const user = AuthServices.GetAuthInfoByUsernameAndPasswordActiveOnly(...authData);

        if(user)
            res.status(200);
        else
            res.status(401).json({message: Constants.SystemMessages.InvalidLogin});

    } catch(ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
});

export default router;