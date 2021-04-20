const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const SECRET = "$eguran4";

const register = (req, res) => {
  const newUser = new User(req.body);

  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save((error, user) => {
    if (error) {
      return res.status(400).send({
        message: error,
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

const signIn = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (error, user) => {
      if (error) throw error;
      console.log(user);
      if (!user || !user.comparePassword(req.body.password)) {
        return res
          .status(401)
          .json({
            message: "Authentication failed. Invalid user or password.",
          });
      }
      return res.json({
        token: jwt.sign(
          { email: user.email, fullName: user.fullName, _id: user._id },
          SECRET,
          { expiresIn: 160 }
        ),
      });
    }
  );
};

const profile = (req, res, next) => {
  return res.status(200).json({ message: "Authorized! :)" });
};

const loginRequired = (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");
  try {
    if (jwt.verify(token, SECRET)) next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized! :(" });
  }
};
module.exports = { register, signIn, profile, loginRequired };
