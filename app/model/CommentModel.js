const {ON_SALE} = require('../common/post');
const {NO_Recommend} = require('../common/postRecommend');

module.exports = app => {
  const {INTEGER, STRING, DATE, TEXT, DECIMAL, UUID, UUIDV4} = app.Sequelize;
  const CommentModel = app.model.define('comment', {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      //用户ID
      uid: {
        type: INTEGER,
        allowNull: false,
      },
      // 用户昵称
      nickname: {
        type: STRING(50),
        allowNull: false,
      },
      //用户头像
      avator: {
        type: STRING(50),
        allowNull: false,
      },
      postId: {
        type: INTEGER,
        allowNull: false,
      },
      //内容
      content: {
        type: TEXT,
        allowNull: false,
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
      freezeTableName: true,
      tablseName: 'comment',
    },
    {
      classMethods: {
        associate() {
          // CommentModel.belongsTo(app.model.CategoryModel, {foreignKey: 'categoryId'});
        },
      },
    }
  );


  CommentModel.beforeBulkUpdate(post => {
    post.attributes.updateTime = new Date();
    return post;
  });

  return CommentModel;
};
