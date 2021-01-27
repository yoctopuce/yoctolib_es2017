/*********************************************************************
 *
 *  $Id: yocto_current.js 43580 2021-01-26 17:46:01Z mvuilleu $
 *
 *  Implements the high-level API for Current functions
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

//--- (YCurrent return codes)
//--- (end of YCurrent return codes)
//--- (YCurrent definitions)
//--- (end of YCurrent definitions)

//--- (YCurrent class start)
/**
 * YCurrent Class: current sensor control interface, available for instance in the Yocto-Amp, the
 * Yocto-Motor-DC or the Yocto-Watt
 *
 * The YCurrent class allows you to read and configure Yoctopuce current sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YCurrent class start)

class YCurrent extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YCurrent constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Current';
        /** @member {number} **/
        this._enabled                    = YCurrent.ENABLED_INVALID;
        //--- (end of YCurrent constructor)
    }

    //--- (YCurrent implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'enabled':
            this._enabled = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the activation state of this input.
     *
     * @return {Promise<number>} either YCurrent.ENABLED_FALSE or YCurrent.ENABLED_TRUE, according to the
     * activation state of this input
     *
     * On failure, throws an exception or returns YCurrent.ENABLED_INVALID.
     */
    async get_enabled()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrent.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Changes the activation state of this voltage input. When AC measurements are disabled,
     * the device will always assume a DC signal, and vice-versa. When both AC and DC measurements
     * are active, the device switches between AC and DC mode based on the relative amplitude
     * of variations compared to the average value.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : either YCurrent.ENABLED_FALSE or YCurrent.ENABLED_TRUE, according to the
     * activation state of this voltage input
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabled',rest_val);
    }

    /**
     * Retrieves a current sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the current sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrent.isOnline() to test if the current sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a current sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the current sensor, for instance
     *         YAMPMK01.current1.
     *
     * @return {YCurrent} a YCurrent object allowing you to drive the current sensor.
     */
    static FindCurrent(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Current', func);
        if (obj == null) {
            obj = new YCurrent(YAPI, func);
            YFunction._AddToCache('Current',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a current sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the current sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrent.isOnline() to test if the current sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a current sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the current sensor, for instance
     *         YAMPMK01.current1.
     *
     * @return {YCurrent} a YCurrent object allowing you to drive the current sensor.
     */
    static FindCurrentInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Current', func);
        if (obj == null) {
            obj = new YCurrent(yctx, func);
            YFunction._AddToCache('Current',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of current sensors started using yFirstCurrent().
     * Caution: You can't make any assumption about the returned current sensors order.
     * If you want to find a specific a current sensor, use Current.findCurrent()
     * and a hardwareID or a logical name.
     *
     * @return {YCurrent | null} a pointer to a YCurrent object, corresponding to
     *         a current sensor currently online, or a null pointer
     *         if there are no more current sensors to enumerate.
     */
    nextCurrent()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCurrent.FindCurrentInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of current sensors currently accessible.
     * Use the method YCurrent.nextCurrent() to iterate on
     * next current sensors.
     *
     * @return {YCurrent | null} a pointer to a YCurrent object, corresponding to
     *         the first current sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrent()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Current');
        if(next_hwid == null) return null;
        return YCurrent.FindCurrent(next_hwid);
    }

    /**
     * Starts the enumeration of current sensors currently accessible.
     * Use the method YCurrent.nextCurrent() to iterate on
     * next current sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YCurrent | null} a pointer to a YCurrent object, corresponding to
     *         the first current sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrentInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Current');
        if(next_hwid == null) return null;
        return YCurrent.FindCurrentInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            ENABLED_FALSE                : 0,
            ENABLED_TRUE                 : 1,
            ENABLED_INVALID              : -1
        });
    }

    //--- (end of YCurrent implementation)
}

//
// YCurrentProxy Class: synchronous proxy to YCurrent objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YCurrent objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YCurrentProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YCurrent accessors declaration)

    /**
     * Returns the activation state of this input.
     *
     * @return either YCurrent.ENABLED_FALSE or YCurrent.ENABLED_TRUE, according to the activation state of this input
     *
     * On failure, throws an exception or returns YCurrent.ENABLED_INVALID.
     */
    get_enabled()
    {
        return this.liveFunc._enabled;
    }

    /**
     * Changes the activation state of this voltage input. When AC measurements are disabled,
     * the device will always assume a DC signal, and vice-versa. When both AC and DC measurements
     * are active, the device switches between AC and DC mode based on the relative amplitude
     * of variations compared to the average value.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YCurrent.ENABLED_FALSE or YCurrent.ENABLED_TRUE, according to the activation
     * state of this voltage input
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval)
    {
        this.liveFunc.set_enabled(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YCurrent accessors declaration)
}

//--- (YCurrent functions)

YoctoLibExport('YCurrent', YCurrent);
YoctoLibExport('YCurrentProxy', YCurrentProxy);
YCurrent.imm_Init();

//--- (end of YCurrent functions)
