/*********************************************************************
 *
 *  $Id: demo.js 32624 2018-10-10 13:23:29Z seb $
 *
 *  An example that show how to use a  Yocto-Buzzer
 *
 *  You can find more information on our web site:
 *   Yocto-Buzzer documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-buzzer/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_anbutton.js');
require('yoctolib-es2017/yocto_buzzer.js');
require('yoctolib-es2017/yocto_led.js');

let buz, led1, led2, button1, button2;

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
        let buzzer = YBuzzer.FirstBuzzer();
        if(buzzer) {
            let module = await buzzer.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    buz = YBuzzer.FindBuzzer(serial + ".buzzer");
    led1 = YLed.FindLed(serial + ".led1");
    led2 = YLed.FindLed(serial + ".led2");
    button1 = YAnButton.FindAnButton(serial + ".anButton1");
    button2 = YAnButton.FindAnButton(serial + ".anButton2");

    refresh();
}

async function refresh()
{
    if (await buz.isOnline()) {
        let frequency;
        let b1 = (await button1.get_isPressed() == YAnButton.ISPRESSED_TRUE);
        let b2 = (await button2.get_isPressed() == YAnButton.ISPRESSED_TRUE);
        if (b1 || b2) {
            let led;
            if (b1) {
                led = led1;
                frequency = 1500;
            } else {
                led = led2;
                frequency = 750;
            }
            await led.set_power(YLed.POWER_ON);
            await led.set_luminosity(100);
            await led.set_blinking(YLed.BLINKING_PANIC);
            for (let i = 0; i < 5; i++) { // this can be done using sequence as well
                buz.set_frequency(frequency);
                buz.freqMove(2 * frequency, 250);
                await YAPI.Sleep(250);
            }
            await buz.set_frequency(0);
            led.set_power(YLed.POWER_OFF);
        }
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
