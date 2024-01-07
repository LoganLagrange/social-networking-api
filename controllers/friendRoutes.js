const router = require('express').Router();
const { User } = require("../models");

router.post('/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        {$addToSet: {friends: req.params.friendId}}
        ).then(dbUser => {
        if (!dbUser) {
            res.status(404).json({ msg: "No user with that ID" });
        }
        res.json({msg: `Friend added!`})
    }).catch(err => {
        res.status(500).json({ msg: "Server error!", err })
    })
});

module.exports = router;