const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { appRouterV1 } = require("./src/routes/v1");

//init
const app = express();

app.use(cors({}));
app.use(bodyParser.json());
dotenv.config();

app.get("/welcome", (req, res) => {
  res.status(200).send({ message: "welcome to resume project" });
});

//resumes containing folder
app.use(express.static("resumes"));
app.use("/resumes", express.static(path.join(__dirname, "resumes")));

app.use("/v1", appRouterV1());

mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started at ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("error in connection");
  });
