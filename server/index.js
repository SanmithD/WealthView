import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import router from './routes/stock.route.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: process.env.NODE_ENV !== 'development' ? process.env.CLIENT_URL : process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET']
}));

app.use('/api/portfolio', router)

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
