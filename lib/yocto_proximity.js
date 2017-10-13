/*********************************************************************
 *
 * $Id: yocto_proximity.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for Proximity functions
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

//--- (YProximity return codes)
//--- (end of YProximity return codes)
//--- (YProximity definitions)
//--- (end of YProximity definitions)

//--- (YProximity class start)
/**
 * YProximity Class: Proximity function interface
 *
 * The Yoctopuce class YProximity allows you to use and configure Yoctopuce proximity
 * sensors. It inherits from the YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 */
//--- (end of YProximity class start)

class YProximity extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YProximity constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Proximity';
        /** @member {number} **/
        this._signalValue                = YProximity.SIGNALVALUE_INVALID;
        /** @member {number} **/
        this._detectionThreshold         = YProximity.DETECTIONTHRESHOLD_INVALID;
        /** @member {number} **/
        this._isPresent                  = YProximity.ISPRESENT_INVALID;
        /** @member {number} **/
        this._lastTimeApproached         = YProximity.LASTTIMEAPPROACHED_INVALID;
        /** @member {number} **/
        this._lastTimeRemoved            = YProximity.LASTTIMEREMOVED_INVALID;
        /** @member {number} **/
        this._pulseCounter               = YProximity.PULSECOUNTER_INVALID;
        /** @member {number} **/
        this._pulseTimer                 = YProximity.PULSETIMER_INVALID;
        /** @member {number} **/
        this._proximityReportMode        = YProximity.PROXIMITYREPORTMODE_INVALID;
        //--- (end of YProximity constructor)
    }

    //--- (YProximity implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'signalValue':
            this._signalValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'detectionThreshold':
            this._detectionThreshold = parseInt(val);
            return 1;
        case 'isPresent':
            this._isPresent = parseInt(val);
            return 1;
        case 'lastTimeApproached':
            this._lastTimeApproached = parseInt(val);
            return 1;
        case 'lastTimeRemoved':
            this._lastTimeRemoved = parseInt(val);
            return 1;
        case 'pulseCounter':
            this._pulseCounter = parseInt(val);
            return 1;
        case 'pulseTimer':
            this._pulseTimer = parseInt(val);
            return 1;
        case 'proximityReportMode':
            this._proximityReportMode = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current value of signal measured by the proximity sensor.
     *
     * @return {number} a floating point number corresponding to the current value of signal measured by
     * the proximity sensor
     *
     * On failure, throws an exception or returns YProximity.SIGNALVALUE_INVALID.
     */
    async get_signalValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.SIGNALVALUE_INVALID;
            }
        }
        res = Math.round(this._signalValue * 1000) / 1000;
        return res;
    }

    /**
     * Returns the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @return {number} an integer corresponding to the threshold used to determine the logical state of
     * the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * On failure, throws an exception or returns YProximity.DETECTIONTHRESHOLD_INVALID.
     */
    async get_detectionThreshold()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.DETECTIONTHRESHOLD_INVALID;
            }
        }
        res = this._detectionThreshold;
        return res;
    }

    /**
     * Changes the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @param newval {number} : an integer corresponding to the threshold used to determine the logical
     * state of the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_detectionThreshold(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('detectionThreshold',rest_val);
    }

    /**
     * Returns true if the input (considered as binary) is active (detection value is smaller than the
     * specified threshold), and false otherwise.
     *
     * @return {number} either YProximity.ISPRESENT_FALSE or YProximity.ISPRESENT_TRUE, according to true
     * if the input (considered as binary) is active (detection value is smaller than the specified
     * threshold), and false otherwise
     *
     * On failure, throws an exception or returns YProximity.ISPRESENT_INVALID.
     */
    async get_isPresent()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.ISPRESENT_INVALID;
            }
        }
        res = this._isPresent;
        return res;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from absent to present).
     *
     * @return {number} an integer corresponding to the number of elapsed milliseconds between the module
     * power on and the last observed
     *         detection (the input contact transitioned from absent to present)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEAPPROACHED_INVALID.
     */
    async get_lastTimeApproached()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.LASTTIMEAPPROACHED_INVALID;
            }
        }
        res = this._lastTimeApproached;
        return res;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from present to absent).
     *
     * @return {number} an integer corresponding to the number of elapsed milliseconds between the module
     * power on and the last observed
     *         detection (the input contact transitioned from present to absent)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEREMOVED_INVALID.
     */
    async get_lastTimeRemoved()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.LASTTIMEREMOVED_INVALID;
            }
        }
        res = this._lastTimeRemoved;
        return res;
    }

    /**
     * Returns the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @return {number} an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YProximity.PULSECOUNTER_INVALID.
     */
    async get_pulseCounter()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.PULSECOUNTER_INVALID;
            }
        }
        res = this._pulseCounter;
        return res;
    }

    async set_pulseCounter(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pulseCounter',rest_val);
    }

    /**
     * Returns the timer of the pulse counter (ms).
     *
     * @return {number} an integer corresponding to the timer of the pulse counter (ms)
     *
     * On failure, throws an exception or returns YProximity.PULSETIMER_INVALID.
     */
    async get_pulseTimer()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.PULSETIMER_INVALID;
            }
        }
        res = this._pulseTimer;
        return res;
    }

    /**
     * Returns the parameter (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks.
     *
     * @return {number} a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT corresponding
     * to the parameter (sensor value, presence or pulse count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns YProximity.PROXIMITYREPORTMODE_INVALID.
     */
    async get_proximityReportMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.PROXIMITYREPORTMODE_INVALID;
            }
        }
        res = this._proximityReportMode;
        return res;
    }

    /**
     * Changes the  parameter  type (sensor value, presence or pulse count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval {number} : a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT corresponding
     * to the  parameter  type (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_proximityReportMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('proximityReportMode',rest_val);
    }

    /**
     * Retrieves a proximity sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the proximity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YProximity.isOnline() to test if the proximity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a proximity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the proximity sensor
     *
     * @return {YProximity} a YProximity object allowing you to drive the proximity sensor.
     */
    static FindProximity(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Proximity', func);
        if (obj == null) {
            obj = new YProximity(YAPI, func);
            YFunction._AddToCache('Proximity',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a proximity sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the proximity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YProximity.isOnline() to test if the proximity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a proximity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the proximity sensor
     *
     * @return {YProximity} a YProximity object allowing you to drive the proximity sensor.
     */
    static FindProximityInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Proximity', func);
        if (obj == null) {
            obj = new YProximity(yctx, func);
            YFunction._AddToCache('Proximity',  func, obj);
        }
        return obj;
    }

    /**
     * Resets the pulse counter value as well as its timer.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetCounter()
    {
        return await this.set_pulseCounter(0);
    }

    /**
     * Continues the enumeration of proximity sensors started using yFirstProximity().
     *
     * @return {YProximity} a pointer to a YProximity object, corresponding to
     *         a proximity sensor currently online, or a null pointer
     *         if there are no more proximity sensors to enumerate.
     */
    nextProximity()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YProximity.FindProximityInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of proximity sensors currently accessible.
     * Use the method YProximity.nextProximity() to iterate on
     * next proximity sensors.
     *
     * @return {YProximity} a pointer to a YProximity object, corresponding to
     *         the first proximity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstProximity()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Proximity');
        if(next_hwid == null) return null;
        return YProximity.FindProximity(next_hwid);
    }

    /**
     * Starts the enumeration of proximity sensors currently accessible.
     * Use the method YProximity.nextProximity() to iterate on
     * next proximity sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YProximity} a pointer to a YProximity object, corresponding to
     *         the first proximity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstProximityInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Proximity');
        if(next_hwid == null) return null;
        return YProximity.FindProximityInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            SIGNALVALUE_INVALID          : YAPI.INVALID_DOUBLE,
            DETECTIONTHRESHOLD_INVALID   : YAPI.INVALID_UINT,
            ISPRESENT_FALSE              : 0,
            ISPRESENT_TRUE               : 1,
            ISPRESENT_INVALID            : -1,
            LASTTIMEAPPROACHED_INVALID   : YAPI.INVALID_LONG,
            LASTTIMEREMOVED_INVALID      : YAPI.INVALID_LONG,
            PULSECOUNTER_INVALID         : YAPI.INVALID_LONG,
            PULSETIMER_INVALID           : YAPI.INVALID_LONG,
            PROXIMITYREPORTMODE_NUMERIC  : 0,
            PROXIMITYREPORTMODE_PRESENCE : 1,
            PROXIMITYREPORTMODE_PULSECOUNT : 2,
            PROXIMITYREPORTMODE_INVALID  : -1
        });
    }

    //--- (end of YProximity implementation)
}

//
// YProximityProxy Class: synchronous proxy to YProximity objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YProximity objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YProximityProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YProximity accessors declaration)

    /**
     * Returns the current value of signal measured by the proximity sensor.
     *
     * @return a floating point number corresponding to the current value of signal measured by the proximity sensor
     *
     * On failure, throws an exception or returns Y_SIGNALVALUE_INVALID.
     */
    get_signalValue()
    {
        return this.liveFunc._signalValue;
    }

    /**
     * Returns the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @return an integer corresponding to the threshold used to determine the logical state of the
     * proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * On failure, throws an exception or returns Y_DETECTIONTHRESHOLD_INVALID.
     */
    get_detectionThreshold()
    {
        return this.liveFunc._detectionThreshold;
    }

    /**
     * Changes the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @param newval : an integer corresponding to the threshold used to determine the logical state of
     * the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_detectionThreshold(newval)
    {
        this.liveFunc.set_detectionThreshold(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns true if the input (considered as binary) is active (detection value is smaller than the
     * specified threshold), and false otherwise.
     *
     * @return either Y_ISPRESENT_FALSE or Y_ISPRESENT_TRUE, according to true if the input (considered as
     * binary) is active (detection value is smaller than the specified threshold), and false otherwise
     *
     * On failure, throws an exception or returns Y_ISPRESENT_INVALID.
     */
    get_isPresent()
    {
        return this.liveFunc._isPresent;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from absent to present).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from absent to present)
     *
     * On failure, throws an exception or returns Y_LASTTIMEAPPROACHED_INVALID.
     */
    get_lastTimeApproached()
    {
        return this.liveFunc._lastTimeApproached;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from present to absent).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from present to absent)
     *
     * On failure, throws an exception or returns Y_LASTTIMEREMOVED_INVALID.
     */
    get_lastTimeRemoved()
    {
        return this.liveFunc._lastTimeRemoved;
    }

    /**
     * Returns the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     */
    get_pulseCounter()
    {
        return this.liveFunc._pulseCounter;
    }

    set_pulseCounter(newval)
    {
        this.liveFunc.set_pulseCounter(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the timer of the pulse counter (ms).
     *
     * @return an integer corresponding to the timer of the pulse counter (ms)
     *
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    get_pulseTimer()
    {
        return this.liveFunc._pulseTimer;
    }

    /**
     * Returns the parameter (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks.
     *
     * @return a value among Y_PROXIMITYREPORTMODE_NUMERIC, Y_PROXIMITYREPORTMODE_PRESENCE and
     * Y_PROXIMITYREPORTMODE_PULSECOUNT corresponding to the parameter (sensor value, presence or pulse
     * count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns Y_PROXIMITYREPORTMODE_INVALID.
     */
    get_proximityReportMode()
    {
        return this.liveFunc._proximityReportMode;
    }

    /**
     * Changes the  parameter  type (sensor value, presence or pulse count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval : a value among Y_PROXIMITYREPORTMODE_NUMERIC, Y_PROXIMITYREPORTMODE_PRESENCE and
     * Y_PROXIMITYREPORTMODE_PULSECOUNT corresponding to the  parameter  type (sensor value, presence or
     * pulse count) returned by the get_currentValue function and callbacks
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_proximityReportMode(newval)
    {
        this.liveFunc.set_proximityReportMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Resets the pulse counter value as well as its timer.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter()
    {
        this.liveFunc.resetCounter();
        return YAPI_SUCCESS;
    }
    //--- (end of YProximity accessors declaration)
}

//--- (YProximity functions)

YoctoLibExport('YProximity', YProximity);
YoctoLibExport('YProximityProxy', YProximityProxy);
YProximity.imm_Init();

//--- (end of YProximity functions)
