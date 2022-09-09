const express = require('express')
const {Post,validate} = require('../model/post')
const router = express.Router()

// <==== creating post ====>
router.post('/',async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const newPost = new Post(req.body)
    try{
        const savePost = await newPost.save()
        res.status(200).send(savePost)
    }catch(err){
        res.status(500).send(err)
    }
})

// <==== updating the post ====>
router.put("/:id",async(req,res) => {
    const post = await Post.findById(req.params.id)
    if(post.userId === req.body.userId){
        await post.updateOne({$set:req.body})
        res.status(200).send('post updated')
    }else{
        res.status(403).send('invalid user id')
    }
})

// <==== deleting post ====>
router.delete('/:id',async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let post = await Post.findById(req.params.id)
    if(post.userId !== req.body.userId) return res.status(404).send('user with id not found')
    post = await Post.deleteOne()
    res.send('post has been deleted!')
})

// <==== like and dislike post ====>
router.put("/:id/like",async(req,res) => {
    const post = await Post.findById(req.params.id)
    if(!post.likes.includes(req.body.userId)){
        await Post.updateOne({$push:{likes:req.body.userId}})
        res.status(200).send('post has been liked')
    }else{
        await Post.updateOne({$pull:{likes:req.body.userId}})
        res.status(200).send('post has been disliked')
    }

})

// <==== commenting the post ====>
router.put('/:id/comment',async(req,res) => {
    const post = await Post.findById(req.params.id)
    if(!post.comment.includes(req.body.userId)){
        await Post.updateOne({$push:{comment:req.body.comment}})
        res.status(200).send('comment added')
    }else{
        await Post.updateOne({$pull:{comment:req.body.comment}})
        res.status(200).send('comment has been deleted')
    }
})

module.exports = router
