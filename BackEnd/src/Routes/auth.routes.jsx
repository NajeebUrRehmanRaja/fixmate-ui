import express, { request } from 'express';
import {signup, login} from '../Controllers/auth.controller';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;