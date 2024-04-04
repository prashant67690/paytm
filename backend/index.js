const express = require("express");
const router = require("./routes/index");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://prashant67690:9532387882@cluster0.mk6maj1.mongodb.net/paytm?retryWrites=true"
);

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("<h1>Hi there </h1>");
});

app.listen(3000, () => {
  console.log("Server is working");
});
