var bunyan = require('bunyan');
var createCWStream = require('bunyan-cloudwatch');

// Sets up stream to CloudWatch
var cloudWatchStream = createCWStream({
  logGroupName: 'NodeLogs',
  logStreamName: 'Dev',
  cloudWatchLogsOptions: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-east-1'
  },
});

var logger = bunyan.createLogger({
  name: 'Dev',
  level: 'info',
  streams: [
    {
      stream: process.stdout
    },
    {
      stream: cloudWatchStream,
      type: 'raw'
    }
  ],
  src: true
});

module.exports = logger;