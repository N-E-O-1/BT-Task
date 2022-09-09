const mongoose = require('mongoose')
const Joi = require('joi')

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:255
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    comment:{
        type:Array,
        default:[]
    }
},{timestamps:true})

const Post = mongoose.model('post',postSchema)

function validate(post){
    const schema = Joi.object({
        userId:Joi.string().required(),
        desc:Joi.string().max(255),
        img:Joi.string(),
        likes:Joi.array(),
        comment:Joi.string().max(255)
    })
    return schema.validate(post)
}

module.exports.Post = Post
module.exports.validate = validate
