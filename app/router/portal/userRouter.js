module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  const subRouter = app.router.namespace('/api');
  subRouter.post('/user/login', app.controller.portal.userController.login);
  subRouter.get('/user/logout', app.controller.portal.userController.logout);
  subRouter.post('/user/register', app.controller.portal.userController.register);
  subRouter.get('/user/checkValid/:type/:value', app.controller.portal.userController.checkValid);
  subRouter.get('/user/getUserSession', checkLogin, app.controller.portal.userController.getUserSession);
  subRouter.get('/user/forgetGetQuestion/:username', app.controller.portal.userController.forgetGetQuestion);
  subRouter.post('/user/forgetCheckAnswer', app.controller.portal.userController.forgetCheckAnswer);
  subRouter.put('/user/forgetRestPassword', app.controller.portal.userController.forgetRestPassword);
  subRouter.put('/user/resetPassword', checkLogin, app.controller.portal.userController.resetPassword);
  subRouter.put('/user/updateUserInfo', checkLogin, app.controller.portal.userController.updateUserInfo);
  subRouter.get('/user/getUserInfo', checkLogin, app.controller.portal.userController.getUserInfo);
};
