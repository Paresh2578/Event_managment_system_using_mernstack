const express = require('express');
const router = express.Router();

const {verify , orders} = require('../controllers/paymentController');


router.post('/orders' ,orders );
router.post('/verify' , verify);


module.exports = router;