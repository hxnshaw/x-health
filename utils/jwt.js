const jwt = require("jsonwebtoken");

const createJsonWebToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isValidToken = ({ token }) =>
  jwt.verify(token, process.env.JWT_SECRET_KEY);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJsonWebToken({ payload: user });
  const tenMinutes = 1000 * 60 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + tenMinutes),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJsonWebToken,
  isValidToken,
  attachCookiesToResponse,
};
