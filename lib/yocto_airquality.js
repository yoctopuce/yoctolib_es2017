/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for AirQuality functions
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

//--- (YAirQuality return codes)
//--- (end of YAirQuality return codes)
//--- (YAirQuality definitions)
//--- (end of YAirQuality definitions)

//--- (YAirQuality class start)
/**
 * YAirQuality Class: air quality sensor control interface
 *
 * The YAirQuality class allows you to read and configure Yoctopuce air quality sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YAirQuality class start)

class YAirQuality extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YAirQuality constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'AirQuality';
        /** @member {number} **/
        this._ubaIndex                   = YAirQuality.UBAINDEX_INVALID;
        /** @member {number} **/
        this._relativeIndex              = YAirQuality.RELATIVEINDEX_INVALID;
        /** @member {number} **/
        this._aqiMode                    = YAirQuality.AQIMODE_INVALID;
        //--- (end of YAirQuality constructor)
    }

    //--- (YAirQuality implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'ubaIndex':
            this._ubaIndex = Math.round(val / 65.536) / 1000.0;
            return 1;
        case 'relativeIndex':
            this._relativeIndex = Math.round(val / 65.536) / 1000.0;
            return 1;
        case 'aqiMode':
            this._aqiMode = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current air quality index, according to UBA (from 1 to 5).
     *
     * @return a floating point number corresponding to the current air quality index, according to UBA (from 1 to 5)
     *
     * On failure, throws an exception or returns YAirQuality.UBAINDEX_INVALID.
     */
    async get_ubaIndex()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAirQuality.UBAINDEX_INVALID;
            }
        }
        res = this._ubaIndex;
        return res;
    }

    /**
     * Returns the relative air quality index, according to ScioSense (from 0 to 500).
     * A value below 100 indicates better-than-average air quality compared to the past 24 hours,
     * while a value above 100 indicates poorer-than-average air quality compared to the past 24 hours.
     *
     * @return a floating point number corresponding to the relative air quality index, according to
     * ScioSense (from 0 to 500)
     *
     * On failure, throws an exception or returns YAirQuality.RELATIVEINDEX_INVALID.
     */
    async get_relativeIndex()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAirQuality.RELATIVEINDEX_INVALID;
            }
        }
        res = this._relativeIndex;
        return res;
    }

    /**
     * Returns the type of index reported by the get_currentValue function and callbacks (UBA index or relative index).
     *
     * @return either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the type of
     * index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * On failure, throws an exception or returns YAirQuality.AQIMODE_INVALID.
     */
    async get_aqiMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAirQuality.AQIMODE_INVALID;
            }
        }
        res = this._aqiMode;
        return res;
    }

    /**
     * Changes the the type of index reported by the get_currentValue function and callbacks (UBA index or
     * relative index).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the
     * the type of index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_aqiMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('aqiMode',rest_val);
    }

    /**
     * Retrieves a air quality sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the air quality sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAirQuality.isOnline() to test if the air quality sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a air quality sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the air quality sensor, for instance
     *         MyDevice.airQuality.
     *
     * @return a YAirQuality object allowing you to drive the air quality sensor.
     */
    static FindAirQuality(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('AirQuality', func);
        if (obj == null) {
            obj = new YAirQuality(YAPI, func);
            YFunction._AddToCache('AirQuality', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a air quality sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the air quality sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAirQuality.isOnline() to test if the air quality sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a air quality sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the air quality sensor, for instance
     *         MyDevice.airQuality.
     *
     * @return a YAirQuality object allowing you to drive the air quality sensor.
     */
    static FindAirQualityInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'AirQuality', func);
        if (obj == null) {
            obj = new YAirQuality(yctx, func);
            YFunction._AddToCache('AirQuality', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of air quality sensors started using yFirstAirQuality().
     * Caution: You can't make any assumption about the returned air quality sensors order.
     * If you want to find a specific a air quality sensor, use AirQuality.findAirQuality()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         a air quality sensor currently online, or a null pointer
     *         if there are no more air quality sensors to enumerate.
     */
    nextAirQuality()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAirQuality.FindAirQualityInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of air quality sensors currently accessible.
     * Use the method YAirQuality.nextAirQuality() to iterate on
     * next air quality sensors.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         the first air quality sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstAirQuality()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('AirQuality');
        if(next_hwid == null) return null;
        return YAirQuality.FindAirQuality(next_hwid);
    }

    /**
     * Starts the enumeration of air quality sensors currently accessible.
     * Use the method YAirQuality.nextAirQuality() to iterate on
     * next air quality sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         the first air quality sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstAirQualityInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('AirQuality');
        if(next_hwid == null) return null;
        return YAirQuality.FindAirQualityInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            UBAINDEX_INVALID             : YAPI.INVALID_DOUBLE,
            RELATIVEINDEX_INVALID        : YAPI.INVALID_DOUBLE,
            AQIMODE_RELATIVE             : 0,
            AQIMODE_UBA                  : 1,
            AQIMODE_INVALID              : -1
        });
    }

    //--- (end of YAirQuality implementation)
}

//
// YAirQualityProxy Class: synchronous proxy to YAirQuality objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YAirQuality objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YAirQualityProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YAirQuality accessors declaration)

    /**
     * Returns the current air quality index, according to UBA (from 1 to 5).
     *
     * @return a floating point number corresponding to the current air quality index, according to UBA (from 1 to 5)
     *
     * On failure, throws an exception or returns YAirQuality.UBAINDEX_INVALID.
     */
    get_ubaIndex()
    {
        return this.liveFunc._ubaIndex;
    }

    /**
     * Returns the relative air quality index, according to ScioSense (from 0 to 500).
     * A value below 100 indicates better-than-average air quality compared to the past 24 hours,
     * while a value above 100 indicates poorer-than-average air quality compared to the past 24 hours.
     *
     * @return a floating point number corresponding to the relative air quality index, according to
     * ScioSense (from 0 to 500)
     *
     * On failure, throws an exception or returns YAirQuality.RELATIVEINDEX_INVALID.
     */
    get_relativeIndex()
    {
        return this.liveFunc._relativeIndex;
    }

    /**
     * Returns the type of index reported by the get_currentValue function and callbacks (UBA index or relative index).
     *
     * @return either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the type of
     * index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * On failure, throws an exception or returns YAirQuality.AQIMODE_INVALID.
     */
    get_aqiMode()
    {
        return this.liveFunc._aqiMode;
    }

    /**
     * Changes the the type of index reported by the get_currentValue function and callbacks (UBA index or
     * relative index).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the
     * the type of index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_aqiMode(newval)
    {
        this.liveFunc.set_aqiMode(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YAirQuality accessors declaration)
}

//--- (YAirQuality functions)

YoctoLibExport('YAirQuality', YAirQuality);
YoctoLibExport('YAirQualityProxy', YAirQualityProxy);
YAirQuality.imm_Init();

//--- (end of YAirQuality functions)

