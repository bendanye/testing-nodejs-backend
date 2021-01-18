const { validateToken } = require('../../../common/sso');

const { getAllUsers } = require('../../database/UserRepository');

module.exports = {
    /**
     * @api {get} /api/search
     * @apiGroup search
     * @apiName registerSearchApi
     * @apiSuccess {String} OK with current date.
     */
    registerSearchApi: function(app) {
        app.get(`/api/search`, function(req, res) {
            logger.info('/api/search');

            const token = req.query.token;

            validateToken(res, token, async () => {
                logger.info('token ok... getting users now');
                let result = await getAllUsers();
                //logger.info("my result: " + result);
                res.status(200);
                res.json({ success: true, docs: result });
            });
        });
    }
};
