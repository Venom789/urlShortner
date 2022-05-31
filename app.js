const express = require("express");
const route = require("./routes/index");
const conncetDB = require("./model/db");
const notFound = require("./middleware/notFound");
const { auth } = require("express-openid-connect");
require("dotenv").config();
const app = express();
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;
const auth_config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(auth_config));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use("/", route);
app.get("/isLogin", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.json({ data: req.oidc.user });
  } else {
    res.json({ login: false });
  }
});

app.use("*", notFound);

const startApp = async () => {
  try {
    await conncetDB();
    app.listen(PORT, () => {
      console.log(`SERVER IS LISTING AT PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
