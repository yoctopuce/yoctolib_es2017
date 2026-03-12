/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Counter functions
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

//--- (YCounter return codes)
//--- (end of YCounter return codes)
//--- (YCounter definitions)
//--- (end of YCounter definitions)

//--- (YCounter class start)
/**
 * YCounter Class: counter control interface
 *
 * The YCounter class allows you to read and configure Yoctopuce gcounters.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YCounter class start)

class YCounter extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YCounter constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Counter';
        /** @member {string} **/
        this._command                    = YCounter.COMMAND_INVALID;
        //--- (end of YCounter constructor)
    }

    //--- (YCounter implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCounter.COMMAND_INVALID;
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
     * Retrieves a counter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the counter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCounter.isOnline() to test if the counter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a counter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the counter, for instance
     *         MyDevice.counter.
     *
     * @return {YCounter} a YCounter object allowing you to drive the counter.
     */
    static FindCounter(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Counter', func);
        if (obj == null) {
            obj = new YCounter(YAPI, func);
            YFunction._AddToCache('Counter', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a counter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the counter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCounter.isOnline() to test if the counter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a counter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the counter, for instance
     *         MyDevice.counter.
     *
     * @return {YCounter} a YCounter object allowing you to drive the counter.
     */
    static FindCounterInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Counter', func);
        if (obj == null) {
            obj = new YCounter(yctx, func);
            YFunction._AddToCache('Counter', func, obj);
        }
        return obj;
    }

    async sendCommand(command)
    {
        return await this.set_command(command);
    }

    /**
     * Reset the counter to zero.
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async zero()
    {
        return await this.sendCommand('Z');
    }

    /**
     * Continues the enumeration of gcounters started using yFirstCounter().
     * Caution: You can't make any assumption about the returned gcounters order.
     * If you want to find a specific a counter, use Counter.findCounter()
     * and a hardwareID or a logical name.
     *
     * @return {YCounter | null} a pointer to a YCounter object, corresponding to
     *         a counter currently online, or a null pointer
     *         if there are no more gcounters to enumerate.
     */
    nextCounter()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCounter.FindCounterInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of gcounters currently accessible.
     * Use the method YCounter.nextCounter() to iterate on
     * next gcounters.
     *
     * @return {YCounter | null} a pointer to a YCounter object, corresponding to
     *         the first counter currently online, or a null pointer
     *         if there are none.
     */
    static FirstCounter()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Counter');
        if(next_hwid == null) return null;
        return YCounter.FindCounter(next_hwid);
    }

    /**
     * Starts the enumeration of gcounters currently accessible.
     * Use the method YCounter.nextCounter() to iterate on
     * next gcounters.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YCounter | null} a pointer to a YCounter object, corresponding to
     *         the first counter currently online, or a null pointer
     *         if there are none.
     */
    static FirstCounterInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Counter');
        if(next_hwid == null) return null;
        return YCounter.FindCounterInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YCounter implementation)
}

//
// YCounterProxy Class: synchronous proxy to YCounter objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YCounter objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YCounterProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YCounter accessors declaration)

    get_command()
    {
        return this.liveFunc._command;
    }

    set_command(newval)
    {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    sendCommand(command)
    {
        this.liveFunc.sendCommand(command);
        return YAPI_SUCCESS;
    }

    /**
     * Reset the counter to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    zero()
    {
        this.liveFunc.zero();
        return YAPI_SUCCESS;
    }
    //--- (end of YCounter accessors declaration)
}

//--- (YCounter functions)

YoctoLibExport('YCounter', YCounter);
YoctoLibExport('YCounterProxy', YCounterProxy);
YCounter.imm_Init();

//--- (end of YCounter functions)

