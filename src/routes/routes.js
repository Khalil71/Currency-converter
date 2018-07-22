const { Router } = require('express');

const ConvertRoutes = require('../api/Convert/index');

const router = new Router();

// Convert Routes
router.use('/', ConvertRoutes);

module.exports = router;
