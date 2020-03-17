const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/3d9d430cb4506d11e3f725cd3e60b39a/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (err, { body }) => {
    if (err) callback("Unable to connect to location services!", undefined);
    else {
      if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          summary: body.daily.data[0].summary,
          temperature: body.currently.temperature,
          precipitationChance: body.currently.precipProbability,
          icon: body.currently.icon
        });
      }
    }
  });
};

module.exports = forecast;
