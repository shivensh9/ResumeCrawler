const { loginUser, registerUser } = require("../../controler/userController");

const authRoutes = (router) => {
  router.post("/login", loginUser);
  router.post("/register", registerUser);
};

module.exports = { authRoutes };
