const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 4000;

const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // expires after 1 day
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

app.use(session(sess));

const hbs = exphbs.create({
  partialsDir: path.join(__dirname, 'views', 'partials'),
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`)
  );
});

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;");
  next();
});