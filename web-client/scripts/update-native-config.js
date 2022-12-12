var exec = require("child_process").exec;

module.exports = function (ctx) {
  var configuration = ctx.build.configuration;
  var organisation = configuration.split("-")[0];

  var command = "npx trapeze run update-native-config.yaml";

  switch (organisation) {
    case "bhutan":
      break;
    case "palau":
      break;

    default:
      break;
  }

  var logs = exec(command);
  logs.stdout.on("data", function (data) {
    console.log(data);
  });
};
