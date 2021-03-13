const express = require("express");
const { validate } = require("express-validation");

// controllers
const controller = require("../../controllers/voice.controller");

// validation scheme
const { vOptions, voiceSchema } = require("../../validations/voice.validation");

const router = express.Router();

router.route("/plivo_call").post(validate(voiceSchema, vOptions), controller.plivoCall);

module.exports = router;
