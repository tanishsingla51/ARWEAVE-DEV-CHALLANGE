const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId; //

    next();
  } catch (err) {
    return res.status(403).json({
      msg: err.message,
    });
  }
};

// paginationMiddleware.js
// paginationMiddleware.js

const paginationMiddleware = (req, res, next) => {
  // Extract pagination parameters from the query string
  req.pagination = {
    pageNumber: parseInt(req.query.page) || 1,
    pageSize: parseInt(req.query.limit) || 10,
  };

  next(); // Move to the next middleware or route handler
};

module.exports = paginationMiddleware;

module.exports = {
  authMiddleware,
  paginationMiddleware,
};
