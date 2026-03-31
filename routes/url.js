import express from 'express'
import { handleGenerateNewShortUrl ,handleGetAnalytics, handleDeleteUrl  } from '../controllers/url.js';

const router = express.Router();

router.post('/' ,handleGenerateNewShortUrl)

router.get('/analytics/:shortid' , handleGetAnalytics)

router.get('/delete/:shortid', handleDeleteUrl)

export default router;