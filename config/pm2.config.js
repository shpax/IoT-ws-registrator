module.exports = {
  apps: [
    {
      'script': './app.js',
      'name': 'iot-ws-registrator',
      'watch': ['config'],
      'watch -n 5 free -m': '100M'
    }
  ]
};