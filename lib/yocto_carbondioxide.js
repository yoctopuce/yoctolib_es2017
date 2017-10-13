/*********************************************************************
 *
 * $Id: yocto_carbondioxide.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for CarbonDioxide functions
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

//--- (YCarbonDioxide return codes)
//--- (end of YCarbonDioxide return codes)
//--- (YCarbonDioxide definitions)
//--- (end of YCarbonDioxide definitions)

//--- (YCarbonDioxide class start)
/**
 * YCarbonDioxide Class: CarbonDioxide function interface
 *
 * The Yoctopuce class YCarbonDioxide allows you to read and configure Yoctopuce CO2
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * to register callback functions,  to access the autonomous datalogger.
 * This class adds the ability to perform manual calibration if reuired.
 */
//--- (end of YCarbonDioxide class start)

class YCarbonDioxide extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YCarbonDioxide constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'CarbonDioxide';
        /** @member {number} **/
        this._abcPeriod                  = YCarbonDioxide.ABCPERIOD_INVALID;
        /** @member {string} **/
        this._command                    = YCarbonDioxide.COMMAND_INVALID;
        //--- (end of YCarbonDioxide constructor)
    }

    //--- (YCarbonDioxide implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'abcPeriod':
            this._abcPeriod = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the Automatic Baseline Calibration period, in hours. A negative value
     * means that automatic baseline calibration is disabled.
     *
     * @return {number} an integer corresponding to the Automatic Baseline Calibration period, in hours
     *
     * On failure, throws an exception or returns YCarbonDioxide.ABCPERIOD_INVALID.
     */
    async get_abcPeriod()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCarbonDioxide.ABCPERIOD_INVALID;
            }
        }
        res = this._abcPeriod;
        return res;
    }

    /**
     * Changes Automatic Baseline Calibration period, in hours. If you need
     * to disable automatic baseline calibration (for instance when using the
     * sensor in an environment that is constantly above 400ppm CO2), set the
     * period to -1. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to Automatic Baseline Calibration period, in hours
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_abcPeriod(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('abcPeriod',rest_val);
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCarbonDioxide.COMMAND_INVALID;
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
     * Retrieves a CO2 sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the CO2 sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a CO2 sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the CO2 sensor
     *
     * @return {YCarbonDioxide} a YCarbonDioxide object allowing you to drive the CO2 sensor.
     */
    static FindCarbonDioxide(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('CarbonDioxide', func);
        if (obj == null) {
            obj = new YCarbonDioxide(YAPI, func);
            YFunction._AddToCache('CarbonDioxide',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a CO2 sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the CO2 sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a CO2 sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the CO2 sensor
     *
     * @return {YCarbonDioxide} a YCarbonDioxide object allowing you to drive the CO2 sensor.
     */
    static FindCarbonDioxideInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'CarbonDioxide', func);
        if (obj == null) {
            obj = new YCarbonDioxide(yctx, func);
            YFunction._AddToCache('CarbonDioxide',  func, obj);
        }
        return obj;
    }

    /**
     * Triggers a baseline calibration at standard CO2 ambiant level (400ppm).
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a baseline calibration, make sure to put the sensor
     * in a standard environment (e.g. outside in fresh air) at around 400ppm.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerBaselineCalibration()
    {
        return await this.set_command('BC');
    }

    async triggetBaselineCalibration()
    {
        return await this.triggerBaselineCalibration();
    }

    /**
     * Triggers a zero calibration of the sensor on carbon dioxide-free air.
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a zero calibration, you should circulate carbon
     * dioxide-free air within the sensor for a minute or two, using a small pipe
     * connected to the sensor. Please contact support@yoctopuce.com for more details
     * on the zero calibration procedure.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerZeroCalibration()
    {
        return await this.set_command('ZC');
    }

    async triggetZeroCalibration()
    {
        return await this.triggerZeroCalibration();
    }

    /**
     * Continues the enumeration of CO2 sensors started using yFirstCarbonDioxide().
     *
     * @return {YCarbonDioxide} a pointer to a YCarbonDioxide object, corresponding to
     *         a CO2 sensor currently online, or a null pointer
     *         if there are no more CO2 sensors to enumerate.
     */
    nextCarbonDioxide()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxideInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of CO2 sensors currently accessible.
     * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
     * next CO2 sensors.
     *
     * @return {YCarbonDioxide} a pointer to a YCarbonDioxide object, corresponding to
     *         the first CO2 sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCarbonDioxide()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('CarbonDioxide');
        if(next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxide(next_hwid);
    }

    /**
     * Starts the enumeration of CO2 sensors currently accessible.
     * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
     * next CO2 sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YCarbonDioxide} a pointer to a YCarbonDioxide object, corresponding to
     *         the first CO2 sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCarbonDioxideInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('CarbonDioxide');
        if(next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxideInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            ABCPERIOD_INVALID            : YAPI.INVALID_INT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YCarbonDioxide implementation)
}

//
// YCarbonDioxideProxy Class: synchronous proxy to YCarbonDioxide objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YCarbonDioxide objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YCarbonDioxideProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YCarbonDioxide accessors declaration)

    /**
     * Returns the Automatic Baseline Calibration period, in hours. A negative value
     * means that automatic baseline calibration is disabled.
     *
     * @return an integer corresponding to the Automatic Baseline Calibration period, in hours
     *
     * On failure, throws an exception or returns Y_ABCPERIOD_INVALID.
     */
    get_abcPeriod()
    {
        return this.liveFunc._abcPeriod;
    }

    /**
     * Changes Automatic Baseline Calibration period, in hours. If you need
     * to disable automatic baseline calibration (for instance when using the
     * sensor in an environment that is constantly above 400ppm CO2), set the
     * period to -1. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : an integer corresponding to Automatic Baseline Calibration period, in hours
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_abcPeriod(newval)
    {
        this.liveFunc.set_abcPeriod(newval);
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
     * Triggers a baseline calibration at standard CO2 ambiant level (400ppm).
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a baseline calibration, make sure to put the sensor
     * in a standard environment (e.g. outside in fresh air) at around 400ppm.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerBaselineCalibration()
    {
        this.liveFunc.triggerBaselineCalibration();
        return YAPI_SUCCESS;
    }

    triggetBaselineCalibration()
    {
        this.liveFunc.triggetBaselineCalibration();
        return YAPI_SUCCESS;
    }

    /**
     * Triggers a zero calibration of the sensor on carbon dioxide-free air.
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a zero calibration, you should circulate carbon
     * dioxide-free air within the sensor for a minute or two, using a small pipe
     * connected to the sensor. Please contact support@yoctopuce.com for more details
     * on the zero calibration procedure.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerZeroCalibration()
    {
        this.liveFunc.triggerZeroCalibration();
        return YAPI_SUCCESS;
    }

    triggetZeroCalibration()
    {
        this.liveFunc.triggetZeroCalibration();
        return YAPI_SUCCESS;
    }
    //--- (end of YCarbonDioxide accessors declaration)
}

//--- (YCarbonDioxide functions)

YoctoLibExport('YCarbonDioxide', YCarbonDioxide);
YoctoLibExport('YCarbonDioxideProxy', YCarbonDioxideProxy);
YCarbonDioxide.imm_Init();

//--- (end of YCarbonDioxide functions)
