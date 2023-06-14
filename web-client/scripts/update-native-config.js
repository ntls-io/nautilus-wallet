var exec = require("child_process").exec;

module.exports = function (ctx) {
  var configuration = ctx.build.configuration;
  if (configuration) {
    var org = configuration.split("-")[0];
    var base = "npx trapeze run trapeze.config.yaml -y";

    var currency = org == "palau" ? "PSC" : "BTN";

    var variables = ["bhutan", "palau"].includes(org)
      ? `APP_ID="io.ntls.${org}" DISPLAY_NAME="Nautilus ${currency} Wallet" `
      : "";

    const dateAsBuildNumber = new Date()
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");

    variables += `BUILD_NUMBER="${dateAsBuildNumber}"`;

    var command = `${variables} ${base}`;

    console.log("> Run Trapeze", command);

    var logs = exec(command);
    logs.stdout.on("data", function (data) {
      console.log(data);
    });
  }
};
