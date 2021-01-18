module.exports = {
    /**
     * @api {get} /api/health
     * @apiGroup health
     * @apiName registerHealthCheckApi
     * @apiSuccess {String} OK with current date.
     */
    registerHealthCheckApi: function(app, db) {
        app.get(`/api/health`, function(req, res) {
            console.log('/api/health');
            if (db.connection.readyState == 1) {
                res.status(200);
                res.type('text/plain');
                res.end(`OK ${new Date()}`);
            } else {
                res.status(500);
                res.type('text/plain');
                res.end(`Error in DB ${new Date()}`);
            }
        });
    },

    registerReadinessApi: function(app, db) {
        // "is this container ready for incoming connections?"
        // Kubernetes uses this to determine if container is ready for
        // incoming connections
        // 1. check that node/socket.io/express are ready
        // 2. check db is connected
        // - If Kubelet fails this test, it removes pod from LB
        app.get(`/api/readiness`, function(req, res) {
            if (db.connection.readyState == 1) {
                res.status(200).send('I am happy and healthy\n');
            } else {
                res.status(500).send('something is wrong, I am unhealthy\n');
            }
        });
    },

    registerLivenessApi: function(app) {
        // "does this container work or does it need to be replaced?"
        // check your app internals for health, but maybe
        // don't check for db connection, that's what readiness is for
        // this validates express is responding to requests
        // and not deadlocked
        // - If Kubelet fails this test, it kills and recreates pod
        app.get(`/api/liveness`, function(req, res) {
            res.status(200).send('I am happy and healthy\n');
        });
    }
};
