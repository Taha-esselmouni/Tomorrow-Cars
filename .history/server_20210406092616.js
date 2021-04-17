const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

// routes 

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
