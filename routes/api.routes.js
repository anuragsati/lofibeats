import express from 'express';
const router = express.Router();

import apiController from '../controllers/api.controller.js';

router.get('/lofi', apiController.getLofi); 
router.get('/lofidata',apiController.getLofiData);


export default router;
