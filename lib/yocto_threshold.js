/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Threshold functions
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

//--- (YThreshold return codes)
//--- (end of YThreshold return codes)
//--- (YThreshold definitions)
//--- (end of YThreshold definitions)

//--- (YThreshold class start)
/**
 * YThreshold Class: Control interface to define a threshold
 *
 * The Threshold class allows you define a threshold on a Yoctopuce sensor
 * to trigger a predefined action, on specific devices where this is implemented.
 */
//--- (end of YThreshold class start)

class YThreshold extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YThreshold constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Threshold';
        /** @member {number} **/
        this._thresholdState             = YThreshold.THRESHOLDSTATE_INVALID;
        /** @member {string} **/
        this._targetSensor               = YThreshold.TARGETSENSOR_INVALID;
        /** @member {number} **/
        this._alertLevel                 = YThreshold.ALERTLEVEL_INVALID;
        /** @member {number} **/
        this._safeLevel                  = YThreshold.SAFELEVEL_INVALID;
        //--- (end of YThreshold constructor)
    }

    //--- (YThreshold implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'thresholdState':
            this._thresholdState = parseInt(val);
            return 1;
        case 'targetSensor':
            this._targetSensor = val;
            return 1;
        case 'alertLevel':
            this._alertLevel = Math.round(val / 65.536) / 1000.0;
            return 1;
        case 'safeLevel':
            this._safeLevel = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns current state of the threshold function.
     *
     * @return {Promise<number>} either YThreshold.THRESHOLDSTATE_SAFE or YThreshold.THRESHOLDSTATE_ALERT,
     * according to current state of the threshold function
     *
     * On failure, throws an exception or returns YThreshold.THRESHOLDSTATE_INVALID.
     */
    async get_thresholdState()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YThreshold.THRESHOLDSTATE_INVALID;
            }
        }
        res = this._thresholdState;
        return res;
    }

    /**
     * Returns the name of the sensor monitored by the threshold function.
     *
     * @return {Promise<string>} a string corresponding to the name of the sensor monitored by the threshold function
     *
     * On failure, throws an exception or returns YThreshold.TARGETSENSOR_INVALID.
     */
    async get_targetSensor()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YThreshold.TARGETSENSOR_INVALID;
            }
        }
        res = this._targetSensor;
        return res;
    }

    /**
     * Changes the sensor alert level triggering the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval {number} : a floating point number corresponding to the sensor alert level triggering
     * the threshold function
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_alertLevel(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('alertLevel',rest_val);
    }

    /**
     * Returns the sensor alert level, triggering the threshold function.
     *
     * @return {Promise<number>} a floating point number corresponding to the sensor alert level,
     * triggering the threshold function
     *
     * On failure, throws an exception or returns YThreshold.ALERTLEVEL_INVALID.
     */
    async get_alertLevel()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YThreshold.ALERTLEVEL_INVALID;
            }
        }
        res = this._alertLevel;
        return res;
    }

    /**
     * Changes the sensor acceptable level for disabling the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval {number} : a floating point number corresponding to the sensor acceptable level for
     * disabling the threshold function
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_safeLevel(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('safeLevel',rest_val);
    }

    /**
     * Returns the sensor acceptable level for disabling the threshold function.
     *
     * @return {Promise<number>} a floating point number corresponding to the sensor acceptable level for
     * disabling the threshold function
     *
     * On failure, throws an exception or returns YThreshold.SAFELEVEL_INVALID.
     */
    async get_safeLevel()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YThreshold.SAFELEVEL_INVALID;
            }
        }
        res = this._safeLevel;
        return res;
    }

    /**
     * Retrieves a threshold function for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the threshold function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YThreshold.isOnline() to test if the threshold function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a threshold function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the threshold function, for instance
     *         MyDevice.threshold1.
     *
     * @return {YThreshold} a YThreshold object allowing you to drive the threshold function.
     */
    static FindThreshold(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Threshold', func);
        if (obj == null) {
            obj = new YThreshold(YAPI, func);
            YFunction._AddToCache('Threshold',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a threshold function for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the threshold function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YThreshold.isOnline() to test if the threshold function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a threshold function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the threshold function, for instance
     *         MyDevice.threshold1.
     *
     * @return {YThreshold} a YThreshold object allowing you to drive the threshold function.
     */
    static FindThresholdInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Threshold', func);
        if (obj == null) {
            obj = new YThreshold(yctx, func);
            YFunction._AddToCache('Threshold',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of threshold functions started using yFirstThreshold().
     * Caution: You can't make any assumption about the returned threshold functions order.
     * If you want to find a specific a threshold function, use Threshold.findThreshold()
     * and a hardwareID or a logical name.
     *
     * @return {YThreshold | null} a pointer to a YThreshold object, corresponding to
     *         a threshold function currently online, or a null pointer
     *         if there are no more threshold functions to enumerate.
     */
    nextThreshold()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YThreshold.FindThresholdInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of threshold functions currently accessible.
     * Use the method YThreshold.nextThreshold() to iterate on
     * next threshold functions.
     *
     * @return {YThreshold | null} a pointer to a YThreshold object, corresponding to
     *         the first threshold function currently online, or a null pointer
     *         if there are none.
     */
    static FirstThreshold()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Threshold');
        if(next_hwid == null) return null;
        return YThreshold.FindThreshold(next_hwid);
    }

    /**
     * Starts the enumeration of threshold functions currently accessible.
     * Use the method YThreshold.nextThreshold() to iterate on
     * next threshold functions.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YThreshold | null} a pointer to a YThreshold object, corresponding to
     *         the first threshold function currently online, or a null pointer
     *         if there are none.
     */
    static FirstThresholdInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Threshold');
        if(next_hwid == null) return null;
        return YThreshold.FindThresholdInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            THRESHOLDSTATE_SAFE          : 0,
            THRESHOLDSTATE_ALERT         : 1,
            THRESHOLDSTATE_INVALID       : -1,
            TARGETSENSOR_INVALID         : YAPI.INVALID_STRING,
            ALERTLEVEL_INVALID           : YAPI.INVALID_DOUBLE,
            SAFELEVEL_INVALID            : YAPI.INVALID_DOUBLE
        });
    }

    //--- (end of YThreshold implementation)
}

