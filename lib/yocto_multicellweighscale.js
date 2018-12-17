/*********************************************************************
 *
 *  $Id: yocto_multicellweighscale.js 33712 2018-12-14 14:19:38Z seb $
 *
 *  Implements the high-level API for MultiCellWeighScale functions
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

//--- (YMultiCellWeighScale return codes)
//--- (end of YMultiCellWeighScale return codes)
//--- (YMultiCellWeighScale definitions)
//--- (end of YMultiCellWeighScale definitions)

//--- (YMultiCellWeighScale class start)
/**
 * YMultiCellWeighScale Class: MultiCellWeighScale function interface
 *
 * The YMultiCellWeighScale class provides a weight measurement from a set of ratiometric load cells
 * sensor. It can be used to control the bridge excitation parameters, in order to avoid
 * measure shifts caused by temperature variation in the electronics, and can also
 * automatically apply an additional correction factor based on temperature to
 * compensate for offsets in the load cells themselves.
 */
//--- (end of YMultiCellWeighScale class start)

class YMultiCellWeighScale extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YMultiCellWeighScale constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'MultiCellWeighScale';
        /** @member {number} **/
        this._cellCount                  = YMultiCellWeighScale.CELLCOUNT_INVALID;
        /** @member {number} **/
        this._excitation                 = YMultiCellWeighScale.EXCITATION_INVALID;
        /** @member {number} **/
        this._tempAvgAdaptRatio          = YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID;
        /** @member {number} **/
        this._tempChgAdaptRatio          = YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID;
        /** @member {number} **/
        this._compTempAvg                = YMultiCellWeighScale.COMPTEMPAVG_INVALID;
        /** @member {number} **/
        this._compTempChg                = YMultiCellWeighScale.COMPTEMPCHG_INVALID;
        /** @member {number} **/
        this._compensation               = YMultiCellWeighScale.COMPENSATION_INVALID;
        /** @member {number} **/
        this._zeroTracking               = YMultiCellWeighScale.ZEROTRACKING_INVALID;
        /** @member {string} **/
        this._command                    = YMultiCellWeighScale.COMMAND_INVALID;
        //--- (end of YMultiCellWeighScale constructor)
    }

    //--- (YMultiCellWeighScale implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'cellCount':
            this._cellCount = parseInt(val);
            return 1;
        case 'excitation':
            this._excitation = parseInt(val);
            return 1;
        case 'tempAvgAdaptRatio':
            this._tempAvgAdaptRatio = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'tempChgAdaptRatio':
            this._tempChgAdaptRatio = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'compTempAvg':
            this._compTempAvg = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'compTempChg':
            this._compTempChg = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'compensation':
            this._compensation = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'zeroTracking':
            this._zeroTracking = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the weight.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the weight
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
     * Returns the number of load cells in use.
     *
     * @return {number} an integer corresponding to the number of load cells in use
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.CELLCOUNT_INVALID.
     */
    async get_cellCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.CELLCOUNT_INVALID;
            }
        }
        res = this._cellCount;
        return res;
    }

    /**
     * Changes the number of load cells in use.
     *
     * @param newval {number} : an integer corresponding to the number of load cells in use
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_cellCount(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('cellCount',rest_val);
    }

    /**
     * Returns the current load cell bridge excitation method.
     *
     * @return {number} a value among YMultiCellWeighScale.EXCITATION_OFF,
     * YMultiCellWeighScale.EXCITATION_DC and YMultiCellWeighScale.EXCITATION_AC corresponding to the
     * current load cell bridge excitation method
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.EXCITATION_INVALID.
     */
    async get_excitation()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.EXCITATION_INVALID;
            }
        }
        res = this._excitation;
        return res;
    }

    /**
     * Changes the current load cell bridge excitation method.
     *
     * @param newval {number} : a value among YMultiCellWeighScale.EXCITATION_OFF,
     * YMultiCellWeighScale.EXCITATION_DC and YMultiCellWeighScale.EXCITATION_AC corresponding to the
     * current load cell bridge excitation method
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_excitation(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('excitation',rest_val);
    }

    /**
     * Changes the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     *
     * @param newval {number} : a floating point number corresponding to the averaged temperature update
     * rate, in per mille
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tempAvgAdaptRatio(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('tempAvgAdaptRatio',rest_val);
    }

    /**
     * Returns the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     *
     * @return {number} a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID.
     */
    async get_tempAvgAdaptRatio()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID;
            }
        }
        res = this._tempAvgAdaptRatio;
        return res;
    }

    /**
     * Changes the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 pour mille.
     *
     * @param newval {number} : a floating point number corresponding to the temperature change update
     * rate, in per mille
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tempChgAdaptRatio(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('tempChgAdaptRatio',rest_val);
    }

    /**
     * Returns the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 pour mille.
     *
     * @return {number} a floating point number corresponding to the temperature change update rate, in per mille
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID.
     */
    async get_tempChgAdaptRatio()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID;
            }
        }
        res = this._tempChgAdaptRatio;
        return res;
    }

    /**
     * Returns the current averaged temperature, used for thermal compensation.
     *
     * @return {number} a floating point number corresponding to the current averaged temperature, used
     * for thermal compensation
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.COMPTEMPAVG_INVALID.
     */
    async get_compTempAvg()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMPTEMPAVG_INVALID;
            }
        }
        res = this._compTempAvg;
        return res;
    }

    /**
     * Returns the current temperature variation, used for thermal compensation.
     *
     * @return {number} a floating point number corresponding to the current temperature variation, used
     * for thermal compensation
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.COMPTEMPCHG_INVALID.
     */
    async get_compTempChg()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMPTEMPCHG_INVALID;
            }
        }
        res = this._compTempChg;
        return res;
    }

    /**
     * Returns the current current thermal compensation value.
     *
     * @return {number} a floating point number corresponding to the current current thermal compensation value
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.COMPENSATION_INVALID.
     */
    async get_compensation()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMPENSATION_INVALID;
            }
        }
        res = this._compensation;
        return res;
    }

    /**
     * Changes the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     *
     * @param newval {number} : a floating point number corresponding to the zero tracking threshold value
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_zeroTracking(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('zeroTracking',rest_val);
    }

    /**
     * Returns the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     *
     * @return {number} a floating point number corresponding to the zero tracking threshold value
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.ZEROTRACKING_INVALID.
     */
    async get_zeroTracking()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.ZEROTRACKING_INVALID;
            }
        }
        res = this._zeroTracking;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMMAND_INVALID;
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
     * Retrieves a multi-cell weighing scale sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-cell weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiCellWeighScale.isOnline() to test if the multi-cell weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-cell weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the multi-cell weighing scale sensor
     *
     * @return {YMultiCellWeighScale} a YMultiCellWeighScale object allowing you to drive the multi-cell
     * weighing scale sensor.
     */
    static FindMultiCellWeighScale(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('MultiCellWeighScale', func);
        if (obj == null) {
            obj = new YMultiCellWeighScale(YAPI, func);
            YFunction._AddToCache('MultiCellWeighScale',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a multi-cell weighing scale sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-cell weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiCellWeighScale.isOnline() to test if the multi-cell weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-cell weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the multi-cell weighing scale sensor
     *
     * @return {YMultiCellWeighScale} a YMultiCellWeighScale object allowing you to drive the multi-cell
     * weighing scale sensor.
     */
    static FindMultiCellWeighScaleInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'MultiCellWeighScale', func);
        if (obj == null) {
            obj = new YMultiCellWeighScale(yctx, func);
            YFunction._AddToCache('MultiCellWeighScale',  func, obj);
        }
        return obj;
    }

    /**
     * Adapts the load cell signal bias (stored in the corresponding genericSensor)
     * so that the current signal corresponds to a zero weight.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async tare()
    {
        return await this.set_command('T');
    }

    /**
     * Configures the load cells span parameters (stored in the corresponding genericSensors)
     * so that the current signal corresponds to the specified reference weight.
     *
     * @param currWeight {number} : reference weight presently on the load cell.
     * @param maxWeight {number} : maximum weight to be expected on the load cell.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setupSpan(currWeight,maxWeight)
    {
        return await this.set_command('S'+String(Math.round(Math.round(1000*currWeight)))+':'+String(Math.round(Math.round(1000*maxWeight))));
    }

    /**
     * Continues the enumeration of multi-cell weighing scale sensors started using yFirstMultiCellWeighScale().
     * Caution: You can't make any assumption about the returned multi-cell weighing scale sensors order.
     * If you want to find a specific a multi-cell weighing scale sensor, use
     * MultiCellWeighScale.findMultiCellWeighScale()
     * and a hardwareID or a logical name.
     *
     * @return {YMultiCellWeighScale} a pointer to a YMultiCellWeighScale object, corresponding to
     *         a multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are no more multi-cell weighing scale sensors to enumerate.
     */
    nextMultiCellWeighScale()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMultiCellWeighScale.FindMultiCellWeighScaleInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of multi-cell weighing scale sensors currently accessible.
     * Use the method YMultiCellWeighScale.nextMultiCellWeighScale() to iterate on
     * next multi-cell weighing scale sensors.
     *
     * @return {YMultiCellWeighScale} a pointer to a YMultiCellWeighScale object, corresponding to
     *         the first multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiCellWeighScale()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('MultiCellWeighScale');
        if(next_hwid == null) return null;
        return YMultiCellWeighScale.FindMultiCellWeighScale(next_hwid);
    }

    /**
     * Starts the enumeration of multi-cell weighing scale sensors currently accessible.
     * Use the method YMultiCellWeighScale.nextMultiCellWeighScale() to iterate on
     * next multi-cell weighing scale sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMultiCellWeighScale} a pointer to a YMultiCellWeighScale object, corresponding to
     *         the first multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiCellWeighScaleInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('MultiCellWeighScale');
        if(next_hwid == null) return null;
        return YMultiCellWeighScale.FindMultiCellWeighScaleInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            CELLCOUNT_INVALID            : YAPI.INVALID_UINT,
            EXCITATION_OFF               : 0,
            EXCITATION_DC                : 1,
            EXCITATION_AC                : 2,
            EXCITATION_INVALID           : -1,
            TEMPAVGADAPTRATIO_INVALID    : YAPI.INVALID_DOUBLE,
            TEMPCHGADAPTRATIO_INVALID    : YAPI.INVALID_DOUBLE,
            COMPTEMPAVG_INVALID          : YAPI.INVALID_DOUBLE,
            COMPTEMPCHG_INVALID          : YAPI.INVALID_DOUBLE,
            COMPENSATION_INVALID         : YAPI.INVALID_DOUBLE,
            ZEROTRACKING_INVALID         : YAPI.INVALID_DOUBLE,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YMultiCellWeighScale implementation)
}

//
// YMultiCellWeighScaleProxy Class: synchronous proxy to YMultiCellWeighScale objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YMultiCellWeighScale objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YMultiCellWeighScaleProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YMultiCellWeighScale accessors declaration)

    /**
     * Changes the measuring unit for the weight.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the weight
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
     * Returns the number of load cells in use.
     *
     * @return an integer corresponding to the number of load cells in use
     *
     * On failure, throws an exception or returns Y_CELLCOUNT_INVALID.
     */
    get_cellCount()
    {
        return this.liveFunc._cellCount;
    }

    /**
     * Changes the number of load cells in use.
     *
     * @param newval : an integer corresponding to the number of load cells in use
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_cellCount(newval)
    {
        this.liveFunc.set_cellCount(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current load cell bridge excitation method.
     *
     * @return a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding to the
     * current load cell bridge excitation method
     *
     * On failure, throws an exception or returns Y_EXCITATION_INVALID.
     */
    get_excitation()
    {
        return this.liveFunc._excitation;
    }

    /**
     * Changes the current load cell bridge excitation method.
     *
     * @param newval : a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding
     * to the current load cell bridge excitation method
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_excitation(newval)
    {
        this.liveFunc.set_excitation(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     *
     * @param newval : a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tempAvgAdaptRatio(newval)
    {
        this.liveFunc.set_tempAvgAdaptRatio(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     *
     * @return a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * On failure, throws an exception or returns Y_TEMPAVGADAPTRATIO_INVALID.
     */
    get_tempAvgAdaptRatio()
    {
        return this.liveFunc._tempAvgAdaptRatio;
    }

    /**
     * Changes the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 pour mille.
     *
     * @param newval : a floating point number corresponding to the temperature change update rate, in per mille
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tempChgAdaptRatio(newval)
    {
        this.liveFunc.set_tempChgAdaptRatio(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 pour mille.
     *
     * @return a floating point number corresponding to the temperature change update rate, in per mille
     *
     * On failure, throws an exception or returns Y_TEMPCHGADAPTRATIO_INVALID.
     */
    get_tempChgAdaptRatio()
    {
        return this.liveFunc._tempChgAdaptRatio;
    }

    /**
     * Returns the current averaged temperature, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current averaged temperature, used for thermal compensation
     *
     * On failure, throws an exception or returns Y_COMPTEMPAVG_INVALID.
     */
    get_compTempAvg()
    {
        return this.liveFunc._compTempAvg;
    }

    /**
     * Returns the current temperature variation, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current temperature variation, used for
     * thermal compensation
     *
     * On failure, throws an exception or returns Y_COMPTEMPCHG_INVALID.
     */
    get_compTempChg()
    {
        return this.liveFunc._compTempChg;
    }

    /**
     * Returns the current current thermal compensation value.
     *
     * @return a floating point number corresponding to the current current thermal compensation value
     *
     * On failure, throws an exception or returns Y_COMPENSATION_INVALID.
     */
    get_compensation()
    {
        return this.liveFunc._compensation;
    }

    /**
     * Changes the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     *
     * @param newval : a floating point number corresponding to the zero tracking threshold value
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_zeroTracking(newval)
    {
        this.liveFunc.set_zeroTracking(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     *
     * @return a floating point number corresponding to the zero tracking threshold value
     *
     * On failure, throws an exception or returns Y_ZEROTRACKING_INVALID.
     */
    get_zeroTracking()
    {
        return this.liveFunc._zeroTracking;
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
     * Adapts the load cell signal bias (stored in the corresponding genericSensor)
     * so that the current signal corresponds to a zero weight.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    tare()
    {
        this.liveFunc.tare();
        return YAPI_SUCCESS;
    }

    /**
     * Configures the load cells span parameters (stored in the corresponding genericSensors)
     * so that the current signal corresponds to the specified reference weight.
     *
     * @param currWeight : reference weight presently on the load cell.
     * @param maxWeight : maximum weight to be expected on the load cell.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    setupSpan(currWeight,maxWeight)
    {
        this.liveFunc.setupSpan(currWeight, maxWeight);
        return YAPI_SUCCESS;
    }
    //--- (end of YMultiCellWeighScale accessors declaration)
}

//--- (YMultiCellWeighScale functions)

YoctoLibExport('YMultiCellWeighScale', YMultiCellWeighScale);
YoctoLibExport('YMultiCellWeighScaleProxy', YMultiCellWeighScaleProxy);
YMultiCellWeighScale.imm_Init();

//--- (end of YMultiCellWeighScale functions)
