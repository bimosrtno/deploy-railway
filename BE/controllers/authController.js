const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = (req, res) => {
  const { name, email, password, role, address, phone } = req.body;

  console.log("Register request:", req.body);

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Hashing password failed:", err);
      return res.status(500).json({ message: "Hash error" });
    }

    User.createUser({ name, email, password: hashedPassword, role, address, phone }, (err, result) => {
      if (err) {
        console.error("error saat register:", err);
        return res.status(500).json({ message: "DB error", error: err });
      }

   
      res.status(201).json({ message: "User registered" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "DB error", error: err });
    }

    if (!result || result.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Compare error" });
      }

      if (!isMatch) {
        console.warn("Password salah untuk user:", email);
        return res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    });
  });
};
