module.exports = app => {
  const subRouter = app.router.namespace('/api');
  const checkLogin = app.middleware.checkLogin({ checkAdmin: true });
  subRouter.post('/manage/category/addCategory', checkLogin, app.controller.backend.categoryManageController.addCategory);
  subRouter.put('/manage/category/updateCategoryName', checkLogin, app.controller.backend.categoryManageController.updateCategoryName);
  subRouter.get('/manage/category/parentId/:parentId', checkLogin, app.controller.backend.categoryManageController.getChildParallelCagtegory);
  subRouter.get('/manage/category/deep/parentId/:parentId', checkLogin, app.controller.backend.categoryManageController.getCategoryAndDeepChildCategory);
};
