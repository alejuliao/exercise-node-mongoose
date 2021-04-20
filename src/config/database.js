const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const config = {
  uri: "mongodb://localhost:27017/node-mongoose-exercises",
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

mongoose.connection.on("open", () => {
  console.log("Successfully connected to database.");
});

mongoose.connection.on("error", () => {
  throw new Error("Could not connect to MongoDB.");
});
const connect = async () => {
  mongoose.connect(config.uri, config.options);
};
module.exports = { connect };
