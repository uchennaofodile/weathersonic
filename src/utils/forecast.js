// const url =
//   "https://api.darksky.net/forecast/f88bb11b50963a3dae14000604a70e3e/37.8267,-122.4233";

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service!");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     const temperature = response.body.currently.temperature;
//     const precipProbability = response.body.currently.precipProbability;
//     console.log(
//       response.body.daily.data[0].summary +
//         " It is currently " +
//         temperature +
//         " degrees out. " +
//         "There is a " +
//         precipProbability +
//         "% chance of rain."
//     );
//   }
// });

//37.8267,-122.4233

const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/f88bb11b50963a3dae14000604a70e3e/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(console.log(body.error), undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
