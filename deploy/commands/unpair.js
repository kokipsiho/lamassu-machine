'use strict';

var https = require('https');
var fs = require('fs');
var path = require('path');

var hardwareCode = process.argv[2] || 'N7G1';

var deviceConfig = JSON.parse(fs.readFileSync('/opt/apps/machine/lamassu-machine/device_config.json'));
var ca = fs.readFileSync(deviceConfig.updater.caFile);
var cert = fs.readFileSync(path.resolve(deviceConfig.brain.dataPath, 'client.pem'));
var key = fs.readFileSync(path.resolve(deviceConfig.brain.dataPath, 'client.key'));
var connectionInfoPath = hardwareCode === 'N7G1' ?
  '/var/lib/sencha/connection_info.json' :
  '/var/lib/lamassu-machine/connection_info.json';
  
var restartCommand = hardwareCode === 'N7G1' ?
 'poweroff -d 2' :
 'restart lamassu-machine';

function report(err, res, cb) {
  var data = JSON.stringify({
    error: err ? err.message : null,
    result: res
  });

  var options = {
    host: 'updates.lamassu.is',
    port: 8000,
    path: '/report',
    method: 'POST',
    key: key,
    cert: cert,
    ca: ca,
    ciphers: 'AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH',
    secureProtocol: 'TLSv1_method',
    rejectUnauthorized: true,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  options.agent = new https.Agent(options);

  // Set up the request
  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.resume();
    res.on('end', cb);
    res.on('error', function () { console.log('Can\'t connect to report server'); cb(); });
  });

  req.on('error', function () { console.log(data); cb(); });
  req.write(data);
  req.end();    
}

report(null, 'started', function() {});

var async = require('./async');
var cp = require('child_process');

var TIMEOUT = 10000;

function command(cmd, args, cb) {
  cp.execFile(cmd, args, {timeout: TIMEOUT}, function(err) {
    cb(err);
  });
}

process.on('SIGUSR2', function() {
  // USR1 is reserved by node
  // TODO: more graceful exit
  console.log('Got SIGUSR2. Immune.');
});

console.log('********** STARTED *************');

// TODO: not idempotent, base this on versions
async.waterfall([
  async.apply(report, null, 'started'),
  async.apply(command, 'rm /var/lib/sencha/connection_info.json'),  
  async.apply(report, null, 'afterUnpair'),  
  async.apply(command, restartCommand)
], function(err) {
  report(err, 'finished', function() {
    if (err) throw err;
    console.log('done updatescript');
    process.exit();    
  });
});
