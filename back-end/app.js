const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


const categoriesRoute = require('./routes/categories');
const orderStatusesRoute = require('./routes/orderStatuses');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');

const app = express();
app.use(cors());

app.use(bodyParser.json());


app.use('/orders', ordersRoute);
app.use('/categories', categoriesRoute);
app.use('/status', orderStatusesRoute);
app.use('/products', productsRoute);


mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to DB!')
);
app.listen(3000);