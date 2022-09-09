const {User,validate} = require('../model/user')
const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JOI = require('joi')

// <===== get current user ====>
router.get('/me',auth,async(req,res) => {
    const user = await User.findById(req.user._id).select(['-password','-isAdmin','-_id'])
    res.send(user)
})

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

// <===== updating username =====>
router.put('/:id',auth,async(req,res) => {
    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.params.id,{username:req.body.username},{new:true})
    if(!user) return res.status(404).send('user not found')
    res.send("Username has been updated to " + user.username +"!")
})

// <===== deleting user =====>
router.delete('/:id',auth,async(req,res) => {
    const {error} = validateUser(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    const user = await User.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).send('user id not found')
    res.send('user has been deleted')
})

// <==== validation for user for updating username ====>
function validateUser(req){
    const schema = JOI.object({
        username:JOI.string().min(3).max(255).required(),
    })
    return schema.validate(req)
}

module.exports = router