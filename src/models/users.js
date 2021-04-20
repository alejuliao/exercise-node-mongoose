const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validateEmail = (email) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const UserSchema = new Mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      require: true,
    },
    hash_password: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required :)"],
      unique: true,
      lowercase: true,
      validate: [validateEmail, "Please fill a valid email address :)"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const UsersModel = Mongoose.model("Users", UserSchema);

module.exports = UsersModel;
