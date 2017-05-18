"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_anbutton.js');

let input1, input5;

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
        let anyInput = YAnButton.FirstAnButton();
        if(anyInput) {
            let module = await anyInput.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No Yocto-Knob connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    input1 = YAnButton.FindAnButton(serial+'.anButton1');
    input5 = YAnButton.FindAnButton(serial+'.anButton5');

    refresh();
}

async function refresh()
{
    if (await input1.isOnline()) {
        let line = 'Button 1: ';
        line += (await input1.get_isPressed() ? 'pressed' : 'released');
        line += ' ('+(await input1.get_calibratedValue())+')';
        console.log(line);
        line = 'Button 5: ';
        line += (await input5.get_isPressed() ? 'pressed' : 'released');
        line += ' ('+(await input5.get_calibratedValue())+')';
        console.log(line);
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
