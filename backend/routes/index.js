const router = require("express").Router();
const userRouter = require("./user");
const accountRouter = require("./account");

router.use("/user", userRouter);
router.use("/account", accountRouter);

router.get("/", (req, res) => {
  res.send("<h1>You are on the v1 route </h1>");
});

module.exports = router;
