# IoT Device Registrator
```bash
npm i
npm run pm2
```

### Connecting
From any device run
```js
ws = new WebSocket('ws://[localhost:3001]/devices/:deviceType');
```
Any sent packages will be merged to device's object
Suggest using name, ip and port - these are used inside client applications;

### List devices
Get list of devices
```http request
GET http://[localhost:3001]/devices/list/:type?
```