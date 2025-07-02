const express = require('express');
const router = express.Router();

const { submitReport, getReports } = require('../controllers/reportController');

router.post('/report', submitReport);
router.get('/dashboard', getReports);