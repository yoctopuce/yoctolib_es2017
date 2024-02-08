/*********************************************************************
 *
 *  $Id: demo.js 58172 2023-11-30 17:10:23Z martinm $
 *
 *  An example that shows how to use a  Yocto-Motor-DC
 *
 *  You can find more information on our web site:
 *   Yocto-Motor-DC documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-motor-dc/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_motor.js');
require('yoctolib-es2017/yocto_current.js');
require('yoctolib-es2017/yocto_voltage.js');
require('yoctolib-es2017/yocto_temperature.js');

let motor, current, voltage, temperature;

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
        let anysensor = YMotor.FirstMotor();
        if (anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching Yocto-Motor-DC connected, check cable !');
            return;
        }
    }
    console.log('Using device ' + serial);

    motor = YMotor.FindMotor(serial + ".motor");
    current = YCurrent.FindCurrent(serial + ".current");
    voltage = YVoltage.FindVoltage(serial + ".voltage");
    temperature = YTemperature.FindTemperature(serial + ".temperature");
    //power is a integer between -100 and 100%
    let power = 50;

    // if motor is in error state, reset it.
    if (await motor.get_motorStatus() >= YMotor.MOTORSTATUS_LOVOLT) {
        await motor.resetStatus();
    }
    await motor.drivingForceMove(power, 2000);  // ramp up to power in 2 seconds
    refresh();
}

async function refresh() {
    if (await motor.isOnline()) {
        // display motor status
        console.log("Status=" + await motor.get_advertisedValue() + "  " +
            "Voltage=" + await voltage.get_currentValue() + "V  " +
            "Current=" + await current.get_currentValue() / 1000 + "A  " +
            "Temp=" + await temperature.get_currentValue() + "deg C");
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
