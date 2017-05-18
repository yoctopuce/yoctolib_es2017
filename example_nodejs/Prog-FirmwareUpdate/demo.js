"use strict";

require('yoctolib-es2017/yocto_api.js');

let power;

async function upgradeSerialList(allserials)
{
    for(let i = 0; i < allserials.length; i++) {
        let serial = allserials[i];
        let module = YModule.FindModule(serial);
        let product = await module.get_productName();
        let current = await module.get_firmwareRelease();

        // check if a new firmware is available on yoctopuce.com
        let newfirm = await module.checkFirmware("www.yoctopuce.com", true);
        if (newfirm == '') {
            console.log(product + ' ' + serial + '(rev=' + current + ') is up to date');
        } else {
            console.log(product + ' ' + serial + '(rev=' + current + ') need be updated with firmware : ');
            console.log('    ' + newfirm);
            // execute the firmware upgrade
            let update = await module.updateFirmware(newfirm);
            let status = update.startUpdate();
            do {
                let newstatus = await update.get_progress();
                if (newstatus != status)
                    console.log(newstatus + '% ' + await update.get_progressMessage());
                await YAPI.Sleep(500);
                status = newstatus;
            } while (status < 100 && status >= 0);
            if (status < 0) {
                console.log('Firmware Update failed: ' + update.get_progressMessage());
                process.exit(1);
            } else {
                if (await module.isOnline()) {
                    console.log(status + '% Firmware Updated Successfully!');
                } else {
                    console.log(status + ' Firmware Update failed: module ' + serial + ' is not online');
                    process.exit(1);
                }
            }
        }
    }
}

async function startDemo()
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();

    // check if last argument is a valid hub IP address
    let lastWord = process.argv[process.argv.length-1];
    if(await YAPI.TestHub(lastWord, 5000) == YAPI.SUCCESS) {
        console.log('Using hub '+lastWord);
        await YAPI.RegisterHub(lastWord, errmsg);
    } else if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    let hubs = [];
    let shields = [];
    let devices = [];
    // first step: construct the list of all hub /shield and devices connected
    let module = YModule.FirstModule();
    while (module != null) {
        let product = await module.get_productName();
        let serial = await module.get_serialNumber();
        if (product.substr(0, 15) == 'YoctoHub-Shield') {
            shields.push(serial);
        } else if (product.substr(0, 8) == 'YoctoHub') {
            hubs.push(serial);
        } else if (product.substr(0, 10) != 'VirtualHub') {
            devices.push(serial);
        }
        module = module.nextModule();
    }
    // first upgrades all Hubs...
    await upgradeSerialList(hubs);
    // ... then all shield..
    await upgradeSerialList(shields);
    // ... and finaly all devices
    await upgradeSerialList(devices);
    console.log('All devices are now up to date');

    await YAPI.FreeAPI();
}

startDemo();
