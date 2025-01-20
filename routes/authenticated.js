const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/auth/logout", UserController.logout);
router.get("/users/me", UserController.me);

module.exports = router;