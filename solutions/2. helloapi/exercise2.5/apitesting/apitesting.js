const newman = require('newman');

let environmentStuff = require('./backendapp.postman_environment.json');

async function start() {

    environmentStuff.values.forEach(element => {
        if (element.key == 'url') {
            element.value = 'localhost:3050';
        }
    });

    newman
        .run({
            collection: require('./backend-app.postman_collection.json'),
            reporters: ['cli'],
            folder: ['healthcheck', 'search'],
            environment: environmentStuff
        })
        .on('done', function(err, summary) {
            if (err || summary.error) {
                console.error('collection run encountered an error.');
                process.exit(1);
            } else {
                console.log('collection run completed.');
                process.exit(0);
            }
        });
}

start();
