const router = require("express").Router();
const v1 = require("../controllers/v1");
const v2 = require("../controllers/v2");

router.post("/v1", v1.sendMail).post("/v2", v2.sendMail);

module.exports = router;
