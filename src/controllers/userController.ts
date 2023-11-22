import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../data/UserModel' 

const saltRouds = 10;

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body.user_password);
        const hashedPassword = bcrypt.hash(req.body.user_password, saltRouds);
        console.log(hashedPassword);

        const user = await User.create({...req.body, user_password: hashedPassword});

        res.status(201).json('Usuario criado: ' + user);

    } catch (error) {
        res.status(500).json({error: "Internal Sever Error"})   
    }
}