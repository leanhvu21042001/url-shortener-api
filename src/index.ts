import cors from 'cors';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
// import from src/*
import connectDatabase from './db';
import routes from './routes';

const app = express();
const port = config.get('port');

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  connectDatabase();
  routes(app);
  console.log(`http://localhost:${port}`);
});
