/*********************************************************************
 *
 * $Id: yocto_serialport.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for SerialPort functions
 *
 * - - - - - - - - - License information: - - - - - - - - -
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate this
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
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED 'AS IS' WITHOUT
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

//--- (generated code: YSerialPort return codes)
//--- (end of generated code: YSerialPort return codes)
//--- (generated code: YSerialPort definitions)
//--- (end of generated code: YSerialPort definitions)

//--- (generated code: YSnoopingRecord definitions)
//--- (end of generated code: YSnoopingRecord definitions)

//--- (generated code: YSnoopingRecord class start)
/**
 * YSnoopingRecord Class: Description of a message intercepted
 *
 *
 */
//--- (end of generated code: YSnoopingRecord class start)
class YSnoopingRecord
{
    constructor(str_json)
    {
        //--- (generated code: YSnoopingRecord constructor)
        /** @member {number} **/
        this._tim                        = 0;
        /** @member {number} **/
        this._dir                        = 0;
        /** @member {string} **/
        this._msg                        = '';
        //--- (end of generated code: YSnoopingRecord constructor)

        var loadval = JSON.parse(str_json);
        this._tim = loadval.t;
        this._dir = (loadval.m[0] == '<' ? 1 : 0);
        this._msg = loadval.m.slice(1);
    }

    //--- (generated code: YSnoopingRecord implementation)

    async get_time()
    {
        return this._tim;
    }

    async get_direction()
    {
        return this._dir;
    }

    async get_message()
    {
        return this._msg;
    }

    //--- (end of generated code: YSnoopingRecord implementation)
}


