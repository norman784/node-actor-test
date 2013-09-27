var self = {
    file: null,
    actor: null,
    name: null
};

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

module.exports = function(file, message, next) {
    self.file = file;

    self.name = self.file.split('/');
    self.name = self.name[self.name.length-1].split('.')[0];

    if (self.file === null) {
        throw new Error("File cannot be undefined");
    } else {
        self.actor = require(self.file);

        if ((error = self.validate(self.actor)) !== null) {
            throw error;
        } else {
            self.actor.run(message, next);
        }
    }

    return self;
};