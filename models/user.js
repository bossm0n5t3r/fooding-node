module.exports = (sequelize, DataTypes) => (
  sequelize.define('user', {
    user_name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    user_email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    user_img: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    user_provider: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'local',
    },
    user_snsId: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    user_token: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    user_approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_hasStore: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);