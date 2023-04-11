// const request = require("request");

// const forecast = (latitude, longitude, callback) => {
//   const url =
//     "https://api.darksky.net/forecast/f88bb11b50963a3dae14000604a70e3e/" +
//     latitude +
//     "," +
//     longitude;

//   request({ url, json: true }, (error, { body }) => {
//     if (error) {
//       callback("Unable to connect to weather service!", undefined);
//     } else if (body.error) {
//       callback(console.log(body.error), undefined);
//     } else {
//       callback(
//         undefined,
//         body.daily.data[0].summary +
//           " It is currently " +
//           body.currently.temperature +
//           " degrees out. There is a " +
//           body.currently.precipProbability +
//           "% chance of rain. The high today is " +
//           body.daily.data[0].temperatureHigh +
//           " with a low of " +
//           body.daily.data[0].temperatureLow +
//           "."
//       );
//     }
//   });
// };

// module.exports = forecast;
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
      callback(body.error, undefined);
    } else if (body.daily) {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain. The high today is " +
          body.daily.data[0].temperatureHigh +
          " with a low of " +
          body.daily.data[0].temperatureLow +
          "."
      );
    } else {
      callback("Unable to find weather forecast for specified location!", undefined);
    }
  });
};

module.exports = forecast;
