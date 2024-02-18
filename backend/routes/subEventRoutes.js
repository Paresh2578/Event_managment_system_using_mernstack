const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");


const {createSubEvnet , editSubEvent , deletSubEvent , getSubEvents , getCoordinator } = require("../controllers/subEventController");

router.get('/getSubEvent/:id' ,getSubEvents );
router.get('/getCoordinator/:id' ,getCoordinator );

router.use(checkAuth);
router.post('/create/:eventId' ,createSubEvnet);
router.put('/edit/:id' ,editSubEvent );
router.delete('/delete/:id' ,deletSubEvent );



module.exports = router;
