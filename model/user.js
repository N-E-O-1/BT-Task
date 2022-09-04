const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    resetLink:{
        data:String,
        default:''
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)

function validateUser(user){
    const schema = Joi.object({
        username:Joi.string().min(3).max(255).required(),
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}

module.exports.User = User
module.exports.validate = validateUser

