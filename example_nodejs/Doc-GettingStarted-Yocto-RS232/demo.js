/*********************************************************************
 *
 *  $Id: demo.js 58172 2023-11-30 17:10:23Z martinm $
 *
 *  An example that shows how to use a  Yocto-RS232
 *
 *  You can find more information on our web site:
 *   Yocto-RS232 documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-rs232/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_serialport.js');

let serialPort;

async function startDemo() {
    const readline = YAPI._nodeRequire('readline');
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
        let anysensor = YSerialPort.FirstSerialPort();
        if (anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching module connected, check cable !');
            return;
        }
    }
    console.log('Using device ' + serial);
    serialPort = YSerialPort.FindSerialPort(serial + ".serialPort");

    await serialPort.set_serialMode("9600,8N1");
    await serialPort.set_protocol("Line");
    await serialPort.reset();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log('Type line to send, or Ctrl-C to exit:');
    rl.on('line', (input) => {
        serialPort.writeLine(input);
    });

    refresh();
}

async function refresh() {
    let line;
    if (await serialPort.isOnline()) {
        do {
            line = await serialPort.readLine();
            if (line != "") {
                console.log("Received: " + line);
            }
        } while (line != "");
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();

