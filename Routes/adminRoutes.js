const express = require('express');
const router = express.Router();

const {adminSignup, adminLogin, saveItem, fetch, fake,    } = require('../controllers/adminController');
const { isAuthenticated } = require('../utils/jwt');
const upload = require("../utils/multer");
const { createPaymentPlan, updatePlan } = require('../flutter/flutterinit');


router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.post('/saveItem', isAuthenticated,upload.single('image'), saveItem);
router.get('/find', isAuthenticated, fetch);
router.post('/fake', fake);
router.post('/paymentPlan', isAuthenticated, createPaymentPlan);
router.post('/updatePlan', isAuthenticated, updatePlan);


module.exports = router;