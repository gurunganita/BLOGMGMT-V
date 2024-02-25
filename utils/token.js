const jwt = require("jsonwebtoken");
const signJWT = async (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_DURATION,
    }
  );
};
const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
module.exports = { signJWT, verifyJWT };
