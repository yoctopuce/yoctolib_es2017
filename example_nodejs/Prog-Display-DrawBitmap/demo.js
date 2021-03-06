"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_display.js');

var disp=null;
var lastSerial ='';
var h=0;
var w=0;
var l0=null;
var max_iteration = 50;
var targetX =  0.834555980181972;
var targetY  = 0.204552998862566;
var bytesPerLines = 0;
var zoom    = 1;
var distance = 1;
var data = [];

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

    // Select specified device, or use first available one
    let serial = process.argv[process.argv.length - 1];
    if (serial[8] !== '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YDisplay.FirstDisplay();
        if (anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device ' + serial);
    disp = YDisplay.FindDisplay(serial + ".display");

    //clean up
    await disp.resetAll();

    // retreive the display size
    w = await disp.get_displayWidth();
    h = await disp.get_displayHeight();

    // reteive the first layer
    l0 = await disp.get_displayLayer(0);
    bytesPerLines = parseInt(w / 8);
    // display clean up
    await disp.resetAll();
    for (let i=0;i<h*bytesPerLines;i++) data[i]=0;
    setTimeout(refresh, 20);
}

async function refresh()
{
    for(let i=0 ; i < data.length; i++) {
        data[i]=0;
    }
    distance = distance *0.95;
    let centerX =  targetX * (1-distance);
    let centerY =  targetY * (1-distance);
    max_iteration = parseInt(0.5+max_iteration  + Math.sqrt(zoom) );
    if (max_iteration>1500)  max_iteration = 1500;
    for (let j=0 ;j< h; j++) {
        for(let i=0 ;i< w; i++) {
            let x0 = (((i - w/2.0) / (w/8))/zoom)-centerX;
            let y0 = (((j - h/2.0) / (w/8))/zoom)-centerY;
            let x = 0;
            let y = 0;

            let iteration = 0;
            while ( (x*x + y*y < 4)  && (iteration < max_iteration ))
            {   let xtemp = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = xtemp;
                iteration += 1;
            }

            if (iteration>=max_iteration) {
                data[j * bytesPerLines + (i >> 3)] |= (128 >> (i & 7));
            }
        }
    }
    await l0.drawBitmap(0,0,w,data,0);
    zoom =zoom / 0.95;
    setTimeout(refresh, 5);
}

startDemo();
