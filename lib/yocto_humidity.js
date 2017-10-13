/*********************************************************************
 *
 * $Id: yocto_humidity.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for Humidity functions
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

//--- (YHumidity return codes)
//--- (end of YHumidity return codes)
//--- (YHumidity definitions)
//--- (end of YHumidity definitions)

//--- (YHumidity class start)
/**
 * YHumidity Class: Humidity function interface
 *
 * The Yoctopuce class YHumidity allows you to read and configure Yoctopuce humidity
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 */
//--- (end of YHumidity class start)

class YHumidity extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YHumidity constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Humidity';
        /** @member {number} **/
        this._relHum                     = YHumidity.RELHUM_INVALID;
        /** @member {number} **/
        this._absHum                     = YHumidity.ABSHUM_INVALID;
        //--- (end of YHumidity constructor)
    }

    //--- (YHumidity implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'relHum':
            this._relHum = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'absHum':
            this._absHum = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the primary unit for measuring humidity. That unit is a string.
     * If that strings starts with the letter 'g', the primary measured value is the absolute
     * humidity, in g/m3. Otherwise, the primary measured value will be the relative humidity
     * (RH), in per cents.
     *
     * Remember to call the saveToFlash() method of the module if the modification
     * must be kept.
     *
     * @param newval {string} : a string corresponding to the primary unit for measuring humidity
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_unit(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('unit',rest_val);
    }

    /**
     * Returns the current relative humidity, in per cents.
     *
     * @return {number} a floating point number corresponding to the current relative humidity, in per cents
     *
     * On failure, throws an exception or returns YHumidity.RELHUM_INVALID.
     */
    async get_relHum()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YHumidity.RELHUM_INVALID;
            }
        }
        res = this._relHum;
        return res;
    }

    /**
     * Returns the current absolute humidity, in grams per cubic meter of air.
     *
     * @return {number} a floating point number corresponding to the current absolute humidity, in grams
     * per cubic meter of air
     *
     * On failure, throws an exception or returns YHumidity.ABSHUM_INVALID.
     */
    async get_absHum()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YHumidity.ABSHUM_INVALID;
            }
        }
        res = this._absHum;
        return res;
    }

    /**
     * Retrieves a humidity sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the humidity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHumidity.isOnline() to test if the humidity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a humidity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the humidity sensor
     *
     * @return {YHumidity} a YHumidity object allowing you to drive the humidity sensor.
     */
    static FindHumidity(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Humidity', func);
        if (obj == null) {
            obj = new YHumidity(YAPI, func);
            YFunction._AddToCache('Humidity',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a humidity sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the humidity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHumidity.isOnline() to test if the humidity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a humidity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the humidity sensor
     *
     * @return {YHumidity} a YHumidity object allowing you to drive the humidity sensor.
     */
    static FindHumidityInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Humidity', func);
        if (obj == null) {
            obj = new YHumidity(yctx, func);
            YFunction._AddToCache('Humidity',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of humidity sensors started using yFirstHumidity().
     *
     * @return {YHumidity} a pointer to a YHumidity object, corresponding to
     *         a humidity sensor currently online, or a null pointer
     *         if there are no more humidity sensors to enumerate.
     */
    nextHumidity()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YHumidity.FindHumidityInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of humidity sensors currently accessible.
     * Use the method YHumidity.nextHumidity() to iterate on
     * next humidity sensors.
     *
     * @return {YHumidity} a pointer to a YHumidity object, corresponding to
     *         the first humidity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstHumidity()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Humidity');
        if(next_hwid == null) return null;
        return YHumidity.FindHumidity(next_hwid);
    }

    /**
     * Starts the enumeration of humidity sensors currently accessible.
     * Use the method YHumidity.nextHumidity() to iterate on
     * next humidity sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YHumidity} a pointer to a YHumidity object, corresponding to
     *         the first humidity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstHumidityInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Humidity');
        if(next_hwid == null) return null;
        return YHumidity.FindHumidityInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            RELHUM_INVALID               : YAPI.INVALID_DOUBLE,
            ABSHUM_INVALID               : YAPI.INVALID_DOUBLE
        });
    }

    //--- (end of YHumidity implementation)
}

//
// YHumidityProxy Class: synchronous proxy to YHumidity objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YHumidity objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YHumidityProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YHumidity accessors declaration)

    /**
     * Changes the primary unit for measuring humidity. That unit is a string.
     * If that strings starts with the letter 'g', the primary measured value is the absolute
     * humidity, in g/m3. Otherwise, the primary measured value will be the relative humidity
     * (RH), in per cents.
     *
     * Remember to call the saveToFlash() method of the module if the modification
     * must be kept.
     *
     * @param newval : a string corresponding to the primary unit for measuring humidity
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval)
    {
        this.liveFunc.set_unit(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current relative humidity, in per cents.
     *
     * @return a floating point number corresponding to the current relative humidity, in per cents
     *
     * On failure, throws an exception or returns Y_RELHUM_INVALID.
     */
    get_relHum()
    {
        return this.liveFunc._relHum;
    }

    /**
     * Returns the current absolute humidity, in grams per cubic meter of air.
     *
     * @return a floating point number corresponding to the current absolute humidity, in grams per cubic meter of air
     *
     * On failure, throws an exception or returns Y_ABSHUM_INVALID.
     */
    get_absHum()
    {
        return this.liveFunc._absHum;
    }
    //--- (end of YHumidity accessors declaration)
}

//--- (YHumidity functions)

YoctoLibExport('YHumidity', YHumidity);
YoctoLibExport('YHumidityProxy', YHumidityProxy);
YHumidity.imm_Init();

//--- (end of YHumidity functions)
