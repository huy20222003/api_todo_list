const authRouter = require('./authRouter');
const todosRouter = require('./todosRouter');
const userRouter = require('./userRouter');


function routes(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/todos', todosRouter);
    app.use('/api/user', userRouter);
}

module.exports = routes;