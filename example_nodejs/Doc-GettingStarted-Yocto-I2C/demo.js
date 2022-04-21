/*********************************************************************
 *
 *  $Id: demo.js 48374 2022-01-28 15:44:48Z mvuilleu $
 *
 *  An example that show how to use a  Yocto-I2C
 *
 *  You can find more information on our web site:
 *   Yocto-I2C documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-i2c/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_i2cport.js');

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

    // Select the I2C interface to use
    let target;
    if(args[1] == "any") {
        let anyI2c = YI2cPort.FirstI2cPort();
        if (anyI2c == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module = await anyI2c.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[1];
    }

    let i2cPort = YI2cPort.FindI2cPort(target+'.i2cPort');

    if(await i2cPort.isOnline()) {
        // sample code reading MCP9804 temperature sensor
        await i2cPort.set_i2cMode("100kbps");
        await i2cPort.set_i2cVoltageLevel(YI2cPort.I2CVOLTAGELEVEL_3V3);
        await i2cPort.reset();
        // do not forget to configure the powerOutput of the Yocto-I2C
        // (for MCP9804 powerOutput need to be set at 3.3V)
        console.log("****************************");
        console.log("* make sure voltage levels *");
        console.log("* are properly configured  *");
        console.log("****************************");
        let toSend = [0x05];
        let received = await i2cPort.i2cSendAndReceiveArray(0x1f, toSend, 2);
        let tempReg = (received[0] << 8) + received[1];
        if(tempReg & 0x1000) {
            tempReg -= 0x2000;   // perform sign extension
        } else {
            tempReg &= 0x0fff;   // clear status bits
        }
        console.log("Ambiant temperature: " + (tempReg / 16.0).toString());
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 3) {
    console.log("usage: node demo.js <serial_number>");
    console.log("       node demo.js <logical_name>");
    console.log("       node demo.js any            (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

