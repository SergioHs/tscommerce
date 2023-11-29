// src/app.ts
import express from 'express';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes'
import productRoutes from './routes/productRoutes';
import http from 'http';
import cors from 'cors';

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
};

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  transports: ['websocket'],
});

app.set('socketio', io);
app.use(cors(corsOptions));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

io.on('connection', (socket) => {
  console.log('Um cliente se conectou');

  socket.on('newCartNotification', (data) => {
    console.log('Nova notificação:', data);
    socket.emit('notification', 'Novo carrinho criado!');
  });

  socket.on('disconnect', () => {
    console.log('Um cliente se desconectou');
  });
});

server.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port);
});
