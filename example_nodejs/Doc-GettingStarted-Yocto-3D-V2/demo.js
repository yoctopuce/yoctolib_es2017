"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_tilt.js');
require('yoctolib-es2017/yocto_compass.js');
require('yoctolib-es2017/yocto_gyro.js');
require('yoctolib-es2017/yocto_accelerometer.js');

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
    compass = YCompass.FindCompass(serial + ".compass");
    gyro    = YGyro.FindGyro(serial + ".gyro");
    accelerometer = YAccelerometer.FindAccelerometer(serial+".accelerometer");
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
            tilt1.get_currentValue()+"\t"+
            tilt2.get_currentValue()+"\t"+
            compass.get_currentValue()+"\t"+
            accelerometer.get_currentValue()+"\t"+
            gyro.get_currentValue()
        );
        count++;
    } else {
        console.log('Module not connected');
        count = 0;
    }
    setTimeout(refresh, 500);
}

startDemo();
