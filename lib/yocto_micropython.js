/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for MicroPython functions
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

//--- (generated code: YMicroPython return codes)
//--- (end of generated code: YMicroPython return codes)
//--- (generated code: YMicroPython definitions)
//--- (end of generated code: YMicroPython definitions)

async function yInternalEventCallback(YMicroPython_obj, str_value)
{
    await YMicroPython_obj._internalEventHandler(str_value);
}

//--- (generated code: YMicroPython class start)
/**
 * YMicroPython Class: MicroPython interpreter control interface
 *
 * The YMicroPython class provides control of the MicroPython interpreter
 * that can be found on some Yoctopuce devices.
 */
//--- (end of generated code: YMicroPython class start)

class YMicroPython extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (generated code: YMicroPython constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'MicroPython';
        /** @member {string} **/
        this._lastMsg                    = YMicroPython.LASTMSG_INVALID;
        /** @member {number} **/
        this._heapUsage                  = YMicroPython.HEAPUSAGE_INVALID;
        /** @member {number} **/
        this._heapFrag                   = YMicroPython.HEAPFRAG_INVALID;
        /** @member {number} **/
        this._xheapUsage                 = YMicroPython.XHEAPUSAGE_INVALID;
        /** @member {number} **/
        this._stackUsage                 = YMicroPython.STACKUSAGE_INVALID;
        /** @member {string} **/
        this._currentScript              = YMicroPython.CURRENTSCRIPT_INVALID;
        /** @member {string} **/
        this._startupScript              = YMicroPython.STARTUPSCRIPT_INVALID;
        /** @member {number} **/
        this._startupDelay               = YMicroPython.STARTUPDELAY_INVALID;
        /** @member {number} **/
        this._debugMode                  = YMicroPython.DEBUGMODE_INVALID;
        /** @member {string} **/
        this._command                    = YMicroPython.COMMAND_INVALID;
        /** @member {function} **/
        this._logCallback                = null;
        /** @member {boolean} **/
        this._isFirstCb                  = 0;
        /** @member {number} **/
        this._prevCbPos                  = 0;
        /** @member {number} **/
        this._logPos                     = 0;
        /** @member {string} **/
        this._prevPartialLog             = '';
        //--- (end of generated code: YMicroPython constructor)
    }

    //--- (generated code: YMicroPython implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'lastMsg':
            this._lastMsg = val;
            return 1;
        case 'heapUsage':
            this._heapUsage = parseInt(val);
            return 1;
        case 'heapFrag':
            this._heapFrag = parseInt(val);
            return 1;
        case 'xheapUsage':
            this._xheapUsage = parseInt(val);
            return 1;
        case 'stackUsage':
            this._stackUsage = parseInt(val);
            return 1;
        case 'currentScript':
            this._currentScript = val;
            return 1;
        case 'startupScript':
            this._startupScript = val;
            return 1;
        case 'startupDelay':
            this._startupDelay = Math.round(val / 65.536) / 1000.0;
            return 1;
        case 'debugMode':
            this._debugMode = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the last message produced by a python script.
     *
     * @return {Promise<string>} a string corresponding to the last message produced by a python script
     *
     * On failure, throws an exception or returns YMicroPython.LASTMSG_INVALID.
     */
    async get_lastMsg()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.LASTMSG_INVALID;
            }
        }
        res = this._lastMsg;
        return res;
    }

    /**
     * Returns the percentage of MicroPython main memory in use,
     * as observed at the end of the last garbage collection.
     *
     * @return {Promise<number>} an integer corresponding to the percentage of MicroPython main memory in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.HEAPUSAGE_INVALID.
     */
    async get_heapUsage()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.HEAPUSAGE_INVALID;
            }
        }
        res = this._heapUsage;
        return res;
    }

    /**
     * Returns the fragmentation ratio of MicroPython main memory,
     * as observed at the end of the last garbage collection.
     *
     * @return {Promise<number>} an integer corresponding to the fragmentation ratio of MicroPython main memory,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.HEAPFRAG_INVALID.
     */
    async get_heapFrag()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.HEAPFRAG_INVALID;
            }
        }
        res = this._heapFrag;
        return res;
    }

    /**
     * Returns the percentage of MicroPython external memory in use,
     * as observed at the end of the last garbage collection.
     *
     * @return {Promise<number>} an integer corresponding to the percentage of MicroPython external memory in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.XHEAPUSAGE_INVALID.
     */
    async get_xheapUsage()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.XHEAPUSAGE_INVALID;
            }
        }
        res = this._xheapUsage;
        return res;
    }

    /**
     * Returns the maximum percentage of MicroPython call stack in use,
     * as observed at the end of the last garbage collection.
     *
     * @return {Promise<number>} an integer corresponding to the maximum percentage of MicroPython call stack in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.STACKUSAGE_INVALID.
     */
    async get_stackUsage()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.STACKUSAGE_INVALID;
            }
        }
        res = this._stackUsage;
        return res;
    }

    /**
     * Returns the name of currently active script, if any.
     *
     * @return {Promise<string>} a string corresponding to the name of currently active script, if any
     *
     * On failure, throws an exception or returns YMicroPython.CURRENTSCRIPT_INVALID.
     */
    async get_currentScript()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.CURRENTSCRIPT_INVALID;
            }
        }
        res = this._currentScript;
        return res;
    }

    /**
     * Stops current running script, and/or selects a script to run immediately in a
     * fresh new environment. If the MicroPython interpreter is busy running a script,
     * this function will abort it immediately and reset the execution environment.
     * If a non-empty string is given as argument, the new script will be started.
     *
     * @param newval {string} : a string
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentScript(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('currentScript',rest_val);
    }

    /**
     * Returns the name of the script to run when the device is powered on.
     *
     * @return {Promise<string>} a string corresponding to the name of the script to run when the device is powered on
     *
     * On failure, throws an exception or returns YMicroPython.STARTUPSCRIPT_INVALID.
     */
    async get_startupScript()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.STARTUPSCRIPT_INVALID;
            }
        }
        res = this._startupScript;
        return res;
    }

    /**
     * Changes the script to run when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the script to run when the device is powered on
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_startupScript(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('startupScript',rest_val);
    }

    /**
     * Changes the wait time before running the startup script on power on, between 0.1
     * second and 25 seconds. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval {number} : a floating point number corresponding to the wait time before running the
     * startup script on power on, between 0.1
     *         second and 25 seconds
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_startupDelay(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('startupDelay',rest_val);
    }

    /**
     * Returns the wait time before running the startup script on power on,
     * measured in seconds.
     *
     * @return {Promise<number>} a floating point number corresponding to the wait time before running the
     * startup script on power on,
     *         measured in seconds
     *
     * On failure, throws an exception or returns YMicroPython.STARTUPDELAY_INVALID.
     */
    async get_startupDelay()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.STARTUPDELAY_INVALID;
            }
        }
        res = this._startupDelay;
        return res;
    }

    /**
     * Returns the activation state of MicroPython debugging interface.
     *
     * @return {Promise<number>} either YMicroPython.DEBUGMODE_OFF or YMicroPython.DEBUGMODE_ON, according
     * to the activation state of MicroPython debugging interface
     *
     * On failure, throws an exception or returns YMicroPython.DEBUGMODE_INVALID.
     */
    async get_debugMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.DEBUGMODE_INVALID;
            }
        }
        res = this._debugMode;
        return res;
    }

    /**
     * Changes the activation state of MicroPython debugging interface.
     *
     * @param newval {number} : either YMicroPython.DEBUGMODE_OFF or YMicroPython.DEBUGMODE_ON, according
     * to the activation state of MicroPython debugging interface
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_debugMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('debugMode',rest_val);
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.COMMAND_INVALID;
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
     * Retrieves a MicroPython interpreter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the MicroPython interpreter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMicroPython.isOnline() to test if the MicroPython interpreter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MicroPython interpreter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the MicroPython interpreter, for instance
     *         MyDevice.microPython.
     *
     * @return {YMicroPython} a YMicroPython object allowing you to drive the MicroPython interpreter.
     */
    static FindMicroPython(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('MicroPython', func);
        if (obj == null) {
            obj = new YMicroPython(YAPI, func);
            YFunction._AddToCache('MicroPython', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a MicroPython interpreter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the MicroPython interpreter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMicroPython.isOnline() to test if the MicroPython interpreter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MicroPython interpreter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the MicroPython interpreter, for instance
     *         MyDevice.microPython.
     *
     * @return {YMicroPython} a YMicroPython object allowing you to drive the MicroPython interpreter.
     */
    static FindMicroPythonInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'MicroPython', func);
        if (obj == null) {
            obj = new YMicroPython(yctx, func);
            YFunction._AddToCache('MicroPython', func, obj);
        }
        return obj;
    }

    /**
     * Submit MicroPython code for execution in the interpreter.
     * If the MicroPython interpreter is busy, this function will
     * block until it becomes available. The code is then uploaded,
     * compiled and executed on the fly, without beeing stored on the device filesystem.
     *
     * There is no implicit reset of the MicroPython interpreter with
     * this function. Use method reset() if you need to start
     * from a fresh environment to run your code.
     *
     * Note that although MicroPython is mostly compatible with recent Python 3.x
     * interpreters, the limited ressources on the device impose some restrictions,
     * in particular regarding the libraries that can be used. Please refer to
     * the documentation for more details.
     *
     * @param codeName {string} : name of the code file (used for error reporting only)
     * @param mpyCode {string} : MicroPython code to compile and execute
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async eval(codeName,mpyCode)
    {
        /** @type {string} **/
        let fullname;
        /** @type {number} **/
        let res;
        fullname = 'mpy:'+codeName;
        res = await this._upload(fullname, this._yapi.imm_str2bin(mpyCode));
        return res;
    }

    /**
     * Stops current execution, and reset the MicroPython interpreter to initial state.
     * All global variables are cleared, and all imports are forgotten.
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reset()
    {
        /** @type {number} **/
        let res;
        /** @type {string} **/
        let state;

        res = await this.set_command('Z');
        if (!(res == this._yapi.SUCCESS)) {
            return this._throw(this._yapi.IO_ERROR,'unable to trigger MicroPython reset',this._yapi.IO_ERROR);
        }
        // Wait until the reset is effective
        state = (await this.get_advertisedValue()).substr(0, 1);
        while (!(state == 'z')) {
            YAPI.Sleep(50);
            state = (await this.get_advertisedValue()).substr(0, 1);
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Clears MicroPython interpreter console log buffer.
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clearLogs()
    {
        /** @type {number} **/
        let res;

        res = await this.set_command('z');
        return res;
    }

    /**
     * Returns a string with last logs of the MicroPython interpreter.
     * This method return only logs that are still in the module.
     *
     * @return {Promise<string>} a string with last MicroPython logs.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async get_lastLogs()
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let bufflen;
        /** @type {string} **/
        let res;

        buff = await this._download('mpy.txt');
        bufflen = (buff).length - 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            bufflen = bufflen - 1;
        }
        res = this._yapi.imm_bin2str(buff).substr(0, bufflen);
        return res;
    }

    /**
     * Registers a device log callback function. This callback will be called each time
     * microPython sends a new log message.
     *
     * @param callback {YMicroPython.LogCallback | null} : the callback function to invoke, or a null pointer.
     *         The callback function should take two arguments:
     *         the module object that emitted the log message,
     *         and the character string containing the log.
     *         On failure, throws an exception or returns a negative error code.
     */
    async registerLogCallback(callback)
    {
        /** @type {string} **/
        let serial;

        serial = await this.get_serialNumber();
        if (serial == this._yapi.INVALID_STRING) {
            return this._yapi.DEVICE_NOT_FOUND;
        }
        this._logCallback = callback;
        this._isFirstCb = true;
        if (callback != null) {
            await this.registerValueCallback(yInternalEventCallback);
        } else {
            await this.registerValueCallback(null);
        }
        return 0;
    }

    async get_logCallback()
    {
        return this._logCallback;
    }

    async _internalEventHandler(cbVal)
    {
        /** @type {number} **/
        let cbPos;
        /** @type {number} **/
        let cbDPos;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let content;
        /** @type {number} **/
        let endPos;
        /** @type {string} **/
        let contentStr;
        /** @type {string[]} **/
        let msgArr = [];
        /** @type {number} **/
        let arrLen;
        /** @type {string} **/
        let lenStr;
        /** @type {number} **/
        let arrPos;
        /** @type {string} **/
        let logMsg;
        // detect possible power cycle of the reader to clear event pointer
        cbPos = parseInt(cbVal.substr(1, (cbVal).length-1), 16);
        cbDPos = ((cbPos - this._prevCbPos) & 0xfffff);
        this._prevCbPos = cbPos;
        if (cbDPos > 65536) {
            this._logPos = 0;
        }
        if (!(this._logCallback != null)) {
            return this._yapi.SUCCESS;
        }
        if (this._isFirstCb) {
            // use first emulated value callback caused by registerValueCallback:
            // to retrieve current logs position
            this._logPos = 0;
            this._prevPartialLog = '';
            url = 'mpy.txt';
        } else {
            // load all messages since previous call
            url = 'mpy.txt?pos='+String(Math.round(this._logPos));
        }

        content = await this._download(url);
        contentStr = this._yapi.imm_bin2str(content);
        // look for new position indicator at end of logs
        endPos = (content).length - 1;
        while ((endPos >= 0) && (content[endPos] != 64)) {
            endPos = endPos - 1;
        }
        if (!(endPos > 0)) {
            return this._throw(this._yapi.IO_ERROR,'fail to download micropython logs',this._yapi.IO_ERROR);
        }
        lenStr = contentStr.substr(endPos+1, (contentStr).length-(endPos+1));
        // update processed event position pointer
        this._logPos = this._yapi.imm_atoi(lenStr);
        if (this._isFirstCb) {
            // don't generate callbacks log messages before call to registerLogCallback
            this._isFirstCb = false;
            return this._yapi.SUCCESS;
        }
        // now generate callbacks for each complete log line
        endPos = endPos - 1;
        if (!(content[endPos] == 10)) {
            return this._throw(this._yapi.IO_ERROR,'fail to download micropython logs',this._yapi.IO_ERROR);
        }
        contentStr = contentStr.substr(0, endPos);
        msgArr = (contentStr).split('\n');
        arrLen = msgArr.length - 1;
        if (arrLen > 0) {
            logMsg = this._prevPartialLog+''+msgArr[0];
            if (this._logCallback != null) {
                try {
                    await this._logCallback(this, logMsg);
                } catch (e) {
                    this._yapi.imm_log('Exception in logCallback:', e);
                }
            }
            this._prevPartialLog = '';
            arrPos = 1;
            while (arrPos < arrLen) {
                logMsg = msgArr[arrPos];
                if (this._logCallback != null) {
                    try {
                        await this._logCallback(this, logMsg);
                    } catch (e) {
                        this._yapi.imm_log('Exception in logCallback:', e);
                    }
                }
                arrPos = arrPos + 1;
            }
        }
        this._prevPartialLog = this._prevPartialLog+''+msgArr[arrLen];
        return this._yapi.SUCCESS;
    }

    /**
     * Continues the enumeration of MicroPython interpreters started using yFirstMicroPython().
     * Caution: You can't make any assumption about the returned MicroPython interpreters order.
     * If you want to find a specific a MicroPython interpreter, use MicroPython.findMicroPython()
     * and a hardwareID or a logical name.
     *
     * @return {YMicroPython | null} a pointer to a YMicroPython object, corresponding to
     *         a MicroPython interpreter currently online, or a null pointer
     *         if there are no more MicroPython interpreters to enumerate.
     */
    nextMicroPython()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMicroPython.FindMicroPythonInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of MicroPython interpreters currently accessible.
     * Use the method YMicroPython.nextMicroPython() to iterate on
     * next MicroPython interpreters.
     *
     * @return {YMicroPython | null} a pointer to a YMicroPython object, corresponding to
     *         the first MicroPython interpreter currently online, or a null pointer
     *         if there are none.
     */
    static FirstMicroPython()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('MicroPython');
        if(next_hwid == null) return null;
        return YMicroPython.FindMicroPython(next_hwid);
    }

    /**
     * Starts the enumeration of MicroPython interpreters currently accessible.
     * Use the method YMicroPython.nextMicroPython() to iterate on
     * next MicroPython interpreters.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMicroPython | null} a pointer to a YMicroPython object, corresponding to
     *         the first MicroPython interpreter currently online, or a null pointer
     *         if there are none.
     */
    static FirstMicroPythonInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('MicroPython');
        if(next_hwid == null) return null;
        return YMicroPython.FindMicroPythonInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            LASTMSG_INVALID              : YAPI.INVALID_STRING,
            HEAPUSAGE_INVALID            : YAPI.INVALID_UINT,
            HEAPFRAG_INVALID             : YAPI.INVALID_UINT,
            XHEAPUSAGE_INVALID           : YAPI.INVALID_UINT,
            STACKUSAGE_INVALID           : YAPI.INVALID_UINT,
            CURRENTSCRIPT_INVALID        : YAPI.INVALID_STRING,
            STARTUPSCRIPT_INVALID        : YAPI.INVALID_STRING,
            STARTUPDELAY_INVALID         : YAPI.INVALID_DOUBLE,
            DEBUGMODE_OFF                : 0,
            DEBUGMODE_ON                 : 1,
            DEBUGMODE_INVALID            : -1,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of generated code: YMicroPython implementation)
}

