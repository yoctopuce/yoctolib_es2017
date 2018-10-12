/*********************************************************************
 *
 *  $Id: demo.js 32624 2018-10-10 13:23:29Z seb $
 *
 *  An example that show how to use a  Yocto-Servo
 *
 *  You can find more information on our web site:
 *   Yocto-Servo documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-servo/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_servo.js');

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
        let anyServo = YServo.FirstServo();
        if (anyServo == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module = await anyServo.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    let servo1 = YServo.FindServo(target+'.servo1');
    let servo5 = YServo.FindServo(target+'.servo5');

    if(await servo1.isOnline()) {
        // Change the color in two different ways
        servo1.set_position(args[1]);   // immediate switch
        servo5.move(args[1],1000);      // smooth transition
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> [ -1000 | ... | 1000 ]");
    console.log("       node demo.js <logical_name> [ -1000 | ... | 1000 ]");
    console.log("       node demo.js any [ -1000 | ... | 1000 ]   (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

