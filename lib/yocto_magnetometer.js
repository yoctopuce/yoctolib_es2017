/*********************************************************************
 *
 * $Id: yocto_magnetometer.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for Magnetometer functions
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

//--- (YMagnetometer return codes)
//--- (end of YMagnetometer return codes)
//--- (YMagnetometer definitions)
//--- (end of YMagnetometer definitions)

//--- (YMagnetometer class start)
/**
 * YMagnetometer Class: Magnetometer function interface
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
//--- (end of YMagnetometer class start)

class YMagnetometer extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YMagnetometer constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Magnetometer';
        /** @member {number} **/
        this._bandwidth                  = YMagnetometer.BANDWIDTH_INVALID;
        /** @member {number} **/
        this._xValue                     = YMagnetometer.XVALUE_INVALID;
        /** @member {number} **/
        this._yValue                     = YMagnetometer.YVALUE_INVALID;
        /** @member {number} **/
        this._zValue                     = YMagnetometer.ZVALUE_INVALID;
        //--- (end of YMagnetometer constructor)
    }

    //--- (YMagnetometer implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'bandwidth':
            this._bandwidth = parseInt(val);
            return 1;
        case 'xValue':
            this._xValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'yValue':
            this._yValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'zValue':
            this._zValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the measure update frequency, measured in Hz (Yocto-3D-V2 only).
     *
     * @return {number} an integer corresponding to the measure update frequency, measured in Hz (Yocto-3D-V2 only)
     *
     * On failure, throws an exception or returns YMagnetometer.BANDWIDTH_INVALID.
     */
    async get_bandwidth()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMagnetometer.BANDWIDTH_INVALID;
            }
        }
        res = this._bandwidth;
        return res;
    }

    /**
     * Changes the measure update frequency, measured in Hz (Yocto-3D-V2 only). When the
     * frequency is lower, the device performs averaging.
     *
     * @param newval {number} : an integer corresponding to the measure update frequency, measured in Hz
     * (Yocto-3D-V2 only)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bandwidth(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('bandwidth',rest_val);
    }

    /**
     * Returns the X component of the magnetic field, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the X component of the magnetic field, as
     * a floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.XVALUE_INVALID.
     */
    async get_xValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMagnetometer.XVALUE_INVALID;
            }
        }
        res = this._xValue;
        return res;
    }

    /**
     * Returns the Y component of the magnetic field, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the Y component of the magnetic field, as
     * a floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.YVALUE_INVALID.
     */
    async get_yValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMagnetometer.YVALUE_INVALID;
            }
        }
        res = this._yValue;
        return res;
    }

    /**
     * Returns the Z component of the magnetic field, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the Z component of the magnetic field, as
     * a floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.ZVALUE_INVALID.
     */
    async get_zValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMagnetometer.ZVALUE_INVALID;
            }
        }
        res = this._zValue;
        return res;
    }

    /**
     * Retrieves a magnetometer for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the magnetometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMagnetometer.isOnline() to test if the magnetometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a magnetometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the magnetometer
     *
     * @return {YMagnetometer} a YMagnetometer object allowing you to drive the magnetometer.
     */
    static FindMagnetometer(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Magnetometer', func);
        if (obj == null) {
            obj = new YMagnetometer(YAPI, func);
            YFunction._AddToCache('Magnetometer',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a magnetometer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the magnetometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMagnetometer.isOnline() to test if the magnetometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a magnetometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the magnetometer
     *
     * @return {YMagnetometer} a YMagnetometer object allowing you to drive the magnetometer.
     */
    static FindMagnetometerInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Magnetometer', func);
        if (obj == null) {
            obj = new YMagnetometer(yctx, func);
            YFunction._AddToCache('Magnetometer',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of magnetometers started using yFirstMagnetometer().
     *
     * @return {YMagnetometer} a pointer to a YMagnetometer object, corresponding to
     *         a magnetometer currently online, or a null pointer
     *         if there are no more magnetometers to enumerate.
     */
    nextMagnetometer()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMagnetometer.FindMagnetometerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of magnetometers currently accessible.
     * Use the method YMagnetometer.nextMagnetometer() to iterate on
     * next magnetometers.
     *
     * @return {YMagnetometer} a pointer to a YMagnetometer object, corresponding to
     *         the first magnetometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstMagnetometer()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Magnetometer');
        if(next_hwid == null) return null;
        return YMagnetometer.FindMagnetometer(next_hwid);
    }

    /**
     * Starts the enumeration of magnetometers currently accessible.
     * Use the method YMagnetometer.nextMagnetometer() to iterate on
     * next magnetometers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMagnetometer} a pointer to a YMagnetometer object, corresponding to
     *         the first magnetometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstMagnetometerInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Magnetometer');
        if(next_hwid == null) return null;
        return YMagnetometer.FindMagnetometerInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            BANDWIDTH_INVALID            : YAPI.INVALID_INT,
            XVALUE_INVALID               : YAPI.INVALID_DOUBLE,
            YVALUE_INVALID               : YAPI.INVALID_DOUBLE,
            ZVALUE_INVALID               : YAPI.INVALID_DOUBLE
        });
    }

    //--- (end of YMagnetometer implementation)
}

//
// YMagnetometerProxy Class: synchronous proxy to YMagnetometer objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YMagnetometer objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YMagnetometerProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YMagnetometer accessors declaration)

    /**
     * Returns the measure update frequency, measured in Hz (Yocto-3D-V2 only).
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz (Yocto-3D-V2 only)
     *
     * On failure, throws an exception or returns Y_BANDWIDTH_INVALID.
     */
    get_bandwidth()
    {
        return this.liveFunc._bandwidth;
    }

    /**
     * Changes the measure update frequency, measured in Hz (Yocto-3D-V2 only). When the
     * frequency is lower, the device performs averaging.
     *
     * @param newval : an integer corresponding to the measure update frequency, measured in Hz (Yocto-3D-V2 only)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bandwidth(newval)
    {
        this.liveFunc.set_bandwidth(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the X component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the X component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns Y_XVALUE_INVALID.
     */
    get_xValue()
    {
        return this.liveFunc._xValue;
    }

    /**
     * Returns the Y component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Y component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns Y_YVALUE_INVALID.
     */
    get_yValue()
    {
        return this.liveFunc._yValue;
    }

    /**
     * Returns the Z component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Z component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns Y_ZVALUE_INVALID.
     */
    get_zValue()
    {
        return this.liveFunc._zValue;
    }
    //--- (end of YMagnetometer accessors declaration)
}

//--- (YMagnetometer functions)

YoctoLibExport('YMagnetometer', YMagnetometer);
YoctoLibExport('YMagnetometerProxy', YMagnetometerProxy);
YMagnetometer.imm_Init();

//--- (end of YMagnetometer functions)
