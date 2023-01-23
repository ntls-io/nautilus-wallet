var exec = require("child_process").exec;

module.exports = function (ctx) {
  var configuration = ctx.build.configuration;
  if (configuration) {
    var org = configuration.split("-")[0];
    var base = "npx trapeze run trapeze.config.yaml -y";

    var variables = ["bhutan", "palau"].includes(org)
      ? 'APP_ID="io.ntls.' +
        org +
        '" DISPLAY_NAME="Ripple ' +
        capitalizeFirstLetter(org) +
        ' Wallet"'
      : "";

    var command = variables + " " + base;

    console.log("> Run Trapeze", command);

    var logs = exec(command);
    logs.stdout.on("data", function (data) {
      console.log(data);
    });
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
