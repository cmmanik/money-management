const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const userRoute = require('./routers/user');
const transactionRoute = require('./routers/transaction');

const port = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./passport')(passport);

app.use(morgan('dev'));
app.use(cors());
require('dotenv').config();

app.use('/api/users', userRoute);
app.use('/api/transction', transactionRoute);

if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
}

app.get('/', (req, res) => {
        res.json({
                meassge: 'Welcome ',
        });
});

app.listen(port, () => {
        mongoose.connect(
                `mongodb+srv://${process.env.dbuserName}:@${
                        process.env.password
                }@cluster0-ifkti.mongodb.net/test?retryWrites=true&w=majority`,
                { useNewUrlParser: true },
                (err, res) => {
                        if (err) {
                                console.log('Database not connnected', err);
                        } else {
                                console.log('Database connect Succesfully!');
                        }
                }
        );
});
// mongodb+srv://cmmanik:@cmmanik@cluster0-ifkti.mongodb.net/test?retryWrites=true&w=majority
