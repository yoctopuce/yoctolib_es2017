/*********************************************************************
 *
 * $Id: yocto_weighscale.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for WeighScale functions
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

//--- (YWeighScale return codes)
//--- (end of YWeighScale return codes)
//--- (YWeighScale definitions)
//--- (end of YWeighScale definitions)

//--- (YWeighScale class start)
/**
 * YWeighScale Class: WeighScale function interface
 *
 * The YWeighScale class provides a weight measurement from a ratiometric load cell
 * sensor. It can be used to control the bridge excitation parameters, in order to avoid
 * measure shifts caused by temperature variation in the electronics, and can also
 * automatically apply an additional correction factor based on temperature to
 * compensate for offsets in the load cell itself.
 */
//--- (end of YWeighScale class start)

class YWeighScale extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YWeighScale constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'WeighScale';
        /** @member {number} **/
        this._excitation                 = YWeighScale.EXCITATION_INVALID;
        /** @member {number} **/
        this._adaptRatio                 = YWeighScale.ADAPTRATIO_INVALID;
        /** @member {number} **/
        this._compTemperature            = YWeighScale.COMPTEMPERATURE_INVALID;
        /** @member {number} **/
        this._compensation               = YWeighScale.COMPENSATION_INVALID;
        /** @member {number} **/
        this._zeroTracking               = YWeighScale.ZEROTRACKING_INVALID;
        /** @member {string} **/
        this._command                    = YWeighScale.COMMAND_INVALID;
        //--- (end of YWeighScale constructor)
    }

    //--- (YWeighScale implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'excitation':
            this._excitation = parseInt(val);
            return 1;
        case 'adaptRatio':
            this._adaptRatio = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'compTemperature':
            this._compTemperature = Math.round(val * 1000.0 / 65536.0) / 1000.0;
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
     * Returns the current load cell bridge excitation method.
     *
     * @return {number} a value among YWeighScale.EXCITATION_OFF, YWeighScale.EXCITATION_DC and
     * YWeighScale.EXCITATION_AC corresponding to the current load cell bridge excitation method
     *
     * On failure, throws an exception or returns YWeighScale.EXCITATION_INVALID.
     */
    async get_excitation()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.EXCITATION_INVALID;
            }
        }
        res = this._excitation;
        return res;
    }

    /**
     * Changes the current load cell bridge excitation method.
     *
     * @param newval {number} : a value among YWeighScale.EXCITATION_OFF, YWeighScale.EXCITATION_DC and
     * YWeighScale.EXCITATION_AC corresponding to the current load cell bridge excitation method
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
     * Changes the compensation temperature update rate, in percents.
     *
     * @param newval {number} : a floating point number corresponding to the compensation temperature
     * update rate, in percents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_adaptRatio(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('adaptRatio',rest_val);
    }

    /**
     * Returns the compensation temperature update rate, in percents.
     * the maximal value is 65 percents.
     *
     * @return {number} a floating point number corresponding to the compensation temperature update rate, in percents
     *
     * On failure, throws an exception or returns YWeighScale.ADAPTRATIO_INVALID.
     */
    async get_adaptRatio()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.ADAPTRATIO_INVALID;
            }
        }
        res = this._adaptRatio;
        return res;
    }

    /**
     * Returns the current compensation temperature.
     *
     * @return {number} a floating point number corresponding to the current compensation temperature
     *
     * On failure, throws an exception or returns YWeighScale.COMPTEMPERATURE_INVALID.
     */
    async get_compTemperature()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.COMPTEMPERATURE_INVALID;
            }
        }
        res = this._compTemperature;
        return res;
    }

    /**
     * Returns the current current thermal compensation value.
     *
     * @return {number} a floating point number corresponding to the current current thermal compensation value
     *
     * On failure, throws an exception or returns YWeighScale.COMPENSATION_INVALID.
     */
    async get_compensation()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.COMPENSATION_INVALID;
            }
        }
        res = this._compensation;
        return res;
    }

    /**
     * Changes the compensation temperature update rate, in percents.
     *
     * @param newval {number} : a floating point number corresponding to the compensation temperature
     * update rate, in percents
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
     * On failure, throws an exception or returns YWeighScale.ZEROTRACKING_INVALID.
     */
    async get_zeroTracking()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.ZEROTRACKING_INVALID;
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
                return YWeighScale.COMMAND_INVALID;
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
     * Retrieves a weighing scale sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWeighScale.isOnline() to test if the weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the weighing scale sensor
     *
     * @return {YWeighScale} a YWeighScale object allowing you to drive the weighing scale sensor.
     */
    static FindWeighScale(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('WeighScale', func);
        if (obj == null) {
            obj = new YWeighScale(YAPI, func);
            YFunction._AddToCache('WeighScale',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a weighing scale sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWeighScale.isOnline() to test if the weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the weighing scale sensor
     *
     * @return {YWeighScale} a YWeighScale object allowing you to drive the weighing scale sensor.
     */
    static FindWeighScaleInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'WeighScale', func);
        if (obj == null) {
            obj = new YWeighScale(yctx, func);
            YFunction._AddToCache('WeighScale',  func, obj);
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
     * Configures the load cell span parameters (stored in the corresponding genericSensor)
     * so that the current signal corresponds to the specified reference weight.
     *
     * @param currWeight {number} : reference weight presently on the load cell.
     * @param maxWeight {number} : maximum weight to be expectect on the load cell.
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
     * Records a weight offset thermal compensation table, in order to automatically correct the
     * measured weight based on the compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues {number[]} : array of floating point numbers, corresponding to all
     *         temperatures for which an offset correction is specified.
     * @param compValues {number[]} : array of floating point numbers, corresponding to the offset correction
     *         to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_offsetCompensationTable(tempValues,compValues)
    {
        /** @type {number} **/
        let siz;
        /** @type {number} **/
        let res;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let found;
        /** @type {number} **/
        let prev;
        /** @type {number} **/
        let curr;
        /** @type {number} **/
        let currComp;
        /** @type {number} **/
        let idxTemp;
        siz = tempValues.length;
        if (!(siz != 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'thermal compensation table must have at least two points',this._yapi.INVALID_ARGUMENT);
        }
        if (!(siz == compValues.length)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'table sizes mismatch',this._yapi.INVALID_ARGUMENT);
        }

        res = await this.set_command('2Z');
        if (!(res==this._yapi.SUCCESS)) {
            return this._throw(this._yapi.IO_ERROR,'unable to reset thermal compensation table',this._yapi.IO_ERROR);
        }
        // add records in growing temperature value
        found = 1;
        prev = -999999.0;
        while (found > 0) {
            found = 0;
            curr = 99999999.0;
            currComp = -999999.0;
            idx = 0;
            while (idx < siz) {
                idxTemp = tempValues[idx];
                if ((idxTemp > prev) && (idxTemp < curr)) {
                    curr = idxTemp;
                    currComp = compValues[idx];
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                res = await this.set_command('2m'+String(Math.round(Math.round(1000*curr)))+':'+String(Math.round(Math.round(1000*currComp))));
                if (!(res==this._yapi.SUCCESS)) {
                    return this._throw(this._yapi.IO_ERROR,'unable to set thermal compensation table',this._yapi.IO_ERROR);
                }
                prev = curr;
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Retrieves the weight offset thermal compensation table previously configured using the
     * set_offsetCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues {number[]} : array of floating point numbers, that is filled by the function
     *         with all temperatures for which an offset correction is specified.
     * @param compValues {number[]} : array of floating point numbers, that is filled by the function
     *         with the offset correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadOffsetCompensationTable(tempValues,compValues)
    {
        /** @type {string} **/
        let id;
        /** @type {Uint8Array} **/
        let bin_json;
        /** @type {string[]} **/
        let paramlist = [];
        /** @type {number} **/
        let siz;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let temp;
        /** @type {number} **/
        let comp;

        id = await this.get_functionId();
        id = (id).substr( 11, (id).length - 11);
        bin_json = await this._download('extra.json?page=2');
        paramlist = this.imm_json_get_array(bin_json);
        // convert all values to float and append records
        siz = ((paramlist.length) >> (1));
        tempValues.length = 0;
        compValues.length = 0;
        idx = 0;
        while (idx < siz) {
            temp = parseFloat(paramlist[2*idx])/1000.0;
            comp = parseFloat(paramlist[2*idx+1])/1000.0;
            tempValues.push(temp);
            compValues.push(comp);
            idx = idx + 1;
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Records a weight span thermal compensation table, in order to automatically correct the
     * measured weight based on the compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues {number[]} : array of floating point numbers, corresponding to all
     *         temperatures for which a span correction is specified.
     * @param compValues {number[]} : array of floating point numbers, corresponding to the span correction
     *         (in percents) to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_spanCompensationTable(tempValues,compValues)
    {
        /** @type {number} **/
        let siz;
        /** @type {number} **/
        let res;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let found;
        /** @type {number} **/
        let prev;
        /** @type {number} **/
        let curr;
        /** @type {number} **/
        let currComp;
        /** @type {number} **/
        let idxTemp;
        siz = tempValues.length;
        if (!(siz != 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'thermal compensation table must have at least two points',this._yapi.INVALID_ARGUMENT);
        }
        if (!(siz == compValues.length)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'table sizes mismatch',this._yapi.INVALID_ARGUMENT);
        }

        res = await this.set_command('3Z');
        if (!(res==this._yapi.SUCCESS)) {
            return this._throw(this._yapi.IO_ERROR,'unable to reset thermal compensation table',this._yapi.IO_ERROR);
        }
        // add records in growing temperature value
        found = 1;
        prev = -999999.0;
        while (found > 0) {
            found = 0;
            curr = 99999999.0;
            currComp = -999999.0;
            idx = 0;
            while (idx < siz) {
                idxTemp = tempValues[idx];
                if ((idxTemp > prev) && (idxTemp < curr)) {
                    curr = idxTemp;
                    currComp = compValues[idx];
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                res = await this.set_command('3m'+String(Math.round(Math.round(1000*curr)))+':'+String(Math.round(Math.round(1000*currComp))));
                if (!(res==this._yapi.SUCCESS)) {
                    return this._throw(this._yapi.IO_ERROR,'unable to set thermal compensation table',this._yapi.IO_ERROR);
                }
                prev = curr;
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Retrieves the weight span thermal compensation table previously configured using the
     * set_spanCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues {number[]} : array of floating point numbers, that is filled by the function
     *         with all temperatures for which an span correction is specified.
     * @param compValues {number[]} : array of floating point numbers, that is filled by the function
     *         with the span correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadSpanCompensationTable(tempValues,compValues)
    {
        /** @type {string} **/
        let id;
        /** @type {Uint8Array} **/
        let bin_json;
        /** @type {string[]} **/
        let paramlist = [];
        /** @type {number} **/
        let siz;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let temp;
        /** @type {number} **/
        let comp;

        id = await this.get_functionId();
        id = (id).substr( 11, (id).length - 11);
        bin_json = await this._download('extra.json?page=3');
        paramlist = this.imm_json_get_array(bin_json);
        // convert all values to float and append records
        siz = ((paramlist.length) >> (1));
        tempValues.length = 0;
        compValues.length = 0;
        idx = 0;
        while (idx < siz) {
            temp = parseFloat(paramlist[2*idx])/1000.0;
            comp = parseFloat(paramlist[2*idx+1])/1000.0;
            tempValues.push(temp);
            compValues.push(comp);
            idx = idx + 1;
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Continues the enumeration of weighing scale sensors started using yFirstWeighScale().
     *
     * @return {YWeighScale} a pointer to a YWeighScale object, corresponding to
     *         a weighing scale sensor currently online, or a null pointer
     *         if there are no more weighing scale sensors to enumerate.
     */
    nextWeighScale()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YWeighScale.FindWeighScaleInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of weighing scale sensors currently accessible.
     * Use the method YWeighScale.nextWeighScale() to iterate on
     * next weighing scale sensors.
     *
     * @return {YWeighScale} a pointer to a YWeighScale object, corresponding to
     *         the first weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWeighScale()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('WeighScale');
        if(next_hwid == null) return null;
        return YWeighScale.FindWeighScale(next_hwid);
    }

    /**
     * Starts the enumeration of weighing scale sensors currently accessible.
     * Use the method YWeighScale.nextWeighScale() to iterate on
     * next weighing scale sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YWeighScale} a pointer to a YWeighScale object, corresponding to
     *         the first weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWeighScaleInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('WeighScale');
        if(next_hwid == null) return null;
        return YWeighScale.FindWeighScaleInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            EXCITATION_OFF               : 0,
            EXCITATION_DC                : 1,
            EXCITATION_AC                : 2,
            EXCITATION_INVALID           : -1,
            ADAPTRATIO_INVALID           : YAPI.INVALID_DOUBLE,
            COMPTEMPERATURE_INVALID      : YAPI.INVALID_DOUBLE,
            COMPENSATION_INVALID         : YAPI.INVALID_DOUBLE,
            ZEROTRACKING_INVALID         : YAPI.INVALID_DOUBLE,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YWeighScale implementation)
}

//
// YWeighScaleProxy Class: synchronous proxy to YWeighScale objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YWeighScale objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YWeighScaleProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YWeighScale accessors declaration)

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
     * Changes the compensation temperature update rate, in percents.
     *
     * @param newval : a floating point number corresponding to the compensation temperature update rate, in percents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_adaptRatio(newval)
    {
        this.liveFunc.set_adaptRatio(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the compensation temperature update rate, in percents.
     * the maximal value is 65 percents.
     *
     * @return a floating point number corresponding to the compensation temperature update rate, in percents
     *
     * On failure, throws an exception or returns Y_ADAPTRATIO_INVALID.
     */
    get_adaptRatio()
    {
        return this.liveFunc._adaptRatio;
    }

    /**
     * Returns the current compensation temperature.
     *
     * @return a floating point number corresponding to the current compensation temperature
     *
     * On failure, throws an exception or returns Y_COMPTEMPERATURE_INVALID.
     */
    get_compTemperature()
    {
        return this.liveFunc._compTemperature;
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
     * Changes the compensation temperature update rate, in percents.
     *
     * @param newval : a floating point number corresponding to the compensation temperature update rate, in percents
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
     * Configures the load cell span parameters (stored in the corresponding genericSensor)
     * so that the current signal corresponds to the specified reference weight.
     *
     * @param currWeight : reference weight presently on the load cell.
     * @param maxWeight : maximum weight to be expectect on the load cell.
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

    /**
     * Records a weight offset thermal compensation table, in order to automatically correct the
     * measured weight based on the compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all
     *         temperatures for which an offset correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the offset correction
     *         to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_offsetCompensationTable(tempValues,compValues)
    {
        this.liveFunc.set_offsetCompensationTable(tempValues, compValues);
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves the weight offset thermal compensation table previously configured using the
     * set_offsetCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperatures for which an offset correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the offset correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadOffsetCompensationTable(tempValues,compValues)
    {
        this.liveFunc.loadOffsetCompensationTable(tempValues, compValues);
        return YAPI_SUCCESS;
    }

    /**
     * Records a weight span thermal compensation table, in order to automatically correct the
     * measured weight based on the compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all
     *         temperatures for which a span correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the span correction
     *         (in percents) to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_spanCompensationTable(tempValues,compValues)
    {
        this.liveFunc.set_spanCompensationTable(tempValues, compValues);
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves the weight span thermal compensation table previously configured using the
     * set_spanCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperatures for which an span correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the span correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadSpanCompensationTable(tempValues,compValues)
    {
        this.liveFunc.loadSpanCompensationTable(tempValues, compValues);
        return YAPI_SUCCESS;
    }
    //--- (end of YWeighScale accessors declaration)
}

//--- (YWeighScale functions)

YoctoLibExport('YWeighScale', YWeighScale);
YoctoLibExport('YWeighScaleProxy', YWeighScaleProxy);
YWeighScale.imm_Init();

//--- (end of YWeighScale functions)
