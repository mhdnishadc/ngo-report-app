const express = require('express');
const router = express.Router();

const { submitReport, getReport} = require('../controller/reportController');

router.post('/report', submitReport);
router.get('/dashboard', getReport);
module.exports = router;

