"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_currentloopoutput.js');

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

    // Select specified device, or use first available one
    let target;
    if(args[0] == 'any') {
        // by default use any connected module suitable for the demo
        let anysensor = YCurrentLoopOutput.FirstCurrentLoopOutput();
        if(anysensor) {
            let module = await anysensor.module();
            target = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    } else {
        target = args[0];
    }
    console.log('Using device '+target);
    let value = args[1];
    let loop = YCurrentLoopOutput.FindCurrentLoopOutput(target + ".currentLoopOutput");
    if (await loop.isOnline()) {
        await loop.set_current(value);
        switch (await loop.get_loopPower()) {
            case YCurrentLoopOutput.LOOPPOWER_POWEROK:
                console.log('Loop is powered');
                break;
            case YCurrentLoopOutput.LOOPPOWER_LOWPWR:
                console.log('Insufficient loop Voltage');
                break;
            default:
                console.log('Loop is not powered');
                break;
        }
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }
    await YAPI.FreeAPI();
}

if(process.argv.length < 5) {
    console.log("usage: jspm run src/demo.js <serial_number> <current>");
    console.log("       jspm run src/demo.js <logical_name>  <current>");
    console.log("       jspm run src/demo.js any <current>              (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}
