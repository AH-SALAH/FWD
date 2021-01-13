import { Router } from "express";
import weatherCtrl from "../../controllers/weather/index.js";

const router = Router();

const { root } = weatherCtrl();

/* GET weather listing. */

// get route
router.get('/', root.get);
// post route
router.post('/', root.post);
// get last record route
router.get('/last', root.getLast);

export default router;
