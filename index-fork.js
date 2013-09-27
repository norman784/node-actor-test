var fs = require('fs')
    , dir = process.cwd() + '/actors/'
    , net = require('http')
    , actors = []
    , routes = require('./lib-fork/routes')
    , actors = []
    , port = process.argv[2] || 3001
    , path = require('path');

fs.readdirSync(dir).forEach(function(file) {
    if (fs.statSync(dir + file).isFile() && file.substr(-3) === '.js') {
        routes.add(file.replace('Actor', '').replace('.js', ''), dir + file);
    }
});

net.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
}).
    listen(port, function(){
        console.log(path.basename(__filename), 'listening on port', port);
        process.send('ready');
    });

process.on('exit', function(code){
    for (var k in actors) {
        actors[k].disconnect();
        console.log('shutting down actor at index', k);
    }
    console.log(path.basename(__filename), 'exit with code ', code);
});

process.on('error', function(error){
    for (var k in actors) {
        actors[k].disconnect();
        console.log('shutting down actor at index', k);
    }
    console.log(path.basename(__filename), 'error', error);
});

process.on('SIGINT', function() {
    process.exit(0);
});