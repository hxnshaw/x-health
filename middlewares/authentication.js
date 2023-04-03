const { isValidToken } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    console.log("Auth Failed");
  }
  try {
    const { username, userId, role, email } = isValidToken({ token });
    req.user = { username, role, userId, email };
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({ message: "Authentication Failed!!" });
      return;
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
