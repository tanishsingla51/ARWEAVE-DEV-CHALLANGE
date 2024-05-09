const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mainRouter = require("./routes/server");

dotenv.config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());

app.use("/api/v2", mainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
