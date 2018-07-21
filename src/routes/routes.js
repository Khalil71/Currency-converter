const { Router } = require('express');

const ConvertRoutes = require('../APIs/Convert/index');

const router = new Router();

// Convert Routes
router.use('/', ConvertRoutes);

module.exports = router;
