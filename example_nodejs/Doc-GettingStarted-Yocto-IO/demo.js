/*********************************************************************
 *
 *  $Id: demo.js 32717 2018-10-19 15:58:17Z seb $
 *
 *  An example that show how to use a  Yocto-IO
 *
 *  You can find more information on our web site:
 *   Yocto-IO documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-io/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_digitalio.js');

let io, outputdata;

async function startDemo() {
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial = process.argv[process.argv.length - 1];
    if (serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YDigitalIO.FirstDigitalIO();
        if (anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device ' + serial);

    io = YDigitalIO.FindDigitalIO(serial + '.digitalIO');
    // lets configure the channels direction
    // bits 0..1 as output
    // bits 2..3 as input
    await io.set_portDirection(0x03);
    await io.set_portPolarity(0); // polarity set to regular
    await io.set_portOpenDrain(0); // No open drain
    console.log("Channels 0..1 are configured as outputs and channels 2..3");
    console.log("are configred as inputs, you can connect some inputs to");
    console.log("ouputs and see what happens");
    outputdata = 0;
    refresh();
}

async function refresh() {
    if (await io.isOnline()) {
        // cycle ouput 0..3
        outputdata = (outputdata + 1) % 4;
        // We could have used set_bitState as well
        await io.set_portState(outputdata);
        // read port values
        let inputdata = await io.get_portState();
        let line = "";  // display port value as binary
        for (let i = 0; i < 4; i++) {
            if ((inputdata & (8 >> i)) > 0) {
                line = line + '1';
            } else {
                line = line + '0';
            }
        }
        console.log("port value = " + line);
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 1000);
}

startDemo();