//
// YThresholdProxy Class: synchronous proxy to YThreshold objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YThreshold objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YThresholdProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YThreshold accessors declaration)

    /**
     * Returns current state of the threshold function.
     *
     * @return either YThreshold.THRESHOLDSTATE_SAFE or YThreshold.THRESHOLDSTATE_ALERT, according to
     * current state of the threshold function
     *
     * On failure, throws an exception or returns YThreshold.THRESHOLDSTATE_INVALID.
     */
    get_thresholdState()
    {
        return this.liveFunc._thresholdState;
    }

    /**
     * Returns the name of the sensor monitored by the threshold function.
     *
     * @return a string corresponding to the name of the sensor monitored by the threshold function
     *
     * On failure, throws an exception or returns YThreshold.TARGETSENSOR_INVALID.
     */
    get_targetSensor()
    {
        return this.liveFunc._targetSensor;
    }

    /**
     * Changes the sensor alert level triggering the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval : a floating point number corresponding to the sensor alert level triggering the
     * threshold function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_alertLevel(newval)
    {
        this.liveFunc.set_alertLevel(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the sensor alert level, triggering the threshold function.
     *
     * @return a floating point number corresponding to the sensor alert level, triggering the threshold function
     *
     * On failure, throws an exception or returns YThreshold.ALERTLEVEL_INVALID.
     */
    get_alertLevel()
    {
        return this.liveFunc._alertLevel;
    }

    /**
     * Changes the sensor acceptable level for disabling the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval : a floating point number corresponding to the sensor acceptable level for disabling
     * the threshold function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_safeLevel(newval)
    {
        this.liveFunc.set_safeLevel(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the sensor acceptable level for disabling the threshold function.
     *
     * @return a floating point number corresponding to the sensor acceptable level for disabling the
     * threshold function
     *
     * On failure, throws an exception or returns YThreshold.SAFELEVEL_INVALID.
     */
    get_safeLevel()
    {
        return this.liveFunc._safeLevel;
    }
    //--- (end of YThreshold accessors declaration)
}

//--- (YThreshold functions)

YoctoLibExport('YThreshold', YThreshold);
YoctoLibExport('YThresholdProxy', YThresholdProxy);
YThreshold.imm_Init();

//--- (end of YThreshold functions)

