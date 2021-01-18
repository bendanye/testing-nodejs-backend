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
    }
};
