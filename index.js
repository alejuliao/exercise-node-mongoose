const express = require("express");
const jwt = require("jsonwebtoken");
const database = require("./src/config/database");
const userRoute = require("./src/routes/userRoute");

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello World from Express!"));
userRoute(app);

database
  .connect()
  .then(
    app.listen(port, () =>
      console.log(`Api is running in http://localhost${port}`)
    )
  );
