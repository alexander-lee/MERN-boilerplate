var plan = require('flightplan');

var username = 'USERNAME';
var host = 'HOSTNAME';

plan.target('production', [
  {
    host: host,
    username: username,
    privateKey: 'LINK TO YOUR SSH KEY',
    agent: process.env.SSH_AUTH_SOCK
  }
]);

plan.remote(['build', 'deploy'], function(remote) {
  remote.exec('apt-get update');
  remote.exec('mkdir -p /usr/src/app');
});

plan.local('build', function(local) {
  local.log('Building containers');
  local.exec('cd ..');
  local.exec('docker-compose build --pull --force-rm');
  local.exec('docker-compose push');
});

plan.local(['build', 'deploy'], function(local) {
  local.log('Move docker-compose file');
  local.exec('scp ' + __dirname + '/docker-compose.yml ' + username + '@' + host + ':/usr/src/app');
});

plan.remote(['build', 'deploy'], function(remote) {
  var username = remote.prompt('Enter your Docker username:');
  var password = remote.prompt('Enter your Docker password:', { hidden: true });

  remote.exec('docker login -u ' + username + ' -p ' + password);

  remote.with('cd /usr/src/app', function() {
    remote.exec('docker-compose down');
    remote.exec('docker-compose pull');
    remote.exec('docker-compose up -d');
  });
});
