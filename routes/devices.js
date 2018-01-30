const express = require('express');
const router = express.Router();
const _ = require('lodash');
const devicesModel = require('../models/devices');

const wsUpdate = (ws, msg) => {
  try {
    const upd = JSON.parse(msg);
    _.assign(ws.deviceData, upd);
    devicesModel.update(ws.deviceData);
  } catch (e) {}
};

const wsDisconnect = ws => {
  if (ws.deviceData) {
    devicesModel.remove(ws.deviceData);
  }
};

/* GET users listing. */
router.ws('/:type', (ws, { params = {} }) => {
  console.log('ws connection', _.pick(params, 'type'));
  ws.deviceData = devicesModel.create(_.pick(params, 'type'), () => wsDisconnect(ws));

  ws.on('message', _.curry(wsUpdate)(ws));

  ws.on('close', wsDisconnect)
});

router.get('/list/:type?', ({ params = {} }, res) => {
  let devices = devicesModel.list();

  if (params.type) devices = _.filter(devices, _.pick(params, 'type'));

  res.send(devices)
});

module.exports = router;
