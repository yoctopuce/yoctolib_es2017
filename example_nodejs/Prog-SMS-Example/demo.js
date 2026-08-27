/*********************************************************************
 *
 *  $Id: demo.js 58233 2023-12-04 10:57:58Z seb $
 *
 *  An example that shows how to use a  Yocto-RS232
 *
 *  You can find more information on our web site:
 *   Yocto-RS232 documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-rs232/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_messagebox.js');

let mbox;

async function startDemo()
{
    const readline = YAPI._nodeRequire('readline');
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    console.log('Trying to contact VirtualHub on local machine...');
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial = process.argv[process.argv.length-1];
    if (serial[8] != '-') {
        // by default use any connected module suitable for the demo
        mbox = YMessageBox.FirstMessageBox();
        if(mbox === null) {
            console.log('No matching module connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
        serial = await mbox.get_serialNumber();
    }

    // Use first available device
    module = await mbox.module();
    console.log('Using ' + serial + ' (' + (await module.get_productName()) + ')');
    console.log('Messages found on the SIM Card:');

    // show existing messages on the SIM card
    let messages = await mbox.get_messages()
    if(!messages.length) {
        console.log('* No messages found');
    } else {
        for(let sms of messages) {
        console.log('- dated ' + await sms.get_timestamp());
        console.log('  from ' + await sms.get_sender());
        console.log('  "' + await sms.get_textData() + '"');
    }
    }

    // offer to send a new message
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("To test sending SMS, provide message recipient.");
    console.log("To skip sending, leave empty and press Enter.");
    rl.on('line', (number) => {
        if(number) {
            // if that call fails, make sure that your SIM operator
            // allows you to send SMS given your current contract
            mbox.sendTextMessage(number, "Hello from YoctoHub-GSM !")
        }
    });

    console.log('Waiting to receive SMS, press Ctrl-C to quit');
    mbox.registerSmsCallback(smsCallback);
    while(true) {
        await YAPI.Sleep(5000);
    }
}

async function smsCallback(mbox, sms)
{
    console.log('New message dated ' + await sms.get_timestamp());
    console.log('  from ' + await sms.get_sender());
    console.log('  "' + await sms.get_textData() + '"');
    await sms.deleteFromSIM();
}

startDemo();
