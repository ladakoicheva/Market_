import express from 'express';
import cors from 'cors';
import userRouter from './routes/users/route.js';
import { productRouter } from './routes/products/route.js';
import { historyRouter } from './routes/history/route.js';
import { authorize } from './middlewares/auth.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/history', historyRouter);



app.listen(PORT, () => {
  console.log('http://localhost:3000')
})
