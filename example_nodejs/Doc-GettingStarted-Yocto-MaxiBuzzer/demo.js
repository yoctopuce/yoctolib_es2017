/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  yocto-MaxiBuzzer
 *
 *  You can find more information on our web site:
 *   yocto-MaxiBuzzer documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maxibuzzer/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_anbutton.js');
require('yoctolib-es2017/yocto_buzzer.js');
require('yoctolib-es2017/yocto_colorled.js');

let buz, led, button1, button2;

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
    led = YColorLed.FindColorLed(serial + ".colorLed");
    button1 = YAnButton.FindAnButton(serial + ".anButton1");
    button2 = YAnButton.FindAnButton(serial + ".anButton2");

    refresh();
}

async function refresh()
{
    if (await buz.isOnline()) {
        let frequency, color, volume;
        let b1 = (await button1.get_isPressed() == YAnButton.ISPRESSED_TRUE);
        let b2 = (await button2.get_isPressed() == YAnButton.ISPRESSED_TRUE);
        if (b1 || b2) {
            if (b1) {
                volume = 60;
                frequency = 1500;
                color = 0xff0000;
            } else {
                volume = 30;
                color = 0x00ff00;
                frequency = 750;
            }
            await led.resetBlinkSeq();
            await led.addRgbMoveToBlinkSeq(color, 100);
            await led.addRgbMoveToBlinkSeq(0, 100);
            await led.startBlinkSeq();
            await buz.set_volume(volume);
            for (let i = 0; i < 5; i++) { // this can be done using sequence as well
                buz.set_frequency(frequency);
                buz.freqMove(2 * frequency, 250);
                await YAPI.Sleep(250);
            }
            await buz.set_frequency(0);
            await led.stopBlinkSeq();
            await led.set_rgbColor(0);
        }
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 250);
}

startDemo();
