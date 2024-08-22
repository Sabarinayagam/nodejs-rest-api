const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');

const app = express();

app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', formRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running `));