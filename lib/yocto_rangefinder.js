/*********************************************************************
 *
 * $Id: yocto_rangefinder.js 35185 2019-04-16 19:43:18Z mvuilleu $
 *
 * Implements the high-level API for RangeFinder functions
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

//--- (generated code: YRangeFinder return codes)
//--- (end of generated code: YRangeFinder return codes)
//--- (generated code: YRangeFinder definitions)
//--- (end of generated code: YRangeFinder definitions)

//--- (generated code: YRangeFinder class start)
/**
 * YRangeFinder Class: RangeFinder function interface
 *
 * The Yoctopuce class YRangeFinder allows you to use and configure Yoctopuce range finder
 * sensors. It inherits from the YSensor class the core functions to read measurements,
 * register callback functions, access the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 */
//--- (end of generated code: YRangeFinder class start)

class YRangeFinder extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (generated code: YRangeFinder constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'RangeFinder';
        /** @member {number} **/
        this._rangeFinderMode            = YRangeFinder.RANGEFINDERMODE_INVALID;
        /** @member {number} **/
        this._timeFrame                  = YRangeFinder.TIMEFRAME_INVALID;
        /** @member {number} **/
        this._quality                    = YRangeFinder.QUALITY_INVALID;
        /** @member {string} **/
        this._hardwareCalibration        = YRangeFinder.HARDWARECALIBRATION_INVALID;
        /** @member {number} **/
        this._currentTemperature         = YRangeFinder.CURRENTTEMPERATURE_INVALID;
        /** @member {string} **/
        this._command                    = YRangeFinder.COMMAND_INVALID;
        //--- (end of generated code: YRangeFinder constructor)
    }

    //--- (generated code: YRangeFinder implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'rangeFinderMode':
            this._rangeFinderMode = parseInt(val);
            return 1;
        case 'timeFrame':
            this._timeFrame = parseInt(val);
            return 1;
        case 'quality':
            this._quality = parseInt(val);
            return 1;
        case 'hardwareCalibration':
            this._hardwareCalibration = val;
            return 1;
        case 'currentTemperature':
            this._currentTemperature = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured range. That unit is a string.
     * String value can be " or mm. Any other value is ignored.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the rangeFinder function, a
     * unit system change will probably break it.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the measured range
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
     * Returns the range finder running mode. The rangefinder running mode
     * allows you to put priority on precision, speed or maximum range.
     *
     * @return {number} a value among YRangeFinder.RANGEFINDERMODE_DEFAULT,
     * YRangeFinder.RANGEFINDERMODE_LONG_RANGE, YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and
     * YRangeFinder.RANGEFINDERMODE_HIGH_SPEED corresponding to the range finder running mode
     *
     * On failure, throws an exception or returns YRangeFinder.RANGEFINDERMODE_INVALID.
     */
    async get_rangeFinderMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.RANGEFINDERMODE_INVALID;
            }
        }
        res = this._rangeFinderMode;
        return res;
    }

    /**
     * Changes the rangefinder running mode, allowing you to put priority on
     * precision, speed or maximum range.
     *
     * @param newval {number} : a value among YRangeFinder.RANGEFINDERMODE_DEFAULT,
     * YRangeFinder.RANGEFINDERMODE_LONG_RANGE, YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and
     * YRangeFinder.RANGEFINDERMODE_HIGH_SPEED corresponding to the rangefinder running mode, allowing you
     * to put priority on
     *         precision, speed or maximum range
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rangeFinderMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('rangeFinderMode',rest_val);
    }

    /**
     * Returns the time frame used to measure the distance and estimate the measure
     * reliability. The time frame is expressed in milliseconds.
     *
     * @return {number} an integer corresponding to the time frame used to measure the distance and
     * estimate the measure
     *         reliability
     *
     * On failure, throws an exception or returns YRangeFinder.TIMEFRAME_INVALID.
     */
    async get_timeFrame()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.TIMEFRAME_INVALID;
            }
        }
        res = this._timeFrame;
        return res;
    }

    /**
     * Changes the time frame used to measure the distance and estimate the measure
     * reliability. The time frame is expressed in milliseconds. A larger timeframe
     * improves stability and reliability, at the cost of higher latency, but prevents
     * the detection of events shorter than the time frame.
     *
     * @param newval {number} : an integer corresponding to the time frame used to measure the distance
     * and estimate the measure
     *         reliability
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_timeFrame(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('timeFrame',rest_val);
    }

    /**
     * Returns a measure quality estimate, based on measured dispersion.
     *
     * @return {number} an integer corresponding to a measure quality estimate, based on measured dispersion
     *
     * On failure, throws an exception or returns YRangeFinder.QUALITY_INVALID.
     */
    async get_quality()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.QUALITY_INVALID;
            }
        }
        res = this._quality;
        return res;
    }

    async get_hardwareCalibration()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.HARDWARECALIBRATION_INVALID;
            }
        }
        res = this._hardwareCalibration;
        return res;
    }

    async set_hardwareCalibration(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('hardwareCalibration',rest_val);
    }

    /**
     * Returns the current sensor temperature, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the current sensor temperature, as a
     * floating point number
     *
     * On failure, throws an exception or returns YRangeFinder.CURRENTTEMPERATURE_INVALID.
     */
    async get_currentTemperature()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.CURRENTTEMPERATURE_INVALID;
            }
        }
        res = this._currentTemperature;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.COMMAND_INVALID;
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
     * Retrieves a range finder for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the range finder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRangeFinder.isOnline() to test if the range finder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a range finder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the range finder
     *
     * @return {YRangeFinder} a YRangeFinder object allowing you to drive the range finder.
     */
    static FindRangeFinder(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('RangeFinder', func);
        if (obj == null) {
            obj = new YRangeFinder(YAPI, func);
            YFunction._AddToCache('RangeFinder',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a range finder for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the range finder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRangeFinder.isOnline() to test if the range finder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a range finder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the range finder
     *
     * @return {YRangeFinder} a YRangeFinder object allowing you to drive the range finder.
     */
    static FindRangeFinderInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'RangeFinder', func);
        if (obj == null) {
            obj = new YRangeFinder(yctx, func);
            YFunction._AddToCache('RangeFinder',  func, obj);
        }
        return obj;
    }

    /**
     * Returns the temperature at the time when the latest calibration was performed.
     * This function can be used to determine if a new calibration for ambient temperature
     * is required.
     *
     * @return {number} a temperature, as a floating point number.
     *         On failure, throws an exception or return YAPI.INVALID_DOUBLE.
     */
    async get_hardwareCalibrationTemperature()
    {
        /** @type {string} **/
        let hwcal;
        hwcal = await this.get_hardwareCalibration();
        if (!((hwcal).substr(0, 1) == '@')) {
            return this._yapi.INVALID_DOUBLE;
        }
        return this._yapi.imm_atoi((hwcal).substr(1, (hwcal).length));
    }

    /**
     * Triggers a sensor calibration according to the current ambient temperature. That
     * calibration process needs no physical interaction with the sensor. It is performed
     * automatically at device startup, but it is recommended to start it again when the
     * temperature delta since the latest calibration exceeds 8°C.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async triggerTemperatureCalibration()
    {
        return await this.set_command('T');
    }

    /**
     * Triggers the photon detector hardware calibration.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async triggerSpadCalibration()
    {
        return await this.set_command('S');
    }

    /**
     * Triggers the hardware offset calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist {number} : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async triggerOffsetCalibration(targetDist)
    {
        /** @type {number} **/
        let distmm;
        if (await this.get_unit() == '"') {
            distmm = Math.round(targetDist * 25.4);
        } else {
            distmm = Math.round(targetDist);
        }
        return await this.set_command('O'+String(Math.round(distmm)));
    }

    /**
     * Triggers the hardware cross-talk calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist {number} : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async triggerXTalkCalibration(targetDist)
    {
        /** @type {number} **/
        let distmm;
        if (await this.get_unit() == '"') {
            distmm = Math.round(targetDist * 25.4);
        } else {
            distmm = Math.round(targetDist);
        }
        return await this.set_command('X'+String(Math.round(distmm)));
    }

    /**
     * Cancels the effect of previous hardware calibration procedures to compensate
     * for cover glass, and restores factory settings.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async cancelCoverGlassCalibrations()
    {
        return await this.set_hardwareCalibration('');
    }

    /**
     * Continues the enumeration of range finders started using yFirstRangeFinder().
     * Caution: You can't make any assumption about the returned range finders order.
     * If you want to find a specific a range finder, use RangeFinder.findRangeFinder()
     * and a hardwareID or a logical name.
     *
     * @return {YRangeFinder} a pointer to a YRangeFinder object, corresponding to
     *         a range finder currently online, or a null pointer
     *         if there are no more range finders to enumerate.
     */
    nextRangeFinder()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YRangeFinder.FindRangeFinderInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of range finders currently accessible.
     * Use the method YRangeFinder.nextRangeFinder() to iterate on
     * next range finders.
     *
     * @return {YRangeFinder} a pointer to a YRangeFinder object, corresponding to
     *         the first range finder currently online, or a null pointer
     *         if there are none.
     */
    static FirstRangeFinder()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('RangeFinder');
        if(next_hwid == null) return null;
        return YRangeFinder.FindRangeFinder(next_hwid);
    }

    /**
     * Starts the enumeration of range finders currently accessible.
     * Use the method YRangeFinder.nextRangeFinder() to iterate on
     * next range finders.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YRangeFinder} a pointer to a YRangeFinder object, corresponding to
     *         the first range finder currently online, or a null pointer
     *         if there are none.
     */
    static FirstRangeFinderInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('RangeFinder');
        if(next_hwid == null) return null;
        return YRangeFinder.FindRangeFinderInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            RANGEFINDERMODE_DEFAULT      : 0,
            RANGEFINDERMODE_LONG_RANGE   : 1,
            RANGEFINDERMODE_HIGH_ACCURACY : 2,
            RANGEFINDERMODE_HIGH_SPEED   : 3,
            RANGEFINDERMODE_INVALID      : -1,
            TIMEFRAME_INVALID            : YAPI.INVALID_LONG,
            QUALITY_INVALID              : YAPI.INVALID_UINT,
            HARDWARECALIBRATION_INVALID  : YAPI.INVALID_STRING,
            CURRENTTEMPERATURE_INVALID   : YAPI.INVALID_DOUBLE,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of generated code: YRangeFinder implementation)
}

