module.exports = app => {
  const subRouter = app.router.namespace('/api');
  subRouter.post('/manage/user/login', app.controller.backend.manageController.login);
  subRouter.get('/manage/count', app.controller.backend.manageController.count);
};
