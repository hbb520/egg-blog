const { ROLE_CUSTOMER } = require('../common/role');

module.exports = app => {
  const { INTEGER, STRING, DATE, UUID, UUIDV4 } = app.Sequelize;

  const UserModel = app.model.define('user', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(50),
      allowNull: false,
      unique: true,
    },
    nickname:{
      type: STRING(50),
      allowNull: true,
    },
    password: {
      type: STRING(200),
      allowNull: false,
    },
    avator:{
      type: STRING(50),
      allowNull: true,
      defaultValue: "https://pic4.zhimg.com/da8e974dc_is.jpg",
    },
    email: {
      type: STRING(50),
      allowNull: true,
    },
    phone: {
      type: STRING(20),
      allowNull: true,
    },
    lives_in_city:{
      type: STRING(100),
      allowNull: true,
    },
    introduction:{
      type: STRING(500),
      allowNull: true,
    },
    question: {
      type: STRING(100),
      allowNull: true,
      defaultValue: "我是谁",
    },
    answer: {
      type: STRING(100),
      allowNull: true,
      defaultValue: "我就是我",
    },
    role: {
      type: INTEGER(4),
      allowNull: false,
      defaultValue: ROLE_CUSTOMER,
    },
    createTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updateTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  }, {
    timestamps: false,
    tablseName: 'user',
  });

  UserModel.beforeBulkUpdate(user => {
    user.attributes.updateTime = new Date();
    return user;
  });

  // UserModel.beforeCreate((user) => {
  //   console.log(user)
  //   return user
  // })

  return UserModel;
};
