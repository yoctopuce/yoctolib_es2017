/*********************************************************************
 *
 * $Id: yocto_api.js 35703 2019-06-06 12:42:47Z mvuilleu $
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
'use strict';

if(typeof YoctoLibExport === 'undefined') {
  let YoctoLibExport = function(symbol, definition) {
    if(typeof window === 'undefined') {
      // Node.js
      global[symbol] = definition;
    } else {
      // Within browser
      window[symbol] = definition;
    }
  };
  YoctoLibExport('YoctoLibExport', YoctoLibExport);
}
if(typeof YoctoLibGlobal === 'undefined') {
  let YoctoLibGlobal = function(symbol) {
    if(typeof window === 'undefined') {
      // Node.js
      return global[symbol];
    } else {
      // Within browser
      return window[symbol];
    }
  };
  YoctoLibExport('YoctoLibGlobal', YoctoLibGlobal);
}

//--- (generated code: YFunction definitions)
// Yoctopuce error codes, also used by default as function return value
const YAPI_SUCCESS                    = 0;       // everything worked all right
const YAPI_NOT_INITIALIZED            = -1;      // call yInitAPI() first !
const YAPI_INVALID_ARGUMENT           = -2;      // one of the arguments passed to the function is invalid
const YAPI_NOT_SUPPORTED              = -3;      // the operation attempted is (currently) not supported
const YAPI_DEVICE_NOT_FOUND           = -4;      // the requested device is not reachable
const YAPI_VERSION_MISMATCH           = -5;      // the device firmware is incompatible with this API version
const YAPI_DEVICE_BUSY                = -6;      // the device is busy with another task and cannot answer
const YAPI_TIMEOUT                    = -7;      // the device took too long to provide an answer
const YAPI_IO_ERROR                   = -8;      // there was an I/O problem while talking to the device
const YAPI_NO_MORE_DATA               = -9;      // there is no more data to read from
const YAPI_EXHAUSTED                  = -10;     // you have run out of a limited resource, check the documentation
const YAPI_DOUBLE_ACCES               = -11;     // you have two process that try to access to the same device
const YAPI_UNAUTHORIZED               = -12;     // unauthorized access to password-protected device
const YAPI_RTC_NOT_READY              = -13;     // real-time clock has not been initialized (or time was lost)
const YAPI_FILE_NOT_FOUND             = -14;     // the file is not found

const YAPI_INVALID_INT                = 0x7fffffff;
const YAPI_INVALID_UINT               = -1;
const YAPI_INVALID_LONG               = 0x7fffffffffffffff;
const YAPI_INVALID_DOUBLE             = -Number.MAX_VALUE;
const YAPI_INVALID_STRING             = '!INVALID!';
//--- (end of generated code: YFunction definitions)
const YAPI_MIN_DOUBLE                 = -Number.MAX_VALUE; 
const YAPI_MAX_DOUBLE                 = Number.MAX_VALUE;

//--- (generated code: YModule definitions)
//--- (end of generated code: YModule definitions)

//--- (generated code: YSensor definitions)
//--- (end of generated code: YSensor definitions)

// yInitAPI constants (not really useful in Javascript, but defined for code portability)
const Y_DETECT_NONE          = 0;
const Y_DETECT_USB           = 1;
const Y_DETECT_NET           = 2;
const Y_DETECT_ALL           = (Y_DETECT_USB | Y_DETECT_NET);

// calibration types
const YOCTO_CALIB_TYPE_OFS          = 30;

const NOTIFY_NETPKT_NAME = '0';
const NOTIFY_NETPKT_CHILD = '2';
const NOTIFY_NETPKT_FUNCNAME = '4';
const NOTIFY_NETPKT_FUNCVAL = '5';
const NOTIFY_NETPKT_LOG = '7';
const NOTIFY_NETPKT_FUNCNAMEYDX = '8';
const NOTIFY_NETPKT_CONFCHGYDX = 's';
const NOTIFY_NETPKT_FLUSHV2YDX = 't';
const NOTIFY_NETPKT_FUNCV2YDX = 'u';
const NOTIFY_NETPKT_TIMEV2YDX = 'v';
const NOTIFY_NETPKT_DEVLOGYDX = 'w';
const NOTIFY_NETPKT_TIMEVALYDX = 'x';
const NOTIFY_NETPKT_FUNCVALYDX = 'y';
const NOTIFY_NETPKT_TIMEAVGYDX = 'z';
const NOTIFY_NETPKT_NOT_SYNC = '@';
const NOTIFY_NETPKT_STOP = 10;      // =\n

const NOTIFY_V2_LEGACY = 0;         // unused (reserved for compatibility with legacy notifications)
const NOTIFY_V2_6RAWBYTES = 1;      // largest type: data is always 6 bytes
const NOTIFY_V2_TYPEDDATA = 2;      // other types: first data byte holds the decoding format
const NOTIFY_V2_FLUSHGROUP = 3;     // no data associated

const PUBVAL_LEGACY = 0;            // 0-6 ASCII characters (normally sent as YSTREAM_NOTICE)
const PUBVAL_1RAWBYTE = 1;          // 1 raw byte  (=2 characters)
const PUBVAL_2RAWBYTES = 2;         // 2 raw bytes (=4 characters)
const PUBVAL_3RAWBYTES = 3;         // 3 raw bytes (=6 characters)
const PUBVAL_4RAWBYTES = 4;         // 4 raw bytes (=8 characters)
const PUBVAL_5RAWBYTES = 5;         // 5 raw bytes (=10 characters)
const PUBVAL_6RAWBYTES = 6;         // 6 hex bytes (=12 characters) (sent as V2_6RAWBYTES)
const PUBVAL_C_LONG = 7;            // 32-bit C signed integer
const PUBVAL_C_FLOAT = 8;           // 32-bit C float
const PUBVAL_YOCTO_FLOAT_E3 = 9;    // 32-bit Yocto fixed-point format (e-3)
const PUBVAL_YOCTO_FLOAT_E6 = 10;   // 32-bit Yocto fixed-point format (e-6)

const YOCTO_PUBVAL_LEN = 16;
const YOCTO_PUBVAL_SIZE = 6;
const YOCTO_HASH_BUF_SIZE = 28;

const YOCTO_BASETYPE_FUNCTION = 0;
const YOCTO_BASETYPE_SENSOR = 1;

const Y_BASETYPES = {Function: YOCTO_BASETYPE_FUNCTION, Sensor: YOCTO_BASETYPE_SENSOR};

class YErrorMsg
{
    constructor(str_msg)
    {
        if(!str_msg) str_msg='';
        this.msg = str_msg;
    }
}

YoctoLibExport('YErrorMsg', YErrorMsg);

/**
 * MD5 hash computation code
 *
 * This code is derived from the MD5 implementation from Sergey Lyubka, author of SHTTPD.
 * Any other implementation would do as well, but we chose to translate this one to JS.
 * This code has been published by Sergey under his "THE BEER-WARE LICENSE" (Revision 42):
 *
 *   Sergey Lyubka wrote this software. As long as you retain this notice you
 *   can do whatever you want with this stuff. If we meet some day, and you think
 *   this stuff is worth it, you can buy me a beer in return.
 *
 */
class Y_MD5Ctx
{
    constructor()
    {
        this.buf = new Uint32Array(4);
        this.bits = new Uint32Array(2);
        this.inBuf = new ArrayBuffer(64);
        this.in8 = new Uint8Array(this.inBuf);
        this.in32 = new Uint32Array(this.inBuf);
        this.in32[0] = 1;
        this.bigEndian = (this.in8[0] != 1);

        this.buf[0] = 0x67452301 >>> 0;
        this.buf[1] = 0xefcdab89 >>> 0;
        this.buf[2] = 0x98badcfe >>> 0;
        this.buf[3] = 0x10325476 >>> 0;
        this.bits[0] = 0;
        this.bits[1] = 0;
    }

    _byteReverseIn()
    {
        for(let i = 0; i < 16; i++) {
            let a = this.in32[i];
            this.in32[i] = ((a>>>24) | ((a&0xff)<<24) | ((a&0xff0000)>>>8) | ((a&0xff00)<<8)) >>> 0;
        }
    }

    _transform()
    {
        let F1 = ((x, y, z) => ((z ^ (x & (y ^ z)))) >>> 0);
        let F2 = ((x, y, z) => F1(z, x, y));
        let F3 = ((x, y, z) => ((x ^ y ^ z)) >>> 0);
        let F4 = ((x, y, z) => ((y ^ (x | ~z))) >>> 0);
        let MD5STEP = ((f, w, x, y, z, data, s) => {
            w = (w + f(x, y, z) + (data >>> 0))  >>> 0;
            w = (((w << s) >>> 0) | (w >>> (32 - s))) >>> 0;
            return (w + x)  >>> 0;
        });
        let a = this.buf[0];
        let b = this.buf[1];
        let c = this.buf[2];
        let d = this.buf[3];
        let dataIn = this.in32;

        a = MD5STEP(F1, a, b, c, d, dataIn[0] + 0xd76aa478, 7);
        d = MD5STEP(F1, d, a, b, c, dataIn[1] + 0xe8c7b756, 12);
        c = MD5STEP(F1, c, d, a, b, dataIn[2] + 0x242070db, 17);
        b = MD5STEP(F1, b, c, d, a, dataIn[3] + 0xc1bdceee, 22);
        a = MD5STEP(F1, a, b, c, d, dataIn[4] + 0xf57c0faf, 7);
        d = MD5STEP(F1, d, a, b, c, dataIn[5] + 0x4787c62a, 12);
        c = MD5STEP(F1, c, d, a, b, dataIn[6] + 0xa8304613, 17);
        b = MD5STEP(F1, b, c, d, a, dataIn[7] + 0xfd469501, 22);
        a = MD5STEP(F1, a, b, c, d, dataIn[8] + 0x698098d8, 7);
        d = MD5STEP(F1, d, a, b, c, dataIn[9] + 0x8b44f7af, 12);
        c = MD5STEP(F1, c, d, a, b, dataIn[10] + 0xffff5bb1, 17);
        b = MD5STEP(F1, b, c, d, a, dataIn[11] + 0x895cd7be, 22);
        a = MD5STEP(F1, a, b, c, d, dataIn[12] + 0x6b901122, 7);
        d = MD5STEP(F1, d, a, b, c, dataIn[13] + 0xfd987193, 12);
        c = MD5STEP(F1, c, d, a, b, dataIn[14] + 0xa679438e, 17);
        b = MD5STEP(F1, b, c, d, a, dataIn[15] + 0x49b40821, 22);

        a = MD5STEP(F2, a, b, c, d, dataIn[1] + 0xf61e2562, 5);
        d = MD5STEP(F2, d, a, b, c, dataIn[6] + 0xc040b340, 9);
        c = MD5STEP(F2, c, d, a, b, dataIn[11] + 0x265e5a51, 14);
        b = MD5STEP(F2, b, c, d, a, dataIn[0] + 0xe9b6c7aa, 20);
        a = MD5STEP(F2, a, b, c, d, dataIn[5] + 0xd62f105d, 5);
        d = MD5STEP(F2, d, a, b, c, dataIn[10] + 0x02441453, 9);
        c = MD5STEP(F2, c, d, a, b, dataIn[15] + 0xd8a1e681, 14);
        b = MD5STEP(F2, b, c, d, a, dataIn[4] + 0xe7d3fbc8, 20);
        a = MD5STEP(F2, a, b, c, d, dataIn[9] + 0x21e1cde6, 5);
        d = MD5STEP(F2, d, a, b, c, dataIn[14] + 0xc33707d6, 9);
        c = MD5STEP(F2, c, d, a, b, dataIn[3] + 0xf4d50d87, 14);
        b = MD5STEP(F2, b, c, d, a, dataIn[8] + 0x455a14ed, 20);
        a = MD5STEP(F2, a, b, c, d, dataIn[13] + 0xa9e3e905, 5);
        d = MD5STEP(F2, d, a, b, c, dataIn[2] + 0xfcefa3f8, 9);
        c = MD5STEP(F2, c, d, a, b, dataIn[7] + 0x676f02d9, 14);
        b = MD5STEP(F2, b, c, d, a, dataIn[12] + 0x8d2a4c8a, 20);

        a = MD5STEP(F3, a, b, c, d, dataIn[5] + 0xfffa3942, 4);
        d = MD5STEP(F3, d, a, b, c, dataIn[8] + 0x8771f681, 11);
        c = MD5STEP(F3, c, d, a, b, dataIn[11] + 0x6d9d6122, 16);
        b = MD5STEP(F3, b, c, d, a, dataIn[14] + 0xfde5380c, 23);
        a = MD5STEP(F3, a, b, c, d, dataIn[1] + 0xa4beea44, 4);
        d = MD5STEP(F3, d, a, b, c, dataIn[4] + 0x4bdecfa9, 11);
        c = MD5STEP(F3, c, d, a, b, dataIn[7] + 0xf6bb4b60, 16);
        b = MD5STEP(F3, b, c, d, a, dataIn[10] + 0xbebfbc70, 23);
        a = MD5STEP(F3, a, b, c, d, dataIn[13] + 0x289b7ec6, 4);
        d = MD5STEP(F3, d, a, b, c, dataIn[0] + 0xeaa127fa, 11);
        c = MD5STEP(F3, c, d, a, b, dataIn[3] + 0xd4ef3085, 16);
        b = MD5STEP(F3, b, c, d, a, dataIn[6] + 0x04881d05, 23);
        a = MD5STEP(F3, a, b, c, d, dataIn[9] + 0xd9d4d039, 4);
        d = MD5STEP(F3, d, a, b, c, dataIn[12] + 0xe6db99e5, 11);
        c = MD5STEP(F3, c, d, a, b, dataIn[15] + 0x1fa27cf8, 16);
        b = MD5STEP(F3, b, c, d, a, dataIn[2] + 0xc4ac5665, 23);

        a = MD5STEP(F4, a, b, c, d, dataIn[0] + 0xf4292244, 6);
        d = MD5STEP(F4, d, a, b, c, dataIn[7] + 0x432aff97, 10);
        c = MD5STEP(F4, c, d, a, b, dataIn[14] + 0xab9423a7, 15);
        b = MD5STEP(F4, b, c, d, a, dataIn[5] + 0xfc93a039, 21);
        a = MD5STEP(F4, a, b, c, d, dataIn[12] + 0x655b59c3, 6);
        d = MD5STEP(F4, d, a, b, c, dataIn[3] + 0x8f0ccc92, 10);
        c = MD5STEP(F4, c, d, a, b, dataIn[10] + 0xffeff47d, 15);
        b = MD5STEP(F4, b, c, d, a, dataIn[1] + 0x85845dd1, 21);
        a = MD5STEP(F4, a, b, c, d, dataIn[8] + 0x6fa87e4f, 6);
        d = MD5STEP(F4, d, a, b, c, dataIn[15] + 0xfe2ce6e0, 10);
        c = MD5STEP(F4, c, d, a, b, dataIn[6] + 0xa3014314, 15);
        b = MD5STEP(F4, b, c, d, a, dataIn[13] + 0x4e0811a1, 21);
        a = MD5STEP(F4, a, b, c, d, dataIn[4] + 0xf7537e82, 6);
        d = MD5STEP(F4, d, a, b, c, dataIn[11] + 0xbd3af235, 10);
        c = MD5STEP(F4, c, d, a, b, dataIn[2] + 0x2ad7d2bb, 15);
        b = MD5STEP(F4, b, c, d, a, dataIn[9] + 0xeb86d391, 21);

        this.buf[0] = ((this.buf[0] + a) & 0xffffffff) >>> 0;
        this.buf[1] = ((this.buf[1] + b) & 0xffffffff) >>> 0;
        this.buf[2] = ((this.buf[2] + c) & 0xffffffff) >>> 0;
        this.buf[3] = ((this.buf[3] + d) & 0xffffffff) >>> 0;
    }

    addData(buf)
    {
        let len = buf.length;
        let pos = 0;
        let t = this.bits[0];
        this.bits[0] = (t + (len << 3))>>> 0;
        if(this.bits[0] < t) {
            this.bits[1]++;
        }
        this.bits[1] += len >>> 29;
        t = (t >>> 3) & 0x3f;
        while(pos < len) {
            while(pos < len && t < 64) {
                this.in8[t++] = buf[pos++];
            }
            if(t < 64) return;
            if(this.bigEndian) this._byteReverseIn();
            this._transform();
            t = 0;
        }
    }

    calculate()
    {
        let t = (this.bits[0] >>> 3) & 0x3f;
        this.in8[t++] = 0x80;
        if(t > 56) {
            while(t < 64) {
                this.in8[t++] = 0;
            }
            if(this.bigEndian) this._byteReverseIn();
            this._transform();
            for(t = 0; t < 14; t++) {
                this.in32[t] = 0;
            }
        } else {
            while(t < 56) {
                this.in8[t++] = 0;
            }
            if(this.bigEndian) this._byteReverseIn();
        }
        this.in32[14] = this.bits[0];
        this.in32[15] = this.bits[1];
        this._transform();
        let res = new Uint8Array(16);
        for(t = 0; t < 16; t++) {
            res[t] = (this.buf[t>>>2] >>> (8*(t&3))) & 0xff;
        }
        return res;
    }
}


//
// YFunctionType Class (used internally)
//
// Instances of this class stores everything we know about a given type of function:
// Mapping between function logical names and Hardware ID as discovered on hubs,
// and existing instances of YFunction (either already connected or simply requested).
// To keep it simple, this implementation separates completely the name resolution
// mechanism, implemented using the yellow pages, and the storage and retrieval of
// existing YFunction instances.
//
class YFunctionType
{
    constructor(obj_yapi, str_classname)
    {
        // private
        /** @member {YAPIContext} **/
        this._yapi          = obj_yapi;
        /** @member {string} **/
        this._className     = str_classname;
        /** @member {Object} **/
        this._connectedFns  = {};           // functions requested and available, by Hardware Id
        /** @member {Object} **/
        this._requestedFns  = {};           // functions requested but not yet known, by any type of name
        /** @member {Object} **/
        this._hwIdByName    = {};           // hash table of function Hardware Id by logical name
        /** @member {Object} **/
        this._nameByHwId    = {};           // hash table of function logical name by Hardware Id
        /** @member {Object} **/
        this._valueByHwId   = {};           // hash table of function advertised value by logical name
        /** @member {number} **/
        this._baseType      = 0;            // default to no abstract base type (generic YFunction)
    }

    /** Index a single function given by HardwareId and logical name; store any advertised value
     *
     * @param {string} str_hwid
     * @param {string} str_name
     * @param {string|null} str_val
     * @param {number|null} int_basetype
     * @returns {boolean} true iff there was a logical name discrepancy
     */
    imm_reindexFunction(str_hwid, str_name, str_val, int_basetype)
    {
        var currname = this._nameByHwId[str_hwid];
        var res = false;
        if(currname == undefined || currname == '') {
            if(str_name != '') {
                this._nameByHwId[str_hwid] = str_name;
                res = true;
            }
        } else if(currname != str_name) {
            if(this._hwIdByName[currname] == str_hwid)
                delete this._hwIdByName[currname];
            if(str_name != '') {
                this._nameByHwId[str_hwid] = str_name;
            } else {
                delete this._nameByHwId[str_hwid];
            }
            res = true;
        }
        if(str_name != '') {
            this._hwIdByName[str_name] = str_hwid;
        }
        if(str_val != undefined) {
            this._valueByHwId[str_hwid] = str_val;
        } else {
            if(this._valueByHwId[str_hwid] == undefined) {
                this._valueByHwId[str_hwid] = '';
            }
        }
        if(int_basetype != undefined) {
            if(this._baseType == 0) {
                this._baseType = int_basetype;
            }
        }
        return res;
    }

    /** Forget a disconnected function given by HardwareId
     *
     * @param {string} str_hwid
     */
    imm_forgetFunction(str_hwid)
    {
        let currname = this._nameByHwId[str_hwid];
        if(currname != undefined) {
            if(currname != '' && this._hwIdByName[currname] == str_hwid) {
                delete this._hwIdByName[currname];
            }
            delete this._nameByHwId[str_hwid];
        }
        if(this._valueByHwId[str_hwid] != undefined) {
            delete this._valueByHwId[str_hwid];
        }
    }

    /** Find the exact Hardware Id of the specified function, if currently connected
     * If device is not known as connected, return a clean error
     * This function will not cause any network access
     *
     * @param {string} str_func
     * @return {object}
     */
    imm_resolve(str_func)
    {
        var dotpos = str_func.indexOf('.');
        var res;
        if(dotpos < 0) {
            // First case: str_func is the logicalname of a function
            res = this._hwIdByName[str_func];
            if(res != undefined) {
                return { errorType:YAPI_SUCCESS,
                         errorMsg:'no error',
                         result:String(res) };
            }

            // fallback to assuming that str_func is a logicalname or serial number of a module
            // with an implicit function name (like serial.module for instance)
            dotpos = str_func.length;
            str_func += '.'+this._className.substr(0,1).toLowerCase()+this._className.substr(1);
        }

        // Second case: str_func is in the form: device_id.function_id

        // quick lookup for a known pure hardware id
        if(this._valueByHwId[str_func] != undefined) {
            return { errorType:YAPI_SUCCESS,
                     errorMsg:'no error',
                     result:String(str_func) };
        }
        if(dotpos>0) {
            // either the device id is a logical name, or the function is unknown
            var devid = str_func.substr(0,dotpos);
            var funcid = str_func.substr(dotpos+1);
            var dev = this._yapi.imm_getDevice(devid);
            if(!dev) {
                return { errorType:YAPI_DEVICE_NOT_FOUND,
                         errorMsg:'Device ['+devid+'] not online',
                         result:null };
            }
            var serial = dev.imm_getSerialNumber();
            res = serial+'.'+funcid;
            if(this._valueByHwId[res] != undefined) {
                return { errorType:YAPI_SUCCESS,
                         errorMsg:'no error',
                         result:String(res) };
            }

            // not found neither, may be funcid is a function logicalname
            var i, nfun = dev.imm_functionCount();
            for(i = 0; i < nfun; i++) {
                res = serial+'.'+dev.imm_functionId(i);
                var name = this._nameByHwId[res];
                if(name != undefined && name == funcid) {
                    return { errorType:YAPI_SUCCESS,
                             errorMsg:'no error',
                             result:String(res) };
                }
            }
        } else {
            funcid = str_func.substr(1);
            for (var hwid_str in this._connectedFns){
                var pos = hwid_str.indexOf('.');
                var str_function = hwid_str.substr(pos+1);
                if(str_function == funcid) {
                    return {errorType:YAPI_SUCCESS,
                             errorMsg:'no error',
                             result:String(hwid_str)};
                }
            }
        }
        return { errorType:YAPI_DEVICE_NOT_FOUND,
                 errorMsg:'No function ['+funcid+'] found on device ['+serial+']',
                 result:null };
    }

    /** Find the friendly name (use logical name if available) of the specified function, if currently connected
     * If device is not known as connected, return a clean error
     * This function will not cause any network access
     *
     * @param {string} str_func
     * @return {object}
     */
    imm_getFriendlyName(str_func)
    {
        var resolved = this.imm_resolve(str_func);
        var name;
        if (resolved.errorType != YAPI_SUCCESS) {
            return resolved;
        }
        if (this._className == 'Module'){
            var friend = resolved.result;
            name = this._nameByHwId[resolved.result];
            if (name !=undefined && name !=''){
                friend = this._nameByHwId[resolved.result];
            }
            return { errorType:YAPI_SUCCESS,
                     errorMsg:'no error',
                     result:String(friend) };
        } else {
            var pos = resolved.result.indexOf('.');
            var str_serialMod = resolved.result.substr(0,pos);
            var str_friendModFull = this._yapi.imm_getFriendlyNameFunction('Module',str_serialMod).result;
            var int_friendModDot = str_friendModFull.indexOf('.');
            var str_friendMod = (int_friendModDot > 0 ? str_friendModFull.substr(0,int_friendModDot) : str_friendModFull);
            var str_friendFunc = resolved.result.substr(pos+1);
            name = this._nameByHwId[resolved.result];
            if(name != undefined && name!='') {
                str_friendFunc = name;
            }
            return { errorType:YAPI_SUCCESS,
                     errorMsg:'no error',
                     result:String(str_friendMod+'.'+str_friendFunc) };
		}
    }

    /** Associates a given function object to a function id
     *
     * @param {string} str_func
     * @param {YFunction} obj_func
     */
    imm_setFunction(str_func, obj_func)
    {
        var funres = this.imm_resolve(str_func);
        if(funres.result != undefined) {
            // the function has been located on a device
            this._connectedFns[funres.result] = obj_func;
        } else {
            // the function is still abstract
            this._requestedFns[str_func] = obj_func;
        }
    }

    /** Retrieve a function object by hardware id, updating the indexes on the fly if needed
     *
     * @param {string} str_func
     * @return {YFunction}
     */
    imm_getFunction(str_func)
    {
        var funres = this.imm_resolve(str_func);
        if(funres.errorType == YAPI_SUCCESS) {
            // the function has been located on a device
            var conn_fn = this._connectedFns[funres.result];
            if(conn_fn != undefined) return conn_fn;

            var req_fn = this._requestedFns[str_func];
            if(req_fn != undefined) {
                this._connectedFns[funres.result] = req_fn;
                delete this._requestedFns[str_func];
            }
            return req_fn;
        } else {
            // the function is still abstract
            return this._requestedFns[str_func];
        }
    }

    /** Stores a function advertised value by hardware id, and tell if an event should be queued for it
     *
     * @param {string} str_hwid
     * @param {string} str_pubval
     * @return {boolean}
     */
    imm_setFunctionValue(str_hwid, str_pubval)
    {
        var currval = this._valueByHwId[str_hwid];
        if(!(currval == undefined) && currval == str_pubval) {
            return false;
        }
        this._valueByHwId[str_hwid] = str_pubval;
        return true;
    }

    /** Retrieve a function advertised value by hardware id
     *
     * @param {string} str_hwid
     * @return {string}
     */
    imm_getFunctionValue(str_hwid)
    {
        return this._valueByHwId[str_hwid];
    }

    /** Return the basetype of this function class
     *
     * @return {string}
     */
    imm_getBaseType()
    {
        return this._baseType;
    }

    /** Test if function type is compatible with basetype
     *
     * @return {boolean}
     */
    imm_matchBaseType(baseclass)
    {
        return baseclass == YOCTO_BASETYPE_FUNCTION || baseclass == this._baseType;
    }

    /** Find the hardwareId of the first instance of a given function class
     *
     * @return {string|null}
     */
    imm_getFirstHardwareId()
    {
        var res = null;
        //noinspection LoopStatementThatDoesntLoopJS
        for(res in this._valueByHwId) break;
        return res;
    }

    /** Find the hardwareId for the next instance of a given function class
     *
     * @param {string} str_hwid
     * @return {string|null}
     */
    imm_getNextHardwareId(str_hwid)
    {
        for(var iter_hwid in this._valueByHwId) {
            if(str_hwid == '!')
                return iter_hwid;
            if(str_hwid == iter_hwid)
                str_hwid = '!';
        }
        return null; // no more instance found
    }
}

class YHTTPBody
{
    /** Object storing a file to upload
     *
     * @param str_fname {string}
     * @param bin_data {Uint8Array}
     * @param fun_progressCb {function}
     */
    constructor(str_fname, bin_data, fun_progressCb)
    {
        this.fname = str_fname;
        this.data = bin_data;
        this.progressCb = fun_progressCb;
    }
}

class YHTTPRequest
{
    /** Object storing the result of any HTTP Query, with status code and error message
     *
     * @param bin_res {Uint8Array}
     * @param int_errType {number}
     * @param str_errMsg {string}
     */
    constructor(bin_res, int_errType = YAPI_SUCCESS, str_errMsg = 'no error')
    {
        /** @member {Uint8Array} **/
        this.bin_result = bin_res;
        /** @member {number} **/
        this.errorType = int_errType;
        /** @member {string} **/
        this.errorMsg = str_errMsg;
        /** @member {Object} **/
        this.obj_result = null;
        /** @member {number} **/
        this.asyncId = 0;
        /** @member {function} **/
        this.acceptor = null;
        /** @member {Uint8Array} **/
        this.toBeSent = null;
        /** @member {number} **/
        this.sendPos = null;
        /** @member {function} **/
        this.progressCb = null;
        /** @member {number} **/
        this.timeoutId = null;
        /** @member {YHTTPRequest} **/
        this.next = null;
    }
}

class YFuncRequest
{
    /** Object storing the result of a function request, with status code and error message
     *
     * @param obj_res {Object}
     * @param int_errType {number}
     * @param str_errMsg {string}
     */
    constructor(obj_res, int_errType = YAPI_SUCCESS, str_errMsg = 'no error')
    {
        /** @member {Object} **/
        this.obj_result = obj_res;
        /** @member {number} **/
        this.errorType = int_errType;
        /** @member {string} **/
        this.errorMsg = str_errMsg;
    }
}

// Pseudo class to describe value parsed from JSON
class _YY_LoadVal
{
    constructor()
    {
        // hub api
        /** @member {string} **/
        this.serialNumber = '';
        /** @member {string} **/
        this.logicalName  = '';
        /** @member {string} **/
        this.productName  = '';
        /** @member {number} **/
        this.productId    = 0;
        /** @member {number} **/
        this.beacon       = 0;
        /** @member {Object} **/
        this.services     = {
            whitePages: [ { networkUrl: '' }],
            yellowPages: [ ]
        };
        // datalogger
        /** @member {string} **/
        this.calib        = '';
        /** @member {string} **/
        this.unit         = '';
        /** @member {string} **/
        this.cal          = '';
        /** @member {string[]} **/
        this.streams      = [];
        // node.js ServerResponse
        /** @member {number} **/
        this.statusCode   = 0;
    }
}

//--- (generated code: YDataStream definitions)
//--- (end of generated code: YDataStream definitions)

//--- (generated code: YDataStream class start)
/**
 * YDataStream Class: Unformatted data sequence
 *
 * YDataStream objects represent bare recorded measure sequences,
 * exactly as found within the data logger present on Yoctopuce
 * sensors.
 *
 * In most cases, it is not necessary to use YDataStream objects
 * directly, as the YDataSet objects (returned by the
 * get_recordedData() method from sensors and the
 * get_dataSets() method from the data logger) provide
 * a more convenient interface.
 */
//--- (end of generated code: YDataStream class start)
class YDataStream
{
    constructor(obj_parent, obj_dataset, encoded)
    {
        //--- (generated code: YDataStream constructor)
        /** @member {YFunction} **/
        this._parent                     = null;
        /** @member {number} **/
        this._runNo                      = 0;
        /** @member {number} **/
        this._utcStamp                   = 0;
        /** @member {number} **/
        this._nCols                      = 0;
        /** @member {number} **/
        this._nRows                      = 0;
        /** @member {number} **/
        this._startTime                  = 0;
        /** @member {number} **/
        this._duration                   = 0;
        /** @member {number} **/
        this._dataSamplesInterval        = 0;
        /** @member {number} **/
        this._firstMeasureDuration       = 0;
        /** @member {string[]} **/
        this._columnNames                = [];
        /** @member {string} **/
        this._functionId                 = '';
        /** @member {boolean} **/
        this._isClosed                   = 0;
        /** @member {boolean} **/
        this._isAvg                      = 0;
        /** @member {number} **/
        this._minVal                     = 0;
        /** @member {number} **/
        this._avgVal                     = 0;
        /** @member {number} **/
        this._maxVal                     = 0;
        /** @member {number} **/
        this._caltyp                     = 0;
        /** @member {number[]} **/
        this._calpar                     = [];
        /** @member {number[]} **/
        this._calraw                     = [];
        /** @member {number[]} **/
        this._calref                     = [];
        /** @member {number[][]} **/
        this._values                     = [];
        //--- (end of generated code: YDataStream constructor)

        this.DATA_INVALID = YAPI_INVALID_DOUBLE;
        this.DURATION_INVALID = YAPI_INVALID_DOUBLE;

        this._parent = obj_parent;
        this._yapi = this._parent._yapi;
        this.imm_calhdl = null;
        if(typeof obj_dataset != 'undefined') {
            this.imm_initFromDataSet(obj_dataset, encoded);
        }
    }

    //--- (generated code: YDataStream implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    imm_initFromDataSet(dataset,encoded)
    {
        /** @type {number} **/
        let val;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let maxpos;
        /** @type {number} **/
        let ms_offset;
        /** @type {number} **/
        let samplesPerHour;
        /** @type {number} **/
        let fRaw;
        /** @type {number} **/
        let fRef;
        /** @type {number[]} **/
        let iCalib = [];
        // decode sequence header to extract data
        this._runNo = encoded[0] + (((encoded[1]) << (16)));
        this._utcStamp = encoded[2] + (((encoded[3]) << (16)));
        val = encoded[4];
        this._isAvg = (((val) & (0x100)) == 0);
        samplesPerHour = ((val) & (0xff));
        if (((val) & (0x100)) != 0) {
            samplesPerHour = samplesPerHour * 3600;
        } else {
            if (((val) & (0x200)) != 0) {
                samplesPerHour = samplesPerHour * 60;
            }
        }
        this._dataSamplesInterval = 3600.0 / samplesPerHour;
        ms_offset = encoded[6];
        if (ms_offset < 1000) {
            // new encoding -> add the ms to the UTC timestamp
            this._startTime = this._utcStamp + (ms_offset / 1000.0);
        } else {
            // legacy encoding subtract the measure interval form the UTC timestamp
            this._startTime = this._utcStamp -  this._dataSamplesInterval;
        }
        this._firstMeasureDuration = encoded[5];
        if (!(this._isAvg)) {
            this._firstMeasureDuration = this._firstMeasureDuration / 1000.0;
        }
        val = encoded[7];
        this._isClosed = (val != 0xffff);
        if (val == 0xffff) {
            val = 0;
        }
        this._nRows = val;
        this._duration = this._nRows * this._dataSamplesInterval;
        // precompute decoding parameters
        iCalib = dataset.imm_get_calibration();
        this._caltyp = iCalib[0];
        if (this._caltyp != 0) {
            this.imm_calhdl = this._yapi.imm_getCalibrationHandler(this._caltyp);
            maxpos = iCalib.length;
            this._calpar.length = 0;
            this._calraw.length = 0;
            this._calref.length = 0;
            i = 1;
            while (i < maxpos) {
                this._calpar.push(iCalib[i]);
                i = i + 1;
            }
            i = 1;
            while (i + 1 < maxpos) {
                fRaw = iCalib[i];
                fRaw = fRaw / 1000.0;
                fRef = iCalib[i + 1];
                fRef = fRef / 1000.0;
                this._calraw.push(fRaw);
                this._calref.push(fRef);
                i = i + 2;
            }
        }
        // preload column names for backward-compatibility
        this._functionId = dataset.imm_get_functionId();
        if (this._isAvg) {
            this._columnNames.length = 0;
            this._columnNames.push(this._functionId+'_min');
            this._columnNames.push(this._functionId+'_avg');
            this._columnNames.push(this._functionId+'_max');
            this._nCols = 3;
        } else {
            this._columnNames.length = 0;
            this._columnNames.push(this._functionId);
            this._nCols = 1;
        }
        // decode min/avg/max values for the sequence
        if (this._nRows > 0) {
            this._avgVal = this.imm_decodeAvg(encoded[8] + (((((encoded[9]) ^ (0x8000))) << (16))), 1);
            this._minVal = this.imm_decodeVal(encoded[10] + (((encoded[11]) << (16))));
            this._maxVal = this.imm_decodeVal(encoded[12] + (((encoded[13]) << (16))));
        }
        return 0;
    }

    imm_parseStream(sdata)
    {
        /** @type {number} **/
        let idx;
        /** @type {number[]} **/
        let udat = [];
        /** @type {number[]} **/
        let dat = [];
        if ((sdata).length == 0) {
            this._nRows = 0;
            return YAPI_SUCCESS;
        }

        udat = this._yapi.imm_decodeWords(this._parent.imm_json_get_string(sdata));
        this._values.length = 0;
        idx = 0;
        if (this._isAvg) {
            while (idx + 3 < udat.length) {
                dat.length = 0;
                dat.push(this.imm_decodeVal(udat[idx + 2] + (((udat[idx + 3]) << (16)))));
                dat.push(this.imm_decodeAvg(udat[idx] + (((((udat[idx + 1]) ^ (0x8000))) << (16))), 1));
                dat.push(this.imm_decodeVal(udat[idx + 4] + (((udat[idx + 5]) << (16)))));
                idx = idx + 6;
                this._values.push(dat.slice());
            }
        } else {
            while (idx + 1 < udat.length) {
                dat.length = 0;
                dat.push(this.imm_decodeAvg(udat[idx] + (((((udat[idx + 1]) ^ (0x8000))) << (16))), 1));
                this._values.push(dat.slice());
                idx = idx + 2;
            }
        }

        this._nRows = this._values.length;
        return YAPI_SUCCESS;
    }

    imm_get_url()
    {
        /** @type {string} **/
        let url;
        url = 'logger.json?id='+this._functionId+'&run='+String(Math.round(this._runNo))+'&utc='+String(Math.round(this._utcStamp));
        return url;
    }

    async loadStream()
    {
        return this.imm_parseStream(await this._parent._download(this.imm_get_url()));
    }

    imm_decodeVal(w)
    {
        /** @type {number} **/
        let val;
        val = w;
        val = val / 1000.0;
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    imm_decodeAvg(dw,count)
    {
        /** @type {number} **/
        let val;
        val = dw;
        val = val / 1000.0;
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    async isClosed()
    {
        return this._isClosed;
    }

    /**
     * Returns the run index of the data stream. A run can be made of
     * multiple datastreams, for different time intervals.
     *
     * @return {number} an unsigned number corresponding to the run index.
     */
    async get_runIndex()
    {
        return this._runNo;
    }

    /**
     * Returns the relative start time of the data stream, measured in seconds.
     * For recent firmwares, the value is relative to the present time,
     * which means the value is always negative.
     * If the device uses a firmware older than version 13000, value is
     * relative to the start of the time the device was powered on, and
     * is always positive.
     * If you need an absolute UTC timestamp, use get_realStartTimeUTC().
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_realStartTimeUTC().
     *
     * @return {number} an unsigned number corresponding to the number of seconds
     *         between the start of the run and the beginning of this data
     *         stream.
     */
    async get_startTime()
    {
        return this._utcStamp - parseInt(Date.now() / 1000, 10);
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_realStartTimeUTC().
     *
     * @return {number} an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    async get_startTimeUTC()
    {
        return Math.round(this._startTime);
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     *
     * @return {number} a floating-point number  corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    async get_realStartTimeUTC()
    {
        return this._startTime;
    }

    /**
     * Returns the number of milliseconds between two consecutive
     * rows of this data stream. By default, the data logger records one row
     * per second, but the recording frequency can be changed for
     * each device function
     *
     * @return {number} an unsigned number corresponding to a number of milliseconds.
     */
    async get_dataSamplesIntervalMs()
    {
        return Math.round(this._dataSamplesInterval*1000);
    }

    async get_dataSamplesInterval()
    {
        return this._dataSamplesInterval;
    }

    async get_firstDataSamplesInterval()
    {
        return this._firstMeasureDuration;
    }

    /**
     * Returns the number of data rows present in this stream.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return {number} an unsigned number corresponding to the number of rows.
     *
     * On failure, throws an exception or returns zero.
     */
    async get_rowCount()
    {
        if ((this._nRows != 0) && this._isClosed) {
            return this._nRows;
        }
        await this.loadStream();
        return this._nRows;
    }

    /**
     * Returns the number of data columns present in this stream.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return {number} an unsigned number corresponding to the number of columns.
     *
     * On failure, throws an exception or returns zero.
     */
    async get_columnCount()
    {
        if (this._nCols != 0) {
            return this._nCols;
        }
        await this.loadStream();
        return this._nCols;
    }

    /**
     * Returns the title (or meaning) of each data column present in this stream.
     * In most case, the title of the data column is the hardware identifier
     * of the sensor that produced the data. For streams recorded at a lower
     * recording rate, the dataLogger stores the min, average and max value
     * during each measure interval into three columns with suffixes _min,
     * _avg and _max respectively.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return {string[]} a list containing as many strings as there are columns in the
     *         data stream.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_columnNames()
    {
        if (this._columnNames.length != 0) {
            return this._columnNames;
        }
        await this.loadStream();
        return this._columnNames;
    }

    /**
     * Returns the smallest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return {number} a floating-point number corresponding to the smallest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    async get_minValue()
    {
        return this._minVal;
    }

    /**
     * Returns the average of all measures observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return {number} a floating-point number corresponding to the average value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    async get_averageValue()
    {
        return this._avgVal;
    }

    /**
     * Returns the largest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return {number} a floating-point number corresponding to the largest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    async get_maxValue()
    {
        return this._maxVal;
    }

    async get_realDuration()
    {
        if (this._isClosed) {
            return this._duration;
        }
        return parseInt(Date.now() / 1000, 10) - this._utcStamp;
    }

    /**
     * Returns the whole data set contained in the stream, as a bidimensional
     * table of numbers.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @return {number[][]} a list containing as many elements as there are rows in the
     *         data stream. Each row itself is a list of floating-point
     *         numbers.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_dataRows()
    {
        if ((this._values.length == 0) || !(this._isClosed)) {
            await this.loadStream();
        }
        return this._values;
    }

    /**
     * Returns a single measure from the data stream, specified by its
     * row and column index.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @param row {number} : row index
     * @param col {number} : column index
     *
     * @return {number} a floating-point number
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    async get_data(row,col)
    {
        if ((this._values.length == 0) || !(this._isClosed)) {
            await this.loadStream();
        }
        if (row >= this._values.length) {
            return YDataStream.DATA_INVALID;
        }
        if (col >= this._values[row].length) {
            return YDataStream.DATA_INVALID;
        }
        return this._values[row][col];
    }

    //--- (end of generated code: YDataStream implementation)
}

YDataStream.Data_INVALID = YAPI_INVALID_DOUBLE;
YDataStream.DURATION_INVALID = YAPI_INVALID_DOUBLE;


//--- (generated code: YDataSet definitions)
//--- (end of generated code: YDataSet definitions)

//--- (generated code: YDataSet class start)
/**
 * YDataSet Class: Recorded data sequence
 *
 * YDataSet objects make it possible to retrieve a set of recorded measures
 * for a given sensor and a specified time interval. They can be used
 * to load data points with a progress report. When the YDataSet object is
 * instantiated by the get_recordedData()  function, no data is
 * yet loaded from the module. It is only when the loadMore()
 * method is called over and over than data will be effectively loaded
 * from the dataLogger.
 *
 * A preview of available measures is available using the function
 * get_preview() as soon as loadMore() has been called
 * once. Measures themselves are available using function get_measures()
 * when loaded by subsequent calls to loadMore().
 *
 * This class can only be used on devices that use a recent firmware,
 * as YDataSet objects are not supported by firmwares older than version 13000.
 */
//--- (end of generated code: YDataSet class start)
class YDataSet
{
    constructor(obj_parent, str_functionId, str_unit, double_startTime, double_endTime)
    {
        //--- (generated code: YDataSet constructor)
        /** @member {YFunction} **/
        this._parent                     = null;
        /** @member {string} **/
        this._hardwareId                 = '';
        /** @member {string} **/
        this._functionId                 = '';
        /** @member {string} **/
        this._unit                       = '';
        /** @member {number} **/
        this._startTimeMs                = 0;
        /** @member {number} **/
        this._endTimeMs                  = 0;
        /** @member {number} **/
        this._progress                   = 0;
        /** @member {number[]} **/
        this._calib                      = [];
        /** @member {YDataStream[]} **/
        this._streams                    = [];
        /** @member {YMeasure} **/
        this._summary                    = null;
        /** @member {YMeasure[]} **/
        this._preview                    = [];
        /** @member {YMeasure[]} **/
        this._measures                   = [];
        /** @member {number} **/
        this._summaryMinVal              = 0;
        /** @member {number} **/
        this._summaryMaxVal              = 0;
        /** @member {number} **/
        this._summaryTotalAvg            = 0;
        /** @member {number} **/
        this._summaryTotalTime           = 0;
        //--- (end of generated code: YDataSet constructor)

        this.DATA_INVALID = YAPI_INVALID_DOUBLE;
        this.DURATION_INVALID = YAPI_INVALID_DOUBLE;
        this.HARDWAREID_INVALID = YAPI_INVALID_STRING;
        this.FUNCTIONID_INVALID = YAPI_INVALID_STRING;
        this.UNIT_INVALID = YAPI_INVALID_STRING;

        // init _summary with dummy value
        this._summary = new YMeasure(0, 0, 0, 0, 0);
        if(typeof str_unit === 'undefined') {
            // 1st version of constructor, called from YDataLogger
            /** @member {YFunction} **/
            this._parent     = obj_parent;
            /** @member {YAPIContext} **/
            this._yapi       = obj_parent._yapi;
            this._startTime  = 0;
            this._endTime    = 0;
            // caller must call method async parse() just afterwards
        } else {
            // 2nd version of constructor, called from YFunction
            /** @member {YFunction} **/
            this._parent     = obj_parent;
            /** @member {YAPIContext} **/
            this._yapi       = obj_parent._yapi;
            this._functionId = str_functionId;
            this._unit       = str_unit;
            this._startTimeMs= double_startTime * 1000;
            this._endTimeMs  = double_endTime * 1000;
            this._progress   = -1;
        }
    }

    imm_get_functionId()
    {
        return this._functionId;
    }

    //--- (generated code: YDataSet implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    imm_get_calibration()
    {
        return this._calib;
    }

    async loadSummary(data)
    {
        /** @type {number[][]} **/
        let dataRows = [];
        /** @type {number} **/
        let tim;
        /** @type {number} **/
        let mitv;
        /** @type {number} **/
        let itv;
        /** @type {number} **/
        let fitv;
        /** @type {number} **/
        let end_;
        /** @type {number} **/
        let nCols;
        /** @type {number} **/
        let minCol;
        /** @type {number} **/
        let avgCol;
        /** @type {number} **/
        let maxCol;
        /** @type {number} **/
        let res;
        /** @type {number} **/
        let m_pos;
        /** @type {number} **/
        let previewTotalTime;
        /** @type {number} **/
        let previewTotalAvg;
        /** @type {number} **/
        let previewMinVal;
        /** @type {number} **/
        let previewMaxVal;
        /** @type {number} **/
        let previewAvgVal;
        /** @type {number} **/
        let previewStartMs;
        /** @type {number} **/
        let previewStopMs;
        /** @type {number} **/
        let previewDuration;
        /** @type {number} **/
        let streamStartTimeMs;
        /** @type {number} **/
        let streamDuration;
        /** @type {number} **/
        let streamEndTimeMs;
        /** @type {number} **/
        let minVal;
        /** @type {number} **/
        let avgVal;
        /** @type {number} **/
        let maxVal;
        /** @type {number} **/
        let summaryStartMs;
        /** @type {number} **/
        let summaryStopMs;
        /** @type {number} **/
        let summaryTotalTime;
        /** @type {number} **/
        let summaryTotalAvg;
        /** @type {number} **/
        let summaryMinVal;
        /** @type {number} **/
        let summaryMaxVal;
        /** @type {string} **/
        let url;
        /** @type {string} **/
        let strdata;
        /** @type {number[]} **/
        let measure_data = [];

        if (this._progress < 0) {
            strdata = this._yapi.imm_bin2str(data);
            if (strdata == '{}') {
                this._parent._throw(YAPI_VERSION_MISMATCH, 'device firmware is too old');
                return YAPI_VERSION_MISMATCH;
            }
            res = await this._parse(strdata);
            if (res < 0) {
                return res;
            }
        }
        summaryTotalTime = 0;
        summaryTotalAvg = 0;
        summaryMinVal = YAPI_MAX_DOUBLE;
        summaryMaxVal = YAPI_MIN_DOUBLE;
        summaryStartMs = YAPI_MAX_DOUBLE;
        summaryStopMs = YAPI_MIN_DOUBLE;

        // Parse complete streams
        for (let ii in  this._streams) {
            streamStartTimeMs = Math.round(await  this._streams[ii].get_realStartTimeUTC() *1000);
            streamDuration = await  this._streams[ii].get_realDuration() ;
            streamEndTimeMs = streamStartTimeMs + Math.round(streamDuration * 1000);
            if ((streamStartTimeMs >= this._startTimeMs) && ((this._endTimeMs == 0) || (streamEndTimeMs <= this._endTimeMs))) {
                // stream that are completely inside the dataset
                previewMinVal = await  this._streams[ii].get_minValue();
                previewAvgVal = await  this._streams[ii].get_averageValue();
                previewMaxVal = await  this._streams[ii].get_maxValue();
                previewStartMs = streamStartTimeMs;
                previewStopMs = streamEndTimeMs;
                previewDuration = streamDuration;
            } else {
                // stream that are partially in the dataset
                // we need to parse data to filter value outside the dataset
                url =  this._streams[ii].imm_get_url();
                data = await this._parent._download(url);
                this._streams[ii].imm_parseStream(data);
                dataRows = await  this._streams[ii].get_dataRows();
                if (dataRows.length == 0) {
                    return await this.get_progress();
                }
                tim = streamStartTimeMs;
                fitv = Math.round(await  this._streams[ii].get_firstDataSamplesInterval() * 1000);
                itv = Math.round(await  this._streams[ii].get_dataSamplesInterval() * 1000);
                nCols = dataRows[0].length;
                minCol = 0;
                if (nCols > 2) {
                    avgCol = 1;
                } else {
                    avgCol = 0;
                }
                if (nCols > 2) {
                    maxCol = 2;
                } else {
                    maxCol = 0;
                }
                previewTotalTime = 0;
                previewTotalAvg = 0;
                previewStartMs = streamEndTimeMs;
                previewStopMs = streamStartTimeMs;
                previewMinVal = YAPI_MAX_DOUBLE;
                previewMaxVal = YAPI_MIN_DOUBLE;
                m_pos = 0;
                while (m_pos < dataRows.length) {
                    measure_data  = dataRows[m_pos];
                    if (m_pos == 0) {
                        mitv = fitv;
                    } else {
                        mitv = itv;
                    }
                    end_ = tim + mitv;
                    if ((end_ > this._startTimeMs) && ((this._endTimeMs == 0) || (tim < this._endTimeMs))) {
                        minVal = measure_data[minCol];
                        avgVal = measure_data[avgCol];
                        maxVal = measure_data[maxCol];
                        if (previewStartMs > tim) {
                            previewStartMs = tim;
                        }
                        if (previewStopMs < end_) {
                            previewStopMs = end_;
                        }
                        if (previewMinVal > minVal) {
                            previewMinVal = minVal;
                        }
                        if (previewMaxVal < maxVal) {
                            previewMaxVal = maxVal;
                        }
                        previewTotalAvg = previewTotalAvg + (avgVal * mitv);
                        previewTotalTime = previewTotalTime + mitv;
                    }
                    tim = end_;
                    m_pos = m_pos + 1;
                }
                if (previewTotalTime > 0) {
                    previewAvgVal = previewTotalAvg / previewTotalTime;
                    previewDuration = (previewStopMs - previewStartMs) / 1000.0;
                } else {
                    previewAvgVal = 0.0;
                    previewDuration = 0.0;
                }
            }
            this._preview.push(new YMeasure(previewStartMs / 1000.0, previewStopMs / 1000.0, previewMinVal, previewAvgVal, previewMaxVal));
            if (summaryMinVal > previewMinVal) {
                summaryMinVal = previewMinVal;
            }
            if (summaryMaxVal < previewMaxVal) {
                summaryMaxVal = previewMaxVal;
            }
            if (summaryStartMs > previewStartMs) {
                summaryStartMs = previewStartMs;
            }
            if (summaryStopMs < previewStopMs) {
                summaryStopMs = previewStopMs;
            }
            summaryTotalAvg = summaryTotalAvg + (previewAvgVal * previewDuration);
            summaryTotalTime = summaryTotalTime + previewDuration;
        }
        if ((this._startTimeMs == 0) || (this._startTimeMs > summaryStartMs)) {
            this._startTimeMs = summaryStartMs;
        }
        if ((this._endTimeMs == 0) || (this._endTimeMs < summaryStopMs)) {
            this._endTimeMs = summaryStopMs;
        }
        if (summaryTotalTime > 0) {
            this._summary = new YMeasure(summaryStartMs / 1000.0, summaryStopMs / 1000.0, summaryMinVal, summaryTotalAvg / summaryTotalTime, summaryMaxVal);
        } else {
            this._summary = new YMeasure(0.0, 0.0, YAPI_INVALID_DOUBLE, YAPI_INVALID_DOUBLE, YAPI_INVALID_DOUBLE);
        }
        return await this.get_progress();
    }

    async processMore(progress,data)
    {
        /** @type {YDataStream} **/
        let stream;
        /** @type {number[][]} **/
        let dataRows = [];
        /** @type {number} **/
        let tim;
        /** @type {number} **/
        let itv;
        /** @type {number} **/
        let fitv;
        /** @type {number} **/
        let end_;
        /** @type {number} **/
        let nCols;
        /** @type {number} **/
        let minCol;
        /** @type {number} **/
        let avgCol;
        /** @type {number} **/
        let maxCol;
        /** @type {boolean} **/
        let firstMeasure;

        if (progress != this._progress) {
            return this._progress;
        }
        if (this._progress < 0) {
            return await this.loadSummary(data);
        }
        stream = this._streams[this._progress];
        stream.imm_parseStream(data);
        dataRows = await stream.get_dataRows();
        this._progress = this._progress + 1;
        if (dataRows.length == 0) {
            return await this.get_progress();
        }
        tim = Math.round(await stream.get_realStartTimeUTC() * 1000);
        fitv = Math.round(await stream.get_firstDataSamplesInterval() * 1000);
        itv = Math.round(await stream.get_dataSamplesInterval() * 1000);
        if (fitv == 0) {
            fitv = itv;
        }
        if (tim < itv) {
            tim = itv;
        }
        nCols = dataRows[0].length;
        minCol = 0;
        if (nCols > 2) {
            avgCol = 1;
        } else {
            avgCol = 0;
        }
        if (nCols > 2) {
            maxCol = 2;
        } else {
            maxCol = 0;
        }

        firstMeasure = true;
        for (let ii in dataRows) {
            if (firstMeasure) {
                end_ = tim + fitv;
                firstMeasure = false;
            } else {
                end_ = tim + itv;
            }
            if ((end_ > this._startTimeMs) && ((this._endTimeMs == 0) || (tim < this._endTimeMs))) {
                this._measures.push(new YMeasure(tim / 1000, end_ / 1000, dataRows[ii][minCol], dataRows[ii][avgCol], dataRows[ii][maxCol]));
            }
            tim = end_;
        }
        return await this.get_progress();
    }

    async get_privateDataStreams()
    {
        return this._streams;
    }

    /**
     * Returns the unique hardware identifier of the function who performed the measures,
     * in the form SERIAL.FUNCTIONID. The unique hardware identifier is composed of the
     * device serial number and of the hardware identifier of the function
     * (for example THRMCPL1-123456.temperature1)
     *
     * @return {string} a string that uniquely identifies the function (ex: THRMCPL1-123456.temperature1)
     *
     * On failure, throws an exception or returns  YDataSet.HARDWAREID_INVALID.
     */
    async get_hardwareId()
    {
        /** @type {YModule} **/
        let mo;
        if (!(this._hardwareId == '')) {
            return this._hardwareId;
        }
        mo = await this._parent.get_module();
        this._hardwareId = await mo.get_serialNumber()+'.'+await this.get_functionId();
        return this._hardwareId;
    }

    /**
     * Returns the hardware identifier of the function that performed the measure,
     * without reference to the module. For example temperature1.
     *
     * @return {string} a string that identifies the function (ex: temperature1)
     */
    async get_functionId()
    {
        return this._functionId;
    }

    /**
     * Returns the measuring unit for the measured value.
     *
     * @return {string} a string that represents a physical unit.
     *
     * On failure, throws an exception or returns  YDataSet.UNIT_INVALID.
     */
    async get_unit()
    {
        return this._unit;
    }

    /**
     * Returns the start time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet is created, the start time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the start time is updated
     * to reflect the timestamp of the first measure actually found in the
     * dataLogger within the specified range.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_summary()
     * which contain more precise informations on the YDataSet.
     *
     * @return {number} an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    async get_startTimeUTC()
    {
        return this.imm_get_startTimeUTC();
    }

    imm_get_startTimeUTC()
    {
        return (this._startTimeMs / 1000.0);
    }

    /**
     * Returns the end time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet is created, the end time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the end time is updated
     * to reflect the timestamp of the last measure actually found in the
     * dataLogger within the specified range.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_summary()
     * which contain more precise informations on the YDataSet.
     *
     *
     * @return {number} an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the end of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    async get_endTimeUTC()
    {
        return this.imm_get_endTimeUTC();
    }

    imm_get_endTimeUTC()
    {
        return Math.round(this._endTimeMs / 1000.0);
    }

    /**
     * Returns the progress of the downloads of the measures from the data logger,
     * on a scale from 0 to 100. When the object is instantiated by get_dataSet,
     * the progress is zero. Each time loadMore() is invoked, the progress
     * is updated, to reach the value 100 only once all measures have been loaded.
     *
     * @return {number} an integer in the range 0 to 100 (percentage of completion).
     */
    async get_progress()
    {
        if (this._progress < 0) {
            return 0;
        }
        // index not yet loaded
        if (this._progress >= this._streams.length) {
            return 100;
        }
        return parseInt((1 + (1 + this._progress) * 98 ) / ((1 + this._streams.length)), 10);
    }

    /**
     * Loads the the next block of measures from the dataLogger, and updates
     * the progress indicator.
     *
     * @return {number} an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadMore()
    {
        /** @type {string} **/
        let url;
        /** @type {YDataStream} **/
        let stream;
        if (this._progress < 0) {
            url = 'logger.json?id='+this._functionId;
            if (this._startTimeMs != 0) {
                url = url+'&from='+String(Math.round(this.imm_get_startTimeUTC()));
            }
            if (this._endTimeMs != 0) {
                url = url+'&to='+String(Math.round(this.imm_get_endTimeUTC()+1));
            }
        } else {
            if (this._progress >= this._streams.length) {
                return 100;
            } else {
                stream = this._streams[this._progress];
                url = stream.imm_get_url();
            }
        }
        try {
            return await this.processMore(this._progress, await this._parent._download(url));
        } catch (e) {
            return await this.processMore(this._progress, await this._parent._download(url));
        }
    }

    /**
     * Returns an YMeasure object which summarizes the whole
     * DataSet. In includes the following information:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This summary is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return {YMeasure} an YMeasure object
     */
    async get_summary()
    {
        return this._summary;
    }

    /**
     * Returns a condensed version of the measures that can
     * retrieved in this YDataSet, as a list of YMeasure
     * objects. Each item includes:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This preview is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return {YMeasure[]} a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_preview()
    {
        return this._preview;
    }

    /**
     * Returns the detailed set of measures for the time interval corresponding
     * to a given condensed measures previously returned by get_preview().
     * The result is provided as a list of YMeasure objects.
     *
     * @param measure {YMeasure} : condensed measure from the list previously returned by
     *         get_preview().
     *
     * @return {YMeasure[]} a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_measuresAt(measure)
    {
        /** @type {number} **/
        let startUtcMs;
        /** @type {YDataStream} **/
        let stream;
        /** @type {number[][]} **/
        let dataRows = [];
        /** @type {YMeasure[]} **/
        let measures = [];
        /** @type {number} **/
        let tim;
        /** @type {number} **/
        let itv;
        /** @type {number} **/
        let end_;
        /** @type {number} **/
        let nCols;
        /** @type {number} **/
        let minCol;
        /** @type {number} **/
        let avgCol;
        /** @type {number} **/
        let maxCol;

        startUtcMs = measure.get_startTimeUTC() * 1000;
        stream = null;
        for (let ii in this._streams) {
            if (Math.round(await this._streams[ii].get_realStartTimeUTC() *1000) == startUtcMs) {
                stream = this._streams[ii];
            }
        }
        if (stream == null) {
            return measures;
        }
        dataRows = await stream.get_dataRows();
        if (dataRows.length == 0) {
            return measures;
        }
        tim = Math.round(await stream.get_realStartTimeUTC() * 1000);
        itv = Math.round(await stream.get_dataSamplesInterval() * 1000);
        if (tim < itv) {
            tim = itv;
        }
        nCols = dataRows[0].length;
        minCol = 0;
        if (nCols > 2) {
            avgCol = 1;
        } else {
            avgCol = 0;
        }
        if (nCols > 2) {
            maxCol = 2;
        } else {
            maxCol = 0;
        }

        for (let ii in dataRows) {
            end_ = tim + itv;
            if ((end_ > this._startTimeMs) && ((this._endTimeMs == 0) || (tim < this._endTimeMs))) {
                measures.push(new YMeasure(tim / 1000.0, end_ / 1000.0, dataRows[ii][minCol], dataRows[ii][avgCol], dataRows[ii][maxCol]));
            }
            tim = end_;
        }
        return measures;
    }

    /**
     * Returns all measured values currently available for this DataSet,
     * as a list of YMeasure objects. Each item includes:
     * - the start of the measure time interval
     * - the end of the measure time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * Before calling this method, you should call loadMore()
     * to load data from the device. You may have to call loadMore()
     * several time until all rows are loaded, but you can start
     * looking at available data rows before the load is complete.
     *
     * The oldest measures are always loaded first, and the most
     * recent measures will be loaded last. As a result, timestamps
     * are normally sorted in ascending order within the measure table,
     * unless there was an unexpected adjustment of the datalogger UTC
     * clock.
     *
     * @return {YMeasure[]} a table of records, where each record depicts the
     *         measured value for a given time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_measures()
    {
        return this._measures;
    }

    //--- (end of generated code: YDataSet implementation)

    // YDataSet parser for stream list
    async _parse(str_json)
    {
        var loadval;
        try {loadval = JSON.parse(str_json);} catch(err){}
        if(!loadval) {
            // no data available
            this._progress = 0;
            return this;
        }

        this._functionId = loadval.id;
        this._unit       = loadval.unit;
        if(loadval.calib) {
            this._calib  = this._yapi.imm_decodeFloats(loadval.calib);
            this._calib[0] = parseInt(this._calib[0] / 1000);
        } else {
            this._calib  = this._yapi.imm_decodeWords(loadval.cal);
        }
        this._summary    = new YMeasure(0,0,0,0,0);
        this._streams    = [];
        this._preview    = [];
        this._measures   = [];
        for(var i = 0; i < loadval.streams.length; i++) {
            var stream = this._parent.imm_findDataStream(this, loadval.streams[i]);
            var streamStartTime = await stream.get_realStartTimeUTC() * 1000;
            var streamEndTime = streamStartTime + await stream.get_realDuration() * 1000;
            if(this._startTimeMs > 0 && streamEndTime <= this._startTimeMs) {
                // this stream is too early, drop it
            } else if(this._endTimeMs > 0 && streamStartTime >= this._endTimeMs) {
                // this stream is too late, drop it
            } else {
                this._streams.push(stream);
            }
        }
        this._progress = 0;
        return await this.get_progress();
    }

}

YDataSet.DATA_INVALID = YAPI_INVALID_DOUBLE;
YDataSet.DURATION_INVALID = YAPI_INVALID_DOUBLE;
YDataSet.HARDWAREID_INVALID = YAPI_INVALID_STRING;
YDataSet.FUNCTIONID_INVALID = YAPI_INVALID_STRING;
YDataSet.UNIT_INVALID = YAPI_INVALID_STRING;


//
// YDevice Class (used internally)
//
// This class is used to store everything we know about connected Yocto-Devices.
// Instances are created when devices are discovered in the white pages
// (or registered manually, for root hubs) and then used to keep track of
// device naming changes. When a device or a function is renamed, this
// object forces the local indexes to be immediately updated, even if not
// yet fully propagated through the yellow pages of the device hub.
//
// In order to regroup multiple function queries on the same physical device,
// this class implements a device-wide API string cache (agnostic of API content).
// This is in addition to the function-specific cache implemented in YFunction.
//
class YDevice
{
    // Device constructor. Automatically call the YAPI functin to reindex device
    constructor(obj_yapi, str_rooturl, obj_wpRec, obj_ypRecs)
    {
        // private attributes
        /** @member {YAPIContext} **/
        this._yapi            = obj_yapi;
        /** @member {string} **/
        this._rootUrl         = str_rooturl;
        /** @member {string} **/
        this._serialNumber    = '';
        /** @member {string} **/
        this._logicalName     = '';
        /** @member {string} **/
        this._productName     = '';
        /** @member {number} **/
        this._productId       = 0;
        /** @member {number} **/
        this._beacon          = 0;
        /** @member {number} **/
        this._devYdx          = -1;
        /** @member {number} **/
        this._lastErrorType   = YAPI_SUCCESS;
        /** @member {string} **/
        this._lastErrorMsg    = 'no error';
        /** @member {Object} **/
        this._cache           = { _expiration:0, _json:new Uint8Array(0), _precooked: {} };
        /** @member {string[][]} **/
        this._functions       = [];
        /** @member {number} **/
        this._busy            = 0;
        /** @member {Promise} **/
        this._pendingQueries  = Promise.resolve();
        /** @member {number} **/
        this._lastTimeRef      = 0;
        /** @member {number} **/
        this._lastDuration      = 0;
        /** @member {Object} **/
        this._logCallback = null;
        /** @member {boolean} **/
        this._logIsPulling = false;
        /** @member {number} **/
        this._logpos = 0;
        if(obj_wpRec != undefined) {
            // preload values from white pages, if provided
            this._serialNumber = obj_wpRec.serialNumber;
            this._logicalName  = obj_wpRec.logicalName;
            this._productName  = obj_wpRec.productName;
            this._productId    = obj_wpRec.productId;
            this._beacon       = obj_wpRec.beacon;
            this._devYdx       = (obj_wpRec.index == undefined ? -1 : obj_wpRec.index);
            this.imm_updateFromYP(obj_ypRecs);
            this._yapi.imm_reindexDevice(this);
        }
        // when obj_wpRec is not provided, caller MUSTR
        // call async method refresh()
    }

    _throw(int_errType, str_errMsg, obj_retVal)
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    /** Return the root URL used to access a device (including the trailing slash)
     *
     * @returns {string}
     */
    imm_getRootUrl()
    {
        return this._rootUrl;
    }

    /** Return the serial number of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getSerialNumber()
    {
        return this._serialNumber;
    }

    /** Return the logical name of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getLogicalName()
    {
        return this._logicalName;
    }

    async getLogicalName()
    {
        if (this._cache._expiration == 0) {
            await this.refresh();
        }
        return this._logicalName;
    }

    /** Return the product name of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getProductName()
    {
        return this._productName;
    }

    /** Return the product Id of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getProductId()
    {
        return this._productId;
    }

    /** Return the beacon state of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getBeacon()
    {
        return this._beacon;
    }

    /** Return the beacon state of the device, as found during discovery
     *
     * @returns {number}
     */
    async getBeacon()
    {
        if (this._cache._expiration == 0) {
            await this.refresh();
        }
        return this._beacon;
    }

    // Return the value of the last timestamp sent by the device, if any
    imm_getLastTimeRef()
    {
        return this._lastTimeRef;
    }

    // Return the value of the last duration sent by the device, if any
    imm_getLastDuration()
    {
        return this._lastDuration;
    }


    imm_triggerLogPull()
    {
        if (this._logCallback == null || this._logIsPulling){
            return;
        }
        this._logIsPulling = true;
        let request = "GET logs.txt?pos=" + this._logpos;
        let prom = this._yapi.devRequest(this._rootUrl, request, null, 0);
        prom.then(async (yreq) => {
            if (yreq.errorType != YAPI_SUCCESS) {
                this._logIsPulling = false;
                return;
            }
            if (this._logCallback == null) {
                this._logIsPulling = false;
                return;
            }
            let resultStr = YAPI.imm_bin2str(yreq.bin_result);
            let pos = resultStr.lastIndexOf("\n@");
            if (pos < 0) {
                this._logIsPulling = false;
                return;
            }
            let logs = resultStr.substring(0, pos);
            let posStr = resultStr.substring(pos + 2);
            this._logpos = parseInt(posStr);
            let module = YModule.FindModuleInContext(this._yapi, this._serialNumber);
            let lines = logs.trim().split("\n");
            try {
                for (let i = 0; i < lines.length; i++) {
                    await this._logCallback(module, lines[i]);
                }
            } catch(e) {
                this._yapi.imm_log('Exception in device log callback:',e);
            }
            this._logIsPulling = false;
        });
    }

    imm_registerLogCallback(callback)
    {
        this._logCallback = callback;
        if (callback != null) {
            this.imm_triggerLogPull();
        }
    }

    /** Return the value of the last timestamp sent by the device, if any
     *
     * @param float_timestamp {number}
     * @param float_duration {number}
     */
    imm_setTimeRef(float_timestamp, float_duration)
    {
        this._lastTimeRef = float_timestamp;
        this._lastDuration = float_duration;
    }

    /** Return the hub-specific devYdx of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getDevYdx()
    {
        return this._devYdx;
    }

    /** Return a string that describes the device (serial number, logical name or root URL)
     *
     * @returns {string}
     */
    imm_describe()
    {
        var res = this._rootUrl;
        if(this._serialNumber != '') {
            res = this._serialNumber;
            if(this._logicalName != '') {
                res = res + ' (' + this._logicalName + ')';
            }
        }
        return this._productName+' '+res;
    }

    /** Update device cache and YAPI function lists from yp records
     *
     * @param obj_ypRecs {Object}
     */
    imm_updateFromYP(obj_ypRecs)
    {
        var funidx = 0;
        for(var categ in obj_ypRecs) {
            for(var key in obj_ypRecs[categ]) {
                var rec = obj_ypRecs[categ][key];
                var hwid = rec['hardwareId'];
                var dotpos = hwid.indexOf('.');
                if(hwid.substr(0,dotpos) == this._serialNumber) {
                    var funydx = rec['index'];
                    if(funydx == undefined) funydx = funidx;
                    this._functions[funydx] = [hwid.substr(dotpos+1), rec['logicalName']];
                    funidx++;
                }
            }
        }
    }

    /** Update device cache and YAPI function lists accordingly
     *
     * @param yreq {YHTTPRequest}
     * @param loadval {Object}
     */
    async updateFromReq(yreq, loadval)
    {
        this._cache._expiration = this._yapi.GetTickCount() + this._yapi.defaultCacheValidity;
        this._cache._json = yreq.bin_result;

        var func;
        var reindex = false;
        if(this._productName == '') {
            // parse module and function names for the first time
            for(func in loadval) {
                if(func == 'module') {
                    this._serialNumber = loadval.module.serialNumber;
                    this._logicalName  = loadval.module.logicalName;
                    this._productName  = loadval.module.productName;
                    this._productId    = loadval.module.productId;
                    this._beacon       = loadval.module.beacon;
                } else if(func == 'services') {
                    this.imm_updateFromYP(loadval.services.yellowPages);
                }
            }
            reindex = true;
        } else {
            // parse module and refresh names if needed
            var renamed = false;
            for(func in loadval) {
                if(func == 'module') {
                    if(this._logicalName != loadval.module.logicalName) {
                        this._logicalName = loadval.module.logicalName;
                        reindex = true;
                    }
                    this._beacon = loadval.module.beacon;
                } else if(func != 'services') {
                    var name = loadval[func]['logicalName'];
                    if(name == undefined) name = loadval.module.logicalName;
                    var pubval = loadval[func]['advertisedValue'];
                    if(pubval != undefined) {
                        await this._yapi.setFunctionValue(loadval.module.serialNumber+'.'+func, pubval);
                    }
                    var funydx;
                    for(funydx in this._functions) {
                        if(this._functions[funydx][0] == func) {
                            if(this._functions[funydx][1] != name) {
                                this._functions[funydx][1] = name;
                                reindex = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        if(reindex) {
            this._yapi.imm_reindexDevice(this);
        }
    }

    // Force the REST API string in cache to expire immediately
    imm_dropCache()
    {
        this._cache._expiration = 0;
        this._cache._precooked = {};
    }

    /** Retrieve the number of functions (beside "module") in the device
     *
     * @returns {Number}
     */
    imm_functionCount()
    {
        let funcPos = 0;
        for (let key in this._functions) {
            funcPos++;
        }
        return funcPos;
    }

    /** Retrieve the Id of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionId(int_idx)
    {
        let funcPos = 0;
        for (let key in this._functions) {
            if(int_idx === funcPos) {
                return this._functions[key][0];
            }
            funcPos++;
        }
        return '';
    }

    /** Retrieve the base type of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionBaseType(int_idx)
    {
        let funid = this.imm_functionId(int_idx);
        if(funid !== '') {
            let ftype = this._yapi.imm_getFunctionBaseType(this._serialNumber+'.'+funid);
            for (let baseType in Y_BASETYPES) {
                if (Y_BASETYPES[baseType] === ftype){
                    return baseType;
                }
            }
        }
        return 'Function';
    }

    /** Retrieve the type of the nth function (beside 'module') in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionType(int_idx)
    {
        let funid = this.imm_functionId(int_idx);
        if(funid !== '') {
            let i;
            for (i = 0; i < funid.length; i++) {
                if (funid[i] >= '0' && funid[i] <= '9') {
                    break;
                }
            }
            let functionType = funid[0].toUpperCase() + funid.substr(1, i - 1);
            return functionType;
        }
        return '';
    }

    /** Retrieve the logical name of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionName(int_idx)
    {
        let funcPos = 0;
        for (let key in this._functions) {
            if(int_idx === funcPos) {
                return this._functions[key][1];
            }
            funcPos++;
        }
        return '';
    }

    /** Retrieve the advertised value of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionValue(int_idx)
    {
        let funid = this.imm_functionId(int_idx);
        if(funid !== '') {
            return this._yapi.imm_getFunctionValue(this._serialNumber+'.'+funid);
        }
        return '';
    }

    /** Map an optimized JZON reply to a previously known JSON structure
     *
     * @param jzon {Object}
     * @param json {Object}
     * @returns {Object}
     */
    imm_jzon2json(jzon, json)
    {
        if(Array.isArray(jzon)) {
            let sz = jzon.length;
            if(Array.isArray(json)) {
                // Array in both sides
                let defval = (json.length > 0 ? json[0] : null);
                let res = [];
                for(let idx = 0; idx < sz; idx++) {
                    res[idx] = this.imm_jzon2json(jzon[idx], defval);
                }
                return res;
            } else if(typeof json === "object") {
                // Typical optimization case: array in jzon, struct in json
                let idx = 0;
                let res = {};
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        res[key] = this.imm_jzon2json(jzon[idx], json[key]);
                        idx++;
                    }
                }
                return res;
            } else {
                return jzon;
            }
        } else if(typeof jzon === "object") {
            if(Array.isArray(json)) {
                return jzon;
            } else if(typeof json === "object") {
                let defval = null;
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        defval = json[key];
                        break;
                    }
                }
                let res = {};
                for (let key in jzon) {
                    if (jzon.hasOwnProperty(key)) {
                        if (json.hasOwnProperty(key) && (!Array.isArray(json[key]) || json[key].length > 0)) {
                            res[key] = this.imm_jzon2json(jzon[key], json[key]);
                        } else {
                            res[key] = this.imm_jzon2json(jzon[key], defval);
                        }
                    }
                }
                return res;
            } else {
                return jzon;
            }
        }
        // Keep atomic JZON value as is
        return jzon;
    }

    /** Get the whole REST API string for a device, from cache if possible
     *
     * @param int_msValidity {number}
     * @returns {YHTTPRequest}
     */
    async requestAPI(int_msValidity)
    {
        if(this._cache._expiration > this._yapi.GetTickCount()) {
            let res = new YHTTPRequest(this._cache._json);
            res.obj_result = JSON.parse(JSON.stringify(this._cache._precooked));
            return res;
        }
        /** @type {YHTTPRequest} **/
        let req = 'GET /api.json';
        if(this._cache._precooked.module && this._cache._precooked.module.firmwareRelease) {
            req += '?fw='+encodeURIComponent(this._cache._precooked.module.firmwareRelease);
        }
        let yreq = await this._yapi.devRequest(this._rootUrl, req, null, 0);
        if(yreq.errorType != YAPI_SUCCESS) return yreq;
        if(!int_msValidity) {
            int_msValidity = this._yapi.defaultCacheValidity;
        }
        this._cache._expiration = this._yapi.GetTickCount() + int_msValidity;
        this._cache._json = yreq.bin_result;
        try {
            yreq.obj_result = JSON.parse(this._yapi.imm_bin2str(yreq.bin_result));
            if(Array.isArray(yreq.obj_result)) {
                if(this._cache._precooked) {
                    yreq.obj_result = this.imm_jzon2json(yreq.obj_result, this._cache._precooked);
                    if(yreq.obj_result.module &&
                        yreq.obj_result.module.serialNumber === this._cache._precooked.module.serialNumber &&
                        yreq.obj_result.module.firmwareRelease === this._cache._precooked.module.firmwareRelease) {
                        // Update text form for backward-compatibility (incl. save settings)
                        let jsonstr = JSON.stringify(yreq.obj_result);
                        this._cache._json = yreq.bin_result = this._yapi.imm_str2bin(jsonstr);
                        // Update precooked version in cache with a deep copy of the result
                        this._cache._precooked = JSON.parse(jsonstr);
                    } else {
                        // parse mismatch
                        this._cache._precooked = null;
                        yreq.errorType = YAPI_IO_ERROR;
                        yreq.errorMsg = 'Request failed, could not parse API JZON result for '+this._rootUrl;
                    }
                } else {
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = 'Request failed, could not parse API array result for '+this._rootUrl;
                }
            } else if(yreq.obj_result.module && yreq.obj_result.module.firmwareRelease) {
                // Store current structure in cache (deep copy)
                this._cache._precooked = JSON.parse(JSON.stringify(yreq.obj_result));
            }
        } catch(err) {
            yreq.errorType = YAPI_IO_ERROR;
            yreq.errorMsg = 'Request failed, could not parse API JSON result for '+this._rootUrl;
        }
        return yreq;
    }

    /** Reload a device API (store in cache), and update YAPI function lists accordingly
     *
     * @returns {number}
     */
    async refresh()
    {
        /** @type {YHTTPRequest} **/
        let yreq = await this.requestAPI(this._yapi.defaultCacheValidity);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        await this.updateFromReq(yreq, yreq.obj_result);
        return YAPI_SUCCESS;
    }
}

/**
 * YFirmwareFile Class: Object describing a loaded firmware file
 */
class YFirmwareFile
{
    constructor(path, serial, pictype, product, firmware, prog_version,
                ROM_nb_zone, FLA_nb_zone, ROM_total_size, FLA_total_size, data, zone_ofs)
    {
        /** @member {string} **/
        this._path = path;
        /** @member {string} **/
        this._serial = serial;
        /** @member {string} **/
        this._pictype = pictype;
        /** @member {string} **/
        this._product = product;
        /** @member {string} **/
        this._firmware = firmware;
        /** @member {string} **/
        this._prog_version = prog_version;
        /** @member {number} **/
        this._ROM_nb_zone = ROM_nb_zone;
        /** @member {number} **/
        this._FLA_nb_zone = FLA_nb_zone;
        /** @member {number} **/
        this._ROM_total_size = ROM_total_size;
        /** @member {number} **/
        this._FLA_total_size = FLA_total_size;
        /** @member {Uint8Array} **/
        this._data = data;
        /** @member {number} **/
        this._zone_ofs = zone_ofs;
    }

    /**
     * Parse the binary buffer provided as input and initialize a new object
     * returns null if the file is not a valid firmware
     *
     * @param path {string}
     * @param data {Uint8Array}
     * @param force {boolean}
     * @return {YFirmwareFile|null}
     */
    static imm_Parse(path, data, force)
    {
        const BYN_REV_V4 = 4;
        const BYN_REV_V5 = 5;
        const BYN_REV_V6 = 6;
        const MAX_ROM_ZONES_PER_FILES = 16;
        const MAX_FLASH_ZONES_PER_FILES = 4;
        const BYN_HEAD_SIZE_V4 = (96 + 8);
        const BYN_HEAD_SIZE_V5 = (96 + 32);
        const BYN_HEAD_SIZE_V6 = (96 + 48);
        const BYN_MD5_OFS_V6 = (96 + 16);
        let pos = 0;

        let getShort = (() => {
            let res = data[pos] + (data[pos+1] << 8);
            pos += 2;
            return res;
        });
        let getInt = (() => {
            let res = data[pos] + (data[pos+1] << 8) + (data[pos+2] << 16) + (data[pos+3] << 24);
            pos += 4;
            return res;
        });
        let getString = ((maxlen) => {
            let end = pos+maxlen;
            while(end > pos && data[end-1] == 0) end--;
            let res = YAPI.imm_bin2str(data.subarray(pos,end));
            pos += maxlen;
            return res;
        });

        let sign = getString(4);
        if(sign != 'BYN') return null;
        let rev = getShort();
        let serial = getString(20);
        let pictype = getString(20);
        let product = getString(28);
        let firmware = getString(22);
        if (serial.length >= 20) return null;
        if (product.length >= 28) return null;
        if (firmware.length >= 22) return null;

        let ROM_nb_zone = 0;
        let FLA_nb_zone = 0;
        let ROM_total_size = 0;
        let FLA_total_size = 0;
        let prog_buf;
        let prog_version = "";
        let zone_ofs;
        let datasize;
        switch (rev) {
            case BYN_REV_V4:
                zone_ofs = BYN_HEAD_SIZE_V4;
                ROM_nb_zone = getInt();
                datasize = getInt();
                if (ROM_nb_zone > MAX_ROM_ZONES_PER_FILES) return null;
                if (datasize != data.length - BYN_HEAD_SIZE_V4) return null;
                break;
            case BYN_REV_V5:
                zone_ofs = BYN_HEAD_SIZE_V5;
                prog_version = getString(22);
                if(!force && !YFirmwareFile.imm_progCompatible(prog_version)) return null;
                getShort(); //skip pad
                ROM_nb_zone = getInt();
                datasize = getInt();
                if (ROM_nb_zone > MAX_ROM_ZONES_PER_FILES) return null;
                if (datasize != data.length - BYN_HEAD_SIZE_V5) return null;
                break;
            case BYN_REV_V6:
                zone_ofs = BYN_HEAD_SIZE_V6;
                let md5hdr = data.subarray(pos, pos + 16);
                pos += 16;
                let md5hdrstr = YAPI.imm_bin2hexstr(md5hdr);
                let md5ctx = new Y_MD5Ctx();
                md5ctx.addData(data.subarray(BYN_MD5_OFS_V6));
                let md5bynstr  = YAPI.imm_bin2hexstr(md5ctx.calculate());
                if(md5hdrstr != md5bynstr) {
                    YAPI.imm_log('Invalid firmware image signature, file is corrupt');
                    if(YAPI._logLevel >= 2) {
                        YAPI.imm_log('hdr MD5: '+md5hdrstr);
                        YAPI.imm_log('byn MD5: '+md5bynstr);
                        YAPI.imm_log('byn size: '+data.length);                        
                    }
                    return null;
                }
                prog_version = getString(22);
                if(!force && !YFirmwareFile.imm_progCompatible(prog_version)) return null;
                ROM_nb_zone = data[pos++];
                FLA_nb_zone = data[pos++];
                ROM_total_size = getInt();
                FLA_total_size = getInt();
                if (ROM_nb_zone > MAX_ROM_ZONES_PER_FILES) return null;
                if (FLA_nb_zone > MAX_FLASH_ZONES_PER_FILES) return null;
                break;
            default:
                return null;
        }
        return new YFirmwareFile(path, serial, pictype, product, firmware, prog_version,
            ROM_nb_zone, FLA_nb_zone, ROM_total_size, FLA_total_size, data, zone_ofs);
    }

    static imm_progCompatible(prog_version)
    {
        if (prog_version == '') return true;

        let apiVer = YAPI.imm_GetAPIVersion();
        let dashpos = apiVer.indexOf('-');
        if(dashpos > 0) {
            apiVer = apiVer.slice(0,dashpos);
        }
        apiVer = apiVer.slice(apiVer.lastIndexOf('.')+1);
        if(parseInt(prog_version) > parseInt(apiVer)) {
            YAPI.imm_log('checkProgField: byn='+prog_version+' api='+apiVer);
            return false;
        }
        return true;
    }

    imm_getSerial()
    {
        return this._serial;
    }

    imm_getPictype()
    {
        return this._pictype;
    }

    imm_getProduct()
    {
        return this._product;
    }

    imm_getFirmwareRelease()
    {
        return this._firmware;
    }

    imm_getFirmwareReleaseAsInt()
    {
        return parseInt(this._firmware);
    }

    imm_getProg_version()
    {
        return this._prog_version;
    }

    imm_getROM_nb_zone()
    {
        return this._ROM_nb_zone;
    }

    imm_getFLA_nb_zone()
    {
        return this._FLA_nb_zone;
    }

    imm_getROM_total_size()
    {
        return this._ROM_total_size;
    }

    imm_getFLA_total_size()
    {
        return this._FLA_total_size;
    }

    imm_getData()
    {
        return this._data;
    }

    imm_getPath()
    {
        return this._path;
    }
}

YoctoLibExport('YFirmwareFile', YFirmwareFile);

//--- (generated code: YFirmwareUpdate definitions)
//--- (end of generated code: YFirmwareUpdate definitions)

//--- (generated code: YFirmwareUpdate class start)
/**
 * YFirmwareUpdate Class: Control interface for the firmware update process
 *
 * The YFirmwareUpdate class let you control the firmware update of a Yoctopuce
 * module. This class should not be instantiate directly, instead the method
 * updateFirmware should be called to get an instance of YFirmwareUpdate.
 */
//--- (end of generated code: YFirmwareUpdate class start)
class YFirmwareUpdate
{
    constructor(obj_yapi, str_serial, str_path, bin_settings, bool_force)
    {
        /** @member {YAPIContext} **/
        this._yapi                       = obj_yapi;
        //--- (generated code: YFirmwareUpdate constructor)
        /** @member {string} **/
        this._serial                     = '';
        /** @member {Uint8Array} **/
        this._settings                   = new Uint8Array(0);
        /** @member {string} **/
        this._firmwarepath               = '';
        /** @member {string} **/
        this._progress_msg               = '';
        /** @member {number} **/
        this._progress_c                 = 0;
        /** @member {number} **/
        this._progress                   = 0;
        /** @member {number} **/
        this._restore_step               = 0;
        /** @member {boolean} **/
        this._force                      = 0;
        //--- (end of generated code: YFirmwareUpdate constructor)
        /** @member {string} **/
        this._serial                     = str_serial;
        /** @member {string} **/
        this._firmwarepath               = str_path;
        /** @member {Uint8Array} **/
        this._settings                   = bin_settings;
        /** @member {boolean} **/
        this._force                      = bool_force;
    }

    static async _downloadfile(path)
    {
        if(YAPI._isNodeJS) {
            // Node.js version
            let httpPromise = new Promise((resolve, reject) => {
                let http = YAPI._nodeRequire('http');
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
            return httpPromise;
        } else {
            // browser version
            let httpPromise = new Promise((resolve, reject) => {
                let httpRequest = new XMLHttpRequest();
                httpRequest.open('GET', path, true);
                httpRequest.overrideMimeType('text/plain; charset=x-user-defined');
                httpRequest.onreadystatechange = (() => {
                    if (httpRequest.readyState == 4) {
                        if(httpRequest.status != 200 && httpRequest.status != 304) {
                            if(httpRequest.statusCode) {
                                reject(new Error('HTTP error ' + httpRequest.statusCode));
                            } else {
                                reject(new Error('Unable to complete HTTP request, network down?'))
                            }
                        } else {
                            resolve(YAPI.imm_str2bin(httpRequest.responseText));
                        }
                    }
                });
                httpRequest.send('');
            });
            return httpPromise;
        }
    }

    static async _loadfile(file)
    {
        if(YAPI._isNodeJS) {
            // Node.js version
            let filePromise = new Promise((resolve, reject) => {
                let fs = YAPI._nodeRequire('fs');
                fs.readFile(file, (err, data) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(new Uint8Array(data));
                    }
                });
            });
            return filePromise;
        } else {
            // browser version
            let filePromise = new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onerror = function (evt) {
                    reject(evt.target.error);
                };
                reader.onload = function (evt) {
                    resolve(new Uint8Array(evt.target.result));
                };
                reader.readAsArrayBuffer(file);
            });
            return filePromise;
        }
    }

    imm_progress(progress, msg)
    {
        this._progress = progress;
        this._progress_msg = msg;
    }

    async _processMore_internal(newupdate)
    {
        if(!newupdate) return;

        /** @type {Uint8Array} **/
        let bytes;

        this.imm_progress(0, 'Firmware update started');
        if (typeof this._firmwarepath == 'string' && this._firmwarepath.indexOf('yoctopuce.com') >= 0) {
            this.imm_progress(1, 'Downloading firmware');
            bytes = await YFirmwareUpdate._downloadfile(this._firmwarepath);
        } else {
            this.imm_progress(1, 'Loading firmware');
            bytes = await YFirmwareUpdate._loadfile(this._firmwarepath);
        }
        /** @type {YFirmwareFile} **/
        let firmware = YFirmwareFile.imm_Parse(this._firmwarepath, bytes, this._force);

        //5% -> 10%
        this.imm_progress(5, 'Check if module is already in bootloader');
        /** @type {YGenericHub} **/
        let hub = null;
        /** @type {YModule} **/
        let module = YModule.FindModuleInContext(this._yapi, this._serial + '.module');
        if (await module.isOnline()) {
            let dev = this._yapi.imm_getDevice(this._serial);
            let baseUrl = dev.imm_getRootUrl();
            let byPos = baseUrl.indexOf('/bySerial/');
            if(byPos >= 0) baseUrl = baseUrl.slice(0, byPos+1);
            else if (baseUrl.slice(-1) != '/') baseUrl = baseUrl + '/';
            let urlInfo = this._yapi.imm_parseRegisteredUrl(baseUrl);
            hub = this._yapi.imm_getHub(urlInfo);
        } else {
            // test if already in bootloader
            let hubs = this._yapi._hubs;
            for(let i = 0; i < hubs.length; i++) {
                let ldrs = await hubs[i].getBootloaders();
                if(ldrs.indexOf(this._serial) >= 0) {
                    hub = hubs[i];
                    break;
                }
            }
        }
        if (hub == null) {
            this.imm_progress(-1, 'Device ' + this._serial + ' is not detected');
            this._yapi._throw(YAPI.DEVICE_NOT_FOUND, 'Device ' + this._serial + ' is not detected', null);
            return;
        }

        try {
            await hub.firmwareUpdate(this._serial, firmware, this._settings, (percent, msg) => {
                this.imm_progress(5 + parseInt((percent*80+50)/100), msg);
            });
        } catch(e) {
            this.imm_progress(-1, e.message);
            this._yapi._throw(YAPI.IO_ERROR, e.message, null);
            return;
        }
        this.imm_progress(80, 'Wait for the device to restart');
        let timeout = this._yapi.GetTickCount() + 60000;
        await module.clearCache();
        while (!(await module.isOnline()) && timeout > this._yapi.GetTickCount()) {
            let errmsg = new YErrorMsg();
            await this._yapi.Sleep(500, errmsg);
            await this._yapi.UpdateDeviceList();
        }
        if (await module.isOnline()) {
            if (this._settings!=null) {
                this.imm_progress(95, 'Restoring device settings');
                await module.set_allSettingsAndFiles(this._settings);
                await module.saveToFlash();
            }
            let real_fw = await module.get_firmwareRelease();
            if (real_fw == firmware.imm_getFirmwareRelease()) {
                this.imm_progress(100, 'Success');
            } else {
                this.imm_progress(-1, 'Unable to update firmware');
            }
        } else {
            this.imm_progress(-1, 'Device did not reboot correctly');
        }
    }

    static async checkFirmware_r(file, serial_base, force)
    {
        if(YAPI._isNodeJS) {
            // Node.js can recurse into directory
            let fs = YAPI._nodeRequire('fs');
            let stats = fs.statSync(file);
            if(stats.isDirectory()) {
                let dirPromise = new Promise((resolve, reject) => {
                    let join = YAPI._nodeRequire('path').join;
                    let dir = file;
                    fs.readdir(dir, (err, files) => {
                        if(err) resolve(null);
                        let tasks = files.map((fname) => {
                            // intentionally return a promise here!
                            return YFirmwareUpdate.checkFirmware_r(join(dir, fname), serial_base, force)
                        });
                        Promise.all(tasks).then((results) => {
                            let bestFirmware = null;
                            results.forEach((firmware) => {
                                if (!firmware) return;
                                if (!bestFirmware || bestFirmware.imm_getFirmwareReleaseAsInt() < firmware.imm_getFirmwareReleaseAsInt()) {
                                    bestFirmware = firmware;
                                }
                            });
                            resolve(bestFirmware);
                        });
                    });
                });
                return dirPromise;
            } else if(!stats.isFile()) {
                return null;
            }
        }
        // common version: load from a single file
        if(file.substr(-4).toLowerCase() != '.byn') return null;
        let bynfile = await YFirmwareUpdate._loadfile(file);
        let firmware = YFirmwareFile.imm_Parse(file, bynfile, force);
        if(!firmware) return null;
        if(firmware.imm_getSerial().slice(0,serial_base.length) != serial_base) return null;
        return firmware;
    }

    /**
     * Test if the byn file is valid for this module. It is possible to pass a directory instead of a file.
     * In that case, this method returns the path of the most recent appropriate byn file. This method will
     * ignore any firmware older than minrelease.
     *
     * @param serial {string} : the serial number of the module to update
     * @param path {string} : the path of a byn file or a directory that contains byn files
     * @param minrelease {number} : a positive integer
     * @param force {boolean} : true to force an update even if the API is below expected revision
     *
     * @return {string} : the path of the byn file to use, or an empty string if no byn files matches the requirement
     *
     * On failure, returns a string that starts with "error:".
     */
    static async CheckFirmwareEx(serial,path,minrelease,force)
    {
        let link = '';
        let best_rev = 0;
        let current_rev;

        if (typeof path == 'string' && path.indexOf('yoctopuce.com') >= 0) {
            try {
                let data = await YFirmwareUpdate._downloadfile('http://www.yoctopuce.com/FR/common/getLastFirmwareLink.php?serial=' + serial);
                let obj = JSON.parse(YAPI.imm_bin2str(data));
                link = obj['link'];
                best_rev = obj['version'];
            } catch (e) {
                YAPI.imm_log('failed to retrieve firmware information from www.yoctopuce.com', e);
                YAPI._throw(YAPI_IO_ERROR, 'failed to retrieve firmware information from www.yoctopuce.com', '');
                return '';
            }
        } else {
            /** @type {YFirmwareFile} **/
            let firmware = await YFirmwareUpdate.checkFirmware_r(path, serial.substring(0, 8), force);
            if (firmware != null) {
                best_rev = firmware.imm_getFirmwareReleaseAsInt();
                link = firmware.imm_getPath();
            }
        }
        if (minrelease != 0) {
            if (minrelease < best_rev)
                return link;
            else
                return '';
        }
        return link;
    }


    static async CheckFirmware_internal(serial, path, minrelease)
    {
        return await YFirmwareUpdate.CheckFirmwareEx(serial,path,minrelease,false);
    }

    static async GetAllBootLoadersInContext_internal(yctx)
    {
        let hubs = yctx._hubs;
        let res = [];

        for(let i = 0; i < hubs.length; i++) {
            let ldrs = await hubs[i].getBootloaders();
            for(let j = 0; j < ldrs.length; j++) {
                res.push(ldrs[j]);
            }
        }
        return res;
    }

    static async GetAllBootLoaders_internal()
    {
        return YFirmwareUpdate.GetAllBootLoadersInContext(YAPI);
    }

    //--- (generated code: YFirmwareUpdate implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    async _processMore(newupdate)
    {
        return await this._processMore_internal(newupdate);
    }

    /**
     * Returns a list of all the modules in "firmware update" mode. Only devices
     * connected over USB are listed. For devices connected to a YoctoHub, you
     * must connect yourself to the YoctoHub web interface.
     *
     * @return {string[]} an array of strings containing the serial numbers of devices in "firmware update" mode.
     */
    static async GetAllBootLoaders()
    {
        return await this.GetAllBootLoaders_internal();
    }

    /**
     * Returns a list of all the modules in "firmware update" mode. Only devices
     * connected over USB are listed. For devices connected to a YoctoHub, you
     * must connect to the YoctoHub web interface.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {string[]} an array of strings containing the serial numbers of devices in "firmware update" mode.
     */
    static async GetAllBootLoadersInContext(yctx)
    {
        return await this.GetAllBootLoadersInContext_internal(yctx);
    }

    /**
     * Test if the byn file is valid for this module. It is possible to pass a directory instead of a file.
     * In that case, this method returns the path of the most recent appropriate byn file. This method will
     * ignore any firmware older than minrelease.
     *
     * @param serial {string} : the serial number of the module to update
     * @param path {string} : the path of a byn file or a directory that contains byn files
     * @param minrelease {number} : a positive integer
     *
     * @return {string} : the path of the byn file to use, or an empty string if no byn files matches the requirement
     *
     * On failure, returns a string that starts with "error:".
     */
    static async CheckFirmware(serial,path,minrelease)
    {
        return await this.CheckFirmware_internal(serial,path,minrelease);
    }

    /**
     * Returns the progress of the firmware update, on a scale from 0 to 100. When the object is
     * instantiated, the progress is zero. The value is updated during the firmware update process until
     * the value of 100 is reached. The 100 value means that the firmware update was completed
     * successfully. If an error occurs during the firmware update, a negative value is returned, and the
     * error message can be retrieved with get_progressMessage.
     *
     * @return {number} an integer in the range 0 to 100 (percentage of completion)
     *         or a negative error code in case of failure.
     */
    async get_progress()
    {
        if (this._progress >= 0) {
            await this._processMore(0);
        }
        return this._progress;
    }

    /**
     * Returns the last progress message of the firmware update process. If an error occurs during the
     * firmware update process, the error message is returned
     *
     * @return {string} a string  with the latest progress message, or the error message.
     */
    async get_progressMessage()
    {
        return this._progress_msg;
    }

    /**
     * Starts the firmware update process. This method starts the firmware update process in background. This method
     * returns immediately. You can monitor the progress of the firmware update with the get_progress()
     * and get_progressMessage() methods.
     *
     * @return {number} an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure returns a negative error code.
     */
    async startUpdate()
    {
        /** @type {string} **/
        let err;
        /** @type {number} **/
        let leng;
        err = this._yapi.imm_bin2str(this._settings);
        leng = (err).length;
        if ((leng >= 6) && ('error:' == (err).substr(0, 6))) {
            this._progress = -1;
            this._progress_msg = (err).substr( 6, leng - 6);
        } else {
            this._progress = 0;
            this._progress_c = 0;
            await this._processMore(1);
        }
        return this._progress;
    }

    //--- (end of generated code: YFirmwareUpdate implementation)
}


//--- (generated code: YFunction class start)
/**
 * YFunction Class: Common function interface
 *
 * This is the parent class for all public objects representing device functions documented in
 * the high-level programming API. This abstract class does all the real job, but without
 * knowledge of the specific function attributes.
 *
 * Instantiating a child class of YFunction does not cause any communication.
 * The instance simply keeps track of its function identifier, and will dynamically bind
 * to a matching device at the time it is really being used to read or set an attribute.
 * In order to allow true hot-plug replacement of one device by another, the binding stay
 * dynamic through the life of the object.
 *
 * The YFunction class implements a generic high-level cache for the attribute values of
 * the specified function, pre-parsed from the REST API string.
 */
//--- (end of generated code: YFunction class start)
class YFunction
{
    constructor(obj_yapi, str_func)
    {
        // private
        /** @member {YAPIContext} **/
        this._yapi                       = obj_yapi;
        /** @member {string} **/
        this._className                  = 'Function';
        /** @member {string} **/
        this._func                       = str_func;
        /** @member {number} **/
        this._lastErrorType              = YAPI_SUCCESS;
        /** @member {string} **/
        this._lastErrorMsg               = 'no error';
        /** @member {Object} **/
        this._dataStreams                = {};
        /** @member {Object} **/
        this._userData                   = null;
        /** @member {Object} **/
        this._cache                      = {_expiration:0};

        // copy class constants to the instance
        let consts = this.constructor.imm_Const();
        for(let key in consts) {
            this[key] = consts[key];
        }

        //--- (generated code: YFunction constructor)
        /** @member {string} **/
        this._logicalName                = YFunction.LOGICALNAME_INVALID;
        /** @member {string} **/
        this._advertisedValue            = YFunction.ADVERTISEDVALUE_INVALID;
        /** @member {function} **/
        this._valueCallbackFunction      = null;
        /** @member {number} **/
        this._cacheExpiration            = 0;
        /** @member {string} **/
        this._serial                     = '';
        /** @member {string} **/
        this._funId                      = '';
        /** @member {string} **/
        this._hwId                       = '';
        //--- (end of generated code: YFunction constructor)
    }

    _throw(int_errType, str_errMsg, obj_retVal)
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    static imm_Init()
    {
        YFunction.imm_InitStatics(this);
    }

    static imm_InitStatics(clas)
    {
        // copy class constants to the class object
        if (typeof(clas.imm_Const) === 'undefined')
            return;
        let consts = clas.imm_Const();
        for(let key in consts) {
            clas[key] = consts[key];
        }
        // Within a browser, also publish Y_ shortcuts
        if(typeof window != 'undefined') {
            for(let key in consts) {
                YoctoLibExport('Y_'+key, consts[key]);
            }
        }
    }

    async get_syncProxy()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            try {
                await this.load(this._yapi.defaultCacheValidity);
            } catch(e) {
                // device might be offline
            }
        }
        let res = new (YoctoLibGlobal(this.constructor.name+'Proxy'))(this);
        await res._asyncInit();
        res._module = await (await this.module()).get_syncProxy();
        return res;
    }


    async isReadOnly_internal()
    {
        try {
            let serial = await this.get_serialNumber();
            return this._yapi.isReadOnly(serial);
        } catch (e) {
            return true;
        }
    }
    //--- (generated code: YFunction implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case '_expiration':
            this._cacheExpiration = val;
            return 1;
        case 'logicalName':
            this._logicalName = val;
            return 1;
        case 'advertisedValue':
            this._advertisedValue = val;
            return 1;
        }
        return 0;
    }

    /**
     * Returns the logical name of the function.
     *
     * @return {string} a string corresponding to the logical name of the function
     *
     * On failure, throws an exception or returns YFunction.LOGICALNAME_INVALID.
     */
    async get_logicalName()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YFunction.LOGICALNAME_INVALID;
            }
        }
        res = this._logicalName;
        return res;
    }

    /**
     * Changes the logical name of the function. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the logical name of the function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_logicalName(newval)
    {
        /** @type {string} **/
        let rest_val;
        if (!await this._yapi.CheckLogicalName(newval)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Invalid name :' + newval, this._yapi.INVALID_ARGUMENT);
        }
        rest_val = newval;
        return await this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns a short string representing the current state of the function.
     *
     * @return {string} a string corresponding to a short string representing the current state of the function
     *
     * On failure, throws an exception or returns YFunction.ADVERTISEDVALUE_INVALID.
     */
    async get_advertisedValue()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YFunction.ADVERTISEDVALUE_INVALID;
            }
        }
        res = this._advertisedValue;
        return res;
    }

    async set_advertisedValue(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('advertisedValue',rest_val);
    }

    /**
     * Retrieves a function for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the function
     *
     * @return {YFunction} a YFunction object allowing you to drive the function.
     */
    static FindFunction(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Function', func);
        if (obj == null) {
            obj = new YFunction(YAPI, func);
            YFunction._AddToCache('Function',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a function for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the function
     *
     * @return {YFunction} a YFunction object allowing you to drive the function.
     */
    static FindFunctionInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Function', func);
        if (obj == null) {
            obj = new YFunction(yctx, func);
            YFunction._AddToCache('Function',  func, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback {function} : the callback function to call, or a null pointer. The callback
     * function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    async registerValueCallback(callback)
    {
        /** @type {string} **/
        let val;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackFunction = callback;
        // Immediately invoke value callback with current value
        if (callback != null && await this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == '')) {
                await this._invokeValueCallback(val);
            }
        }
        return 0;
    }

    async _invokeValueCallback(value)
    {
        if (this._valueCallbackFunction != null) {
            try {
                await this._valueCallbackFunction(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
        }
        return 0;
    }

    /**
     * Disables the propagation of every new advertised value to the parent hub.
     * You can use this function to save bandwidth and CPU on computers with limited
     * resources, or to prevent unwanted invocations of the HTTP callback.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async muteValueCallbacks()
    {
        return await this.set_advertisedValue('SILENT');
    }

    /**
     * Re-enables the propagation of every new advertised value to the parent hub.
     * This function reverts the effect of a previous call to muteValueCallbacks().
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async unmuteValueCallbacks()
    {
        return await this.set_advertisedValue('');
    }

    /**
     * Returns the current value of a single function attribute, as a text string, as quickly as
     * possible but without using the cached value.
     *
     * @param attrName {string} : the name of the requested attribute
     *
     * @return {string} a string with the value of the the attribute
     *
     * On failure, throws an exception or returns an empty string.
     */
    async loadAttribute(attrName)
    {
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let attrVal;
        url = 'api/'+await this.get_functionId()+'/'+attrName;
        attrVal = await this._download(url);
        return this._yapi.imm_bin2str(attrVal);
    }

    /**
     * Test if the function is readOnly. Return true if the function is write protected
     * or that the function is not available.
     *
     * @return {boolean} true if the function is readOnly or not online.
     */
    async isReadOnly()
    {
        return await this.isReadOnly_internal();
    }

    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return {string} a string corresponding to the serial number of the module, as set by the factory.
     *
     * On failure, throws an exception or returns YModule.SERIALNUMBER_INVALID.
     */
    async get_serialNumber()
    {
        /** @type {YModule} **/
        let m;
        m = await this.get_module();
        return await m.get_serialNumber();
    }

    async _parserHelper()
    {
        return 0;
    }

    /**
     * Returns the next Function
     *
     * @returns {YFunction}
     */
    nextFunction()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YFunction.FindFunctionInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first Function in a YAPI context
     *
     * @returns {YFunction}
     */
    static FirstFunction()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Function');
        if(next_hwid == null) return null;
        return YFunction.FindFunction(next_hwid);
    }

    /**
     * Retrieves the first Function in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YFunction}
     */
    static FirstFunctionInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Function');
        if(next_hwid == null) return null;
        return YFunction.FindFunctionInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return {
            FUNCTIONDESCRIPTOR_INVALID   : YAPI_INVALID_STRING,
            HARDWAREID_INVALID           : YAPI_INVALID_STRING,
            FUNCTIONID_INVALID           : YAPI_INVALID_STRING,
            FRIENDLYNAME_INVALID         : YAPI_INVALID_STRING,
            LOGICALNAME_INVALID          : YAPI_INVALID_STRING,
            ADVERTISEDVALUE_INVALID      : YAPI_INVALID_STRING
        };
    }

    //--- (end of generated code: YFunction implementation)

    /** Retrieve a function instance from cache
     *
     * @param yctx {YAPIContext}
     * @param className {string}
     * @param func {string}
     * @returns {YFunction}
     */
    static _FindFromCacheInContext(yctx, className, func)
    {
        return yctx.imm_getFunction(className, func);
    }

    /** Retrieve a function instance from cache
     *
     * @param className {string}
     * @param func {string}
     * @returns {YFunction}
     */
    static _FindFromCache(className, func)
    {
        return YAPI.imm_getFunction(className, func);
    }

    /** Add a function instance to cache
     *
     * @param className {string}
     * @param func {string}
     * @param obj {YFunction}
     */
    static _AddToCache(className, func, obj)
    {
        obj._yapi.imm_setFunction(className, func, obj);
    }

    /** Clear the function instance cache
     *
     * @param obj_yapi {YAPIContext}
     */
    static _ClearCache(obj_yapi)
    {
        if(!obj_yapi) obj_yapi = YAPI;
        obj_yapi.imm_init();
    }

    /** Add or remove a value change callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    static async _UpdateValueCallbackList(obj_func, bool_add)
    {
        await obj_func._yapi._UpdateValueCallbackList(obj_func, bool_add);
    }

    /** Add or remove a timed report callback
     *
     * @param obj_func {YSensor}
     * @param bool_add {Boolean}
     */
    static async _UpdateTimedReportCallbackList(obj_func, bool_add)
    {
        await obj_func._yapi._UpdateTimedReportCallbackList(obj_func, bool_add);
    }

    /**
     * Returns a short text that describes unambiguously the instance of the function in the form
     * TYPE(NAME)=SERIAL&#46;FUNCTIONID.
     * More precisely,
     * TYPE       is the type of the function,
     * NAME       it the name used for the first access to the function,
     * SERIAL     is the serial number of the module if the module is connected or "unresolved", and
     * FUNCTIONID is  the hardware identifier of the function if the module is connected.
     * For example, this method returns Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1 if the
     * module is already connected or Relay(BadCustomeName.relay1)=unresolved if the module has
     * not yet been connected. This method does not trigger any USB or TCP transaction and can therefore be used in
     * a debugger.
     *
     * @return {string} a string that describes the function
     *         (ex: Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1)
     */
    async describe()
    {
        if(this._hwId != '') {
            return this._className+'('+this._func+')='+this._hwId;
        }
        var resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS && resolve.result != this._func) {
            return this._className+'('+this._func+')=unresolved';
        }
        return this._className+'('+this._func+')='+resolve.result;
    }

    /**
     * Returns the unique hardware identifier of the function in the form SERIAL.FUNCTIONID.
     * The unique hardware identifier is composed of the device serial
     * number and of the hardware identifier of the function (for example RELAYLO1-123456.relay1).
     *
     * @return {string} a string that uniquely identifies the function (ex: RELAYLO1-123456.relay1)
     *
     * On failure, throws an exception or returns  YFunction.HARDWAREID_INVALID.
     */
    async get_hardwareId()
    {
        if(this._hwId != '') {
            return this._hwId;
        }
        var resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            await this.isOnline();
            resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, YFunction.HARDWAREID_INVALID);
            }
        }
        return resolve.result;
    }

    /**
     * Returns the hardware identifier of the function, without reference to the module. For example
     * relay1
     *
     * @return {string} a string that identifies the function (ex: relay1)
     *
     * On failure, throws an exception or returns  YFunction.FUNCTIONID_INVALID.
     */
    async get_functionId()
    {
        if(this._funId != '') {
            return this._funId;
        }
        var resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            await this.isOnline();
            resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, YFunction.FUNCTIONID_INVALID);
            }
        }
        var pos = resolve.result.indexOf('.');
        return resolve.result.substr(pos+1);
    }

    imm_get_functionId()
    {
        if(this._funId != '') {
            return this._funId;
        }
        var resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            return this._throw(resolve.errorType, resolve.errorMsg, YFunction.FUNCTIONID_INVALID);
        }
        var pos = resolve.result.indexOf('.');
        return resolve.result.substr(pos+1);
    }

    /**
     * Returns a global identifier of the function in the format MODULE_NAME&#46;FUNCTION_NAME.
     * The returned string uses the logical names of the module and of the function if they are defined,
     * otherwise the serial number of the module and the hardware identifier of the function
     * (for example: MyCustomName.relay1)
     *
     * @return {string} a string that uniquely identifies the function using logical names
     *         (ex: MyCustomName.relay1)
     *
     * On failure, throws an exception or returns  YFunction.FRIENDLYNAME_INVALID.
     */
    async get_friendlyName()
    {
        var resolve = this._yapi.imm_getFriendlyNameFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            await this.isOnline();
            resolve = this._yapi.imm_getFriendlyNameFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, YFunction.FRIENDLYNAME_INVALID);
            }
        }
        return resolve.result;
    }


    /** Store and parse a an API request for current function
     *
     * @param {YFuncRequest} yreq
     * @param {number} msValidity
     */
    async _parse(yreq, msValidity)
    {
        // save the whole structure for backward-compatibility
        yreq.obj_result['_expiration'] = this._yapi.GetTickCount() + msValidity;
        this._serial = yreq.obj_result.deviceid;
        this._funId  = yreq.obj_result.functionid;
        this._hwId   = yreq.obj_result.hwid;
        this._cache  = yreq.obj_result;
        // process each attribute in turn for class-oriented processing
        for(let key in yreq.obj_result) {
            this.imm_parseAttr(key, yreq.obj_result[key]);
        }
        await this._parserHelper();
    }

    // Helper for initializing standard attributes (used in particular by built-in classes)
    async _i()
    {
        /** @type {Array} **/
        let arr_attrNames = this.constructor._attrList;
        this._className = this.constructor.name.slice(1);
        for(let i = 0; i < arr_attrNames.length; i++) {
            this['_'+arr_attrNames[i]] = this.constructor[arr_attrNames[i].toUpperCase()+'_INVALID'];
        }
    }

    // Helper for simple accessors (used in particular by built-in classes)
    async _g(str_attr)
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return this.constructor[str_attr.toLocaleUpperCase()+'_INVALID'];
            }
        }
        return this['_'+str_attr];
    }

    // Helper for simple accessors (used in particular by built-in classes)
    async _s(str_attr, obj_val)
    {
        return await this._setAttr(str_attr, String(obj_val));
    }

    // Helper for completing and exporting the class; used by built-in classes
    static _E(arr_attrlist)
    {
        let className = this.name.slice(1);
        YoctoLibExport(this.name, this);
        this._attrList = arr_attrlist;
        for(let i = 0; i < arr_attrlist.length; i++) {
            let attrname = arr_attrlist[i];
            let getMethod = 'get_'+attrname;
            this.prototype[getMethod] = async function() { return await this._g(attrname); };
        }
        this['Find'+className] = function(func) {
            /** @type {string} **/
            let str_classname = this.name.slice(1);
            /** @type {YFunction} **/
            let obj;
            obj = YFunction._FindFromCache(str_classname, func);
            if (obj == null) {
                obj = new this(YAPI, func);
                YFunction._AddToCache(str_classname, func, obj);
            }
            return obj;
        };
        this['First'+className] = function() {
            /** @type {string} **/
            let str_classname = this.name.slice(1);
            /** @type {string|null} **/
            let next_hwid = YAPI.imm_getFirstHardwareId(str_classname);
            if(next_hwid == null) return null;
            return this['Find'+className](next_hwid);
        };
        this.prototype['next'+className] = function() {
            /** @type {object} **/
            let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI.SUCCESS) return null;
            /** @type {string|null} **/
            let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
            if(next_hwid == null) return null;
            return this.constructor['Find'+className](next_hwid);
        };
        this.imm_Init();
    }

    // Backward-compatibility helper
    isOnline_async(func, ctx)
    {
        this.isOnline()
            .then((res) => { func(ctx,this,res); })
            .catch((e) => { func(ctx,this,false); });
    }

    // Backward-compatibility helper
    load_async(ms_validiy, func, ctx)
    {
        this.load(ms_validiy)
            .then((res) => { func(ctx,this,YAPI_SUCCESS); })
            .catch((e) => { func(ctx,this,this.get_errorType()); });
    }

    /** Return the value of an attribute from function cache, after reloading it from device if needed
     * Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
     *
     * @param {string} str_attr
     * @return {string|null}
     */
    async _getAttr(str_attr)
    {
        if(this._cacheExpiration <= this._yapi.GetTickCount()) {
            // no valid cached value, reload from device
            if(await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) return null;
        }
        if(typeof this._cache[str_attr] == 'undefined') {
            this._throw(YAPI_VERSION_MISMATCH, 'No such attribute '+str_attr+' in function', null);
        }
        return this._cache[str_attr];
    }

    /** Return the value of an attribute from function cache, after reloading it from device if needed
     * Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
     *
     * @param {string} str_attr
     * @return {string|null}
     */
    async _getFixedAttr(str_attr)
    {
        if(this._cacheExpiration == 0) {
            // no cached value, load from device
            if(await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) return null;
        }
        if(typeof this._cache[str_attr] == 'undefined') {
            this._throw(YAPI_VERSION_MISMATCH, 'No such attribute '+str_attr+' in function', null);
        }
        return this._cache[str_attr];
    }

    /** Escape a string for posting it as an URL
     *
     * @param {string} str_newval
     * @return {string}
     */
    imm_escapeAttr(str_newval)
    {
        // We intentionally use escape here, because we want to encode non-ASCII
        // characters using single-byte ISO characters (not multi-byte UTF-8)

        //noinspection JSDeprecatedSymbols
        return escape(str_newval).replace(/[+]/g, '%2B')
                        .replace(/%20/g, '+').replace(/%21/g, '!')
                        .replace(/%24/g, '$')
                        .replace(/%27/g, '\'').replace(/%28/g, '(').replace(/%29/g, ')')
                        .replace(/%2[cC]/g, ',').replace(/%2[fF]/g, '/')
                        .replace(/%3[aA]/g, ':').replace(/%3[bB]/g, ';').replace(/%3[fF]/g, '?')
                        .replace(/%5[bB]/g, '[').replace(/%5[dD]/g, ']');
    }

    /** Change the value of an attribute on a device, and invalidate the cache
     *
     * @param {string} str_attr
     * @param {string} str_newval
     * @return {number}
     */
    async _setAttr(str_attr, str_newval)
    {
        if(str_newval == undefined) {
            return this._throw(YAPI_INVALID_ARGUMENT, 'Undefined value to set for attribute '+str_attr, null);
        }
        var attrname = encodeURIComponent(str_attr);
        var attrval = this.imm_escapeAttr(str_newval);
        var extra = '/'+attrname+'?'+attrname+'='+attrval+'&.';
        if(this._cacheExpiration != 0) {
            this._cacheExpiration = this._yapi.GetTickCount();
            this._cache._expiration = this._cacheExpiration;
        }
        var yreq = await this._yapi.funcRequest(this._className, this._func, extra);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /** Execute an arbitrary HTTP GET request on the device and return the binary content
     *
     * @param {string} str_path
     * @return {Uint8Array}
     */
    async _download(str_path)
    {
        // get the device serial number
        /** @type {string} **/
        let devid = this._serial;
        if(devid == '') {
            devid = await (await this.module()).get_serialNumber();
        }
        if(devid == YAPI_INVALID_STRING) {
            return new Uint8Array(0);
        }
        /** @type {YHTTPRequest} **/
        let yreq = await this._yapi.devRequest(devid, 'GET /'+str_path, null, 0);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, '');
        }
        return yreq.bin_result;
    }

    /** Execute an out-of-band HTTP GET request on the device and return the binary content.
     * The request may execute in parallel to regular requests currently in progress.
     *
     * @param {string} str_path
     * @return {Uint8Array}
     */
    async _downloadOutOfBand(str_path)
    {
        // get the device serial number
        /** @type {string} **/
        let devid = this._serial;
        if(devid == '') {
            devid = await (await this.module()).get_serialNumber();
        }
        if(devid == YAPI_INVALID_STRING) {
            return new Uint8Array(0);
        }
        /** @type {YHTTPRequest} **/
        let yreq = await this._yapi.devRequest(devid, 'GET /'+str_path, null, 1);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, '');
        }
        return yreq.bin_result;
    }

    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     * The progress callback function is called with two parameters: the number of
     * bytes uploaded so far and the total size to be uploaded.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @param {function} fun_progressCb
     * @return {object}
     */
    async _uploadWithProgress(str_path, bin_content, fun_progressCb)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == '') {
            devid = await (await this.module()).get_serialNumber();
        }
        if(devid == YAPI_INVALID_STRING) {
            return this.get_errorType();
        }
        var httpreq = 'POST /upload.html';
        var len = bin_content.length;
        // convert to Uint8Array if needed
        if(typeof bin_content == 'string' || bin_content instanceof String) {
            bin_content = this._yapi.imm_str2bin(bin_content);
        } else if(bin_content instanceof Array) {
            bin_content = new Uint8Array(bin_content);
        }
        return await this._yapi.devRequest(devid, httpreq, new YHTTPBody(str_path, bin_content, fun_progressCb), 0);
    }

    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     * The progress callback function is called with two parameters: the number of
     * bytes uploaded so far and the total size to be uploaded.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @return {object}
     */
    async _uploadEx(str_path, bin_content)
    {
        let yreq = await this._uploadWithProgress(str_path, bin_content, null)
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, '');
        }
        return yreq.bin_result;
    }


    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @return {object}
     */
    async _upload(str_path, bin_content)
    {
        return this._uploadWithProgress(str_path, bin_content, null);
    }

    /**
     * Waits for all pending asynchronous commands on the module to complete, and invoke
     * the user-provided callback function. The callback function can therefore freely
     * issue synchronous or asynchronous commands, without risking to block the
     * JavaScript VM.
     *
     * @param callback : callback function that is invoked when all pending commands on
     *         the module are completed.
     *         The callback function receives two arguments: the caller-specific
     *         context object and the receiving function object.
     * @param context : caller-specific object that is passed as-is to the callback function
     *
     * @return nothing.
     */
    wait_async(callback, context)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == '') {
            // serial not yet known, get it then call wait_async again
            this.module().then((module) =>
                module.get_serialNumber().then(() =>
                    this.wait_async(callback, context)));
            return YAPI_SUCCESS;
        }
        if(devid == YAPI_INVALID_STRING) {
            callback(context, this);
            return YAPI_SUCCESS;
        }
        var lockdev = this._yapi.imm_getDevice(devid);

        // queue the call to user callback function in the pending queries promise chain
        var delayedCode = (() => { callback(context, this); });
        lockdev._pendingQueries = lockdev._pendingQueries.then(delayedCode, delayedCode);
        return YAPI_SUCCESS;
    }

    /** Get a value from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @param str_key {string}
     * @return {string}
     **/
    imm_json_get_key(bin_jsonbuff, str_key)
    {
        var loadval = JSON.parse(this._yapi.imm_bin2str(bin_jsonbuff));
        if(typeof loadval[str_key] != 'undefined') {
            return loadval[str_key];
        }
        return '';
    }

    /** Get a string from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @return {string}
     **/
    imm_json_get_string(bin_jsonbuff)
    {
        return JSON.parse(this._yapi.imm_bin2str(bin_jsonbuff));
    }

    /** Get an array of strings from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @return {string[]}
     **/
    imm_json_get_array(bin_jsonbuff)
    {
        var loadval = JSON.parse(this._yapi.imm_bin2str(bin_jsonbuff));
        var res = [];
        for(var idx in loadval) {
            res.push(JSON.stringify(loadval[idx]));
        }
        return res;
    }

    /** Get an array of strings from a JSON buffer
     *
     * @param str_json {string}
     * @param str_path {string}
     * @return {string}
     **/
    imm_get_json_path(str_json, str_path)
    {
        var json = JSON.parse(str_json);
        var paths = str_path.split('|');
        for (var i = 0; i < paths.length; i++) {
            var tmp = paths[i];
            json = json[tmp];
            if (json == undefined) {
                return '';
            }
        }
        return JSON.stringify(json);
    }

    /** Get a string from a JSON string
     *
     * @param str_json {string}
     * @return {string}
     **/
    imm_decode_json_string(str_json)
    {
        return JSON.parse(str_json);
    }

    // Method used to cache DataStream objects (new DataLogger)
    //
    /** Method used to cache DataStream objects (new DataLogger)
     *
     * @param obj_dataset {YDataSet}
     * @param str_def {string}
     * @return {YDataStream}
     **/
    imm_findDataStream(obj_dataset, str_def)
    {
        /** @type {string} **/
        let key = obj_dataset.imm_get_functionId()+':'+str_def;
        if(this._dataStreams[key])
            return this._dataStreams[key];

        let words = this._yapi.imm_decodeWords(str_def);
        if (words.length < 14) {
            this._throw(YAPI.VERSION_MISMATCH,"device firwmare is too old",null);
            return null;
        }
        /** @type {YDataStream} **/
        let newDataStream = new YDataStream(this, obj_dataset, words);
        this._dataStreams[key] = newDataStream;
        return newDataStream;
    }

    // Method used to clear cache of DataStream object (undocumented)
    async clearDataStreamCache()
    {
        this._dataStreams = {};
    }

    /**
     * Checks if the function is currently reachable, without raising any error.
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     * No exception is raised if there is an error while trying to contact the
     * device hosting the function.
     *
     * @return {boolean} true if the function can be reached, and false otherwise
     */
    async isOnline()
    {
        // A valid value in cache means that the device is online
        if(this._cacheExpiration > this._yapi.GetTickCount()) return true;

        // Check that the function is available without throwing exceptions
        /** @type {YFuncRequest} **/
        let yreq = await this._yapi.funcRequest(this._className, this._func, '', this._yapi.defaultCacheValidity);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(yreq.errorType == YAPI_DEVICE_BUSY) {
                return true;
            } else {
                return false;
            }
        }
        // save result in cache anyway
        await this._parse(yreq, this._yapi.defaultCacheValidity);

        return true;
    }

    /**
     * Returns the numerical error code of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return {number} a number corresponding to the code of the latest error that occurred while
     *         using the function object
     */
    get_errorType()
    {
        return this._lastErrorType;
    }

    /**
     * Returns the error message of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return {string} a string corresponding to the latest error message that occured while
     *         using the function object
     */
    get_errorMessage()
    {
        return this._lastErrorMsg;
    }

    /**
     * Preloads the function cache with a specified validity duration.
     * By default, whenever accessing a device, all function attributes
     * are kept in cache for the standard duration (5 ms). This method can be
     * used to temporarily mark the cache as valid for a longer period, in order
     * to reduce network traffic for instance.
     *
     * @param msValidity {number} : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async load(msValidity)
    {
        /** @type {YFuncRequest} **/
        let yreq = await this._yapi.funcRequest(this._className, this._func, '', msValidity);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        await this._parse(yreq, msValidity);

        return YAPI_SUCCESS;
    }

    /**
     * Invalidates the cache. Invalidates the cache of the function attributes. Forces the
     * next call to get_xxx() or loadxxx() to use values that come from the device.
     *
     * @noreturn
     */
    async clearCache()
    {
        var devreq = await this._yapi._funcDev(this._className, this._func);
        if(devreq.errorType != YAPI_SUCCESS) {
            return;
        }
        devreq.obj_result.device.imm_dropCache();
        if (this._cacheExpiration > 0) {
            this._cacheExpiration = this._yapi.GetTickCount();
        }
    }

    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     *
     * @return {YModule} an instance of YModule
     */
    async module()
    {
        // try to resolve the function name to a device id without query
        if(this._serial != '') {
            return YModule.FindModuleInContext(this._yapi, this._serial + '.module');
        }
        var hwid = this._func;
        var resolve;
        if(hwid.indexOf('.') < 0) {
            resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if(resolve.errorType == YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf('.');
        if(dotidx >= 0) {
            // resolution worked
            return YModule.FindModuleInContext(this._yapi, hwid.substr(0, dotidx) + '.module');
        }

        // device not resolved for now, force a communication for a last chance resolution
        if(await this.load(this._yapi.defaultCacheValidity) == YAPI_SUCCESS) {
            resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if(resolve.result != undefined) hwid = resolve.result;
        }
        dotidx = hwid.indexOf('.');
        if(dotidx >= 0) {
            // resolution worked
            return YModule.FindModuleInContext(this._yapi, hwid.substr(0, dotidx) + '.module');
        }
        // return a true yFindModule object even if it is not a module valid for communicating
        return YModule.FindModuleInContext(this._yapi, 'module_of_'+this.className+'_'+this._func);
    }

    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     *
     * @return {YModule} an instance of YModule
     */
    async get_module()
    {
        return await this.module();
    }

    /**
     * Returns a unique identifier of type YFUN_DESCR corresponding to the function.
     * This identifier can be used to test if two instances of YFunction reference the same
     * physical function on the same physical device.
     *
     * @return {string} an identifier of type YFUN_DESCR.
     *
     * If the function has never been contacted, the returned value is YFunction.FUNCTIONDESCRIPTOR_INVALID.
     */
    async get_functionDescriptor()
    {
        // try to resolve the function name to a device id without query
        if(this._hwId != '') {
            return this._hwId;
        }
        var hwid = this._func;
        if(hwid.indexOf('.') < 0) {
            var resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf('.');
        if(dotidx >= 0) {
            return hwid;
        }
        return Y_FUNCTIONDESCRIPTOR_INVALID;
    }

    /**
     * Returns the value of the userData attribute, as previously stored using method
     * set_userData.
     * This attribute is never touched directly by the API, and is at disposal of the caller to
     * store a context.
     *
     * @return {Object} the object stored previously by the caller.
     */
    async get_userData()
    {
        return this._userData;
    }

    /**
     * Stores a user context provided as argument in the userData attribute of the function.
     * This attribute is never touched by the API, and is at disposal of the caller to store a context.
     *
     * @param data {Object} : any kind of object to be stored
     * @noreturn
     */
    async set_userData(data)
    {
        this._userData = data;
    }

}

YoctoLibExport('YFunction', YFunction);

//
// YFunctionProxy Class: synchronous proxy to YFunction objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YFunction objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
class YFunctionProxy
{
    constructor(obj_func)
    {
        this.liveFunc = obj_func;
        this._yapi = obj_func._yapi;
        this._module = null;
    }

    async _asyncInit()
    {
        // subclass may override this method to perform extra
        // async calls when the instance is created
    }

    _throw(int_errType, str_errMsg, obj_retVal)
    {
        this.liveFunc._lastErrorType = int_errType;
        this.liveFunc._lastErrorMsg = str_errMsg;
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    /**
     * Invalidates the cache. Invalidates the cache of the function attributes. Forces the
     * next call to get_xxx() or loadxxx() to use values that come from the device.
     *
     * @noreturn
     */
    clearCache()
    {
        this.liveFunc.clearCache();
    }

    /**
     * Returns the logical name of the function.
     *
     * @return {string} a string corresponding to the logical name of the function
     *
     * On failure, throws an exception or returns YFunction.LOGICALNAME_INVALID.
     */
    get_logicalName()
    {
        return this.liveFunc._logicalName;
    }

    /**
     * Changes the logical name of the function. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the logical name of the function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_logicalName(newval)
    {
        this.liveFunc.set_logicalName(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a short string representing the current state of the function.
     *
     * @return {string} a string corresponding to a short string representing the current state of the function
     *
     * On failure, throws an exception or returns YFunction.ADVERTISEDVALUE_INVALID.
     */
    get_advertisedValue()
    {
        return this.liveFunc._advertisedValue;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback {function} : the callback function to call, or a null pointer. The callback
     * function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     */
    registerValueCallback(callback)
    {
        if(callback) {
            this.liveFunc.registerValueCallback((obj, value) => { callback(this, value); });
        } else {
            this.liveFunc.registerValueCallback(null);
        }
    }

    /**
     * Disable the propagation of every new advertised value to the parent hub.
     * You can use this function to save bandwidth and CPU on computers with limited
     * resources, or to prevent unwanted invocations of the HTTP callback.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    muteValueCallbacks()
    {
        this.liveFunc.muteValueCallbacks();
        return this._yapi.SUCCESS;
    }

    /**
     * Re-enable the propagation of every new advertised value to the parent hub.
     * This function reverts the effect of a previous call to muteValueCallbacks().
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    unmuteValueCallbacks()
    {
        this.liveFunc.unmuteValueCallbacks();
        return this._yapi.SUCCESS;
    }

    /**
     * Backward-compatibility function to force reloading the underlying YFunction object
     *
     * @param func {function} : callback function called when loaded
     * @param ctx {object} : user context
     */
    isOnline_async(func, ctx)
    {
        this.liveFunc.isOnline()
            .then((res) =>
            {
                func(ctx, this, res);
            })
            .catch((e) =>
            {
                func(ctx, this, false);
            });
    }

    /**
     * Backward-compatibility function to force reloading the underlying YFunction object
     *
     * @param ms_validiy {number} : duration for which the cache will be load
     * @param func {function} : callback function called when loaded
     * @param ctx {object} : user context
     */
    load_async(ms_validiy, func, ctx)
    {
        this.liveFunc.load(ms_validiy)
            .then((res) =>
            {
                func(ctx, this, YAPI_SUCCESS);
            })
            .catch((e) =>
            {
                func(ctx, this, this.get_errorType());
            });
    }

    /** Return the value of an attribute from function cache
     *
     * @param {string} str_attr
     * @return {string|null}
     */
    _getAttr(str_attr)
    {
        if (typeof this.liveFunc._cache[str_attr] == 'undefined') {
            this._throw(YAPI_VERSION_MISMATCH, 'No such attribute ' + str_attr + ' in function', null);
        }
        return this.liveFunc._cache[str_attr];
    }

    /** Change the value of an attribute on a device
     *
     * @param {string} str_attr
     * @param {string} str_newval
     * @return {number}
     */
    _setAttr(str_attr, str_newval)
    {
        this.liveFunc._setAttr(str_attr, str_newval);
        return YAPI_SUCCESS;
    }

    /** Execute an arbitrary HTTP GET request on the device and return the binary content
     *
     * @param {string} str_path
     * @return {Uint8Array}
     */
    async _download(str_path)
    {
        this.liveFunc._download(str_path);
        // this function is useful for "sending" commands through URLs,
        // but since the execution is asynchronous, it cannot be used
        // to _load_ data from magic URLs
        return null;
    }

    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @return {object}
     */
    async _upload(str_path, bin_content)
    {
        this.liveFunc._upload(str_path, bin_content);
        return null;
    }

    /**
     * Waits for all pending asynchronous commands on the module to complete, and invoke
     * the user-provided callback function.
     *
     * @param callback {function} : callback function that is invoked when all pending commands on
     *         the module are completed.
     *         The callback function receives two arguments: the caller-specific
     *         context object and the receiving function proxy object.
     * @param context {object} : caller-specific object that is passed as-is to the callback function
     */
    wait_async(callback, context)
    {
        setTimeout(() => {
            this.liveFunc.wait_async((ctx, obj) => {
                try {
                    callback(ctx, this);
                } catch(e) {
                    this._yapi.imm_log(e);
                }
            }, context);
        }, 100);
    }

    /**
     * Checks if the function is currently reachable, without raising any error.
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     *
     * @return {boolean} true if the function appears to be online
     */
    isOnline()
    {
        var resolve = this._yapi.imm_resolveFunction(this.liveFunc._className, this.liveFunc._func);
        return (resolve.errorType == YAPI_SUCCESS);
    }

    /**
     * Returns the numerical error code of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return {number} a number corresponding to the code of the latest error that occurred while
     *         using the function object
     */
    get_errorType()
    {
        return this.liveFunc._lastErrorType;
    }

    /**
     * Returns the error message of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return {string} a string corresponding to the latest error message that occured while
     *         using the function object
     */
    get_errorMessage()
    {
        return this.liveFunc._lastErrorMsg;
    }

    /**
     * Preloads the function cache with a specified validity duration.
     * By default, whenever accessing a device, all function attributes
     * are kept in cache for the standard duration (5 ms). This method can be
     * used to temporarily mark the cache as valid for a longer period, in order
     * to reduce network traffic for instance.
     *
     * @param msValidity {number} : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    load(msValidity)
    {
        this.liveFunc.load(msValidity).catch((e) => {
            this._yapi.imm_log('Exception loading syncProxy: ', e);
        });
        return YAPI_SUCCESS;
    }

    /**
     * Gets the YModule synchronous proxy object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModuleProxy is not shown as on-line.
     *
     * @return {YModule} an instance of YModule
     */
    module()
    {
        return this._module;
    }

    /**
     * Gets the YModule synchronous proxy object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModuleProxy is not shown as on-line.
     *
     * @return {YModule} an instance of YModule
     */
    get_module()
    {
        return this._module;
    }

    /**
     * Returns a unique identifier of type YFUN_DESCR corresponding to the function.
     * This identifier can be used to test if two instances of YFunction reference the same
     * physical function on the same physical device.
     *
     * @return {string} an identifier of type YFUN_DESCR.
     *
     * If the function has never been contacted, the returned value is YFunction.FUNCTIONDESCRIPTOR_INVALID.
     */
    get_functionDescriptor()
    {
        // try to resolve the function name to a device id without query
        if(this.liveFunc._hwId != '') {
            return this.liveFunc._hwId;
        }
        var hwid = this.liveFunc._func;
        if(hwid.indexOf('.') < 0) {
            var resolve = this._yapi.imm_resolveFunction(this.liveFunc._className, this.liveFunc._func);
            if(resolve.errorType != YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf('.');
        if(dotidx >= 0) {
            return hwid;
        }
        return Y_FUNCTIONDESCRIPTOR_INVALID;
    }

    /**
     * Returns the value of the userData attribute, as previously stored using method
     * set_userData.
     * This attribute is never touched directly by the API, and is at disposal of the caller to
     * store a context.
     *
     * @return {Object} the object stored previously by the caller.
     */
    get_userData()
    {
        return this.liveFunc._userData;
    }

    /**
     * Stores a user context provided as argument in the userData attribute of the function.
     * This attribute is never touched by the API, and is at disposal of the caller to store a context.
     *
     * @param data {Object} : any kind of object to be stored
     * @noreturn
     */
    set_userData(data)
    {
        this.liveFunc._userData = data;
    }

    // Helper for completing and exporting the proxy class; used by built-in classes
    static _E()
    {
        YoctoLibExport(this.name, this);
        let asyncClass = YoctoLibGlobal(this.name.slice(0,-5));
        let attrlist = asyncClass._attrList;
        for(let i = 0; i < attrlist.length; i++) {
            let attrname = attrlist[i];
            let getMethod = 'get_'+attrname;
            let setMethod = 'set_'+attrname;
            if(asyncClass.prototype[getMethod]) {
                this.prototype[getMethod] = function() { return this.liveFunc['_'+attrname]; };
            }
            if(asyncClass.prototype[setMethod]) {
                this.prototype[setMethod] = function(val) { this.liveFunc[setMethod](val); return this._yapi.SUCCESS; };
            }
        }
    }
}

YoctoLibExport('YFunctionProxy', YFunctionProxy);

//--- (generated code: YModule class start)
/**
 * YModule Class: Module control interface
 *
 * This interface is identical for all Yoctopuce USB modules.
 * It can be used to control the module global parameters, and
 * to enumerate the functions provided by each module.
 */
//--- (end of generated code: YModule class start)
/** @extends {YFunction} **/
class YModule extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (generated code: YModule constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Module';
        /** @member {string} **/
        this._productName                = YModule.PRODUCTNAME_INVALID;
        /** @member {string} **/
        this._serialNumber               = YModule.SERIALNUMBER_INVALID;
        /** @member {number} **/
        this._productId                  = YModule.PRODUCTID_INVALID;
        /** @member {number} **/
        this._productRelease             = YModule.PRODUCTRELEASE_INVALID;
        /** @member {string} **/
        this._firmwareRelease            = YModule.FIRMWARERELEASE_INVALID;
        /** @member {number} **/
        this._persistentSettings         = YModule.PERSISTENTSETTINGS_INVALID;
        /** @member {number} **/
        this._luminosity                 = YModule.LUMINOSITY_INVALID;
        /** @member {number} **/
        this._beacon                     = YModule.BEACON_INVALID;
        /** @member {number} **/
        this._upTime                     = YModule.UPTIME_INVALID;
        /** @member {number} **/
        this._usbCurrent                 = YModule.USBCURRENT_INVALID;
        /** @member {number} **/
        this._rebootCountdown            = YModule.REBOOTCOUNTDOWN_INVALID;
        /** @member {number} **/
        this._userVar                    = YModule.USERVAR_INVALID;
        /** @member {function} **/
        this._logCallback                = null;
        /** @member {function} **/
        this._confChangeCallback         = null;
        /** @member {function} **/
        this._beaconCallback             = null;
        //--- (end of generated code: YModule constructor)

        // automatically fill in hardware properties if they can be resolved
        // without any network access (getDevice does not cause network access)
        let devid = this._func;
        let dotidx = devid.indexOf('.');
        if(dotidx > 0) devid = devid.substr(0, dotidx);
        let dev = this._yapi.imm_getDevice(devid);
        if(dev) {
            this._serial = dev.imm_getSerialNumber();
            this._funId  = 'module';
            this._hwId   = this._serial+'.module';
        }
    }

    _throw(int_errType, str_errMsg, obj_retVal)
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    static async _updateModuleCallbackList(yModule_module, bool_add)
    {
    }

    /** Return the internal device object hosting the function
     *
     * @return {YDevice}
     *
     * Raise an error if not found
     */
    imm_getDev()
    {
        /** @type {string} **/
        let devid = this._func;
        /** @type {number} **/
        let dotidx = devid.indexOf('.');
        if(dotidx > 0) devid = devid.substr(0, dotidx);
        /** @type {YDevice} **/
        let dev = this._yapi.imm_getDevice(devid);
        if(!dev) {
            this._throw(YAPI_DEVICE_NOT_FOUND, 'Device ['+devid+'] is not online', null);
        }
        return dev;
    }

    /**
     * Forces a full redetection of the device, in case the functions changed
     *
     * @noreturn
     */
    async forceDeviceRefresh()
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if(!dev || !this._serial) return;
        await this._yapi.ForceDeviceRefresh(this._serial);
        if (this._cacheExpiration > 0) {
            this._cacheExpiration = this._yapi.GetTickCount();
        }
    }

    /**
     * Returns the number of functions (beside the "module" interface) available on the module.
     *
     * @return {number} the number of functions on the module
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async functionCount()
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if(!dev) return YAPI_DEVICE_NOT_FOUND;
        return dev.imm_functionCount();
    }

    /**
     * Retrieves the hardware identifier of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a string corresponding to the unambiguous hardware identifier of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionId(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if(!dev) return '';
        return dev.imm_functionId(functionIndex);
    }

    /**
     * Retrieves the type of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a string corresponding to the type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionType(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if(!dev) return '';
        return dev.imm_functionType(functionIndex);
    }

    /**
     * Retrieves the base type of the <i>n</i>th function on the module.
     * For instance, the base type of all measuring functions is "Sensor".
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a string corresponding to the base type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionBaseType(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if(!dev) return '';
        return dev.imm_functionBaseType(functionIndex);
    }

    /**
     * Retrieves the logical name of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a string corresponding to the logical name of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionName(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if(!dev) return '';
        return dev.imm_functionName(functionIndex);
    }

    /**
     * Retrieves the advertised value of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a short string (up to 6 characters) corresponding to the advertised value of the
     * requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionValue(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if(!dev) return '';
        return dev.imm_functionValue(functionIndex);
    }

    /**
     * Returns the logical name of the module.
     *
     * @return {string} a string corresponding to the logical name of the module
     *
     * On failure, throws an exception or returns YModule.LOGICALNAME_INVALID.
     */
    async get_logicalName()
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if (dev != null && this._cache._expiration <= this._yapi.GetTickCount()) {
            return await dev.getLogicalName();
        }
        /** @type {string|null} **/
        let json_val = await this._getAttr('logicalName');
        return (json_val == null ? YModule.LOGICALNAME_INVALID : json_val);
    }


    async set_logicalName(newval)
    {
        let res = await super.set_logicalName(newval);
        let dev = this.imm_getDev();
        if (dev != null) {
            return dev.imm_dropCache();
        }
        return res;
    }

    imm_flattenJsonStruct_internal(jsoncomplex)
    {
        var decoded = JSON.parse(this._yapi.imm_bin2str(jsoncomplex));
        var attrs = [];
        for(var function_name in decoded) {
            if (function_name ==  'services')
                continue;
            var function_attrs = decoded[function_name];
            for(var attr_name in function_attrs) {
                let attr_value = function_attrs[attr_name];
                if (attr_value === null || typeof attr_value === 'object') {
                    continue;
                }
                var flat = function_name + '/' + attr_name + '=' + attr_value;
                attrs.push(flat);
            }
        }
        return this._yapi.imm_str2bin(JSON.stringify(attrs));
    }

    async get_syncProxy()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            try {
                await this.load(this._yapi.defaultCacheValidity);
            } catch(e) {
                // device might be offline
            }
        }
        let res = new YModuleProxy(this);
        await res._asyncInit();
        res._module = res;
        return res;
    }

    async get_subDevices_internal()
    {
        //fixme: not implemented
    }

    async get_parentHub_internal()
    {
        //fixme: not implemented
    }

    async get_url_internal()
    {
        /** @type {string} **/
        let devid = this._serial;
        if (devid == '') {
            devid = await get_serialNumber();
        }
        if (devid == YAPI_INVALID_STRING) {
            return new Uint8Array(0);
        }
        let lockdev = this._yapi.imm_getDevice(this._serial);
        if (!lockdev) {
            return new Uint8Array(0);
        }
        return lockdev.imm_getRootUrl();
    }
    async _startStopDevLog_internal(str_serial, bool_start)
    {
        let dev = this.imm_getDev();
        if (dev != null) {
            return dev.imm_registerLogCallback(this._logCallback);
        }
    }

    //--- (generated code: YModule implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'productName':
            this._productName = val;
            return 1;
        case 'serialNumber':
            this._serialNumber = val;
            return 1;
        case 'productId':
            this._productId = parseInt(val);
            return 1;
        case 'productRelease':
            this._productRelease = parseInt(val);
            return 1;
        case 'firmwareRelease':
            this._firmwareRelease = val;
            return 1;
        case 'persistentSettings':
            this._persistentSettings = parseInt(val);
            return 1;
        case 'luminosity':
            this._luminosity = parseInt(val);
            return 1;
        case 'beacon':
            this._beacon = parseInt(val);
            return 1;
        case 'upTime':
            this._upTime = parseInt(val);
            return 1;
        case 'usbCurrent':
            this._usbCurrent = parseInt(val);
            return 1;
        case 'rebootCountdown':
            this._rebootCountdown = parseInt(val);
            return 1;
        case 'userVar':
            this._userVar = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the commercial name of the module, as set by the factory.
     *
     * @return {string} a string corresponding to the commercial name of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.PRODUCTNAME_INVALID.
     */
    async get_productName()
    {
        /** @type {string} **/
        let res;
        /** @type {YDevice} **/
        let dev;
        if (this._cacheExpiration == 0) {
            dev = this.imm_getDev();
            if (!(dev == null)) {
                return dev.imm_getProductName();
            }
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.PRODUCTNAME_INVALID;
            }
        }
        res = this._productName;
        return res;
    }

    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return {string} a string corresponding to the serial number of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.SERIALNUMBER_INVALID.
     */
    async get_serialNumber()
    {
        /** @type {string} **/
        let res;
        /** @type {YDevice} **/
        let dev;
        if (this._cacheExpiration == 0) {
            dev = this.imm_getDev();
            if (!(dev == null)) {
                return dev.imm_getSerialNumber();
            }
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.SERIALNUMBER_INVALID;
            }
        }
        res = this._serialNumber;
        return res;
    }

    /**
     * Returns the USB device identifier of the module.
     *
     * @return {number} an integer corresponding to the USB device identifier of the module
     *
     * On failure, throws an exception or returns YModule.PRODUCTID_INVALID.
     */
    async get_productId()
    {
        /** @type {number} **/
        let res;
        /** @type {YDevice} **/
        let dev;
        if (this._cacheExpiration == 0) {
            dev = this.imm_getDev();
            if (!(dev == null)) {
                return dev.imm_getProductId();
            }
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.PRODUCTID_INVALID;
            }
        }
        res = this._productId;
        return res;
    }

    /**
     * Returns the hardware release version of the module.
     *
     * @return {number} an integer corresponding to the hardware release version of the module
     *
     * On failure, throws an exception or returns YModule.PRODUCTRELEASE_INVALID.
     */
    async get_productRelease()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.PRODUCTRELEASE_INVALID;
            }
        }
        res = this._productRelease;
        return res;
    }

    /**
     * Returns the version of the firmware embedded in the module.
     *
     * @return {string} a string corresponding to the version of the firmware embedded in the module
     *
     * On failure, throws an exception or returns YModule.FIRMWARERELEASE_INVALID.
     */
    async get_firmwareRelease()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.FIRMWARERELEASE_INVALID;
            }
        }
        res = this._firmwareRelease;
        return res;
    }

    /**
     * Returns the current state of persistent module settings.
     *
     * @return {number} a value among YModule.PERSISTENTSETTINGS_LOADED, YModule.PERSISTENTSETTINGS_SAVED
     * and YModule.PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     *
     * On failure, throws an exception or returns YModule.PERSISTENTSETTINGS_INVALID.
     */
    async get_persistentSettings()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.PERSISTENTSETTINGS_INVALID;
            }
        }
        res = this._persistentSettings;
        return res;
    }

    async set_persistentSettings(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('persistentSettings',rest_val);
    }

    /**
     * Returns the luminosity of the  module informative LEDs (from 0 to 100).
     *
     * @return {number} an integer corresponding to the luminosity of the  module informative LEDs (from 0 to 100)
     *
     * On failure, throws an exception or returns YModule.LUMINOSITY_INVALID.
     */
    async get_luminosity()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.LUMINOSITY_INVALID;
            }
        }
        res = this._luminosity;
        return res;
    }

    /**
     * Changes the luminosity of the module informative leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the luminosity of the module informative leds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_luminosity(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('luminosity',rest_val);
    }

    /**
     * Returns the state of the localization beacon.
     *
     * @return {number} either YModule.BEACON_OFF or YModule.BEACON_ON, according to the state of the
     * localization beacon
     *
     * On failure, throws an exception or returns YModule.BEACON_INVALID.
     */
    async get_beacon()
    {
        /** @type {number} **/
        let res;
        /** @type {YDevice} **/
        let dev;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            dev = this.imm_getDev();
            if (!(dev == null)) {
                return dev.imm_getBeacon();
            }
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.BEACON_INVALID;
            }
        }
        res = this._beacon;
        return res;
    }

    /**
     * Turns on or off the module localization beacon.
     *
     * @param newval {number} : either YModule.BEACON_OFF or YModule.BEACON_ON
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_beacon(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('beacon',rest_val);
    }

    /**
     * Returns the number of milliseconds spent since the module was powered on.
     *
     * @return {number} an integer corresponding to the number of milliseconds spent since the module was powered on
     *
     * On failure, throws an exception or returns YModule.UPTIME_INVALID.
     */
    async get_upTime()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.UPTIME_INVALID;
            }
        }
        res = this._upTime;
        return res;
    }

    /**
     * Returns the current consumed by the module on the USB bus, in milli-amps.
     *
     * @return {number} an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     *
     * On failure, throws an exception or returns YModule.USBCURRENT_INVALID.
     */
    async get_usbCurrent()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.USBCURRENT_INVALID;
            }
        }
        res = this._usbCurrent;
        return res;
    }

    /**
     * Returns the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     *
     * @return {number} an integer corresponding to the remaining number of seconds before the module
     * restarts, or zero when no
     *         reboot has been scheduled
     *
     * On failure, throws an exception or returns YModule.REBOOTCOUNTDOWN_INVALID.
     */
    async get_rebootCountdown()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.REBOOTCOUNTDOWN_INVALID;
            }
        }
        res = this._rebootCountdown;
        return res;
    }

    async set_rebootCountdown(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('rebootCountdown',rest_val);
    }

    /**
     * Returns the value previously stored in this attribute.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @return {number} an integer corresponding to the value previously stored in this attribute
     *
     * On failure, throws an exception or returns YModule.USERVAR_INVALID.
     */
    async get_userVar()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.USERVAR_INVALID;
            }
        }
        res = this._userVar;
        return res;
    }

    /**
     * Stores a 32 bit value in the device RAM. This attribute is at programmer disposal,
     * should he need to store a state variable.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @param newval {number} : an integer
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_userVar(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('userVar',rest_val);
    }

    /**
     * Allows you to find a module from its serial number or from its logical name.
     *
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string containing either the serial number or
     *         the logical name of the desired module
     *
     * @return {YModule} a YModule object allowing you to drive the module
     *         or get additional information on the module.
     */
    static FindModule(func)
    {
        /** @type {YFunction} **/
        let obj;
        /** @type {string} **/
        let cleanHwId;
        /** @type {number} **/
        let modpos;
        cleanHwId = func;
        modpos = (func).indexOf('.module');
        if (modpos != ((func).length - 7)) {
            cleanHwId = func + '.module';
        }
        obj = YFunction._FindFromCache('Module', cleanHwId);
        if (obj == null) {
            obj = new YModule(YAPI, cleanHwId);
            YFunction._AddToCache('Module',  cleanHwId, obj);
        }
        return obj;
    }

    /**
     * Retrieves a module for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the module
     *
     * @return {YModule} a YModule object allowing you to drive the module.
     */
    static FindModuleInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        /** @type {string} **/
        let cleanHwId;
        /** @type {number} **/
        let modpos;
        cleanHwId = func;
        modpos = (func).indexOf('.module');
        if (modpos != ((func).length - 7)) {
            cleanHwId = func + '.module';
        }
        obj = YFunction._FindFromCacheInContext(yctx,  'Module', cleanHwId);
        if (obj == null) {
            obj = new YModule(yctx, cleanHwId);
            YFunction._AddToCache('Module',  cleanHwId, obj);
        }
        return obj;
    }

    /**
     * Saves current settings in the nonvolatile memory of the module.
     * Warning: the number of allowed save operations during a module life is
     * limited (about 100000 cycles). Do not call this function within a loop.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async saveToFlash()
    {
        return await this.set_persistentSettings(YModule.PERSISTENTSETTINGS_SAVED);
    }

    /**
     * Reloads the settings stored in the nonvolatile memory, as
     * when the module is powered on.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async revertFromFlash()
    {
        return await this.set_persistentSettings(YModule.PERSISTENTSETTINGS_LOADED);
    }

    /**
     * Schedules a simple module reboot after the given number of seconds.
     *
     * @param secBeforeReboot {number} : number of seconds before rebooting
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reboot(secBeforeReboot)
    {
        return await this.set_rebootCountdown(secBeforeReboot);
    }

    /**
     * Schedules a module reboot into special firmware update mode.
     *
     * @param secBeforeReboot {number} : number of seconds before rebooting
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerFirmwareUpdate(secBeforeReboot)
    {
        return await this.set_rebootCountdown(-secBeforeReboot);
    }

    async _startStopDevLog(serial,start)
    {
        await this._startStopDevLog_internal(serial,start);
    }

    /**
     * Registers a device log callback function. This callback will be called each time
     * that a module sends a new log message. Mostly useful to debug a Yoctopuce module.
     *
     * @param callback {function} : the callback function to call, or a null pointer. The callback
     * function should take two
     *         arguments: the module object that emitted the log message, and the character string containing the log.
     *         On failure, throws an exception or returns a negative error code.
     */
    async registerLogCallback(callback)
    {
        /** @type {string} **/
        let serial;

        serial = await this.get_serialNumber();
        if (serial == YAPI_INVALID_STRING) {
            return YAPI_DEVICE_NOT_FOUND;
        }
        this._logCallback = callback;
        await this._startStopDevLog(serial, callback != null);
        return 0;
    }

    async get_logCallback()
    {
        return this._logCallback;
    }

    /**
     * Register a callback function, to be called when a persistent settings in
     * a device configuration has been changed (e.g. change of unit, etc).
     *
     * @param callback {function} : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    async registerConfigChangeCallback(callback)
    {
        if (callback != null) {
            await YModule._updateModuleCallbackList(this, true);
        } else {
            await YModule._updateModuleCallbackList(this, false);
        }
        this._confChangeCallback = callback;
        return 0;
    }

    async _invokeConfigChangeCallback()
    {
        if (this._confChangeCallback != null) {
            try {
                await this._confChangeCallback(this);
            } catch (e) {
                this._yapi.imm_log('Exception in configChangeCallback:', e);
            }
        }
        return 0;
    }

    /**
     * Register a callback function, to be called when the localization beacon of the module
     * has been changed. The callback function should take two arguments: the YModule object of
     * which the beacon has changed, and an integer describing the new beacon state.
     *
     * @param callback {function} : The callback function to call, or null to unregister a
     *         previously registered callback.
     */
    async registerBeaconCallback(callback)
    {
        if (callback != null) {
            await YModule._updateModuleCallbackList(this, true);
        } else {
            await YModule._updateModuleCallbackList(this, false);
        }
        this._beaconCallback = callback;
        return 0;
    }

    async _invokeBeaconCallback(beaconState)
    {
        if (this._beaconCallback != null) {
            try {
                await this._beaconCallback(this, beaconState);
            } catch (e) {
                this._yapi.imm_log('Exception in beaconCallback:', e);
            }
        }
        return 0;
    }

    /**
     * Triggers a configuration change callback, to check if they are supported or not.
     */
    async triggerConfigChangeCallback()
    {
        await this._setAttr('persistentSettings', '2');
        return 0;
    }

    /**
     * Tests whether the byn file is valid for this module. This method is useful to test if the module
     * needs to be updated.
     * It is possible to pass a directory as argument instead of a file. In this case, this method returns
     * the path of the most recent
     * appropriate .byn file. If the parameter onlynew is true, the function discards firmwares that are older or
     * equal to the installed firmware.
     *
     * @param path {string} : the path of a byn file or a directory that contains byn files
     * @param onlynew {boolean} : returns only files that are strictly newer
     *
     * @return {string} the path of the byn file to use or a empty string if no byn files matches the requirement
     *
     * On failure, throws an exception or returns a string that start with "error:".
     */
    async checkFirmware(path,onlynew)
    {
        /** @type {string} **/
        let serial;
        /** @type {number} **/
        let release;
        /** @type {string} **/
        let tmp_res;
        if (onlynew) {
            release = this._yapi.imm_atoi(await this.get_firmwareRelease());
        } else {
            release = 0;
        }
        //may throw an exception
        serial = await this.get_serialNumber();
        tmp_res = await YFirmwareUpdate.CheckFirmware(serial,  path, release);
        if ((tmp_res).indexOf('error:') == 0) {
            this._throw(YAPI_INVALID_ARGUMENT, tmp_res);
        }
        return tmp_res;
    }

    /**
     * Prepares a firmware update of the module. This method returns a YFirmwareUpdate object which
     * handles the firmware update process.
     *
     * @param path {string} : the path of the .byn file to use.
     * @param force {boolean} : true to force the firmware update even if some prerequisites appear not to be met
     *
     * @return {YFirmwareUpdate} a YFirmwareUpdate object or NULL on error.
     */
    async updateFirmwareEx(path,force)
    {
        /** @type {string} **/
        let serial;
        /** @type {Uint8Array} **/
        let settings;

        serial = await this.get_serialNumber();
        settings = await this.get_allSettings();
        if ((settings).length == 0) {
            this._throw(YAPI_IO_ERROR, 'Unable to get device settings');
            settings = this._yapi.imm_str2bin('error:Unable to get device settings');
        }
        return new YFirmwareUpdate(this._yapi, serial, path, settings, force);
    }

    /**
     * Prepares a firmware update of the module. This method returns a YFirmwareUpdate object which
     * handles the firmware update process.
     *
     * @param path {string} : the path of the .byn file to use.
     *
     * @return {YFirmwareUpdate} a YFirmwareUpdate object or NULL on error.
     */
    async updateFirmware(path)
    {
        return await this.updateFirmwareEx(path, false);
    }

    /**
     * Returns all the settings and uploaded files of the module. Useful to backup all the
     * logical names, calibrations parameters, and uploaded files of a device.
     *
     * @return {Uint8Array} a binary buffer with all the settings.
     *
     * On failure, throws an exception or returns an binary object of size 0.
     */
    async get_allSettings()
    {
        /** @type {Uint8Array} **/
        let settings;
        /** @type {Uint8Array} **/
        let json;
        /** @type {Uint8Array} **/
        let res;
        /** @type {string} **/
        let sep;
        /** @type {string} **/
        let name;
        /** @type {string} **/
        let item;
        /** @type {string} **/
        let t_type;
        /** @type {string} **/
        let id;
        /** @type {string} **/
        let url;
        /** @type {string} **/
        let file_data;
        /** @type {Uint8Array} **/
        let file_data_bin;
        /** @type {Uint8Array} **/
        let temp_data_bin;
        /** @type {string} **/
        let ext_settings;
        /** @type {string[]} **/
        let filelist = [];
        /** @type {string[]} **/
        let templist = [];

        settings = await this._download('api.json');
        if ((settings).length == 0) {
            return settings;
        }
        ext_settings = ', "extras":[';
        templist = await this.get_functionIds('Temperature');
        sep = '';
        for (let ii in  templist) {
            if (this._yapi.imm_atoi(await this.get_firmwareRelease()) > 9000) {
                url = 'api/'+ templist[ii]+'/sensorType';
                t_type = this._yapi.imm_bin2str(await this._download(url));
                if (t_type == 'RES_NTC' || t_type == 'RES_LINEAR') {
                    id = ( templist[ii]).substr( 11, ( templist[ii]).length - 11);
                    if (id == '') {
                        id = '1';
                    }
                    temp_data_bin = await this._download('extra.json?page='+id);
                    if ((temp_data_bin).length > 0) {
                        item = sep+'{"fid":"'+ templist[ii]+'", "json":'+this._yapi.imm_bin2str(temp_data_bin)+'}\n';
                        ext_settings = ext_settings + item;
                        sep = ',';
                    }
                }
            }
        }
        ext_settings = ext_settings + '],\n"files":[';
        if (await this.hasFunction('files')) {
            json = await this._download('files.json?a=dir&f=');
            if ((json).length == 0) {
                return json;
            }
            filelist = this.imm_json_get_array(json);
            sep = '';
            for (let ii in  filelist) {
                name = this.imm_json_get_key(this._yapi.imm_str2bin( filelist[ii]), 'name');
                if (((name).length > 0) && !(name == 'startupConf.json')) {
                    file_data_bin = await this._download(this.imm_escapeAttr(name));
                    file_data = this._yapi.imm_bin2hexstr(file_data_bin);
                    item = sep+'{"name":"'+name+'", "data":"'+file_data+'"}\n';
                    ext_settings = ext_settings + item;
                    sep = ',';
                }
            }
        }
        res = this._yapi.imm_str2bin('{ "api":' + this._yapi.imm_bin2str(settings) + ext_settings + ']}');
        return res;
    }

    async loadThermistorExtra(funcId,jsonExtra)
    {
        /** @type {string[]} **/
        let values = [];
        /** @type {string} **/
        let url;
        /** @type {string} **/
        let curr;
        /** @type {string} **/
        let currTemp;
        /** @type {number} **/
        let ofs;
        /** @type {number} **/
        let size;
        url = 'api/' + funcId + '.json?command=Z';

        await this._download(url);
        // add records in growing resistance value
        values = this.imm_json_get_array(this._yapi.imm_str2bin(jsonExtra));
        ofs = 0;
        size = values.length;
        while (ofs + 1 < size) {
            curr = values[ofs];
            currTemp = values[ofs + 1];
            url = 'api/'+funcId+'.json?command=m'+curr+':'+currTemp;
            await this._download(url);
            ofs = ofs + 2;
        }
        return YAPI_SUCCESS;
    }

    async set_extraSettings(jsonExtra)
    {
        /** @type {string[]} **/
        let extras = [];
        /** @type {string} **/
        let functionId;
        /** @type {string} **/
        let data;
        extras = this.imm_json_get_array(this._yapi.imm_str2bin(jsonExtra));
        for (let ii in  extras) {
            functionId = this.imm_get_json_path( extras[ii], 'fid');
            functionId = this.imm_decode_json_string(functionId);
            data = this.imm_get_json_path( extras[ii], 'json');
            if (await this.hasFunction(functionId)) {
                await this.loadThermistorExtra(functionId, data);
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Restores all the settings and uploaded files to the module.
     * This method is useful to restore all the logical names and calibrations parameters,
     * uploaded files etc. of a device from a backup.
     * Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings {Uint8Array} : a binary buffer with all the settings.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_allSettingsAndFiles(settings)
    {
        /** @type {Uint8Array} **/
        let down;
        /** @type {string} **/
        let json;
        /** @type {string} **/
        let json_api;
        /** @type {string} **/
        let json_files;
        /** @type {string} **/
        let json_extra;
        json = this._yapi.imm_bin2str(settings);
        json_api = this.imm_get_json_path(json, 'api');
        if (json_api == '') {
            return await this.set_allSettings(settings);
        }
        json_extra = this.imm_get_json_path(json, 'extras');
        if (!(json_extra == '')) {
            await this.set_extraSettings(json_extra);
        }
        await this.set_allSettings(this._yapi.imm_str2bin(json_api));
        if (await this.hasFunction('files')) {
            /** @type {string[]} **/
            let files = [];
            /** @type {string} **/
            let res;
            /** @type {string} **/
            let name;
            /** @type {string} **/
            let data;
            down = await this._download('files.json?a=format');
            res = this.imm_get_json_path(this._yapi.imm_bin2str(down), 'res');
            res = this.imm_decode_json_string(res);
            if (!(res == 'ok')) {
                return this._throw(YAPI_IO_ERROR,'format failed',YAPI_IO_ERROR);
            }
            json_files = this.imm_get_json_path(json, 'files');
            files = this.imm_json_get_array(this._yapi.imm_str2bin(json_files));
            for (let ii in  files) {
                name = this.imm_get_json_path( files[ii], 'name');
                name = this.imm_decode_json_string(name);
                data = this.imm_get_json_path( files[ii], 'data');
                data = this.imm_decode_json_string(data);
                await this._upload(name, this._yapi.imm_hexstr2bin(data));
            }
        }
        // Apply settings a second time for file-dependent settings and dynamic sensor nodes
        await this.set_allSettings(this._yapi.imm_str2bin(json_api));
        return YAPI_SUCCESS;
    }

    /**
     * Tests if the device includes a specific function. This method takes a function identifier
     * and returns a boolean.
     *
     * @param funcId {string} : the requested function identifier
     *
     * @return {boolean} true if the device has the function identifier
     */
    async hasFunction(funcId)
    {
        /** @type {number} **/
        let count;
        /** @type {number} **/
        let i;
        /** @type {string} **/
        let fid;

        count = await this.functionCount();
        i = 0;
        while (i < count) {
            fid = await this.functionId(i);
            if (fid == funcId) {
                return true;
            }
            i = i + 1;
        }
        return false;
    }

    /**
     * Retrieve all hardware identifier that match the type passed in argument.
     *
     * @param funType {string} : The type of function (Relay, LightSensor, Voltage,...)
     *
     * @return {string[]} an array of strings.
     */
    async get_functionIds(funType)
    {
        /** @type {number} **/
        let count;
        /** @type {number} **/
        let i;
        /** @type {string} **/
        let ftype;
        /** @type {string[]} **/
        let res = [];

        count = await this.functionCount();
        i = 0;
        while (i < count) {
            ftype = await this.functionType(i);
            if (ftype == funType) {
                res.push(await this.functionId(i));
            } else {
                ftype = await this.functionBaseType(i);
                if (ftype == funType) {
                    res.push(await this.functionId(i));
                }
            }
            i = i + 1;
        }
        return res;
    }

    imm_flattenJsonStruct(jsoncomplex)
    {
        return this.imm_flattenJsonStruct_internal(jsoncomplex);
    }

    async calibVersion(cparams)
    {
        if (cparams == '0,') {
            return 3;
        }
        if ((cparams).indexOf(',') >= 0) {
            if ((cparams).indexOf(' ') > 0) {
                return 3;
            } else {
                return 1;
            }
        }
        if (cparams == '' || cparams == '0') {
            return 1;
        }
        if (((cparams).length < 2) || ((cparams).indexOf('.') >= 0)) {
            return 0;
        } else {
            return 2;
        }
    }

    async calibScale(unit_name,sensorType)
    {
        if (unit_name == 'g' || unit_name == 'gauss' || unit_name == 'W') {
            return 1000;
        }
        if (unit_name == 'C') {
            if (sensorType == '') {
                return 16;
            }
            if (this._yapi.imm_atoi(sensorType) < 8) {
                return 16;
            } else {
                return 100;
            }
        }
        if (unit_name == 'm' || unit_name == 'deg') {
            return 10;
        }
        return 1;
    }

    async calibOffset(unit_name)
    {
        if (unit_name == '% RH' || unit_name == 'mbar' || unit_name == 'lx') {
            return 0;
        }
        return 32767;
    }

    async calibConvert(param,currentFuncValue,unit_name,sensorType)
    {
        /** @type {number} **/
        let paramVer;
        /** @type {number} **/
        let funVer;
        /** @type {number} **/
        let funScale;
        /** @type {number} **/
        let funOffset;
        /** @type {number} **/
        let paramScale;
        /** @type {number} **/
        let paramOffset;
        /** @type {number[]} **/
        let words = [];
        /** @type {string[]} **/
        let words_str = [];
        /** @type {number[]} **/
        let calibData = [];
        /** @type {number[]} **/
        let iCalib = [];
        /** @type {number} **/
        let calibType;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let maxSize;
        /** @type {number} **/
        let ratio;
        /** @type {number} **/
        let nPoints;
        /** @type {number} **/
        let wordVal;
        // Initial guess for parameter encoding
        paramVer = await this.calibVersion(param);
        funVer = await this.calibVersion(currentFuncValue);
        funScale = await this.calibScale(unit_name, sensorType);
        funOffset = await this.calibOffset(unit_name);
        paramScale = funScale;
        paramOffset = funOffset;
        if (funVer < 3) {
            // Read the effective device scale if available
            if (funVer == 2) {
                words = this._yapi.imm_decodeWords(currentFuncValue);
                if ((words[0] == 1366) && (words[1] == 12500)) {
                    // Yocto-3D RefFrame used a special encoding
                    funScale = 1;
                    funOffset = 0;
                } else {
                    funScale = words[1];
                    funOffset = words[0];
                }
            } else {
                if (funVer == 1) {
                    if (currentFuncValue == '' || (this._yapi.imm_atoi(currentFuncValue) > 10)) {
                        funScale = 0;
                    }
                }
            }
        }
        calibData.length = 0;
        calibType = 0;
        if (paramVer < 3) {
            // Handle old 16 bit parameters formats
            if (paramVer == 2) {
                words = this._yapi.imm_decodeWords(param);
                if ((words[0] == 1366) && (words[1] == 12500)) {
                    // Yocto-3D RefFrame used a special encoding
                    paramScale = 1;
                    paramOffset = 0;
                } else {
                    paramScale = words[1];
                    paramOffset = words[0];
                }
                if ((words.length >= 3) && (words[2] > 0)) {
                    maxSize = 3 + 2 * ((words[2]) % (10));
                    if (maxSize > words.length) {
                        maxSize = words.length;
                    }
                    i = 3;
                    while (i < maxSize) {
                        calibData.push(words[i]);
                        i = i + 1;
                    }
                }
            } else {
                if (paramVer == 1) {
                    words_str = (param).split(',');
                    for (let ii in words_str) {
                        words.push(this._yapi.imm_atoi(words_str[ii]));
                    }
                    if (param == '' || (words[0] > 10)) {
                        paramScale = 0;
                    }
                    if ((words.length > 0) && (words[0] > 0)) {
                        maxSize = 1 + 2 * ((words[0]) % (10));
                        if (maxSize > words.length) {
                            maxSize = words.length;
                        }
                        i = 1;
                        while (i < maxSize) {
                            calibData.push(words[i]);
                            i = i + 1;
                        }
                    }
                } else {
                    if (paramVer == 0) {
                        ratio = parseFloat(param);
                        if (ratio > 0) {
                            calibData.push(0.0);
                            calibData.push(0.0);
                            calibData.push(Math.round(65535 / ratio));
                            calibData.push(65535.0);
                        }
                    }
                }
            }
            i = 0;
            while (i < calibData.length) {
                if (paramScale > 0) {
                    // scalar decoding
                    calibData[i] = (calibData[i] - paramOffset) / paramScale;
                } else {
                    // floating-point decoding
                    calibData[i] = this._yapi.imm_decimalToDouble(Math.round(calibData[i]));
                }
                i = i + 1;
            }
        } else {
            // Handle latest 32bit parameter format
            iCalib = this._yapi.imm_decodeFloats(param);
            calibType = Math.round(iCalib[0] / 1000.0);
            if (calibType >= 30) {
                calibType = calibType - 30;
            }
            i = 1;
            while (i < iCalib.length) {
                calibData.push(iCalib[i] / 1000.0);
                i = i + 1;
            }
        }
        if (funVer >= 3) {
            // Encode parameters in new format
            if (calibData.length == 0) {
                param = '0,';
            } else {
                param = 30 + calibType;
                i = 0;
                while (i < calibData.length) {
                    if (((i) & (1)) > 0) {
                        param = param + ':';
                    } else {
                        param = param + ' ';
                    }
                    param = param + Math.round(calibData[i] * 1000.0 / 1000.0);
                    i = i + 1;
                }
                param = param + ',';
            }
        } else {
            if (funVer >= 1) {
                // Encode parameters for older devices
                nPoints = parseInt((calibData.length) / (2), 10);
                param = nPoints;
                i = 0;
                while (i < 2 * nPoints) {
                    if (funScale == 0) {
                        wordVal = this._yapi.imm_doubleToDecimal(Math.round(calibData[i]));
                    } else {
                        wordVal = calibData[i] * funScale + funOffset;
                    }
                    param = param + ',' + Math.round(wordVal);
                    i = i + 1;
                }
            } else {
                // Initial V0 encoding used for old Yocto-Light
                if (calibData.length == 4) {
                    param = Math.round(1000 * (calibData[3] - calibData[1]) / calibData[2] - calibData[0]);
                }
            }
        }
        return param;
    }

    /**
     * Restores all the settings of the device. Useful to restore all the logical names and calibrations parameters
     * of a module from a backup.Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings {Uint8Array} : a binary buffer with all the settings.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_allSettings(settings)
    {
        /** @type {string[]} **/
        let restoreLast = [];
        /** @type {Uint8Array} **/
        let old_json_flat;
        /** @type {string[]} **/
        let old_dslist = [];
        /** @type {string[]} **/
        let old_jpath = [];
        /** @type {number[]} **/
        let old_jpath_len = [];
        /** @type {string[]} **/
        let old_val_arr = [];
        /** @type {Uint8Array} **/
        let actualSettings;
        /** @type {string[]} **/
        let new_dslist = [];
        /** @type {string[]} **/
        let new_jpath = [];
        /** @type {number[]} **/
        let new_jpath_len = [];
        /** @type {string[]} **/
        let new_val_arr = [];
        /** @type {number} **/
        let cpos;
        /** @type {number} **/
        let eqpos;
        /** @type {number} **/
        let leng;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let j;
        /** @type {string} **/
        let njpath;
        /** @type {string} **/
        let jpath;
        /** @type {string} **/
        let fun;
        /** @type {string} **/
        let attr;
        /** @type {string} **/
        let value;
        /** @type {string} **/
        let url;
        /** @type {string} **/
        let tmp;
        /** @type {string} **/
        let new_calib;
        /** @type {string} **/
        let sensorType;
        /** @type {string} **/
        let unit_name;
        /** @type {string} **/
        let newval;
        /** @type {string} **/
        let oldval;
        /** @type {string} **/
        let old_calib;
        /** @type {string} **/
        let each_str;
        /** @type {boolean} **/
        let do_update;
        /** @type {boolean} **/
        let found;
        tmp = this._yapi.imm_bin2str(settings);
        tmp = this.imm_get_json_path(tmp, 'api');
        if (!(tmp == '')) {
            settings = this._yapi.imm_str2bin(tmp);
        }
        oldval = '';
        newval = '';
        old_json_flat = this.imm_flattenJsonStruct(settings);
        old_dslist = this.imm_json_get_array(old_json_flat);
        for (let ii in old_dslist) {
            each_str = this.imm_json_get_string(this._yapi.imm_str2bin(old_dslist[ii]));
            // split json path and attr
            leng = (each_str).length;
            eqpos = (each_str).indexOf('=');
            if ((eqpos < 0) || (leng == 0)) {
                this._throw(YAPI_INVALID_ARGUMENT, 'Invalid settings');
                return YAPI_INVALID_ARGUMENT;
            }
            jpath = (each_str).substr( 0, eqpos);
            eqpos = eqpos + 1;
            value = (each_str).substr( eqpos, leng - eqpos);
            old_jpath.push(jpath);
            old_jpath_len.push((jpath).length);
            old_val_arr.push(value);
        }

        actualSettings = await this._download('api.json');
        actualSettings = this.imm_flattenJsonStruct(actualSettings);
        new_dslist = this.imm_json_get_array(actualSettings);
        for (let ii in new_dslist) {
            // remove quotes
            each_str = this.imm_json_get_string(this._yapi.imm_str2bin(new_dslist[ii]));
            // split json path and attr
            leng = (each_str).length;
            eqpos = (each_str).indexOf('=');
            if ((eqpos < 0) || (leng == 0)) {
                this._throw(YAPI_INVALID_ARGUMENT, 'Invalid settings');
                return YAPI_INVALID_ARGUMENT;
            }
            jpath = (each_str).substr( 0, eqpos);
            eqpos = eqpos + 1;
            value = (each_str).substr( eqpos, leng - eqpos);
            new_jpath.push(jpath);
            new_jpath_len.push((jpath).length);
            new_val_arr.push(value);
        }
        i = 0;
        while (i < new_jpath.length) {
            njpath = new_jpath[i];
            leng = (njpath).length;
            cpos = (njpath).indexOf('/');
            if ((cpos < 0) || (leng == 0)) {
                continue;
            }
            fun = (njpath).substr( 0, cpos);
            cpos = cpos + 1;
            attr = (njpath).substr( cpos, leng - cpos);
            do_update = true;
            if (fun == 'services') {
                do_update = false;
            }
            if ((do_update) && (attr == 'firmwareRelease')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'usbCurrent')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'upTime')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'persistentSettings')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'adminPassword')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'userPassword')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'rebootCountdown')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'advertisedValue')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'poeCurrent')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'readiness')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'ipAddress')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'subnetMask')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'router')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'linkQuality')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'ssid')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'channel')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'security')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'message')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'currentValue')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'currentRawValue')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'currentRunIndex')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'pulseTimer')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'lastTimePressed')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'lastTimeReleased')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'filesCount')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'freeSpace')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'timeUTC')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'rtcTime')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'unixTime')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'dateTime')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'rawValue')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'lastMsg')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'delayedPulseTimer')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'rxCount')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'txCount')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'msgCount')) {
                do_update = false;
            }
            if (do_update) {
                do_update = false;
                newval = new_val_arr[i];
                j = 0;
                found = false;
                while ((j < old_jpath.length) && !(found)) {
                    if ((new_jpath_len[i] == old_jpath_len[j]) && (new_jpath[i] == old_jpath[j])) {
                        found = true;
                        oldval = old_val_arr[j];
                        if (!(newval == oldval)) {
                            do_update = true;
                        }
                    }
                    j = j + 1;
                }
            }
            if (do_update) {
                if (attr == 'calibrationParam') {
                    old_calib = '';
                    unit_name = '';
                    sensorType = '';
                    new_calib = newval;
                    j = 0;
                    found = false;
                    while ((j < old_jpath.length) && !(found)) {
                        if ((new_jpath_len[i] == old_jpath_len[j]) && (new_jpath[i] == old_jpath[j])) {
                            found = true;
                            old_calib = old_val_arr[j];
                        }
                        j = j + 1;
                    }
                    tmp = fun + '/unit';
                    j = 0;
                    found = false;
                    while ((j < new_jpath.length) && !(found)) {
                        if (tmp == new_jpath[j]) {
                            found = true;
                            unit_name = new_val_arr[j];
                        }
                        j = j + 1;
                    }
                    tmp = fun + '/sensorType';
                    j = 0;
                    found = false;
                    while ((j < new_jpath.length) && !(found)) {
                        if (tmp == new_jpath[j]) {
                            found = true;
                            sensorType = new_val_arr[j];
                        }
                        j = j + 1;
                    }
                    newval = await this.calibConvert(old_calib,  new_val_arr[i],  unit_name, sensorType);
                    url = 'api/' + fun + '.json?' + attr + '=' + this.imm_escapeAttr(newval);
                    await this._download(url);
                } else {
                    url = 'api/' + fun + '.json?' + attr + '=' + this.imm_escapeAttr(oldval);
                    if (attr == 'resolution') {
                        restoreLast.push(url);
                    } else {
                        await this._download(url);
                    }
                }
            }
            i = i + 1;
        }
        for (let ii in restoreLast) {
            await this._download(restoreLast[ii]);
        }
        await this.clearCache();
        return YAPI_SUCCESS;
    }

    /**
     * Returns the unique hardware identifier of the module.
     * The unique hardware identifier is made of the device serial
     * number followed by string ".module".
     *
     * @return {string} a string that uniquely identifies the module
     */
    async get_hardwareId()
    {
        /** @type {string} **/
        let serial;

        serial = await this.get_serialNumber();
        return serial + '.module';
    }

    /**
     * Downloads the specified built-in file and returns a binary buffer with its content.
     *
     * @param pathname {string} : name of the new file to load
     *
     * @return {Uint8Array} a binary buffer with the file content
     *
     * On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async download(pathname)
    {
        return await this._download(pathname);
    }

    /**
     * Returns the icon of the module. The icon is a PNG image and does not
     * exceeds 1536 bytes.
     *
     * @return {Uint8Array} a binary buffer with module icon, in png format.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async get_icon2d()
    {
        return await this._download('icon2d.png');
    }

    /**
     * Returns a string with last logs of the module. This method return only
     * logs that are still in the module.
     *
     * @return {string} a string with last logs of the module.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async get_lastLogs()
    {
        /** @type {Uint8Array} **/
        let content;

        content = await this._download('logs.txt');
        return this._yapi.imm_bin2str(content);
    }

    /**
     * Adds a text message to the device logs. This function is useful in
     * particular to trace the execution of HTTP callbacks. If a newline
     * is desired after the message, it must be included in the string.
     *
     * @param text {string} : the string to append to the logs.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async log(text)
    {
        return await this._upload('logs.txt', this._yapi.imm_str2bin(text));
    }

    /**
     * Returns a list of all the modules that are plugged into the current module.
     * This method only makes sense when called for a YoctoHub/VirtualHub.
     * Otherwise, an empty array will be returned.
     *
     * @return {string[]} an array of strings containing the sub modules.
     */
    async get_subDevices()
    {
        return await this.get_subDevices_internal();
    }

    /**
     * Returns the serial number of the YoctoHub on which this module is connected.
     * If the module is connected by USB, or if the module is the root YoctoHub, an
     * empty string is returned.
     *
     * @return {string} a string with the serial number of the YoctoHub or an empty string
     */
    async get_parentHub()
    {
        return await this.get_parentHub_internal();
    }

    /**
     * Returns the URL used to access the module. If the module is connected by USB, the
     * string 'usb' is returned.
     *
     * @return {string} a string with the URL of the module.
     */
    async get_url()
    {
        return await this.get_url_internal();
    }

    /**
     * Continues the module enumeration started using yFirstModule().
     * Caution: You can't make any assumption about the returned modules order.
     * If you want to find a specific module, use Module.findModule()
     * and a hardwareID or a logical name.
     *
     * @return {YModule} a pointer to a YModule object, corresponding to
     *         the next module found, or a null pointer
     *         if there are no more modules to enumerate.
     */
    nextModule()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YModule.FindModuleInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of modules currently accessible.
     * Use the method YModule.nextModule() to iterate on the
     * next modules.
     *
     * @return {YModule} a pointer to a YModule object, corresponding to
     *         the first module currently online, or a null pointer
     *         if there are none.
     */
    static FirstModule()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Module');
        if(next_hwid == null) return null;
        return YModule.FindModule(next_hwid);
    }

    /**
     * Retrieves the first Module in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YModule}
     */
    static FirstModuleInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Module');
        if(next_hwid == null) return null;
        return YModule.FindModuleInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            PRODUCTNAME_INVALID          : YAPI_INVALID_STRING,
            SERIALNUMBER_INVALID         : YAPI_INVALID_STRING,
            PRODUCTID_INVALID            : YAPI_INVALID_UINT,
            PRODUCTRELEASE_INVALID       : YAPI_INVALID_UINT,
            FIRMWARERELEASE_INVALID      : YAPI_INVALID_STRING,
            PERSISTENTSETTINGS_LOADED    : 0,
            PERSISTENTSETTINGS_SAVED     : 1,
            PERSISTENTSETTINGS_MODIFIED  : 2,
            PERSISTENTSETTINGS_INVALID   : -1,
            LUMINOSITY_INVALID           : YAPI_INVALID_UINT,
            BEACON_OFF                   : 0,
            BEACON_ON                    : 1,
            BEACON_INVALID               : -1,
            UPTIME_INVALID               : YAPI_INVALID_LONG,
            USBCURRENT_INVALID           : YAPI_INVALID_UINT,
            REBOOTCOUNTDOWN_INVALID      : YAPI_INVALID_INT,
            USERVAR_INVALID              : YAPI_INVALID_INT
        });
    }

    //--- (end of generated code: YModule implementation)
}

//
// YModuleProxy Class: synchronous proxy to YModule objects
//
// This class is used to provide a pseudo-synchronous API on top
// of Ymodule objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YModuleProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    /**
     * Forces a full redetection of the device, in case the functions changed
     *
     * @noreturn
     */
    forceDeviceRefresh()
    {
        setTimeout((m)=> { m.forceDeviceRefresh();}, 300, this.liveFunc);
    }

    /**
     * Returns the number of functions (beside the "module" interface) available on the module.
     *
     * @return {number} the number of functions on the module
     *
     * On failure, throws an exception or returns a negative error code.
     */
    functionCount()
    {
        /** @type {YDevice} **/
        let dev = this.liveFunc.imm_getDev();
        if (!dev) return YAPI_DEVICE_NOT_FOUND;
        return dev.imm_functionCount();
    }

    /**
     * Retrieves the hardware identifier of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a string corresponding to the unambiguous hardware identifier of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionId(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.liveFunc.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionId(functionIndex);
    }

    /**
     * Retrieves the type of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a the type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionType(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.liveFunc.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionType(functionIndex);
    }

    /**
     * Retrieves the base type of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return {string} a the base type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionBaseType(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.liveFunc.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionBaseType(functionIndex);
    }

    /**
     * Retrieves the logical name of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a string corresponding to the logical name of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionName(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.liveFunc.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionName(functionIndex);
    }

    /**
     * Retrieves the advertised value of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a short string (up to 6 characters) corresponding to the advertised value of the
     * requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionValue(functionIndex)
    {
        /** @type {YDevice} **/
        let dev = this.liveFunc.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionValue(functionIndex);
    }

    /**
     * Returns the logical name of the module.
     *
     * @return {string} a string corresponding to the logical name of the module
     *
     * On failure, throws an exception or returns YModule.LOGICALNAME_INVALID.
     */
    get_logicalName()
    {
        /** @type {YDevice} **/
        var dev = this.liveFunc.imm_getDev();
        if(dev != null) {
            return dev._logicalName;
        }
        return this.liveFunc._logicalName;
    }

    //--- (generated code: YModule accessors declaration)

    /**
     * Returns the commercial name of the module, as set by the factory.
     *
     * @return a string corresponding to the commercial name of the module, as set by the factory
     *
     * On failure, throws an exception or returns Y_PRODUCTNAME_INVALID.
     */
    get_productName()
    {
        return this.liveFunc._productName;
    }

    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return a string corresponding to the serial number of the module, as set by the factory
     *
     * On failure, throws an exception or returns Y_SERIALNUMBER_INVALID.
     */
    get_serialNumber()
    {
        return this.liveFunc._serialNumber;
    }

    /**
     * Returns the USB device identifier of the module.
     *
     * @return an integer corresponding to the USB device identifier of the module
     *
     * On failure, throws an exception or returns Y_PRODUCTID_INVALID.
     */
    get_productId()
    {
        return this.liveFunc._productId;
    }

    /**
     * Returns the hardware release version of the module.
     *
     * @return an integer corresponding to the hardware release version of the module
     *
     * On failure, throws an exception or returns Y_PRODUCTRELEASE_INVALID.
     */
    get_productRelease()
    {
        return this.liveFunc._productRelease;
    }

    /**
     * Returns the version of the firmware embedded in the module.
     *
     * @return a string corresponding to the version of the firmware embedded in the module
     *
     * On failure, throws an exception or returns Y_FIRMWARERELEASE_INVALID.
     */
    get_firmwareRelease()
    {
        return this.liveFunc._firmwareRelease;
    }

    /**
     * Returns the current state of persistent module settings.
     *
     * @return a value among Y_PERSISTENTSETTINGS_LOADED, Y_PERSISTENTSETTINGS_SAVED and
     * Y_PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     *
     * On failure, throws an exception or returns Y_PERSISTENTSETTINGS_INVALID.
     */
    get_persistentSettings()
    {
        return this.liveFunc._persistentSettings;
    }

    set_persistentSettings(newval)
    {
        this.liveFunc.set_persistentSettings(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the luminosity of the  module informative LEDs (from 0 to 100).
     *
     * @return an integer corresponding to the luminosity of the  module informative LEDs (from 0 to 100)
     *
     * On failure, throws an exception or returns Y_LUMINOSITY_INVALID.
     */
    get_luminosity()
    {
        return this.liveFunc._luminosity;
    }

    /**
     * Changes the luminosity of the module informative leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the luminosity of the module informative leds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_luminosity(newval)
    {
        this.liveFunc.set_luminosity(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the state of the localization beacon.
     *
     * @return either Y_BEACON_OFF or Y_BEACON_ON, according to the state of the localization beacon
     *
     * On failure, throws an exception or returns Y_BEACON_INVALID.
     */
    get_beacon()
    {
        return this.liveFunc._beacon;
    }

    /**
     * Turns on or off the module localization beacon.
     *
     * @param newval : either Y_BEACON_OFF or Y_BEACON_ON
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_beacon(newval)
    {
        this.liveFunc.set_beacon(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the number of milliseconds spent since the module was powered on.
     *
     * @return an integer corresponding to the number of milliseconds spent since the module was powered on
     *
     * On failure, throws an exception or returns Y_UPTIME_INVALID.
     */
    get_upTime()
    {
        return this.liveFunc._upTime;
    }

    /**
     * Returns the current consumed by the module on the USB bus, in milli-amps.
     *
     * @return an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     *
     * On failure, throws an exception or returns Y_USBCURRENT_INVALID.
     */
    get_usbCurrent()
    {
        return this.liveFunc._usbCurrent;
    }

    /**
     * Returns the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     *
     * @return an integer corresponding to the remaining number of seconds before the module restarts, or zero when no
     *         reboot has been scheduled
     *
     * On failure, throws an exception or returns Y_REBOOTCOUNTDOWN_INVALID.
     */
    get_rebootCountdown()
    {
        return this.liveFunc._rebootCountdown;
    }

    set_rebootCountdown(newval)
    {
        this.liveFunc.set_rebootCountdown(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the value previously stored in this attribute.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @return an integer corresponding to the value previously stored in this attribute
     *
     * On failure, throws an exception or returns Y_USERVAR_INVALID.
     */
    get_userVar()
    {
        return this.liveFunc._userVar;
    }

    /**
     * Stores a 32 bit value in the device RAM. This attribute is at programmer disposal,
     * should he need to store a state variable.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @param newval : an integer
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_userVar(newval)
    {
        this.liveFunc.set_userVar(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Saves current settings in the nonvolatile memory of the module.
     * Warning: the number of allowed save operations during a module life is
     * limited (about 100000 cycles). Do not call this function within a loop.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveToFlash()
    {
        this.liveFunc.saveToFlash();
        return YAPI_SUCCESS;
    }

    /**
     * Reloads the settings stored in the nonvolatile memory, as
     * when the module is powered on.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    revertFromFlash()
    {
        this.liveFunc.revertFromFlash();
        return YAPI_SUCCESS;
    }

    /**
     * Schedules a simple module reboot after the given number of seconds.
     *
     * @param secBeforeReboot : number of seconds before rebooting
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reboot(secBeforeReboot)
    {
        this.liveFunc.reboot(secBeforeReboot);
        return YAPI_SUCCESS;
    }

    /**
     * Schedules a module reboot into special firmware update mode.
     *
     * @param secBeforeReboot : number of seconds before rebooting
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerFirmwareUpdate(secBeforeReboot)
    {
        this.liveFunc.triggerFirmwareUpdate(secBeforeReboot);
        return YAPI_SUCCESS;
    }

    /**
     * Registers a device log callback function. This callback will be called each time
     * that a module sends a new log message. Mostly useful to debug a Yoctopuce module.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the module object that emitted the log message, and the character string containing the log.
     *         On failure, throws an exception or returns a negative error code.
     */
    registerLogCallback(callback)
    {
        this.liveFunc.registerLogCallback(callback);
        return YAPI_SUCCESS;
    }

    /**
     * Register a callback function, to be called when a persistent settings in
     * a device configuration has been changed (e.g. change of unit, etc).
     *
     * @param callback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    registerConfigChangeCallback(callback)
    {
        this.liveFunc.registerConfigChangeCallback(callback);
        return YAPI_SUCCESS;
    }

    /**
     * Register a callback function, to be called when the localization beacon of the module
     * has been changed. The callback function should take two arguments: the YModule object of
     * which the beacon has changed, and an integer describing the new beacon state.
     *
     * @param callback : The callback function to call, or null to unregister a
     *         previously registered callback.
     */
    registerBeaconCallback(callback)
    {
        this.liveFunc.registerBeaconCallback(callback);
        return YAPI_SUCCESS;
    }

    /**
     * Triggers a configuration change callback, to check if they are supported or not.
     */
    triggerConfigChangeCallback()
    {
        this.liveFunc.triggerConfigChangeCallback();
        return YAPI_SUCCESS;
    }

    loadThermistorExtra(funcId,jsonExtra)
    {
        this.liveFunc.loadThermistorExtra(funcId, jsonExtra);
        return YAPI_SUCCESS;
    }

    set_extraSettings(jsonExtra)
    {
        this.liveFunc.set_extraSettings(jsonExtra);
        return YAPI_SUCCESS;
    }

    /**
     * Restores all the settings and uploaded files to the module.
     * This method is useful to restore all the logical names and calibrations parameters,
     * uploaded files etc. of a device from a backup.
     * Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings : a binary buffer with all the settings.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_allSettingsAndFiles(settings)
    {
        this.liveFunc.set_allSettingsAndFiles(settings);
        return YAPI_SUCCESS;
    }

    /**
     * Restores all the settings of the device. Useful to restore all the logical names and calibrations parameters
     * of a module from a backup.Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings : a binary buffer with all the settings.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_allSettings(settings)
    {
        this.liveFunc.set_allSettings(settings);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a text message to the device logs. This function is useful in
     * particular to trace the execution of HTTP callbacks. If a newline
     * is desired after the message, it must be included in the string.
     *
     * @param text : the string to append to the logs.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    log(text)
    {
        this.liveFunc.log(text);
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YModule accessors declaration)
}

//--- (generated code: YModule functions)

YoctoLibExport('YModule', YModule);
YoctoLibExport('YModuleProxy', YModuleProxy);
YModule.imm_Init();

//--- (end of generated code: YModule functions)

//--- (generated code: YSensor class start)
/**
 * YSensor Class: Sensor function interface
 *
 * The YSensor class is the parent class for all Yoctopuce sensors. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provide a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
//--- (end of generated code: YSensor class start)
/** @extends {YFunction} **/
class YSensor extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (generated code: YSensor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Sensor';
        /** @member {string} **/
        this._unit                       = YSensor.UNIT_INVALID;
        /** @member {number} **/
        this._currentValue               = YSensor.CURRENTVALUE_INVALID;
        /** @member {number} **/
        this._lowestValue                = YSensor.LOWESTVALUE_INVALID;
        /** @member {number} **/
        this._highestValue               = YSensor.HIGHESTVALUE_INVALID;
        /** @member {number} **/
        this._currentRawValue            = YSensor.CURRENTRAWVALUE_INVALID;
        /** @member {string} **/
        this._logFrequency               = YSensor.LOGFREQUENCY_INVALID;
        /** @member {string} **/
        this._reportFrequency            = YSensor.REPORTFREQUENCY_INVALID;
        /** @member {number} **/
        this._advMode                    = YSensor.ADVMODE_INVALID;
        /** @member {string} **/
        this._calibrationParam           = YSensor.CALIBRATIONPARAM_INVALID;
        /** @member {number} **/
        this._resolution                 = YSensor.RESOLUTION_INVALID;
        /** @member {number} **/
        this._sensorState                = YSensor.SENSORSTATE_INVALID;
        /** @member {function} **/
        this._timedReportCallbackSensor  = null;
        /** @member {number} **/
        this._prevTimedReport            = 0;
        /** @member {number} **/
        this._iresol                     = 0;
        /** @member {number} **/
        this._offset                     = 0;
        /** @member {number} **/
        this._scale                      = 0;
        /** @member {number} **/
        this._decexp                     = 0;
        /** @member {number} **/
        this._caltyp                     = 0;
        /** @member {number[]} **/
        this._calpar                     = [];
        /** @member {number[]} **/
        this._calraw                     = [];
        /** @member {number[]} **/
        this._calref                     = [];
        /** @member {function} **/
        this._calhdl                     = null;
        //--- (end of generated code: YSensor constructor)
    }

    //--- (generated code: YSensor implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'unit':
            this._unit = val;
            return 1;
        case 'currentValue':
            this._currentValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'lowestValue':
            this._lowestValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'highestValue':
            this._highestValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'currentRawValue':
            this._currentRawValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'logFrequency':
            this._logFrequency = val;
            return 1;
        case 'reportFrequency':
            this._reportFrequency = val;
            return 1;
        case 'advMode':
            this._advMode = parseInt(val);
            return 1;
        case 'calibrationParam':
            this._calibrationParam = val;
            return 1;
        case 'resolution':
            this._resolution = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'sensorState':
            this._sensorState = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the measuring unit for the measure.
     *
     * @return {string} a string corresponding to the measuring unit for the measure
     *
     * On failure, throws an exception or returns YSensor.UNIT_INVALID.
     */
    async get_unit()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.UNIT_INVALID;
            }
        }
        res = this._unit;
        return res;
    }

    /**
     * Returns the current value of the measure, in the specified unit, as a floating point number.
     * Note that a get_currentValue() call will *not* start a measure in the device, it
     * will just return the last measure that occurred in the device. Indeed, internally, each Yoctopuce
     * devices is continuously making measurements at a hardware specific frequency.
     *
     * If continuously calling  get_currentValue() leads you to performances issues, then
     * you might consider to switch to callback programming model. Check the "advanced
     * programming" chapter in in your device user manual for more information.
     *
     * @return {number} a floating point number corresponding to the current value of the measure, in the
     * specified unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTVALUE_INVALID.
     */
    async get_currentValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.CURRENTVALUE_INVALID;
            }
        }
        res = await this._applyCalibration(this._currentRawValue);
        if (res == YSensor.CURRENTVALUE_INVALID) {
            res = this._currentValue;
        }
        res = res * this._iresol;
        res = Math.round(res) / this._iresol;
        return res;
    }

    /**
     * Changes the recorded minimal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval {number} : a floating point number corresponding to the recorded minimal value observed
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_lowestValue(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('lowestValue',rest_val);
    }

    /**
     * Returns the minimal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_lowestValue().
     *
     * @return {number} a floating point number corresponding to the minimal value observed for the
     * measure since the device was started
     *
     * On failure, throws an exception or returns YSensor.LOWESTVALUE_INVALID.
     */
    async get_lowestValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.LOWESTVALUE_INVALID;
            }
        }
        res = this._lowestValue * this._iresol;
        res = Math.round(res) / this._iresol;
        return res;
    }

    /**
     * Changes the recorded maximal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval {number} : a floating point number corresponding to the recorded maximal value observed
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_highestValue(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('highestValue',rest_val);
    }

    /**
     * Returns the maximal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_highestValue().
     *
     * @return {number} a floating point number corresponding to the maximal value observed for the
     * measure since the device was started
     *
     * On failure, throws an exception or returns YSensor.HIGHESTVALUE_INVALID.
     */
    async get_highestValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.HIGHESTVALUE_INVALID;
            }
        }
        res = this._highestValue * this._iresol;
        res = Math.round(res) / this._iresol;
        return res;
    }

    /**
     * Returns the uncalibrated, unrounded raw value returned by the sensor, in the specified unit, as a
     * floating point number.
     *
     * @return {number} a floating point number corresponding to the uncalibrated, unrounded raw value
     * returned by the sensor, in the specified unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTRAWVALUE_INVALID.
     */
    async get_currentRawValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.CURRENTRAWVALUE_INVALID;
            }
        }
        res = this._currentRawValue;
        return res;
    }

    /**
     * Returns the datalogger recording frequency for this function, or "OFF"
     * when measures are not stored in the data logger flash memory.
     *
     * @return {string} a string corresponding to the datalogger recording frequency for this function, or "OFF"
     *         when measures are not stored in the data logger flash memory
     *
     * On failure, throws an exception or returns YSensor.LOGFREQUENCY_INVALID.
     */
    async get_logFrequency()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.LOGFREQUENCY_INVALID;
            }
        }
        res = this._logFrequency;
        return res;
    }

    /**
     * Changes the datalogger recording frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (eg. "4/h"). To disable recording for this function, use
     * the value "OFF". Note that setting the  datalogger recording frequency
     * to a greater value than the sensor native sampling frequency is useless,
     * and even counterproductive: those two frequencies are not related.
     *
     * @param newval {string} : a string corresponding to the datalogger recording frequency for this function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_logFrequency(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('logFrequency',rest_val);
    }

    /**
     * Returns the timed value notification frequency, or "OFF" if timed
     * value notifications are disabled for this function.
     *
     * @return {string} a string corresponding to the timed value notification frequency, or "OFF" if timed
     *         value notifications are disabled for this function
     *
     * On failure, throws an exception or returns YSensor.REPORTFREQUENCY_INVALID.
     */
    async get_reportFrequency()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.REPORTFREQUENCY_INVALID;
            }
        }
        res = this._reportFrequency;
        return res;
    }

    /**
     * Changes the timed value notification frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (e.g. "4/h"). To disable timed value notifications for this
     * function, use the value "OFF". Note that setting the  timed value
     * notification frequency to a greater value than the sensor native
     * sampling frequency is unless, and even counterproductive: those two
     * frequencies are not related.
     *
     * @param newval {string} : a string corresponding to the timed value notification frequency for this function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_reportFrequency(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('reportFrequency',rest_val);
    }

    /**
     * Returns the measuring mode used for the advertised value pushed to the parent hub.
     *
     * @return {number} a value among YSensor.ADVMODE_IMMEDIATE, YSensor.ADVMODE_PERIOD_AVG,
     * YSensor.ADVMODE_PERIOD_MIN and YSensor.ADVMODE_PERIOD_MAX corresponding to the measuring mode used
     * for the advertised value pushed to the parent hub
     *
     * On failure, throws an exception or returns YSensor.ADVMODE_INVALID.
     */
    async get_advMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.ADVMODE_INVALID;
            }
        }
        res = this._advMode;
        return res;
    }

    /**
     * Changes the measuring mode used for the advertised value pushed to the parent hub.
     *
     * @param newval {number} : a value among YSensor.ADVMODE_IMMEDIATE, YSensor.ADVMODE_PERIOD_AVG,
     * YSensor.ADVMODE_PERIOD_MIN and YSensor.ADVMODE_PERIOD_MAX corresponding to the measuring mode used
     * for the advertised value pushed to the parent hub
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_advMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('advMode',rest_val);
    }

    async get_calibrationParam()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.CALIBRATIONPARAM_INVALID;
            }
        }
        res = this._calibrationParam;
        return res;
    }

    async set_calibrationParam(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('calibrationParam',rest_val);
    }

    /**
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     *
     * @param newval {number} : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_resolution(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('resolution',rest_val);
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     *
     * @return {number} a floating point number corresponding to the resolution of the measured values
     *
     * On failure, throws an exception or returns YSensor.RESOLUTION_INVALID.
     */
    async get_resolution()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.RESOLUTION_INVALID;
            }
        }
        res = this._resolution;
        return res;
    }

    /**
     * Returns the sensor health state code, which is zero when there is an up-to-date measure
     * available or a positive code if the sensor is not able to provide a measure right now.
     *
     * @return {number} an integer corresponding to the sensor health state code, which is zero when there
     * is an up-to-date measure
     *         available or a positive code if the sensor is not able to provide a measure right now
     *
     * On failure, throws an exception or returns YSensor.SENSORSTATE_INVALID.
     */
    async get_sensorState()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.SENSORSTATE_INVALID;
            }
        }
        res = this._sensorState;
        return res;
    }

    /**
     * Retrieves a sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the sensor
     *
     * @return {YSensor} a YSensor object allowing you to drive the sensor.
     */
    static FindSensor(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Sensor', func);
        if (obj == null) {
            obj = new YSensor(YAPI, func);
            YFunction._AddToCache('Sensor',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the sensor
     *
     * @return {YSensor} a YSensor object allowing you to drive the sensor.
     */
    static FindSensorInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Sensor', func);
        if (obj == null) {
            obj = new YSensor(yctx, func);
            YFunction._AddToCache('Sensor',  func, obj);
        }
        return obj;
    }

    async _parserHelper()
    {
        /** @type {number} **/
        let position;
        /** @type {number} **/
        let maxpos;
        /** @type {number[]} **/
        let iCalib = [];
        /** @type {number} **/
        let iRaw;
        /** @type {number} **/
        let iRef;
        /** @type {number} **/
        let fRaw;
        /** @type {number} **/
        let fRef;
        this._caltyp = -1;
        this._scale = -1;
        this._calpar.length = 0;
        this._calraw.length = 0;
        this._calref.length = 0;
        // Store inverted resolution, to provide better rounding
        if (this._resolution > 0) {
            this._iresol = Math.round(1.0 / this._resolution);
        } else {
            this._iresol = 10000;
            this._resolution = 0.0001;
        }
        // Old format: supported when there is no calibration
        if (this._calibrationParam == '' || this._calibrationParam == '0') {
            this._caltyp = 0;
            return 0;
        }
        if ((this._calibrationParam).indexOf(',') >= 0) {
            // Plain text format
            iCalib = this._yapi.imm_decodeFloats(this._calibrationParam);
            this._caltyp = parseInt((iCalib[0]) / (1000), 10);
            if (this._caltyp > 0) {
                if (this._caltyp < YOCTO_CALIB_TYPE_OFS) {
                    // Unknown calibration type: calibrated value will be provided by the device
                    this._caltyp = -1;
                    return 0;
                }
                this.imm_calhdl = this._yapi.imm_getCalibrationHandler(this._caltyp);
                if (!(this.imm_calhdl != null)) {
                    // Unknown calibration type: calibrated value will be provided by the device
                    this._caltyp = -1;
                    return 0;
                }
            }
            // New 32 bits text format
            this._offset = 0;
            this._scale = 1000;
            maxpos = iCalib.length;
            this._calpar.length = 0;
            position = 1;
            while (position < maxpos) {
                this._calpar.push(iCalib[position]);
                position = position + 1;
            }
            this._calraw.length = 0;
            this._calref.length = 0;
            position = 1;
            while (position + 1 < maxpos) {
                fRaw = iCalib[position];
                fRaw = fRaw / 1000.0;
                fRef = iCalib[position + 1];
                fRef = fRef / 1000.0;
                this._calraw.push(fRaw);
                this._calref.push(fRef);
                position = position + 2;
            }
        } else {
            // Recorder-encoded format, including encoding
            iCalib = this._yapi.imm_decodeWords(this._calibrationParam);
            // In case of unknown format, calibrated value will be provided by the device
            if (iCalib.length < 2) {
                this._caltyp = -1;
                return 0;
            }
            // Save variable format (scale for scalar, or decimal exponent)
            this._offset = 0;
            this._scale = 1;
            this._decexp = 1.0;
            position = iCalib[0];
            while (position > 0) {
                this._decexp = this._decexp * 10;
                position = position - 1;
            }
            // Shortcut when there is no calibration parameter
            if (iCalib.length == 2) {
                this._caltyp = 0;
                return 0;
            }
            this._caltyp = iCalib[2];
            this.imm_calhdl = this._yapi.imm_getCalibrationHandler(this._caltyp);
            // parse calibration points
            if (this._caltyp <= 10) {
                maxpos = this._caltyp;
            } else {
                if (this._caltyp <= 20) {
                    maxpos = this._caltyp - 10;
                } else {
                    maxpos = 5;
                }
            }
            maxpos = 3 + 2 * maxpos;
            if (maxpos > iCalib.length) {
                maxpos = iCalib.length;
            }
            this._calpar.length = 0;
            this._calraw.length = 0;
            this._calref.length = 0;
            position = 3;
            while (position + 1 < maxpos) {
                iRaw = iCalib[position];
                iRef = iCalib[position + 1];
                this._calpar.push(iRaw);
                this._calpar.push(iRef);
                this._calraw.push(this._yapi.imm_decimalToDouble(iRaw));
                this._calref.push(this._yapi.imm_decimalToDouble(iRef));
                position = position + 2;
            }
        }
        return 0;
    }

    /**
     * Checks if the sensor is currently able to provide an up-to-date measure.
     * Returns false if the device is unreachable, or if the sensor does not have
     * a current measure to transmit. No exception is raised if there is an error
     * while trying to contact the device hosting $THEFUNCTION$.
     *
     * @return {boolean} true if the sensor can provide an up-to-date measure, and false otherwise
     */
    async isSensorReady()
    {
        if (!(await this.isOnline())) {
            return false;
        }
        if (!(this._sensorState == 0)) {
            return false;
        }
        return true;
    }

    /**
     * Returns the YDatalogger object of the device hosting the sensor. This method returns an object of
     * class YDatalogger that can control global parameters of the data logger. The returned object
     * should not be freed.
     *
     * @return {YDataLogger} an YDataLogger object or null on error.
     */
    async get_dataLogger()
    {
        /** @type {YDataLogger} **/
        let logger;
        /** @type {YModule} **/
        let modu;
        /** @type {string} **/
        let serial;
        /** @type {string} **/
        let hwid;

        modu = await this.get_module();
        serial = await modu.get_serialNumber();
        if (serial == YAPI_INVALID_STRING) {
            return null;
        }
        hwid = serial + '.dataLogger';
        logger = await YDataLogger.FindDataLogger(hwid);
        return logger;
    }

    /**
     * Starts the data logger on the device. Note that the data logger
     * will only save the measures on this sensor if the logFrequency
     * is not set to "OFF".
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     */
    async startDataLogger()
    {
        /** @type {Uint8Array} **/
        let res;

        res = await this._download('api/dataLogger/recording?recording=1');
        if (!((res).length>0)) {
            return this._throw(YAPI_IO_ERROR,'unable to start datalogger',YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Stops the datalogger on the device.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     */
    async stopDataLogger()
    {
        /** @type {Uint8Array} **/
        let res;

        res = await this._download('api/dataLogger/recording?recording=0');
        if (!((res).length>0)) {
            return this._throw(YAPI_IO_ERROR,'unable to stop datalogger',YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves a DataSet object holding historical data for this
     * sensor, for a specified time interval. The measures will be
     * retrieved from the data logger, which must have been turned
     * on at the desired time. See the documentation of the DataSet
     * class for information on how to get an overview of the
     * recorded data, and how to load progressively a large set
     * of measures from the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as DataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @param startTime {number} : the start of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without initial limit.
     * @param endTime {number} : the end of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without ending limit.
     *
     * @return {YDataSet} an instance of YDataSet, providing access to historical
     *         data. Past measures can be loaded progressively
     *         using methods from the YDataSet object.
     */
    async get_recordedData(startTime,endTime)
    {
        /** @type {string} **/
        let funcid;
        /** @type {string} **/
        let funit;

        funcid = await this.get_functionId();
        funit = await this.get_unit();
        return new YDataSet(this, funcid, funit, startTime, endTime);
    }

    /**
     * Registers the callback function that is invoked on every periodic timed notification.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback {function} : the callback function to call, or a null pointer. The callback
     * function should take two
     *         arguments: the function object of which the value has changed, and an YMeasure object describing
     *         the new advertised value.
     * @noreturn
     */
    async registerTimedReportCallback(callback)
    {
        /** @type {YSensor} **/
        let sensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackSensor = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value)
    {
        if (this._timedReportCallbackSensor != null) {
            try {
                await this._timedReportCallbackSensor(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
        }
        return 0;
    }

    /**
     * Configures error correction data points, in particular to compensate for
     * a possible perturbation of the measure caused by an enclosure. It is possible
     * to configure up to five correction points. Correction points must be provided
     * in ascending order, and be in the range of the sensor. The device will automatically
     * perform a linear interpolation of the error correction between specified
     * points. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * For more information on advanced capabilities to refine the calibration of
     * sensors, please contact support@yoctopuce.com.
     *
     * @param rawValues {number[]} : array of floating point numbers, corresponding to the raw
     *         values returned by the sensor for the correction points.
     * @param refValues {number[]} : array of floating point numbers, corresponding to the corrected
     *         values for the correction points.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async calibrateFromPoints(rawValues,refValues)
    {
        /** @type {string} **/
        let rest_val;
        /** @type {number} **/
        let res;

        rest_val = await this._encodeCalibrationPoints(rawValues, refValues);
        res = await this._setAttr('calibrationParam', rest_val);
        return res;
    }

    /**
     * Retrieves error correction data points previously entered using the method
     * calibrateFromPoints.
     *
     * @param rawValues {number[]} : array of floating point numbers, that will be filled by the
     *         function with the raw sensor values for the correction points.
     * @param refValues {number[]} : array of floating point numbers, that will be filled by the
     *         function with the desired values for the correction points.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadCalibrationPoints(rawValues,refValues)
    {
        rawValues.length = 0;
        refValues.length = 0;
        // Load function parameters if not yet loaded
        if (this._scale == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
        }
        if (this._caltyp < 0) {
            this._throw(YAPI_NOT_SUPPORTED, 'Calibration parameters format mismatch. Please upgrade your library or firmware.');
            return YAPI_NOT_SUPPORTED;
        }
        rawValues.length = 0;
        refValues.length = 0;
        for (let ii in this._calraw) {
            rawValues.push(this._calraw[ii]);
        }
        for (let ii in this._calref) {
            refValues.push(this._calref[ii]);
        }
        return YAPI_SUCCESS;
    }

    async _encodeCalibrationPoints(rawValues,refValues)
    {
        /** @type {string} **/
        let res;
        /** @type {number} **/
        let npt;
        /** @type {number} **/
        let idx;
        npt = rawValues.length;
        if (npt != refValues.length) {
            this._throw(YAPI_INVALID_ARGUMENT, 'Invalid calibration parameters (size mismatch)');
            return YAPI_INVALID_STRING;
        }
        // Shortcut when building empty calibration parameters
        if (npt == 0) {
            return '0';
        }
        // Load function parameters if not yet loaded
        if (this._scale == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YAPI_INVALID_STRING;
            }
        }
        // Detect old firmware
        if ((this._caltyp < 0) || (this._scale < 0)) {
            this._throw(YAPI_NOT_SUPPORTED, 'Calibration parameters format mismatch. Please upgrade your library or firmware.');
            return '0';
        }
        // 32-bit fixed-point encoding
        res = String(Math.round(YOCTO_CALIB_TYPE_OFS));
        idx = 0;
        while (idx < npt) {
            res = res+','+String(Math.round(rawValues[idx]*1000)/1000)+','+String(Math.round(refValues[idx]*1000)/1000);
            idx = idx + 1;
        }
        return res;
    }

    async _applyCalibration(rawValue)
    {
        if (rawValue == YSensor.CURRENTVALUE_INVALID) {
            return YSensor.CURRENTVALUE_INVALID;
        }
        if (this._caltyp == 0) {
            return rawValue;
        }
        if (this._caltyp < 0) {
            return YSensor.CURRENTVALUE_INVALID;
        }
        if (!(this.imm_calhdl != null)) {
            return YSensor.CURRENTVALUE_INVALID;
        }
        return this.imm_calhdl(rawValue, this._caltyp, this._calpar, this._calraw, this._calref);
    }

    async _decodeTimedReport(timestamp,duration,report)
    {
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let byteVal;
        /** @type {number} **/
        let poww;
        /** @type {number} **/
        let minRaw;
        /** @type {number} **/
        let avgRaw;
        /** @type {number} **/
        let maxRaw;
        /** @type {number} **/
        let sublen;
        /** @type {number} **/
        let difRaw;
        /** @type {number} **/
        let startTime;
        /** @type {number} **/
        let endTime;
        /** @type {number} **/
        let minVal;
        /** @type {number} **/
        let avgVal;
        /** @type {number} **/
        let maxVal;
        if (duration > 0) {
            startTime = timestamp - duration;
        } else {
            startTime = this._prevTimedReport;
        }
        endTime = timestamp;
        this._prevTimedReport = endTime;
        if (startTime == 0) {
            startTime = endTime;
        }
        // 32 bits timed report format
        if (report.length <= 5) {
            // sub-second report, 1-4 bytes
            poww = 1;
            avgRaw = 0;
            byteVal = 0;
            i = 1;
            while (i < report.length) {
                byteVal = report[i];
                avgRaw = avgRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
            }
            if (((byteVal) & (0x80)) != 0) {
                avgRaw = avgRaw - poww;
            }
            avgVal = avgRaw / 1000.0;
            if (this._caltyp != 0) {
                if (this.imm_calhdl != null) {
                    avgVal = this.imm_calhdl(avgVal, this._caltyp, this._calpar, this._calraw, this._calref);
                }
            }
            minVal = avgVal;
            maxVal = avgVal;
        } else {
            // averaged report: avg,avg-min,max-avg
            sublen = 1 + ((report[1]) & (3));
            poww = 1;
            avgRaw = 0;
            byteVal = 0;
            i = 2;
            while ((sublen > 0) && (i < report.length)) {
                byteVal = report[i];
                avgRaw = avgRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
                sublen = sublen - 1;
            }
            if (((byteVal) & (0x80)) != 0) {
                avgRaw = avgRaw - poww;
            }
            sublen = 1 + ((((report[1]) >> (2))) & (3));
            poww = 1;
            difRaw = 0;
            while ((sublen > 0) && (i < report.length)) {
                byteVal = report[i];
                difRaw = difRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
                sublen = sublen - 1;
            }
            minRaw = avgRaw - difRaw;
            sublen = 1 + ((((report[1]) >> (4))) & (3));
            poww = 1;
            difRaw = 0;
            while ((sublen > 0) && (i < report.length)) {
                byteVal = report[i];
                difRaw = difRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
                sublen = sublen - 1;
            }
            maxRaw = avgRaw + difRaw;
            avgVal = avgRaw / 1000.0;
            minVal = minRaw / 1000.0;
            maxVal = maxRaw / 1000.0;
            if (this._caltyp != 0) {
                if (this.imm_calhdl != null) {
                    avgVal = this.imm_calhdl(avgVal, this._caltyp, this._calpar, this._calraw, this._calref);
                    minVal = this.imm_calhdl(minVal, this._caltyp, this._calpar, this._calraw, this._calref);
                    maxVal = this.imm_calhdl(maxVal, this._caltyp, this._calpar, this._calraw, this._calref);
                }
            }
        }
        return new YMeasure(startTime, endTime, minVal, avgVal, maxVal);
    }

    imm_decodeVal(w)
    {
        /** @type {number} **/
        let val;
        val = w;
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    imm_decodeAvg(dw)
    {
        /** @type {number} **/
        let val;
        val = dw;
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    /**
     * Continues the enumeration of sensors started using yFirstSensor().
     * Caution: You can't make any assumption about the returned sensors order.
     * If you want to find a specific a sensor, use Sensor.findSensor()
     * and a hardwareID or a logical name.
     *
     * @return {YSensor} a pointer to a YSensor object, corresponding to
     *         a sensor currently online, or a null pointer
     *         if there are no more sensors to enumerate.
     */
    nextSensor()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSensor.FindSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     *
     * @return {YSensor} a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSensor()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Sensor');
        if(next_hwid == null) return null;
        return YSensor.FindSensor(next_hwid);
    }

    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YSensor} a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSensorInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Sensor');
        if(next_hwid == null) return null;
        return YSensor.FindSensorInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            UNIT_INVALID                 : YAPI_INVALID_STRING,
            CURRENTVALUE_INVALID         : YAPI_INVALID_DOUBLE,
            LOWESTVALUE_INVALID          : YAPI_INVALID_DOUBLE,
            HIGHESTVALUE_INVALID         : YAPI_INVALID_DOUBLE,
            CURRENTRAWVALUE_INVALID      : YAPI_INVALID_DOUBLE,
            LOGFREQUENCY_INVALID         : YAPI_INVALID_STRING,
            REPORTFREQUENCY_INVALID      : YAPI_INVALID_STRING,
            ADVMODE_IMMEDIATE            : 0,
            ADVMODE_PERIOD_AVG           : 1,
            ADVMODE_PERIOD_MIN           : 2,
            ADVMODE_PERIOD_MAX           : 3,
            ADVMODE_INVALID              : -1,
            CALIBRATIONPARAM_INVALID     : YAPI_INVALID_STRING,
            RESOLUTION_INVALID           : YAPI_INVALID_DOUBLE,
            SENSORSTATE_INVALID          : YAPI_INVALID_INT
        });
    }

    //--- (end of generated code: YSensor implementation)
}

//
// YSensorProxy Class: synchronous proxy to YSensor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YSensor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YSensorProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (generated code: YSensor accessors declaration)

    /**
     * Returns the measuring unit for the measure.
     *
     * @return a string corresponding to the measuring unit for the measure
     *
     * On failure, throws an exception or returns Y_UNIT_INVALID.
     */
    get_unit()
    {
        return this.liveFunc._unit;
    }

    /**
     * Returns the current value of the measure, in the specified unit, as a floating point number.
     * Note that a get_currentValue() call will *not* start a measure in the device, it
     * will just return the last measure that occurred in the device. Indeed, internally, each Yoctopuce
     * devices is continuously making measurements at a hardware specific frequency.
     *
     * If continuously calling  get_currentValue() leads you to performances issues, then
     * you might consider to switch to callback programming model. Check the "advanced
     * programming" chapter in in your device user manual for more information.
     *
     * @return a floating point number corresponding to the current value of the measure, in the specified
     * unit, as a floating point number
     *
     * On failure, throws an exception or returns Y_CURRENTVALUE_INVALID.
     */
    get_currentValue()
    {
        return this.liveFunc._currentValue;
    }

    /**
     * Changes the recorded minimal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval : a floating point number corresponding to the recorded minimal value observed
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_lowestValue(newval)
    {
        this.liveFunc.set_lowestValue(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the minimal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_lowestValue().
     *
     * @return a floating point number corresponding to the minimal value observed for the measure since
     * the device was started
     *
     * On failure, throws an exception or returns Y_LOWESTVALUE_INVALID.
     */
    get_lowestValue()
    {
        return this.liveFunc._lowestValue;
    }

    /**
     * Changes the recorded maximal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval : a floating point number corresponding to the recorded maximal value observed
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_highestValue(newval)
    {
        this.liveFunc.set_highestValue(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the maximal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_highestValue().
     *
     * @return a floating point number corresponding to the maximal value observed for the measure since
     * the device was started
     *
     * On failure, throws an exception or returns Y_HIGHESTVALUE_INVALID.
     */
    get_highestValue()
    {
        return this.liveFunc._highestValue;
    }

    /**
     * Returns the uncalibrated, unrounded raw value returned by the sensor, in the specified unit, as a
     * floating point number.
     *
     * @return a floating point number corresponding to the uncalibrated, unrounded raw value returned by
     * the sensor, in the specified unit, as a floating point number
     *
     * On failure, throws an exception or returns Y_CURRENTRAWVALUE_INVALID.
     */
    get_currentRawValue()
    {
        return this.liveFunc._currentRawValue;
    }

    /**
     * Returns the datalogger recording frequency for this function, or "OFF"
     * when measures are not stored in the data logger flash memory.
     *
     * @return a string corresponding to the datalogger recording frequency for this function, or "OFF"
     *         when measures are not stored in the data logger flash memory
     *
     * On failure, throws an exception or returns Y_LOGFREQUENCY_INVALID.
     */
    get_logFrequency()
    {
        return this.liveFunc._logFrequency;
    }

    /**
     * Changes the datalogger recording frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (eg. "4/h"). To disable recording for this function, use
     * the value "OFF". Note that setting the  datalogger recording frequency
     * to a greater value than the sensor native sampling frequency is useless,
     * and even counterproductive: those two frequencies are not related.
     *
     * @param newval : a string corresponding to the datalogger recording frequency for this function
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_logFrequency(newval)
    {
        this.liveFunc.set_logFrequency(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the timed value notification frequency, or "OFF" if timed
     * value notifications are disabled for this function.
     *
     * @return a string corresponding to the timed value notification frequency, or "OFF" if timed
     *         value notifications are disabled for this function
     *
     * On failure, throws an exception or returns Y_REPORTFREQUENCY_INVALID.
     */
    get_reportFrequency()
    {
        return this.liveFunc._reportFrequency;
    }

    /**
     * Changes the timed value notification frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (e.g. "4/h"). To disable timed value notifications for this
     * function, use the value "OFF". Note that setting the  timed value
     * notification frequency to a greater value than the sensor native
     * sampling frequency is unless, and even counterproductive: those two
     * frequencies are not related.
     *
     * @param newval : a string corresponding to the timed value notification frequency for this function
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_reportFrequency(newval)
    {
        this.liveFunc.set_reportFrequency(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the measuring mode used for the advertised value pushed to the parent hub.
     *
     * @return a value among Y_ADVMODE_IMMEDIATE, Y_ADVMODE_PERIOD_AVG, Y_ADVMODE_PERIOD_MIN and
     * Y_ADVMODE_PERIOD_MAX corresponding to the measuring mode used for the advertised value pushed to the parent hub
     *
     * On failure, throws an exception or returns Y_ADVMODE_INVALID.
     */
    get_advMode()
    {
        return this.liveFunc._advMode;
    }

    /**
     * Changes the measuring mode used for the advertised value pushed to the parent hub.
     *
     * @param newval : a value among Y_ADVMODE_IMMEDIATE, Y_ADVMODE_PERIOD_AVG, Y_ADVMODE_PERIOD_MIN and
     * Y_ADVMODE_PERIOD_MAX corresponding to the measuring mode used for the advertised value pushed to the parent hub
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_advMode(newval)
    {
        this.liveFunc.set_advMode(newval);
        return YAPI_SUCCESS;
    }

    get_calibrationParam()
    {
        return this.liveFunc._calibrationParam;
    }

    set_calibrationParam(newval)
    {
        this.liveFunc.set_calibrationParam(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     *
     * @param newval : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_resolution(newval)
    {
        this.liveFunc.set_resolution(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     *
     * @return a floating point number corresponding to the resolution of the measured values
     *
     * On failure, throws an exception or returns Y_RESOLUTION_INVALID.
     */
    get_resolution()
    {
        return this.liveFunc._resolution;
    }

    /**
     * Returns the sensor health state code, which is zero when there is an up-to-date measure
     * available or a positive code if the sensor is not able to provide a measure right now.
     *
     * @return an integer corresponding to the sensor health state code, which is zero when there is an
     * up-to-date measure
     *         available or a positive code if the sensor is not able to provide a measure right now
     *
     * On failure, throws an exception or returns Y_SENSORSTATE_INVALID.
     */
    get_sensorState()
    {
        return this.liveFunc._sensorState;
    }

    /**
     * Starts the data logger on the device. Note that the data logger
     * will only save the measures on this sensor if the logFrequency
     * is not set to "OFF".
     *
     * @return YAPI_SUCCESS if the call succeeds.
     */
    startDataLogger()
    {
        this.liveFunc.startDataLogger();
        return YAPI_SUCCESS;
    }

    /**
     * Stops the datalogger on the device.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     */
    stopDataLogger()
    {
        this.liveFunc.stopDataLogger();
        return YAPI_SUCCESS;
    }

    /**
     * Registers the callback function that is invoked on every periodic timed notification.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and an YMeasure object describing
     *         the new advertised value.
     * @noreturn
     */
    registerTimedReportCallback(callback)
    {
        this.liveFunc.registerTimedReportCallback(callback);
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves error correction data points previously entered using the method
     * calibrateFromPoints.
     *
     * @param rawValues : array of floating point numbers, that will be filled by the
     *         function with the raw sensor values for the correction points.
     * @param refValues : array of floating point numbers, that will be filled by the
     *         function with the desired values for the correction points.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadCalibrationPoints(rawValues,refValues)
    {
        this.liveFunc.loadCalibrationPoints(rawValues, refValues);
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YSensor accessors declaration)

    /**
     * Checks if the sensor is currently able to provide an up-to-date measure.
     * Returns false if the device is unreachable, or if the sensor does not have
     * a current measure to transmit. No exception is raised if there is an error
     * while trying to contact the device hosting $THEFUNCTION$.
     *
     * @return {boolean} true if the sensor can provide an up-to-date measure, and false otherwise
     */
    isSensorReady()
    {
        if (!(this.liveFunc._sensorState == 0)) {
            return false;
        }
        return true;
    }

    set_unit(newval)
    {
        this.liveFunc.set_unit(newval);
        return YAPI_SUCCESS;
    }

    set_currentValue(newval)
    {
        this.liveFunc.set_currentValue(newval);
        return this._yapi.SUCCESS;
    }
}

//--- (generated code: YSensor functions)

YoctoLibExport('YSensor', YSensor);
YoctoLibExport('YSensorProxy', YSensorProxy);
YSensor.imm_Init();

//--- (end of generated code: YSensor functions)

//--- (generated code: YMeasure definitions)
//--- (end of generated code: YMeasure definitions)

//--- (generated code: YMeasure class start)
/**
 * YMeasure Class: Measured value
 *
 * YMeasure objects are used within the API to represent
 * a value measured at a specified time. These objects are
 * used in particular in conjunction with the YDataSet class.
 */
//--- (end of generated code: YMeasure class start)
class YMeasure
{
    constructor(float_start, float_end, float_minVal, float_avgVal, float_maxVal)
    {
        //--- (generated code: YMeasure constructor)
        /** @member {number} **/
        this._start                      = 0;
        /** @member {number} **/
        this._end                        = 0;
        /** @member {number} **/
        this._minVal                     = 0;
        /** @member {number} **/
        this._avgVal                     = 0;
        /** @member {number} **/
        this._maxVal                     = 0;
        //--- (end of generated code: YMeasure constructor)
        this._start                          = float_start;
        this._end                            = float_end;
        this._minVal                         = float_minVal;
        this._avgVal                         = float_avgVal;
        this._maxVal                         = float_maxVal;
    }
    //--- (generated code: YMeasure implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    /**
     * Returns the start time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher then 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return {number} an floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the beginning of this measure.
     */
    get_startTimeUTC()
    {
        return this._start;
    }

    /**
     * Returns the end time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher than 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return {number} an floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the end of this measure.
     */
    get_endTimeUTC()
    {
        return this._end;
    }

    /**
     * Returns the smallest value observed during the time interval
     * covered by this measure.
     *
     * @return {number} a floating-point number corresponding to the smallest value observed.
     */
    get_minValue()
    {
        return this._minVal;
    }

    /**
     * Returns the average value observed during the time interval
     * covered by this measure.
     *
     * @return {number} a floating-point number corresponding to the average value observed.
     */
    get_averageValue()
    {
        return this._avgVal;
    }

    /**
     * Returns the largest value observed during the time interval
     * covered by this measure.
     *
     * @return {number} a floating-point number corresponding to the largest value observed.
     */
    get_maxValue()
    {
        return this._maxVal;
    }

    //--- (end of generated code: YMeasure implementation)

    /**
     * Returns the start date of the measure.
     *
     * @return {Date} a Date object corresponding to the beginning of this measure
     */
    get_startTimeUTC_asDate()
    {
        return new Date(Math.round(this._start * 1000));
    }

    /**
     * Returns the start date of the measure.
     *
     * @return {Date} a Date object corresponding to the end of this measure
     */
    get_endTimeUTC_asDate()
    {
        return new Date(Math.round(this._end * 1000));
    }
}



//--- (generated code: YDataLogger definitions)
//--- (end of generated code: YDataLogger definitions)


//--- (generated code: YDataLogger class start)
/**
 * YDataLogger Class: DataLogger function interface
 *
 * Yoctopuce sensors include a non-volatile memory capable of storing ongoing measured
 * data automatically, without requiring a permanent connection to a computer.
 * The DataLogger function controls the global parameters of the internal data
 * logger. Recording control (start/stop) as well as data retreival is done at
 * sensor objects level.
 */
//--- (end of generated code: YDataLogger class start)
class YDataLogger extends YFunction
{
    constructor(obj_yapi,str_func)
    {
        //--- (generated code: YDataLogger constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'DataLogger';
        /** @member {number} **/
        this._currentRunIndex            = YDataLogger.CURRENTRUNINDEX_INVALID;
        /** @member {number} **/
        this._timeUTC                    = YDataLogger.TIMEUTC_INVALID;
        /** @member {number} **/
        this._recording                  = YDataLogger.RECORDING_INVALID;
        /** @member {number} **/
        this._autoStart                  = YDataLogger.AUTOSTART_INVALID;
        /** @member {number} **/
        this._beaconDriven               = YDataLogger.BEACONDRIVEN_INVALID;
        /** @member {number} **/
        this._usage                      = YDataLogger.USAGE_INVALID;
        /** @member {number} **/
        this._clearHistory               = YDataLogger.CLEARHISTORY_INVALID;
        //--- (end of generated code: YDataLogger constructor)
    }

    // Internal function to retrieve datalogger memory
    //
    async getData(runIdx, timeIdx)
    {
        var loadval;

        if(this.dataLoggerURL == undefined) {
            this.dataLoggerURL = '/logger.json';
        }

        // get the device serial number
        var devid = this.module().get_serialNumber();
        if(devid == YModule.SERIALNUMBER_INVALID) {
            return null;
        }
        var httpreq = 'GET '+this.dataLoggerURL;
        if(timeIdx) {
            httpreq += '?run='+runIdx+'&time='+timeIdx;
        }
        var yreq = await YAPI.devRequest(devid, httpreq);
        if(yreq.errorType != YAPI.SUCCESS) {
            if(yreq.errorMsg.indexOf('HTTP status 404') >= 0 && this.dataLoggerURL != '/dataLogger.json') {
                this.dataLoggerURL = '/dataLogger.json';
                return await this.getData(runIdx, timeIdx);
            }
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }

        return JSON.parse(yreq.result);
    }

    //--- (generated code: YDataLogger implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'currentRunIndex':
            this._currentRunIndex = parseInt(val);
            return 1;
        case 'timeUTC':
            this._timeUTC = parseInt(val);
            return 1;
        case 'recording':
            this._recording = parseInt(val);
            return 1;
        case 'autoStart':
            this._autoStart = parseInt(val);
            return 1;
        case 'beaconDriven':
            this._beaconDriven = parseInt(val);
            return 1;
        case 'usage':
            this._usage = parseInt(val);
            return 1;
        case 'clearHistory':
            this._clearHistory = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     *
     * @return {number} an integer corresponding to the current run number, corresponding to the number of
     * times the module was
     *         powered on with the dataLogger enabled at some point
     *
     * On failure, throws an exception or returns YDataLogger.CURRENTRUNINDEX_INVALID.
     */
    async get_currentRunIndex()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.CURRENTRUNINDEX_INVALID;
            }
        }
        res = this._currentRunIndex;
        return res;
    }

    /**
     * Returns the Unix timestamp for current UTC time, if known.
     *
     * @return {number} an integer corresponding to the Unix timestamp for current UTC time, if known
     *
     * On failure, throws an exception or returns YDataLogger.TIMEUTC_INVALID.
     */
    async get_timeUTC()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.TIMEUTC_INVALID;
            }
        }
        res = this._timeUTC;
        return res;
    }

    /**
     * Changes the current UTC time reference used for recorded data.
     *
     * @param newval {number} : an integer corresponding to the current UTC time reference used for recorded data
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_timeUTC(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('timeUTC',rest_val);
    }

    /**
     * Returns the current activation state of the data logger.
     *
     * @return {number} a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the current activation state of the data logger
     *
     * On failure, throws an exception or returns YDataLogger.RECORDING_INVALID.
     */
    async get_recording()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.RECORDING_INVALID;
            }
        }
        res = this._recording;
        return res;
    }

    /**
     * Changes the activation state of the data logger to start/stop recording data.
     *
     * @param newval {number} : a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the activation state of the data logger to
     * start/stop recording data
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_recording(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('recording',rest_val);
    }

    /**
     * Returns the default activation state of the data logger on power up.
     *
     * @return {number} either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the
     * default activation state of the data logger on power up
     *
     * On failure, throws an exception or returns YDataLogger.AUTOSTART_INVALID.
     */
    async get_autoStart()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.AUTOSTART_INVALID;
            }
        }
        res = this._autoStart;
        return res;
    }

    /**
     * Changes the default activation state of the data logger on power up.
     * Do not forget to call the saveToFlash() method of the module to save the
     * configuration change.  Note: if the device doesn't have any time source at his disposal when
     * starting up, it will wait for ~8 seconds before automatically starting to record  with
     * an arbitrary timestamp
     *
     * @param newval {number} : either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to
     * the default activation state of the data logger on power up
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_autoStart(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('autoStart',rest_val);
    }

    /**
     * Returns true if the data logger is synchronised with the localization beacon.
     *
     * @return {number} either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON, according to
     * true if the data logger is synchronised with the localization beacon
     *
     * On failure, throws an exception or returns YDataLogger.BEACONDRIVEN_INVALID.
     */
    async get_beaconDriven()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.BEACONDRIVEN_INVALID;
            }
        }
        res = this._beaconDriven;
        return res;
    }

    /**
     * Changes the type of synchronisation of the data logger.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON,
     * according to the type of synchronisation of the data logger
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_beaconDriven(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('beaconDriven',rest_val);
    }

    /**
     * Returns the percentage of datalogger memory in use.
     *
     * @return {number} an integer corresponding to the percentage of datalogger memory in use
     *
     * On failure, throws an exception or returns YDataLogger.USAGE_INVALID.
     */
    async get_usage()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.USAGE_INVALID;
            }
        }
        res = this._usage;
        return res;
    }

    async get_clearHistory()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.CLEARHISTORY_INVALID;
            }
        }
        res = this._clearHistory;
        return res;
    }

    async set_clearHistory(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('clearHistory',rest_val);
    }

    /**
     * Retrieves a data logger for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the data logger
     *
     * @return {YDataLogger} a YDataLogger object allowing you to drive the data logger.
     */
    static FindDataLogger(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('DataLogger', func);
        if (obj == null) {
            obj = new YDataLogger(YAPI, func);
            YFunction._AddToCache('DataLogger',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a data logger for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the data logger
     *
     * @return {YDataLogger} a YDataLogger object allowing you to drive the data logger.
     */
    static FindDataLoggerInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'DataLogger', func);
        if (obj == null) {
            obj = new YDataLogger(yctx, func);
            YFunction._AddToCache('DataLogger',  func, obj);
        }
        return obj;
    }

    /**
     * Clears the data logger memory and discards all recorded data streams.
     * This method also resets the current run index to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async forgetAllDataStreams()
    {
        return await this.set_clearHistory(YDataLogger.CLEARHISTORY_TRUE);
    }

    /**
     * Returns a list of YDataSet objects that can be used to retrieve
     * all measures stored by the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as YDataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @return {YDataSet[]} a list of YDataSet object.
     *
     * On failure, throws an exception or returns an empty list.
     */
    async get_dataSets()
    {
        return await this.parse_dataSets(await this._download('logger.json'));
    }

    async parse_dataSets(json)
    {
        /** @type {string[]} **/
        let dslist = [];
        /** @type {YDataSetPtr} **/
        let dataset;
        /** @type {YDataSet[]} **/
        let res = [];

        dslist = this.imm_json_get_array(json);
        res.length = 0;
        for (let ii in dslist) {
            dataset = new YDataSet(this);
            await dataset._parse(dslist[ii]);
            res.push(dataset);
        }
        return res;
    }

    /**
     * Continues the enumeration of data loggers started using yFirstDataLogger().
     * Caution: You can't make any assumption about the returned data loggers order.
     * If you want to find a specific a data logger, use DataLogger.findDataLogger()
     * and a hardwareID or a logical name.
     *
     * @return {YDataLogger} a pointer to a YDataLogger object, corresponding to
     *         a data logger currently online, or a null pointer
     *         if there are no more data loggers to enumerate.
     */
    nextDataLogger()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YDataLogger.FindDataLoggerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     *
     * @return {YDataLogger} a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    static FirstDataLogger()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('DataLogger');
        if(next_hwid == null) return null;
        return YDataLogger.FindDataLogger(next_hwid);
    }

    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YDataLogger} a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    static FirstDataLoggerInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('DataLogger');
        if(next_hwid == null) return null;
        return YDataLogger.FindDataLoggerInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            CURRENTRUNINDEX_INVALID      : YAPI_INVALID_UINT,
            TIMEUTC_INVALID              : YAPI_INVALID_LONG,
            RECORDING_OFF                : 0,
            RECORDING_ON                 : 1,
            RECORDING_PENDING            : 2,
            RECORDING_INVALID            : -1,
            AUTOSTART_OFF                : 0,
            AUTOSTART_ON                 : 1,
            AUTOSTART_INVALID            : -1,
            BEACONDRIVEN_OFF             : 0,
            BEACONDRIVEN_ON              : 1,
            BEACONDRIVEN_INVALID         : -1,
            USAGE_INVALID                : YAPI_INVALID_UINT,
            CLEARHISTORY_FALSE           : 0,
            CLEARHISTORY_TRUE            : 1,
            CLEARHISTORY_INVALID         : -1
        });
    }

    //--- (end of generated code: YDataLogger implementation)
}

//
// YDataLoggerProxy Class: synchronous proxy to YDataLogger objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YDataLogger objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YDataLoggerProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (generated code: YDataLogger accessors declaration)

    /**
     * Returns the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     *
     * @return an integer corresponding to the current run number, corresponding to the number of times the module was
     *         powered on with the dataLogger enabled at some point
     *
     * On failure, throws an exception or returns Y_CURRENTRUNINDEX_INVALID.
     */
    get_currentRunIndex()
    {
        return this.liveFunc._currentRunIndex;
    }

    /**
     * Returns the Unix timestamp for current UTC time, if known.
     *
     * @return an integer corresponding to the Unix timestamp for current UTC time, if known
     *
     * On failure, throws an exception or returns Y_TIMEUTC_INVALID.
     */
    get_timeUTC()
    {
        return this.liveFunc._timeUTC;
    }

    /**
     * Changes the current UTC time reference used for recorded data.
     *
     * @param newval : an integer corresponding to the current UTC time reference used for recorded data
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_timeUTC(newval)
    {
        this.liveFunc.set_timeUTC(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the current activation state of the data logger.
     *
     * @return a value among Y_RECORDING_OFF, Y_RECORDING_ON and Y_RECORDING_PENDING corresponding to the
     * current activation state of the data logger
     *
     * On failure, throws an exception or returns Y_RECORDING_INVALID.
     */
    get_recording()
    {
        return this.liveFunc._recording;
    }

    /**
     * Changes the activation state of the data logger to start/stop recording data.
     *
     * @param newval : a value among Y_RECORDING_OFF, Y_RECORDING_ON and Y_RECORDING_PENDING corresponding
     * to the activation state of the data logger to start/stop recording data
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_recording(newval)
    {
        this.liveFunc.set_recording(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the default activation state of the data logger on power up.
     *
     * @return either Y_AUTOSTART_OFF or Y_AUTOSTART_ON, according to the default activation state of the
     * data logger on power up
     *
     * On failure, throws an exception or returns Y_AUTOSTART_INVALID.
     */
    get_autoStart()
    {
        return this.liveFunc._autoStart;
    }

    /**
     * Changes the default activation state of the data logger on power up.
     * Do not forget to call the saveToFlash() method of the module to save the
     * configuration change.  Note: if the device doesn't have any time source at his disposal when
     * starting up, it will wait for ~8 seconds before automatically starting to record  with
     * an arbitrary timestamp
     *
     * @param newval : either Y_AUTOSTART_OFF or Y_AUTOSTART_ON, according to the default activation state
     * of the data logger on power up
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_autoStart(newval)
    {
        this.liveFunc.set_autoStart(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns true if the data logger is synchronised with the localization beacon.
     *
     * @return either Y_BEACONDRIVEN_OFF or Y_BEACONDRIVEN_ON, according to true if the data logger is
     * synchronised with the localization beacon
     *
     * On failure, throws an exception or returns Y_BEACONDRIVEN_INVALID.
     */
    get_beaconDriven()
    {
        return this.liveFunc._beaconDriven;
    }

    /**
     * Changes the type of synchronisation of the data logger.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either Y_BEACONDRIVEN_OFF or Y_BEACONDRIVEN_ON, according to the type of
     * synchronisation of the data logger
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_beaconDriven(newval)
    {
        this.liveFunc.set_beaconDriven(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Returns the percentage of datalogger memory in use.
     *
     * @return an integer corresponding to the percentage of datalogger memory in use
     *
     * On failure, throws an exception or returns Y_USAGE_INVALID.
     */
    get_usage()
    {
        return this.liveFunc._usage;
    }

    get_clearHistory()
    {
        return this.liveFunc._clearHistory;
    }

    set_clearHistory(newval)
    {
        this.liveFunc.set_clearHistory(newval);
        return YAPI_SUCCESS;
    }

    /**
     * Clears the data logger memory and discards all recorded data streams.
     * This method also resets the current run index to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    forgetAllDataStreams()
    {
        this.liveFunc.forgetAllDataStreams();
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YDataLogger accessors declaration)
}

//--- (generated code: YDataLogger functions)

YoctoLibExport('YDataLogger', YDataLogger);
YoctoLibExport('YDataLoggerProxy', YDataLoggerProxy);
YDataLogger.imm_Init();

//--- (end of generated code: YDataLogger functions)


//
// YAPI Context
//
// This class provides the high-level entry points to access Functions, stores
// an indexes instances of the Device object and of FunctionType collections.
//
class YGenericHub
{
    constructor(obj_yapi, var_urlInfo)
    {
        /** @member {YAPIContext} **/
        this._yapi           = obj_yapi;
        /** @member {number} **/
        this._lastErrorType  = YAPI_SUCCESS;
        /** @member {string} **/
        this._lastErrorMsg   = 'no error';
        /** @member {Object} **/
        this.urlInfo         = var_urlInfo;         // structure that describe the root URL of the hub
        /** @member {number} **/
        this.notiflen        = 0;                   // notification message length before forced disconnection
        /** @member {number} **/
        this.lastPingStamp   = 0;                   // timestamp of last notification received
        this.timeoutId       = null;                // timeout for declaring stalled hub
        /** @member {boolean} **/
        this.isNotifWorking = false;                // true if we are receiving valid notification
        /** @member {number} **/
        this.devListExpires  = 0;                   // timestamp of next useful updateDeviceList
        this.serialByYdx     = [];                  // serials by hub-specific devYdx
        /** @member {number} **/
        this.retryDelay      = 15;                  // delay before reconnecting in case of error: initially 15ms
        /** @member {number} **/
        this.notifPos        = -1;                  // current absolute position in hub notification stream
        /** @member {string} **/
        this.notifCarryOver  = '';                  // last uncomplete notification message
        /** @member {number} **/
        this.currPos         = 0;                   // current position in data stream
        /** @member {Object} **/
        this.missing         = {};                  // used during UpdateDeviceList
        /** @member {boolean} **/
        this.disconnecting   = false;               // set to true when requested to disconnect
        /** @member {number} **/
        this.notbynOpenTimeout = null;              // testHub timeout
        /** @member {function} **/
        this.notbynTryOpen   = null;                // testHub retry code
    }

    _throw(int_errType, str_errMsg, obj_retVal)
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    imm_forceUpdate()
    {
        this.devListExpires = this._yapi.GetTickCount();
    }

    imm_logrequest(method, devUrl, obj_body)
    {
        let msg = 'Request: '+method+' '+devUrl;
        if(obj_body) {
            msg += ' (file='+obj_body.fname+')';
        }
        this._yapi.imm_log(msg);
    }

    /** Make sure the hub can work properly
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async testHub(mstimeout, errmsg)
    {
        // default test method is to issue a small request
        /** @type {YHTTPRequest} **/
        let yreq = await this.request('GET', '/api/module.json', null, 0);
        if(yreq.errorType != YAPI_SUCCESS) {
            errmsg.msg = yreq.errorMsg;
            return yreq.errorType;
        }

        return YAPI_SUCCESS;
    }

    imm_testHubAgainLater()
    {
        this.isNotifWorking = false;
        this.devListExpires = 0;
        if(this._reconnectionTimer) {
            // reconnection already scheduled
            return true;
        }
        // need to schedule next retry
        if(this.retryDelay < 15000) this.retryDelay *= 2;
        if(this.notbynOpenTimeout) {
            let now = this._yapi.GetTickCount();
            if (now >= this.notbynOpenTimeout) {
                return false;
            }
            if (now + this.retryDelay > this.notbynOpenTimeout) {
                this.retryDelay = this.notbynOpenTimeout - now;
            }
        }
        this._reconnectionTimer = setTimeout(() => {
            this._reconnectionTimer = null;
            if(this.notbynTryOpen) {
                this.notbynTryOpen();
            }
        }, this.retryDelay);
        return true;
    }

    async hubUpdateDeviceList()
    {
        // load hub API, process white pages and yellow pages
        try {
            /** @type {YDevice} **/
            let hubDev = this._yapi.imm_getDevice(this.urlInfo.url);
            hubDev.imm_dropCache();
            /** @type {number} **/
            let retcode = await hubDev.refresh();
            if(retcode != YAPI_SUCCESS) {
                return this._throw(retcode, hubDev._lastErrorMsg, retcode);
            }
            /** @type {YHTTPRequest} **/
            let yreq = await hubDev.requestAPI(this._yapi.defaultCacheValidity);
            if(yreq.errorType != YAPI_SUCCESS) {
                return yreq;
            }
            let whitePages = yreq.obj_result['services']['whitePages'];
            let yellowPages = yreq.obj_result['services']['yellowPages'];
            if(whitePages == undefined) {
                return this._throw(YAPI_IO_ERROR, 'Device '+hubDev.imm_describe()+' is not a hub',
                    YAPI_IO_ERROR);
            }
            retcode = await this._yapi.updateDeviceList_process(this, hubDev, whitePages, yellowPages);
            if(retcode != YAPI_SUCCESS) {
                return this._throw(this._yapi._lastErrorType, this._yapi._lastErrorMsg, this._yapi._lastErrorType);
            }

            // reset device list cache timeout for this hub
            if (this.isNotifWorking) {
                this.devListExpires = this._yapi.GetTickCount() + this._yapi._deviceListValidityMs;
            } else {
                this.devListExpires = this._yapi.GetTickCount() + 500;
            }
            return YAPI_SUCCESS;
        } catch(e) {
            return YAPI_IO_ERROR;
        }
    }

    imm_hasRwAccess()
    {
        return true; // assume write will work
    }

    /** Perform an HTTP query on the hub
     *
     * @param method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(method, devUrl, obj_body, tcpchan)
    {
        // must be overridden by subclasses
        var res = new YHTTPRequest(null);
        res.errorType = YAPI_NOT_SUPPORTED;
        res.errorMsg = 'GenericHub subclass expected';
        return res;
    }

    /** Create a new random boundary for form-encoding
     *
     * @returns {string}
     */
    imm_getBoundary()
    {
        return 'Zz'+Math.floor(Math.random() * 0xffffff).toString(16)+'zZ';
    }

    /** Form-encode a body object into an raw Uint8Array to send
     *
     * @param obj_body {YHTTPBody}
     * @param str_boundary {string}
     * @returns {Uint8Array}
     */
    imm_formEncodeBody(obj_body, str_boundary)
    {
        let hdr = this._yapi.imm_str2bin(
            'Content-Disposition: form-data; name="'+obj_body.fname+'"; filename="api"\r\n'+
            'Content-Type: application/octet-stream\r\n'+
            'Content-Transfer-Encoding: binary\r\n\r\n');
        let boundary = this._yapi.imm_str2bin(str_boundary);
        let dash = this._yapi.imm_str2bin('--');
        let crlf = this._yapi.imm_str2bin('\r\n');
        var parts = [dash, boundary, crlf, hdr, obj_body.data, crlf, dash, boundary, dash, crlf];
        let i, len = 0;
        for(i = 0; i < parts.length; i++) {
            len += parts[i].length;
        }
        let res = new Uint8Array(len);
        len = 0;
        for(i = 0; i < parts.length; i++) {
            res.set(parts[i], len);
            len += parts[i].length;
        }
        return res;
    }

    /** Return an array of serial numbers
     *
     * @returns {string}
     */
    async getBootloaders()
    {
        let yreq = await this.request('GET', '/flash.json?a=list', null, 1);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, []);
        }
        let flashState = JSON.parse(YAPI.imm_bin2str(yreq.bin_result));
        return flashState['list'];
    }

    /** Perform a firmware update
     *
     * @param serial {string}
     * @param firmware {YFirmwareFile}
     * @param settings {Uint8Array}
     * @param progress {function}
     * @returns {string[]}
     */
    async firmwareUpdate(serial, firmware, settings, progress)
    {
        let use_self_flash = false;
        let baseUrl = '';
        let need_reboot = true;
        let _throw = ((msg) => { return this._throw(YAPI.IO_ERROR, msg, [msg]); });

        progress(5, 'Check bootloader type');
        // Get the hub own serial number
        let yreq = await this.request('GET', '/api/module.json', null, 0);
        if(yreq.errorType != YAPI_SUCCESS) {
            return _throw('Hub is not responding');
        }
        let json = JSON.parse(this._yapi.imm_bin2str(yreq.bin_result));
        let ownSerial = json.serialNumber;
        if (ownSerial.slice(0,7) == 'VIRTHUB') {
            use_self_flash = false;
        } else if (serial == ownSerial) {
            use_self_flash = true;
        } else {
            // check if subdevice support self flashing
            yreq = await this.request('GET', '/bySerial/' + serial + '/flash.json?a=state', null, 0);
            if(yreq.errorType == YAPI_SUCCESS) {
                use_self_flash = true;
                baseUrl = '/bySerial/' + serial;
            }
        }
        let bootloaders = await this.getBootloaders();
        let is_shield = (serial.slice(0,7) == 'YHUBSHL');
        let i;
        for(i = 0; i < bootloaders.length; i++) {
            let bl = bootloaders[i];
            if (bl == serial) {
                need_reboot = false;
            } else if (is_shield) {
                if (bl.slice(0,7) == 'YHUBSHL') {
                    return _throw('Only one YoctoHub-Shield is allowed in update mode');
                }
            }
        }
        if (!use_self_flash && need_reboot) {
            // ensure we don't reboot a device when there are already 4 or more
            if (bootloaders.length >= 4) {
                return _throw('Too many devices in update mode');
            }
        }
        // ensure flash engine is not busy
        yreq = await this.request('GET', baseUrl + '/flash.json?a=state', null, 0);
        if(yreq.errorType != YAPI_SUCCESS) {
            return _throw('Cannot check state of firmware upload');
        }
        json = JSON.parse(this._yapi.imm_bin2str(yreq.bin_result));
        if(json['state'] == 'uploading' || json['state'] == 'flashing') {
            return _throw('Cannot start firmware update: busy (' + json['state'] + ')');
        }
        // start firmware upload
        progress(10, 'Send firmware file');
        let progressCb = function(curr, total) {
            curr >>= 10;
            total >>= 10;
            progress(10+parseInt(28*curr/total), 'Send firmware file: '+curr+'KB / '+total+'KB');
        };
        yreq = await this.request('POST', baseUrl + '/upload.html', new YHTTPBody('firmware', firmware.imm_getData(), progressCb), 0);
        if(yreq.errorType != YAPI_SUCCESS) {
            return _throw('Firmware upload failed: '+yreq.errorMsg);
        }
        yreq = await this.request('GET', baseUrl + '/flash.json?a=state', null, 0);
        if(yreq.errorType != YAPI_SUCCESS) {
            return _throw('Cannot check state of firmware upload');
        }
        json = JSON.parse(this._yapi.imm_bin2str(yreq.bin_result));
        if(json['state'] != 'valid') {
            return _throw('Upload of firmware failed: invalid firmware(' + json['state'] + ')');
        }
        if(json['progress'] != '100') {
            return _throw('Upload of firmware failed: incomplete upload');
        }
        if (use_self_flash) {
            let settingsStr = this._yapi.imm_bin2str(settings);
            let settingsAndFiles = JSON.parse(settingsStr);
            let settingsOnly = settingsAndFiles['api'];
            let startupApi = {};
            for(let key in settingsOnly) {
                if(key != 'services') {
                    startupApi[key] = settingsOnly[key];
                }
            }
            let startupConf = this._yapi.imm_str2bin(JSON.stringify(startupApi));
            progress(38, 'Save current settings');
            yreq = await this.request('POST', baseUrl + '/upload.html', new YHTTPBody('startupConf.json', startupConf, null), 0);
            if(yreq.errorType != YAPI_SUCCESS) {
                return _throw('Failed to save settings on hub');
            }
            progress(39, 'Save current settings');
            yreq = await this.request('POST', baseUrl + '/upload.html', new YHTTPBody('firmwareConf', startupConf, null), 0);
            if(yreq.errorType != YAPI_SUCCESS) {
                return _throw('Failed to save settings on hub');
            }
        }

        //40%-> 80%
        if (use_self_flash) {
            progress(40, 'Flash firmware');
            // the hub itself -> reboot in autoflash mode
            await this.request('GET', baseUrl + '/api/module/rebootCountdown?rebootCountdown=-1003', null, 0);
            await this._yapi.Sleep(7000);
        } else {
            // reboot device to bootloader if needed
            if(need_reboot) {
                // reboot subdevice
                await this.request('GET', '/bySerial/' + serial + '/api/module/rebootCountdown?rebootCountdown=-2', null, 0);
            }
            // verify that the device is in bootloader
            let timeout = YAPI.GetTickCount() + 20000;
            let res;
            let found = false;
            progress(40, 'Wait for device to be in bootloader');
            do {
                bootloaders = await this.getBootloaders();
                for(i = 0; i < bootloaders.length; i++) {
                    let bl = bootloaders[i];
                    if (bl == serial) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    await this._yapi.Sleep(500);
                }
            } while (!found && YAPI.GetTickCount() < timeout);
            //start flash
            progress(45, 'Flash firmware');
            let fwsize = (firmware.imm_getData().length+512) >> 10;
            let checkTimer;
            let checkFlash = (() => {
                this.request('GET', baseUrl + '/flash.json?a=state', null, 1).then((flashReq) => {
                    if(flashReq.errorType == YAPI_SUCCESS) {
                        let jsonState = YAPI.imm_bin2str(flashReq.bin_result);
                        let res = JSON.parse(jsonState);
                        if (res.state == 'flashing') {
                            if(res.progress < 20) {
                                progress(45+parseInt(res.progress/3), 'Erasing previous firmware: '+parseInt(fwsize*(res.progress-3)/18)+'KB / '+fwsize+'KB');
                            } else {
                                progress(45+parseInt(res.progress/3), 'Flashing new firmware: '+parseInt(fwsize*(res.progress-20)/76)+'KB / '+fwsize+'KB');
                            }
                        }
                    }
                    checkTimer = setTimeout(checkFlash, 500);
                }).catch((e) => { 
                    this._yapi.imm_log('Exception during firmware flash: ', e); 
                    checkTimer = setTimeout(checkFlash, 500); 
                });
            });
            checkTimer = setTimeout(checkFlash, 1000);
            yreq = await this.request('GET', '/flash.json?a=flash&s=' + serial, null, 0);
            clearTimeout(checkTimer);
            if(yreq.errorType != YAPI_SUCCESS) {
                return _throw('Cannot check state of firmware flash');
            }
            return JSON.parse(this._yapi.imm_bin2str(yreq.bin_result));
        }
        return null;
    }

    imm_commonDisconnect()
    {
        if(this.timeoutId) clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.disconnecting = true;
    }

    // default implementation of disconnect
    // note: super.xxx() cannot be used in an async function !
    async disconnect()
    {
        this.imm_commonDisconnect();
    }

    // default implementation of function that says if a hub is currently forwarded and handled remotely
    imm_isForwarded()
    {
        return false;
    }

    // default implementation of reconnect (abort communication to trigget an automatic reconnection)
    async reconnect()
    {
        // nothing to do
    }

    // default implementation of isOnline
    imm_isOnline()
    {
        return (Date.now() - this.lastPingStamp) < 10000;
    }
}

class YHttpHub extends YGenericHub
{
    constructor(obj_yapi, var_urlInfo)
    {
        super(obj_yapi, var_urlInfo);
        /** @member {XMLHttpRequest} **/
        this.notbynRequest     = null;
        /** @member {Promise} **/
        this.notbynOpenPromise = null;
    }

    /** Handle HTTP-based event-monitoring work on a registered hub
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async testHub(mstimeout, errmsg)
    {
        if (this.disconnecting) {
            if(errmsg) {
                errmsg.msg = "I/O error";
            }
            return YAPI_IO_ERROR;
        }
        let args = '?len=' + this.notiflen.toString();
        if (this.notifPos > 0) {
            args += '&abs=' + this.notifPos.toString();
        }
        if(!this.notbynOpenPromise) {
            this.notbynOpenTimeout = (mstimeout ? this._yapi.GetTickCount() + mstimeout : null);
            this.notbynOpenPromise = new Promise(
                (resolve, reject) => {
                    this.notbynTryOpen = () => {
                        this.notbynRequest = new XMLHttpRequest();
                        this.notbynRequest.open('GET', this.urlInfo.url+'not.byn'+args, true, '', '');
                        this.notbynRequest.overrideMimeType('text/plain; charset=x-user-defined');
                        this.notbynRequest.onreadystatechange = (() => {
                            if (this.disconnecting) {
                                return;
                            }
                            if (this.notbynRequest.readyState >= 3) {
                                resolve({res:YAPI_SUCCESS, msg:""});
                                if (this.notbynRequest.readyState == 4 &&
                                    parseInt(this.notbynRequest.status) != 200 &&
                                    parseInt(this.notbynRequest.status) != 304) {
                                    // connection error
                                    if(!this.imm_testHubAgainLater()) {
                                        resolve({res:YAPI_IO_ERROR, msg:"I/O error"});
                                    }
                                } else {
                                    // receiving data properly
                                    if (this.notbynRequest.readyState == 3) {
                                        // when using reconnection mode, ignore state 3
                                        if (this.notiflen == 1) return;
                                    }
                                    let newlen = this.notbynRequest.responseText.length;
                                    if (newlen > this.currPos) {
                                        this._yapi.parseEvents(this, this.notbynRequest.responseText.substr(this.currPos, newlen - this.currPos));
                                    }
                                    // trigger immediately a new connection if closed in success
                                    if (this.notbynRequest.readyState == 4 && parseInt(this.notbynRequest.status) != 0) {
                                        this.notbynOpenPromise = null;
                                        this.currPos = 0;
                                        this.testHub(0, errmsg);
                                    }
                                }
                            }
                        });
                        this.notbynRequest.send('');
                    };
                    this.notbynTryOpen();
                }
            );
        }
        let res_struct = await this.notbynOpenPromise;
        if (errmsg) {
            errmsg.msg = res_struct.msg;
        }
        this.notbynOpenPromise = null;
        return res_struct.res;
    }

    /** Perform an HTTP query on the hub
     *
     * @param method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(method, devUrl, obj_body, tcpchan)
    {
        let httpPromise = new Promise(
            (resolve, reject) => {
                let prefix = this.urlInfo.url.slice(0,-1);
                let httpRequest = new XMLHttpRequest();
                httpRequest.open(method, prefix + devUrl, true, this.urlInfo.user, this.urlInfo.pass);
                httpRequest.onreadystatechange = (() => {
                    if (httpRequest.readyState == 4) {
                        let yreq = new YHTTPRequest(null);
                        if(httpRequest.status != 200 && httpRequest.status != 304) {
                            yreq.errorType = (httpRequest.status == 401 ? YAPI_UNAUTHORIZED : YAPI_NOT_SUPPORTED);
                            yreq.errorMsg = 'HTTP Error '+httpRequest.status+' on '+prefix+devUrl;
                        } else {
                            yreq.bin_result = this._yapi.imm_str2bin(httpRequest.responseText);
                        }
                        resolve(yreq);
                    }
                });
                let body = '';
                if(obj_body) {
                    let blob = new Blob([obj_body.data], {type: 'application/octet-binary'});
                    body = new FormData();
                    body.append(obj_body.fname, blob);
                }
                httpRequest.send(body || '');
            }
        );
        return httpPromise;
    }

    async disconnect()
    {
        this.imm_commonDisconnect();
        this.notbynRequest.abort();
    }
}

class YHttpNodeHub extends YGenericHub
{
    constructor(obj_yapi, var_urlInfo)
    {
        super(obj_yapi, var_urlInfo);
        this.http = this._yapi._nodeRequire('http');
        this.agent = new this.http.Agent({ keepAlive: true });
        /** @member {ClientRequest} **/
        this.notbynRequest     = null;
        /** @member {Promise} **/
        this.notbynOpenPromise = null;
    }

    /** Handle HTTP-based event-monitoring work on a registered hub
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async testHub(mstimeout, errmsg)
    {
        if (this.disconnecting) {
            if(errmsg) {
                errmsg.msg = "I/O error";
            }
            return YAPI_IO_ERROR;
        }
        let args = '';
        if (this.notifPos > 0) {
            args = '?abs=' + this.notifPos.toString();
        }
        let options = {
            method: 'GET',
            hostname: this.urlInfo.host,
            port: this.urlInfo.port,
            path: '/not.byn'+args
        };
        if(!this.notbynOpenPromise) {
            this.notbynOpenTimeout = (mstimeout ? this._yapi.GetTickCount() + mstimeout : null);
            this.notbynOpenPromise = new Promise(
                (resolve, reject) => {
                    this.notbynTryOpen = () => {
                        this.notbynRequest = this.http.request(options, (res) => {
                            if (this.disconnecting) {
                                return;
                            }
                            if (res.statusCode == 401) {
                                resolve({res:YAPI_UNAUTHORIZED, msg:"Unauthorized access (use WebSocket for authentication)"});
                            }
                            if (res.statusCode != 200 && res.statusCode != 304) {
                                // connection error
                                if (!this.imm_testHubAgainLater()) {
                                    resolve({res:YAPI_IO_ERROR, msg:"I/O error"});
                                }
                            } else {
                                resolve({res:YAPI_SUCCESS, msg:""});
                                res.on('data', (chunk) => {
                                    // receiving data properly
                                    this._yapi.parseEvents(this, this._yapi.imm_bin2str(chunk));
                                });
                                res.on('end', () => {
                                    // trigger immediately a new connection if closed in success
                                    this.notbynOpenPromise = null;
                                    this.currPos = 0;
                                    this.testHub(0, errmsg);
                                });
                            }
                        });
                        this.notbynRequest.on('error', () => {
                            // connection aborted, need to reconnect ASAP
                            if (!this.imm_testHubAgainLater()) {
                                resolve({res:YAPI_IO_ERROR, msg:"I/O error"});
                            }
                        });
                        this.notbynRequest.end();
                    };
                    this.notbynTryOpen();
                }
            );
        }
        let res_struct = await this.notbynOpenPromise;
        if (errmsg) {
            errmsg.msg = res_struct.msg;
        }
        this.notbynOpenPromise = null;
        return res_struct.res;
    }

    /** Perform an HTTP query on the hub
     *
     * @param str_method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(str_method, devUrl, obj_body, tcpchan)
    {
        let options = {
            agent: this.agent,
            method: str_method,
            hostname: this.urlInfo.host,
            port: this.urlInfo.port,
            path: devUrl
        };
        if(obj_body) {
            options.boundary = this.imm_getBoundary();
            options.headers = {
                'Content-Type': 'multipart/form-data; boundary='+options.boundary,
                'Transfer-Encoding': ''
            };
        }
        let httpPromise = new Promise(
            (resolve, reject) => {
                let response = new Buffer.alloc(0);
                let httpRequest = this.http.request(options, (res) => {
                    if(res.statusCode != 200 && res.statusCode != 304) {
                        // connection error
                        let yreq = new YHTTPRequest(null);
                        yreq.errorType = (httpRequest.status == 401 ? YAPI_UNAUTHORIZED : YAPI_NOT_SUPPORTED);
                        yreq.errorMsg = 'HTTP Error '+res.statusCode.toString()+' on '+this.urlInfo.url.slice(0,-1)+devUrl;
                        resolve(yreq);
                    } else {
                        res.on('data', (chunk) => {
                            // receiving data properly
                            response = Buffer.concat([response,chunk]);
                        });
                        res.on('end', () => {
                            resolve(new YHTTPRequest(new Uint8Array(response)));
                        })
                    }
                });
                httpRequest.on('error', (err) => {
                    let yreq = new YHTTPRequest(null);
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = err.errorMsg;
                    resolve(yreq);
                });
                if(obj_body) {
                    httpRequest.write(new Buffer.from(this.imm_formEncodeBody(obj_body, options.boundary)));
                }
                httpRequest.end();
            }
        );
        return httpPromise;
    }

    async disconnect()
    {
        this.imm_commonDisconnect();
        this.notbynRequest.abort();
    }
}

class YHttpCallbackHub extends YGenericHub
{
    constructor(obj_yapi, var_urlInfo, incomingMessage, serverResponse)
    {
        super(obj_yapi, var_urlInfo);
        var cbhub = this;
        /** @member {IncomingMessage} **/
        this._incomingMessage = incomingMessage;
        /** @member {ServerResponse} **/
        this._serverResponse = serverResponse;
        /** @member {Buffer} **/
        this._callbackData = new Buffer.alloc(0);
        /** @member {Object} **/
        this._callbackCache = null;
        /** @member {Promise} **/
        this.httpCallbackPromise = new Promise(
            (resolve, reject) => {
                cbhub._incomingMessage.on('data', (chunk) => {
                    cbhub._callbackData = Buffer.concat([cbhub._callbackData,chunk]);
                });
                cbhub._incomingMessage.on('end', () => {
                    cbhub._callbackData = new Uint8Array(cbhub._callbackData);
                    cbhub._callbackCache = JSON.parse(cbhub._yapi.imm_bin2str(cbhub._callbackData));
                    resolve(true);
                });
            }
        );
    }

    /** Test input data for a HTTP callback hub
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async testHub(mstimeout, errmsg)
    {
        await this.httpCallbackPromise;
        if(this._incomingMessage.method != 'POST') {
            errmsg.msg = 'HTTP POST expected';
            return YAPI_INVALID_ARGUMENT;
        }
        if(this._callbackData.length == 0) {
            errmsg.msg = 'Empty POST body';
            return YAPI_NO_MORE_DATA;
        }
        if (this.urlInfo.pass != '') {
            // callback data signed, verify signature
            if (!this._callbackCache.sign) {
                errmsg.msg = 'missing signature from incoming YoctoHub (callback password required)';
                this._callbackCache = [];
                return YAPI_NO_MORE_DATA;
            }
            let sign = this._callbackCache['sign'];
            let pass = this.urlInfo.pass;
            let salt;
            if (pass.length == 32) {
                salt = pass.toLowerCase();
            } else {
                salt = this._yapi.imm_bin2hexstr(this._yapi.imm_yMD5(pass)).toLowerCase();
            }
            let patched = this._yapi.imm_bin2str(this._callbackData).replace(sign, salt);
            let check = this._yapi.imm_bin2hexstr(this._yapi.imm_yMD5(patched));
            if (check.toLowerCase() != sign.toLowerCase()) {
                //this._yapi.imm_log('Computed signature: '+ check);
                //this._yapi.imm_log('Received signature: '+ sign);
                errmsg.msg = 'invalid signature from incoming YoctoHub (invalid callback password)';
                this._callbackCache = [];
                return YAPI_UNAUTHORIZED;
            }
        }
        return YAPI_SUCCESS;
    }

    /** Perform an HTTP query on the hub
     *
     * @param str_method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(str_method, devUrl, obj_body, tcpchan)
    {
        let yreq = new YHTTPRequest(null);
        if(str_method == 'POST' && obj_body) {
            let boundary = this.imm_getBoundary();
            let body = this.imm_formEncodeBody(obj_body, boundary);
            this._serverResponse.write('\n@YoctoAPI:'+str_method+' '+devUrl+' '+body.length+':'+boundary+'\n');
            this._serverResponse.write(new Buffer.from(body));
        } else if(str_method == 'GET') {
            var jzon = devUrl.indexOf('?fw=');
            if(jzon != -1 && devUrl.indexOf('&', jzon) == -1) {
                devUrl = devUrl.slice(0, jzon);
            }
            if(devUrl.indexOf('?') == -1 ||
                devUrl.indexOf('/logs.txt') != -1 ||
                devUrl.indexOf('/logger.json') != -1 ||
                devUrl.indexOf('/ping.txt') != -1 ||
                devUrl.indexOf('/files.json?a=dir') != -1) {
                // read request, load from cache
                var subfun = /\/api\/([a-z][A-Za-z0-9]*)[.]json$/.exec(devUrl);
                if(subfun) {
                    devUrl = devUrl.slice(0,subfun.index)+'/api.json';
                }
                if(!this._callbackCache[devUrl]) {
                    this._serverResponse.write('\n!YoctoAPI:'+devUrl+' is not preloaded, adding to list');
                    this._serverResponse.write('\n@YoctoAPI:+'+devUrl+'\n');
                    yreq.errorType = YAPI_NO_MORE_DATA;
                    yreq.errorMsg = 'URL '+devUrl+' not preloaded, adding to list';
                } else {
                    var jsonres = this._callbackCache[devUrl];
                    if(subfun) {
                        jsonres = jsonres[subfun[1]];
                    }
                    yreq.bin_result = this._yapi.imm_str2bin(JSON.stringify(jsonres));
                }
            } else {
                // change request, print to output stream
                this._serverResponse.write('\n@YoctoAPI:'+str_method+' '+devUrl+'\n');
                yreq.bin_result = new Uint8Array(0);
            }
        } else {
            yreq.errorType = YAPI_NOT_SUPPORTED;
            yreq.errorMsg = 'Unsupported HTTP method';
        }
        return yreq;
    }
}

class YWebSocketHub extends YGenericHub
{
    constructor(obj_yapi, var_urlInfo)
    {
        super(obj_yapi, var_urlInfo);
        /** @member {WebSocket} **/
        this.websocket            = null;
        /** @member {Promise} **/
        this.notbynOpenPromise = null;
        /** @member {YHTTPRequest[]} **/
        this.tcpChan              = [];
        /** @member {number} **/
        this.nextAsyncId          = 48;

        // default transport layer parameters
        this._DEFAULT_TCP_ROUND_TRIP_TIME = 30;
        this._DEFAULT_TCP_MAX_WINDOW_SIZE = 4 * 65536;

        // websocket protocol parameters
        this._YIO_DEFAULT_TCP_TIMEOUT = 20000;
        this._YIO_1_MINUTE_TCP_TIMEOUT = 60000;
        this._YIO_10_MINUTES_TCP_TIMEOUT = 600000;

        // websocket protocol encoding constants
        this._YSTREAM_TCP = 1;
        this._YSTREAM_TCP_CLOSE = 2;
        this._YSTREAM_META = 5;
        this._YSTREAM_TCP_NOTIF = 8;
        this._YSTREAM_TCP_ASYNCCLOSE = 9;

        this._USB_META_UTCTIME = 1;
        this._USB_META_DLFLUSH = 2;
        this._USB_META_ACK_D2H_PACKET = 3;
        this._USB_META_WS_ANNOUNCE = 4;
        this._USB_META_WS_AUTHENTICATION = 5;
        this._USB_META_WS_ERROR = 6;
        this._USB_META_ACK_UPLOAD = 7;

        this._USB_META_UTCTIME_SIZE = 5;
        this._USB_META_DLFLUSH_SIZE = 1;
        this._USB_META_ACK_D2H_PACKET_SIZE = 2;
        this._USB_META_WS_ANNOUNCE_SIZE = 8 + 20;
        this._USB_META_WS_AUTHENTICATION_SIZE = 28;
        this._USB_META_WS_ERROR_SIZE = 6;
        this._USB_META_ACK_UPLOAD_SIZE = 6;

        this._USB_META_WS_VALID_SHA1 = 1;
        this._USB_META_WS_RW = 2;

        this._WS_DEAD = 0;
        this._WS_DISCONNECTED = 1;
        this._WS_CONNECTING = 2;
        this._WS_AUTHENTICATING = 3;
        this._WS_CONNECTED = 4;

        // connection state members
        this._reconnectionTimer = null;
        this._connectionTime = 0;
        this._connectionState = this._WS_CONNECTING;
        this._remoteVersion = 0;
        this._remoteSerial = '';
        this._remoteNonce = -1;
        this._nonce = -1;
        this._session_error = null;
        this._session_errno = null;
        this._rwAccess = false;
        this._tcpRoundTripTime = this._DEFAULT_TCP_ROUND_TRIP_TIME;
        this._tcpMaxWindowSize = this._DEFAULT_TCP_MAX_WINDOW_SIZE;
        this._lastUploadAckBytes = [ 0 ];
        this._lastUploadAckTime = [ 0 ];
        this._lastUploadRateBytes = [ 0 ];
        this._lastUploadRateTime = [ 0 ];
        this._uploadRate = [ 0 ];

        // websocket forwarding support
        this.fwd_nonce = -1;
        this.fwd_websocket = null;
        this.fwd_credentials = null;
        this.fwd_connectionState = this._WS_DISCONNECTED;
        this.fwd_closeCallback = null;
    }

    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url)
    {
        this.websocket = new WebSocket(str_url);
        this.websocket.binaryType = 'arraybuffer';
    }

    /** Report a low-level asynchronous websocket error
     *
     * @param errorType {number}
     * @param message {string}
     **/
    imm_asyncWebSocketError(errorType, message)
    {
        // Note: throwing an exception here would typically kill the node.js process
        this._yapi.imm_log('WS: '+message);
    }

    /** Handle websocket-based event-monitoring work on a registered hub
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async testHub(mstimeout, errmsg)
    {
        if (this.disconnecting) {
            if(errmsg) {
                errmsg.msg = "I/O error";
            }
            return YAPI_IO_ERROR;
        }
        // Open WebSocket connection
        this._connectionState = this._WS_CONNECTING;
        if(!this.notbynOpenPromise) {
            this.notbynOpenTimeout = (mstimeout ? this._yapi.GetTickCount() + mstimeout : null);
            this.notbynOpenPromise = new Promise(
                (resolve, reject) => {
                    this.notbynTryOpen = () => {
                        if (this.disconnecting) {
                            resolve({res:YAPI_IO_ERROR, msg:"I/O error"});
                        } else {
                            this.imm_webSocketOpen(this.urlInfo.url + 'not.byn');
                            if (!this.websocket) {
                                resolve({res:YAPI_IO_ERROR, msg:"I/O error"});
                            } else {
                                this.websocket.onmessage = ((evt) => {
                                    this._webSocketMsg(new Uint8Array(evt.data));
                                    if (this._connectionState == this._WS_CONNECTED) {
                                        this.notbynOpenTimeout = null;
                                        resolve({res:YAPI_SUCCESS, msg:""});
                                    } else if (this._connectionState == this._WS_DEAD) {
                                        if (errmsg) {
                                            errmsg.msg = this._session_error;
                                        }
                                        this._yapi.imm_log('WebSocket error: ' + this._session_error);
                                        if (this._session_errno == 401) {
                                            resolve({res:YAPI_UNAUTHORIZED, msg:"Unauthorized access"});
                                        }else {
                                            resolve({res:YAPI_IO_ERROR, msg:"I/O error"});
                                        }
                                        this.disconnect();
                                    }
                                });
                                this.websocket.onclose = ((evt) => {
                                    this._connectionState = this._WS_DISCONNECTED;
                                    this.websocket = null;
                                    if (this.timeoutId) {
                                        clearTimeout(this.timeoutId);
                                        this.timeoutId = null;
                                    }

                                    if (this.retryDelay < 0) {
                                        this.disconnecting = true;
                                    }
                                    this.imm_dropAllPendingConnection();
                                    if (this.disconnecting) {
                                        return;
                                    }
                                    // connection error
                                    if (!this.imm_testHubAgainLater()) {
                                        resolve({res:YAPI_IO_ERROR, msg:"I/O error"});
                                    }
                                });
                                this.websocket.onerror = ((evt) => {
                                    this._yapi.imm_log('WebSocket error: ', evt);
                                    if (this.websocket.terminate) {
                                        this.websocket.terminate();
                                    }
                                    this._connectionState = this._WS_DISCONNECTED;
                                    this.websocket = null;
                                    if (this.retryDelay < 0) {
                                        this.disconnecting = true;
                                    }
                                    this.imm_dropAllPendingConnection();
                                    if (this.disconnecting) {
                                        return;
                                    }
                                    // connection error
                                    if (!this.imm_testHubAgainLater()) {
                                        resolve({res:YAPI_IO_ERROR, msg:"I/O error"});
                                    }
                                });
                            }
                        }
                    };
                    this.notbynTryOpen();
                }
            );
        }
        let res_struct = await this.notbynOpenPromise;
        if (errmsg) {
            errmsg.msg = res_struct.msg;
        }
        this.notbynOpenPromise = null;
        return res_struct.res;
    }

    /** Compute websocket authentication sha1 key
     *
     * @param user {string}
     * @param pass {string}
     * @param serial {string}
     * @param nonce
     * @return {Uint8Array}
     */
    imm_computeAuth(user, pass, serial, nonce)
    {
        let ha1_str = user + ':' + serial + ':' + pass;
        let ha1 = this._yapi.imm_bin2hexstr(this._yapi.imm_yMD5(ha1_str)).toLowerCase();
        let nonce8 = new Uint8Array([(nonce & 0xff) >>> 0, (nonce & 0xff00) >>> 8, (nonce & 0xff0000) >>> 16, nonce >>> 24]);
        let sha1_raw = ha1 + this._yapi.imm_bin2hexstr(nonce8).toLowerCase();
        return this._yapi.imm_ySHA1(sha1_raw.toLowerCase());
    }

    /** Tell if a websocket hub is currently forwarded and handled remotely
     *
     * @return {boolean}
     */
    imm_isForwarded()
    {
        return this.fwd_connectionState == this._WS_CONNECTED && this.fwd_websocket;
    }

    /** Handle an incoming packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    async _webSocketMsg(arr_bytes)
    {
        try {
            if(this.imm_isForwarded()) {
                this.lastPingStamp = Date.now();
                this.fwd_websocket.send(arr_bytes);
                return;
            }

            let reltime = (this._yapi.GetTickCount() - this._connectionTime)/1000.0;
            let ystream = arr_bytes[0] >>> 3;
            let text = '';
            if(ystream == this._YSTREAM_TCP_NOTIF) {
                //this._yapi.imm_log(reltime+': TCP_NOTIF len='+arr_bytes.length);
                for(let i = 1; i < arr_bytes.length; i++) {
                    text += String.fromCharCode(arr_bytes[i]);
                }
                await this._yapi.parseEvents(this, text);
                return;
            }
            // Other types of messages
            let ws = this.websocket;
            let tcpchan = arr_bytes[0] & 7;
            if(ystream == this._YSTREAM_TCP || ystream == this._YSTREAM_TCP_CLOSE || ystream == this._YSTREAM_TCP_ASYNCCLOSE) {
                if(tcpchan > 3) {
                    this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Unexpected frame for tcpChan '+tcpchan+' ('+ystream+')');
                    return;
                }
                let tcp_end = arr_bytes.length;
                let yreq = this.tcpChan[tcpchan];
                //this._yapi.imm_log(reltime+': TCP ystream='+ystream+' len='+arr_bytes.length);
                if(!yreq) {
                    this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Drop frame for closed tcpChan '+tcpchan+' ('+ystream+')');
                    return;
                }
                if(ystream == this._YSTREAM_TCP_ASYNCCLOSE) {
                    // async close packet, check async signature byte
                    tcp_end--;
                    let rcvId = arr_bytes[tcp_end];
                    if(this._yapi._logLevel >= 5) {
                        this._yapi.imm_log('async-' + rcvId + ' close received');
                    }
                    if(yreq.asyncId == 0) {
                        if(this._yapi._logLevel >= 4) {
                            this._yapi.imm_log('async-' + rcvId + ' close received while req @' + yreq._creat + ' was pending');
                        }
                        this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Asynchronous close received, sync reply request');
                        return;
                    } else if(yreq.asyncId != rcvId) {
                        if(this._yapi._logLevel >= 4) {
                            this._yapi.imm_log('async-' + rcvId + ' close received instead of async-' + yreq.asyncId + ' close');
                        }
                        this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Incorrect async-close signature on tcpChan '+tcpchan);
                        return;
                    }
                }
                let oldArr = yreq.bin_result;
                let newArr = new Uint8Array(oldArr.length + tcp_end-1);
                newArr.set(oldArr, 0);
                newArr.set(arr_bytes.subarray(1,tcp_end), oldArr.length);
                yreq.bin_result = newArr;

                // when the request is closed, post result to caller
                if(ystream == this._YSTREAM_TCP_CLOSE || ystream == this._YSTREAM_TCP_ASYNCCLOSE) {
                    // Pop request from tcp channel
                    this.tcpChan[tcpchan] = yreq.next;

                    // Handle synchronous close
                    if(ystream == this._YSTREAM_TCP_CLOSE) {
                        // synchronous close
                        if(yreq.asyncId != 0) {
                            if(this._yapi._logLevel >= 4) {
                                this._yapi.imm_log('Synchronous close received instead of async-' + yreq.asyncId + ' close');
                            }
                            // no need to ack that close packet, we have sent the ack when aborting
                            // the request if the request was indeed coming from us
                            this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Synchronous close received, async ack expected');
                            return;
                        } else {
                            if(yreq.toBeSent && yreq.sendPos < yreq.toBeSent.length) {
                                // close before completely sent
                                // force a websocket disconnection to resynchronize
                                this._yapi.imm_log('WS: tcpclose at '+yreq.sendPos+' < '+yreq.toBeSent.length);
                                this.websocket.close();
                                if(yreq.timeoutId) {
                                    clearTimeout(yreq.timeoutId);
                                }
                                if(yreq.asyncId == 0) {
                                    yreq.errorType = YAPI_IO_ERROR;
                                    yreq.errorMsg = 'TCP closed during upload';
                                    try { yreq.acceptor(yreq); } catch(e) {}
                                }
                                return;
                            }
                            if(yreq.timeoutId) {
                                // request was not aborted, ack synchronous close by sending YSTREAM_TCP_CLOSE
                                let frame = new Uint8Array(1);
                                frame[0] = (this._YSTREAM_TCP_CLOSE << 3) + tcpchan;
                                this.websocket.send(frame);
                            }
                        }
                    }

                    // Clear timeout for this request
                    if(yreq.timeoutId) {
                        clearTimeout(yreq.timeoutId);
                        yreq.timeoutId = 0;
                    }

                    // process incoming reply
                    let pos = yreq.bin_result.indexOf(13);
                    if(pos < 0) {
                        yreq.errorType = YAPI_IO_ERROR;
                        yreq.errorMsg = 'Bad response header';
                    } else {
                        let header = this._yapi.imm_bin2str(yreq.bin_result.subarray(0, pos));
                        let words = header.split(' ');
                        if (words[0] == 'OK') {
                            yreq.errorType = YAPI_SUCCESS;
                            let nextpos = yreq.bin_result.indexOf(13, pos+2);
                            while(nextpos > pos+2) {
                                pos = nextpos;
                                nextpos = yreq.bin_result.indexOf(13, pos+2);
                            }
                            if(nextpos < 0) {
                                // just in case, but this should not happen normally
                                nextpos = pos;
                            }
                            yreq.bin_result = yreq.bin_result.subarray(nextpos+2);
                        } else if (words[0] == '0K') {
                            yreq.errorType = YAPI_IO_ERROR;
                            yreq.errorMsg = 'Unexpected persistent connection';
                        } else {
                            let status = parseInt(words[1]);
                            yreq.errorType = (status == 401 ? YAPI_UNAUTHORIZED : YAPI_IO_ERROR);
                            yreq.errorMsg = 'HTTP error '+header.slice(words[0].length+1)+' on '+yreq.devUrl;
                        }
                    }
                    if(yreq.asyncId == 0) {
                        if(this._yapi._logLevel >= 5) {
                            this._yapi.imm_log('request @' + yreq._creat + ' done, status=' + yreq.errorType);
                        }
                        this.imm_sendPendingRequest(tcpchan);
                        yreq.acceptor(yreq);
                    } else {
                        // asynchronous request: log errors, but nothing else to be done
                        if(yreq.errorType != YAPI_SUCCESS) {
                            this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Async request error: '+yreq.errorMsg);
                        }
                    }
                }
                return;
            }
            if(ystream == this._YSTREAM_META) {
                let metatype = arr_bytes[1];
                //this._yapi.imm_log(reltime+': META type='+metatype+' len='+arr_bytes.length);
                switch (metatype) {
                    case this._USB_META_WS_ANNOUNCE:
                        if(arr_bytes.length < 1+this._USB_META_WS_ANNOUNCE_SIZE) {
                            return;
                        }
                        this._remoteVersion = arr_bytes[2];
                        if (this._remoteVersion < 1) {
                            return;
                        }
                        let maxtcpws = (arr_bytes[3]<<4)+(arr_bytes[4]<<12);
                        if(maxtcpws > 0) {
                            this._tcpMaxWindowSize = maxtcpws;
                        }
                        this._remoteNonce = arr_bytes[5]+(arr_bytes[6]<<8)+(arr_bytes[7]<<16)+(arr_bytes[8]<<24);
                        for(let i = 9; i < 9+20; i++) {
                            if(arr_bytes[i] == 0) {
                                this._remoteSerial = this._yapi.imm_bin2str(arr_bytes.subarray(9,i));
                                break;
                            }
                        }
                        let nonce = new Uint8Array(4);
                        this._yapi._getRandomValues(nonce);
                        this._nonce = nonce[0]+(nonce[1]<<8)+(nonce[2]<<16)+(nonce[3]<<24);
                        this._connectionTime = this._yapi.GetTickCount();
                        this._connectionState = this._WS_AUTHENTICATING;
                        // send our authentication packet
                        let frame = new Uint8Array(1+this._USB_META_WS_AUTHENTICATION_SIZE);
                        let version = (this._remoteVersion < 2 ? this._remoteVersion : 2);
                        let flags = 0;
                        frame[0] = (this._YSTREAM_META << 3);
                        frame[1] = this._USB_META_WS_AUTHENTICATION;
                        frame[2] = version;
                        if (this.urlInfo.pass != '') {
                            flags = this._USB_META_WS_VALID_SHA1;
                            let sha1 = this.imm_computeAuth(this.urlInfo.user, this.urlInfo.pass, this._remoteSerial, this._remoteNonce);
                            for(let i = 0; i < sha1.length; i++) {
                                frame[9+i] = sha1[i];
                            }
                        }
                        frame[3] = flags & 0xff;
                        frame[4] = flags >>> 8;
                        frame[5] = this._nonce & 0xff;
                        frame[6] = (this._nonce >>> 8) & 0xff;
                        frame[7] = (this._nonce >>> 16) & 0xff;
                        frame[8] = (this._nonce >>> 24) & 0xff;
                        this.websocket.send(frame);
                        break;
                    case this._USB_META_WS_AUTHENTICATION:
                        if(this._connectionState != this._WS_AUTHENTICATING) {
                            return;
                        }
                        if(arr_bytes.length < 1+this._USB_META_WS_AUTHENTICATION_SIZE) {
                            return;
                        }
                        this._tcpRoundTripTime = this._yapi.GetTickCount() - this._connectionTime + 1;
                        if(this._tcpMaxWindowSize < 2048 && this._tcpRoundTripTime < 7) {
                            // Fix overly optimistic round-trip on YoctoHubs
                            this._tcpRoundTripTime = 7;
                        }
                        let uploadRate = parseInt(this._tcpMaxWindowSize * 1000 / this._tcpRoundTripTime);
                        if(this._yapi._logLevel >= 4) {
                            this._yapi.imm_log('RTT='+this._tcpRoundTripTime+'ms, WS='+this._tcpMaxWindowSize+', uploadRate='+(uploadRate/1000)+' KB/s');
                        }
                        this._remoteVersion = arr_bytes[2];
                        if (this._remoteVersion < 1) {
                            return;
                        }
                        let inflags = arr_bytes[3]+(arr_bytes[4]<<8);
                        if ((inflags & this._USB_META_WS_RW) != 0) {
                            this._rwAccess = true;
                        }
                        if ((inflags & this._USB_META_WS_VALID_SHA1) != 0) {
                            let remote_sha1 = arr_bytes.subarray(9,29);
                            let sha1 = this.imm_computeAuth(this.urlInfo.user, this.urlInfo.pass, this._remoteSerial, this._nonce);
                            for(let i = 0; i < sha1.length; i++) {
                                if(sha1[i] != remote_sha1[i]) {
                                    // bad signature
                                    this._session_errno = 401;
                                    this._session_error = 'Authentication failed';
                                    this._connectionState = this._WS_DEAD;
                                    return;
                                }
                            }
                            // Password verified OK
                            this._connectionState = this._WS_CONNECTED;
                        } else {
                            if(this.urlInfo.pass == '') {
                                // No password required, connection OK
                                this._connectionState = this._WS_CONNECTED;
                            } else {
                                // Hub did not sign password, unauthorized
                                this._session_errno = 401;
                                if(this.urlInfo.user == 'admin' && !this._rwAccess) {
                                    this._session_error = 'Authentication as admin failed';
                                } else {
                                    this._session_error = 'Password not set on remote hub';
                                }
                                this._connectionState = this._WS_DEAD;
                                return;
                            }
                        }
                        break;
                    case this._USB_META_WS_ERROR:
                        this._session_errno = arr_bytes[3]+(arr_bytes[4]<<8);
                        if (this._session_errno == 401) {
                            this._session_error = 'Authentication failed';
                        } else {
                            this._session_error = 'Remote hub closed connection with error '+this._session_errno;
                        }
                        this._connectionState = this._WS_DEAD;
                        break;
                    case this._USB_META_ACK_UPLOAD:
                        tcpchan = arr_bytes[2];
                        if(this.tcpChan[tcpchan]) {
                            let yreq = this.tcpChan[tcpchan];
                            let ackBytes = arr_bytes[3]+(arr_bytes[4]<<8)+(arr_bytes[5]<<16)+(arr_bytes[6]<<24);
                            let ackTime = this._yapi.GetTickCount();
                            if(this._lastUploadAckTime[tcpchan] != 0 && ackBytes > this._lastUploadAckBytes[tcpchan]) {
                                this._lastUploadAckBytes[tcpchan] = ackBytes;
                                this._lastUploadAckTime[tcpchan] = ackTime;
                                let deltaBytes = ackBytes - this._lastUploadRateBytes[tcpchan];
                                let deltaTime = ackTime - this._lastUploadRateTime[tcpchan];
                                if(deltaTime < 500) break; // wait more
                                if(deltaTime < 1000 && deltaBytes < 65536) break; // wait more
                                this._lastUploadRateBytes[tcpchan] = ackBytes;
                                this._lastUploadRateTime[tcpchan] = ackTime;
                                if(yreq.progressCb && yreq.toBeSent) {
                                    yreq.progressCb(ackBytes, yreq.toBeSent.length);
                                }
                                let newRate = deltaBytes * 1000 / deltaTime;
                                this._uploadRate[tcpchan] = parseInt(0.8*this._uploadRate[tcpchan] + 0.3*newRate);// +10% intentionally
                                if(this._yapi._logLevel >= 5) {
                                    this._yapi.imm_log("New rate: "+(this._uploadRate[tcpchan]/1000)+" KB/s (last "+parseInt(deltaBytes/1000)+"KB sent at "+(parseInt(newRate)/1000)+" KB/s)");
                                }
                            } else {
                                //this._yapi.imm_log("First Ack received");
                                this._lastUploadAckBytes[tcpchan] = ackBytes;
                                this._lastUploadAckTime[tcpchan] = ackTime;
                                this._lastUploadRateBytes[tcpchan] = ackBytes;
                                this._lastUploadRateTime[tcpchan] = ackTime;
                                if(yreq.progressCb && yreq.toBeSent) {
                                    yreq.progressCb(ackBytes, yreq.toBeSent.length);
                                }
                                // Make sure upload resumes as soon as the first packet is confirmed
                                this.imm_sendPendingRequest(tcpchan);
                            }
                        }
                        break;
                }
                return;
            }
            this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Unsupported message: '+this._yapi.imm_bin2hexstr(arr_bytes));
        } catch(e) {
            this._yapi.imm_log('Unhandled exception in _webSocketMsg:', e);
        }
    }

    /** Send an outgoing packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    imm_webSocketSend(arr_bytes)
    {
        if(this.websocket) {
            this.websocket.send(arr_bytes);
        }
    }

    imm_hasRwAccess()
    {
        return this._rwAccess;
    }

    /** Perform an HTTP query on the hub
     *
     * @param method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(method, devUrl, obj_body, tcpchan)
    {
        if(this._yapi._logLevel >= 3) {
            this.imm_logrequest(method, devUrl, obj_body);
        }
        //noinspection UnnecessaryLocalVariableJS
        let httpPromise = new Promise(
            (resolve, reject) => {
                let subReq = method + ' ' + devUrl + ' \r\n\r\n';
                let ws = this.websocket;
                let isAsync = (this._remoteVersion > 0 && devUrl.slice(-2) == '&.');
                let yreq = new YHTTPRequest(new Uint8Array(0));

                if(this._yapi._logLevel >= 5) {
                    yreq._creat = (Date.now() % 600000).toString();
                    this._yapi.imm_log('request @' + yreq._creat + ': ' + method + ' ' + devUrl);
                }
                yreq.acceptor = resolve;
                yreq.devUrl = devUrl;
                yreq.sendPos = 0;
                if(obj_body) {
                    let boundary = this.imm_getBoundary();
                    let body = this.imm_formEncodeBody(obj_body, boundary);
                    subReq = subReq.slice(0,-2) +
                        'Content-Type: multipart/form-data, boundary=' + boundary + '\r\n\r\n';
                    yreq.toBeSent = new Uint8Array(subReq.length + body.length);
                    yreq.toBeSent.set(body, subReq.length);
                    yreq.progressCb = obj_body.progressCb;
                } else {
                    yreq.toBeSent = new Uint8Array(subReq.length);
                }
                for (let i = 0; i < subReq.length; i++) {
                    yreq.toBeSent[i] = subReq.charCodeAt(i);
                }
                if(tcpchan > 3) {
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = 'Unsupported tcpChan '+tcpchan;
                    try { yreq.acceptor(yreq); } catch(e) {}
                    return;
                }
                if(!ws || this.disconnecting || this._connectionState != this._WS_CONNECTED) {
                    if(this._yapi._logLevel >= 4) {
                        this._yapi.imm_log('request @' + yreq._creat + ' failed, websocket is down');
                    }
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = 'WebSocket not connected';
                    try { yreq.acceptor(yreq); } catch(e) {}
                    return;
                }

                if(isAsync) {
                    yreq.asyncId = this.nextAsyncId++;
                    if(this.nextAsyncId >= 127) {
                        this.nextAsyncId = 48;
                    }
                }

                // Queue all requests on tcpChan 0 for now, to preserve request order
                let queue = this.tcpChan[tcpchan];
                if(queue) {
                    while(queue.next) {
                        queue = queue.next;
                    }
                    queue.next = yreq;
                } else {
                    this.tcpChan[tcpchan] = yreq;
                }

                // Send request if possible
                this.imm_sendPendingRequest(tcpchan);
            }
        );
        //noinspection JSValidateTypes
        return httpPromise;
    }

    /** Send all possible pending requests on specified tcpchan
     *
     * @param tcpchan {number}
     */
    imm_sendPendingRequest(tcpchan)
    {
        let yreq = this.tcpChan[tcpchan];

        while(yreq) {
            if(!this.websocket || this.disconnecting || this._connectionState != this._WS_CONNECTED) {
                if(this._yapi._logLevel >= 4) {
                    this._yapi.imm_log('request @' + yreq._creat + ' failed, websocket is down');
                }
                yreq.errorType = YAPI_IO_ERROR;
                yreq.errorMsg = 'WebSocket not connected';
                try { yreq.acceptor(yreq); } catch(e) {}
                yreq = yreq.next;
                continue;
            }

            // synchronous request pending, cannot do more for now
            let pendingCount = 1;
            for (let yr = yreq; yr.next; yr = yr.next) pendingCount++;

            if(!yreq.toBeSent) {
                // request already sent
                if(yreq.asyncId == 0) {
                    if(this._yapi._logLevel >= 5) {
                        this._yapi.imm_log(pendingCount.toString() + ' req pending, @' + yreq._creat + ' not completed');
                    }
                    return;
                }
                yreq = yreq.next;
                continue;
            }

            // Send request
            let isAsync = (yreq.asyncId != 0);
            let asyncCloseSet = false;
            let pos = yreq.sendPos;
            let end = yreq.toBeSent.length;
            let i, frame;
            if(end > 2108 && this._remoteVersion >= 2 && tcpchan == 0) {
                // Perform throttling on large uploads
                if(pos == 0) {
                    // First chunk is always first multiple of full window (124 bytes) above 2KB
                    end = 2108;
                    // Prepare to compute effective transfer rate
                    this._lastUploadAckBytes[tcpchan] = 0;
                    this._lastUploadAckTime[tcpchan] = 0;
                    // Start with initial RTT based estimate
                    this._uploadRate[tcpchan] = parseInt(this._tcpMaxWindowSize * 1000 / this._tcpRoundTripTime);
                } else if(this._lastUploadAckTime[tcpchan] == 0) {
                    // first block not yet acked, wait more
                    if(yreq.sendTimeoutId) clearTimeout(yreq.sendTimeoutId);
                    yreq.sendTimeoutId = setTimeout(() => { this.imm_sendPendingRequest(tcpchan); }, this._tcpRoundTripTime);
                    return;
                } else {
                    // adapt window frame to available bandwidth
                    let bytesOnTheAir = pos - this._lastUploadAckBytes[tcpchan];
                    let uploadRate = this._uploadRate[tcpchan];
                    let timeOnTheAir = this._yapi.GetTickCount() - this._lastUploadAckTime[tcpchan];
                    let toBeSent = parseInt(2*uploadRate+1024 - bytesOnTheAir + (uploadRate * timeOnTheAir / 1000));
                    if(toBeSent + bytesOnTheAir > this._DEFAULT_TCP_MAX_WINDOW_SIZE) {
                        toBeSent = this._DEFAULT_TCP_MAX_WINDOW_SIZE - bytesOnTheAir;
                    }
                    if(toBeSent < 64) {
                        let waitTime = parseInt(1000 * (128 - toBeSent) / uploadRate);
                        if(waitTime < 2) waitTime = 2;
                        //this._yapi.imm_log(bytesOnTheAir + " sent " + timeOnTheAir + "ms ago, waiting " + waitTime + "ms...");
                        if(yreq.sendTimeoutId) clearTimeout(yreq.sendTimeoutId);
                        yreq.sendTimeoutId = setTimeout(() => { this.imm_sendPendingRequest(tcpchan); }, waitTime);
                        return;
                    }
                    if(end > pos + toBeSent) {
                        // when sending partial content, round up to full frames
                        if(toBeSent > 124) {
                            toBeSent = parseInt(toBeSent / 124) * 124;
                        }
                        end = pos + toBeSent;
                    }
                }
            }
            //this._yapi.imm_log("Upload data from "+pos+" to "+end);
            while (pos < end) {
                let framelen = 1 + end - pos;
                if (framelen > 125) framelen = 125;
                let datalen = framelen - 1;

                if(isAsync && pos + datalen == yreq.toBeSent.length && framelen < 125) {
                    frame = new Uint8Array(framelen + 1);
                    frame[0] = 8 * this._YSTREAM_TCP_ASYNCCLOSE + tcpchan;
                    frame[framelen] = yreq.asyncId;
                    asyncCloseSet = true;
                } else {
                    frame = new Uint8Array(framelen);
                    frame[0] = 8 * this._YSTREAM_TCP + tcpchan;
                }
                frame.set(yreq.toBeSent.subarray(pos, pos+datalen),1);
                pos += datalen;
                this.imm_webSocketSend(frame);
            }
            let sent = pos - yreq.sendPos;
            yreq.sendPos = pos;
            if(yreq.sendPos < yreq.toBeSent.length) {
                // not completely sent, cannot do more for now
                let waitTime =  parseInt(1000 * sent / this._uploadRate[tcpchan]);
                if(waitTime < 2) waitTime = 2;
                //this._yapi.imm_log("Sent " + sent + " bytes, waiting " + waitTime + "ms...");
                if(yreq.sendTimeoutId) clearTimeout(yreq.sendTimeoutId);
                yreq.sendTimeoutId = setTimeout(() => { this.imm_sendPendingRequest(tcpchan); }, waitTime);
                return;
            }

            if(isAsync && !asyncCloseSet) {
                frame = new Uint8Array(2);
                frame[0] = 8 * this._YSTREAM_TCP_ASYNCCLOSE + tcpchan;
                frame[1] = yreq.asyncId;
                this.imm_webSocketSend(frame);
            }

            // Mark request as sent
            yreq.toBeSent = false;

            if(isAsync) {
                // Accept asynchronous queries immediately
                try {
                    yreq.acceptor(yreq);
                } catch(e) {
                    // discard exception
                    this._yapi.imm_log('WS: async acceptor exception: ', e);
                }
            }

            // Setup timeout counter
            let mstimeout = this._YIO_DEFAULT_TCP_TIMEOUT;
            if (yreq.devUrl.indexOf('/testcb.txt') >= 0) {
                mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
            } else if (yreq.devUrl.indexOf('/rxmsg.json') >= 0) {
                mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
            } else if (yreq.devUrl.indexOf('/files.json') >= 0) {
                mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
            } else if (yreq.devUrl.indexOf('/upload.html') >= 0) {
                mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
            } else if (yreq.devUrl.indexOf('/flash.json') >= 0) {
                mstimeout = this._YIO_10_MINUTES_TCP_TIMEOUT;
            }
            yreq.timeoutId = setTimeout((chan,yr) => { this.imm_abortRequest(chan, yr); }, mstimeout, tcpchan, yreq);
            yreq._sent = (Date.now() % 600000).toString();

            // Wait for request completion in case this is a sync request
            if(this._yapi._logLevel >= 5) {
                this._yapi.imm_log('req @' + yreq._creat + ' sent (1/' + pendingCount.toString() + ')' +
                    (isAsync ? ' async-' + yreq.asyncId + ', continue' : ', waiting for reply'));
            }

            if(!isAsync) {
                return;
            }

            // Try to send next pending request, if possible
            yreq = yreq.next;
        }
    }

    // Abort a request and send close packet to peer
    //
    imm_abortRequest(tcpchan, yreq)
    {
        // make sure the request has not been completed in between
        if(!yreq.timeoutId) return;
        yreq.timeoutId = null;

        if(yreq.asyncId == 0) {
            // send a close to abort synchronous request
            let frame = new Uint8Array(1);
            frame[0] = 8 * this._YSTREAM_TCP_CLOSE + tcpchan;
            this.imm_webSocketSend(frame);

            if(this._yapi._logLevel >= 4) {
                let pendingCount = 1;
                for (let yr = yreq; yr.next; yr = yr.next) pendingCount++;
                this._yapi.imm_log(pendingCount.toString() + ' req pending, @' + yreq._creat + ' is in timeout');
            }
            
            // device is still expected to send a close to remove request from queue
            // but if that does not happen, remove the request from queue after 5 seconds
            setTimeout((chan,yr) => { this.imm_forgetRequest(chan, yr); }, 5000, tcpchan, yreq);
        }

        // log error
        this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Timeout on '+yreq.devUrl+' (tcpchan '+tcpchan+')');
    }

    // Drop a request from queue in case of timeout after abort
    //
    imm_forgetRequest(tcpchan, yreq)
    {
        let queue = this.tcpChan[tcpchan];
        if(queue == yreq) {
            // pop blocking request and resume processing
            this.tcpChan[tcpchan] = yreq.next;

            // mark request as failed
            if(yreq.asyncId == 0) {
                yreq.errorType = YAPI_IO_ERROR;
                yreq.errorMsg = 'Timeout on '+yreq.devUrl+' (tcpchan '+tcpchan+')';
                try { yreq.acceptor(yreq); } catch(e) {}
            }

            this.imm_sendPendingRequest(tcpchan);
        }
    }

    // Drop all pending requests from queues, as well as forwarded connection, when a hub connection is dropped
    //
    imm_dropAllPendingConnection()
    {
        if (this.fwd_connectionState != this._WS_DISCONNECTED && this.fwd_websocket) {
            this.fwd_connectionState = this._WS_DISCONNECTED;
            this.fwd_websocket.close();
            this.fwd_websocket = null;
        }
        for(let tcpchan = 0; tcpchan < this.tcpChan.length; tcpchan++) {
            for(let yreq = this.tcpChan[tcpchan]; yreq; yreq = yreq.next) {
                // Remove request from queue
                this.tcpChan[tcpchan] = yreq.next;

                // Clear timeout for this request
                if(yreq.timeoutId) {
                    clearTimeout(yreq.timeoutId);
                    yreq.timeoutId = 0;
                }

                // mark request as failed
                if(yreq.asyncId == 0) {
                    if(this._yapi._logLevel >= 4) {
                        this._yapi.imm_log('drop @' + yreq._creat + ' (websocket down)');
                    }
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = 'Request '+yreq.devUrl+' dropped (websocket down)';
                    try { yreq.acceptor(yreq); } catch(e) {}
                }
            }
        }
    }

    async websocketJoin(ws, arr_credentials, close_callback)
    {
        if(this._connectionState != this._WS_CONNECTED) {
            this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Hub is disconnected, cannot join');
            return false;
        }

        // Store websocket interface
        this.fwd_websocket = ws;
        this.fwd_credentials = arr_credentials;
        this.fwd_closeCallback = close_callback;
        this.fwd_connectionState = this._WS_CONNECTING;

        ws.on('message', msg => {
            if(this.fwd_connectionState == this._WS_CONNECTED) {
                // forward to remote hub
                if (this._connectionState == this._WS_CONNECTED) {
                    this.imm_webSocketSend(msg);
                } else {
                    // drop unexpected frame in disconnected state
                    this._yapi.imm_log('WS: drop packet from fwd API (state='+this._connectionState+')');
                }
            } else if(this.fwd_connectionState == this._WS_AUTHENTICATING) {
                // handle authentication packet
                this.imm_handleAPIAuthPkt(msg);
            } else {
                // drop unexpected frame in disconnected state
                this._yapi.imm_log('WS: drop packet from fwd API (fwd_state='+this.fwd_connectionState+')');
            }
        });

        ws.on('close', () => {
            this.fwd_connectionState = this._WS_DISCONNECTED;
            this.fwd_websocket = null;
            if(this.fwd_closeCallback) {
                this.fwd_closeCallback();
            }
        });

        return this.imm_sendAPIAnnouncePkt();
    }

    imm_sendAPIAnnouncePkt()
    {
        let frame = new Uint8Array(1+this._USB_META_WS_ANNOUNCE_SIZE);
        let nonce = new Uint8Array(4);
        this._yapi._getRandomValues(nonce);
        frame[0] = (this._YSTREAM_META << 3);
        frame[1] = this._USB_META_WS_ANNOUNCE;
        frame[2] = 2;       // protocol version
        frame[3] = (this._tcpMaxWindowSize >> 4) & 0xff;  // TCP window size, in para
        frame[4] = (this._tcpMaxWindowSize >> 12) & 0xff;
        for(let i = 0; i < 4; i++) {
            frame[5+i] = nonce[i];
        }
        for(let i = 0; i < this._remoteSerial.length && i < 20; i++) {
            frame[9+i] = this._remoteSerial.charCodeAt(i);
        }
        this.fwd_nonce = frame[5]+(frame[6]<<8)+(frame[7]<<16)+(frame[8]<<24);
        this.fwd_connectionState = this._WS_AUTHENTICATING;
        this.fwd_websocket.send(frame);

        return true;
    }

    imm_handleAPIAuthPkt(msg)
    {
        if(msg.length < 1+this._USB_META_WS_AUTHENTICATION_SIZE || msg[0] != (this._YSTREAM_META << 3)) {
            this._yapi.imm_log("bad-apiauth1\n");
            this.fwd_connectionState = this._WS_DEAD;
            return;
        }
        if (msg[1] != this._USB_META_WS_AUTHENTICATION || msg[2] > 2) {
            this._yapi.imm_log("bad-apiauth2\n");
            this.fwd_connectionState = this._WS_DEAD;
            return;
        }
        this._remoteVersion = msg[2];

        // Only accepts authenticated requests
        let flags = msg[3] + (msg[4] << 8);
        if((flags & this._USB_META_WS_VALID_SHA1) == 0) {
            this._yapi.imm_log("bad-apiauth3\n");
            this.fwd_connectionState = this._WS_DEAD;
            return;
        }

        let credIdx, remote_sha1 = msg.subarray(9,29);
        for(credIdx = 0; credIdx < this.fwd_credentials.length; credIdx++) {
            let j, sha1 = this.imm_computeAuth(this.fwd_credentials[credIdx].user, this.fwd_credentials[credIdx].pass, this._remoteSerial, this.fwd_nonce);
            for(j = 0; j < sha1.length; j++) {
                if (sha1[j] != remote_sha1[j]) break;
            }
            if(j >= sha1.length) break;
        }
        if(credIdx >= this.fwd_credentials.length) {
            // bad signature, return unsigned frame to signal invalid password
            this._yapi.imm_log("bad-apiauth4\n");
            msg.fill(0, 3);
            this.fwd_websocket.send(msg);
            this.fwd_connectionState = this._WS_DEAD;
            return;
        }

        // Return auth packet with new nonce and new signature to confirm connection
        msg[3] |= this._USB_META_WS_RW;
        this.fwd_nonce = msg[5]+(msg[6]<<8)+(msg[7]<<16)+(msg[8]<<24);
        let sha1 = this.imm_computeAuth(this.fwd_credentials[credIdx].user, this.fwd_credentials[credIdx].pass, this._remoteSerial, this.fwd_nonce);
        for(let i = 0; i < sha1.length; i++) {
            msg[9+i] = sha1[i];
        }
        this.fwd_websocket.send(msg);
        this.fwd_connectionState = this._WS_CONNECTED;
    }

    async disconnect()
    {
        let tcpchan_busy;
        let timeout = this._yapi.GetTickCount() + 3000;
        do {
            tcpchan_busy = false;
            for (let tcpchan = 0; tcpchan < 4; tcpchan++) {
                if (this.tcpChan[tcpchan] != null) {
                    tcpchan_busy = true;
                    break;
                }
            }
            if (tcpchan_busy) {
                await this._yapi._microSleep_internal();
            }
        } while (tcpchan_busy && timeout > this._yapi.GetTickCount());

        this.imm_commonDisconnect();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if(this.websocket) {
            this.websocket.close();
        }
        this.websocket = null;
        this.imm_dropAllPendingConnection();
    }

    // abort communication to trigget an automatic reconnection
    async reconnect()
    {
        if(this.websocket) {
            this._connectionState = this._WS_DISCONNECTED;
            try {
                if (this.websocket.terminate) {
                    this.websocket.terminate();
                } else {
                    this.websocket.close();
                }
            } catch(e) {}
            this.websocket = null;
            this.imm_dropAllPendingConnection();
        }
    }

    imm_isOnline()
    {
        if(this._connectionState != this._WS_CONNECTED) {
            return false;
        }
        return super.imm_isOnline();
    }
}

class YWebSocketNodeHub extends YWebSocketHub
{
    constructor(obj_yapi, var_urlInfo)
    {
        super(obj_yapi, var_urlInfo);
        this.wsWebSocket = this._yapi._nodeRequire('ws');
    }

    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url)
    {
        this.websocket = new this.wsWebSocket(this.urlInfo.url + 'not.byn');
    }

    /** Send an outgoing packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    imm_webSocketSend(arr_bytes)
    {
        if(this.websocket) {
            this.websocket.send(arr_bytes, { binary: true, mask: false });
        }
    }
}

class YWebSocketCallbackHub extends YWebSocketNodeHub
{
    constructor(obj_yapi, var_urlInfo, ws)
    {
        super(obj_yapi, var_urlInfo);

        // websocket channel already open
        this.websocket = ws;

        // no retry from our side
        this.retryDelay = -1;
    }

    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url)
    {
        // nothing to do, the ws is already open !
    }
}

/*
 * SSDP-based hub discovery, available on Node.JS only (requires UDP sockets)
 */
class YSSDPManager
{
    constructor(obj_yapi)
    {
        /** @member {YAPIContext} **/
        this._yapi = obj_yapi;
        this._os = this._yapi._nodeRequire('os');
        this._dgram = this._yapi._nodeRequire('dgram');
        this._started = false;
        this._callback = null;
        this._request_sock = {};
        this._notify_sock = {};
        this._SSDPCache = {};
        this._thread = null;

        this.YSSDP_PORT = 1900;
        this.YSSDP_MCAST_ADDR_STR = '239.255.255.250';
        this.YSSDP_URN_YOCTOPUCE = "urn:yoctopuce-com:device:hub:1";
        this.YSSDP_DISCOVERY_MSG = "M-SEARCH * HTTP/1.1\r\n"+
            "HOST:"+this.YSSDP_MCAST_ADDR_STR+":"+this.YSSDP_PORT+"\r\n"+
            "MAN:\"ssdp:discover\"\r\n"+
            "MX:5\r\n"+
            "ST:"+this.YSSDP_URN_YOCTOPUCE+"\r\n"+
            "\r\n";
    }

    async _invokeCallback(str_serial, str_addUrl, str_removeUrl)
    {
        if(this._callback) {
            try {
                await this._callback(str_serial, str_addUrl, str_removeUrl);
            } catch (e) {
                this._yapi.imm_log('Exception in hub discovery callback:', e);
            }
        }
    }

    imm_uuidToSerial(str_uuid)
    {
        let s = '', pad = '';
        let i = 0, u = 0;

        for(; i < 4; i++, u += 2) {
            s += String.fromCharCode(parseInt(str_uuid.substr(u,2), 16));
        }
        u++;
        for (; i < 6; i++, u += 2) {
            s += String.fromCharCode(parseInt(str_uuid.substr(u,2), 16));
        }
        u++;
        for (; i < 8; i++, u += 2) {
            s += String.fromCharCode(parseInt(str_uuid.substr(u,2), 16));
        }
        s += '-';
        u = str_uuid.indexOf("-COFF-EE");
        if (u < 0) {
            return null;
        }
        u += 8;
        while (str_uuid.charAt(u) === '0') u++;
        if (s.substr(0,8) === "VIRTHUB0") {
            pad = '0000000000';
        } else {
            pad = '00000';
        }
        s += pad.substr(str_uuid.length - u);
        s += str_uuid.substr(u);
        return s;
    }

    async ySSDPUpdateCache(str_uuid, str_url, int_cacheValidity)
    {
        if (int_cacheValidity <= 0) {
            int_cacheValidity = 1800;
        }
        int_cacheValidity *= 1000;

        let now = this._yapi.GetTickCount();
        let p = this._SSDPCache[str_uuid];
        if(p) {
            p.detectedTime = now;
            p.maxAge = int_cacheValidity;
            if (str_url !== p.url) {
                await this._invokeCallback(p.serial, str_url, p.url);
                p.url = str_url;
            } else {
                await this._invokeCallback(p.serial, str_url, null);
            }
        } else {
            let serial = this.imm_uuidToSerial(str_uuid);
            if(serial) {
                this._SSDPCache[str_uuid] = {
                    "serial": serial,
                    "url": str_url,
                    "detectedTime": now,
                    "maxAge": int_cacheValidity
                };
                await this._invokeCallback(serial, str_url, null);
            }
        }
    }

    async ySSDPParseMessage(str_msg)
    {
        let SSDP_HTTP = "HTTP/1.1 200 OK";
        let SSDP_NOTIFY = "NOTIFY * HTTP/1.1";
        let lines = str_msg.split('\r\n');
        let values = {};
        if(lines[0] === SSDP_HTTP || lines[0] === SSDP_NOTIFY) {
            for(let i = 1; i < lines.length; i++) {
                let parts = lines[i].split(': ');
                if(parts.length === 2) {
                    values[parts[0].trim()] = parts[1].trim();
                }
            }
            if(values['LOCATION'] && values['USN'] && values['CACHE-CONTROL'] &&
               values['USN'].indexOf(this.YSSDP_URN_YOCTOPUCE) > 0) {
                let uuid = values['USN'].split(':')[1];
                let location = values['LOCATION'].split('/')[2];
                let cacheVal = parseInt(values['CACHE-CONTROL']);
                await this.ySSDPUpdateCache(uuid, location, cacheVal);
            }
        }
    }

    async ySSDPCheckExpiration()
    {
        let now = this._yapi.GetTickCount();
        if(this._thread) {
            clearTimeout(this._thread);
            this._thread = null;
        }
        for(let uuid in this._SSDPCache) {
            let p = this._SSDPCache[uuid];
            if (!p) continue;
            if(now - p.detectedTime > p.maxAge) {
                p.maxAge = 0;
                await this._invokeCallback(p.serial, null, p.url);
            }
        }
        this._thread = setTimeout(() => { this.ySSDPCheckExpiration(); }, 3000);
    }

    async ySSDPStart(func_callback)
    {
        if(this._started) {
            return YAPI_SUCCESS;
        }
        this._callback = func_callback;
        let networkInterfaces = this._os.networkInterfaces();
        for(let key in networkInterfaces) {
            let iface = networkInterfaces[key];
            for(let idx = 0; idx < iface.length; idx++) {
                let inaddr = iface[idx];
                if(inaddr.family !== 'IPv4') continue;
                let ipaddr = inaddr.address;
                if(ipaddr === '127.0.0.1') continue;
                if(this._request_sock[ipaddr]) continue;
                let request_sock = this._dgram.createSocket({ type: 'udp4' });
                request_sock.on('message', (msg, info) => {
                    this.ySSDPParseMessage(msg.toString());
                });
                await new Promise((resolve, reject) => {
                    request_sock.bind(0, ipaddr, () => { resolve(); });
                });
                let notify_sock = this._dgram.createSocket({ type: 'udp4', reuseAddr: true });
                notify_sock.on('message', (msg, info) => {
                    this.ySSDPParseMessage(msg.toString());
                });
                await new Promise((resolve, reject) => {
                    notify_sock.bind(this.YSSDP_PORT, () => {
                        notify_sock.addMembership(this.YSSDP_MCAST_ADDR_STR, ipaddr);
                        resolve();
                    });
                });
                this._request_sock[ipaddr] = request_sock;
                this._notify_sock[ipaddr] = notify_sock;
            }
        }
        // send initial discovery pakets when interface is bound
        this.ySSDPDiscover();

        this._started = true;
        await this.ySSDPCheckExpiration();
    }

    async ySSDPStop()
    {
        if(this._thread) {
            clearTimeout(this._thread);
            this._thread = null;
        }
        for(let iface in this._request_sock) {
            this._request_sock[iface].close();
            this._notify_sock[iface].close();
        }
        for(let uuid in this._SSDPCache) {
            let p = this._SSDPCache[uuid];
            if(!p) continue;
            if(p.maxAge) {
                await this._yapi.UnregisterHub(p.url);
                p.maxAge = 0;
                await this._invokeCallback(p.serial, null, p.url);
            }
        }
        this._request_sock = {};
        this._notify_sock = {};
        this._SSDPCache = {};
        this._started = false;
    }

    async ySSDPDiscover()
    {
        for(let rep = 0; rep < 3; rep++) {
            await YAPI.Sleep(10 << rep);
            for(let iface in this._request_sock) {
                this._request_sock[iface].send(this.YSSDP_DISCOVERY_MSG, this.YSSDP_PORT, this.YSSDP_MCAST_ADDR_STR);
            }
        }
    }
}

//--- (generated code: YAPIContext yapiwrapper)
//--- (end of generated code: YAPIContext yapiwrapper)
//--- (generated code: YAPIContext definitions)
//--- (end of generated code: YAPIContext definitions)


//--- (generated code: YAPIContext class start)
/**
 * YAPIContext Class: Control interface for the firmware update process
 *
 *
 */
//--- (end of generated code: YAPIContext class start)

class YAPIContext
{
    constructor()
    {
//--- (generated code: YFunction return codes)
        this.SUCCESS               = 0;       // everything worked all right
        this.NOT_INITIALIZED       = -1;      // call yInitAPI() first !
        this.INVALID_ARGUMENT      = -2;      // one of the arguments passed to the function is invalid
        this.NOT_SUPPORTED         = -3;      // the operation attempted is (currently) not supported
        this.DEVICE_NOT_FOUND      = -4;      // the requested device is not reachable
        this.VERSION_MISMATCH      = -5;      // the device firmware is incompatible with this API version
        this.DEVICE_BUSY           = -6;      // the device is busy with another task and cannot answer
        this.TIMEOUT               = -7;      // the device took too long to provide an answer
        this.IO_ERROR              = -8;      // there was an I/O problem while talking to the device
        this.NO_MORE_DATA          = -9;      // there is no more data to read from
        this.EXHAUSTED             = -10;     // you have run out of a limited resource, check the documentation
        this.DOUBLE_ACCES          = -11;     // you have two process that try to access to the same device
        this.UNAUTHORIZED          = -12;     // unauthorized access to password-protected device
        this.RTC_NOT_READY         = -13;     // real-time clock has not been initialized (or time was lost)
        this.FILE_NOT_FOUND        = -14;     // the file is not found
//--- (end of generated code: YFunction return codes)
        this._deviceListValidityMs = 10000;
//--- (generated code: YAPIContext constructor)
        /** @member {number} **/
        this.defaultCacheValidity        = 5;
        //--- (end of generated code: YAPIContext constructor)
        this.INVALID_INT           = YAPI_INVALID_INT;
        this.INVALID_UINT          = YAPI_INVALID_UINT;
        this.INVALID_LONG          = YAPI_INVALID_LONG;
        this.INVALID_DOUBLE        = YAPI_INVALID_DOUBLE;
        this.MIN_DOUBLE            = YAPI_MIN_DOUBLE;
        this.MAX_DOUBLE            = YAPI_MAX_DOUBLE;
        this.INVALID_STRING        = YAPI_INVALID_STRING;
        this.HASH_BUF_SIZE         = YOCTO_HASH_BUF_SIZE;
        // yInitAPI constants
        this.DETECT_NONE           = 0;
        this.DETECT_USB            = 1;
        this.DETECT_NET            = 2;
        this.DETECT_ALL            = (this.DETECT_USB | this.DETECT_NET);

        // Default string encoding used in the library
        this.defaultEncoding       = 'binary';

        // Switch to turn off exceptions and use return codes instead, for source-code compatibility
        // with languages without exception support like C
        /** @member {boolean} **/
        this.exceptionsDisabled    = false;

        this._uniqueID             = String.fromCharCode(Math.random()*79+48,Math.random()*79+48,Math.random()*79+48);
        this.imm_init();

        for(let i = 1; i <= 20; i++) {
            this.RegisterCalibrationHandler(i,this.LinearCalibrationHandler);
        }
        this.RegisterCalibrationHandler(YOCTO_CALIB_TYPE_OFS,this.LinearCalibrationHandler);
    }

    imm_init()
    {
        /** @member {number} **/
        this._detectType                = this.DETECT_NONE;
        /** @member {YGenericHub[]} **/
        this._hubs                      = []; // array of root urls
        /** @member {Object} **/
        this._pendingHubs               = {}; // hash table by preregistered URL
        /** @member {Object} **/
        this._devs                      = {}; // hash table of known devices, by serial number
        /** @member {Object} **/
        this._snByUrl                   = {}; // serial number for each known device, by URL
        /** @member {Object} **/
        this._snByName                  = {}; // serial number for each known device, by name
        /** @member {Object} **/
        this._fnByType                  = {}; // functions by type
        this._fnByType.Module           = new YFunctionType(this, 'Module');
        /** @member {number} **/
        this._lastErrorType             = YAPI_SUCCESS;
        /** @member {string} **/
        this._lastErrorMsg              = 'no error';
        /** @member {boolean} **/
        this._firstArrival              = true;
        /** @member {boolean} **/
        this._updateDevListStarted      = false;
        /** @member {Object[]} **/
        this._pendingCallbacks          = [];
        /** @member {number} **/
        this._logLevel                  = 2;   // default to logging warnings and errors only
        /** @member {Function} **/
        this._logCallback               = null;
        /** @member {Function} **/
        this._arrivalCallback           = null;
        /** @member {Function} **/
        this._namechgCallback           = null;
        /** @member {Function} **/
        this._removalCallback           = null;
        /** @member {Function} **/
        this._hubDiscoveryCallback      = null;
        /** @member {number} **/
        this._forwardValues             = 0;
        /** @member {Object} **/
        this._calibHandlers             = {};
        /** @member {Object[]} **/
        this._ValueCallbackList         = [];
        /** @member {Object[]} **/
        this._TimedReportCallbackList   = [];
        /** @member {Object} **/
        this._beacons = {};
        /** @member {boolean} **/
        this._isNodeJS                  = false;
        /** @member {Object} **/
        this._SystemJS                  = null;
        /** @member {function} **/
        this._getRandomValues           = null;
        /** @member {function} **/
        this._nodeRequire               = null;
        /** @member {YSSDPManager} **/
        this._ssdpManager               = null;
        // Detect Node.js
        if(typeof require != 'undefined') {
            this._isNodeJS = true;
            this._nodeRequire = require;
            this._getRandomValues = require("crypto").randomFillSync;
        } else {
            this._getRandomValues = (arr) => {
                let crypto = window.crypto || window.msCrypto;
                return crypto.getRandomValues(arr);
            }
        }
    }

    _throw(int_errType, str_errMsg, obj_retVal)
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;

        if(!this.exceptionsDisabled) {
            let exc = new Error(str_errMsg);
            exc['name'] = 'YoctoError';
            exc['number'] = int_errType;
            exc['errorType'] = int_errType;
            throw exc;
        }
        return obj_retVal;
    }

    // Log a message, either to the user defined function or to the console if none is defined
    imm_log(msg, ...moreArgs)
    {
        let now = new Date();
        let day = now.getFullYear().toString() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
        let time = now.getHours().toString() + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
        let prefix = day + ' ' + time + ' ['+this._uniqueID+'] ';
        if(this._logCallback) {
            try {
                if(moreArgs.length > 0) {
                    msg += moreArgs[0].toString;
                }
                this._logCallback(prefix+msg)
            } catch(e) {
                console.error(prefix+'Exception in custom log callback: ', e);
                console.log('... while trying to log:');
                if(moreArgs.length > 0 && moreArgs[0] instanceof Error) {
                    console.error(prefix+msg, ...moreArgs);
                } else {
                    console.log(prefix+msg, ...moreArgs);                
                }
            }
        } else {
            if(moreArgs.length > 0 && moreArgs[0] instanceof Error) {
                console.error(prefix+msg, ...moreArgs);
            } else {
                console.log(prefix+msg, ...moreArgs);                
            }
        }
    }

    /**
     * Registers a log callback function. This callback will be called each time
     * the API have something to say. Quite useful to debug the API.
     *
     * @param logfun {function} : a procedure taking a string parameter, or null
     *         to unregister a previously registered  callback.
     */
    async RegisterLogFunction(logfun)
    {
        this._logCallback = logfun;
        return YAPI_SUCCESS;
    }

    // Add a hub object to the list of known hub
    async _addHub(newhub)
    {
        // Add hub to known list
        this._hubs.push(newhub);

        // If hub is not yet known, create a device object (synchronous call)
        let serial = this._snByUrl[newhub.urlInfo.url];
        if(!serial) {
            let dev = new YDevice(this, newhub.urlInfo.url, null, null);
            await dev.refresh();
        }
    }

    // Search for an existing a hub object for a given URL
    imm_getHub(obj_urlInfo)
    {
        let i, hubUrl;
        for(i = 0; i < this._hubs.length; i++) {
            let info = this._hubs[i].urlInfo;
            if(info.host == obj_urlInfo.host && info.port == obj_urlInfo.port && info.domain == obj_urlInfo.domain) {
                return this._hubs[i];
            }
        }
        return null;
    }

    // Trigger an update of connected devices by querying all hubs
    async _updateDeviceList_internal(bool_forceupdate, bool_invokecallbacks)
    {
        if(this._firstArrival && bool_invokecallbacks && this._arrivalCallback) {
            bool_forceupdate = true;
        }
        if(bool_forceupdate) {
            for(let i = 0; i < this._hubs.length; i++) {
                this._hubs[i].imm_forceUpdate();
            }
        }
        if(this._updateDevListStarted && this.GetTickCount() - this._updateDevListStarted < 30*1000) {
            return {
                errorType:YAPI_SUCCESS,
                errorMsg:'no error',
                result:YAPI_SUCCESS
            };
        }

        try {
            // mark updateDeviceList in progress to avoid concurrent asynchronous runs
            this._updateDevListStarted = this.GetTickCount();

            // collect list of hubs which should be checked
            let hubs = [];
            for (let i = 0; i < this._hubs.length; i++) {
                let hub = this._hubs[i];
                let rootUrl = hub.urlInfo.url;
                let hubDev = this.imm_getDevice(rootUrl);
                if (!hubDev) continue;
                if (hub.devListExpires <= this.GetTickCount()) {
                    hub.missing = [];
                    hubs.push(hub);
                }
            }

            // assume all device are unplugged, unless proved wrong
            for (let serial in this._devs) {
                let rooturl = this._devs[serial].imm_getRootUrl();
                for (let i = 0; i < hubs.length; i++) {
                    let huburl = hubs[i].urlInfo.url;
                    if (rooturl.substr(0, huburl.length) == huburl) {
                        hubs[i].missing[serial] = true;
                    }
                }
            }

            // Rescan all hubs and update list of online devices
            let  update_promises =[];
            for (let i = 0; i < hubs.length; i++) {
                let prom = hubs[i].hubUpdateDeviceList();
                update_promises.push(prom);
            }
            await Promise.all(update_promises);

            // after processing all hubs, invoke pending callbacks if required
            if (bool_invokecallbacks) {
                let nbEvents = this._pendingCallbacks.length;
                for (let i = 0; i < nbEvents; i++) {
                    let evt = this._pendingCallbacks[i];
                    let serial = evt.slice(1);
                        switch (evt.charAt(0)) {
                            case '+':
                                if(this._logLevel >= 3) {
                                    this.imm_log('Device '+serial+' plugged');
                                }
                                if (this._arrivalCallback != undefined) {
                                    try {
                                        await this._arrivalCallback(YModule.FindModuleInContext(this, serial + '.module'));
                                    } catch(e) {
                                        this.imm_log('Exception in device arrival callback:',e);
                                    }
                                }
                                break;
                            case '/':
                                if (this._namechgCallback != undefined) {
                                    try {
                                        await this._namechgCallback(YModule.FindModuleInContext(this, serial + '.module'));
                                    } catch(e) {
                                        this.imm_log('Exception in device change callback:',e);
                                    }
                                }
                                break;
                            case '-':
                                if(this._logLevel >= 3) {
                                    this.imm_log('Device '+serial+' unplugged');
                                }
                                if (this._removalCallback != undefined) {
                                    try {
                                        await this._removalCallback(YModule.FindModuleInContext(this, serial + '.module'));
                                    } catch(e) {
                                        this.imm_log('Exception in device removal callback:',e);
                                    }
                                }
                                this.imm_forgetDevice(this._devs[serial]);
                                break;
                        }
                }
                this._pendingCallbacks = this._pendingCallbacks.slice(nbEvents);
                if (this._arrivalCallback != undefined && this._firstArrival) {
                    this._firstArrival = false;
                }
            }
        } finally {
            this._updateDevListStarted = false;
        }

        return {
            errorType:YAPI_SUCCESS,
            errorMsg:'no error',
            result:YAPI_SUCCESS
        };
    }

    // process a hub white-pages/yellow-pages records to update the device data
    async updateDeviceList_process(hub, hubDev, whitePages, yellowPages)
    {
        // Reindex all functions from yellow pages
        let refresh = {};
        let serial = null;
        for(let classname in yellowPages) {
            let obj_yprecs = yellowPages[classname];
            let ftype = this._fnByType[classname];
            if(ftype == undefined) {
                ftype = new YFunctionType(this, classname);
                this._fnByType[classname] = ftype;
            }
            for(let key in obj_yprecs) {
                let yprec = obj_yprecs[key];
                let hwid = yprec['hardwareId'];
                let basetype = yprec['baseType'];
                if(ftype.imm_reindexFunction(hwid, yprec['logicalName'], yprec['advertisedValue'], basetype)) {
                    // logical name discrepency detected, force a refresh from device
                    serial = hwid.substr(0,hwid.indexOf('.'));
                    refresh[serial] = true;
                }
            }
        }
        // Reindex all devices from white pages
        for(let devkey in whitePages) {
            let devinfo = whitePages[devkey];
            serial  = devinfo['serialNumber'];
            let devydx  = devinfo['index'];
            let rooturl = devinfo.networkUrl.slice(0,-3);
            if(rooturl.charAt(0) == '/') rooturl = hubDev.imm_getRootUrl()+rooturl.substr(1);
            let currdev = this._devs[serial];
            if(currdev && this._arrivalCallback != undefined && this._firstArrival) {
                this._pendingCallbacks.push('+'+serial);
            }
            hub.serialByYdx[devydx] = serial;
            if(!currdev) {
                // Add new device
                //noinspection ObjectAllocationIgnored
                new YDevice(this, rooturl, devinfo, yellowPages);
                if(this._arrivalCallback != undefined) {
                    this._pendingCallbacks.push('+'+serial);
                }
            } else if(currdev.imm_getLogicalName() != devinfo['logicalName']) {
                // Reindex device from its own data
                await currdev.refresh();
                if(this._namechgCallback != undefined) {
                    this._pendingCallbacks.push('/'+serial);
                }
            } else if(refresh[serial] || currdev.imm_getRootUrl() != rooturl ||
                      currdev.imm_getBeacon() != devinfo['beacon']) {
                // Reindex device from its own data in case of discrepency
                await currdev.refresh();
            }
            hub.missing[serial] = false;
        }

        // Keep track of all unplugged devices on this hub
        for(serial in hub.missing) {
            if(hub.missing[serial]) {
                if(this._removalCallback != undefined) {
                    this._pendingCallbacks.push('-'+serial);
                } else {
                    this.imm_forgetDevice(this._devs[serial]);
                }
            }
        }

        return YAPI_SUCCESS;
    }

    /** process event data produced by a hub
     *
     * @param hub {Object}
     * @param str_lines {string}
     */
    async parseEvents(hub, str_lines)
    {
        // Use events to detect stalled connections
        hub.isNotifWorking = true;
        hub.lastPingStamp = Date.now();
        if (hub.timeoutId) {
            clearTimeout(hub.timeoutId);
        }
        hub.timeoutId = setTimeout(() => {
            if (!hub.imm_isForwarded()) {
                this.imm_log('WS: closing stalled connection');
                hub.reconnect();
            }
        }, 60000);  // 60s timeout before closing a stalled connection

        var rows = (hub.notifCarryOver + str_lines).split('\n');
        var nrows = rows.length;
        var value;
        if(str_lines.substr(-1) != '\n') {
            hub.notifCarryOver = rows[--nrows];
        } else {
            hub.notifCarryOver = '';
        }
        // in continuous mode, last line is either empty or a partial event
        nrows--;
        for (var idx = 0; idx < nrows; idx++) {
            var ev = rows[idx];
            if (ev.length == 0) continue;
            var firstCode = ev.charAt(0);
            if (ev.length >= 3 && firstCode >= NOTIFY_NETPKT_CONFCHGYDX && firstCode <= NOTIFY_NETPKT_TIMEAVGYDX) {
                hub.retryDelay = 15;
                if (hub.notifPos >= 0) hub.notifPos += ev.length + 1;
                var devydx = ev.charCodeAt(1) - 65; // from 'A'
                var funydx = ev.charCodeAt(2) - 48; // from '0'
                if (funydx >= 64) { // high bit of devydx is on second character
                    funydx -= 64;
                    devydx += 128;
                }
                var serial = hub.serialByYdx[devydx];
                if (serial && this._devs[serial]) {
                    var funcid = (funydx == 0xf ? 'time' : this._devs[serial].imm_functionId(funydx));
                    if (funcid != '') {
                        let dev;
                        value = ev.slice(3);
                        switch (firstCode) {
                            case NOTIFY_NETPKT_FUNCVALYDX:
                                if (value != '') value = value.split('\0')[0];
                                // function value ydx (tiny notification)
                                await this.setFunctionValue(serial + '.' + funcid, value);
                                break;
                            case NOTIFY_NETPKT_DEVLOGYDX:
                                // log notification
                                dev = this._devs[serial];
                                if (dev!=null){
                                    dev.imm_triggerLogPull();
                                }
                                break;
                            case NOTIFY_NETPKT_CONFCHGYDX:
                                // configuration change notification
                                await this.setConfChange(serial);
                                break;
                            case NOTIFY_NETPKT_TIMEVALYDX:
                            case NOTIFY_NETPKT_TIMEAVGYDX:
                            case NOTIFY_NETPKT_TIMEV2YDX:
                                // timed value report
                                var pos, arr = [(firstCode == 'x' ? 0 : (firstCode == 'z' ? 1 : 2))];
                                for (pos = 0; pos < value.length; pos += 2) {
                                    arr.push(parseInt(value.substr(pos, 2), 16));
                                }
                                dev = this._devs[serial];
                                if (funcid == 'time') {
                                    let time = arr[1] + 0x100 * arr[2] + 0x10000 * arr[3] + 0x1000000 * arr[4];
                                    let ms  = arr[5] * 4;
                                    let duration;
                                    if (arr.length >= 7) {
                                        ms += arr[6] >> 6;
                                        let duration_ms = arr[7];
                                        duration_ms += (arr[6] & 0xf) * 0x100;
                                        if (arr[6] & 0x10) {
                                            duration= duration_ms;
                                        } else {
                                            duration = duration_ms / 1000.0;
                                        }
                                    } else {
                                        duration = 0.0;
                                    }
                                    dev.imm_setTimeRef(time + ms / 1000.0, duration);
                                } else {
                                    await this.setTimedReport(serial + '.' + funcid, dev.imm_getLastTimeRef(),dev.imm_getLastDuration(),  arr);
                                }
                                break;
                            case NOTIFY_NETPKT_FUNCV2YDX:
                                var rawval = this.imm_decodeNetFuncValV2(value);
                                if (rawval != null) {
                                    var decodedval = this.imm_decodePubVal(rawval[0], rawval, 1, 6);
                                    await this.setFunctionValue(serial + '.' + funcid, decodedval);
                                }
                                break;
                            case NOTIFY_NETPKT_FLUSHV2YDX:
                            // To be implemented later
                            default:
                                break;
                        }
                    }
                }
            } else if (ev.length > 5 && ev.substr(0, 4) == 'YN01') {
                hub.retryDelay = 15;
                if (hub.notifPos >= 0) hub.notifPos += ev.length + 1;
                var notype = ev.substr(4, 1);
                let parts;
                if (notype == '@') {
                    hub.notifPos = parseInt(ev.slice(5));
                } else{
                    // noinspection FallThroughInSwitchStatementJS
                    switch (parseInt(notype)) {
                        case 0: // device name change, or arrival
                            parts = ev.slice(5).split(',');
                            if (parts.length > 2) {
                                let int_beacon = parseInt(parts[2]);
                                await this.setBeaconChange(parts[0], int_beacon);
                            }
                        // no break on purpose
                        case 2: // device plug/unplug
                        case 4: // function name change
                        case 8: // function name change (ydx)
                            hub.devListExpires = 0;
                            break;
                        case 5: // function value (long notification)
                            parts = ev.slice(5).split(',');
                            if (parts.length > 2) {
                                value = parts[2].split('\0');
                                await this.setFunctionValue(parts[0] + '.' + parts[1], value[0]);
                            }
                            break;
                    }
                }
            } else {
                // oops, bad notification ? be safe until a good one comes
                hub.devListValidity = 500;
                hub.devListExpires = 0;
                //alert('bad event on line '+idx+'/'+nrows+' : '+ev);
                hub.notifPos = -1;
            }
            hub.currPos += ev.length + 1;
        }
        if (this._forwardValues > 0) {
            await this.HandleEvents(new YErrorMsg());
        }
    }

    /** Network notification format: 7x7bit (mapped to 7 chars in range 32..159)
     *                               used to represent 1 flag (RAW6BYTES) + 6 bytes
     * INPUT:  [R765432][1076543][2107654][3210765][4321076][5432107][6543210]
     * OUTPUT: 7 bytes array (1 byte for the funcint_TypeV2 and 6 bytes of USB like data
     *                     funcTypeV2 + [R][-byte 0][-byte 1-][-byte 2-][-byte 3-][-byte 4-][-byte 5-]
     *
     * @return {number[]}
     */
    imm_decodeNetFuncValV2(p)
    {
        var p_ofs = 0;
        var ch = p.charCodeAt(p_ofs) & 0xff;
        var len = 0;
        var funcVal = [0,0,0,0,0,0,0];

        if(ch < 32 || ch > 32 + 127) {
            return null;
        }
        // get the 7 first bits
        ch -= 32;
        funcVal[0] = ((ch & 0x40) != 0 ? NOTIFY_V2_6RAWBYTES : NOTIFY_V2_TYPEDDATA);
        // clear flag
        ch &= 0x3f;
        while(len < YOCTO_PUBVAL_SIZE) {
            p_ofs++;
            if (p_ofs >= p.length)
                break;
            var newCh = p.charCodeAt(p_ofs) & 0xff;
            if (newCh == NOTIFY_NETPKT_STOP) {
                break;
            }
            if(newCh < 32 || newCh > 32+127) {
                return null;
            }
            newCh -= 32;
            ch = (ch << 7) + newCh;
            funcVal[len + 1] = (ch >>> (5 - len)) & 0xff;
            len++;
        }
        return funcVal;
    }

    /** Decode an enhanced notification (V2) buffer
     *
     * @param int_typeV2 {number}
     * @param arr_funcval {number[]}
     * @param int_ofs {number}
     * @param int_funcvalen {number}
     * @returns {string}
     */
    imm_decodePubVal(int_typeV2, arr_funcval, int_ofs, int_funcvalen)
    {
        var buffer = '';
        var endp;
        if (int_typeV2 == NOTIFY_V2_6RAWBYTES || int_typeV2 == NOTIFY_V2_TYPEDDATA) {
            var funcValType;
            if (int_typeV2 == NOTIFY_V2_6RAWBYTES) {
                funcValType = PUBVAL_6RAWBYTES;
            } else {
                funcValType = arr_funcval[int_ofs++];
            }
            switch (funcValType) {
                case PUBVAL_LEGACY:
                    // fallback to legacy handling, just in case
                    break;
                case PUBVAL_1RAWBYTE:
                case PUBVAL_2RAWBYTES:
                case PUBVAL_3RAWBYTES:
                case PUBVAL_4RAWBYTES:
                case PUBVAL_5RAWBYTES:
                case PUBVAL_6RAWBYTES:
                    // 1..5 hex bytes
                    for (var i = 0; i < funcValType; i++) {
                        var c = arr_funcval[int_ofs++];
                        var b = c >>> 4;
                        buffer += b.toString(16);
                        b = c & 0xf;
                        buffer += b.toString(16);
                    }
                    return buffer;
                case PUBVAL_C_LONG:
                case PUBVAL_YOCTO_FLOAT_E3:
                    // 32bit integer in little endian format or Yoctopuce 10-3 format
                    var numVal = arr_funcval[int_ofs++];
                    numVal += arr_funcval[int_ofs++] << 8;
                    numVal += arr_funcval[int_ofs++] << 16;
                    numVal += arr_funcval[int_ofs++] << 24;
                    if (funcValType == PUBVAL_C_LONG) {
                        return String(Math.round(numVal));
                    } else {
                        buffer = String(Math.round(numVal*1000) / 1000000.0);
                        endp = buffer.length;
                        while (endp > 0 && buffer[endp - 1] == '0') {
                            --endp;
                        }
                        if (endp > 0 && buffer[endp - 1] == '.') {
                            --endp;
                            buffer = buffer.substr(0, endp);
                        }
                        return buffer;
                    }
                case PUBVAL_C_FLOAT:
                    // 32bit (short) float
                    var v = arr_funcval[int_ofs++];
                    v += arr_funcval[int_ofs++] << 8;
                    v += arr_funcval[int_ofs++] << 16;
                    v += arr_funcval[int_ofs++] << 24;
                    var fraction = (v & ((1 << 23) - 1)) + (1 << 23) * (v >>> 31 | 1);
                    var exp = (v >>> 23 & 0xFF) - 127;
                    var floatVal = fraction * Math.pow(2, exp - 23);
                    buffer = String(Math.round(floatVal*1000000)/1000000);
                    endp = buffer.length;
                    while (endp > 0 && buffer[endp - 1] == '0') {
                        --endp;
                    }
                    if (endp > 0 && buffer[endp - 1] == '.') {
                        --endp;
                        buffer = buffer.substr(0, endp);
                    }
                    return buffer;
                default:
                    return '?';
            }

            // Legacy handling: just pad with NUL up to 7 chars
            var len = 0;
            buffer = '';
            while (len < YOCTO_PUBVAL_SIZE && len < int_funcvalen) {
                if (arr_funcval[len] == 0)
                    break;
                buffer += String.fromCharCode(arr_funcval[len]);
                len++;
            }
        }
        return buffer;
    }

    imm_decExp(int_pow)
    {
        const arr = [ 1.0e-6, 1.0e-5, 1.0e-4, 1.0e-3, 1.0e-2, 1.0e-1, 1.0,
            1.0e1, 1.0e2, 1.0e3, 1.0e4, 1.0e5, 1.0e6, 1.0e7, 1.0e8, 1.0e9
        ];
        return arr[int_pow];
    }

    // Convert Yoctopuce 16-bit decimal floats to standard double-precision floats
    //
    imm_decimalToDouble(val)
    {
        var negate = false;
        var res;
        var mantis = val & 2047;
        if(mantis == 0) return 0.0;
        if(val > 32767) {
            negate = true;
            val = 65536-val;
        } else if(val < 0) {
            negate = true;
            val = -val;
        }
        var decexp = this.imm_decExp(val >>> 11);
        if(decexp >= 1.0) {
            res = (mantis) * decexp;
        } else { // fix rounding issue
            res = (mantis) / Math.round(1/decexp);
        }

        return (negate ? -res : res);
    }

    // Convert standard double-precision floats to Yoctopuce 16-bit decimal floats
    //
    imm_doubleToDecimal(val)
    {
        var negate = false;
        var comp, mant;
        var decpow;
        var res;

        if(val == 0.0) {
            return 0;
        }
        if(val < 0) {
            negate = true;
            val = -val;
        }
        comp = val / 1999.0;
        decpow = 0;
        while(comp > this.imm_decExp(decpow) && decpow < 15) {
            decpow++;
        }
        mant = val / this.imm_decExp(decpow);
        if(decpow == 15 && mant > 2047.0) {
            res = (15 << 11) + 2047; // overflow
        } else {
            res = (decpow << 11) + Math.round(mant);
        }
        return (negate ? -res : res);
    }

    imm_getCalibrationHandler(calibType)
    {
        return this._calibHandlers[calibType];
    }

    // Parse an array of u16 encoded in a base64-like string with memory-based compression
    imm_decodeWords(data)
    {
        var udata = [];
        for(var i = 0; i < data.length;) {
            var c = data[i];
            if(c == '*') {
                val = 0;
                i++;
            } else if(c == 'X') {
                val = 0xffff;
                i++;
            } else if(c == 'Y') {
                val = 0x7fff;
                i++;
            } else if(c >= 'a') {
                var srcpos = udata.length-1-(data.charCodeAt(i++)-97);
                if(srcpos < 0)
                    val = 0;
                else
                    val = udata[srcpos];
            } else {
                if(i+3 > data.length)
                    return udata;
                var val = (data.charCodeAt(i++) - 48);
                val += (data.charCodeAt(i++) - 48) << 5;
                var lastcode = data.charCodeAt(i++);
                if(lastcode == 122) lastcode = 92;
                val += (lastcode - 48) << 10;
            }
            udata.push(val);
        }
        return udata;
    }

    // Parse an array of u16 encoded in a base64-like string with memory-based compresssion
    imm_decodeFloats(data)
    {
        var idata = [];
        var p = 0;
        var datalen = data.length;
        while (p < datalen) {
            var val = 0;
            var sign = 1;
            var dec = 0;
            var decInc = 0;
            var c = data[p++];
            while(c != '-' && (c < '0' || c > '9')) {
                if(p >= datalen) {
                    return idata;
                }
                c = data[p++];
            }
            if(c == '-') {
                if(p >= datalen) {
                    return idata;
                }
                sign = -sign;
                c = data[p++];
            }
            while((c >= '0' && c <= '9') || c == '.') {
                if(c == '.') {
                    decInc = 1;
                } else if(dec < 3) {
                    val = val * 10 + (c.charCodeAt(0) - 48);
                    dec += decInc;
                }
                if(p < datalen) {
                    c = data[p++];
                } else {
                    c = '\0';
                }
            }
            if(dec < 3) {
                if(dec == 0) val *= 1000;
                else if(dec == 1) val *= 100;
                else val *= 10;
            }
            idata.push(sign*val);
        }
        return idata;
    }

    /** Convert a numeric string to an integer
     *
     * @param str_data {string}
     * @return {number}
     */
    imm_atoi(str_data)
    {
        var num = parseInt(str_data);
        if (isNaN(num)) {
            return 0;
        }
        return Math.floor(num);
    }

    /** Convert a binary object to string
     *
     * @param bin_data {Uint8Array|Buffer}
     * @return {string}
     */
    imm_bin2str(bin_data)
    {
        /** @type {number} **/
        let len = bin_data.length;
        /** @type {string} **/
        let res = '';
        for(let i = 0; i < len; i += 20) {
            let subdata = bin_data.subarray(i, Math.min(i+20,len));
            res += String.fromCharCode.apply(null, subdata);
        }
        return res;
    }

    /** Convert a string to binary object
     *
     * @param str_data {string}
     * @return {Uint8Array}
     */
    imm_str2bin(str_data)
    {
        /** @type {number} **/
        let len = str_data.length;
        /** @type {Uint8Array} **/
        let res = new Uint8Array(len);
        for(let i = 0; i < len; i++) {
            res[i] = str_data.charCodeAt(i);
        }
        return res;
    }

    /** Convert a binary object to hex string
     *
     * @param bin_data {Uint8Array}
     * @return {string}
     */
    imm_bin2hexstr(bin_data)
    {
        /** @type {number} **/
        let len = bin_data.length;
        /** @type {string} **/
        let res = '';
        for(let i = 0; i < len; i++) {
            let n = bin_data[i].toString(16);
            res += n.length < 2 ? '0' + n : n;
        }
        return res.toUpperCase();
    }

    /** Convert a hex string to binary object
     *
     * @param str_data {string}
     * @return {Uint8Array}
     */
    imm_hexstr2bin(str_data)
    {
        /** @type {number} **/
        let len = (str_data.length >>> 1);
        /** @type {Uint8Array} **/
        let res = new Uint8Array(len);
        for(let i = 0; i < len; i++) {
            res[i] = parseInt(str_data.substr(2*i, 2), 16);
        }
        return res;
    }

    /** Return a Device object for a specified URL, serial number or logical device name
     *
     * @param str_device {string}
     * @return {YDevice}
     *
     * This function will not cause any network access (not async !)
     */
    imm_getDevice(str_device)
    {
        var dev = null;
        var serial;

        if(str_device.substr(0,7) == 'http://' || str_device.substr(0,5) == 'ws://' || str_device.substr(0,6) == 'wss://') {
            // lookup by url
            serial = this._snByUrl[str_device];
            if(serial != undefined) dev = this._devs[serial];
        } else {
            // lookup by serial
            if(this._devs[str_device]) {
                dev = this._devs[str_device];
            } else {
                // fallback to lookup by logical name
                serial = this._snByName[str_device];
                if(serial) {
                    dev = this._devs[serial];
                }
            }
        }
        return dev;
    }

    /** Add or remove a value change callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    async _UpdateValueCallbackList(obj_func, bool_add)
    {
        /** @type {number} **/
        let index = this._ValueCallbackList.indexOf(obj_func);
        if (bool_add) {
            await obj_func.isOnline();
            if(index < 0) {
                this._ValueCallbackList.push(obj_func);
            }
        } else if(index >= 0) {
            this._ValueCallbackList.splice(index, 1);
        }
    }

    /** Add or remove a timed report callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    async _UpdateTimedReportCallbackList(obj_func, bool_add)
    {
        /** @type {number} **/
        let index = this._TimedReportCallbackList.indexOf(obj_func);
        if (bool_add) {
            await obj_func.isOnline();
            if(index < 0) {
                this._TimedReportCallbackList.push(obj_func);
            }
        } else if(index >= 0) {
            this._TimedReportCallbackList.splice(index, 1);
        }
    }

    // Return the class name for a given function ID or full Hardware Id
    // Also make sure that the function type is registered in the API
    imm_functionClass(str_funcid)
    {
        var dotpos = str_funcid.indexOf('.');
        if(dotpos >= 0) str_funcid = str_funcid.substr(dotpos+1);
        var classlen = str_funcid.length;
        while(str_funcid.substr(classlen-1,1) <= '9') classlen--;
        var classname = str_funcid.substr(0,1).toUpperCase()+str_funcid.substr(1,classlen-1);
        if(this._fnByType[classname] == undefined)
            this._fnByType[classname] = new YFunctionType(this, classname);

        return classname;
    }

    // Reindex a device in YAPI after a name change detected by device refresh
    imm_reindexDevice(obj_dev)
    {
        var rootUrl = obj_dev.imm_getRootUrl();
        var serial = obj_dev.imm_getSerialNumber();
        var lname  = obj_dev.imm_getLogicalName();
        this._devs[serial] = obj_dev;
        this._snByUrl[rootUrl] = serial;
        if(lname != '') this._snByName[lname] = serial;
        this._fnByType['Module'].imm_reindexFunction(serial+'.module', lname, null, null);
        var i, count = obj_dev.imm_functionCount();
        for(i = 0; i < count; i++) {
            var funcid = obj_dev.imm_functionId(i);
            if(funcid != '') {
                var funcname = obj_dev.imm_functionName(i);
                var classname = this.imm_functionClass(funcid);
                this._fnByType[classname].imm_reindexFunction(serial+'.'+funcid, funcname, null, null);
            }
        }
    }

    // Remove a device from YAPI after an unplug detected by device refresh
    imm_forgetDevice(obj_dev)
    {
        var rootUrl = obj_dev.imm_getRootUrl();
        var serial = obj_dev.imm_getSerialNumber();
        var lname = obj_dev.imm_getLogicalName();
        delete this._devs[serial];
        delete this._snByUrl[rootUrl];
        if(this._snByName[lname] == serial) {
            delete this._snByName[lname];
        }
        this._fnByType['Module'].imm_forgetFunction(serial+'.module');
        var i, count = obj_dev.imm_functionCount();
        for(i = 0; i < count; i++) {
            var funcid = obj_dev.imm_functionId(i);
            if(funcid != '') {
                var classname = this.imm_functionClass(funcid);
                this._fnByType[classname].imm_forgetFunction(serial + '.' + funcid);
            }
        }
    }

    // Find the best known identifier (hardware Id) for a given function
    imm_resolveFunction(str_className, str_func)
    {
        if (Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if (this._fnByType[str_className] == undefined)
                this._fnByType[str_className] = new YFunctionType(this, str_className);
            return this._fnByType[str_className].imm_resolve(str_func);
        }
        // using an abstract baseType
        var baseType = Y_BASETYPES[str_className];
        var res;
        for (str_className in this._fnByType) {
            if (this._fnByType[str_className].imm_matchBaseType(baseType)) {
                res = this._fnByType[str_className].imm_resolve(str_func);
                if (res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return {errorType:YAPI_DEVICE_NOT_FOUND,
                errorMsg:'No '+str_className+' ['+str_func+'] found (old firmware?)',
                result:null};
    }

    // Find the best known identifier (hardware Id) for a given function
    imm_getFriendlyNameFunction(str_className, str_func)
    {
        if (Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if (this._fnByType[str_className] == undefined)
                this._fnByType[str_className] = new YFunctionType(this, str_className);
            return this._fnByType[str_className].imm_getFriendlyName(str_func);
        }
        // using an abstract baseType
        var baseType = Y_BASETYPES[str_className];
        var res;
        for (str_className in this._fnByType) {
            if (this._fnByType[str_className].imm_matchBaseType(baseType)) {
                res = this._fnByType[str_className].imm_getFriendlyName(str_func);
                if (res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return {errorType:YAPI_DEVICE_NOT_FOUND,
                errorMsg:'No '+str_className+' ['+str_func+'] found (old firmware?)',
                result:null};
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    imm_setFunction(str_className, str_func, obj_func)
    {
        if(this._fnByType[str_className] == undefined)
            this._fnByType[str_className] = new YFunctionType(this, str_className);
        return this._fnByType[str_className].imm_setFunction(str_func, obj_func);
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    imm_getFunction(str_className, str_func)
    {
        if(this._fnByType[str_className] == undefined)
            this._fnByType[str_className] = new YFunctionType(this, str_className);
        return this._fnByType[str_className].imm_getFunction(str_func);
    }

    // Set a function advertised value by hardware id
    async setFunctionValue(str_hwid, str_pubval)
    {
        let classname = this.imm_functionClass(str_hwid);
        if(this._fnByType[classname].imm_setFunctionValue(str_hwid, str_pubval)) {
            let receivers = this._ValueCallbackList;
            for(let i = 0; i < receivers.length; i++) {
                let fun = receivers[i];
                if(!fun._hwId) continue;
                if(fun._hwId == str_hwid) {
                    await fun._invokeValueCallback(str_pubval);
                }
            }
        }
    }

    // Set a timed value report for a function
    async setTimedReport(str_hwid, float_timestamp, float_duration, arr_report)
    {
        let classname = this.imm_functionClass(str_hwid);
        let receivers = this._TimedReportCallbackList;
        for(let i = 0; i < receivers.length; i++) {
            let fun = receivers[i];
            if(!fun._hwId) continue;
            if(fun._hwId == str_hwid) {
                var dev = this.imm_getDevice(fun._serial);
                if(dev) {
                    var report = await fun._decodeTimedReport(float_timestamp, float_duration, arr_report);
                    await fun._invokeTimedReportCallback(report);
                }
            }
        }
    }

    // Publish a configuration change event
    async setConfChange(str_serial)
    {
        let module = YModule.FindModuleInContext(this, str_serial + ".module");
        await module._invokeConfigChangeCallback();
    }

    // Publish a beacon change event
    async setBeaconChange(str_serial, int_beacon)
    {
        if (this._beacons[str_serial] === undefined || this._beacons[str_serial] != int_beacon) {
            this._beacons[str_serial] = int_beacon;
            let module = YModule.FindModuleInContext(this, str_serial + ".module");
            await module._invokeBeaconCallback(int_beacon);
        }
    }

    // Retrieve a function advertised value by hardware id
    imm_getFunctionValue(str_hwid)
    {
        var classname = this.imm_functionClass(str_hwid);
        return this._fnByType[classname].imm_getFunctionValue(str_hwid);
    }

    // Retrieve a function advertised value by hardware id
    imm_getFunctionBaseType(str_hwid)
    {
        var classname = this.imm_functionClass(str_hwid);
        return this._fnByType[classname].imm_getBaseType();
    }

    // Find the hardwareId for the first instance of a given function class
    imm_getFirstHardwareId(str_className)
    {
        if (Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            if (this._fnByType[str_className] == undefined)
                this._fnByType[str_className] = new YFunctionType(this, str_className);
            return this._fnByType[str_className].imm_getFirstHardwareId();
        }
        // enumeration of an abstract class
        var baseType = Y_BASETYPES[str_className];
        var res;
        for (str_className in this._fnByType) {
            if (this._fnByType[str_className].imm_matchBaseType(baseType)) {
                res = this._fnByType[str_className].imm_getFirstHardwareId();
                if (res != undefined) return res;
            }
        }
        return null;
    }

    // Find the hardwareId for the next instance of a given function class
    imm_getNextHardwareId(str_className, str_hwid)
    {
        if(Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            return this._fnByType[str_className].imm_getNextHardwareId(str_hwid);
        }
        // enumeration of an abstract class
        var baseType = Y_BASETYPES[str_className];
        var prevclass = this.imm_functionClass(str_hwid);
        var res = this._fnByType[prevclass].imm_getNextHardwareId(str_hwid);
        if(res != undefined) return res;
        for(str_className in this._fnByType) {
            if(prevclass != '') {
                if(str_className != prevclass) continue;
                prevclass = '';
                continue;
            }
            if (this._fnByType[str_className].imm_matchBaseType(baseType)) {
                res = this._fnByType[str_className].imm_getFirstHardwareId();
                if (res != undefined) return res;
            }
        }
        return null;
    }

    /** Perform an HTTP request on a device, by URL or identifier.
     * When loading the REST API from a device by identifier, the device cache will be used.
     *
     * @param str_device {string}
     * @param str_request {string}
     * @param obj_body {YHTTPBody|null}
     * @param int_tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async devRequest(str_device, str_request, obj_body, int_tcpchan)
    {
        /** @type {string[]} **/
        let lines = str_request.split('\n');
        /** @type {YHTTPRequest} **/
        let res = new YHTTPRequest(null);
        /** @type {YDevice} **/
        let lockdev;
        /** @type {string} **/
        let baseUrl;
        if(!int_tcpchan) {
            int_tcpchan = 0;
        }
        if(str_device.substr(0,7) == 'http://' || str_device.substr(0,5) == 'ws://' || str_device.substr(0,6) == 'wss://') {
            baseUrl = str_device;
            if (baseUrl.slice(-1) != '/') baseUrl = baseUrl + '/';
            if(lines[0].substr(0,12) != 'GET /not.byn') {
                /** @type {string} **/
                let serial = this._snByUrl[baseUrl];
                if(serial) {
                    lockdev = this._devs[serial];
                }
            }
        } else {
            lockdev = this.imm_getDevice(str_device);
            if(!lockdev) {
                res.errorType = YAPI_DEVICE_NOT_FOUND;
                res.errorMsg = 'Device ['+str_device+'] not online';
                return res;
            }
            // use the device cache when loading the whole API
            if(lines[0] == 'GET /api.json') {
                return await lockdev.requestAPI(this.defaultCacheValidity);
            }
            baseUrl = lockdev.imm_getRootUrl();
        }
        // map str_device to a URL
        /** @type {string[]} **/
        let words = lines[0].split(' ');
        if(words.length < 2) {
            res.errorType = YAPI_INVALID_ARGUMENT;
            res.errorMsg = 'Invalid request, not enough words; expected a method name and a URL';
            return res;
        } else if(words.length > 2) {
            res.errorType = YAPI_INVALID_ARGUMENT;
            res.errorMsg = 'Invalid request, too many words; make sure the URL is URI-encoded';
            return res;
        }
        /** @type {YGenericHub} **/
        let hub = null;
        for(let i = 0; i < this._hubs.length; i++) {
            let hubUrl = this._hubs[i].urlInfo.url;
            if(baseUrl.slice(0,hubUrl.length) == hubUrl) {
                hub = this._hubs[i];
                break;
            }
        }
        /** @type {string} **/
        let method = words[0];
        /** @type {string} **/
        let devUrl = words[1];
        if(devUrl.substr(0,1) == '/') devUrl = devUrl.substr(1);
        // create an absolute hub-relative URL in devUrl
        if(baseUrl.substr(0, hub.urlInfo.url.length) == hub.urlInfo.url) {
            devUrl = baseUrl.substr(hub.urlInfo.url.length-1)+devUrl;
        } else {
            let pos = baseUrl.indexOf('//');
            pos = baseUrl.indexOf('/',pos+3);
            devUrl = baseUrl.slice(pos)+devUrl;
        }

        // make sure we are allowed to execute this query
        if(devUrl.slice(-2) == '&.' && !hub.imm_hasRwAccess()) {
            res.errorType = YAPI_UNAUTHORIZED;
            res.errorMsg = 'Access denied: admin credentials required';
            return res;
        }

        // queue the call to user callback function in the pending queries promise chain
        //let callStack = Error().stack;
        let delayedCode = function delayedRequest() {
            return hub.request(method, devUrl, obj_body, int_tcpchan).catch((e) => {
                //this.imm_log('request '+method+' '+devUrl+' failed', callStack);
                let res = new YHTTPRequest(null);
                res.errorType = YAPI_IO_ERROR;
                res.errorMsg = e.message;
                return res;
            });
        };
        if(lockdev && int_tcpchan == 0) {
            let newPromise = lockdev._pendingQueries.then(delayedCode, delayedCode);
            lockdev._pendingQueries = newPromise;
            res = await newPromise;
        } else {
            res = await delayedCode();
        }
        return res;
    }


    async isReadOnly(str_device)
    {
        let lockdev = this.imm_getDevice(str_device);
        if(!lockdev) {
            return true;
        }
        let baseUrl = lockdev.imm_getRootUrl();
        let hub = null;
        for(let i = 0; i < this._hubs.length; i++) {
            let hubUrl = this._hubs[i].urlInfo.url;
            if(baseUrl.slice(0,hubUrl.length) == hubUrl) {
                hub = this._hubs[i];
                break;
            }
        }
        if(hub == null || !hub.imm_hasRwAccess()) {
            return true;
        }

        return false;
    }

    /** Locate the device to access a specified function, without causing any I/O
     *
     * @param str_className {string}
     * @param str_func {string}
     * @returns {YFuncRequest}
     */
    imm_funcDev_internal(str_className, str_func)
    {
        var res = new YFuncRequest(null);
        var resolve = this.imm_resolveFunction(str_className, str_func);
        if(resolve.errorType != YAPI_SUCCESS) {
            res.errorType = resolve.errorType;
            res.errorMsg  = resolve.errorMsg;
        } else {
            str_func = resolve.result;
            let dotpos = str_func.indexOf('.');
            let devid = str_func.substr(0, dotpos);
            let funcid = str_func.substr(dotpos + 1);
            let dev = this.imm_getDevice(devid);
            if (dev == null) {
                res.errorType = YAPI_DEVICE_NOT_FOUND;
                res.errorMsg = 'Device [' + devid + '] not found';
            } else {
                res.obj_result = { device:dev, deviceid:devid, functionid:funcid, hwid:str_func };
            }
        }
        return res;
    }

    /** Locate the device to access a specified function. May cause device list update if needed
     *
     * @param str_className {string}
     * @param str_func {string}
     * @returns {YFuncRequest}
     */
    async _funcDev(str_className, str_func)
    {
        var resolve = this.imm_funcDev_internal(str_className, str_func);
        if(resolve.errorType == YAPI_SUCCESS) {
            return resolve;
        } else if(resolve.errorType == YAPI_DEVICE_NOT_FOUND && this._hubs.length == 0) {
            // when USB is supported, check if no USB device is connected before outputing this message
            resolve.errorMsg = 'Impossible to contact any device because no hub has been registered';
            return resolve;
        }
        var updRes = await this._updateDeviceList_internal(true, false);
        if(updRes.errorType != YAPI_SUCCESS) {
            resolve.errorType = updRes.errorType;
            resolve.errorMsg = updRes.errorMsg;
            return resolve;
        }
        return this.imm_funcDev_internal(str_className, str_func);
    }

    /** Load and parse the REST API for a function given by class name and identifier, possibly applying changes
     * Device cache will be preloaded when loading function 'module' and leveraged for other modules
     *
     * @param str_className {string}
     * @param str_func {string}
     * @param str_extra {string}
     * @param int_msValidity {number}
     * @returns {YFuncRequest}
     */
    async funcRequest(str_className, str_func, str_extra, int_msValidity)
    {
        /** @type {YFuncRequest} **/
        let funcreq = this.imm_funcDev_internal(str_className, str_func);
        if(funcreq.errorType != YAPI_SUCCESS) {
            funcreq = await this._funcDev(str_className, str_func);
            if (funcreq.errorType != YAPI_SUCCESS) {
                return funcreq;
            }
        }
        let devreq = funcreq.obj_result;
        let loadval = null;
        let yreq;
        if(str_extra == '') {
            // use a cached API string (reload if needed)
            /** @type {YHTTPRequest} **/
            yreq = await devreq.device.requestAPI(int_msValidity);
            if(yreq != null) {
                if (yreq.errorType != YAPI_SUCCESS) return yreq;
                loadval = yreq.obj_result[devreq.functionid];
            }
        } else {
            devreq.device.imm_dropCache();
        }
        if(!loadval) {
            // request specified function only to minimize traffic
            if(str_extra == '') str_extra = '.json';
            let httpreq = 'GET /api/'+devreq.functionid+str_extra;
            /** @type {YHTTPRequest} **/
            yreq = await this.devRequest(devreq.deviceid, httpreq, null, 0);
            if(yreq.errorType != YAPI_SUCCESS) return yreq;
            if(yreq.bin_result.length == 0 && httpreq.indexOf('?') >= 0) {
                funcreq.obj_result = yreq.bin_result;
                return funcreq;
            }
            try {
                loadval = JSON.parse(this.imm_bin2str(yreq.bin_result));
            } catch (err) {
                //this.imm_log('RequestAPI parse error: ', err);
            }
        }
        if(!loadval) {
            funcreq.errorType = YAPI_IO_ERROR;
            funcreq.errorMsg = 'Request failed, could not parse API value for function '+devreq.hwid;
        } else {
            for(let key in devreq) {
                loadval[key] = devreq[key];
            }
            funcreq.obj_result = loadval;
        }
        return funcreq;
    }

    /** Perform an HTTP request on a device and return the result string
     *
     * @param str_device {string}
     * @param str_request {string}
     * @returns {Uint8Array}
     */
    async HTTPRequest(str_device, str_request)
    {
        /** @type {YHTTPRequest} **/
        let yreq = await this.devRequest(str_device, str_request, null, 0);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }
        return yreq.bin_result;
    }

    async ForceDeviceRefresh(str_device)
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDevice(str_device);
        if (!dev) return;
        let rootUrl = dev.imm_getRootUrl();
        for (let i = 0; i < this._hubs.length; i++) {
            let hub = this._hubs[i];
            let hubUrl = hub.urlInfo.url;
            if(rootUrl.substr(0, hubUrl.length) === hubUrl) {
                /** @type {YDevice} **/
                let hubDev = this.imm_getDevice(hubUrl);
                hubDev.imm_dropCache();
                /** @type {number} **/
                let retcode = await hubDev.refresh();
                if(retcode != YAPI_SUCCESS) {
                    return this._throw(retcode, hubDev._lastErrorMsg, retcode);
                }
                /** @type {YHTTPRequest} **/
                let yreq = await hubDev.requestAPI(this.defaultCacheValidity);
                if(yreq.errorType != YAPI_SUCCESS) {
                    return yreq;
                }
                let yellowPages = yreq.obj_result['services']['yellowPages'];
                dev.imm_updateFromYP(yellowPages);
            }
        }
        dev.imm_dropCache();
    }

    async SetDeviceListValidity_internal(deviceListValidity)
    {
        this._deviceListValidityMs = deviceListValidity * 1000;
    }


    async GetDeviceListValidity_internal()
    {
        return parseInt(this._deviceListValidityMs / 1000);
    }

    //--- (generated code: YAPIContext implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    /**
     * Change the time between each forced enumeration of the YoctoHub used.
     * By default, the library performs a complete enumeration every 10 seconds.
     * To reduce network traffic it is possible to increase this delay.
     * This is particularly useful when a YoctoHub is connected to a GSM network
     * where the traffic is charged. This setting does not affect modules connected by USB,
     * nor the operation of arrival/removal callbacks.
     * Note: This function must be called after yInitAPI.
     *
     * @param deviceListValidity {number} : number of seconds between each enumeration.
     * @noreturn
     */
    async SetDeviceListValidity(deviceListValidity)
    {
        await this.SetDeviceListValidity_internal(deviceListValidity);
    }

    /**
     * Returns the time between each forced enumeration of the YoctoHub used.
     * Note: This function must be called after yInitAPI.
     *
     * @return {number} the number of seconds between each enumeration.
     */
    async GetDeviceListValidity()
    {
        return await this.GetDeviceListValidity_internal();
    }

    /**
     * Change the validity period of the data loaded by the library.
     * By default, when accessing a module, all the attributes of the
     * module functions are automatically kept in cache for the standard
     * duration (5 ms). This method can be used to change this standard duration,
     * for example in order to reduce network or USB traffic. This parameter
     * does not affect value change callbacks
     * Note: This function must be called after yInitAPI.
     *
     * @param cacheValidityMs {number} : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds.
     * @noreturn
     */
    async SetCacheValidity(cacheValidityMs)
    {
        this.defaultCacheValidity = cacheValidityMs;
    }

    /**
     * Returns the validity period of the data loaded by the library.
     * This method returns the cache validity of all attributes
     * module functions.
     * Note: This function must be called after yInitAPI .
     *
     * @return {number} an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     */
    async GetCacheValidity()
    {
        return this.defaultCacheValidity;
    }

    //--- (end of generated code: YAPIContext implementation)

    /**
     * Returns the version identifier for the Yoctopuce library in use.
     * The version is a string in the form "Major.Minor.Build",
     * for instance "1.01.5535". For languages using an external
     * DLL (for instance C#, VisualBasic or Delphi), the character string
     * includes as well the DLL version, for instance
     * "1.01.5535 (1.01.5439)".
     *
     * If you want to verify in your code that the library version is
     * compatible with the version that you have used during development,
     * verify that the major number is strictly equal and that the minor
     * number is greater or equal. The build number is not relevant
     * with respect to the library compatibility.
     *
     * @return {string} a character string describing the library version.
     */
    async GetAPIVersion()
    {
        return this.imm_GetAPIVersion();
    }

    imm_GetAPIVersion()
    {
        return /* version number patched automatically */'1.10.35708';
    }

    /**
     * Initializes the Yoctopuce programming library explicitly.
     * It is not strictly needed to call yInitAPI(), as the library is
     * automatically  initialized when calling yRegisterHub() for the
     * first time.
     *
     * When YAPI.DETECT_NONE is used as detection mode,
     * you must explicitly use yRegisterHub() to point the API to the
     * VirtualHub on which your devices are connected before trying to access them.
     *
     * @param mode {number} : an integer corresponding to the type of automatic
     *         device detection to use. Possible values are
     *         YAPI.DETECT_NONE, YAPI.DETECT_USB, YAPI.DETECT_NET,
     *         and YAPI.DETECT_ALL.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async InitAPI(mode,errmsg)
    {
        this._detectType = mode;
        if(this._isNodeJS) {
            if ((mode & this.DETECT_NET) !== 0) {
                await this.TriggerHubDiscovery();
            }
        } else {
            // for backward-compatibility, don't throw an exception
            // whatever argument is provided
        }
        return YAPI_SUCCESS;
    }

    /**
     * Frees dynamically allocated memory blocks used by the Yoctopuce library.
     * It is generally not required to call this function, unless you
     * want to free all dynamically allocated memory blocks in order to
     * track a memory leak for instance.
     * You should not call any other library function after calling
     * yFreeAPI(), or your program will crash.
     */
    async FreeAPI()
    {
        // Wait for all requests to complete
        for (let serial in this._devs) {
            let lockdev = this._devs[serial];
            let newPromise = lockdev._pendingQueries;
            if (newPromise != null) {
                try {
                    await newPromise;
                } catch (e) {}
            }
        }
        // Close all hubs, restart the API
        await this.KillAPI();
    }

    /**
     * Abort any ongoing API activity immediately by closing all open hubs. Then
     * frees dynamically allocated memory blocks used by the Yoctopuce library.
     * You should not call any other library function after calling
     * yDropAPI(), or your program will crash.
     */
    async KillAPI()
    {
        // stop SSDP manager, if started
        if(this._ssdpManager) {
            await this._ssdpManager.ySSDPStop();
            this._ssdpManager = null;
        }
        // disconnect all hubs (including callback)
        for (let i = 0; i < this._hubs.length; i++) {
            await this._hubs[i].disconnect();
        }
        // clear all caches
        this.imm_init();
    }

    /**
     * Disables the use of exceptions to report runtime errors.
     * When exceptions are disabled, every function returns a specific
     * error value which depends on its type and which is documented in
     * this reference manual.
     */
    async DisableExceptions()
    {
        this.exceptionsDisabled = true;
    }

    /**
     * Re-enables the use of exceptions for runtime error handling.
     * Be aware than when exceptions are enabled, every function that fails
     * triggers an exception. If the exception is not caught by the user code,
     * it  either fires the debugger or aborts (i.e. crash) the program.
     * On failure, throws an exception or returns a negative error code.
     */
    async EnableExceptions()
    {
        this.exceptionsDisabled = false;
    }

    /**
     * Enable logging to the console for unhandled promise rejections,
     * such as exceptions in async functions without a try/catch.
     * This is not really a Yoctopuce thing, but since it is not obvious
     * to find out and since the code differs depending on the environment,
     * we provide it here for convenience.
     */
    async LogUnhandledPromiseRejections()
    {
        if(this._isNodeJS) {
            process.on('unhandledRejection', (reason, p) => {
                this.imm_log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
            });
        } else {
            window.addEventListener('onunhandledrejection', (event) => {
                this.imm_log('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').');
            });
        }

    }

    // Parse a hub URL
    imm_parseRegisteredUrl(str_url)
    {
        let proto = 'ws://';
        let user = '';
        let pass = '';
        let port = '4444';
        let host;
        let dom = '';
        let url = '';

        if(!this._isNodeJS && window && window.navigator && window.navigator.userAgent && /(iPad|iPhone|iPod)/g.test(window.navigator.userAgent)) {
            // iOS now blocks ws:// unless embedded from a https:// page, so we have to default to http://
            proto = 'http://';
        }
        if(str_url.slice(0,7) == 'http://') {
            proto= 'http://';
            str_url = str_url.slice(7);
        } else if(str_url.slice(0,5) == 'ws://') {
            str_url = str_url.slice(5);
        } else if(str_url.slice(0,6) == 'wss://') {
            proto = 'wss://';
            str_url = str_url.slice(6);
        }
        str_url = str_url.replace('/not.byn','');
        let pos = str_url.indexOf('/');
        if (pos > 0) {
            dom = str_url.slice(pos+1);
            if (dom.length > 0 && dom.substr(-1) != '/')
                dom += '/';
            str_url = str_url.slice(0, pos);
        }
        url = proto;
        let authpos = str_url.indexOf('@');
        if (authpos >= 0) {
            let auth = str_url.slice(0, authpos);
            let passpos = auth.indexOf(':');
            if (passpos >= 0) {
                user = auth.slice(0, passpos);
                pass = auth.slice(passpos + 1);
                url += user + ':' + pass + '@';
            }else{
                user = auth;
                url += user + '@';
            }
            str_url = str_url.slice(authpos + 1);
        }
        pos = str_url.indexOf(':');
        if(pos < 0) {
            host = str_url;
        } else {
            host = str_url.slice(0,pos);
            port = str_url.slice(pos + 1);
        }
        if (host == 'callback') {
            if(proto == 'ws:') {
                url = 'ws://callback:4444/';
            } else {
                url = 'http://callback:4444/';
            }
        } else {
            url +=host + ':' + port + '/' + dom;
        }
        let res = {'proto':proto, 'user':user, 'pass':pass, 'host':host, 'port':port, 'domain':dom, 'url':url};
        return res;
    }

    imm_registerHub_internal(urlInfo)
    {
        let newhub;
        if(urlInfo.url.slice(0,3) == 'ws:' || urlInfo.url.slice(0,4) == 'wss:') {
            if(this._isNodeJS) {
                newhub = new YWebSocketNodeHub(this, urlInfo);
            } else {
                newhub = new YWebSocketHub(this, urlInfo);
            }
        } else {
            if(this._isNodeJS) {
                newhub = new YHttpNodeHub(this, urlInfo);
            } else {
                newhub = new YHttpHub(this, urlInfo);
            }
        }
        return newhub;
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a given machine. The
     * parameter will determine how the API will work. Use the following values:
     *
     * <b>usb</b>: When the usb keyword is used, the API will work with
     * devices connected directly to the USB bus. Some programming languages such a JavaScript,
     * PHP, and Java don't provide direct access to USB hardware, so usb will
     * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
     *
     * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
     * host with the given IP address or hostname. That host can be a regular computer
     * running a VirtualHub, or a networked YoctoHub such as YoctoHub-Ethernet or
     * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
     * computer, use the IP address 127.0.0.1.
     *
     * <b>callback</b>: that keyword make the API run in "<i>HTTP Callback</i>" mode.
     * This a special mode allowing to take control of Yoctopuce devices
     * through a NAT filter when using a VirtualHub or a networked YoctoHub. You only
     * need to configure your hub to call your server script on a regular basis.
     * This mode is currently available for PHP and Node.JS only.
     *
     * Be aware that only one application can use direct USB access at a
     * given time on a machine. Multiple access would cause conflicts
     * while trying to access the USB modules. In particular, this means
     * that you must stop the VirtualHub software before starting
     * an application that uses direct USB access. The workaround
     * for this limitation is to setup the library to use the VirtualHub
     * rather than direct USB access.
     *
     * If access control has been activated on the hub, virtual or not, you want to
     * reach, the URL parameter should look like:
     *
     * http://username:password@address:port
     *
     * You can call <i>RegisterHub</i> several times to connect to several machines.
     *
     * @param url {string} : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async RegisterHub(url, errmsg)
    {
        if(url === "net") {
            if(this._isNodeJS) {
                this._detectType |= this.DETECT_NET;
                return await this.TriggerHubDiscovery();
            } else {
                return this._yapi._throw(YAPI_NOT_SUPPORTED, 'Network discovery is not possible in a browser', YAPI_NOT_SUPPORTED);
            }
        }
        if(url === "usb") {
            return this._yapi._throw(YAPI_NOT_SUPPORTED, 'Use the VirtualHub on 127.0.0.1 to access USB devices', YAPI_NOT_SUPPORTED);
        }
        let urlInfo = this.imm_parseRegisteredUrl(url);
        let newhub = this.imm_getHub(urlInfo);
        if(newhub) {
            return YAPI_SUCCESS;
        }
        newhub = this.imm_registerHub_internal(urlInfo);
        let sub_errmsg = new YErrorMsg();
        let retcode = await newhub.testHub(30000, sub_errmsg);
        if(retcode != YAPI_SUCCESS) {
            if(errmsg) {
                errmsg.msg = sub_errmsg.msg;
            }
            return this._throw(retcode, sub_errmsg.msg, retcode);
        }
        await this._addHub(newhub);

        // Update known device list
        let yreq = await this._updateDeviceList_internal(true, false);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(errmsg != undefined) {
                errmsg.msg = yreq.errorMsg;
                this._serverResponse.write('\n!YoctoAPI:'+errmsg.msg+'\n');
            }
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Fault-tolerant alternative to RegisterHub(). This function has the same
     * purpose and same arguments as RegisterHub(), but does not trigger
     * an error when the selected hub is not available at the time of the function call.
     * This makes it possible to register a network hub independently of the current
     * connectivity, and to try to contact it only when a device is actively needed.
     *
     * @param url {string} : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async PreregisterHub(url, errmsg)
    {
        let urlInfo = this.imm_parseRegisteredUrl(url);
        let newhub = this.imm_getHub(urlInfo);
        if(newhub) {
            return YAPI_SUCCESS;
        }
        if(this._pendingHubs[url]) {
            // hub already pre-registered
            return YAPI_SUCCESS;
        }
        this._pendingHubs[url] = true;
        newhub = this.imm_registerHub_internal(urlInfo);

        // trigger testHub, but don't wait for the result
        newhub.testHub(0, errmsg).then(() => {
            this._addHub(newhub).then(() => {
                // registration is now complete
                delete this._pendingHubs[url]; });
        });

        return YAPI_SUCCESS;
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a remote hub
     * performing an incoming connection to an HTTP server.
     *
     * @param incomingMessage {IncomingMessage} : node http incomingMessage object.
     * @param serverResponse  {ServerResponse} : node http serverResponse object.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async RegisterHubHttpCallback(incomingMessage, serverResponse, errmsg)
    {
        let urlInfo = this.imm_parseRegisteredUrl('http://callback:4444');
        let newhub = this.imm_getHub(urlInfo);
        if(newhub) {
            return YAPI_SUCCESS;
        }
        newhub = new YHttpCallbackHub(this, urlInfo, incomingMessage, serverResponse);
        await newhub.httpCallbackPromise;
        let retcode = await newhub.testHub(30000, errmsg);
        if(retcode != YAPI_SUCCESS) {
            this._serverResponse.write('\n!YoctoAPI:'+errmsg.msg+'\n');
            return this._throw(retcode, errmsg.msg, retcode);
        }
        await this._addHub(newhub);

        // Update known device list
        let yreq = await this._updateDeviceList_internal(true, false);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(errmsg != undefined) {
                errmsg.msg = yreq.errorMsg;
                this._serverResponse.write('\n!YoctoAPI:'+errmsg.msg+'\n');
            }
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a remote hub
     * performing an incoming connection to a websocket server.
     *
     * @param ws {WebSocket} : node WebSocket object for the incoming websocket callback connection.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     * @param authpwd {string} : an optional authentication password
     *
     * @return {number} YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async RegisterHubWebSocketCallback(ws, errmsg, authpwd)
    {
        let authstr = (authpwd ? 'ws:'+authpwd+'@' : '');
        let urlInfo = this.imm_parseRegisteredUrl('http://'+authstr+'callback:4444');
        let newhub = this.imm_getHub(urlInfo);
        if(newhub) {
            return YAPI_SUCCESS;
        }
        newhub = new YWebSocketCallbackHub(this, urlInfo, ws);
        let retcode = await newhub.testHub(30000, errmsg);
        if(retcode != YAPI_SUCCESS) {
            return this._throw(retcode, errmsg.msg, retcode);
        }
        await this._addHub(newhub);

        // Update known device list
        let yreq = await this._updateDeviceList_internal(true, false);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(errmsg != undefined) {
                errmsg.msg = yreq.errorMsg;
            }
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    async WebSocketJoin(ws, auth, closeCallback)
    {
        if(this._hubs.length == 0) {
            return false;
        }
        return await this._hubs[0].websocketJoin(ws, auth, closeCallback);
    }

    /**
     * Setup the Yoctopuce library to no more use modules connected on a previously
     * registered machine with RegisterHub.
     *
     * @param url {string} : a string containing either "usb" or the
     *         root URL of the hub to monitor
     */
    async UnregisterHub(url)
    {
        let urlInfo = this.imm_parseRegisteredUrl(url);
        let hub = this.imm_getHub(urlInfo);
        if(hub) {
            await hub.disconnect();
            for (let j = 0; j < hub.serialByYdx.length ; j++) {
                let serial = hub.serialByYdx[j];
                if (serial) {
                    this.imm_forgetDevice(this._devs[serial]);
                }
            }
            for (let i = 0; i < this._hubs.length; i++) {
                if (this._hubs[i] == hub) {
                    let before = this._hubs.slice(0,i);
                    if(i+1 < this._hubs.length) {
                        let after = this._hubs.slice(i+1);
                        this._hubs = before.concat(after);
                    }
                    this._hubs = before;
                    return;
                }
            }
        }
    }

    /**
     * Test if the hub is reachable. This method do not register the hub, it only test if the
     * hub is usable. The url parameter follow the same convention as the RegisterHub
     * method. This method is useful to verify the authentication parameters for a hub. It
     * is possible to force this method to return after mstimeout milliseconds.
     *
     * @param url {string} : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param mstimeout {number} : the number of millisecond available to test the connection.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    async TestHub(url, mstimeout, errmsg)
    {
        let urlInfo = this.imm_parseRegisteredUrl(url);
        let newhub = this.imm_getHub(urlInfo);
        if(newhub) {
            return (newhub.imm_isOnline() ? YAPI_SUCCESS : YAPI_IO_ERROR);
        }
        newhub = this.imm_registerHub_internal(urlInfo);
        if(!errmsg) errmsg = new YErrorMsg();
        let res = await newhub.testHub(mstimeout, errmsg);
        await newhub.disconnect();
        return res;
    }

    /**
     * Triggers a (re)detection of connected Yoctopuce modules.
     * The library searches the machines or USB ports previously registered using
     * yRegisterHub(), and invokes any user-defined callback function
     * in case a change in the list of connected devices is detected.
     *
     * This function can be called as frequently as desired to refresh the device list
     * and to make the application aware of hot-plug events. However, since device
     * detection is quite a heavy process, UpdateDeviceList shouldn't be called more
     * than once every two seconds.
     *
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async UpdateDeviceList(errmsg)
    {
        let yreq = await this._updateDeviceList_internal(false, true);
        if(yreq.errorType !== YAPI_SUCCESS) {
            if(errmsg !== undefined) errmsg.msg = yreq.errorMsg;
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    async _hubDiscoveryCallback_internal(serial, urlToRegister, urlToUnregister)
    {
        if(this._hubDiscoveryCallback && urlToRegister) {
            try {
                await this._hubDiscoveryCallback(serial, urlToRegister, urlToUnregister);
            } catch (e) {
                this.imm_log('Exception in hub discovery callback:', e);
            }
        }
        if((this._detectType & Y_DETECT_NET) !== 0) {
            if (urlToRegister) {
                if (urlToUnregister) {
                    await this.UnregisterHub(urlToUnregister);
                }
                await this.PreregisterHub(urlToRegister, null);
            }
        }
    }

    /**
     * Force a hub discovery, if a callback as been registered with yRegisterHubDiscoveryCallback it
     * will be called for each net work hub that will respond to the discovery.
     *
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async TriggerHubDiscovery(errmsg)
    {
        if(!this._isNodeJS) {
            return this._yapi._throw(YAPI_NOT_SUPPORTED, 'Hub discovery is not possible in a browser', YAPI_NOT_SUPPORTED);
        }
        if(!this._ssdpManager) {
            this._ssdpManager = new YSSDPManager(this);
            await this._ssdpManager.ySSDPStart((serial,newUrl,oldUrl) => {
                this._hubDiscoveryCallback_internal(serial,newUrl,oldUrl);
            });
        } else {
            await this._ssdpManager.ySSDPDiscover();
        }
        return YAPI_SUCCESS;
    }

    /**
     * Maintains the device-to-library communication channel.
     * If your program includes significant loops, you may want to include
     * a call to this function to make sure that the library takes care of
     * the information pushed by the modules on the communication channels.
     * This is not strictly necessary, but it may improve the reactivity
     * of the library for the following commands.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async HandleEvents(errmsg)
    {
        return YAPI_SUCCESS;
    }

    /**
     * Pauses the execution flow for a specified duration.
     * This function implements a passive waiting loop, meaning that it does not
     * consume CPU cycles significantly. The processor is left available for
     * other threads and processes. During the pause, the library nevertheless
     * reads from time to time information from the Yoctopuce modules by
     * calling yHandleEvents(), in order to stay up-to-date.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param ms_duration {number} : an integer corresponding to the duration of the pause,
     *         in milliseconds.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async Sleep(ms_duration, errmsg)
    {
        var end = this.GetTickCount() + ms_duration;
        await this.HandleEvents(errmsg);
        while(this.GetTickCount() < end) {
            await this._microSleep_internal();
            await this.HandleEvents(errmsg);
        }
        return YAPI_SUCCESS;
    }

    // internal async function to wait for a very short period
    _microSleep_internal()
    {
        return new Promise(function(resolve,reject) {
            //noinspection DynamicallyGeneratedCodeJS
            setTimeout(resolve,3) ;
        });
    }

    /**
     * Invoke the specified callback function after a given timeout.
     * This function behaves more or less like Javascript setTimeout,
     * but during the waiting time, it will call yHandleEvents
     * and yUpdateDeviceList periodically, in order to
     * keep the API up-to-date with current devices.
     *
     * @param callback : the function to call after the timeout occurs.
     *         On Microsoft Internet Explorer, the callback must
     *         be provided as a string to be evaluated.
     * @param ms_timeout : an integer corresponding to the duration of the
     *         timeout, in milliseconds.
     * @param args : additional arguments to be passed to the
     *         callback function can be provided, if needed
     *         (not supported on Microsoft Internet Explorer).
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    SetTimeout(callback, ms_timeout, args)
    {
        let errmsg = new YErrorMsg();
        this._setTimeout_internal(callback, this.GetTickCount()+ms_timeout, args, errmsg);

        return YAPI_SUCCESS;
    }

    _setTimeout_internal(callback, endtime, args, errmsg)
    {
        let delay = endtime - YAPI.GetTickCount();
        if(delay < 0) {
            callback.apply(null, args);
        } else if(delay < 100) {
            this.Sleep(delay, errmsg).then(() => {
                this._setTimeout_internal(callback, endtime, args);
            });
        } else {
            this.UpdateDeviceList(errmsg).then(() => {
                this.Sleep(90, errmsg).then(() => {
                    this._setTimeout_internal(callback, endtime, args);
                });
            });
        }
    }

    /**
     * Returns the current value of a monotone millisecond-based time counter.
     * This counter can be used to compute delays in relation with
     * Yoctopuce devices, which also uses the millisecond as timebase.
     *
     * @return {number} a long integer corresponding to the millisecond counter.
     */
    GetTickCount()
    {
        return Date.now();
    }

    imm_CheckLogicalName(name)
    {
        if(name == '') return true;
        if(!name) return false;
        if(name.length > 19) return false;
        return /^[A-Za-z0-9_\-]*$/.test(name);
    }

    /**
     * Checks if a given string is valid as logical name for a module or a function.
     * A valid logical name has a maximum of 19 characters, all among
     * A..Z, a..z, 0..9, _, and -.
     * If you try to configure a logical name with an incorrect string,
     * the invalid characters are ignored.
     *
     * @param name {string} : a string containing the name to check.
     *
     * @return {boolean} true if the name is valid, false otherwise.
     */
    async CheckLogicalName(name)
    {
        return this.imm_CheckLogicalName(name);
    }

    /**
     * Register a callback function, to be called each time
     * a device is plugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param arrivalCallback {function} : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    async RegisterDeviceArrivalCallback(arrivalCallback)
    {
        this._arrivalCallback = arrivalCallback;
    }

    async RegisterDeviceChangeCallback(changeCallback)
    {
        this._namechgCallback = changeCallback;
    }

    /**
     * Register a callback function, to be called each time
     * a device is unplugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param removalCallback {function} : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    async RegisterDeviceRemovalCallback(removalCallback)
    {
        this._removalCallback = removalCallback;
    }

    /**
     * Register a callback function, to be called each time an Network Hub send
     * an SSDP message. The callback has two string parameter, the first one
     * contain the serial number of the hub and the second contain the URL of the
     * network hub (this URL can be passed to RegisterHub). This callback will be invoked
     * while yUpdateDeviceList is running. You will have to call this function on a regular basis.
     *
     * @param hubDiscoveryCallback {function} : a procedure taking two string parameter, the serial
     *         number and the hub URL. Use null to unregister a previously registered  callback.
     */
    async RegisterHubDiscoveryCallback(hubDiscoveryCallback)
    {
        if(!this._isNodeJS) {
            return this._yapi._throw(YAPI_NOT_SUPPORTED, 'Hub discovery is not possible in a browser', YAPI_NOT_SUPPORTED);
        }
        this._hubDiscoveryCallback = hubDiscoveryCallback;
        return await this.TriggerHubDiscovery();
    }

    // Register a new value calibration handler for a given calibration type
    //
    async RegisterCalibrationHandler(calibrationType, calibrationHandler)
    {
        this._calibHandlers[calibrationType.toString()] = calibrationHandler;
    }

    // Standard value calibration handler (n-point linear error correction)
    //
    LinearCalibrationHandler(float_rawValue, int_calibType, arr_calibParams,arr_calibRawValues, arr_calibRefValues)
    {
        // calibration types n=1..10 and 11..20 are meant for linear calibration using n points
        var npt;
        var x   = arr_calibRawValues[0];
        var adj = arr_calibRefValues[0] - x;
        var i   = 0;

        if(int_calibType < YOCTO_CALIB_TYPE_OFS) {
            npt = Math.min(int_calibType % 10, arr_calibRawValues.length, arr_calibRefValues.length);
        } else {
            npt = arr_calibRefValues.length;
        }
        while(float_rawValue > arr_calibRawValues[i] && ++i < npt) {
            var x2   = x;
            var adj2 = adj;

            x   = arr_calibRawValues[i];
            adj = arr_calibRefValues[i] - x;

            if(float_rawValue < x && x > x2) {
                adj = adj2 + (adj - adj2) * (float_rawValue - x2) / (x - x2);
            }
        }
        return float_rawValue + adj;
    }

    /**
     * Compute the MD5 digest for a given ASCII string
     *
     * @param text {string} : the ASCII string to hash
     *
     * @return {Uint8Array} the 16-bytes MD5 hash key
     */
    imm_yMD5(text)
    {
        let ctx = new Y_MD5Ctx();
        ctx.addData(this.imm_str2bin(text));
        return ctx.calculate();
    }

    // SHA1 and WPA preshared-key computation
    //
    imm_initshaw(str_s, int_ofs, int_pad, int_xinit, _shaw)
    {
        var ii, j = -1, k = 0;
        var n = str_s.length;

        for(ii = 0; ii < 64; ii++) {
            let i = int_ofs + ii;
            var c = 0;
            if (i < n) {
                c = str_s.charCodeAt(i);
            } else if (int_pad != 0) {
                if ((int_pad & 0x80) != 0) {
                    if (i == n) c = int_pad;
                } else {
                    if (i == n + 3) c = int_pad;
                    else if (i == n + 4) c = 0x80;
                }
            }
            if (k == 0) {
                j++;
                _shaw[j] = 0;
                k = 32;
            }
            k -= 8;
            _shaw[j] |= (c << k);
        }
        if(int_pad != 0) {
            if(int_pad == 0x80) {
                if(n <= int_ofs+55) {
                    _shaw[15] = 8 * n;
                }
            } else {
                _shaw[15] = 8 * (64 + n + 4);
            }
        }
        if(int_xinit != 0) {
            var xdw = (int_xinit << 16) | int_xinit;
            for (j = 0; j < 16; j++) {
                _shaw[j] ^= xdw;
            }
        }
    }

    imm_itershaw(s, _shaw)
    {
        var a, b, c, d, e, t, k;

        a = s[0];
        b = s[1];
        c = s[2];
        d = s[3];
        e = s[4];
        for (k = 16; k < 80; k++) {
            t = _shaw[k - 3] ^ _shaw[k - 8] ^ _shaw[k - 14] ^ _shaw[k - 16];
            _shaw[k] = (t << 1) | (t >>> 31);
        }
        for (k = 0; k < 20; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x5A827999 + ((b & c) | ((~b) & d));
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 20; k < 40; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x6ED9EBA1 + (b^c^d);
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 40; k < 60; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x8F1BBCDC + ((b & c) | (b & d) | (c & d));
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 60; k < 80; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0xCA62C1D6 + (b^c^d);
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        _shaw[0] = (s[0] + a) & 0xffffffff;
        _shaw[1] = (s[1] + b) & 0xffffffff;
        _shaw[2] = (s[2] + c) & 0xffffffff;
        _shaw[3] = (s[3] + d) & 0xffffffff;
        _shaw[4] = (s[4] + e) & 0xffffffff;
    }

    /**
     * Compute the SHA1 digest for a given ASCII string
     *
     * @param text {string} : the ASCII string to hash
     *
     * @return {Uint8Array} the 20-bytes SHA1 hash key
     */
    imm_ySHA1(text)
    {
        let shau = [ 0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0 ];
        let i, ofs = 0;
        let n = text.length;

        let _shaw = new Uint32Array(80);
        do {
            this.imm_initshaw(text, ofs, 0x80, 0, _shaw);
            this.imm_itershaw(shau, _shaw);
            for(i = 0; i < 5; i++) {
                shau[i] = _shaw[i];
            }
            ofs += 64;
        } while(n > ofs - 9);
        let res = new Uint8Array(20);
        for(i = 0; i < 20; i++) {
            res[i] = (shau[i>>>2] >>> (24-8*(i&3))) & 0xff;
        }
        return res;
    }

    /**
     * Compute the WPA Preshared key for a given SSID and passphrase
     *
     * @param ssid {string} : the access point SSID
     * @param pass {string} : the access point WPA/WPA2 passphrase
     *
     * @return {string} an hexadecimal string for the preshared key
     */
    async ComputePSK(ssid, pass)
    {
        let sha1_init = [ 0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0 ];
        let inner=[], outer=[], shau=[], res=[];
        let iter, pos, k, _shaw;

        // precompute part of sha used in the loops
        _shaw = new Uint32Array(80);
        this.imm_initshaw(pass, 0, 0, 0x3636, _shaw);
        this.imm_itershaw(sha1_init, _shaw);
        for(k = 0; k < 5; k++) inner[k] = _shaw[k];
        _shaw = new Uint32Array(80);
        this.imm_initshaw(pass, 0, 0, 0x5c5c, _shaw);
        this.imm_itershaw(sha1_init, _shaw);
        for(k = 0; k < 5; k++) outer[k] = _shaw[k];

        // prepare to compute first 20 bytes
        pos = 0;
        for(k = 0; k < 5; k++) shau[k] = 0;
        _shaw = new Uint32Array(80);
        this.imm_initshaw(ssid, 0, 1, 0, _shaw);

        for(iter = 0; iter < 8192;) {
            this.imm_itershaw(inner, _shaw);
            _shaw[5] = 0x80000000;
            for (k = 6; k < 15; k++) {
                _shaw[k] = 0;
            }
            _shaw[15] = 8 * (64 + 20);
            this.imm_itershaw(outer, _shaw);
            shau[0] ^= _shaw[0];
            shau[1] ^= _shaw[1];
            shau[2] ^= _shaw[2];
            shau[3] ^= _shaw[3];
            shau[4] ^= _shaw[4];
            iter++;
            // after 4096 loops, move to 2nd half of sha1
            if((iter & 4095) == 0) {
                for(k = 0; k < 5 && pos < 32; k++) {
                    res[pos++] = (shau[k] >>> 24) & 0xff;
                    res[pos++] = (shau[k] >>> 16) & 0xff;
                    res[pos++] = (shau[k] >>> 8) & 0xff;
                    res[pos++] = shau[k] & 0xff;
                }
                if(iter == 4096) {
                    for(k = 0; k < 5; k++) shau[k] = 0;
                    _shaw = new Uint32Array(80);
                    this.imm_initshaw(ssid, 0, 2, 0, _shaw);
                }
            }
        }
        let hex = '';
        for(k = 0; k < 32; k++) {
            hex += ('0'+Number(res[k]).toString(16)).slice(-2);
        }
        return hex;
    }
}

let YAPI = new YAPIContext();

//--- (generated code: YDataStream functions)

YoctoLibExport('YDataStream', YDataStream);
YDataStream.imm_Init();

//--- (end of generated code: YDataStream functions)
//--- (generated code: YDataSet functions)

YoctoLibExport('YDataSet', YDataSet);
YDataSet.imm_Init();

//--- (end of generated code: YDataSet functions)
//--- (generated code: YFirmwareUpdate functions)

YoctoLibExport('YFirmwareUpdate', YFirmwareUpdate);
YFirmwareUpdate.imm_Init();

//--- (end of generated code: YFirmwareUpdate functions)
//--- (generated code: YMeasure functions)

YoctoLibExport('YMeasure', YMeasure);
YMeasure.imm_Init();

//--- (end of generated code: YMeasure functions)
//--- (generated code: YAPIContext functions)

YoctoLibExport('YAPIContext', YAPIContext);
YAPIContext.imm_Init();

//--- (end of generated code: YAPIContext functions)

YoctoLibExport('YAPI', YAPI);

async function yGetAPIVersion()
{ return await YAPI.GetAPIVersion(); }

async function yInitAPI(mode,errmsg)
{ return await YAPI.InitAPI(mode,errmsg); }

async function yFreeAPI()
{ return await YAPI.FreeAPI(); }

async function yDisableExceptions()
{ return await YAPI.DisableExceptions(); }

async function yEnableExceptions()
{ return await YAPI.EnableExceptions(); }

async function yRegisterHub(url,errmsg)
{ return await YAPI.RegisterHub(url,errmsg); }

async function yPreregisterHub(url,errmsg)
{ return await YAPI.PreregisterHub(url,errmsg); }

async function yUnregisterHub(url)
{ return await YAPI.UnregisterHub(url); }

async function yUpdateDeviceList(errmsg)
{ return await YAPI.UpdateDeviceList(errmsg); }

async function yHandleEvents(errmsg)
{ return await YAPI.HandleEvents(errmsg); }

async function ySleep(ms_duration, errmsg)
{ return await YAPI.Sleep(ms_duration, errmsg); }

function ySetTimeout(callback, ms_timeout, args)
{
    let allArgs = [callback, ms_timeout];
    if(args) allArgs.push(args);
    return YAPI.SetTimeout.apply(YAPI, allArgs);
}

function yGetTickCount()
{ return YAPI.GetTickCount(); }

async function yCheckLogicalName(name)
{ return await YAPI.CheckLogicalName(name); }

async function yRegisterDeviceArrivalCallback(arrivalCallback)
{ return await YAPI.RegisterDeviceArrivalCallback(arrivalCallback); }

async function yRegisterDeviceChangeCallback(changeCallback)
{ return await YAPI.RegisterDeviceChangeCallback(changeCallback); }

async function yRegisterDeviceRemovalCallback(removalCallback)
{ return await YAPI.RegisterDeviceRemovalCallback(removalCallback); }

async function yRegisterCalibrationHandler(calibrationType, calibrationHandler)
{ return await YAPI.RegisterCalibrationHandler(calibrationType, calibrationHandler); }

if(typeof window != 'undefined') {
    YoctoLibExport('yGetAPIVersion', yGetAPIVersion);
    YoctoLibExport('yInitAPI', yInitAPI);
    YoctoLibExport('yFreeAPI', yFreeAPI);
    YoctoLibExport('yDisableExceptions', yDisableExceptions);
    YoctoLibExport('yEnableExceptions', yEnableExceptions);
    YoctoLibExport('yRegisterHub', yRegisterHub);
    YoctoLibExport('yPreregisterHub', yPreregisterHub);
    YoctoLibExport('yUnregisterHub', yUnregisterHub);
    YoctoLibExport('yUpdateDeviceList', yUpdateDeviceList);
    YoctoLibExport('yHandleEvents', yHandleEvents);
    YoctoLibExport('ySleep', ySleep);
    YoctoLibExport('ySetTimeout', ySetTimeout);
    YoctoLibExport('yGetTickCount', yGetTickCount);
    YoctoLibExport('yCheckLogicalName', yCheckLogicalName);
    YoctoLibExport('yRegisterDeviceArrivalCallback', yRegisterDeviceArrivalCallback);
    YoctoLibExport('yRegisterDeviceChangeCallback', yRegisterDeviceChangeCallback);
    YoctoLibExport('yRegisterDeviceRemovalCallback', yRegisterDeviceRemovalCallback);
    YoctoLibExport('yRegisterCalibrationHandler', yRegisterCalibrationHandler);
    YoctoLibExport('yLinearCalibrationHandler', YAPI.LinearCalibrationHandler);
}
