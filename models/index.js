const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = sequelize.import('./user');

/*
db.Store = require('./store')(sequelize, Sequelize);
db.StoreCategory = require('./store_category')(sequelize, Sequelize);
db.StoreReview = require('./store_review')(sequelize, Sequelize);

db.User.hasMany(db.Store);
db.Store.belongsTo(db.User);

db.StoreCategory.hasMany(db.Store);
db.Store.belongsTo(db.StoreCategory);

db.User.hasMany(db.StoreReview);
db.StoreReview.belongsTo(db.User);

db.Store.hasMany(db.StoreReview);
db.StoreReview.belongsTo(db.Store);
*/

module.exports = db;

//TODO Sequelize 5 연결부분 적용하기