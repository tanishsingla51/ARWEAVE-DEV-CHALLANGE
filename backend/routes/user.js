const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { authMiddleware, paginationMiddleware } = require("../middleware");

const dotenv = require("dotenv");

dotenv.config({
  path: "../.env",
});

const signUpZodSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string().min(3).max(20),
  lastName: zod.string().min(3).max(20),
});

// signup
router.post("/signup", async (req, res) => {
  const signUpBody = req.body;
  const { success } = signUpZodSchema.safeParse(signUpBody);

  if (!success) {
    return res.status(411).json({
      msg: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: signUpBody.username,
  });

  if (existingUser) {
    return res.status(411).json({
      msg: "Email already taken",
    });
  }

  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = newUser._id;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.status(200).json({
    msg: "User created Successfully",
    token: token,
  });
});

const signInZodSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

// signin
// signin
router.post("/signin", async (req, res) => {
  const signInBody = req.body;
  const { success } = signInZodSchema.safeParse(signInBody);

  if (!success) {
    return res.status(411).json({
      msg: "Incorrect Inputs",
    });
  }

  try {
    const existingUser = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!existingUser) {
      return res.status(401).json({
        msg: "Invalid credentials",
      });
    }

    const userId = existingUser._id;

    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );

    res.json({
      msg: "User signed in successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

const updateProfileZodSchema = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().min(3).max(20).optional(),
  lastName: zod.string().min(3).max(20).optional(),
});

// update user
router.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateProfileZodSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  try {
    const updatedBody = await User.findOneAndUpdate(
      { _id: req.userId },
      req.body,
      { new: true }
    );

    if (!updatedBody) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User updated successfully",
      updatedUser: updatedBody,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// get signed in user details
router.get("/details", authMiddleware, async (req, res) => {
  try {
    const userBasicDetails = await User.findOne({ _id: req.userId });
    res.status(200).json(userBasicDetails);
  } catch (error) {
    console.log(error);
  }
});

// get all other except the signed in  users
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const signedInUserId = req.userId;

  try {
    const users = await User.find({
      $and: [
        { _id: { $ne: signedInUserId } }, // Exclude the signed-in user
        {
          $or: [
            { firstName: { $regex: filter } }, // Case-insensitive search
            { lastName: { $regex: filter } }, // Case-insensitive search
          ],
        },
      ],
    });

    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// follow a user
router.post("/follow", authMiddleware, async (req, res) => {
  try {
    // Extract the userId to follow from the request body
    const { otherUserId } = req.body;

    // Check if the userId is provided
    if (!otherUserId) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Check if the user is trying to follow themselves
    if (otherUserId === req.userId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    // Check if the user to follow exists
    const userToFollow = await User.findById(otherUserId);
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the user to follow to the current user's followers list
    if (!userToFollow.followers.includes(req.userId)) {
      const currentUser = await User.findById(req.userId);
      currentUser.following.push(otherUserId);
      userToFollow.followers.push(req.userId);

      await currentUser.save();
      await userToFollow.save();
    } else {
      return res.status(400).json({
        message: `User already followed`,
      });
    }

    return res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.error("Error following user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
