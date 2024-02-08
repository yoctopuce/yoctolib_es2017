/*********************************************************************
 *
 *  $Id: demo.js 58172 2023-11-30 17:10:23Z martinm $
 *
 *  An example that shows how to use a  Yocto-Proximity
 *
 *  You can find more information on our web site:
 *   Yocto-Proximity documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-proximity/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_lightsensor.js');
require('yoctolib-es2017/yocto_proximity.js');

let proximity;
let amb_light;
let ir_light;

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
        let anysensor = YProximity.FirstProximity();
        if (anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device ' + serial + " " + await YAPI.GetAPIVersion());
    proximity = YProximity.FindProximity(serial + ".proximity1");
    amb_light = YLightSensor.FindLightSensor(serial + ".lightSensor1");
    ir_light = YLightSensor.FindLightSensor(serial + ".lightSensor2");

    refresh();
}

async function refresh() {
    if (await proximity.isOnline()) {
        console.log('Proximity: ' + (await proximity.get_currentValue()) +
            " Ambient: " + (await amb_light.get_currentValue()) +
            " IR: " + (await ir_light.get_currentValue())
        );
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
