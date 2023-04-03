const tokenUser = (user) => {
  return {
    username: user.username,
    userId: user.id,
    email: user.email,
    role: user.role,
  };
};

module.exports = tokenUser;
