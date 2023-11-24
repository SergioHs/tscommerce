import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const jwsecret = 'MinhaSenhaDeIncriptaçãoDoJwt';
export const invalidTokens: string[] = [];

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');

    if(!token){
        res.status(401).json({error: 'Não autorizado: Token não enviado!'})
        return
    }

    if(invalidTokens.includes(token)){
        res.status(403).json({error: 'Não autorizado: Token invalidado por logout'})
        return
    }

    jwt.verify(token, jwsecret, (err: any, user: any) => {
        if(err){
            res.status(403).json({error: 'Não autorizado: Token inválido!'})
            return;
        } 
        req.body.user_id = user.user_id;
        next();
    })
}
