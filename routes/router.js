const express = require('express');
const router = express.Router();
const { Register, Login, getUserDetails } = require('../controllers/controller');

router.post('/register', Register); 
router.post('/login', Login); 
router.get('/user/getUser/:email',getUserDetails);

module.exports = router;
