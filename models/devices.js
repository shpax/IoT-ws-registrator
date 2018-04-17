const config = require('config');
const _ = require('lodash');

const devices = {
  counter: 0,
  map: {}
};


function updateDeviceTimeout(device) {
  if (device.timeout) clearTimeout(device.timeout);

  device.timeout = setTimeout(() => {
    delete devices.map[device.id];
    device.onTimeout && device.onTimeout(device);
  }, config.device.timeout);
}

function update(device) {
  if (!device.id || !devices.map[device.id]) return;
  _.assign(devices.map[device.id], device);

  updateDeviceTimeout(devices.map[device.id]);
}

function create(data, onTimeout) {
  const device = {
    ...data,
    id: devices.counter++,
    onTimeout,
  };

  if (devices.map[device.id]) return create(data, onTimeout);

  devices.map[device.id] = device;

  updateDeviceTimeout(device);

  return device
}

function remove(device) {
  if (device.timeout) clearTimeout(device.timeout);
  delete devices.map[device.id];
}

function list() {
  const paramsPicker = d => _.omit(d, ['timeout', 'onTimeout']);
  return _.values(devices.map).map(paramsPicker);
}

module.exports = {
  update,
  create,
  remove,
  list,
};
