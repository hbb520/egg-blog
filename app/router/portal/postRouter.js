module.exports = app => {
  const subRouter = app.router.namespace('/api');
  const checkLogin = app.middleware.checkLogin({});
  const checkAdminLogin = app.middleware.checkLogin({ checkAdmin: true });
  subRouter.post('/post/saveOrUpdate', checkLogin, app.controller.portal.postController.saveOrUpdate);
  subRouter.get('/post/detail/:id', checkLogin, app.controller.portal.postController.getDetail);
  subRouter.get('/post/list', app.controller.portal.postController.getList);
  subRouter.get('/post/myList',checkLogin, app.controller.portal.postController.getMyList);
  subRouter.put('/upload', checkLogin, app.controller.portal.postController.upload);
  subRouter.post('/manage/post/setSaleStatus', checkAdminLogin, app.controller.portal.postController.setSaleStatus);
  subRouter.post('/manage/post/setIsRecommend', checkAdminLogin, app.controller.portal.postController.setIsRecommend);
};
