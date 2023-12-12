module.exports = (sequelize, Sequelize) => {
    const Catalog = sequelize.define("catalog", {
        sellerId: {
            type: Sequelize.INTEGER
        },
    });
    return Catalog;
};