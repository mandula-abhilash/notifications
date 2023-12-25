import express from "express";
import jwt from "jsonwebtoken";

import User from "../models/users.model.js";

const router = express.Router();

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const accessToken = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true, // Uncomment this when using HTTPS
      // sameSite: 'strict', // Uncomment this based on your cross-site request needs
    });

    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } else {
    res.status(401).send("Username or password is incorrect");
  }
});

export default router;
