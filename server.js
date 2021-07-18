import express from 'express';
import path from 'path';
import fs from 'fs';


const app = express();

const __dirname = path.resolve();

import dotenv from 'dotenv';
dotenv.config();

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

import apiRouter from './routes/api.routes.js';
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`listening on ${PORT}`));

