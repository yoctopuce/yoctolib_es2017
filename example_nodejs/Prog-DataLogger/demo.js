"use strict";

require('yoctolib-es2017/yocto_api.js');

async function dumpSensor(sensor) {
    console.log("Using DataLogger of " + await sensor.get_friendlyName());
    let dataset = await sensor.get_recordedData(0, 0);
    console.log("loading summary... ");
    await dataset.loadMore();
    let summary = await dataset.get_summary();
    let line = "from " + await summary.get_startTimeUTC_asDate() + " to " + await summary.get_endTimeUTC_asDate() +
        " : min=" + await summary.get_minValue() + " avg=" + await summary.get_averageValue() +
        "  max=" + await summary.get_maxValue();
    console.log(line);
    let progress = 0;
    do {
        progress = await dataset.loadMore();
        process.stdout.write("loading details " + progress + "%\r");
    } while (progress < 100);
    console.log("");
    let details = await dataset.get_measures();
    for (let i = 0; i < details.length; i++) {
        let measure = details[i];
        let line = "from " + await measure.get_startTimeUTC_asDate() + " to " + await measure.get_endTimeUTC_asDate() +
            " : min=" + await measure.get_minValue() + " avg=" + await measure.get_averageValue() +
            "  max=" + await measure.get_maxValue();
        console.log(line);
    }
}
async function startDemo() {
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1');
        return;
    }

    let sensor;
    // Select specified device, or use first available one
    let serial = process.argv[process.argv.length - 1];
    if (serial[8] == '-') {
        sensor = YSensor.FindSensor(serial);
    } else {
        // by default use any connected module suitable for the demo
        sensor = YSensor.FirstSensor();
        if (!sensor) {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    await dumpSensor(sensor);
    await YAPI.FreeAPI();
}

startDemo();
