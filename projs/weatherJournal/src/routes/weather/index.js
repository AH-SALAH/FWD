import { Router } from "express";
import weatherCtrl from "../../controllers/weather/index.js";

const router = Router();

const { root } = weatherCtrl();

/* GET weather listing. */
router.get('/', root.get);

router.post('/', root.post);

router.get('/last', root.getLast);

export default router;
