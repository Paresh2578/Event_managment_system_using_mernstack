const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");


const {createEvnet  , editEvent , deletEvent , getAllEvent , getSubEvents , getDashbordInfomation} = require("../controllers/eventContoller");


router.get('/getAllEvent' , getAllEvent);
router.get('/getSubEvent/:id' ,getSubEvents );

//auth middleaware
router.use(checkAuth);

router.post('/create' ,createEvnet );
router.put('/edit/:id' ,editEvent );
router.delete('/delete/:id' ,deletEvent );
router.get('/getDashbordInfo' ,getDashbordInfomation );


module.exports = router;
