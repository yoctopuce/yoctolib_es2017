/*********************************************************************
 *
 *  $Id: demo.js 32624 2018-10-10 13:23:29Z seb $
 *
 *  An example that show how to use a  Yocto-PWM-Rx
 *
 *  You can find more information on our web site:
 *   Yocto-PWM-Rx documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-pwm-rx/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_pwmoutput.js');

let pwm1, pwm2;

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
        let anyPwm = YPwmInput.FirstPwmInput();
        if(anyPwm) {
            let module = await anyPwm.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    pwm1 = YPwmInput.FindPwmInput(serial + ".pwmInput1");
    pwm2 = YPwmInput.FindPwmInput(serial + ".pwmInput2");

    refresh();
}

async function refresh()
{
    if (await pwm1.isOnline()) {
        console.log("PWM1 : " + (await pwm1.get_frequency()) + "Hz "
                         + (await pwm1.get_dutyCycle()) + "% "
                         + (await pwm1.get_pulseCounter()) +" pulse edges ");
        console.log("PWM2 : " + (await pwm2.get_frequency()) + "Hz "
                         + (await pwm2.get_dutyCycle()) + "% "
                         + (await pwm2.get_pulseCounter()) + " pulse edges ");
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
