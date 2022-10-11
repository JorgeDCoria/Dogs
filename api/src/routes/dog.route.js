const {Router} = require('express');
const router = Router();
const dogCtrl = require("../controller/dog.controller");

router.get("/", dogCtrl.getDogs);
router.get("/:id", dogCtrl.getDogById);
router.post("/", dogCtrl.addDog);

module.exports = router;
