module.exports = {
    name: 'Test',
    description: 'Test description',
    outputExample: {},
    inputs: {
        required: [],
        optional: []
    },
    run: function(message, next) {
        var Pi = 0;
        var n = 1;
        for (i = 0; i <= 1000; i++) {
            Pi = Pi + (4 / n) - (4 / (n + 2));
            n = n + 4;
        }

        next(Pi);
    }
}