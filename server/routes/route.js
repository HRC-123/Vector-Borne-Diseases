const express = require('express');


const router = express.Router();

const userController = require('../controller/user-controller')

router.get('/',userController.homepage);
router.get('/vaccines',userController.vaccines);
router.get('/variants',userController.variants);
router.get('/about',userController.about);
router.get('/data',userController.data);
router.get('/predict', userController.predmain);
router.post('/reqdata', userController.getTheData);
router.get('/getfilecsv', userController.getFileCSV);
router.get("/getfilejson", userController.getFileJSON);
router.get('/getanalysisfilecsv', userController.getAnalysisFileCSV);
router.get("/getanalysisfilejson", userController.getAnalysisFileJSON);
module.exports = router;


