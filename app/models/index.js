const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'postgres',
    });


const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

testDbConnection();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.product = require('./product.model.js')(sequelize, Sequelize);
db.order = require('./order.model.js')(sequelize, Sequelize);
db.catalog = require('./catalog.model.js')(sequelize, Sequelize);


db.user.hasMany(db.order);
db.order.belongsTo(db.user);

db.user.hasOne(db.catalog);
db.catalog.belongsTo(db.user);

db.order.belongsToMany(db.product, { through: 'order_product' });
db.product.belongsToMany(db.order, { through: 'order_product' });

db.catalog.belongsToMany(db.product, { through: 'catalog_product' });
db.product.belongsToMany(db.catalog, { through: 'catalog_product' });

module.exports = db;