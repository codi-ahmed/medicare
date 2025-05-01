const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
 
const adminroute = require('./routes/adminroute');
const pharmaroute = require('./routes/pharmaroute');
const productroute = require('./routes/productroute');
const orderroute = require('./routes/orderroute');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./config/db');
connectDB();


app.use('/api/admin' , adminroute);
app.use('/api/pharma' , pharmaroute );
app.use('/api/product' , productroute);
app.use('/api/order' , orderroute);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });