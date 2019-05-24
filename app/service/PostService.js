const Service = require('egg').Service;
const _ = require('lodash');

module.exports = app => class PostService extends Service {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.PostModel = ctx.model.PostModel;
    this.CategoryModel = ctx.model.CategoryModel;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.CategoryModel.hasOne(this.PostModel, {foreignKey: 'id'});
    this.PostModel.belongsTo(this.CategoryModel, {foreignKey: 'categoryId'});
  }

  /**
   * @feature 增加或更新文章
   * @param
   * @return {Promise.<*>}
   */
  async saveOrUpdate(product) {
    if (!product) return this.ServerResponse.createByErrorMsg('新增或更新参数不正确');
    const {id: uid, avator: avator, nickname: nickname} = this.session.currentUser;
    product.uid = uid;
    product.avator = avator;
    product.nickname = nickname;
    const resultRow = await this.PostModel.findOne({where: {id: product.id}});
    let productRow,
      addOrUpdate;
    if (!resultRow) {
      // TODO 添加
      productRow = await this.PostModel.create(product);
      addOrUpdate = '添加';
      if (!productRow) return this.ServerResponse.createByErrorMsg('添加失败');
    } else {
      // TODO 更新
      const [updateCount, [updateRow]] = await this.PostModel.update(product, {
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
   * @feature 管理员修改文章状态
   * @param id {Number} 文章id
   * @param status {Number} 文章状态
   * @return {Promise.<*>}
   */
  async setSaleStatus(id, status) {
    if (!id || !status) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
    const [updateCount, [updateRow]] = await this.PostModel.update({status}, {where: {id}, individualHooks: true});
    if (updateCount < 1) return this.ServerResponse.createByErrorMsg('修改状态失败');
    return this.ServerResponse.createBySuccessMsgAndData('修改状态成功', updateRow.toJSON());
  }

  /**
   * @feature 管理员修改文章是否推荐
   * @param id {Number} 文章id
   * @param is_recommend {Number} 文章是否被推荐 0-否   1-已推荐
   * @return {Promise.<*>}
   */
  async setIsRecommend(id, is_recommend) {
    if (!id || !is_recommend) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
    const [updateCount, [updateRow]] = await this.PostModel.update({is_recommend}, {
      where: {id},
      individualHooks: true
    });
    if (updateCount < 1) return this.ServerResponse.createByErrorMsg('修改推荐状态失败');
    return this.ServerResponse.createBySuccessMsgAndData('修改推荐状态成功', updateRow.toJSON());
  }

  /**
   * @feature 获取文章详情
   * @param id {Number} 文章id
   * @return {Promise.<*>}
   */
  async getDetail(id) {
    if (!id) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, 'ILLEGAL_ARGUMENT');
    const productRow = await this.PostModel.findOne({
      where: {id},
      include: [
        {model: this.CategoryModel, attributes: ['name', 'id', 'parentId']}
      ]
    });
    if (!productRow) this.ServerResponse.createByErrorMsg('文章已下架或删除');

    const page_view = productRow.toJSON().page_view + 1;
    await this.PostModel.update({page_view}, {where: {id}, individualHooks: true});

    return this.ServerResponse.createBySuccessData(productRow.toJSON());
  }

  /**
   * @feature 文章列表获取
   * @param pageNum {Number} 页数
   * @param pageSize {Number} limit
   * @return {Promise.<*>}
   */
  async getList({pageNum = 1, pageSize = 10, categoryId = null, is_recommend = null, title = null}) {

    const data = {
      order: [['id', 'ASC']],
      limit: Number(pageSize | 0),
      offset: Number(pageNum - 1 | 0) * Number(pageSize | 0),
    };
    if (categoryId) {
      data.where = {
        categoryId
      };
    }
    if (is_recommend) {
      data.where = {
        is_recommend
      };
    }
    if (title) {
      data.where = {title: {$like: `%${title}%`}};
    }
    const {count, rows} = await this.PostModel.findAndCount(data);
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

  /**
   * @feature 我的文章列表获取
   * @param pageNum {Number} 页数
   * @param pageSize {Number} limit
   * @return {Promise.<*>}
   */
  async getMyList({pageNum = 1, pageSize = 10, categoryId = null, is_recommend = null, title = null}) {
    const {id: uid} = this.session.currentUser;
    console.log(uid)
    const data = {
      order: [['id', 'ASC']],
      limit: Number(pageSize | 0),
      where: {uid},
      offset: Number(pageNum - 1 | 0) * Number(pageSize | 0),
    };

    if (categoryId) {
      data.where = {
        categoryId
      };
    }
    if (is_recommend) {
      data.where = {
        is_recommend
      };
    }
    if (title) {
      data.where = {title: {$like: `%${title}%`}};
    }
    const {count, rows} = await this.PostModel.findAndCount(data);
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


