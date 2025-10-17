import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandling } from './middleware/error-handling';
import { routes } from './route';
import uploadConfig from './config/upload';

const app = express();

const allowedOrigins = ['http://localhost:5173', env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);

app.use(express.json());

// para acessar imgs (get)
app.use('/uploads', express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

app.use(errorHandling);

export { app };
