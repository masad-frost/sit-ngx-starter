module.exports = function(config) {
  var configuration = {
    frameworks: ['jasmine'],
    files: [
      {pattern: './config/spec-bundle.js', watched: false},
      {pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false}
    ],
    proxies: {
      "/assets/": "/base/src/assets/"
    },
    client: {
      captureConsole: true
    },
    webpack: require('./webpack.test.js'),
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },
    preprocessors: {'./config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']},
    reporters: ['mocha', 'coverage', 'remap-coverage'],
    mochaReporter: {
      divider: ''
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  };
  config.set(configuration);
};
