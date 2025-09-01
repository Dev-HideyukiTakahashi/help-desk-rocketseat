import express from 'express';
import { errorHandling } from './middleware/error-handling';
import { routes } from './route';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandling);

export { app };
