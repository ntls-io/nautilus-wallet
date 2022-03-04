// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require("jasmine-spec-reporter");

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: ["./src/**/*.e2e-spec.ts"],
  capabilities: {
    browserName: "chrome",
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: "http://localhost:4200/",
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {},
  },
  onPrepare() {
    require("ts-node").register({
      project: require("path").join(__dirname, "./tsconfig.json"),
    });
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: StacktraceOption.PRETTY,
        },
      })
    );
  },
};

// Docs: https://www.protractortest.org/#/browser-setup#using-headless-chrome
if (process.env["CI"]) {
  /** @type { import("protractor").Config } */
  exports.config = {
    ...exports.config,
    capabilities: {
      browserName: "chrome",
      chromeOptions: {
        args: ["--headless", "--disable-gpu", "--window-size=800,600"],
      },
    },
  };
}

// If CHROMEWEBDRIVER is set, use that as a base directory for chromedriver, rather than invoking webdriver-manager.
//
// This is intended to work with GitHub Actions:
// https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu2004-README.md#browsers-and-drivers
// https://github.com/actions/virtual-environments/blob/ubuntu20/20210726.1/images/linux/scripts/installers/google-chrome.sh#L56-L67
//
// Docs:
// https://github.com/angular/protractor/blob/6.0.0/lib/config.ts#L68-L76
if (process.env["CHROMEWEBDRIVER"]) {
  /** @type { import("protractor").Config } */
  exports.config = {
    ...exports.config,
    chromeDriver: process.env["CHROMEWEBDRIVER"] + "/chromedriver",
  };
}
