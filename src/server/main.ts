import express from 'express';
import ViteExpress from 'vite-express';
import weatherRouter from './routes';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(weatherRouter);

ViteExpress.listen(app, PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
});
