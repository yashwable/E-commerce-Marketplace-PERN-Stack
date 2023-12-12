module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.TEXT
        },
        typeOfUser: {
            type: Sequelize.STRING
        },
    });
    return User;
};