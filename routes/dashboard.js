const express = require('express');
const router = express.Router();
const{upload,imageupload} = require('../controlers/uploads');

const dashboard = require('../controlers/dashboard');
const {authenticateToken} = require('../app')

router.post('/upload',upload.single('image'),imageupload);



router.post('/uploadquestion',dashboard.uploadQuestion)
router.post('/createinterview',authenticateToken,dashboard.createInterview);
router.post('/submitresponse',authenticateToken,dashboard.submitresponse);
router.get('/allinterview',authenticateToken,dashboard.getAllInterview)
router.get('/getinterview/:interview_id',authenticateToken,dashboard.getinterview)
router.get('/getresponse',authenticateToken,dashboard.getresponse)
router.get('/getquestion/:question_id',authenticateToken,dashboard.getquestion)

router.post('/checkeligibility',authenticateToken,dashboard.checkeligibility);



module.exports = router ;