const { exec } = require("child_process");

module.exports = function (ctx) {
  const configuration = ctx.build.configuration;
  const org = configuration.split("-")[0];
  runTrapeze(org);
  generateAssets(org);
};

async function generateAssets(org) {
  const path = ["bhutan", "palau"].includes(org)
    ? "--assetPath assets/" + org
    : "";

  const command = "npx capacitor-assets generate " + path;

  console.log("> Generate Assets", command);

  const logs = exec(command);
  logs.stdout.on("data", function (data) {
    console.log(data);
  });
}

async function runTrapeze(org) {
  const base = "npx trapeze run trapeze.config.yaml -y";

  const variables = ["bhutan", "palau"].includes(org)
    ? 'APP_ID="io.ntls.' +
      org +
      '" DISPLAY_NAME="Ripple ' +
      capitalizeFirstLetter(org) +
      ' Wallet"'
    : "";

  const command = variables + " " + base;

  console.log("> Run Trapeze", command);

  const logs = exec(command);
  logs.stdout.on("data", function (data) {
    console.log(data);
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
