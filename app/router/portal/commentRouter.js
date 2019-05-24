module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  const subRouter = app.router.namespace('/api');
  subRouter.post('/comment/saveOrUpdate', checkLogin, app.controller.portal.commentController.saveOrUpdate);
  subRouter.get('/comment/list', app.controller.portal.commentController.getList);
};
