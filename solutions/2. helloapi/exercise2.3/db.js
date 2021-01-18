const mongoose = require('mongoose');

const databaseFromTestDocker = global.__TESTCONTAINERS_MONGO_IP__
    ? `mongodb://${global.__TESTCONTAINERS_MONGO_IP__}:${global.__TESTCONTAINERS_MONGO_PORT_27017__}/iammiddle`
    : null;

const database = process.env.MONGO_CONNECTION || databaseFromTestDocker || 'mongodb://localhost:27017/iammiddle';

console.log('connecting to ' + database);

mongoose
    .connect(database, {
        useNewUrlParser: true
    })
    .catch(error => console.log(error));

mongoose.promise = Promise;

module.exports = mongoose;
