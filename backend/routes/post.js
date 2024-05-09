const express = require("express");
const router = express.Router();
const { authMiddleware, paginationMiddleware } = require("../middleware");
const { Post } = require("../db");
const zod = require("zod");

const postZodSchema = zod.object({
  title: zod.string().min(3),
  description: zod.string().min(3),
});

// create post
router.post("/create", authMiddleware, async (req, res) => {
  const postBody = req.body;
  const { success } = postZodSchema.safeParse(postBody);

  if (!success) {
    return res.status(411).json({
      msg: "Incorrect inputs",
    });
  }

  const newPost = await Post.create({
    title: req.body.title,
    description: req.body.description,
    userId: req.userId,
  });

  res.status(200).json({
    msg: "Post created Successfully",
    post: newPost,
  });
});

// get all posts made by user
router.get("/all", authMiddleware, paginationMiddleware, async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.pagination;
    const skip = (pageNumber - 1) * pageSize;

    // Query the database to retrieve paginated posts
    const posts = await Post.find({ userId: req.userId })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    // Count the total number of posts for the signed-in user
    const totalPosts = await Post.countDocuments({ userId: req.userId });

    // Calculate total number of pages
    const totalPages = Math.ceil(totalPosts / pageSize);

    // Construct pagination metadata
    const pagination = {
      currentPage: pageNumber,
      totalPages: totalPages,
      totalPosts: totalPosts,
    };

    // Return paginated posts and metadata in the API response
    res.status(200).json({
      posts,
      pagination,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all posts
router.get(
  "/allposts",
  authMiddleware,
  paginationMiddleware,
  async (req, res) => {
    try {
      const { pageNumber, pageSize } = req.pagination;
      const skip = (pageNumber - 1) * pageSize;

      // Query the database to retrieve paginated posts
      const posts = await Post.find()
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 });

      // Count the total number of posts
      const totalPosts = await Post.countDocuments();

      // Calculate total number of pages
      const totalPages = Math.ceil(totalPosts / pageSize);

      // Construct pagination metadata
      const pagination = {
        currentPage: pageNumber,
        totalPages: totalPages,
        totalPosts: totalPosts,
      };

      // Return paginated posts and metadata in the API response
      res.status(200).json({
        posts,
        pagination,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
