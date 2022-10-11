const {Router} = require ("express");
const tempCtrl = require ( "../controller/temperament.controller");
const router = Router();

router.get("/", tempCtrl.getTemperaments);

module.exports = router;