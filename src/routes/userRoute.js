const userController = require("../controllers/userController");
const UserModel = require("../models/users");

const userRoute = (app) => {
  app.route("/profile").post(userController.loginRequired, userController.profile);

  app.route("/register").post(userController.register);

  app.route("/auth/sign_in").post(userController.signIn);

  app.route("/users/:id?").get(async (req, res) => {
    const { id } = req.params;
    const query = {};

    if (id) {
      query._id = id;
    }

    try {
      const users = await UserModel.find(query);
      res.send({ users });
    } catch (error) {
      res.status(400).send({ error: "Failed to find user" });
    }
  });
};

module.exports = userRoute;
