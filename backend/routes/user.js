const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");

const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddlware } = require("../middleware");

const router = express.Router();

const mySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.get("/", (req, res) => {
  res.status(200).send("the route has been hit");
});

router.get("/bulk", async (req, res) => {
  const user = await User.find({});

  const result = user.map((e) => {
    const obj = {
      firstName: e.firstName,
      lastName: e.lastName,
      _id: e._id,
    };
    return obj;
  });

  res.status(200).json({ user: result });
});

router.get("/bulk/:filter", async (req, res) => {
  const filterWord = req.params.filter;
  const user = await User.find({
    $or: [
      { firstName: { $regex: filterWord } },
      { lastName: { $regex: filterWord } },
    ],
  });

  const result = user.map((e) => {
    const obj = {
      firstName: e.firstName,
      lastName: e.lastName,
      _id: e._id,
    };
    return obj;
  });

  res.status(200).json({ user: result, filterWord });
});

router.get("/bulk/:filter", async (req, res) => {
  const filterWord = req.params.filter;
  const user = await User.find({
    $or: [
      { firstName: { $regex: filterWord } },
      { lastName: { $regex: filterWord } },
    ],
  });

  const result = user.map((e) => {
    const obj = {
      firstName: e.firstName,
      lastName: e.lastName,
      _id: e._id,
    };
    return obj;
  });

  res.status(200).json({ user: result, filterWord });
});

router.post("/signup", async (req, res) => {
  const { success } = mySchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({ userName: req.body.username });

  if (existingUser) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ message: "Icorrect inputs" });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
});

router.put("/", authMiddlware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error While Updating ",
    });
  }
  const user = await User.updateOne({ _id: req.userId }, req.body);

  res.status(200).json({ message: "Updated SucessFully " });
});

module.exports = router;
