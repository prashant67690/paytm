const router = require("express").Router();
const mongoose = require("mongoose");
const { authMiddlware } = require("../middleware");
const { Account } = require("../db");

router.get("/balance", authMiddlware, async (req, res) => {
  const ac = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    balance: ac.balance,
  });
});

router.post("/transfer", authMiddlware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { amount, to } = req.body;
    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (account.balance < amount) {
      await session.abortTransaction();
      res.status(400).json({ message: "Insufficent Balance" });
    }

    const reciever = await Account.findOne({
      userId: to,
    }).session(session);

    if (reciever == null) {
      await session.abortTransaction();
      res.status(400).json({ message: "Invalid Account " });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.status(200).json({ message: "Transfer Sucess full", id: req.userId });
  } catch (e) {
    await abortTransaction();
    console.error("Error", e);
    res.status(400).json({ message: e.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
