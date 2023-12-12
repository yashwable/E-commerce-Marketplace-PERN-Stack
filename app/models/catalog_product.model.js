module.exports = (sequelize, Sequelize) => {
    const CatalogProduct = sequelize.define("catalog_product", {
        catalogId: {
            type: Sequelize.INTEGER
        },
        productId: {
            type: Sequelize.INTEGER
        },
    });
    return CatalogProduct;
};