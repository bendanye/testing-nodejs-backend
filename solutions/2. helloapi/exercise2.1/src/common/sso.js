const request = require('request');

const ssoFromTestDocker = global.__TESTCONTAINERS_SSO_IP__
    ? `http://${global.__TESTCONTAINERS_SSO_IP__}:${global.__TESTCONTAINERS_SSO_PORT_4433__}`
    : null;

const sso_url = process.env.SSO_URL || ssoFromTestDocker || 'https://localhost:44333/core/connect';

console.log('sso_url', sso_url);

const isTokenValid = (token, callback) => {
    //console.log(token);
    request.get(
        {
            method: 'GET',
            url: `${sso_url}/userinfo`,
            auth: {
                bearer: token
            },
            rejectUnauthorized: false
        },
        (error, res, body) => {
            if (error) {
                console.log(error);
                callback(error.errorMessage);
            } else if (!body) {
                console.log('missing body');
                callback('MISSING BODY');
            } else {
                let jsonBody;
                try {
                    jsonBody = JSON.parse(body);
                } catch (err) {
                    console.log('parse body errpr');
                    callback('PARSE BODY ERROR');
                    return;
                }

                if (jsonBody.Message == 'invalid_token') {
                    console.log('invalid token');
                    callback('INVALID TOKEN');
                } else if (!jsonBody.sub) {
                    console.log('no user found', jsonBody);
                    callback('NO USER FOUND');
                } else {
                    if (!callback) {
                        callback('VALID TOKEN. NO CALLBACK FOUND');
                    } else {
                        console.log('valid body', jsonBody.sub);
                        callback();
                    }
                }
            }
        }
    );
};

const getOrgClaims = token => {
    request.get(
        {
            method: 'GET',
            url: 'http://localhost' + '/' + 'getOrgClaimsUserGroupByToken',
            qs: {
                token: token
            },
            rejectUnauthorized: false
        },
        (error, res, body) => {
            if (error) {
                console.log(error);
            } else if (!body) {
                console.log('missing body');
            } else {
                let jsonBody;
                try {
                    jsonBody = JSON.parse(body);
                } catch (err) {
                    console.log('parse body errpr');
                }

                if (jsonBody.Message == 'invalid token') {
                    console.log('invalid token');
                } else if (!jsonBody.sub) {
                    console.log('no user found');
                } else {
                    console.log('valid body', jsonBody.sub);
                }
            }
        }
    );
};

const validateToken = (res, token, callback) => {
    isTokenValid(token, error => {
        if (error) {
            res.send({ sucess: false, errorMessage: error });
        } else {
            callback();
        }
    });
};

module.exports = {
    validateToken,
    getOrgClaims
};
