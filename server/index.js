import express from 'express';
import cors from 'cors';
import userRouter from './routes/users/route.js';
import { productRouter } from './routes/products/route.js';
import { historyRouter } from './routes/history/route.js';
import { searchRouter } from './routes/search/route.js';
import { initDatabase } from './dbSQL/init.js';
import { errorMiddleware } from './middlewares/errors.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/search', searchRouter);
app.use('/history', historyRouter);

app.use(errorMiddleware);


app.listen(PORT, () => {
 initDatabase()
  console.log('http://localhost:3000')
})
