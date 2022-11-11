const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  res.send("/user get");
});

module.exports = router;
