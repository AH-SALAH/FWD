import { Router } from "express";
import homeCtrl from "../../controllers/home/index.js";

const router = Router();

const { root } = homeCtrl();

/* GET home page. */
router.get('/', root.get);

export default router;
