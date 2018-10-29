/*********************************************************************
 *
 *  $Id: demo.js 32714 2018-10-19 15:31:54Z seb $
 *
 *  An example that show how to use a  Yocto-RS485
 *
 *  You can find more information on our web site:
 *   Yocto-RS485 documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-rs485/doc.html
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

"use strict";

require('yoctolib-es2017/yocto_api.js');
require('yoctolib-es2017/yocto_serialport.js');

let serialPort;
let target = {slave: 0, reg: 0};
let g_step = 1;
let rl;
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

    // Select specified device, or use first available one
    let serial = process.argv[process.argv.length - 1];
    if (serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anyserial = YSerialPort.FirstSerialPort();
        if (anyserial) {
            let module = await anyserial.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching module connected, check cable !');
            return;
        }
    }
    console.log('Using device ' + serial);
    serialPort = YSerialPort.FirstSerialPort();
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log('Please enter the MODBUS slave address (1...255)');
    console.log('Slave:');
    rl.on('line', handleInput);
}

async function handleInput(chunk) {
    var val = parseInt(chunk);
    switch (g_step) {
        case 1:
            if (val < 1 || val > 255) {
                console.log("invalid slave number");
            } else {
                target.slave = val;
                g_step++;
                console.log("Slave = " + target.slave);
                console.log("Please select a Coil No (>=1), Input Bit No (>=10001+),");
                console.log("       Register No (>=30001) or Input Register No (>=40001)");
                console.log("No: ");
            }
            break;
        case 2:
            if (val < 1 || val >= 50000 || (val % 10000) == 0) {
                console.log("invalid register number");
            } else {
                target.reg = val;
                await printModbusValue(target.slave, target.reg);
                g_step++;
                console.log("Press ENTER to read again, Q to quit:");
                if ((target.reg % 30000) < 10000) {
                    console.log(" or enter a new value:");
                }
            }
            break;
        case 3:
            if (chunk.charAt(0) == 'q' || chunk.charAt(0) == 'Q') {
                await YAPI.FreeAPI();
                rl.close();
                break;
            }
            if (chunk.charAt(0) != 'r' && chunk.charAt(0) != 'R' && (target.reg % 30000) < 10000) {
                if (target.reg >= 30001) {
                    await serialPort.modbusWriteRegister(target.slave, target.reg - 30001, val);
                } else {
                    await serialPort.modbusWriteBit(target.slave, target.reg - 1, val);
                }
            }
            await printModbusValue(target.slave, target.reg);
            console.log("Press R to read again, Q to quit");
            if ((target.reg % 30000) < 10000) {
                console.log(" or enter a new value");
            }
            console.log(": ");
            break;
        default:
            console.log('data: ' + chunk);
    }
}

async function printModbusValue(slave, reg) {
    var val;
    console.log("reg=" + reg + " slave=" + slave);
    if (reg >= 40001) {
        val = (await serialPort.modbusReadRegisters(slave, reg - 40001, 1))[0];
    } else if (reg >= 30001) {
        val = (await serialPort.modbusReadInputRegisters(slave, reg - 30001, 1))[0];
    } else if (reg >= 10001) {
        val = (await serialPort.modbusReadInputBits(slave, reg - 10001, 1))[0];
    } else {
        val = (await serialPort.modbusReadBits(slave, reg - 1, 1))[0];
    }
    console.log("Current value: " + val);
    return val;
}

startDemo();
