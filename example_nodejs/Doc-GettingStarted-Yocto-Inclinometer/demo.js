/*********************************************************************
 *
 *  $Id: demo.js 45543 2021-06-14 08:23:46Z web $
 *
 *  An example that show how to use a  Yocto-Inclinometer
 *
 *  You can find more information on our web site:
 *   Yocto-Inclinometer documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-inclinometer/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_tilt.js');

let tilt1, tilt2, tilt3;

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
        let anysensor = YTilt.FirstTilt();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    tilt1   = YTilt.FindTilt(serial + ".tilt1");
    tilt2   = YTilt.FindTilt(serial + ".tilt2");
    tilt3   = YTilt.FindTilt(serial + ".tilt3");
    count = 0;

    refresh();
}

async function refresh()
{
    if (await tilt1.isOnline()) {
        if (count % 10 == 0) {
            console.log("tilt1\ttilt2\tcompass\tacc\tgyro");
        }
        console.log(
            await tilt1.get_currentValue()+"\t"+
            await tilt2.get_currentValue()+"\t"+
            await tilt3.get_currentValue()
        );
        count++;
    } else {
        console.log('Module not connected');
        count = 0;
    }
    setTimeout(refresh, 500);
}

startDemo();
