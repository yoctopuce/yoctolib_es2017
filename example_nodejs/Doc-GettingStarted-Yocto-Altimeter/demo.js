"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_altitude.js');
require('yoctolib-es2017/yocto_temperature.js');
require('yoctolib-es2017/yocto_pressure.js');

let alti, temp, pres;

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
        let anysensor = YAltitude.FirstAltitude();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    alti = YAltitude.FindAltitude(serial+".altitude");
    temp = YTemperature.FindTemperature(serial+".temperature");
    pres = YPressure.FindPressure(serial+".pressure");

    refresh();
}

async function refresh()
{
    if (await alti.isOnline()) {
        console.log('Altitude    : '+(await alti.get_currentValue()) + ' m ' +
                    '(QNH = '+(await alti.get_qnh())+' hPa)');
        console.log('Temperature : '+(await temp.get_currentValue()) + ' °C');
        console.log('Pressure    : '+(await pres.get_currentValue()) + ' hPa');
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
