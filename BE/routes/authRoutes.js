const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {verifyToken , checkRole} = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/admin-only", verifyToken, checkRole(["admin"]), (req, res) => {
    res.json({ message: "Halo Admin, kamu bisa lihat ini 😎" });
  });

  router.get("/user-only", verifyToken, checkRole(["user"]), (req, res) => {
    res.json({ message: "Halo User 👋" });
  });

module.exports = router;
