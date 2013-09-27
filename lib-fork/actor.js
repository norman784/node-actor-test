var self = {
        port: null,
        file: null,
        actor: null,
        name: null
    }
    , currArg = null
    , net = require('net');

self.validate = function(actor) {
    if (actor === undefined) {
        return new Error('Actor cannot be undefined');
    } else if (actor.name === undefined || actor.name === "") {
        return new Error('Actor name is missing');
    } else if (actor.description === undefined || actor.description === "") {
        return new Error('Actor description is missing');
    } else if (typeof(actor.run) !== 'function') {
        return new Error("Actor onReceive isn't a function");
    }

    return null;
}

for (var k in process.argv) {
    val = process.argv[k].trim();
    console.log('argv', val);
    switch(val) {
        case '-port': currArg = 'port'; break;
        case '-file': currArg = 'file'; break;
        default:
            if (currArg != null && self[currArg] == null) {
                console.log('--->', currArg, val);
                self[currArg] = val;
            }

            currArg = null;

            break;
    }
}

self.name = self.file.split('/');
self.name = self.name[self.name.length-1].split('.')[0];

if (self.port === null) {
    throw new Error("Port cannot be undefined");
    process.exit(1);
} else if (self.file === null) {
    throw new Error("File cannot be undefined");
    process.exit(1);
} else {
    self.actor = require(self.file);

    if ((error = self.validate(self.actor)) !== null) {
        throw error;
        process.exit(1);
    }
}

net.createServer(function(connection){
    connection.on('end', function(){
        console.log('server disconnected', self.file);
    });
}).
    listen(self.port, function(){
        var next = function(message) {
            process.send(message);
            process.exit(0);
        }
        console.log('Actor', self.name, 'listeting on port', self.port);
        process.on('message', function(message){
            self.actor.run(message, next);
        });
        process.on('exit', function(code){
            console.log('Actor', self.name, 'has quick with code', code);
        });
        process.on('SIGINT', function() {
            process.exit(0);
        });
    });