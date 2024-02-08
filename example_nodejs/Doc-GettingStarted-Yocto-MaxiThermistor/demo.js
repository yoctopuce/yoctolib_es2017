/*********************************************************************
 *
 *  $Id: demo.js 58172 2023-11-30 17:10:23Z martinm $
 *
 *  An example that shows how to use a  Yocto-MaxiThermistor
 *
 *  You can find more information on our web site:
 *   Yocto-MaxiThermistor documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maxithermistor/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_temperature.js');

let temp1, temp6;

async function startDemo()
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
    let serial = process.argv[process.argv.length-1];
    if(serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YTemperature.FirstTemperature();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    temp1 = YTemperature.FindTemperature(serial+".temperature1");
    temp6 = YTemperature.FindTemperature(serial+".temperature6");

    refresh();
}

async function refresh()
{
    if (await temp1.isOnline()) {
        console.log('Temperature 1 : '+(await temp1.get_currentValue()) + (await temp1.get_unit()));
        console.log('Temperature 6 : '+(await temp6.get_currentValue()) + (await temp6.get_unit()));
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
