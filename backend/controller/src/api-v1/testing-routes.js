'use strict';
const router        = require('express').Router({mergeParams: true});

const config        = require('../../../service').config;
const logger        = require('../../../service').logger;
const errors        = require('./errors.js');

const testObj = [
  { id: 1,
    created_at: '2017-01-07T11:59:57.649Z',
    updated_at: '2017-01-07T11:59:57.649Z',
    text: 'Screen',
    user: 1,
    completed: 0,
  },
  { id: 2,
    created_at: '2017-01-08T11:13:41.107Z',
    updated_at: '2017-01-08T11:13:41.107Z',
    text: 'Some brains',
    user: 1,
    completed: 0,
  }
];

router.get('/todos', function(req, res) {
  logger.info('testObj:', testObj);
  res.json(testObj);
});

router.get('/error', function(req, res) {
  res.status(500).json(errors.errorJson(errors.consts.USER_NOT_FOUND));
});

module.exports = router;
