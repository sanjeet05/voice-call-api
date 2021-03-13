const plivo = require("plivo");

// service
const logger = require("./logger.service");

// vars
const { authId, authToken, phloId } = require("../../config/vars");

// models
const db = require("../models");
// const Op = db.Sequelize.Op;
const VoiceLog = db.voiceLog;

const PhloClient = plivo.PhloClient;

const phloClient = new PhloClient(authId, authToken);

const client = new plivo.Client(authId, authToken);

// util function to save logs
const saveVoiceLog = async (values) => {
  try {
    const voiceBody = {
      name: values.name,
      from_phone_number: values.from,
      to_phone_number: values.to,
      duration: parseInt(values.duration),
      start_time: values.startTime,
      end_time: new Date(),
    };

    const newLog = await VoiceLog.create(voiceBody);
    logger.info("data has been saved: %s", values.requestId);
    // send notification
    io.sockets.emit("subscribeToNotification", { phoneNumber: newLog.from_phone_number });
  } catch (err) {
    logger.info("data has not been saved: %s", values.requestId);
    logger.error("Unable to save voice logs", err);
  }
};

// start a call to plivo
exports.plivoCall = async (values) => {
  const { from, to } = values;
  const payload = {
    from: "+91" + from,
    to: "+91" + to,
  };
  try {
    const plivoRes = await phloClient.phlo(phloId).run(payload);

    logger.info("plivoRes: %s", plivoRes);

    const msg = plivoRes.message.split(":");
    let last = msg.pop();
    const requestId = last.substr(2, 36);

    logger.info("requestId: %s", requestId);

    const result = {
      requestId: requestId,
    };
    return result;
  } catch (error) {
    logger.error("Error while doing plivo call: %s", error);
    throw new Error("Error while doing plivo call");
  }
};

// hanged up a call using requestId
exports.plivoHangUp = (values) => {
  const { duration, requestId } = values;

  const timeInMs = parseInt(duration) * 60000;

  setTimeout(async () => {
    try {
      // hanged up a call after duration
      const response = await client.calls.hangup(requestId);
      logger.info("response: %s", response);
      // save the data
      saveVoiceLog(values);
    } catch (err) {
      logger.info("call has been hanged up by user");
      // call has been hanged up by user
      // save the data
      saveVoiceLog(values);
    }
  }, timeInMs);

  const result = {
    message: "call would hanged up after " + duration,
  };
  return result;
};
