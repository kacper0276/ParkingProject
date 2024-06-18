const express = require("express");
const router = new express.Router();
const cors = require("cors");

router.get("/", (req, res) => {
  res.json({ Test: "Test" });
});

module.exports = router;
