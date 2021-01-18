const db = require('./api/database/db');

const { registerApp } = require('./app');

const app = registerApp(db);

const port = process.env.PORT || 3050;

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
