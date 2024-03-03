const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const {addWinner , getWinner , getAllWinner} = require('../controllers/winnerController');



//auth middleaware
router.use(checkAuth);

router.get('/getWinner/:id' , getWinner);
router.post('/addWinner/:id' , addWinner);
router.get('/getAllWinner' , getAllWinner);


module.exports = router;
