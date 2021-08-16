/*********************************************************************
 *
 *  $Id: demo.js 45543 2021-06-14 08:23:46Z web $
 *
 *  An example that show how to use a  Yocto-MaxiKnob
 *
 *  You can find more information on our web site:
 *   Yocto-MaxiKnob documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maxiknob/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

/*********************************************************************
 *
 *  $Id: demo.js 45543 2021-06-14 08:23:46Z web $
 *
 *  An example that show how to use a  Yocto-MaxiBuzzer
 *
 *  You can find more information on our web site:
 *   Yocto-MaxiBuzzer documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maxibuzzer/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_anbutton.js');
require('yoctolib-es2017/yocto_buzzer.js');
require('yoctolib-es2017/yocto_colorledcluster.js');
require('yoctolib-es2017/yocto_quadraturedecoder.js');

let buz, leds, button, qd, lastPos;

function notefreq( note)
{
    return 220.0 * Math.exp(note * Math.log(2) / 12);
}

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
    leds = YColorLedCluster.FindColorLedCluster(serial + ".colorLedCluster");
    button = YAnButton.FindAnButton(serial + ".anButton1");
    qd = YQuadratureDecoder.FindQuadratureDecoder(serial + ".quadratureDecoder1");
    lastPos = parseInt(await  qd.get_currentValue());
    await buz.set_volume(75);
    if  (!await button.isOnline() || !await qd.isOnline()) {
        console.log("Make sure the Yocto-MaxiKnob is configured with at least on AnButton and  one QuadratureDecoder");
        return;
    }
    console.log("press button #1 or turn encoder #1 or hit Ctrl-C");

    refresh();
}

async function refresh()
{
    if (await buz.isOnline()) {
        if (await buz.isOnline()) {
            if (await button.get_isPressed() == YAnButton.ISPRESSED_TRUE) {
                lastPos = 0;
                await qd.set_currentValue(0);
                await buz.playNotes("'E32 C8");
                await leds.set_rgbColor(0, 1, 0x000000);
            } else {
                let p = parseInt(await  qd.get_currentValue());
                if (lastPos != p)
                {
                    lastPos = p;
                    await buz.pulse(notefreq(p), 100);
                    await leds.set_hslColor(0, 1, 0x00FF7f | (p & 0xff ) << 16);
                }
            }
        }
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 10);
}

startDemo();
