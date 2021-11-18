import express from 'express';
const app = express();
import path from 'path';


import apiRouter from './routes/api.routes.js';

import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();


app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('mainpage');
});

app.get('/about', (req, res) =>{
	res.render('about');
});

app.get('/lofi', (req, res) =>{
	res.render('lofi');
});

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`listening on ${PORT}`));

