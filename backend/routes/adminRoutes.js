const express = require("express");
const router = express.Router();


const {login } = require("../controllers/adminController");


router.get('/login/:email/:password' ,login )


module.exports = router;
