const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
        firstName: {
                type: String,
                trim: true,
                reuqired: true,
        },
        lastName: {
                type: String,
                trim: true,
                reuqired: true,
        },
        email: {
                type: String,
                trim: true,
                reuqired: true,
        },
        password: {
                type: String,
                trim: true,
                reuqired: true,
        },
        balance: Number,
        income: Number,
        expense: Number,
        transactions: {
                type: [
                        {
                                type: Schema.Types.ObjectId,
                                ref: 'Transaction',
                        },
                ],
        },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
