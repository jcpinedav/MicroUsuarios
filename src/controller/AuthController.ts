import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

class AuthController {
    static login = async (req: Request, res: Response) => {
        const {username, password} = req.body;

        if(!(username && password)){
            return res.status(400).json({message: 'El usuario y la contraseña son requeridos'});
        }

        const userRepository = getRepository(User);
        let user: User;
        let pass: User;
        try {
            user = await userRepository.findOneOrFail({where:{username}});
        } catch (error) {
            return res.status(400).json({message: 'El usuario o la contraseña son incorrectos'});
        }

        //Check Password
        if(!user.checkPassword(password)){
            return res.status(400).json({message: 'El usuarioo o la cantraseña incorrectos'});
        }
        const token = jwt.sign({userid: user.id, username: user.username}, config.jwtSecret);
        res.json({message: 'OK', token});
    }
}
export default AuthController;