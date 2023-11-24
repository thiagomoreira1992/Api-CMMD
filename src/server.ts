import express from 'express';
import { routes } from './routes';
import cors from  'cors'


const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}))

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Server running on http://localhost:3333'));