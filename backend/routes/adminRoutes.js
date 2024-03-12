const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');


const {login , addAdmin , updateAdminProfile   , getAdminProfile , addFirstAdmin} = require("../controllers/adminController");


router.get('/login/:email/:password' ,login )
router.post('/addFirstAdmin' ,addFirstAdmin )

//auth middleaware
router.use(checkAuth);

router.post('/addAdmin' , addAdmin);
router.put('/updateAdminProfile/:id' , updateAdminProfile);
router.get('/getAdminProfile/:id' , getAdminProfile);


module.exports = router;
