const express = require('express');
const bodyParser = require('body-parser');

const searchApi = require('./api/web/search/searchApi');
const ingestApi = require('./api/web/ingest/ingestApi');
const healthApi = require('./api/web/health/healthcheckApi');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const registerApp = db => {
    searchApi.registerSearchApi(app);
    ingestApi.registerIngestApi(app);
    healthApi.registerHealthCheckApi(app);

    return app;
};

module.exports = {
    registerApp
};
