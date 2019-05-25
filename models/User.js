const mongoose = reuqire('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName:{
        type:String,
        trim:true,
        reuqired:true
    },
    lastName: {
        type:String,
        trim:true,
        reuqired:true
    },
    email:{
        type:String,
        trim:true,
        reuqired:true
    },
    password:{
        type:String,
        trim:true,
        reuqired:true
    },
    balance:Number,
    income:Number,
    expense:Number,
    transactions:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'transaction'
        }]
    }
})

const User = mongoose.model('user', userSchema);
module.exports = User;