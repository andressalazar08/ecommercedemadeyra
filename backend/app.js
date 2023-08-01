const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors')

app.use(express.json())


//Import all routes

const products = require('./routes/product');


app.use('/api/v1', products);


app.use(errorMiddleware);//manejador de errores globales


module.exports= app;