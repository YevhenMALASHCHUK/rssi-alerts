const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

const SECONDS_TO_OFFLINE = 5 * 60; // 5 minutes
const MINIMUM_RSSI_LEVEL = -120;

/**
 * @returns payment status for a job
 */
app.post('/rssis', async (req, res) => {
  const deviceId = req.body.deviceId;
  if (!deviceId) {
    return res.status(403).end('ERROR: device id should not be empty'); // Status 403 Forbidden
  }
  // TODO: validate deviceId format to be UUID v4

  let rssiLevel = req.body.rssiLevel;
  if (!rssiLevel) {
    return res.status(403).end('ERROR: RSSI level should not be empty'); // Status 403 Forbidden
  }
  rssiLevel = parseInt(rssiLevel);
  if (isNaN(rssiLevel) || (rssiLevel > 0) || (rssiLevel < MINIMUM_RSSI_LEVEL)) {
    return res.status(400).end('ERROR: invalid value of the RSSI level'); // Status 400 Bad Request
  }

  const {Level} = req.app.get('models');
  const record = await Level.findOne({ where: { deviceId }});
  if (!record) return res.status(404).end('ERROR: device not found in the database');

  try {
    record.rssiLevel = rssiLevel;
    await record.save();
  } catch {
    return res.status(500).end('ERROR: update operation failed');
  }

  res.status(200).end('OK');
});

// TODO: chang database model and add alerts generator based on the data in the tables

module.exports = app;
