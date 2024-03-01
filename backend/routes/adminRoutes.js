const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');


const {login , addAdmin , updateAdminProfile   , getAdminProfile} = require("../controllers/adminController");


router.get('/login/:email/:password' ,login )

//auth middleaware
router.use(checkAuth);

router.post('/addAdmin' , addAdmin);
router.put('/updateAdminProfile/:id' , updateAdminProfile);
router.get('/getAdminProfile/:id' , getAdminProfile);


module.exports = router;
