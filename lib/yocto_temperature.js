/*********************************************************************
 *
 *  $Id: yocto_temperature.js 35466 2019-05-16 14:41:19Z seb $
 *
 *  Implements the high-level API for Temperature functions
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

//--- (YTemperature return codes)
//--- (end of YTemperature return codes)
//--- (YTemperature definitions)
//--- (end of YTemperature definitions)

//--- (YTemperature class start)
/**
 * YTemperature Class: Temperature function interface
 *
 * The Yoctopuce class YTemperature allows you to read and configure Yoctopuce temperature
 * sensors. It inherits from YSensor class the core functions to read measurements, to
 * register callback functions, to access the autonomous datalogger.
 * This class adds the ability to configure some specific parameters for some
 * sensors (connection type, temperature mapping table).
 */
//--- (end of YTemperature class start)

class YTemperature extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YTemperature constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Temperature';
        /** @member {number} **/
        this._sensorType                 = YTemperature.SENSORTYPE_INVALID;
        /** @member {number} **/
        this._signalValue                = YTemperature.SIGNALVALUE_INVALID;
        /** @member {string} **/
        this._signalUnit                 = YTemperature.SIGNALUNIT_INVALID;
        /** @member {string} **/
        this._command                    = YTemperature.COMMAND_INVALID;
        //--- (end of YTemperature constructor)
    }

    //--- (YTemperature implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'sensorType':
            this._sensorType = parseInt(val);
            return 1;
        case 'signalValue':
            this._signalValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'signalUnit':
            this._signalUnit = val;
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured temperature. That unit is a string.
     * If that strings end with the letter F all temperatures values will returned in
     * Fahrenheit degrees. If that String ends with the letter K all values will be
     * returned in Kelvin degrees. If that string ends with the letter C all values will be
     * returned in Celsius degrees.  If the string ends with any other character the
     * change will be ignored. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the temperature function, a
     * unit system change will probably break it.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the measured temperature
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
     * Returns the temperature sensor type.
     *
     * @return {number} a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES,
     * YTemperature.SENSORTYPE_PT100_2WIRES, YTemperature.SENSORTYPE_RES_OHM,
     * YTemperature.SENSORTYPE_RES_NTC, YTemperature.SENSORTYPE_RES_LINEAR,
     * YTemperature.SENSORTYPE_RES_INTERNAL, YTemperature.SENSORTYPE_IR and
     * YTemperature.SENSORTYPE_RES_PT1000 corresponding to the temperature sensor type
     *
     * On failure, throws an exception or returns YTemperature.SENSORTYPE_INVALID.
     */
    async get_sensorType()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.SENSORTYPE_INVALID;
            }
        }
        res = this._sensorType;
        return res;
    }

    /**
     * Changes the temperature sensor type.  This function is used
     * to define the type of thermocouple (K,E...) used with the device.
     * It has no effect if module is using a digital sensor or a thermistor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : a value among YTemperature.SENSORTYPE_DIGITAL,
     * YTemperature.SENSORTYPE_TYPE_K, YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J,
     * YTemperature.SENSORTYPE_TYPE_N, YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S,
     * YTemperature.SENSORTYPE_TYPE_T, YTemperature.SENSORTYPE_PT100_4WIRES,
     * YTemperature.SENSORTYPE_PT100_3WIRES, YTemperature.SENSORTYPE_PT100_2WIRES,
     * YTemperature.SENSORTYPE_RES_OHM, YTemperature.SENSORTYPE_RES_NTC,
     * YTemperature.SENSORTYPE_RES_LINEAR, YTemperature.SENSORTYPE_RES_INTERNAL,
     * YTemperature.SENSORTYPE_IR and YTemperature.SENSORTYPE_RES_PT1000 corresponding to the temperature sensor type
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_sensorType(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('sensorType',rest_val);
    }

    /**
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return {number} a floating point number corresponding to the current value of the electrical
     * signal measured by the sensor
     *
     * On failure, throws an exception or returns YTemperature.SIGNALVALUE_INVALID.
     */
    async get_signalValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.SIGNALVALUE_INVALID;
            }
        }
        res = Math.round(this._signalValue * 1000) / 1000;
        return res;
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return {string} a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns YTemperature.SIGNALUNIT_INVALID.
     */
    async get_signalUnit()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.SIGNALUNIT_INVALID;
            }
        }
        res = this._signalUnit;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.COMMAND_INVALID;
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
     * Retrieves a temperature sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the temperature sensor
     *
     * @return {YTemperature} a YTemperature object allowing you to drive the temperature sensor.
     */
    static FindTemperature(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Temperature', func);
        if (obj == null) {
            obj = new YTemperature(YAPI, func);
            YFunction._AddToCache('Temperature',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a temperature sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the temperature sensor
     *
     * @return {YTemperature} a YTemperature object allowing you to drive the temperature sensor.
     */
    static FindTemperatureInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Temperature', func);
        if (obj == null) {
            obj = new YTemperature(yctx, func);
            YFunction._AddToCache('Temperature',  func, obj);
        }
        return obj;
    }

    /**
     * Configures NTC thermistor parameters in order to properly compute the temperature from
     * the measured resistance. For increased precision, you can enter a complete mapping
     * table using set_thermistorResponseTable. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param res25 {number} : thermistor resistance at 25 degrees Celsius
     * @param beta {number} : Beta value
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ntcParameters(res25,beta)
    {
        /** @type {number} **/
        let t0;
        /** @type {number} **/
        let t1;
        /** @type {number} **/
        let res100;
        /** @type {number[]} **/
        let tempValues = [];
        /** @type {number[]} **/
        let resValues = [];
        t0 = 25.0+275.15;
        t1 = 100.0+275.15;
        res100 = res25 * Math.exp(beta*(1.0/t1 - 1.0/t0));
        tempValues.length = 0;
        resValues.length = 0;
        tempValues.push(25.0);
        resValues.push(res25);
        tempValues.push(100.0);
        resValues.push(res100);
        return await this.set_thermistorResponseTable(tempValues, resValues);
    }

    /**
     * Records a thermistor response table, in order to interpolate the temperature from
     * the measured resistance. This function can only be used with a temperature
     * sensor based on thermistors.
     *
     * @param tempValues {number[]} : array of floating point numbers, corresponding to all
     *         temperatures (in degrees Celsius) for which the resistance of the
     *         thermistor is specified.
     * @param resValues {number[]} : array of floating point numbers, corresponding to the resistance
     *         values (in Ohms) for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_thermistorResponseTable(tempValues,resValues)
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
        let currTemp;
        /** @type {number} **/
        let idxres;
        siz = tempValues.length;
        if (!(siz >= 2)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'thermistor response table must have at least two points',this._yapi.INVALID_ARGUMENT);
        }
        if (!(siz == resValues.length)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'table sizes mismatch',this._yapi.INVALID_ARGUMENT);
        }

        res = await this.set_command('Z');
        if (!(res==this._yapi.SUCCESS)) {
            return this._throw(this._yapi.IO_ERROR,'unable to reset thermistor parameters',this._yapi.IO_ERROR);
        }
        // add records in growing resistance value
        found = 1;
        prev = 0.0;
        while (found > 0) {
            found = 0;
            curr = 99999999.0;
            currTemp = -999999.0;
            idx = 0;
            while (idx < siz) {
                idxres = resValues[idx];
                if ((idxres > prev) && (idxres < curr)) {
                    curr = idxres;
                    currTemp = tempValues[idx];
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                res = await this.set_command('m'+String(Math.round(Math.round(1000*curr)))+':'+String(Math.round(Math.round(1000*currTemp))));
                if (!(res==this._yapi.SUCCESS)) {
                    return this._throw(this._yapi.IO_ERROR,'unable to reset thermistor parameters',this._yapi.IO_ERROR);
                }
                prev = curr;
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Retrieves the thermistor response table previously configured using the
     * set_thermistorResponseTable function. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param tempValues {number[]} : array of floating point numbers, that is filled by the function
     *         with all temperatures (in degrees Celsius) for which the resistance
     *         of the thermistor is specified.
     * @param resValues {number[]} : array of floating point numbers, that is filled by the function
     *         with the value (in Ohms) for each of the temperature included in the
     *         first argument, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadThermistorResponseTable(tempValues,resValues)
    {
        /** @type {string} **/
        let id;
        /** @type {Uint8Array} **/
        let bin_json;
        /** @type {string[]} **/
        let paramlist = [];
        /** @type {number[]} **/
        let templist = [];
        /** @type {number} **/
        let siz;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let temp;
        /** @type {number} **/
        let found;
        /** @type {number} **/
        let prev;
        /** @type {number} **/
        let curr;
        /** @type {number} **/
        let currRes;
        tempValues.length = 0;
        resValues.length = 0;

        id = await this.get_functionId();
        id = (id).substr( 11, (id).length - 11);
        if (id == '') {
            id = '1';
        }
        bin_json = await this._download('extra.json?page='+id);
        paramlist = this.imm_json_get_array(bin_json);
        // first convert all temperatures to float
        siz = ((paramlist.length) >> (1));
        templist.length = 0;
        idx = 0;
        while (idx < siz) {
            temp = parseFloat(paramlist[2*idx+1])/1000.0;
            templist.push(temp);
            idx = idx + 1;
        }
        // then add records in growing temperature value
        tempValues.length = 0;
        resValues.length = 0;
        found = 1;
        prev = -999999.0;
        while (found > 0) {
            found = 0;
            curr = 999999.0;
            currRes = -999999.0;
            idx = 0;
            while (idx < siz) {
                temp = templist[idx];
                if ((temp > prev) && (temp < curr)) {
                    curr = temp;
                    currRes = parseFloat(paramlist[2*idx])/1000.0;
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                tempValues.push(curr);
                resValues.push(currRes);
                prev = curr;
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Continues the enumeration of temperature sensors started using yFirstTemperature().
     * Caution: You can't make any assumption about the returned temperature sensors order.
     * If you want to find a specific a temperature sensor, use Temperature.findTemperature()
     * and a hardwareID or a logical name.
     *
     * @return {YTemperature} a pointer to a YTemperature object, corresponding to
     *         a temperature sensor currently online, or a null pointer
     *         if there are no more temperature sensors to enumerate.
     */
    nextTemperature()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YTemperature.FindTemperatureInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     *
     * @return {YTemperature} a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTemperature()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Temperature');
        if(next_hwid == null) return null;
        return YTemperature.FindTemperature(next_hwid);
    }

    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YTemperature} a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTemperatureInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Temperature');
        if(next_hwid == null) return null;
        return YTemperature.FindTemperatureInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            SENSORTYPE_DIGITAL           : 0,
            SENSORTYPE_TYPE_K            : 1,
            SENSORTYPE_TYPE_E            : 2,
            SENSORTYPE_TYPE_J            : 3,
            SENSORTYPE_TYPE_N            : 4,
            SENSORTYPE_TYPE_R            : 5,
            SENSORTYPE_TYPE_S            : 6,
            SENSORTYPE_TYPE_T            : 7,
            SENSORTYPE_PT100_4WIRES      : 8,
            SENSORTYPE_PT100_3WIRES      : 9,
            SENSORTYPE_PT100_2WIRES      : 10,
            SENSORTYPE_RES_OHM           : 11,
            SENSORTYPE_RES_NTC           : 12,
            SENSORTYPE_RES_LINEAR        : 13,
            SENSORTYPE_RES_INTERNAL      : 14,
            SENSORTYPE_IR                : 15,
            SENSORTYPE_RES_PT1000        : 16,
            SENSORTYPE_INVALID           : -1,
            SIGNALVALUE_INVALID          : YAPI.INVALID_DOUBLE,
            SIGNALUNIT_INVALID           : YAPI.INVALID_STRING,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YTemperature implementation)
}

//
// YTemperatureProxy Class: synchronous proxy to YTemperature objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YTemperature objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YTemperatureProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YTemperature accessors declaration)

    /**
     * Changes the measuring unit for the measured temperature. That unit is a string.
     * If that strings end with the letter F all temperatures values will returned in
     * Fahrenheit degrees. If that String ends with the letter K all values will be
     * returned in Kelvin degrees. If that string ends with the letter C all values will be
     * returned in Celsius degrees.  If the string ends with any other character the
     * change will be ignored. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the temperature function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured temperature
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
     * Returns the temperature sensor type.
     *
     * @return a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     * Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     * Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES,
     * Y_SENSORTYPE_PT100_2WIRES, Y_SENSORTYPE_RES_OHM, Y_SENSORTYPE_RES_NTC, Y_SENSORTYPE_RES_LINEAR,
     * Y_SENSORTYPE_RES_INTERNAL, Y_SENSORTYPE_IR and Y_SENSORTYPE_RES_PT1000 corresponding to the
     * temperature sensor type
     *
     * On failure, throws an exception or returns Y_SENSORTYPE_INVALID.
     */
    get_sensorType()
    {
        return this.liveFunc._sensorType;
    }

    /**
     * Changes the temperature sensor type.  This function is used
     * to define the type of thermocouple (K,E...) used with the device.
     * It has no effect if module is using a digital sensor or a thermistor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     * Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     * Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES,
     * Y_SENSORTYPE_PT100_2WIRES, Y_SENSORTYPE_RES_OHM, Y_SENSORTYPE_RES_NTC, Y_SENSORTYPE_RES_LINEAR,
     * Y_SENSORTYPE_RES_INTERNAL, Y_SENSORTYPE_IR and Y_SENSORTYPE_RES_PT1000 corresponding to the
     * temperature sensor type
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sensorType(newval)
    {
        this.liveFunc.set_sensorType(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return a floating point number corresponding to the current value of the electrical signal
     * measured by the sensor
     *
     * On failure, throws an exception or returns Y_SIGNALVALUE_INVALID.
     */
    get_signalValue()
    {
        return this.liveFunc._signalValue;
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns Y_SIGNALUNIT_INVALID.
     */
    get_signalUnit()
    {
        return this.liveFunc._signalUnit;
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
     * Configures NTC thermistor parameters in order to properly compute the temperature from
     * the measured resistance. For increased precision, you can enter a complete mapping
     * table using set_thermistorResponseTable. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param res25 : thermistor resistance at 25 degrees Celsius
     * @param beta : Beta value
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ntcParameters(res25,beta)
    {
        this.liveFunc.set_ntcParameters(res25, beta);
        return YAPI_SUCCESS;
    }

    /**
     * Records a thermistor response table, in order to interpolate the temperature from
     * the measured resistance. This function can only be used with a temperature
     * sensor based on thermistors.
     *
     * @param tempValues : array of floating point numbers, corresponding to all
     *         temperatures (in degrees Celsius) for which the resistance of the
     *         thermistor is specified.
     * @param resValues : array of floating point numbers, corresponding to the resistance
     *         values (in Ohms) for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_thermistorResponseTable(tempValues,resValues)
    {
        this.liveFunc.set_thermistorResponseTable(tempValues, resValues);
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves the thermistor response table previously configured using the
     * set_thermistorResponseTable function. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperatures (in degrees Celsius) for which the resistance
     *         of the thermistor is specified.
     * @param resValues : array of floating point numbers, that is filled by the function
     *         with the value (in Ohms) for each of the temperature included in the
     *         first argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadThermistorResponseTable(tempValues,resValues)
    {
        this.liveFunc.loadThermistorResponseTable(tempValues, resValues);
        return YAPI_SUCCESS;
    }
    //--- (end of YTemperature accessors declaration)
}

//--- (YTemperature functions)

YoctoLibExport('YTemperature', YTemperature);
YoctoLibExport('YTemperatureProxy', YTemperatureProxy);
YTemperature.imm_Init();

//--- (end of YTemperature functions)