//
// YRangeFinderProxy Class: synchronous proxy to YRangeFinder objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YRangeFinder objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YRangeFinderProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    /**
     * Returns the temperature at the time when the latest calibration was performed.
     * This function can be used to determine if a new calibration for ambient temperature
     * is required.
     *
     * @return {number} a temperature, as a floating point number.
     *         On failure, throws an exception or return YAPI.INVALID_DOUBLE.
     */
    get_hardwareCalibrationTemperature()
    {
        /** @type {string} **/
        let hwcal;

        hwcal = this.liveFunc._hardwareCalibration;
        if (!((hwcal).substr(0, 1) == '@')) {
            return YAPI.INVALID_DOUBLE;
        }
        return this._yapi.imm_atoi((hwcal).substr(1, (hwcal).length));
    }

    //--- (generated code: YRangeFinder accessors declaration)

    /**
     * Changes the measuring unit for the measured range. That unit is a string.
     * String value can be " or mm. Any other value is ignored.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the rangeFinder function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured range
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
     * Returns the range finder running mode. The rangefinder running mode
     * allows you to put priority on precision, speed or maximum range.
     *
     * @return a value among Y_RANGEFINDERMODE_DEFAULT, Y_RANGEFINDERMODE_LONG_RANGE,
     * Y_RANGEFINDERMODE_HIGH_ACCURACY and Y_RANGEFINDERMODE_HIGH_SPEED corresponding to the range finder running mode
     *
     * On failure, throws an exception or returns Y_RANGEFINDERMODE_INVALID.
     */
    get_rangeFinderMode()
    {
        return this.liveFunc._rangeFinderMode;
    }

    /**
     * Changes the rangefinder running mode, allowing you to put priority on
     * precision, speed or maximum range.
     *
     * @param newval : a value among Y_RANGEFINDERMODE_DEFAULT, Y_RANGEFINDERMODE_LONG_RANGE,
     * Y_RANGEFINDERMODE_HIGH_ACCURACY and Y_RANGEFINDERMODE_HIGH_SPEED corresponding to the rangefinder
     * running mode, allowing you to put priority on
     *         precision, speed or maximum range
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rangeFinderMode(newval)
    {
        this.liveFunc.set_rangeFinderMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the time frame used to measure the distance and estimate the measure
     * reliability. The time frame is expressed in milliseconds.
     *
     * @return an integer corresponding to the time frame used to measure the distance and estimate the measure
     *         reliability
     *
     * On failure, throws an exception or returns Y_TIMEFRAME_INVALID.
     */
    get_timeFrame()
    {
        return this.liveFunc._timeFrame;
    }

    /**
     * Changes the time frame used to measure the distance and estimate the measure
     * reliability. The time frame is expressed in milliseconds. A larger timeframe
     * improves stability and reliability, at the cost of higher latency, but prevents
     * the detection of events shorter than the time frame.
     *
     * @param newval : an integer corresponding to the time frame used to measure the distance and estimate the measure
     *         reliability
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_timeFrame(newval)
    {
        this.liveFunc.set_timeFrame(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a measure quality estimate, based on measured dispersion.
     *
     * @return an integer corresponding to a measure quality estimate, based on measured dispersion
     *
     * On failure, throws an exception or returns Y_QUALITY_INVALID.
     */
    get_quality()
    {
        return this.liveFunc._quality;
    }

    get_hardwareCalibration()
    {
        return this.liveFunc._hardwareCalibration;
    }

    set_hardwareCalibration(newval)
    {
        this.liveFunc.set_hardwareCalibration(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current sensor temperature, as a floating point number.
     *
     * @return a floating point number corresponding to the current sensor temperature, as a floating point number
     *
     * On failure, throws an exception or returns Y_CURRENTTEMPERATURE_INVALID.
     */
    get_currentTemperature()
    {
        return this.liveFunc._currentTemperature;
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
     * Triggers a sensor calibration according to the current ambient temperature. That
     * calibration process needs no physical interaction with the sensor. It is performed
     * automatically at device startup, but it is recommended to start it again when the
     * temperature delta since the latest calibration exceeds 8°C.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerTemperatureCalibration()
    {
        this.liveFunc.triggerTemperatureCalibration();
        return YAPI_SUCCESS;
    }

    /**
     * Triggers the photon detector hardware calibration.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerSpadCalibration()
    {
        this.liveFunc.triggerSpadCalibration();
        return YAPI_SUCCESS;
    }

    /**
     * Triggers the hardware offset calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerOffsetCalibration(targetDist)
    {
        this.liveFunc.triggerOffsetCalibration(targetDist);
        return YAPI_SUCCESS;
    }

    /**
     * Triggers the hardware cross-talk calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerXTalkCalibration(targetDist)
    {
        this.liveFunc.triggerXTalkCalibration(targetDist);
        return YAPI_SUCCESS;
    }

    /**
     * Cancels the effect of previous hardware calibration procedures to compensate
     * for cover glass, and restores factory settings.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    cancelCoverGlassCalibrations()
    {
        this.liveFunc.cancelCoverGlassCalibrations();
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YRangeFinder accessors declaration)
}

//--- (generated code: YRangeFinder functions)

YoctoLibExport('YRangeFinder', YRangeFinder);
YoctoLibExport('YRangeFinderProxy', YRangeFinderProxy);
YRangeFinder.imm_Init();

//--- (end of generated code: YRangeFinder functions)
