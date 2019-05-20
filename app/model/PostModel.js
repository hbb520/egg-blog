const {ON_SALE} = require('../common/post');
const {NO_Recommend} = require('../common/postRecommend');

module.exports = app => {
  const {INTEGER, STRING, DATE, TEXT, DECIMAL, UUID, UUIDV4} = app.Sequelize;
  const PostModel = app.model.define('post', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // 分类id
    categoryId: {
      type: UUID,
      allowNull: false,
    },
    //用户ID
    uid: {
      type: UUID,
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
    //标题
    title: {
      type: STRING(200),
      allowNull: true,
    },
   //内容
    content: {
      type: TEXT,
      allowNull: true,
    },
    //评论数
    comments: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    //浏览数
    page_view: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    //是否被推荐
    is_recommend: {
      type: INTEGER(6),
      allowNull: true,
      defaultValue: NO_Recommend.CODE,
    },
    // 状态 1-展示中，2-下架，3-删除
    status: {
      type: INTEGER(6),
      allowNull: true,
      defaultValue: ON_SALE.CODE,
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
    tablseName: 'post',
  }, {
    indexes: [
      {fields: ['categoryId']},
    ],
  }, {
    classMethods: {
      associate() {
        PostModel.hasOne(app.model.CartModel, {foreignKey: 'id'});
      },
    },
  });
  // ProductModel.belongsTo(app.model.categoryModel)
  PostModel.beforeBulkUpdate(post => {
    post.attributes.updateTime = new Date();
    return post;
  });

  return PostModel;
};
