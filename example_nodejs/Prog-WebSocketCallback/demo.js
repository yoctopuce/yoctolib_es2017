"use strict";

require('yoctolib-es2017/yocto_api.js');

let WebSocketServer = require('ws').Server;

async function WebSocketCallbackHandler(ws)
{
    // Here you can filter the requests by URL if you want
    console.log('Received websocket request');

    // The part below starts the Yoctopuce library in WebSocket Callback mode and interacts
    // with modules connected on the VirtualHub or YoctoHub that made the HTTP request
    let errmsg = new YErrorMsg();
    let yctx = new YAPIContext();
    if(await yctx.RegisterHubWebSocketCallback(ws, errmsg) != YAPI.SUCCESS) {
        console.log('HTTP callback error: '+errmsg);
        yctx.FreeAPI();
        return;
    }

    // Display a list of modules on incoming hub to the Node.js console
    await yctx.UpdateDeviceList(errmsg);
    let module = YModule.FirstModuleInContext(yctx);
    while(module) {
        let msg = (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')';
        console.log(msg);
        module = module.nextModule();
    }
    await yctx.FreeAPI();
}

YAPI.LogUnhandledPromiseRejections();

// Instantiate a simple HTTP server
let wss = new WebSocketServer({ port: 8044 });
wss.on('connection', WebSocketCallbackHandler);

console.log('Node.js WebSocket Callback server running at http://...:8044/');
