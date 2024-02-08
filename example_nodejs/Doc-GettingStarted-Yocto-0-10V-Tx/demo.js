/*********************************************************************
 *
 *  $Id: demo.js 58172 2023-11-30 17:10:23Z martinm $
 *
 *  An example that shows how to use a  Yocto-0-10V-Tx
 *
 *  You can find more information on our web site:
 *   Yocto-0-10V-Tx documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-0-10v-tx/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_voltageoutput.js');

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
    
    // Select the module to use
    let target;
    if(args[0] == "any") {
        let anyOut = YVoltageOutput.FirstVoltageOutput();
        if (anyOut == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module = await anyOut.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }
    let voltage = args[1];
    let vout1 = YVoltageOutput.FindVoltageOutput(target+'.voltageOutput1');
    let vout2 = YVoltageOutput.FindVoltageOutput(target+'.voltageOutput2');

    if(await vout1.isOnline()) {
        // output 1 : immediate change
        await vout1.set_outputVoltage(voltage);
        // output 2 : smooth change
        await vout2.voltageMove(voltage,3000);
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> <voltage>");
    console.log("       node demo.js <logical_name>  <voltage>");
    console.log("       node demo.js any <voltage>    (use any discovered device)");
    console.log("       <voltage>: floating point number between 0.0 and 10.000");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

