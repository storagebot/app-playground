var pmx       = require('pmx')
var benchrest = require('bench-rest')

var pmx = require('pmx').init({
  http : true
});

setInterval(function() {
  console.log('Worker has finished his job.')
}, 1000);

pmx.action('internals', function(reply) {
  reply(process.versions)
});

pmx.action('benchmark', function(reply) { 
  var runOptions = {
    limit: 1000,   
    iterations: 20000 
  };
  benchrest(process.env.TARGET, runOptions)
    .on('error', function (err, ctxName) { console.error('Failed in %s with err: ', ctxName, err); })
    .on('end', function (stats, errorCount) {
      console.log('error count: ', errorCount);
      console.log('stats', stats);

    });
  reply({ msg : 'Benchmark started'});
});

