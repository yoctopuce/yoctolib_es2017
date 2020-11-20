/*********************************************************************
 *
 * $Id: system_env.js 41769 2020-09-03 17:34:23Z mvuilleu $
 *
 * High-level programming interface, common to all modules
 *
 * - - - - - - - - - License information: - - - - - - - - -
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate http
 *  file into your software for the sole purpose of interfacing
 *  with Yoctopuce products.
 *
 *  You may reproduce and distribute copies of this file in
 *  source or object form, as long as the sole purpose of this
 *  code is to interface with Yoctopuce products. You must retain
 *  this notice in the distributed source file.
 *
 *  You should refer to Yoctopuce General Terms and Conditions
 *  for additional information regarding your rights and
 *  obligations.
 *
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
 *  WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
 *  WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS
 *  FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
 *  EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
 *  INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA,
 *  COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR
 *  SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT
 *  LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
 *  CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
 *  BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
 *  WARRANTY, OR OTHERWISE.
 *
 *********************************************************************/

import fs from 'node:fs';
import http from 'node:http';
import ws from 'ws';
import { createRequire } from 'module';

export const isNodeJS = true;
export const require = createRequire(import.meta.url);

export const WebSocket = ws;

export { randomFillSync as getRandomValues } from 'node:crypto';

export function hookUnhandledRejection(handler)
{
    process.on('unhandledRejection', (reason, p) => {
        handler(reason, p);
    });
}

export async function loadfile(file)
{
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(new Uint8Array(data));
            }
        });
    });
}

export async function downloadfile(path)
{
    return new Promise((resolve, reject) => {
        http.get(path, (res) => {
            if(res.statusCode != 200 && res.statusCode != 304) {
                if(res.statusCode) {
                    reject(new Error('HTTP error ' + res.statusCode));
                } else {
                    reject(new Error('Unable to complete HTTP request, network down?'))
                }
            } else {
                let response = new Buffer.alloc(0);
                res.on('data', (chunk) => {
                    response = Buffer.concat([response,chunk]);
                });
                res.on('end', () => {
                    resolve(new Uint8Array(response));
                })
            }
        }).on('error', (e) => {
            reject(new Error('HTTP error: '+ e.message));
        });
    });
}
