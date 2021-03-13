const express = require("express");
const voiceRoutes = require("./voice.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

router.use("/voice", voiceRoutes);

module.exports = router;
