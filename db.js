
var pgtools = require('pgtools');
pgtools.createdb({
    user: 'postgres',
    password: '12345',
    port: 5432,
    host: 'localhost'
}, 'monDb', function(err, res) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log(res);
});