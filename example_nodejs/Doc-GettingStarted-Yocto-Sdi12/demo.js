/*********************************************************************
 *
 *  $Id: demo.js 58172 2023-11-30 17:10:23Z martinm $
 *
 *  An example that shows how to use a  Yocto-SDI12
 *
 *  You can find more information on our web site:
 *   Yocto-RS232 documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-sdi12/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_sdi12port.js');

let sdi12Port;
let singleSensor;

async function startDemo() {
    const readline = YAPI._nodeRequire('readline');
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }

        // by default use any connected module suitable for the demo    //
    let anySdi12 = YSdi12Port.FirstSdi12Port();
    if(anySdi12) {
        let module = await anySdi12.module();
        let target = await module.get_serialNumber();
        console.log('Using device : ' + target);
        sdi12Port = YSdi12Port.FindSdi12Port(target + ".sdi12Port");
    }
    if (await sdi12Port.isOnline()) {
        singleSensor = await sdi12Port.discoverSingleSensor();
        console.log('Sensor address :' + await singleSensor.get_sensorAddress());
        console.log('sensor SDI-12 compatibility : ' + await singleSensor.get_sensorProtocol());
        console.log('Sensor compagny name : ' + await singleSensor.get_sensorVendor());
        console.log('Sensor model number : ' + await singleSensor.get_sensorModel());
        console.log('Sensor version : ' + await singleSensor.get_sensorVersion());
        console.log('Sensor serial number : '+ await singleSensor.get_sensorSerial());
        await YAPI.Sleep(5000, errmsg);
        await refresh();
    }
}

async function refresh() {

    if (await sdi12Port.isOnline()) {
        let sensorVal = await sdi12Port.readSensor(await singleSensor.get_sensorAddress(), 'M', 5000)
        console.clear();
        console.log('Sensor address : ' + await singleSensor.get_sensorAddress());
        for (let i = 0; i < sensorVal.length; i ++)
        {
            if (await singleSensor.get_measureCount() > 1)
            {
                 console.log(await singleSensor.get_measureSymbol(i) + ' ' + sensorVal[i] + ' ' +
                     await singleSensor.get_measureUnit(i) + ' ' + await singleSensor.get_measureDescription(i));
            }
            else
            {
                console.log(sensorVal[i]);
            }
        }
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 5000);

}

startDemo();

