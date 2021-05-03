import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";
import  {MinLength, IsNotEmpty} from 'class-validator';
import * as bcrypt from 'bcryptjs';
//TO DO IsEmail
@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(4)
    username: string;

    @Column()
    @MinLength(4)
    @IsNotEmpty()
    password: string;
    
    hashPassword():void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string):boolean{
        return bcrypt.compareSync(password, this.password);
    }
}
