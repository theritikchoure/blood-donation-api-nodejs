const { bloodStock } = require('../controllers/bloodStockController');

const express = require('express');
const router = express.Router();

router.route('/').get(bloodStock);



module.exports = router;