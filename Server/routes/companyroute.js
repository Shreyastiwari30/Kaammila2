import express from 'express';
import isauthenticated from '../middlewares/authenticated.js'
import {login,register,updateProfile,logout} from '../controllers/user.controller.js';
import { getcompany, getcompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';

const router= express.Router();

router.route('/register').post(isauthenticated,registerCompany);
router.route('/get').get(isauthenticated,getcompany);
router.route('/update/:id').put(isauthenticated,updateCompany);
router.route('/get/:id').get(isauthenticated,getcompanyById)

export default router;