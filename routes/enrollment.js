const router = require("express").Router();
const { createEnrollment } = require("../controllers/enrollment");
router.post("/create", createEnrollment);

module.exports = router;
