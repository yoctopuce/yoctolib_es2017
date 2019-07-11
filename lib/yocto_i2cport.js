/*********************************************************************
 *
 *  $Id: yocto_i2cport.js 36207 2019-07-10 20:46:18Z mvuilleu $
 *
 *  Implements the high-level API for I2cPort functions
 *
 *  - - - - - - - - - License information: - - - - - - - - -
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

//--- (generated code: YI2cPort return codes)
//--- (end of generated code: YI2cPort return codes)
//--- (generated code: YI2cPort definitions)
//--- (end of generated code: YI2cPort definitions)

//--- (generated code: YI2cPort class start)
/**
 * YI2cPort Class: I2C Port function interface
 *
 * The I2cPort function interface allows you to fully drive a Yoctopuce
 * I2C port, to send and receive data, and to configure communication
 * parameters (baud rate, etc).
 * Note that Yoctopuce I2C ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YI2cPort class start)

class YI2cPort extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (generated code: YI2cPort constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'I2cPort';
        /** @member {number} **/
        this._rxCount                    = YI2cPort.RXCOUNT_INVALID;
        /** @member {number} **/
        this._txCount                    = YI2cPort.TXCOUNT_INVALID;
        /** @member {number} **/
        this._errCount                   = YI2cPort.ERRCOUNT_INVALID;
        /** @member {number} **/
        this._rxMsgCount                 = YI2cPort.RXMSGCOUNT_INVALID;
        /** @member {number} **/
        this._txMsgCount                 = YI2cPort.TXMSGCOUNT_INVALID;
        /** @member {string} **/
        this._lastMsg                    = YI2cPort.LASTMSG_INVALID;
        /** @member {string} **/
        this._currentJob                 = YI2cPort.CURRENTJOB_INVALID;
        /** @member {string} **/
        this._startupJob                 = YI2cPort.STARTUPJOB_INVALID;
        /** @member {string} **/
        this._command                    = YI2cPort.COMMAND_INVALID;
        /** @member {number} **/
        this._voltageLevel               = YI2cPort.VOLTAGELEVEL_INVALID;
        /** @member {string} **/
        this._protocol                   = YI2cPort.PROTOCOL_INVALID;
        /** @member {string} **/
        this._i2cMode                    = YI2cPort.I2CMODE_INVALID;
        /** @member {number} **/
        this._rxptr                      = 0;
        /** @member {Uint8Array} **/
        this._rxbuff                     = new Uint8Array(0);
        /** @member {number} **/
        this._rxbuffptr                  = 0;
        //--- (end of generated code: YI2cPort constructor)
    }

    //--- (generated code: YI2cPort implementation)

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
        case 'i2cMode':
            this._i2cMode = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return {number} an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YI2cPort.RXCOUNT_INVALID.
     */
    async get_rxCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.RXCOUNT_INVALID;
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
     * On failure, throws an exception or returns YI2cPort.TXCOUNT_INVALID.
     */
    async get_txCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.TXCOUNT_INVALID;
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
     * On failure, throws an exception or returns YI2cPort.ERRCOUNT_INVALID.
     */
    async get_errCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.ERRCOUNT_INVALID;
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
     * On failure, throws an exception or returns YI2cPort.RXMSGCOUNT_INVALID.
     */
    async get_rxMsgCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.RXMSGCOUNT_INVALID;
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
     * On failure, throws an exception or returns YI2cPort.TXMSGCOUNT_INVALID.
     */
    async get_txMsgCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.TXMSGCOUNT_INVALID;
            }
        }
        res = this._txMsgCount;
        return res;
    }

    /**
     * Returns the latest message fully received (for Line and Frame protocols).
     *
     * @return {string} a string corresponding to the latest message fully received (for Line and Frame protocols)
     *
     * On failure, throws an exception or returns YI2cPort.LASTMSG_INVALID.
     */
    async get_lastMsg()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.LASTMSG_INVALID;
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
     * On failure, throws an exception or returns YI2cPort.CURRENTJOB_INVALID.
     */
    async get_currentJob()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.CURRENTJOB_INVALID;
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
     * On failure, throws an exception or returns YI2cPort.STARTUPJOB_INVALID.
     */
    async get_startupJob()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.STARTUPJOB_INVALID;
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
                return YI2cPort.COMMAND_INVALID;
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
     * @return {number} a value among YI2cPort.VOLTAGELEVEL_OFF, YI2cPort.VOLTAGELEVEL_TTL3V,
     * YI2cPort.VOLTAGELEVEL_TTL3VR, YI2cPort.VOLTAGELEVEL_TTL5V, YI2cPort.VOLTAGELEVEL_TTL5VR,
     * YI2cPort.VOLTAGELEVEL_RS232, YI2cPort.VOLTAGELEVEL_RS485 and YI2cPort.VOLTAGELEVEL_TTL1V8
     * corresponding to the voltage level used on the serial line
     *
     * On failure, throws an exception or returns YI2cPort.VOLTAGELEVEL_INVALID.
     */
    async get_voltageLevel()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.VOLTAGELEVEL_INVALID;
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
     * @param newval {number} : a value among YI2cPort.VOLTAGELEVEL_OFF, YI2cPort.VOLTAGELEVEL_TTL3V,
     * YI2cPort.VOLTAGELEVEL_TTL3VR, YI2cPort.VOLTAGELEVEL_TTL5V, YI2cPort.VOLTAGELEVEL_TTL5VR,
     * YI2cPort.VOLTAGELEVEL_RS232, YI2cPort.VOLTAGELEVEL_RS485 and YI2cPort.VOLTAGELEVEL_TTL1V8
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
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     *
     * @return {string} a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YI2cPort.PROTOCOL_INVALID.
     */
    async get_protocol()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.PROTOCOL_INVALID;
            }
        }
        res = this._protocol;
        return res;
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each message sent.
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
     * Returns the SPI port communication parameters, as a string such as
     * "400kbps,2000ms". The string includes the baud rate and  th  e recovery delay
     * after communications errors.
     *
     * @return {string} a string corresponding to the SPI port communication parameters, as a string such as
     *         "400kbps,2000ms"
     *
     * On failure, throws an exception or returns YI2cPort.I2CMODE_INVALID.
     */
    async get_i2cMode()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.I2CMODE_INVALID;
            }
        }
        res = this._i2cMode;
        return res;
    }

    /**
     * Changes the SPI port communication parameters, with a string such as
     * "400kbps,2000ms". The string includes the baud rate and the recovery delay
     * after communications errors.
     *
     * @param newval {string} : a string corresponding to the SPI port communication parameters, with a string such as
     *         "400kbps,2000ms"
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_i2cMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('i2cMode',rest_val);
    }

    /**
     * Retrieves an I2C port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the I2C port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YI2cPort.isOnline() to test if the I2C port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an I2C port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the I2C port
     *
     * @return {YI2cPort} a YI2cPort object allowing you to drive the I2C port.
     */
    static FindI2cPort(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('I2cPort', func);
        if (obj == null) {
            obj = new YI2cPort(YAPI, func);
            YFunction._AddToCache('I2cPort',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an I2C port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the I2C port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YI2cPort.isOnline() to test if the I2C port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an I2C port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the I2C port
     *
     * @return {YI2cPort} a YI2cPort object allowing you to drive the I2C port.
     */
    static FindI2cPortInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'I2cPort', func);
        if (obj == null) {
            obj = new YI2cPort(yctx, func);
            YFunction._AddToCache('I2cPort',  func, obj);
        }
        return obj;
    }

    async sendCommand(text)
    {
        return await this.set_command(text);
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
     * @return a string with a single line of text
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
     * @param pattern : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of strings containing the messages found, if any.
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
     * @param absPos : the absolute position index for next read operations.
     *
     * @return nothing.
     */
    async read_seek(absPos)
    {
        this._rxptr = absPos;
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return the absolute position index for next read operations.
     */
    async read_tell()
    {
        return this._rxptr;
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return the number of bytes available to read
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
     * @param query : the line query to send (without CR/LF)
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next text line received after sending the text query, as a string.
     *         Additional lines can be obtained by calling readLine or readMessages.
     *
     * On failure, throws an exception or returns an empty string.
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

        url = 'rxmsg.json?len=1&maxw='+String(Math.round(maxWait))+'&cmd=!'+this.imm_escapeAttr(query);
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
     * @param jobfile : name of the job file to save on the device filesystem
     * @param jsonDef : a string containing a JSON definition of the job
     *
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @param jobfile : name of the job file (on the device filesystem)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectJob(jobfile)
    {
        return await this.set_currentJob(jobfile);
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
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
     * Sends a one-way message (provided as a a binary buffer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param buff : the binary buffer to be sent
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async i2cSendBin(slaveAddr,buff)
    {
        /** @type {number} **/
        let nBytes;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {string} **/
        let msg;
        /** @type {string} **/
        let reply;
        msg = '@'+('00'+(slaveAddr).toString(16)).slice(-2).toLowerCase()+':';
        nBytes = (buff).length;
        idx = 0;
        while (idx < nBytes) {
            val = buff[idx];
            msg = msg+''+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }

        reply = await this.queryLine(msg, 1000);
        if (!((reply).length > 0)) {
            return this._throw(this._yapi.IO_ERROR,'no response from device',this._yapi.IO_ERROR);
        }
        idx = (reply).indexOf('[N]!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR,'No ACK received',this._yapi.IO_ERROR);
        }
        idx = (reply).indexOf('!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR,'Protocol error',this._yapi.IO_ERROR);
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Sends a one-way message (provided as a list of integer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param values : a list of data bytes to be sent
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async i2cSendArray(slaveAddr,values)
    {
        /** @type {number} **/
        let nBytes;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {string} **/
        let msg;
        /** @type {string} **/
        let reply;
        msg = '@'+('00'+(slaveAddr).toString(16)).slice(-2).toLowerCase()+':';
        nBytes = values.length;
        idx = 0;
        while (idx < nBytes) {
            val = values[idx];
            msg = msg+''+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }

        reply = await this.queryLine(msg, 1000);
        if (!((reply).length > 0)) {
            return this._throw(this._yapi.IO_ERROR,'no response from device',this._yapi.IO_ERROR);
        }
        idx = (reply).indexOf('[N]!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR,'No ACK received',this._yapi.IO_ERROR);
        }
        idx = (reply).indexOf('!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR,'Protocol error',this._yapi.IO_ERROR);
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Sends a one-way message (provided as a a binary buffer) to a device on the I2C bus,
     * then read back the specified number of bytes from device.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param buff : the binary buffer to be sent
     * @param rcvCount : the number of bytes to receive once the data bytes are sent
     *
     * @return a list of bytes with the data received from slave device.
     *
     * On failure, throws an exception or returns an empty binary buffer.
     */
    async i2cSendAndReceiveBin(slaveAddr,buff,rcvCount)
    {
        /** @type {number} **/
        let nBytes;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {string} **/
        let msg;
        /** @type {string} **/
        let reply;
        /** @type {Uint8Array} **/
        let rcvbytes;
        msg = '@'+('00'+(slaveAddr).toString(16)).slice(-2).toLowerCase()+':';
        nBytes = (buff).length;
        idx = 0;
        while (idx < nBytes) {
            val = buff[idx];
            msg = msg+''+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        idx = 0;
        while (idx < rcvCount) {
            msg = msg+'xx';
            idx = idx + 1;
        }

        reply = await this.queryLine(msg, 1000);
        rcvbytes = new Uint8Array(0);
        if (!((reply).length > 0)) {
            return this._throw(this._yapi.IO_ERROR,'no response from device',rcvbytes);
        }
        idx = (reply).indexOf('[N]!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR,'No ACK received',rcvbytes);
        }
        idx = (reply).indexOf('!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR,'Protocol error',rcvbytes);
        }
        reply = (reply).substr( (reply).length-2*rcvCount, 2*rcvCount);
        rcvbytes = this._yapi.imm_hexstr2bin(reply);
        return rcvbytes;
    }

    /**
     * Sends a one-way message (provided as a list of integer) to a device on the I2C bus,
     * then read back the specified number of bytes from device.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param values : a list of data bytes to be sent
     * @param rcvCount : the number of bytes to receive once the data bytes are sent
     *
     * @return a list of bytes with the data received from slave device.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async i2cSendAndReceiveArray(slaveAddr,values,rcvCount)
    {
        /** @type {number} **/
        let nBytes;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {string} **/
        let msg;
        /** @type {string} **/
        let reply;
        /** @type {Uint8Array} **/
        let rcvbytes;
        /** @type {number[]} **/
        let res = [];
        msg = '@'+('00'+(slaveAddr).toString(16)).slice(-2).toLowerCase()+':';
        nBytes = values.length;
        idx = 0;
        while (idx < nBytes) {
            val = values[idx];
            msg = msg+''+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        idx = 0;
        while (idx < rcvCount) {
            msg = msg+'xx';
            idx = idx + 1;
        }

        reply = await this.queryLine(msg, 1000);
        if (!((reply).length > 0)) {
            return this._throw(this._yapi.IO_ERROR,'no response from device',res);
        }
        idx = (reply).indexOf('[N]!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR,'No ACK received',res);
        }
        idx = (reply).indexOf('!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR,'Protocol error',res);
        }
        reply = (reply).substr( (reply).length-2*rcvCount, 2*rcvCount);
        rcvbytes = this._yapi.imm_hexstr2bin(reply);
        res.length = 0;
        idx = 0;
        while (idx < rcvCount) {
            val = rcvbytes[idx];
            res.push(val);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Sends a text-encoded I2C code stream to the I2C bus, as is.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * If a newline ("\n") is included in the stream, the message
     * will be terminated and a newline will also be added to the
     * receive stream.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeStr(codes)
    {
        /** @type {number} **/
        let bufflen;
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let ch;
        buff = this._yapi.imm_str2bin(codes);
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
                return await this.sendCommand('+'+codes);
            }
        }
        // send string using file upload
        return await this._upload('txdata', buff);
    }

    /**
     * Sends a text-encoded I2C code stream to the I2C bus, and terminate
     * the message en relâchant le bus.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * At the end of the stream, a stop condition is added if missing
     * and a newline is added to the receive buffer as well.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeLine(codes)
    {
        /** @type {number} **/
        let bufflen;
        /** @type {Uint8Array} **/
        let buff;
        bufflen = (codes).length;
        if (bufflen < 100) {
            return await this.sendCommand('!'+codes);
        }
        // send string using file upload
        buff = this._yapi.imm_str2bin(codes+'\n');
        return await this._upload('txdata', buff);
    }

    /**
     * Sends a single byte to the I2C bus. Depending on the I2C bus state, the byte
     * will be interpreted as an address byte or a data byte.
     *
     * @param code : the byte to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeByte(code)
    {
        return await this.sendCommand('+'+('00'+(code).toString(16)).slice(-2).toUpperCase());
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeHex(hexString)
    {
        /** @type {number} **/
        let bufflen;
        /** @type {Uint8Array} **/
        let buff;
        bufflen = (hexString).length;
        if (bufflen < 100) {
            return await this.sendCommand('+'+hexString);
        }
        buff = this._yapi.imm_str2bin(hexString);

        return await this._upload('txdata', buff);
    }

    /**
     * Sends a binary buffer to the I2C bus, as is.
     * Depending on the I2C bus state, the first byte will be interpreted
     * as an address byte or a data byte.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeBin(buff)
    {
        /** @type {number} **/
        let nBytes;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {string} **/
        let msg;
        msg = '';
        nBytes = (buff).length;
        idx = 0;
        while (idx < nBytes) {
            val = buff[idx];
            msg = msg+''+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }

        return await this.writeHex(msg);
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeArray(byteList)
    {
        /** @type {number} **/
        let nBytes;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {string} **/
        let msg;
        msg = '';
        nBytes = byteList.length;
        idx = 0;
        while (idx < nBytes) {
            val = byteList[idx];
            msg = msg+''+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }

        return await this.writeHex(msg);
    }

    /**
     * Continues the enumeration of I2C ports started using yFirstI2cPort().
     * Caution: You can't make any assumption about the returned I2C ports order.
     * If you want to find a specific an I2C port, use I2cPort.findI2cPort()
     * and a hardwareID or a logical name.
     *
     * @return {YI2cPort} a pointer to a YI2cPort object, corresponding to
     *         an I2C port currently online, or a null pointer
     *         if there are no more I2C ports to enumerate.
     */
    nextI2cPort()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YI2cPort.FindI2cPortInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of I2C ports currently accessible.
     * Use the method YI2cPort.nextI2cPort() to iterate on
     * next I2C ports.
     *
     * @return {YI2cPort} a pointer to a YI2cPort object, corresponding to
     *         the first I2C port currently online, or a null pointer
     *         if there are none.
     */
    static FirstI2cPort()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('I2cPort');
        if(next_hwid == null) return null;
        return YI2cPort.FindI2cPort(next_hwid);
    }

    /**
     * Starts the enumeration of I2C ports currently accessible.
     * Use the method YI2cPort.nextI2cPort() to iterate on
     * next I2C ports.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YI2cPort} a pointer to a YI2cPort object, corresponding to
     *         the first I2C port currently online, or a null pointer
     *         if there are none.
     */
    static FirstI2cPortInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('I2cPort');
        if(next_hwid == null) return null;
        return YI2cPort.FindI2cPortInContext(yctx, next_hwid);
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
            VOLTAGELEVEL_TTL1V8          : 7,
            VOLTAGELEVEL_INVALID         : -1,
            PROTOCOL_INVALID             : YAPI.INVALID_STRING,
            I2CMODE_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of generated code: YI2cPort implementation)
}

//
// YI2cPortProxy Class: synchronous proxy to YI2cPort objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YI2cPort objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YI2cPortProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    async _asyncInit()
    {
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

    //--- (generated code: YI2cPort accessors declaration)

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
     * Returns the latest message fully received (for Line and Frame protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line and Frame protocols)
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
     * Y_VOLTAGELEVEL_TTL5V, Y_VOLTAGELEVEL_TTL5VR, Y_VOLTAGELEVEL_RS232, Y_VOLTAGELEVEL_RS485 and
     * Y_VOLTAGELEVEL_TTL1V8 corresponding to the voltage level used on the serial line
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
     * Y_VOLTAGELEVEL_TTL5V, Y_VOLTAGELEVEL_TTL5VR, Y_VOLTAGELEVEL_RS232, Y_VOLTAGELEVEL_RS485 and
     * Y_VOLTAGELEVEL_TTL1V8 corresponding to the voltage type used on the serial line
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
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
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
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each message sent.
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
     * Returns the SPI port communication parameters, as a string such as
     * "400kbps,2000ms". The string includes the baud rate and  th  e recovery delay
     * after communications errors.
     *
     * @return a string corresponding to the SPI port communication parameters, as a string such as
     *         "400kbps,2000ms"
     *
     * On failure, throws an exception or returns Y_I2CMODE_INVALID.
     */
    get_i2cMode()
    {
        return this.liveFunc._i2cMode;
    }

    /**
     * Changes the SPI port communication parameters, with a string such as
     * "400kbps,2000ms". The string includes the baud rate and the recovery delay
     * after communications errors.
     *
     * @param newval : a string corresponding to the SPI port communication parameters, with a string such as
     *         "400kbps,2000ms"
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_i2cMode(newval)
    {
        this.liveFunc.set_i2cMode(newval);
        return this._yapi.SUCCESS;
    }

    sendCommand(text)
    {
        this.liveFunc.sendCommand(text);
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
     * Sends a one-way message (provided as a a binary buffer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param buff : the binary buffer to be sent
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    i2cSendBin(slaveAddr,buff)
    {
        this.liveFunc.i2cSendBin(slaveAddr, buff);
        return YAPI_SUCCESS;
    }

    /**
     * Sends a one-way message (provided as a list of integer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param values : a list of data bytes to be sent
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    i2cSendArray(slaveAddr,values)
    {
        this.liveFunc.i2cSendArray(slaveAddr, values);
        return YAPI_SUCCESS;
    }

    /**
     * Sends a text-encoded I2C code stream to the I2C bus, as is.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * If a newline ("\n") is included in the stream, the message
     * will be terminated and a newline will also be added to the
     * receive stream.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeStr(codes)
    {
        this.liveFunc.writeStr(codes);
        return YAPI_SUCCESS;
    }

    /**
     * Sends a text-encoded I2C code stream to the I2C bus, and terminate
     * the message en relâchant le bus.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * At the end of the stream, a stop condition is added if missing
     * and a newline is added to the receive buffer as well.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeLine(codes)
    {
        this.liveFunc.writeLine(codes);
        return YAPI_SUCCESS;
    }

    /**
     * Sends a single byte to the I2C bus. Depending on the I2C bus state, the byte
     * will be interpreted as an address byte or a data byte.
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
     * Sends a byte sequence (provided as a hexadecimal string) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
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
     * Sends a binary buffer to the I2C bus, as is.
     * Depending on the I2C bus state, the first byte will be interpreted
     * as an address byte or a data byte.
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
     * Sends a byte sequence (provided as a list of bytes) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
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
    //--- (end of generated code: YI2cPort accessors declaration)
}

//--- (generated code: YI2cPort functions)

YoctoLibExport('YI2cPort', YI2cPort);
YoctoLibExport('YI2cPortProxy', YI2cPortProxy);
YI2cPort.imm_Init();

//--- (end of generated code: YI2cPort functions)
