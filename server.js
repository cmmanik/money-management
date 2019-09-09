const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoute = require('./routers/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
require('dotenv').config();

app.use('/api/users', userRoute);

app.get('/', (req, res) => {
        res.json({
                meassge: 'Welcome ',
        });
});

app.listen(process.env.PORT, () => {
        console.log(`Server is runnig http://localhost:${process.env.PORT}`);
        mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }, (err, res) => {
                if (err) {
                        console.log('Database not connnected', err);
                } else {
                        console.log('Database connect Succesfully!');
                }
        });
});
