const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        const users = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword,
        });

        await users.save();
        res.status(200).json(users);
        res.send("ok");
    }
    catch (err) {
        console.log("eror", err);
    }
});
//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json("User not found");
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
               return res.status(404).json("invalid password");
            } 
            return res.status(200).json(user);
        }
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});


module.exports = router