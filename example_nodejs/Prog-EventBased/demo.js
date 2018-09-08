"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_anbutton.js');

async function valueChangeCallBack(obj_fct, str_value)
{
    // the field to update is stored in the function userData
    let info = await obj_fct.get_userData();
    console.log(info.name + ': ' + str_value+' '+info.unit+' (new value)');
}

async function timedReportCallBack(obj_fct, obj_measure)
{
    // the field to update is stored in the function userData
    let info = await obj_fct.get_userData();
    console.log(info.name + ': ' + obj_measure.get_averageValue()+' '+info.unit+' (timed report)');
}

async function configChangeCallBack(module)
{
    // the field to update is stored in the function userData
    let serial = await module.get_serialNumber();
    let time = new Date();
    console.log(serial+': configuration change');
}

async function deviceArrival(module)
{
    let serial = await module.get_serialNumber();
    console.log('Device arrival: '+serial);
    await module.registerConfigChangeCallback(configChangeCallBack);

    // First solution: look for a specific type of function (eg. anButton)
    let fctcount = await module.functionCount();
    for (let i = 0; i < fctcount; i++)
    {
        let hardwareId = serial + "." + await module.functionId(i);
        if (hardwareId.indexOf(".anButton") > 0) {
            let anButton = YAnButton.FindAnButton(hardwareId);
            await anButton.set_userData({name:hardwareId,unit:''});
            await anButton.registerValueCallback(valueChangeCallBack);
        }
    }

    // Alternate solution: register any kind of sensor on the device
    let sensor = YSensor.FirstSensor();
    while(sensor) {
        let module = await sensor.get_module();
        if(await module.get_serialNumber() === serial) {
            let hardwareId = await sensor.get_hardwareId();
            await sensor.set_userData({name:hardwareId,unit:await sensor.get_unit()});
            await sensor.registerValueCallback(valueChangeCallBack);
            await sensor.registerTimedReportCallback(timedReportCallBack);
        }
        sensor = sensor.nextSensor();
    }
}

async function deviceRemoval(module)
{
    let serial = await module.get_serialNumber();
    console.log('Device removal: '+serial);
}

function handleHotPlug()
{
    YAPI.SetTimeout(handleHotPlug,1000);
}

async function startDemo()
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) !== YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }

    await YAPI.RegisterDeviceArrivalCallback(deviceArrival);
    await YAPI.RegisterDeviceRemovalCallback(deviceRemoval);
    handleHotPlug()
}

startDemo();
