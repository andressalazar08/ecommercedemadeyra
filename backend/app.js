const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors')

app.use(express.json())


//Import all routes

const products = require('./routes/product');
const auth = require('./routes/auth');


app.use('/api/v1', products);
app.use('/api/v1', auth);


app.use(errorMiddleware);//manejador de errores globales


module.exports= app;