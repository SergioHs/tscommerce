import express from 'express';
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/products', productRoutes)

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:" + port);
})