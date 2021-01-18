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

const getAllUsers = async () => {
    const results = await User.find({});
    return results;
};

module.exports = {
    createUser,
    getAllUsers
};
