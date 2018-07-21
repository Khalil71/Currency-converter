const { Router } = require('express');

const Convert = require('./Convert.Controller');

const router = new Router();

router.post('/', Convert.convertAmount);

module.exports = router;
