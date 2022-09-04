const {User,validate} = require('../model/user')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// <==== register user ====>
router.post('/register',async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({username:req.body.username})
    if(user) return res.status(400).send('user register already')

    user = new User ({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    await user.save()
    const token = jwt.sign({_id:user._id,isAdmin:user.isAdmin},process.env.JWT_PRIVATE_KEY)
    res.header('x-token',token).send({
        id:user._id,
        username:user.username,
        email:user.email
    })
})  

module.exports = router