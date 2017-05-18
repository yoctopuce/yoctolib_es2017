"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_watchdog.js');

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

    // Select the watchdog to use
    let target;
    if(args[0] == "any") {
        let anyrelay = YWatchdog.FirstWatchdog();
        if (anyrelay == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module = await anyrelay.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    // Enable/disable watchdog as requested
    let watchdog = YWatchdog.FindWatchdog(target + ".watchdog1");
    if(await watchdog.isOnline()) {
        if(args[1] == 'on') await watchdog.set_running(YWatchdog.RUNNING_ON);
        if(args[1] == 'off') await watchdog.set_running(YWatchdog.RUNNING_OFF);
        if(args[1] == 'reset') await watchdog.resetWatchdog();
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 5) {
    console.log("usage: jspm run src/demo.js <serial_number> [ on | off | reset ]");
    console.log("       jspm run src/demo.js <logical_name> [ on | off | reset ]");
    console.log("       jspm run src/demo.js any [ on | off | reset ]           (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

