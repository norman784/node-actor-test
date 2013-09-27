'use strict';

var cp_fork = require('child_process').fork
    , cp_spawn = require('child_process').spawn
    , net = require('net')
    , fork = null
    , req = null
    , port = 3000
    , path = require('path')
    , ab = function(id, port) {
        return;
        var cmd = 'ab -r -n 10000 -c 10 http://127.0.0.1:${port}/'
            , tmp;

        // Start ab
        tmp = cmd.replace('${port}', port + 1);
        console.log(id, 'cmd $ ', tmp);
        tmp = tmp.split(' ');
        ab = cp_spawn(tmp[0], tmp.splice(1));
        ab.stdout.on('data', function(data){
            console.log(id, 'ab', data.toString('utf8', 0, data.length));
        });
        ab.on('close', function(){
            console.log('closing', id, 'ab');
            --task;

            if (task == 0) process.exit(0);
        });
    }
    , task = 2;

try {
    // Start server just to leave the process running till I want to shutdown

    net.createServer(function(connection){
        connection.on('end', function(){
            console.log('server disconnected');
        });
    }).
        listen(port, function(){
            console.log(path.basename(__filename),'listening on port', port);
        });

    // Handle process exit

    process.on('exit', function(code){
        if (fork != undefined)fork.disconnect();
        if (req != undefined) req.disconnect();
        console.log(path.basename(__filename),'exit with code', code);
    });

    process.on('error', function(code){
        if (fork != undefined)forkdisconnect();
        if (req != undefined) req.disconnect();
        console.log(path.basename(__filename),'error', code);
    });

    process.on('SIGINT', function() {
        process.exit(0);
    });

    // Setup

    fork = cp_fork('./index-fork', [port + 1]);
    req = cp_fork('./index-req', [port + 2]);

    // Fork
    if (fork != undefined) {
        fork.on('message', function(data){
            console.log('fork', data);

            ab('fork', port + 1);
        });

        fork.on('close', function(data){
            console.log('closing fork', data);
        });
    }

    // Req
    if (req != undefined) {
        req.on('message', function(data){
            console.log('req', data);

            ab('req', port + 1);
        });

        req.on('close', function(data){
            console.log('closing req', data);
        });
    }
} catch (e) {
    console.log('error', e)
}