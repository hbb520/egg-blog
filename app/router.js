'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/portal/userRouter')(app);
  require('./router/portal/postRouter')(app);
  require('./router/portal/commentRouter')(app);
  require('./router/backend/manageRouter')(app);
  require('./router/backend/categoryManageRouter')(app);
};
