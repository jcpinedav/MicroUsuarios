import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";
import  {MinLength, IsNotEmpty} from 'class-validator';
//TO DO IsEmail
@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(4)
    name: string;

    @Column()
    @MinLength(4)
    username: string;

    @Column()
    @MinLength(4)
    @IsNotEmpty()
    password: string;

    @Column()
    email: string;
    

}
