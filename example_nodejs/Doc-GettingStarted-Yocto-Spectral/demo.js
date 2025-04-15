/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-Spectral
 *
 *  You can find more information on our web site:
 *   Yocto-Spectral documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-spectral/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

/*********************************************************************
 *
 *  $Id: demo.js 58233 2023-12-04 10:57:58Z seb $
 *
 *  An example that shows how to use a  Yocto-Spectral
 *
 *  You can find more information on our web site:
 *   Yocto-Spectral documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-Spectral/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_colorsensor.js');

async function startDemo(args)
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    let target;
    if(args[1] == "any") {
        let anyColorSensor = YColorSensor.FirstColorSensor();
        if (anyColorSensor == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module = await anyColorSensor.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[1];
    }

    let colorSensor = YColorSensor.FindColorSensor(target+'.colorSensor');

    if(await colorSensor.isOnline()) {

        await colorSensor.set_workingMode(YColorSensor.WORKINGMODE_AUTO);
        await colorSensor.set_estimationModel(YColorSensor.ESTIMATIONMODEL_REFLECTION);
        
        let color = await colorSensor.get_nearSimpleColor();
        let hex =  (await colorSensor.get_estimatedRGB()).toString(16);
        
        console.log("Near color : " + color + "\n");
        console.log("RGB HEX : " + hex + "\n");

    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 3) {
    console.log("usage: node demo.js <serial_number>");
    console.log("       node demo.js <logical_name>");
    console.log("       node demo.js any            (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

