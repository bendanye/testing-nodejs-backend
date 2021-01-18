const { createUser } = require('../../database/UserRepository');

const axios = require('axios');

const url = process.env.END_URL || 'http://localhost:3000';

const ingest = async params => {
    console.log('post...');
    await axios.post(`${url}/api/ingest`, params);

    let result = await createUser({ username: params.username });

    console.log('mid created...');

    return result;
};

module.exports = {
    ingest
};
