const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const dotenv = require('dotenv')

// routes 

const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/client');
const carRoutes = require('./routes/car');
const orderRoutes = require('./routes/order');

// express

const app = express();
app.use(express.json());

app.use('/api',authRoutes);
app.use('/api',clientRoutes);
app.use('/api',carRoutes);
app.use('/api',orderRoutes);

// connection 

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

// stuts err 

const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));
