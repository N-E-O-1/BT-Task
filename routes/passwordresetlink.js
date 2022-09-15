const {User} = require('../model/user')
const Token = require('../model/token')
const sendMail = require('../service/mail')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const crypto = require('crypto')
const express = require('express')
const router = express.Router()

router.post('/',async(req,res) => {
    try{
        const schema = Joi.object({email:Joi.string().email().required()})
        const {error} = schema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).send('user with email not found')
        let token = await Token.findOne({userId:user.id}) 
        if(!token){
            token = await new Token({
                userId:user._id,
                token:crypto.randomBytes(32).toString('hex')
            }).save()
        }
        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`
        await sendMail(user.email,"password Reset",link)
        res.send("password reset link has been send to email account")
    }catch(error){
        res.send('error')
        console.log(error)
    }
})

router.post('/:userId/:token',async(req,res) => {
    try{
        const schema = Joi.object({password:Joi.string().required()})
        const {error} = schema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const user = await User.findById(req.params.userId);
        if(!user) return res.status(400).send('invalid link')

        const token = await Token.findOne({
            userId:user._id,
            token:req.params.token
        })
        if(!token) return res.status(400).send('invalid link')
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(req.body.password,salt)
        await user.save()
        await token.delete()

        res.send('password reset successfully')
    }catch(error){
        res.send('error')
        console.log(error)
    }
})


module.exports = router