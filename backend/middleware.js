const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddlware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (e) {
    console.log(e);
    res.status(403).json({ e });
  }
};

module.exports = {
  authMiddlware,
};
