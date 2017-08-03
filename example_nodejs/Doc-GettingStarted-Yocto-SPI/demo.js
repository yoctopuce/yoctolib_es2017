"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_spiport.js');

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

    // Select the SPI interface to use
    let target;
    if(args[0] == "any") {
        let anySpi = YSpiPort.FirstSpiPort();
        if (anySpi == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module = await anySpi.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }
    let value = parseInt(args[1]);

    let spiPort = YSpiPort.FindSpiPort(target+'.spiPort');

    if(await spiPort.isOnline()) {
        // sample code driving MAX7219 7-segment display driver
        // such as SPI7SEGDISP8.56 from www.embedded-lab.com
        await spiPort.set_spiMode("250000,3,msb");
        await spiPort.set_ssPolarity(YSpiPort.SSPOLARITY_ACTIVE_LOW);
        await spiPort.set_protocol("Frame:5ms");
        await spiPort.reset();
        console.log("****************************");
        console.log("* make sure voltage levels *");
        console.log("* are properly configured  *");
        console.log("****************************");
        // initialize MAX7219
        await spiPort.writeHex('0c01'); // Exit from shutdown state
        await spiPort.writeHex('09ff'); // Enable BCD for all digits
        await spiPort.writeHex('0b07'); // Enable digits 0-7 (=8 in total)
        await spiPort.writeHex('0a0a'); // Set medium brightness
        for(let i = 1; i <= 8; i++) {
            let digit = value % 10;
            await spiPort.writeArray([i, digit]);
            value = parseInt(value / 10);
        }
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> <value>");
    console.log("       node demo.js <logical_name>  <value>");
    console.log("       node demo.js any <value>    (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

