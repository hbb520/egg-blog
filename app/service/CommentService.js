const Service = require('egg').Service;
const _ = require('lodash');

module.exports = app => class CommentService extends Service {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.CommentModel = ctx.model.CommentModel;
    this.CategoryModel = ctx.model.CategoryModel;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @feature 增加或更新评论
   * @param product {Object}
   * @return {Promise.<*>}
   */
  async saveOrUpdate(product) {
    if (!product) return this.ServerResponse.createByErrorMsg('新增或更新参数不正确');
    const {id: uid, avator: avator, nickname: nickname} = this.session.currentUser;
    product.uid = uid;
    product.avator = avator;
    product.nickname = nickname;
    const resultRow = await this.CommentModel.findOne({where: {id: product.id}});
    let productRow,
      addOrUpdate;
    if (!resultRow) {
      // TODO 添加
      productRow = await this.CommentModel.create(product);
      addOrUpdate = '添加';
      if (!productRow) return this.ServerResponse.createByErrorMsg('添加失败');
    } else {
      // TODO 更新
      const [updateCount, [updateRow]] = await this.CommentModel.update(product, {
        where: {id: product.id},
        individualHooks: true,
      });
      addOrUpdate = '更新';
      if (updateCount < 1) return this.ServerResponse.createByErrorMsg('更新失败');
      productRow = updateRow;
    }
    return this.ServerResponse.createBySuccessMsgAndData(`${addOrUpdate}成功`, productRow.toJSON());
  }

  /**
   * @feature 评论列表获取
   * @param pageNum {Number} 页数
   * @param pageSize {Number} limit
   * @return {Promise.<*>}
   */
  async getList({pageNum = 1, pageSize = 10, postId = null}) {
    const data = {
      order: [['id', 'ASC']],
      limit: Number(pageSize | 0),
      where: {postId},
      offset: Number(pageNum - 1 | 0) * Number(pageSize | 0),
    };
    const {count, rows} = await this.CommentModel.findAndCount(data);
    if (rows.length < 1) this.ServerResponse.createBySuccessMsg('已无数据');
    rows.forEach(row => row && row.toJSON());
    return this.ServerResponse.createBySuccessData({
      pageNum,
      pageSize,
      list: rows,
      total: count,
      host: this.config.oss.client.endpoint,
    });
  }


};


