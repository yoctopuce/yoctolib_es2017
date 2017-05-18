"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_anbutton.js');

let input1, input5;

function startDemo()
{
    let errmsg = new YErrorMsg();

    YAPI.LogUnhandledPromiseRejections()
    .then(() => {
        return YAPI.DisableExceptions();
    }).then(() => {
        // Setup the API to use the VirtualHub on local machine
        return YAPI.RegisterHub('127.0.0.1', errmsg);
    }).then((res) => {
        if(res != YAPI.SUCCESS) {
            console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
            process.exit(1);
        }
        // Select specified device, or use first available one
        let serial = process.argv[process.argv.length-1];
        if(serial[8] != '-') {
            // by default use any connected module suitable for the demo
            let anyInput = YAnButton.FirstAnButton();
            if(anyInput) {
                return anyInput.module().then((module) => { return module.get_serialNumber(); });
            } else {
                console.log('No Yocto-Knob connected, check cable');
                process.exit(1);
            }
        }
        return serial;
    }).then((serial) => {
        console.log('Using device '+serial);
        input1 = YAnButton.FindAnButton(serial+'.anButton1');
        input5 = YAnButton.FindAnButton(serial+'.anButton5');

        refresh();
    });
}

function refresh()
{
    input1.isOnline().then((isOnline) => {
        if(isOnline) {
            let line = 'Button 1: ';
            input1.get_isPressed().then((isPressed) => {
                line += (isPressed ? 'pressed' : 'released');
                return input1.get_calibratedValue();
            }).then((value) => {
                line += ' ('+value+')';
                console.log(line);
                line = 'Button 2: ';
                return input5.get_isPressed();
            }).then((isPressed) => {
                line += (isPressed ? 'pressed' : 'released');
                return input5.get_calibratedValue();
            }).then((value) => {
                line += ' ('+value+')';
                console.log(line);
            });
        } else {
            console.log('Module not connected');
        }
    });
    setTimeout(refresh, 500);
}

startDemo();
