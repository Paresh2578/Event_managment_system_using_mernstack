const express = require('express')
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const {singleRegister  , groupRegister , getSingleParticipationsList , getGroupParticipationsList} = require('../controllers/ParticipationController');

router.post('/singleRegister' , singleRegister );
router.post('/groupRegister' , groupRegister );

//auth middleaware
router.use(checkAuth);

router.get('/getsingleParticipationsList/:id' , getSingleParticipationsList);
router.get('/getGroupParticipationsList/:id' , getGroupParticipationsList);



module.exports = router;