const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const _ = require('lodash');

class PostController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.resquest = ctx.request;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.CommentService = ctx.service.commentService;
  }
  // 添加评论
  async saveOrUpdate() {
    const product = this.resquest.body;
    const response = await this.CommentService.saveOrUpdate(product);
    this.ctx.body = response;
  }


  // 获取文章评论列表
  async getList() {
    const response = await this.CommentService.getList(this.resquest.query);
    this.ctx.body = response;
  }

}


module.exports = PostController;
