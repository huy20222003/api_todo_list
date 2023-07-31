const authRouter = require('./authRouter');
const todosRouter = require('./todosRouter');
const userRouter = require('./userRouter');
const labelRouter = require('./labelRouter');

function routes(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/todos', todosRouter);
  app.use('/api/user', userRouter);
  app.use('/api/label', labelRouter);
}

module.exports = routes;
