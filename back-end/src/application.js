const fs = require("fs");
const path = require("path");
const db = require("./db");
const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors"); 
const app = express();
const cookieSession = require("cookie-session")


app.use(cookieSession({
  name: "session",
  keys: ["topsecret", "tiptopsecret"],
  cookie: {secure: false},

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//Routes
const checkdb = require("./routes/checkdb"); 
const register = require("./routes/register");
const events = require("./routes/events");
const owners = require("./routes/owners");
const users = require("./routes/users");
const cookies = require("./routes/cookies")
const messages = require("./routes/messages");
const jwtAuth = require("./routes/jwtAuth")
const dashboard = require("./routes/dashboard");


module.exports = function application(
  ENV,
  actions = { updateAppointment: () => {} }
) {
  app.use(cors({origin:'http://localhost:3000', credentials:true}));
  app.use(helmet());
  app.use(bodyparser.json());
  app.use(express.json())

  app.use("/api", checkdb);
  app.use("/api", register); 
  app.use("/api", events);
  app.use("/api", owners);
  app.use("/api", users);
  app.use("/api", cookies);
  app.use("/api", messages);
  app.use("/api", jwtAuth);
  app.use("/api", dashboard);

  app.close = function() {
    return db.end();
  };

  return app;
};
