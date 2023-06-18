const authRouter = require('./authRouter');
const todosRouter = require('./todosRouter');

function routes(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/todos', todosRouter);
}

module.exports = routes;