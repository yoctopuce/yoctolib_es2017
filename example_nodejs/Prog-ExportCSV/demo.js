"use strict";

require('yoctolib-es2017/yocto_api.js');

async function startDemo() {
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1');
        return;
    }

    // Enumerate all connected sensors
    let sensorList = [];
    let sensor;
    sensor = YSensor.FirstSensor();
    while(sensor) {
        sensorList.push(sensor);
        sensor = sensor.nextSensor();
    }
    if (sensorList.length == 0) {
        console.log('No matching sensor connected, check cable !');
        return;
    }
    
    // Generate consolidated CSV output for all sensors
    let data = new YConsolidatedDataSet(0, 0, sensorList);
    let record = [];
    while(await data.nextRecord(record) < 100) {
        let line = new Date(1000*record[0]).toISOString();
        for(let idx = 1; idx < record.length; idx++) {
            line += ";" + record[idx];            
        }
        console.log(line);
    }
    await YAPI.FreeAPI();
}

startDemo();
