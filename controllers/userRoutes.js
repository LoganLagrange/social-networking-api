const router = require('express').Router();
const { User } = require("../models");

router.get('/', (req, res) => {
    User.find().then(dbUser => {
        res.json(dbUser)
    }).catch(err => {
        res.status(500).json({ msg: "Server error!", err })
    })
});

router.get('/:id', (req, res) => {
    User.find({ _id: req.params.id }).then(dbUser => {
        if (!dbUser) {
            res.status(404).json({ msg: "No user with that ID" });
        }
        res.json({
            dbUser,
            thoughts: dbUser.thoughts,
            friends: dbUser.friends
        })
    }).catch(err => {
        res.status(500).json({ msg: "Server error!", err })
    })
});

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email
    }).then(newUser => {
        res.json({ msg: "New user created!" })
    }).catch(err => {
        res.status(500).json({ msg: "Server error!", err })
    })
})

router.put("/:id", (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
    ).then(updatedUser => {
        if (!updatedUser) {
            res.status(404).json({ msg: "No user with that ID" });
        }
        res.json({ msg: "User updated!" })
    }).catch(err => {
        res.status(500).json({ msg: "Server error!", err })
    })
})

router.delete("/:id", (req, res) => {
    User.findOneAndDelete({_id: req.params.id}).then(deletedUser => {
        res.json({msg: "User deleted!"})
    }).catch(err => {
        res.status(500).json({ msg: "Server error!", err })
    })
})

module.exports = router;
