const express = require('express')
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const {singleRegister  , groupRegister , getSingleParticipationsList} = require('../controllers/ParticipationController');

router.post('/singleRegister' , singleRegister );
router.post('/groupRegister' , groupRegister );

//auth middleaware
router.use(checkAuth);

router.get('/getsingleParticipationsList/:id' , getSingleParticipationsList);



module.exports = router;