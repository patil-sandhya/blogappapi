const express = require("express")
const {BlogModel} = require("../Module/BlogModel")
const {auth} = require("../Middleware/Auth")
const blogRouter = express.Router()

blogRouter.get("/api/blogs", async(req,res)=>{
    try {
        const blog = await BlogModel.find(req.query)
        res.status(200).send(blog)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.get("/api/blogs/:id", async(req,res)=>{
    const {id} = req.params
    try {
        const blog = await BlogModel.find({_id:id})
        res.status(200).send(blog)
    } catch (error) {
        console.log(error)
    }
})


blogRouter.post("/api/blogs", auth, async(req,res)=>{
    try {
        const newpost = new BlogModel(req.body)
        await newpost.save()
        res.status(200).send({msg:"Blog created", blog: req.body})
    } catch (error) {
        console.log(error)
    }
})

blogRouter.patch("/api/blogs/:id",auth, async(req,res)=>{
    let {id} = req.params
    try {
        await BlogModel.findByIdAndUpdate({_id: id}, req.body)
        res.status(200).send({msg: "Blog Updated"})
    } catch (error) {
        console.log(error)
    }
})

blogRouter.delete("/api/blogs/:id",auth, async(req,res)=>{
    let {id} = req.params
    try {
        await BlogModel.findByIdAndDelete({_id: id}, req.body)
        res.status(200).send({msg: "Blog Deleted"})
    } catch (error) {
        console.log(error)
    }
})

blogRouter.patch("/api/blogs/:id/like",auth, async(req,res)=>{
    let {id} = req.params
    try {
        const data = await BlogModel.findOne({_id:id})
        await BlogModel.findByIdAndUpdate({_id: id}, {likes: data.likes+1})
        res.status(200).send({msg: "Blog Updated"})
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    blogRouter
}