"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_display.js');

var disp=null;
var l1, l2;
var centerX,centerY,a,radius;

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
    l1 = await disp.get_displayLayer(1);
    l2 = await disp.get_displayLayer(2);
    centerX = await disp.get_displayWidth() / 2;
    centerY = await disp.get_displayHeight() / 2;
    radius  = await disp.get_displayHeight() / 2;
    a = 0.0;

    // display clean up
    await disp.resetAll();
    await l1.hide();    // L1 is hidden, l2 stay visible
    setTimeout(refresh, 20);
}

// this is the recusive function to draw 1/3nd of the Von Koch flake
async function recursiveLine(layer,  x0,  y0,  x1,  y1 ,   deep)
{

    if (deep<=0)
    {
        await layer.moveTo(parseInt(x0+0.5),parseInt(y0+0.5));
        await layer.lineTo(parseInt(x1+0.5),parseInt(y1+0.5));
    }
    else
    {
        let dx = (x1-x0) /3;
        let dy = (y1-y0) /3;
        let mx =  ((x0+x1) / 2) +  (0.87 *(y1-y0) / 3);
        let my =  ((y0+y1) / 2) -  (0.87 *(x1-x0) / 3);
        await recursiveLine(layer,x0,y0,x0+dx,y0+dy,deep-1);
        await recursiveLine(layer,x0+dx,y0+dy,mx,my,deep-1);
        await recursiveLine(layer,mx,my,x1-dx,y1-dy,deep-1);
        await recursiveLine(layer,x1-dx,y1-dy,x1,y1,deep-1);
    }
}

async function refresh()
{
    // we draw in the hidden layer
    await l1.clear();
    for (let i=0 ;i< 3;i++) {
        await recursiveLine(l1, centerX + radius * Math.cos(a + i * 2.094),
            centerY + radius * Math.sin(a + i * 2.094),
            centerX + radius * Math.cos(a + (i + 1) * 2.094),
            centerY + radius * Math.sin(a + (i + 1) * 2.094), 2);
    }
    // then we swap contents with the visible layer
    await disp.swapLayerContent(1,2);
    // change the flake angle
    a+=0.1257;
    setTimeout(refresh, 5);
}

startDemo();
