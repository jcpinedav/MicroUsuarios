import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const  checkJwt =(req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload= <any>jwt.verify(token, config.jwtSecret)
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(401).send('No esta autorizado para esta acción');
    }

    const {userid,username} = jwtPayload;

    const newToken = jwt.sign({userid,username}, config.jwtSecret);
    res.setHeader('token', newToken);
    // Call next
    next();

};