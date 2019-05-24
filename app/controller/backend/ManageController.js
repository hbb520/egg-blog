const Controller = require('egg').Controller;
const _ = require('lodash');
const {ROLE_ADMAIN} = require('../../common/role');

class ManageController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.UserModel = ctx.model.UserModel;
    this.PostModel = ctx.model.PostModel;
    this.CommentModel = ctx.model.CommentModel;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async login() {
    let user,
      response;
    const {username, password} = this.ctx.request.body;
    response = await this.UserService.login(username, password);
    if (response.isSuccess()) {
      user = response.getData();
      if (!user) return this.ctx.body = response;
      if (user.role === ROLE_ADMAIN) this.session.currentUser = user;
      else response = this.ServerResponse.createByErrorMsg('无法登录，不是管理员');
    }
    this.ctx.body = response;
  }

  async count() {
    const [userCount, postCount, commentCount] = await Promise.all([this.UserModel.count({}), this.PostModel.count({}), this.CommentModel.count({})]);
    this.ctx.body = this.ServerResponse.createBySuccessMsgAndData('总数', {
      userCount,
      postCount,
      commentCount,
    });
  }
}


module.exports = ManageController;
