// // @ts-check
// // Protractor configuration file, see link for more information
// // https://github.com/angular/protractor/blob/master/lib/config.ts
//
const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');
//
// /**
//  * @type { import("protractor").Config }
//  */
// exports.config = {
//   allScriptsTimeout: 11000,
//   specs: [
//     './test/**/*.e2e-spec.ts'
//   ],
//   capabilities: {
//     browserName: 'chrome'
//   },
//   directConnect: true,
//   baseUrl: 'http://localhost:4200/',
//   framework: 'mocha',
//   jasmineNodeOpts: {
//     showColors: true,
//     defaultTimeoutInterval: 30000,
//     print: function() {}
//   },
//   onPrepare() {
//     require('ts-node').register({
//       project: require('path').join(__dirname, './tsconfig.json')
//     });
//     jasmine.getEnv().addReporter(new SpecReporter({
//       spec: {
//         displayStacktrace: StacktraceOption.PRETTY
//       }
//     }));
//   }
// };
exports.config = {
  allScriptsTimeout: 11000, // Timeout of each script
  specs: [
    './test/**/*.e2e-spec.ts',  // pattern for your hacker-rank
  ],
  baseUrl: 'http://localhost:4200/', // URL of your SUT
  capabilities: {
    'browserName': 'chrome', // name of the browser you want to test in
  },
  directConnect: true, // No need to run selenium server for chrome and firefox
  framework: 'mocha', // The framework we want to use instead of say jasmine
  mochaOpts: { // Some reasonable mocha config
    reporter: 'spec',
    slow: 3000,
    ui: 'bdd',
    timeout: 30000,
  },
  beforeLaunch: function() { // If you're using type script then you need compiler options
    require('ts-node').register({
      project: './e2e/tsconfig.json',
    });
  },
  onPrepare() {
    let chai = require('chai');
    let chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    global.chai = chai;
  },
};
