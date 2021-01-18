const User = require('./User.model');

const createUser = async params => {
    let obj = {
        username: params.username
    };

    let user = new User(obj);
    try {
        user.save();
        return 'SUCCESS';
    } catch (error) {
        console.log(error);
        return 'ERROR';
    }
};

const getUserByUserName = async params => {
    const results = await User.find({
        username: params.username
    });
    return results.length;
}

const getAllUsers = async () => {
    const results = await User.find({});
    return results;
};

module.exports = {
    createUser,
    getUserByUserName,
    getAllUsers
};
