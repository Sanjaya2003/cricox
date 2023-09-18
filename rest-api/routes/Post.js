const router = require("express").Router();
const Post = require("../models/post");
const User=require("../models/user");
//create a post
router.post("/", async (req, res) => {
    const newpost = new Post(req.body);
    try {
        const savedpost = await newpost.save();
        res.status(200).json(savedpost)
    }
    catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})
//update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("updated succefully");
        }
        else {
            res.status(403).json("you can update only your account");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})
//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("deleted succefully");
        }
        else {
            res.status(403).json("you can delete only your account");
        }
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})
//like a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("the post has been liked");
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("the post has been disliked");
        }
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})
//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentuser = await User.findById(req.params.userId);

        // Find posts by the current user
        const userpost = await Post.find({ userId: currentuser._id });

        // Find posts by the user's friends
        const friendpost = await Promise.all(
            currentuser.followings.map(async (friendId) => {
                return await Post.find({ userId: friendId }); // Use await here to ensure the result is an array
            })
        );

        // Concatenate the user's posts and their friends' posts into a single array
        const timelinePosts = userpost.concat(...friendpost);

        res.status(200).json(timelinePosts);
    } catch (err) {
        res.status(500).json(err);
        console.error(err);
    }
});
//get users all posts
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find posts by the current user
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
        console.log(posts);
    } catch (err) {
        res.status(500).json(err);
        console.error(err);
    }
});

module.exports = router;