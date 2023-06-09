const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Category = require('../models/Category');

//CREATE NEW POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json({messege:"Successfully Create Post", savedPost});
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                },
                { new: true });
            res.status(200).json({messege:"Successfully Updated Post", updatedPost});
            } catch (err) {
            res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
        } catch (err) {
        res.status(500).json(err);
        }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await Post.deleteOne({ _id: req.params.id });
                res.status(200).json("Post has been deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
            category: {
            $in: [catName],
            },
        });
        } else {
            posts = await Post.find();
        }
        res.status(200).json({messege:"This is The Post", posts});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;