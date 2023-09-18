const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
//update a user
router.put("/:id", async (req, res) => {
    try {
        if (req.body.userid === req.params.id || req.body.isadmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } catch (err) {
                    return res.status(500).json(err);
                }
            }

            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(user);
        } else {
            return res.status(403).json("You can update only your account");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});
//delete a user
router.delete("/:id", async (req, res) => {
    try {
        if (req.body.userid === req.params.id || req.body.isadmin) {
            try {
                const user = await User.findByIdAndDelete(req.params.id);
                res.status(200).json("succefully delete your account");
            }
            catch (err) {
                res.status(500).json(err);
            }
        } else {
            return res.status(403).json("You can delete only your account");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});
//get a user
router.get("/", async (req, res) => {
    const userId=req.query.userId;
    const username=req.query.username;
    try {
        const user = userId ? await User.findById(userId) :await User.findOne({username:username});
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map(async (friendId) => {
          return await User.findById(friendId); 
        })
      );
  
      let friendList = friends.map((friend) => {
        const { _id, username, profilepicture } = friend;
        return { _id, username, profilepicture };
      });
  
      res.status(200).json(friendList);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while fetching friends." });
    }
  });
  
//following to a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userid !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userid);
            if (!user.followers.includes(req.body.userid)) {
                await user.updateOne({ $push: { followers: req.body.userid } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json(" user has been follow");
            }
            else {
                res.status(403).json("you are already followed this user");
            }
        }
        catch (err) {
            // res.status(500).json(err);
            console.log(err);
        }
    }
    else {
        res.status(403).json("you can't follow yourshelf");
    }
})
//unfollowing to a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userid !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userid);
            if (user.followers.includes(req.body.userid)) {
                await user.updateOne({ $pull: { followers: req.body.userid } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json(" user has been unfollow");
            }
            else {
                res.status(403).json("you are dont follow this user");
            }
        }
        catch (err) {
            // res.status(500).json(err);
            console.log(err);
        }
    }
    else {
        res.status(403).json("you can't unfollow yourshelf");
    }
})
// Other routes (delete, get, follow, unfollow) should be implemented here

module.exports = router;
