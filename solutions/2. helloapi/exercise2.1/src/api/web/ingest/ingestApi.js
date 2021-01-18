const { ingest } = require('./ingest');

module.exports = {
    registerIngestApi: function(app) {
        app.post(`/api/ingest`, async function(req, res) {
            console.log('/api/ingest');

            const result = await ingest(req.body);

            res.status(200);

            if (result === 'SUCCESS') {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        });
    }
};