//--- (generated code: YSerialPort class start)
/**
 * YSerialPort Class: SerialPort function interface
 *
 * The SerialPort function interface allows you to fully drive a Yoctopuce
 * serial port, to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce serial ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YSerialPort class start)

class YSerialPort extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (generated code: YSerialPort constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'SerialPort';
        /** @member {number} **/
        this._rxCount                    = YSerialPort.RXCOUNT_INVALID;
        /** @member {number} **/
        this._txCount                    = YSerialPort.TXCOUNT_INVALID;
        /** @member {number} **/
        this._errCount                   = YSerialPort.ERRCOUNT_INVALID;
        /** @member {number} **/
        this._rxMsgCount                 = YSerialPort.RXMSGCOUNT_INVALID;
        /** @member {number} **/
        this._txMsgCount                 = YSerialPort.TXMSGCOUNT_INVALID;
        /** @member {string} **/
        this._lastMsg                    = YSerialPort.LASTMSG_INVALID;
        /** @member {string} **/
        this._currentJob                 = YSerialPort.CURRENTJOB_INVALID;
        /** @member {string} **/
        this._startupJob                 = YSerialPort.STARTUPJOB_INVALID;
        /** @member {string} **/
        this._command                    = YSerialPort.COMMAND_INVALID;
        /** @member {number} **/
        this._voltageLevel               = YSerialPort.VOLTAGELEVEL_INVALID;
        /** @member {string} **/
        this._protocol                   = YSerialPort.PROTOCOL_INVALID;
        /** @member {string} **/
        this._serialMode                 = YSerialPort.SERIALMODE_INVALID;
        /** @member {number} **/
        this._rxptr                      = 0;
        /** @member {Uint8Array} **/
        this._rxbuff                     = new Uint8Array(0);
        /** @member {number} **/
        this._rxbuffptr                  = 0;
        //--- (end of generated code: YSerialPort constructor)
    }

    //--- (generated code: YSerialPort implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'rxCount':
            this._rxCount = parseInt(val);
            return 1;
        case 'txCount':
            this._txCount = parseInt(val);
            return 1;
        case 'errCount':
            this._errCount = parseInt(val);
            return 1;
        case 'rxMsgCount':
            this._rxMsgCount = parseInt(val);
            return 1;
        case 'txMsgCount':
            this._txMsgCount = parseInt(val);
            return 1;
        case 'lastMsg':
            this._lastMsg = val;
            return 1;
        case 'currentJob':
            this._currentJob = val;
            return 1;
        case 'startupJob':
            this._startupJob = val;
            return 1;
        case 'command':
            this._command = val;
            return 1;
        case 'voltageLevel':
            this._voltageLevel = parseInt(val);
            return 1;
        case 'protocol':
            this._protocol = val;
            return 1;
        case 'serialMode':
            this._serialMode = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return {number} an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YSerialPort.RXCOUNT_INVALID.
     */
    async get_rxCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.RXCOUNT_INVALID;
            }
        }
        res = this._rxCount;
        return res;
    }

    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return {number} an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns YSerialPort.TXCOUNT_INVALID.
     */
    async get_txCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.TXCOUNT_INVALID;
            }
        }
        res = this._txCount;
        return res;
    }

    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return {number} an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns YSerialPort.ERRCOUNT_INVALID.
     */
    async get_errCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.ERRCOUNT_INVALID;
            }
        }
        res = this._errCount;
        return res;
    }

    /**
     * Returns the total number of messages received since last reset.
     *
     * @return {number} an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns YSerialPort.RXMSGCOUNT_INVALID.
     */
    async get_rxMsgCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.RXMSGCOUNT_INVALID;
            }
        }
        res = this._rxMsgCount;
        return res;
    }

    /**
     * Returns the total number of messages send since last reset.
     *
     * @return {number} an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns YSerialPort.TXMSGCOUNT_INVALID.
     */
    async get_txMsgCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.TXMSGCOUNT_INVALID;
            }
        }
        res = this._txMsgCount;
        return res;
    }

    /**
     * Returns the latest message fully received (for Line, Frame and Modbus protocols).
     *
     * @return {string} a string corresponding to the latest message fully received (for Line, Frame and
     * Modbus protocols)
     *
     * On failure, throws an exception or returns YSerialPort.LASTMSG_INVALID.
     */
    async get_lastMsg()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.LASTMSG_INVALID;
            }
        }
        res = this._lastMsg;
        return res;
    }

    /**
     * Returns the name of the job file currently in use.
     *
     * @return {string} a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns YSerialPort.CURRENTJOB_INVALID.
     */
    async get_currentJob()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.CURRENTJOB_INVALID;
            }
        }
        res = this._currentJob;
        return res;
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the job to use when the device is powered on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentJob(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('currentJob',rest_val);
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return {string} a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YSerialPort.STARTUPJOB_INVALID.
     */
    async get_startupJob()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.STARTUPJOB_INVALID;
            }
        }
        res = this._startupJob;
        return res;
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the job to use when the device is powered on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_startupJob(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('startupJob',rest_val);
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('command',rest_val);
    }

    /**
     * Returns the voltage level used on the serial line.
     *
     * @return {number} a value among YSerialPort.VOLTAGELEVEL_OFF, YSerialPort.VOLTAGELEVEL_TTL3V,
     * YSerialPort.VOLTAGELEVEL_TTL3VR, YSerialPort.VOLTAGELEVEL_TTL5V, YSerialPort.VOLTAGELEVEL_TTL5VR,
     * YSerialPort.VOLTAGELEVEL_RS232 and YSerialPort.VOLTAGELEVEL_RS485 corresponding to the voltage
     * level used on the serial line
     *
     * On failure, throws an exception or returns YSerialPort.VOLTAGELEVEL_INVALID.
     */
    async get_voltageLevel()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.VOLTAGELEVEL_INVALID;
            }
        }
        res = this._voltageLevel;
        return res;
    }

    /**
     * Changes the voltage type used on the serial line. Valid
     * values  will depend on the Yoctopuce device model featuring
     * the serial port feature.  Check your device documentation
     * to find out which values are valid for that specific model.
     * Trying to set an invalid value will have no effect.
     *
     * @param newval {number} : a value among YSerialPort.VOLTAGELEVEL_OFF,
     * YSerialPort.VOLTAGELEVEL_TTL3V, YSerialPort.VOLTAGELEVEL_TTL3VR, YSerialPort.VOLTAGELEVEL_TTL5V,
     * YSerialPort.VOLTAGELEVEL_TTL5VR, YSerialPort.VOLTAGELEVEL_RS232 and YSerialPort.VOLTAGELEVEL_RS485
     * corresponding to the voltage type used on the serial line
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageLevel(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('voltageLevel',rest_val);
    }

    /**
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Wiegand-ASCII" for Wiegand messages in ASCII mode,
     * "Wiegand-26","Wiegand-34", etc for Wiegand messages in byte mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return {string} a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YSerialPort.PROTOCOL_INVALID.
     */
    async get_protocol()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.PROTOCOL_INVALID;
            }
        }
        res = this._protocol;
        return res;
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Wiegand-ASCII" for Wiegand messages in ASCII mode,
     * "Wiegand-26","Wiegand-34", etc for Wiegand messages in byte mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each bytes sent.
     *
     * @param newval {string} : a string corresponding to the type of protocol used over the serial line
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_protocol(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('protocol',rest_val);
    }

    /**
     * Returns the serial port communication parameters, as a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix is included
     * if flow control is active: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @return {string} a string corresponding to the serial port communication parameters, as a string such as
     *         "9600,8N1"
     *
     * On failure, throws an exception or returns YSerialPort.SERIALMODE_INVALID.
     */
    async get_serialMode()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.SERIALMODE_INVALID;
            }
        }
        res = this._serialMode;
        return res;
    }

    /**
     * Changes the serial port communication parameters, with a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix can be added
     * to enable flow control: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @param newval {string} : a string corresponding to the serial port communication parameters, with a
     * string such as
     *         "9600,8N1"
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_serialMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('serialMode',rest_val);
    }

    /**
     * Retrieves a serial port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the serial port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSerialPort.isOnline() to test if the serial port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a serial port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the serial port
     *
     * @return {YSerialPort} a YSerialPort object allowing you to drive the serial port.
     */
    static FindSerialPort(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('SerialPort', func);
        if (obj == null) {
            obj = new YSerialPort(YAPI, func);
            YFunction._AddToCache('SerialPort',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a serial port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the serial port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSerialPort.isOnline() to test if the serial port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a serial port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the serial port
     *
     * @return {YSerialPort} a YSerialPort object allowing you to drive the serial port.
     */
    static FindSerialPortInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'SerialPort', func);
        if (obj == null) {
            obj = new YSerialPort(yctx, func);
            YFunction._AddToCache('SerialPort',  func, obj);
        }
        return obj;
    }

    async sendCommand(text)
    {
        return await this.set_command(text);
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reset()
    {
        this._rxptr = 0;
        this._rxbuffptr = 0;
        this._rxbuff = new Uint8Array(0);

        return await this.sendCommand('Z');
    }

    /**
     * Sends a single byte to the serial port.
     *
     * @param code {number} : the byte to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeByte(code)
    {
        return await this.sendCommand('$'+('00'+(code).toString(16)).slice(-2));
    }

    /**
     * Sends an ASCII string to the serial port, as is.
     *
     * @param text {string} : the text string to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeStr(text)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let ch;
        buff = this._yapi.imm_str2bin(text);
        bufflen = (buff).length;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = buff[idx];
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return await this.sendCommand('+'+text);
            }
        }
        // send string using file upload
        return await this._upload('txdata', buff);
    }

    /**
     * Sends a binary buffer to the serial port, as is.
     *
     * @param buff {Uint8Array} : the binary buffer to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeBin(buff)
    {
        return await this._upload('txdata', buff);
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the serial port.
     *
     * @param byteList {Integer[]} : a list of byte codes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeArray(byteList)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let hexb;
        /** @type {number} **/
        let res;
        bufflen = byteList.length;
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = byteList[idx];
            buff.set([hexb], idx);
            idx = idx + 1;
        }

        res = await this._upload('txdata', buff);
        return res;
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the serial port.
     *
     * @param hexString {string} : a string of hexadecimal byte codes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeHex(hexString)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let hexb;
        /** @type {number} **/
        let res;
        bufflen = (hexString).length;
        if (bufflen < 100) {
            return await this.sendCommand('$'+hexString);
        }
        bufflen = ((bufflen) >> (1));
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = parseInt((hexString).substr( 2 * idx, 2), 16);
            buff.set([hexb], idx);
            idx = idx + 1;
        }

        res = await this._upload('txdata', buff);
        return res;
    }

    /**
     * Sends an ASCII string to the serial port, followed by a line break (CR LF).
     *
     * @param text {string} : the text string to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeLine(text)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let ch;
        buff = this._yapi.imm_str2bin(text+'\r\n');
        bufflen = (buff).length-2;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = buff[idx];
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return await this.sendCommand('!'+text);
            }
        }
        // send string using file upload
        return await this._upload('txdata', buff);
    }

    /**
     * Reads one byte from the receive buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer,
     * or if there is no data available yet, the function returns YAPI.NO_MORE_DATA.
     *
     * @return {number} the next byte
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readByte()
    {
        /** @type {number} **/
        let currpos;
        /** @type {number} **/
        let reqlen;
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let mult;
        /** @type {number} **/
        let endpos;
        /** @type {number} **/
        let res;
        // first check if we have the requested character in the look-ahead buffer
        bufflen = (this._rxbuff).length;
        if ((this._rxptr >= this._rxbuffptr) && (this._rxptr < this._rxbuffptr+bufflen)) {
            res = this._rxbuff[this._rxptr-this._rxbuffptr];
            this._rxptr = this._rxptr + 1;
            return res;
        }
        // try to preload more than one byte to speed-up byte-per-byte access
        currpos = this._rxptr;
        reqlen = 1024;
        buff = await this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = buff[0];
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // mixed bidirectional data, retry with a smaller block
        this._rxptr = currpos;
        reqlen = 16;
        buff = await this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = buff[0];
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // still mixed, need to process character by character
        this._rxptr = currpos;

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len=1');
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        if (bufflen == 0) {
            return this._yapi.NO_MORE_DATA;
        }
        res = buff[0];
        return res;
    }

    /**
     * Reads data from the receive buffer as a string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of characters to read
     *
     * @return {string} a string with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readStr(nChars)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let mult;
        /** @type {number} **/
        let endpos;
        /** @type {string} **/
        let res;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len='+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = (this._yapi.imm_bin2str(buff)).substr( 0, bufflen);
        return res;
    }

    /**
     * Reads data from the receive buffer as a binary buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of bytes to read
     *
     * @return {Uint8Array} a binary object with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readBin(nChars)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let mult;
        /** @type {number} **/
        let endpos;
        /** @type {number} **/
        let idx;
        /** @type {Uint8Array} **/
        let res;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len='+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            res.set([buff[idx]], idx);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a list of bytes, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of bytes to read
     *
     * @return {Integer[]} a sequence of bytes with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readArray(nChars)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let mult;
        /** @type {number} **/
        let endpos;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let b;
        /** @type {number[]} **/
        let res = [];
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len='+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res.length = 0;
        idx = 0;
        while (idx < bufflen) {
            b = buff[idx];
            res.push(b);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a hexadecimal string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nBytes {number} : the maximum number of bytes to read
     *
     * @return {string} a string with receive buffer contents, encoded in hexadecimal
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readHex(nBytes)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let mult;
        /** @type {number} **/
        let endpos;
        /** @type {number} **/
        let ofs;
        /** @type {string} **/
        let res;
        if (nBytes > 65535) {
            nBytes = 65535;
        }

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len='+String(Math.round(nBytes)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = '';
        ofs = 0;
        while (ofs + 3 < bufflen) {
            res = res+''+('00'+(buff[ofs]).toString(16)).slice(-2)+''+('00'+(buff[ofs + 1]).toString(16)).slice(-2)+''+('00'+(buff[ofs + 2]).toString(16)).slice(-2)+''+('00'+(buff[ofs + 3]).toString(16)).slice(-2);
            ofs = ofs + 4;
        }
        while (ofs < bufflen) {
            res = res+''+('00'+(buff[ofs]).toString(16)).slice(-2);
            ofs = ofs + 1;
        }
        return res;
    }

    /**
     * Reads a single line (or message) from the receive buffer, starting at current stream position.
     * This function is intended to be used when the serial port is configured for a message protocol,
     * such as 'Line' mode or frame protocols.
     *
     * If data at current stream position is not available anymore in the receive buffer,
     * the function returns the oldest available line and moves the stream position just after.
     * If no new full line is received, the function returns an empty line.
     *
     * @return {string} a string with a single line of text
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readLine()
    {
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let msgbin;
        /** @type {string[]} **/
        let msgarr = [];
        /** @type {number} **/
        let msglen;
        /** @type {string} **/
        let res;

        url = 'rxmsg.json?pos='+String(Math.round(this._rxptr))+'&len=1&maxw=1';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this._yapi.imm_atoi(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[0]));
        return res;
    }

    /**
     * Searches for incoming messages in the serial port receive buffer matching a given pattern,
     * starting at current position. This function will only compare and return printable characters
     * in the message strings. Binary protocols are handled as hexadecimal strings.
     *
     * The search returns all messages matching the expression provided as argument in the buffer.
     * If no matching message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param pattern {string} : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait {number} : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return {string[]} an array of strings containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async readMessages(pattern,maxWait)
    {
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let msgbin;
        /** @type {string[]} **/
        let msgarr = [];
        /** @type {number} **/
        let msglen;
        /** @type {string[]} **/
        let res = [];
        /** @type {number} **/
        let idx;

        url = 'rxmsg.json?pos='+String(Math.round(this._rxptr))+'&maxw='+String(Math.round(maxWait))+'&pat='+pattern;
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this._yapi.imm_atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[idx])));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the API object
     * for the next read operations.
     *
     * @param absPos {number} : the absolute position index for next read operations.
     *
     * @return {number} nothing.
     */
    async read_seek(absPos)
    {
        this._rxptr = absPos;
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return {number} the absolute position index for next read operations.
     */
    async read_tell()
    {
        return this._rxptr;
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return {number} the number of bytes available to read
     */
    async read_avail()
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {number} **/
        let res;

        buff = await this._download('rxcnt.bin?pos='+String(Math.round(this._rxptr)));
        bufflen = (buff).length - 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            bufflen = bufflen - 1;
        }
        res = this._yapi.imm_atoi((this._yapi.imm_bin2str(buff)).substr( 0, bufflen));
        return res;
    }

    /**
     * Sends a text line query to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for 'Line' protocol.
     *
     * @param query {string} : the line query to send (without CR/LF)
     * @param maxWait {number} : the maximum number of milliseconds to wait for a reply.
     *
     * @return {string} the next text line received after sending the text query, as a string.
     *         Additional lines can be obtained by calling readLine or readMessages.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async queryLine(query,maxWait)
    {
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let msgbin;
        /** @type {string[]} **/
        let msgarr = [];
        /** @type {number} **/
        let msglen;
        /** @type {string} **/
        let res;

        url = 'rxmsg.json?len=1&maxw='+String(Math.round(maxWait))+'&cmd=!'+query;
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this._yapi.imm_atoi(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[0]));
        return res;
    }

    /**
     * Saves the job definition string (JSON data) into a job file.
     * The job file can be later enabled using selectJob().
     *
     * @param jobfile {string} : name of the job file to save on the device filesystem
     * @param jsonDef {string} : a string containing a JSON definition of the job
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async uploadJob(jobfile,jsonDef)
    {
        await this._upload(jobfile, this._yapi.imm_str2bin(jsonDef));
        return this._yapi.SUCCESS;
    }

    /**
     * Load and start processing the specified job file. The file must have
     * been previously created using the user interface or uploaded on the
     * device filesystem using the uploadJob() function.
     *
     * @param jobfile {string} : name of the job file (on the device filesystem)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectJob(jobfile)
    {
        return await this.set_currentJob(jobfile);
    }

    /**
     * Manually sets the state of the RTS line. This function has no effect when
     * hardware handshake is enabled, as the RTS line is driven automatically.
     *
     * @param val {number} : 1 to turn RTS on, 0 to turn RTS off
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_RTS(val)
    {
        return await this.sendCommand('R'+String(Math.round(val)));
    }

    /**
     * Reads the level of the CTS line. The CTS line is usually driven by
     * the RTS signal of the connected serial device.
     *
     * @return {number} 1 if the CTS line is high, 0 if the CTS line is low.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_CTS()
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let res;

        buff = await this._download('cts.txt');
        if (!((buff).length == 1)) {
            return this._throw(this._yapi.IO_ERROR,'invalid CTS reply',this._yapi.IO_ERROR);
        }
        res = buff[0] - 48;
        return res;
    }

    /**
     * Retrieves messages (both direction) in the serial port buffer, starting at current position.
     * This function will only compare and return printable characters in the message strings.
     * Binary protocols are handled as hexadecimal strings.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait {number} : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return {YSnoopingRecord[]} an array of YSnoopingRecord objects containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async snoopMessages(maxWait)
    {
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let msgbin;
        /** @type {string[]} **/
        let msgarr = [];
        /** @type {number} **/
        let msglen;
        /** @type {YSnoopingRecord[]} **/
        let res = [];
        /** @type {number} **/
        let idx;

        url = 'rxmsg.json?pos='+String(Math.round(this._rxptr))+'&maxw='+String(Math.round(maxWait))+'&t=0';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this._yapi.imm_atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(new YSnoopingRecord(msgarr[idx]));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Sends a MODBUS message (provided as a hexadecimal string) to the serial port.
     * The message must start with the slave address. The MODBUS CRC/LRC is
     * automatically added by the function. This function does not wait for a reply.
     *
     * @param hexString {string} : a hexadecimal message string, including device address but no CRC/LRC
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeMODBUS(hexString)
    {
        return await this.sendCommand(':'+hexString);
    }

    /**
     * Sends a message to a specified MODBUS slave connected to the serial port, and reads the
     * reply, if any. The message is the PDU, provided as a vector of bytes.
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduBytes {Integer[]} : the message to send (PDU), as a vector of bytes. The first byte of the
     *         PDU is the MODBUS function code.
     *
     * @return {Integer[]} the received reply, as a vector of bytes.
     *
     * On failure, throws an exception or returns an empty array (or a MODBUS error reply).
     */
    async queryMODBUS(slaveNo,pduBytes)
    {
        /** @type {number} **/
        let funCode;
        /** @type {number} **/
        let nib;
        /** @type {number} **/
        let i;
        /** @type {string} **/
        let cmd;
        /** @type {string} **/
        let url;
        /** @type {string} **/
        let pat;
        /** @type {Uint8Array} **/
        let msgs;
        /** @type {string[]} **/
        let reps = [];
        /** @type {string} **/
        let rep;
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let replen;
        /** @type {number} **/
        let hexb;
        funCode = pduBytes[0];
        nib = ((funCode) >> (4));
        pat = ('00'+(slaveNo).toString(16)).slice(-2)+'['+(nib).toString(16)+''+((nib+8)).toString(16)+']'+(((funCode) & (15))).toString(16)+'.*';
        cmd = ('00'+(slaveNo).toString(16)).slice(-2)+''+('00'+(funCode).toString(16)).slice(-2);
        i = 1;
        while (i < pduBytes.length) {
            cmd = cmd+''+('00'+(((pduBytes[i]) & (0xff))).toString(16)).slice(-2);
            i = i + 1;
        }

        url = 'rxmsg.json?cmd=:'+cmd+'&pat=:'+pat;
        msgs = await this._download(url);
        reps = this.imm_json_get_array(msgs);
        if (!(reps.length > 1)) {
            return this._throw(this._yapi.IO_ERROR,'no reply from slave',res);
        }
        if (reps.length > 1) {
            rep = this.imm_json_get_string(this._yapi.imm_str2bin(reps[0]));
            replen = (((rep).length - 3) >> (1));
            i = 0;
            while (i < replen) {
                hexb = parseInt((rep).substr(2 * i + 3, 2), 16);
                res.push(hexb);
                i = i + 1;
            }
            if (res[0] != funCode) {
                i = res[1];
                if (!(i > 1)) {
                    return this._throw(this._yapi.NOT_SUPPORTED,'MODBUS error: unsupported function code',res);
                }
                if (!(i > 2)) {
                    return this._throw(this._yapi.INVALID_ARGUMENT,'MODBUS error: illegal data address',res);
                }
                if (!(i > 3)) {
                    return this._throw(this._yapi.INVALID_ARGUMENT,'MODBUS error: illegal data value',res);
                }
                if (!(i > 4)) {
                    return this._throw(this._yapi.INVALID_ARGUMENT,'MODBUS error: failed to execute function',res);
                }
            }
        }
        return res;
    }

    /**
     * Reads one or more contiguous internal bits (or coil status) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x01 (Read Coils).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduAddr {number} : the relative address of the first bit/coil to read (zero-based)
     * @param nBits {number} : the number of bits/coils to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one bit.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusReadBits(slaveNo,pduAddr,nBits)
    {
        /** @type {number[]} **/
        let pdu = [];
        /** @type {number[]} **/
        let reply = [];
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let bitpos;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {number} **/
        let mask;
        pdu.push(0x01);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nBits) >> (8)));
        pdu.push(((nBits) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        bitpos = 0;
        idx = 2;
        val = reply[idx];
        mask = 1;
        while (bitpos < nBits) {
            if (((val) & (mask)) == 0) {
                res.push(0);
            } else {
                res.push(1);
            }
            bitpos = bitpos + 1;
            if (mask == 0x80) {
                idx = idx + 1;
                val = reply[idx];
                mask = 1;
            } else {
                mask = ((mask) << (1));
            }
        }
        return res;
    }

    /**
     * Reads one or more contiguous input bits (or discrete inputs) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x02 (Read Discrete Inputs).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduAddr {number} : the relative address of the first bit/input to read (zero-based)
     * @param nBits {number} : the number of bits/inputs to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one bit.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusReadInputBits(slaveNo,pduAddr,nBits)
    {
        /** @type {number[]} **/
        let pdu = [];
        /** @type {number[]} **/
        let reply = [];
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let bitpos;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {number} **/
        let mask;
        pdu.push(0x02);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nBits) >> (8)));
        pdu.push(((nBits) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        bitpos = 0;
        idx = 2;
        val = reply[idx];
        mask = 1;
        while (bitpos < nBits) {
            if (((val) & (mask)) == 0) {
                res.push(0);
            } else {
                res.push(1);
            }
            bitpos = bitpos + 1;
            if (mask == 0x80) {
                idx = idx + 1;
                val = reply[idx];
                mask = 1;
            } else {
                mask = ((mask) << (1));
            }
        }
        return res;
    }

    /**
     * Reads one or more contiguous internal registers (holding registers) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x03 (Read Holding Registers).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduAddr {number} : the relative address of the first holding register to read (zero-based)
     * @param nWords {number} : the number of holding registers to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one 16-bit register value.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusReadRegisters(slaveNo,pduAddr,nWords)
    {
        /** @type {number[]} **/
        let pdu = [];
        /** @type {number[]} **/
        let reply = [];
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let regpos;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        pdu.push(0x03);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nWords) >> (8)));
        pdu.push(((nWords) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        regpos = 0;
        idx = 2;
        while (regpos < nWords) {
            val = ((reply[idx]) << (8));
            idx = idx + 1;
            val = val + reply[idx];
            idx = idx + 1;
            res.push(val);
            regpos = regpos + 1;
        }
        return res;
    }

    /**
     * Reads one or more contiguous input registers (read-only registers) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x04 (Read Input Registers).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduAddr {number} : the relative address of the first input register to read (zero-based)
     * @param nWords {number} : the number of input registers to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one 16-bit input value.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusReadInputRegisters(slaveNo,pduAddr,nWords)
    {
        /** @type {number[]} **/
        let pdu = [];
        /** @type {number[]} **/
        let reply = [];
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let regpos;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        pdu.push(0x04);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nWords) >> (8)));
        pdu.push(((nWords) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        regpos = 0;
        idx = 2;
        while (regpos < nWords) {
            val = ((reply[idx]) << (8));
            idx = idx + 1;
            val = val + reply[idx];
            idx = idx + 1;
            res.push(val);
            regpos = regpos + 1;
        }
        return res;
    }

    /**
     * Sets a single internal bit (or coil) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x05 (Write Single Coil).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduAddr {number} : the relative address of the bit/coil to set (zero-based)
     * @param value {number} : the value to set (0 for OFF state, non-zero for ON state)
     *
     * @return {number} the number of bits/coils affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    async modbusWriteBit(slaveNo,pduAddr,value)
    {
        /** @type {number[]} **/
        let pdu = [];
        /** @type {number[]} **/
        let reply = [];
        /** @type {number} **/
        let res;
        res = 0;
        if (value != 0) {
            value = 0xff;
        }
        pdu.push(0x05);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(value);
        pdu.push(0x00);

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = 1;
        return res;
    }

    /**
     * Sets several contiguous internal bits (or coils) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x0f (Write Multiple Coils).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduAddr {number} : the relative address of the first bit/coil to set (zero-based)
     * @param bits {Integer[]} : the vector of bits to be set (one integer per bit)
     *
     * @return {number} the number of bits/coils affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    async modbusWriteBits(slaveNo,pduAddr,bits)
    {
        /** @type {number} **/
        let nBits;
        /** @type {number} **/
        let nBytes;
        /** @type {number} **/
        let bitpos;
        /** @type {number} **/
        let val;
        /** @type {number} **/
        let mask;
        /** @type {number[]} **/
        let pdu = [];
        /** @type {number[]} **/
        let reply = [];
        /** @type {number} **/
        let res;
        res = 0;
        nBits = bits.length;
        nBytes = (((nBits + 7)) >> (3));
        pdu.push(0x0f);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nBits) >> (8)));
        pdu.push(((nBits) & (0xff)));
        pdu.push(nBytes);
        bitpos = 0;
        val = 0;
        mask = 1;
        while (bitpos < nBits) {
            if (bits[bitpos] != 0) {
                val = ((val) | (mask));
            }
            bitpos = bitpos + 1;
            if (mask == 0x80) {
                pdu.push(val);
                val = 0;
                mask = 1;
            } else {
                mask = ((mask) << (1));
            }
        }
        if (mask != 1) {
            pdu.push(val);
        }

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = ((reply[3]) << (8));
        res = res + reply[4];
        return res;
    }

    /**
     * Sets a single internal register (or holding register) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x06 (Write Single Register).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduAddr {number} : the relative address of the register to set (zero-based)
     * @param value {number} : the 16 bit value to set
     *
     * @return {number} the number of registers affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    async modbusWriteRegister(slaveNo,pduAddr,value)
    {
        /** @type {number[]} **/
        let pdu = [];
        /** @type {number[]} **/
        let reply = [];
        /** @type {number} **/
        let res;
        res = 0;
        pdu.push(0x06);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((value) >> (8)));
        pdu.push(((value) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = 1;
        return res;
    }

    /**
     * Sets several contiguous internal registers (or holding registers) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x10 (Write Multiple Registers).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduAddr {number} : the relative address of the first internal register to set (zero-based)
     * @param values {Integer[]} : the vector of 16 bit values to set
     *
     * @return {number} the number of registers affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    async modbusWriteRegisters(slaveNo,pduAddr,values)
    {
        /** @type {number} **/
        let nWords;
        /** @type {number} **/
        let nBytes;
        /** @type {number} **/
        let regpos;
        /** @type {number} **/
        let val;
        /** @type {number[]} **/
        let pdu = [];
        /** @type {number[]} **/
        let reply = [];
        /** @type {number} **/
        let res;
        res = 0;
        nWords = values.length;
        nBytes = 2 * nWords;
        pdu.push(0x10);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nWords) >> (8)));
        pdu.push(((nWords) & (0xff)));
        pdu.push(nBytes);
        regpos = 0;
        while (regpos < nWords) {
            val = values[regpos];
            pdu.push(((val) >> (8)));
            pdu.push(((val) & (0xff)));
            regpos = regpos + 1;
        }

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = ((reply[3]) << (8));
        res = res + reply[4];
        return res;
    }

    /**
     * Sets several contiguous internal registers (holding registers) on a MODBUS serial device,
     * then performs a contiguous read of a set of (possibly different) internal registers.
     * This method uses the MODBUS function code 0x17 (Read/Write Multiple Registers).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduWriteAddr {number} : the relative address of the first internal register to set (zero-based)
     * @param values {Integer[]} : the vector of 16 bit values to set
     * @param pduReadAddr {number} : the relative address of the first internal register to read (zero-based)
     * @param nReadWords {number} : the number of 16 bit values to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one 16-bit register value read.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusWriteAndReadRegisters(slaveNo,pduWriteAddr,values,pduReadAddr,nReadWords)
    {
        /** @type {number} **/
        let nWriteWords;
        /** @type {number} **/
        let nBytes;
        /** @type {number} **/
        let regpos;
        /** @type {number} **/
        let val;
        /** @type {number} **/
        let idx;
        /** @type {number[]} **/
        let pdu = [];
        /** @type {number[]} **/
        let reply = [];
        /** @type {number[]} **/
        let res = [];
        nWriteWords = values.length;
        nBytes = 2 * nWriteWords;
        pdu.push(0x17);
        pdu.push(((pduReadAddr) >> (8)));
        pdu.push(((pduReadAddr) & (0xff)));
        pdu.push(((nReadWords) >> (8)));
        pdu.push(((nReadWords) & (0xff)));
        pdu.push(((pduWriteAddr) >> (8)));
        pdu.push(((pduWriteAddr) & (0xff)));
        pdu.push(((nWriteWords) >> (8)));
        pdu.push(((nWriteWords) & (0xff)));
        pdu.push(nBytes);
        regpos = 0;
        while (regpos < nWriteWords) {
            val = values[regpos];
            pdu.push(((val) >> (8)));
            pdu.push(((val) & (0xff)));
            regpos = regpos + 1;
        }

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        regpos = 0;
        idx = 2;
        while (regpos < nReadWords) {
            val = ((reply[idx]) << (8));
            idx = idx + 1;
            val = val + reply[idx];
            idx = idx + 1;
            res.push(val);
            regpos = regpos + 1;
        }
        return res;
    }

    /**
     * Continues the enumeration of serial ports started using yFirstSerialPort().
     *
     * @return {YSerialPort} a pointer to a YSerialPort object, corresponding to
     *         a serial port currently online, or a null pointer
     *         if there are no more serial ports to enumerate.
     */
    nextSerialPort()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSerialPort.FindSerialPortInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of serial ports currently accessible.
     * Use the method YSerialPort.nextSerialPort() to iterate on
     * next serial ports.
     *
     * @return {YSerialPort} a pointer to a YSerialPort object, corresponding to
     *         the first serial port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSerialPort()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('SerialPort');
        if(next_hwid == null) return null;
        return YSerialPort.FindSerialPort(next_hwid);
    }

    /**
     * Starts the enumeration of serial ports currently accessible.
     * Use the method YSerialPort.nextSerialPort() to iterate on
     * next serial ports.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YSerialPort} a pointer to a YSerialPort object, corresponding to
     *         the first serial port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSerialPortInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('SerialPort');
        if(next_hwid == null) return null;
        return YSerialPort.FindSerialPortInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            RXCOUNT_INVALID              : YAPI.INVALID_UINT,
            TXCOUNT_INVALID              : YAPI.INVALID_UINT,
            ERRCOUNT_INVALID             : YAPI.INVALID_UINT,
            RXMSGCOUNT_INVALID           : YAPI.INVALID_UINT,
            TXMSGCOUNT_INVALID           : YAPI.INVALID_UINT,
            LASTMSG_INVALID              : YAPI.INVALID_STRING,
            CURRENTJOB_INVALID           : YAPI.INVALID_STRING,
            STARTUPJOB_INVALID           : YAPI.INVALID_STRING,
            COMMAND_INVALID              : YAPI.INVALID_STRING,
            VOLTAGELEVEL_OFF             : 0,
            VOLTAGELEVEL_TTL3V           : 1,
            VOLTAGELEVEL_TTL3VR          : 2,
            VOLTAGELEVEL_TTL5V           : 3,
            VOLTAGELEVEL_TTL5VR          : 4,
            VOLTAGELEVEL_RS232           : 5,
            VOLTAGELEVEL_RS485           : 6,
            VOLTAGELEVEL_INVALID         : -1,
            PROTOCOL_INVALID             : YAPI.INVALID_STRING,
            SERIALMODE_INVALID           : YAPI.INVALID_STRING
        });
    }

    //--- (end of generated code: YSerialPort implementation)
}

//
// YSerialPortProxy Class: synchronous proxy to YSerialPort objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YSerialPort objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YSerialPortProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    async _asyncInit()
    {
        this.liveFunc._cachedCTS = await this.liveFunc.get_CTS();
        this.liveFunc._nextByte = YAPI.NO_MORE_DATA;
        this.liveFunc._nextStr = null;
        this.liveFunc._nextBin = null;
        this.liveFunc._nextArray = null;
        this.liveFunc._nextHex = null;
        this.liveFunc._nextLine = null;
        this.liveFunc._nextMessages = null;
        this.liveFunc._nextAvail = null;
    }

    /**
     * Reads one byte from the receive buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer,
     * or if there is no data available yet, the function returns YAPI.NO_MORE_DATA.
     *
     * @return {number} the next byte
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readByte()
    {
        let res = this.liveFunc._nextByte;
        if(res == YAPI.NO_MORE_DATA) {
            this.liveFunc.readByte().then((nextByte) => { this.liveFunc._nextByte = nextByte; });
        } else {
            this.liveFunc._nextByte = YAPI.NO_MORE_DATA;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of characters to read
     *
     * @return {string} a string with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readStr(nChars)
    {
        let res = this.liveFunc._nextStr;
        if(!res) {
            this.liveFunc.readStr(nChars).then((nextStr) => { this.liveFunc._nextStr = nextStr; });
            res = '';
        } else {
            this.liveFunc._nextStr = '';
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a binary buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of bytes to read
     *
     * @return {Uint8Array} a binary object with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readBin(nChars)
    {
        let res = this.liveFunc._nextBin;
        if(!res) {
            this.liveFunc.readBin(nChars).then((nextBin) => { this.liveFunc._nextBin = nextBin; });
            res = new Uint8Array(0);
        } else {
            this.liveFunc._nextBin = null;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a list of bytes, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of bytes to read
     *
     * @return {Integer[]} a sequence of bytes with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readArray(nChars)
    {
        let res = this.liveFunc._nextArray;
        if(!res) {
            this.liveFunc.readArray(nChars).then((nextArray) => { this.liveFunc._nextArray = nextArray; });
            res = [];
        } else {
            this.liveFunc._nextArray = null;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a hexadecimal string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nBytes {number} : the maximum number of bytes to read
     *
     * @return {string} a string with receive buffer contents, encoded in hexadecimal
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readHex(nBytes)
    {
        let res = this.liveFunc._nextHex;
        if(!res) {
            this.liveFunc.readHex(nBytes).then((nextHex) => { this.liveFunc._nextHex = nextHex; });
            res = '';
        } else {
            this.liveFunc._nextHex = null;
        }
        return res;
    }

    /**
     * Reads a single line (or message) from the receive buffer, starting at current stream position.
     * This function is intended to be used when the serial port is configured for a message protocol,
     * such as 'Line' mode or frame protocols.
     *
     * If data at current stream position is not available anymore in the receive buffer,
     * the function returns the oldest available line and moves the stream position just after.
     * If no new full line is received, the function returns an empty line.
     *
     * @return {string} a string with a single line of text
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readLine()
    {
        let res = this.liveFunc._nextLine;
        if(!res) {
            this.liveFunc.readLine().then((nextLine) => { this.liveFunc._nextLine = nextLine; });
            res = '';
        } else {
            this.liveFunc._nextLine = null;
        }
        return res;
    }

    /**
     * Searches for incoming messages in the serial port receive buffer matching a given pattern,
     * starting at current position. This function will only compare and return printable characters
     * in the message strings. Binary protocols are handled as hexadecimal strings.
     *
     * The search returns all messages matching the expression provided as argument in the buffer.
     * If no matching message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param pattern {string} : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait {number} : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return {string[]} an array of strings containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    readMessages(pattern,maxWait)
    {
        let res = this.liveFunc._nextMessages;
        if(!res) {
            this.liveFunc.readMessages(pattern,maxWait).then((nextMessages) => { this.liveFunc._nextMessages = nextMessages; });
            res = [];
        } else {
            this.liveFunc._nextMessages = null;
        }
        return res;
    }

    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the API object
     * for the next read operations.
     *
     * @param absPos {number} : the absolute position index for next read operations.
     *
     * @return {number} nothing.
     */
    read_seek(absPos)
    {
        this.liveFunc._rxptr = absPos;
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return {number} the absolute position index for next read operations.
     */
    read_tell()
    {
        return this.liveFunc._rxptr;
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return {number} the number of bytes available to read
     */
    read_avail()
    {
        let res = this.liveFunc._nextAvail;
        if(!res) {
            this.liveFunc.read_avail().then((nextAvail) => { this.liveFunc._nextAvail = nextAvail; });
            res = '';
        } else {
            this.liveFunc._nextAvail = null;
        }
        return res;
    }

    //--- (generated code: YSerialPort accessors declaration)

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns Y_RXCOUNT_INVALID.
     */
    get_rxCount()
    {
        return this.liveFunc._rxCount;
    }

    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns Y_TXCOUNT_INVALID.
     */
    get_txCount()
    {
        return this.liveFunc._txCount;
    }

    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns Y_ERRCOUNT_INVALID.
     */
    get_errCount()
    {
        return this.liveFunc._errCount;
    }

    /**
     * Returns the total number of messages received since last reset.
     *
     * @return an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns Y_RXMSGCOUNT_INVALID.
     */
    get_rxMsgCount()
    {
        return this.liveFunc._rxMsgCount;
    }

    /**
     * Returns the total number of messages send since last reset.
     *
     * @return an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns Y_TXMSGCOUNT_INVALID.
     */
    get_txMsgCount()
    {
        return this.liveFunc._txMsgCount;
    }

    /**
     * Returns the latest message fully received (for Line, Frame and Modbus protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line, Frame and Modbus protocols)
     *
     * On failure, throws an exception or returns Y_LASTMSG_INVALID.
     */
    get_lastMsg()
    {
        return this.liveFunc._lastMsg;
    }

    /**
     * Returns the name of the job file currently in use.
     *
     * @return a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns Y_CURRENTJOB_INVALID.
     */
    get_currentJob()
    {
        return this.liveFunc._currentJob;
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentJob(newval)
    {
        this.liveFunc.set_currentJob(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns Y_STARTUPJOB_INVALID.
     */
    get_startupJob()
    {
        return this.liveFunc._startupJob;
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_startupJob(newval)
    {
        this.liveFunc.set_startupJob(newval);
        return this._yapi.SUCCESS;
    }

    get_command()
    {
        return this.liveFunc._command;
    }

    set_command(newval)
    {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the voltage level used on the serial line.
     *
     * @return a value among Y_VOLTAGELEVEL_OFF, Y_VOLTAGELEVEL_TTL3V, Y_VOLTAGELEVEL_TTL3VR,
     * Y_VOLTAGELEVEL_TTL5V, Y_VOLTAGELEVEL_TTL5VR, Y_VOLTAGELEVEL_RS232 and Y_VOLTAGELEVEL_RS485
     * corresponding to the voltage level used on the serial line
     *
     * On failure, throws an exception or returns Y_VOLTAGELEVEL_INVALID.
     */
    get_voltageLevel()
    {
        return this.liveFunc._voltageLevel;
    }

    /**
     * Changes the voltage type used on the serial line. Valid
     * values  will depend on the Yoctopuce device model featuring
     * the serial port feature.  Check your device documentation
     * to find out which values are valid for that specific model.
     * Trying to set an invalid value will have no effect.
     *
     * @param newval : a value among Y_VOLTAGELEVEL_OFF, Y_VOLTAGELEVEL_TTL3V, Y_VOLTAGELEVEL_TTL3VR,
     * Y_VOLTAGELEVEL_TTL5V, Y_VOLTAGELEVEL_TTL5VR, Y_VOLTAGELEVEL_RS232 and Y_VOLTAGELEVEL_RS485
     * corresponding to the voltage type used on the serial line
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageLevel(newval)
    {
        this.liveFunc.set_voltageLevel(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Wiegand-ASCII" for Wiegand messages in ASCII mode,
     * "Wiegand-26","Wiegand-34", etc for Wiegand messages in byte mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns Y_PROTOCOL_INVALID.
     */
    get_protocol()
    {
        return this.liveFunc._protocol;
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Wiegand-ASCII" for Wiegand messages in ASCII mode,
     * "Wiegand-26","Wiegand-34", etc for Wiegand messages in byte mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each bytes sent.
     *
     * @param newval : a string corresponding to the type of protocol used over the serial line
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_protocol(newval)
    {
        this.liveFunc.set_protocol(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the serial port communication parameters, as a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix is included
     * if flow control is active: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @return a string corresponding to the serial port communication parameters, as a string such as
     *         "9600,8N1"
     *
     * On failure, throws an exception or returns Y_SERIALMODE_INVALID.
     */
    get_serialMode()
    {
        return this.liveFunc._serialMode;
    }

    /**
     * Changes the serial port communication parameters, with a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix can be added
     * to enable flow control: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @param newval : a string corresponding to the serial port communication parameters, with a string such as
     *         "9600,8N1"
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_serialMode(newval)
    {
        this.liveFunc.set_serialMode(newval);
        return this._yapi.SUCCESS;
    }

    sendCommand(text)
    {
        this.liveFunc.sendCommand(text);
        return YAPI_SUCCESS;
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset()
    {
        this.liveFunc.reset();
        return YAPI_SUCCESS;
    }

    /**
     * Sends a single byte to the serial port.
     *
     * @param code : the byte to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeByte(code)
    {
        this.liveFunc.writeByte(code);
        return YAPI_SUCCESS;
    }

    /**
     * Sends an ASCII string to the serial port, as is.
     *
     * @param text : the text string to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeStr(text)
    {
        this.liveFunc.writeStr(text);
        return YAPI_SUCCESS;
    }

    /**
     * Sends a binary buffer to the serial port, as is.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeBin(buff)
    {
        this.liveFunc.writeBin(buff);
        return YAPI_SUCCESS;
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the serial port.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeArray(byteList)
    {
        this.liveFunc.writeArray(byteList);
        return YAPI_SUCCESS;
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the serial port.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeHex(hexString)
    {
        this.liveFunc.writeHex(hexString);
        return YAPI_SUCCESS;
    }

    /**
     * Sends an ASCII string to the serial port, followed by a line break (CR LF).
     *
     * @param text : the text string to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeLine(text)
    {
        this.liveFunc.writeLine(text);
        return YAPI_SUCCESS;
    }

    /**
     * Saves the job definition string (JSON data) into a job file.
     * The job file can be later enabled using selectJob().
     *
     * @param jobfile : name of the job file to save on the device filesystem
     * @param jsonDef : a string containing a JSON definition of the job
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    uploadJob(jobfile,jsonDef)
    {
        this.liveFunc.uploadJob(jobfile, jsonDef);
        return YAPI_SUCCESS;
    }

    /**
     * Load and start processing the specified job file. The file must have
     * been previously created using the user interface or uploaded on the
     * device filesystem using the uploadJob() function.
     *
     * @param jobfile : name of the job file (on the device filesystem)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    selectJob(jobfile)
    {
        this.liveFunc.selectJob(jobfile);
        return YAPI_SUCCESS;
    }

    /**
     * Manually sets the state of the RTS line. This function has no effect when
     * hardware handshake is enabled, as the RTS line is driven automatically.
     *
     * @param val : 1 to turn RTS on, 0 to turn RTS off
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_RTS(val)
    {
        this.liveFunc.set_RTS(val);
        return YAPI_SUCCESS;
    }

    /**
     * Reads the level of the CTS line. The CTS line is usually driven by
     * the RTS signal of the connected serial device.
     *
     * @return 1 if the CTS line is high, 0 if the CTS line is low.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    get_CTS()
    {
        this.liveFunc.get_CTS();
        return YAPI_SUCCESS;
    }

    /**
     * Sends a MODBUS message (provided as a hexadecimal string) to the serial port.
     * The message must start with the slave address. The MODBUS CRC/LRC is
     * automatically added by the function. This function does not wait for a reply.
     *
     * @param hexString : a hexadecimal message string, including device address but no CRC/LRC
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeMODBUS(hexString)
    {
        this.liveFunc.writeMODBUS(hexString);
        return YAPI_SUCCESS;
    }

    /**
     * Sets a single internal bit (or coil) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x05 (Write Single Coil).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the bit/coil to set (zero-based)
     * @param value : the value to set (0 for OFF state, non-zero for ON state)
     *
     * @return the number of bits/coils affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteBit(slaveNo,pduAddr,value)
    {
        this.liveFunc.modbusWriteBit(slaveNo, pduAddr, value);
        return YAPI_SUCCESS;
    }

    /**
     * Sets several contiguous internal bits (or coils) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x0f (Write Multiple Coils).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the first bit/coil to set (zero-based)
     * @param bits : the vector of bits to be set (one integer per bit)
     *
     * @return the number of bits/coils affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteBits(slaveNo,pduAddr,bits)
    {
        this.liveFunc.modbusWriteBits(slaveNo, pduAddr, bits);
        return YAPI_SUCCESS;
    }

    /**
     * Sets a single internal register (or holding register) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x06 (Write Single Register).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the register to set (zero-based)
     * @param value : the 16 bit value to set
     *
     * @return the number of registers affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteRegister(slaveNo,pduAddr,value)
    {
        this.liveFunc.modbusWriteRegister(slaveNo, pduAddr, value);
        return YAPI_SUCCESS;
    }

    /**
     * Sets several contiguous internal registers (or holding registers) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x10 (Write Multiple Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the first internal register to set (zero-based)
     * @param values : the vector of 16 bit values to set
     *
     * @return the number of registers affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteRegisters(slaveNo,pduAddr,values)
    {
        this.liveFunc.modbusWriteRegisters(slaveNo, pduAddr, values);
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YSerialPort accessors declaration)
}

//--- (generated code: YSerialPort functions)

YoctoLibExport('YSerialPort', YSerialPort);
YoctoLibExport('YSerialPortProxy', YSerialPortProxy);
YSerialPort.imm_Init();

//--- (end of generated code: YSerialPort functions)
