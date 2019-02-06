// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

let HtmlReporter = require('protractor-beautiful-reporter');


exports.config = {
  allScriptsTimeout: 30000,
  directConnect: true,
  suites: {
      nonprod: [
          './spec/login.spec.js'//,
        //    './spec/dashboard.spec.js',
        //   './spec/checkLinks.spec.js',
          ],
      prod: [
          './spec/loginProd.spec.js',
          './spec/checkLinks.spec.js'
      ]
  },
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
        args: [ "--headless", "--no-sandbox" ]
    }
  },
  baseUrl: 'https://dev.code-test.aws.pearson.com/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 90000,
    print: function() {}
  },

  onPrepare: function() {
      jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
      jasmine.getEnv().addReporter(new HtmlReporter({
          // baseDirectory: `testresults/html/${Date.now()}`,
          baseDirectory: `htmlreport`,
          jsonsSubfolder: 'jsons',
          preserveDirectory: false,
          screenshotsSubfolder: 'images',
          clientDefaults:{
              columnSettings:{
                  inlineScreenshots:true
              }
          }
      }).getJasmine2Reporter());
  }
};
 