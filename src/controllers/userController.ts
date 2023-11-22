import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../data/UserModel' 

const saltRounds = 10;

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.user_password, saltRounds);
      console.log('Senha criptografada:', hashedPassword);
      
      const user = await User.create({ ...req.body, user_password: hashedPassword });
      console.log('Usuário criado:', user);
  
      res.status(201).json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};