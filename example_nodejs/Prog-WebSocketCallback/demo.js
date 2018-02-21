"use strict";

require('yoctolib-es2017/yocto_api.js');

YAPI.LogUnhandledPromiseRejections();

var Data = [];

async function sensorCallback(sensor, measure)
{
  Data.push({
    "name" : await sensor.get_hardwareId(),
    "time" : await measure.get_endTimeUTC(),
    "value" : await measure.get_averageValue()
  });
}

async function HttpCallbackHandler(request, response)
{
  // HTTP requests from the web browsers land here
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('time;sensor;value<br>\n');
  for(let i = 0; i < Data.length; i++) {
    response.write(Data[i].time + ";" +
      Data[i].name + ";" +
      Data[i].value + "<br>\n");
  }
  response.end();
}

async function WebSocketCallbackHandler(ws)
{
  // WebSocket connections from the YoctoHubs land here
  console.log('Incoming WebSocket connection!');
  let errmsg = new YErrorMsg();
  let yctx = new YAPIContext();
  if(await yctx.RegisterHubWebSocketCallback(ws, errmsg, 'MY-WEBSOCKET-PASSWORD!') != YAPI.SUCCESS) {
    console.log('WebSocket callback error: ' + errmsg);
    yctx.FreeAPI();
    return;
  }
  try {
    await yctx.UpdateDeviceList(errmsg);
    let sensor = YSensor.FirstSensorInContext(yctx);
    while(sensor != null) {
      console.log('Sensor: ' + (await sensor.get_hardwareId()));
      await sensor.set_reportFrequency("6/m");
      await sensor.registerTimedReportCallback(sensorCallback);
      sensor = sensor.nextSensor()
    }
    while(ws.readyState != ws.CLOSED) {
      await yctx.Sleep(1000, errmsg);
    }
  } catch(e) {
    console.log('Exception in WebSocket handler:');
    console.log(e);
  }
  console.log('Websocket disconnected');
  await yctx.FreeAPI();
}

// We create an HTTP server...
let http = require('http');
http.createServer(HttpCallbackHandler).listen(8080);

// ... and we create a WebSocket server
let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port: 8044 });
wss.on('connection', WebSocketCallbackHandler);

console.log('Node.js Web HTTP server running on http://...:8080/');
console.log('Node.js Websocket server running on http://...:8044/');
