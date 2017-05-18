"use strict";

require('yoctolib-es2017/yocto_api.js');

let http = require('http');

async function HttpCallbackHandler(message, response) {
    // Here you can filter the requests by URL if you want
    console.log('Received ' + message.method + ' request for ' + message.url);

    // The part below starts the Yoctopuce library in HTTP Callback mode and interacts
    // with modules connected on the VirtualHub or YoctoHub that made the HTTP request
    let errmsg = new YErrorMsg();
    let yctx = new YAPIContext();
    if(await yctx.RegisterHubHttpCallback(message, response, errmsg) != YAPI.SUCCESS) {
        console.log('HTTP callback error: '+errmsg);
        response.write('Error: '+errmsg);
        response.end();
        yctx.FreeAPI();
        return;
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('HTTP callback start<br>\n');

    // Display a list of modules on incoming hub to the Node.js console
    await yctx.UpdateDeviceList(errmsg);
    let module = YModule.FirstModuleInContext(yctx);
    while(module) {
        let msg = (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')';
        console.log(msg);
        response.write(msg+'<br>\n');
        module = module.nextModule();
    }
    yctx.FreeAPI();

    response.write('HTTP callback completed<br>\n');
    response.end();
}

YAPI.LogUnhandledPromiseRejections();

// Instantiate a simple HTTP server
http.createServer(HttpCallbackHandler).listen(8044);

console.log('Node.js HTTP Callback server running at http://...:8044/');
