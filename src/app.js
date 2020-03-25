const path = require("path");

const express = require("express");

const hbs = require("hbs");

const app = express();

const geocode = require("./utils/geocode");

const forecast = require("./utils/forecast");

//Define path for Express config - staic folders
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

//changing default views path for Express config
const viewsPath = path.join(__dirname, "../templates/views");

//Setting handlebars engine and new views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Middleware
app.use(express.static(publicDirectoryPath));

//Homepage
app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Uchenna Ofodile" }); //use render to render one of our views
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

//About Page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Uchenna Ofodile"
  });
});

//Help Page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Uchenna Ofodile",
    helpText: "Do you need help?"
  });
});

//weather

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address!" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({ error });
        }
        const weatherData = {
          forecast,
          location,
          address: req.query.address
        };
        res.send(weatherData);

        // res.send({
        //   forecastData,
        //   location,
        //   address: req.query.address
        // });
      });
    }
  );
  // res.send(
  //   //console.log(json)
  //   {
  //     address: req.query.address
  //     //forecast: fd,
  //     //location: JSON.stringify(loc)
  //     //json: json
  //   }
  // );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Uchenna Ofodile",
    errorMessage: "Help article not found"
  });
});

//404 Page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Uchenna Ofodile",
    errorMessage: "Page not found"
  });
});

//Starting server
app.listen(3000, () => {
  console.log("Server is lit");
});
