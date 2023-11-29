import {Request, Response} from 'express';
import { Server } from 'socket.io';

export const createCart = async (req: Request, res: Response): Promise<void> => {
    try {

        //Lógica para crirar o carrinho no banco de dados

        //emitir notificação para o socket (ou seja para os clientes)
        const io: Server = req.app.get('socketio');
        io.emit('newCartNotification', { cartCreationStatus: true, message: 'Oi sou o controller cart! Novo carrinho criado!'});
        console.log('mensagem enviada do back-end ao socket')

        res.status(201).json({message: 'Novo carrinho criado!'})


        //retornar
        
    } catch (error) {
        console.error('Erro ao criar o carrinho! Detalhes: ' + error);
        res.status(500).json({ error: 'Internal server error!'})
    }
}