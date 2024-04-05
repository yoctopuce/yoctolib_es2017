/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-RFID-xxx
 *
 *  You can find more information on our web site:
 *  Yocto-RFID-15693 documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-rfid-15693/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_anbutton.js');
require('yoctolib-es2017/yocto_buzzer.js');
require('yoctolib-es2017/yocto_colorledcluster.js');
require('yoctolib-es2017/yocto_rfidreader.js');

let reader, buz, leds, button;
	
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
        reader = YRfidReader.FirstRfidReader();
        if(reader) {
            let module = await reader.module();
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
    await buz.set_volume(75)
    await leds.set_rgbColor(0,1,0x000000)

    console.log("Place a RFID tag near the antenna")

    let tagList = []
    while (tagList.length<=0)
      { tagList = await reader.get_tagIdList()
      }
    let tagId       = tagList[0]
    let opStatus    = new YRfidStatus()
    let options     = new YRfidOptions()
    let taginfo     = await reader.get_tagInfo(tagId,opStatus)
    let blocksize   = taginfo.get_tagBlockSize()
    let  firstBlock = taginfo.get_tagFirstBlock()
    console.log("Tag ID          = "+taginfo.get_tagId())
    console.log("Tag Memory size = "+taginfo.get_tagMemorySize().toString()+" bytes")
    console.log("Tag Block  size = "+taginfo.get_tagBlockSize().toString()+" bytes")

    let data = await reader.tagReadHex(tagId, firstBlock, 3*blocksize, options, opStatus)
    if (opStatus.get_errorCode()==YRfidStatus.SUCCESS)
      { console.log ("First 3 blocks  = "+data)
        await leds.set_rgbColor(0,1,0x00FF00)
        await buz.pulse(1000,100)
      }
    else
     { console.log("Cannot read tag contents ("+opStatus.get_errorMessage()+")")
       await leds.set_rgbColor(0, 1, 0xFF0000)
     }
    await leds.rgb_move(0, 1, 0x000000, 200)
    await YAPI.FreeAPI()
    process.exit()

}



startDemo();
