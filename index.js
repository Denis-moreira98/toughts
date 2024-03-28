const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const conn = require("./db/conn");
const app = express();

// Models
const Tought = require("./models/Tought");
const User = require("./models/User");

// template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// import routes
const toughtsRoutes = require("./routes/toughtsRoutes");

// import controllers
const ToughtController = require("./controllers/ToughtsController");

// receber resposta do body
app.unsubscribe(
   express.urlencoded({
      extended: true,
   })
);

app.use(express.json());

// session middleware
app.use(
   session({
      name: "session",
      secret: "nosso_secret",
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
         logFn: function () {},
         path: require("path").join(require("os").tmpdir(), "session"),
      }),
      cookie: {
         secure: false,
         maxAge: 360000,
         expires: new Date(Date.now() + 360000),
         httpOnly: true,
      },
   })
);

// flash messages
app.use(flash());

// public path
app.use(express.static("public"));

// set session to res
app.use((req, res, next) => {
   if (req.session.userid) {
      res.locals.session = req.session;
   }
   next();
});

//routes
app.use("/toughts", toughtsRoutes);

app.use("/", ToughtController.showToughts);

conn
   // .sync({force: true})
   .sync()
   .then(() => {
      app.listen(3000);
   })
   .catch((err) => {
      console.log(err);
   });
