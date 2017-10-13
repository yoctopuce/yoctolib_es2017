/*********************************************************************
 *
 * $Id: yocto_altitude.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for Altitude functions
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

//--- (YAltitude return codes)
//--- (end of YAltitude return codes)
//--- (YAltitude definitions)
//--- (end of YAltitude definitions)

//--- (YAltitude class start)
/**
 * YAltitude Class: Altitude function interface
 *
 * The Yoctopuce class YAltitude allows you to read and configure Yoctopuce altitude
 * sensors. It inherits from the YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 * This class adds the ability to configure the barometric pressure adjusted to
 * sea level (QNH) for barometric sensors.
 */
//--- (end of YAltitude class start)

class YAltitude extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YAltitude constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Altitude';
        /** @member {number} **/
        this._qnh                        = YAltitude.QNH_INVALID;
        /** @member {string} **/
        this._technology                 = YAltitude.TECHNOLOGY_INVALID;
        //--- (end of YAltitude constructor)
    }

    //--- (YAltitude implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'qnh':
            this._qnh = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'technology':
            this._technology = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the current estimated altitude. This allows to compensate for
     * ambient pressure variations and to work in relative mode.
     *
     * @param newval {number} : a floating point number corresponding to the current estimated altitude
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentValue(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentValue',rest_val);
    }

    /**
     * Changes the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH). This enables you to compensate for atmospheric pressure
     * changes due to weather conditions.
     *
     * @param newval {number} : a floating point number corresponding to the barometric pressure adjusted
     * to sea level used to compute
     *         the altitude (QNH)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_qnh(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('qnh',rest_val);
    }

    /**
     * Returns the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH).
     *
     * @return {number} a floating point number corresponding to the barometric pressure adjusted to sea
     * level used to compute
     *         the altitude (QNH)
     *
     * On failure, throws an exception or returns YAltitude.QNH_INVALID.
     */
    async get_qnh()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAltitude.QNH_INVALID;
            }
        }
        res = this._qnh;
        return res;
    }

    /**
     * Returns the technology used by the sesnor to compute
     * altitude. Possibles values are  "barometric" and "gps"
     *
     * @return {string} a string corresponding to the technology used by the sesnor to compute
     *         altitude
     *
     * On failure, throws an exception or returns YAltitude.TECHNOLOGY_INVALID.
     */
    async get_technology()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAltitude.TECHNOLOGY_INVALID;
            }
        }
        res = this._technology;
        return res;
    }

    /**
     * Retrieves an altimeter for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the altimeter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAltitude.isOnline() to test if the altimeter is
     * indeed online at a given time. In case of ambiguity when looking for
     * an altimeter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the altimeter
     *
     * @return {YAltitude} a YAltitude object allowing you to drive the altimeter.
     */
    static FindAltitude(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Altitude', func);
        if (obj == null) {
            obj = new YAltitude(YAPI, func);
            YFunction._AddToCache('Altitude',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an altimeter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the altimeter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAltitude.isOnline() to test if the altimeter is
     * indeed online at a given time. In case of ambiguity when looking for
     * an altimeter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the altimeter
     *
     * @return {YAltitude} a YAltitude object allowing you to drive the altimeter.
     */
    static FindAltitudeInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Altitude', func);
        if (obj == null) {
            obj = new YAltitude(yctx, func);
            YFunction._AddToCache('Altitude',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of altimeters started using yFirstAltitude().
     *
     * @return {YAltitude} a pointer to a YAltitude object, corresponding to
     *         an altimeter currently online, or a null pointer
     *         if there are no more altimeters to enumerate.
     */
    nextAltitude()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAltitude.FindAltitudeInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of altimeters currently accessible.
     * Use the method YAltitude.nextAltitude() to iterate on
     * next altimeters.
     *
     * @return {YAltitude} a pointer to a YAltitude object, corresponding to
     *         the first altimeter currently online, or a null pointer
     *         if there are none.
     */
    static FirstAltitude()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Altitude');
        if(next_hwid == null) return null;
        return YAltitude.FindAltitude(next_hwid);
    }

    /**
     * Starts the enumeration of altimeters currently accessible.
     * Use the method YAltitude.nextAltitude() to iterate on
     * next altimeters.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YAltitude} a pointer to a YAltitude object, corresponding to
     *         the first altimeter currently online, or a null pointer
     *         if there are none.
     */
    static FirstAltitudeInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Altitude');
        if(next_hwid == null) return null;
        return YAltitude.FindAltitudeInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            QNH_INVALID                  : YAPI.INVALID_DOUBLE,
            TECHNOLOGY_INVALID           : YAPI.INVALID_STRING
        });
    }

    //--- (end of YAltitude implementation)
}

//
// YAltitudeProxy Class: synchronous proxy to YAltitude objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YAltitude objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YAltitudeProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YAltitude accessors declaration)

    /**
     * Changes the current estimated altitude. This allows to compensate for
     * ambient pressure variations and to work in relative mode.
     *
     * @param newval : a floating point number corresponding to the current estimated altitude
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentValue(newval)
    {
        this.liveFunc.set_currentValue(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH). This enables you to compensate for atmospheric pressure
     * changes due to weather conditions.
     *
     * @param newval : a floating point number corresponding to the barometric pressure adjusted to sea
     * level used to compute
     *         the altitude (QNH)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_qnh(newval)
    {
        this.liveFunc.set_qnh(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH).
     *
     * @return a floating point number corresponding to the barometric pressure adjusted to sea level used to compute
     *         the altitude (QNH)
     *
     * On failure, throws an exception or returns Y_QNH_INVALID.
     */
    get_qnh()
    {
        return this.liveFunc._qnh;
    }

    /**
     * Returns the technology used by the sesnor to compute
     * altitude. Possibles values are  "barometric" and "gps"
     *
     * @return a string corresponding to the technology used by the sesnor to compute
     *         altitude
     *
     * On failure, throws an exception or returns Y_TECHNOLOGY_INVALID.
     */
    get_technology()
    {
        return this.liveFunc._technology;
    }
    //--- (end of YAltitude accessors declaration)
}

//--- (YAltitude functions)

YoctoLibExport('YAltitude', YAltitude);
YoctoLibExport('YAltitudeProxy', YAltitudeProxy);
YAltitude.imm_Init();

//--- (end of YAltitude functions)
