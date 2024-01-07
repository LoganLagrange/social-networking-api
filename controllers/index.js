const router = require('express').Router();

const userRoutes = require("./userRoutes");
router.use("/api/users", userRoutes);

// const friendRoutes = require("./friendRoutes");
// router.use("api/users/:userId/friends", friendRoutes)

module.exports = router;