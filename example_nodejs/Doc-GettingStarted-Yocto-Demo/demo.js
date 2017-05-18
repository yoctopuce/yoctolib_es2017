"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_led.js');

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
        let anyLed = YLed.FirstLed();
        if (anyLed == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module = await anyLed.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    // Switch relay as requested
    console.log("Turn LED " + args[1]);
    let led = YLed.FindLed(target + ".led");
    if(await led.isOnline()) {
        await led.set_power(args[1] == "ON" ? YLed.POWER_ON : YLed.POWER_OFF);
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 5) {
    console.log("usage: jspm run src/demo.js <serial_number> [ ON | OFF ]");
    console.log("       jspm run src/demo.js <logical_name> [ ON | OFF ]");
    console.log("       jspm run src/demo.js any [ ON | OFF ]              (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

