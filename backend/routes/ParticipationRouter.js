const express = require('express')
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const {singleRegister  , groupRegister , getSingleParticipationsList , getGroupParticipationsList , deleteSingleParticipations , deleteGroupParticipations} = require('../controllers/ParticipationController');

router.post('/singleRegister' , singleRegister );
router.post('/groupRegister' , groupRegister );
router.delete('/deleteSingleParticipations/:id' , deleteSingleParticipations );
router.delete('/deleteGroupParticipations/:id' , deleteGroupParticipations );

//auth middleaware
router.use(checkAuth);

router.get('/getsingleParticipationsList/:id' , getSingleParticipationsList);
router.get('/getGroupParticipationsList/:id' , getGroupParticipationsList);



module.exports = router;