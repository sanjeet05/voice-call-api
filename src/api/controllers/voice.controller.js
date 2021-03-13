const { validate: uuidValidate } = require("uuid");

// service
const logger = require("../services/logger.service");
const voiceService = require("../services/voice.service");

exports.plivoCall = async (req, res) => {
  const { name, from, to, duration } = req.body;
  const callValues = {
    from: "+91" + from,
    to: "+91" + to,
  };

  try {
    // do anything need to save for caching

    // start a call
    const callRes = await voiceService.plivoCall(callValues);

    // if request id is not valid then return error
    // Ex: stopped. next node uuid not found for b'Initiate Call'
    if (!uuidValidate(callRes.requestId)) {
      return res.status(403).json({ error: "Unable to call" });
    }

    // do the hangup call afer a duration
    logger.info("requestId: %s", callRes.requestId);
    const hangupValues = {
      name,
      from: "+91" + from,
      to: "+91" + to,
      duration,
      requestId: callRes.requestId,
      startTime: new Date(),
    };
    voiceService.plivoHangUp(hangupValues);

    res.status(200).json({ message: "calling", duration: duration });
  } catch (error) {
    console.error("Unable to call", error);
    res.status(400).json({ error: "Unable to call" });
  }
};
