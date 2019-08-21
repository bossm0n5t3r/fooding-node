module.exports = (sequelize, DataTypes) => (
  sequelize.define('store', {
    store_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    store_address: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    store_zipcode: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    store_start_time: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    store_end_time: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    store_menu_1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    store_price_1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    store_menu_2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    store_price_2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    store_img_1: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    store_img_2: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    store_img_3: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);