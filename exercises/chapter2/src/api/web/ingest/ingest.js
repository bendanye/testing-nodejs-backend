const { getUserByUserName, createUser } = require('../../database/UserRepository');

//const axios = require('axios');

const url = process.env.END_URL || 'http://localhost:3000';

const ingest = async params => {
    console.log('post...');
    //await axios.post(`${url}/api/ingest`, params);

    if (getUserByUserName({ username: params.username }).length == 0) {
        let result = await createUser({ username: params.username });
        console.log('mid created...');
        return result;
    } else {
        throw new Error(`Trying to create username, ${params.username} that has already exists`)
    }
    
};

module.exports = {
    ingest
};
