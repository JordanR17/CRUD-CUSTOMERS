import { notDeepEqual } from 'assert';
import crypto from 'crypto';

const generateCsrfToken = () => {
    return crypto.randomBytes(24).toString('hex');
}

const csrfMiddlewere = (req, res, next) => {
    if (!req.cookies.csrfToken) {
        const csrfToken = generateCsrfToken();
        res.cookie('csrfToken', csrfToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            masAge: 360000 // One Hour
        });
        req.csrfToken = csrfToken;
    } else {
        req.csrfToken = req.cookies.csrfToken;
    }
    res.locals.csrfToken = req.csrfToken;
    next();
}

const verifyCsrfToken = (req, res, next) => {
    if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)){
        return next();
    }

    const csrfTokenFromCookie = req.cookies.csrfToken;
    const csrfTokenFromBody = req.body._csrf;

    if (csrfTokenFromCookie !== csrfTokenFromBody) {
        const err = new Error('Unknow error try again later');
        err.status = 403;
        return next(err);
    }
    next(); 
}
const regenerateCsrfToken = (req,res,next) => {
    if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)){
        return next();
    }

    const newCsrfToken = generateCsrfToken();
    res.cookie('csrfToken', newCsrfToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        masAge: 3600000 // One Hour
    });
    req.csrfToken = newCsrfToken;
    res,locals.csrfToken = newCsrfToken;
    next();
}

export { csrfMiddlewere, verifyCsrfToken, regenerateCsrfToken }