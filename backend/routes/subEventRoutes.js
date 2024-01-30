const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");


const {createSubEvnet , editSubEvent , deletSubEvent } = require("../controllers/subEventController");


router.use(checkAuth);
router.post('/create/:eventId' ,createSubEvnet);
router.put('/edit/:id' ,editSubEvent );
router.delete('/delete/:id' ,deletSubEvent );



module.exports = router;
