"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_relay.js');

async function startDemo(args)
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }
    
    // Select the relay to use
    let target;
    if(args[0] == "any") {
        let anyrelay = YRelay.FirstRelay();   
        if (anyrelay == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module = await anyrelay.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    // Switch relay as requested
    console.log("Set ouput to " + args[1]);
    let relay = YRelay.FindRelay(target + ".relay1");
    if(await relay.isOnline()) {
        await relay.set_output(args[1] == "ON" ? YRelay.OUTPUT_ON : YRelay.OUTPUT_OFF);
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> [ ON | OFF ]");
    console.log("       node demo.js <logical_name> [ ON | OFF ]");
    console.log("       node demo.js any [ ON | OFF ]              (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

