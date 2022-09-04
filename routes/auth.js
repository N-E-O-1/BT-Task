const express = require('express')
const Joi = require('joi')
const {User} = require('../model/user')
const router = express.Router()
const jwt = require('jsonwebtoken')

// <==== login user ====>
router.post('/login',async(req,res) => {
    const {error} = validateUser(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(!user) return res.status(400).send('invalid username or password')
    
    const token = jwt.sign({_id:user._id},process.env.JWT_PRIVATE_KEY)

    res.send(token)
})

function validateUser(req){
    const schema = Joi.object({
        username:Joi.string().min(3).max(255).required(),
        password:Joi.string().min(5).max(255).required()
    })
    return schema.validate(req)
}

module.exports = router