import express from "express";

import {
    englishToHindi,
    hindiToEnglish
} from "../controllers/translateController.js";

const router= express.Router();

//english to hindi
router.post("/english-hindi", englishToHindi);

//hindi to english
router.post("/hindi-english", hindiToEnglish);

export default router;