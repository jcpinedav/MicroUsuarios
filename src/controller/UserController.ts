import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from 'class-validator';

export class UserController {
    static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find();

        if (users.length > 0) {
            res.send(users);
        } else {
            res.status(404).json({message: 'No hay resultados'});
        }
    };

    static getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        } catch (error) {
            res.status(404).json({ message: 'No se encontro el usuario'});
        }

    };

    static newUser = async (req: Request, res: Response) => {
        const {name, username, password, email} = req.body;
        const user = new (User);
        user.name = name;
        user.username = username;
        user.password = password;
        user.email = email;
        // Validación
        const errores = await validate(user);
        if (errores.length > 0) {
            return res.status(400).json(errores);
        } 
        // TO DO Hash password

        const userRepository = getRepository(User)
        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({ message: 'El usuario ya existe'});
        }
        res.send('Usuario creado')
    };    

    static editUser = async (req: Request, res: Response) => {
        let user;
        const {id} = req.params;
        const {username} = req.body;
        const userRepository = getRepository(User);
        // Try get user
        try {
            user = await userRepository.findOneOrFail(id);
            user.username = username;
        } catch (error) {
            res.status(404).json({ message: 'No se encontro el usuario'});
        }
        
        const errores = await validate(user);
        if (errores.length > 0) {
            return res.status(400).json(errores);
        }
        //Try guardar usuario

        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json ({message: 'El usuario esta siendo utilizao por alguien más'})
        }
        
        res.status(201).json({ message: 'Usuario actualizado'});
    };

    static deleteUser = async (req: Request, res: Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where:{id}});
        } catch (error) {
            return res.status(404).json({ message: 'No hay resultados'});
        }

        //Eliminar Usuario
        userRepository.delete(id);
        res.status(201).json({ message: 'Usuario eliminado'});
    };
}

export default UserController;