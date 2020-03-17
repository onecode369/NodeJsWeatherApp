const path = require("path");
const express = require("express");
const forecast = require("../utils/forecast");
const geocode = require("../utils/geocode");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  const location = req.query.address;
  geocode(location, (err, data) => {
    if (err)
      return res.send({
        error: err
      });
    else {
      const address = data.location;
      forecast(data.latitude, data.longitude, (err, data) => {
        if (err)
          return res.send({
            error: err
          });
        else
          return res.send({
            address,
            temperature: data.temperature.toString() + "°C",
            precipitation: data.precipitationChance,
            weatherForecast: data.summary,
            icon: data.icon
          });
      });
    }
  });
});

app.get("/about", (req, res) => {
  res.render('about')
})

app.get("/help" , (req , res) => {
  res.render('help')
})

app.get("*", (req, res) => {
  res.render('error')
})

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
