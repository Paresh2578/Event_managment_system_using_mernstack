const express = require('express')
const router = express.Router();

const {singleRegister  , groupRegister} = require('../controllers/ParticipationController');

router.post('/singleRegister' , singleRegister );
router.post('/groupRegister' , groupRegister );


module.exports = router;