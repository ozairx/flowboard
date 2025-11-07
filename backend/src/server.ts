import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import boardRoutes from './routes/boardRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/boards', boardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