//
// YMicroPythonProxy Class: synchronous proxy to YMicroPython objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YMicroPython objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YMicroPythonProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (generated code: YMicroPython accessors declaration)

    /**
     * Returns the last message produced by a python script.
     *
     * @return a string corresponding to the last message produced by a python script
     *
     * On failure, throws an exception or returns YMicroPython.LASTMSG_INVALID.
     */
    get_lastMsg()
    {
        return this.liveFunc._lastMsg;
    }

    /**
     * Returns the percentage of MicroPython main memory in use,
     * as observed at the end of the last garbage collection.
     *
     * @return an integer corresponding to the percentage of MicroPython main memory in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.HEAPUSAGE_INVALID.
     */
    get_heapUsage()
    {
        return this.liveFunc._heapUsage;
    }

    /**
     * Returns the fragmentation ratio of MicroPython main memory,
     * as observed at the end of the last garbage collection.
     *
     * @return an integer corresponding to the fragmentation ratio of MicroPython main memory,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.HEAPFRAG_INVALID.
     */
    get_heapFrag()
    {
        return this.liveFunc._heapFrag;
    }

    /**
     * Returns the percentage of MicroPython external memory in use,
     * as observed at the end of the last garbage collection.
     *
     * @return an integer corresponding to the percentage of MicroPython external memory in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.XHEAPUSAGE_INVALID.
     */
    get_xheapUsage()
    {
        return this.liveFunc._xheapUsage;
    }

    /**
     * Returns the maximum percentage of MicroPython call stack in use,
     * as observed at the end of the last garbage collection.
     *
     * @return an integer corresponding to the maximum percentage of MicroPython call stack in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.STACKUSAGE_INVALID.
     */
    get_stackUsage()
    {
        return this.liveFunc._stackUsage;
    }

    /**
     * Returns the name of currently active script, if any.
     *
     * @return a string corresponding to the name of currently active script, if any
     *
     * On failure, throws an exception or returns YMicroPython.CURRENTSCRIPT_INVALID.
     */
    get_currentScript()
    {
        return this.liveFunc._currentScript;
    }

    /**
     * Stops current running script, and/or selects a script to run immediately in a
     * fresh new environment. If the MicroPython interpreter is busy running a script,
     * this function will abort it immediately and reset the execution environment.
     * If a non-empty string is given as argument, the new script will be started.
     *
     * @param newval : a string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentScript(newval)
    {
        this.liveFunc.set_currentScript(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the name of the script to run when the device is powered on.
     *
     * @return a string corresponding to the name of the script to run when the device is powered on
     *
     * On failure, throws an exception or returns YMicroPython.STARTUPSCRIPT_INVALID.
     */
    get_startupScript()
    {
        return this.liveFunc._startupScript;
    }

    /**
     * Changes the script to run when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the script to run when the device is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_startupScript(newval)
    {
        this.liveFunc.set_startupScript(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the wait time before running the startup script on power on, between 0.1
     * second and 25 seconds. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the wait time before running the startup
     * script on power on, between 0.1
     *         second and 25 seconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_startupDelay(newval)
    {
        this.liveFunc.set_startupDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the wait time before running the startup script on power on,
     * measured in seconds.
     *
     * @return a floating point number corresponding to the wait time before running the startup script on power on,
     *         measured in seconds
     *
     * On failure, throws an exception or returns YMicroPython.STARTUPDELAY_INVALID.
     */
    get_startupDelay()
    {
        return this.liveFunc._startupDelay;
    }

    /**
     * Returns the activation state of MicroPython debugging interface.
     *
     * @return either YMicroPython.DEBUGMODE_OFF or YMicroPython.DEBUGMODE_ON, according to the activation
     * state of MicroPython debugging interface
     *
     * On failure, throws an exception or returns YMicroPython.DEBUGMODE_INVALID.
     */
    get_debugMode()
    {
        return this.liveFunc._debugMode;
    }

    /**
     * Changes the activation state of MicroPython debugging interface.
     *
     * @param newval : either YMicroPython.DEBUGMODE_OFF or YMicroPython.DEBUGMODE_ON, according to the
     * activation state of MicroPython debugging interface
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_debugMode(newval)
    {
        this.liveFunc.set_debugMode(newval);
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
     * Submit MicroPython code for execution in the interpreter.
     * If the MicroPython interpreter is busy, this function will
     * block until it becomes available. The code is then uploaded,
     * compiled and executed on the fly, without beeing stored on the device filesystem.
     *
     * There is no implicit reset of the MicroPython interpreter with
     * this function. Use method reset() if you need to start
     * from a fresh environment to run your code.
     *
     * Note that although MicroPython is mostly compatible with recent Python 3.x
     * interpreters, the limited ressources on the device impose some restrictions,
     * in particular regarding the libraries that can be used. Please refer to
     * the documentation for more details.
     *
     * @param codeName : name of the code file (used for error reporting only)
     * @param mpyCode : MicroPython code to compile and execute
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    eval(codeName,mpyCode)
    {
        this.liveFunc.eval(codeName, mpyCode);
        return YAPI_SUCCESS;
    }

    /**
     * Stops current execution, and reset the MicroPython interpreter to initial state.
     * All global variables are cleared, and all imports are forgotten.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset()
    {
        this.liveFunc.reset();
        return YAPI_SUCCESS;
    }

    /**
     * Clears MicroPython interpreter console log buffer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clearLogs()
    {
        this.liveFunc.clearLogs();
        return YAPI_SUCCESS;
    }

    /**
     * Registers a device log callback function. This callback will be called each time
     * microPython sends a new log message.
     *
     * @param callback : the callback function to invoke, or a null pointer.
     *         The callback function should take two arguments:
     *         the module object that emitted the log message,
     *         and the character string containing the log.
     *         On failure, throws an exception or returns a negative error code.
     */
    registerLogCallback(callback)
    {
        this.liveFunc.registerLogCallback(callback);
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YMicroPython accessors declaration)
}

//--- (generated code: YMicroPython functions)

YoctoLibExport('YMicroPython', YMicroPython);
YoctoLibExport('YMicroPythonProxy', YMicroPythonProxy);
YMicroPython.imm_Init();

//--- (end of generated code: YMicroPython functions)

