'use strict';
const router = require('express').Router();

const logger = require('../../../model').logger;
const authCheck = require('../auth/auth-check');
const accessRights = require('../middleware').accessRights;

const authRoutes = require('./auth');
const testingRoutes = require('./testing-routes');
const todosRoutes = require('./todos');

// Test pages with sample data, which do not require authentication.
// Used for testing.
router.use('/test', testingRoutes);

//authentication checks
router.use('/users', authCheck, accessRights.getAuthenticatedUser);
router.use('/users/:userId', accessRights.mayAccessUser);
router.use('/users/:userId/todos/:todo_id', accessRights.mayAccessTodo);

// Routes with useful information:
router.use('/', authRoutes);
router.use('/auth', authRoutes);
// router.use('/users/:userId', require('./users'));
router.use('/users/:userId/todos', todosRoutes);

// //handle 404 responses
// router.use(function(req, res, next) {
//     logger.info('Attempted to access inexistent resource: ' + req.originalUrl);
//     res.status(404).render('notfound'); //  send('Sorry cannot find that!');
// });

module.exports = router;
