import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';

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
            pass = await userRepository.findOneOrFail({where:{password}});
        } catch (error) {
            return res.status(400).json({message: 'El usuario o la contraseña son incorrectos'});
        }
        res.send(user);
    }
}
export default AuthController;