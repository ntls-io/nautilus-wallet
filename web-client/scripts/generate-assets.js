var exec = require("child_process").exec;

module.exports = function (ctx) {
  var configuration = ctx.build.configuration;
  if (configuration) {
    var organisation = configuration.split("-")[0];
    var path = ["bhutan", "palau"].includes(organisation)
      ? "--assetPath assets/" + organisation
      : "";

    var command = "npx capacitor-assets generate " + path + " --ios --android";

    console.log(">", command);

    var logs = exec(command);
    logs.stdout.on("data", function (data) {
      console.log(data);
    });
  }
};
