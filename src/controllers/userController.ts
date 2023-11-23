import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../data/UserModel' 
import { invalidTokens } from '../middlewares/authMiddleware'

const saltRounds = 10;
const jwsecret = 'MinhaSenhaDeIncriptaçãoDoJwt'

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

export const authenticateUser = async (req: Request, res: Response): Promise<void> => {  
  const {user_username, user_password} = req.body;

  console.log(user_username)
  console.log(user_password)

  try {
    const bdUser = await User.findOne({ where : {user_username}});

    if(!bdUser) {
      res.status(401).json({error: 'User name inválido'});
      return;
    }
    
    const isPassValid = await bcrypt.compare(user_password, bdUser.user_password);

    if(!isPassValid){
      res.status(401).json({error: 'Senha inválida'})
      return;
    }

    const token = jwt.sign({user_id: bdUser.user_id }, jwsecret, { expiresIn: '30m'})

    res.status(200).json({token});

  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
}

export const logoutUser = (req:Request, res:Response): void => {
  const token = req.header('Authorization');

  if(token){
    invalidTokens.push(token)

  }
  res.status(200).json({ message: 'Logout sucessful'})
}