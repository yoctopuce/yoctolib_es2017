/*********************************************************************
 *
 *  $Id: yocto_arithmeticsensor.js 35698 2019-06-05 17:25:12Z mvuilleu $
 *
 *  Implements the high-level API for ArithmeticSensor functions
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

//--- (YArithmeticSensor return codes)
//--- (end of YArithmeticSensor return codes)
//--- (YArithmeticSensor definitions)
//--- (end of YArithmeticSensor definitions)

//--- (YArithmeticSensor class start)
/**
 * YArithmeticSensor Class: ArithmeticSensor function interface
 *
 * The YArithmeticSensor class can produce measurements computed using an arithmetic
 * formula based on one or more measured signals and temperature measurements.
 */
//--- (end of YArithmeticSensor class start)

class YArithmeticSensor extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YArithmeticSensor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'ArithmeticSensor';
        /** @member {string} **/
        this._description                = YArithmeticSensor.DESCRIPTION_INVALID;
        /** @member {string} **/
        this._command                    = YArithmeticSensor.COMMAND_INVALID;
        //--- (end of YArithmeticSensor constructor)
    }

    //--- (YArithmeticSensor implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'description':
            this._description = val;
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the arithmetic sensor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the arithmetic sensor
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
     * Returns a short informative description of the formula.
     *
     * @return {string} a string corresponding to a short informative description of the formula
     *
     * On failure, throws an exception or returns YArithmeticSensor.DESCRIPTION_INVALID.
     */
    async get_description()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YArithmeticSensor.DESCRIPTION_INVALID;
            }
        }
        res = this._description;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YArithmeticSensor.COMMAND_INVALID;
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
     * Retrieves an arithmetic sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the arithmetic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YArithmeticSensor.isOnline() to test if the arithmetic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an arithmetic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the arithmetic sensor
     *
     * @return {YArithmeticSensor} a YArithmeticSensor object allowing you to drive the arithmetic sensor.
     */
    static FindArithmeticSensor(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('ArithmeticSensor', func);
        if (obj == null) {
            obj = new YArithmeticSensor(YAPI, func);
            YFunction._AddToCache('ArithmeticSensor',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an arithmetic sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the arithmetic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YArithmeticSensor.isOnline() to test if the arithmetic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an arithmetic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the arithmetic sensor
     *
     * @return {YArithmeticSensor} a YArithmeticSensor object allowing you to drive the arithmetic sensor.
     */
    static FindArithmeticSensorInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'ArithmeticSensor', func);
        if (obj == null) {
            obj = new YArithmeticSensor(yctx, func);
            YFunction._AddToCache('ArithmeticSensor',  func, obj);
        }
        return obj;
    }

    /**
     * Defines the arithmetic function by means of an algebraic expression. The expression
     * may include references to device sensors, by their physical or logical name, to
     * usual math functions and to auxiliary functions defined separately.
     *
     * @param expr {string} : the algebraic expression defining the function.
     * @param descr {string} : short informative description of the expression.
     *
     * @return {number} the current expression value if the call succeeds.
     *
     * On failure, throws an exception or returns YAPI.INVALID_DOUBLE.
     */
    async defineExpression(expr,descr)
    {
        /** @type {string} **/
        let id;
        /** @type {string} **/
        let fname;
        /** @type {string} **/
        let content;
        /** @type {Uint8Array} **/
        let data;
        /** @type {string} **/
        let diags;
        /** @type {number} **/
        let resval;
        id = await this.get_functionId();
        id = (id).substr( 16, (id).length - 16);
        fname = 'arithmExpr'+id+'.txt';

        content = '// '+descr+'\n'+expr;
        data = await this._uploadEx(fname, this._yapi.imm_str2bin(content));
        diags = this._yapi.imm_bin2str(data);
        if (!((diags).substr(0, 8) == 'Result: ')) {
            return this._throw(this._yapi.INVALID_ARGUMENT,diags,this._yapi.INVALID_DOUBLE);
        }
        resval = parseFloat((diags).substr( 8, (diags).length-8));
        return resval;
    }

    /**
     * Retrieves the algebraic expression defining the arithmetic function, as previously
     * configured using the defineExpression function.
     *
     * @return {string} a string containing the mathematical expression.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadExpression()
    {
        /** @type {string} **/
        let id;
        /** @type {string} **/
        let fname;
        /** @type {string} **/
        let content;
        /** @type {number} **/
        let idx;
        id = await this.get_functionId();
        id = (id).substr( 16, (id).length - 16);
        fname = 'arithmExpr'+id+'.txt';

        content = this._yapi.imm_bin2str(await this._download(fname));
        idx = (content).indexOf('\n');
        if (idx > 0) {
            content = (content).substr( idx+1, (content).length-(idx+1));
        }
        return content;
    }

    /**
     * Defines a auxiliary function by means of a table of reference points. Intermediate values
     * will be interpolated between specified reference points. The reference points are given
     * as pairs of floating point numbers.
     * The auxiliary function will be available for use by all ArithmeticSensor objects of the
     * device. Up to nine auxiliary function can be defined in a device, each containing up to
     * 96 reference points.
     *
     * @param name {string} : auxiliary function name, up to 16 characters.
     * @param inputValues {number[]} : array of floating point numbers, corresponding to the function input value.
     * @param outputValues {number[]} : array of floating point numbers, corresponding to the output value
     *         desired for each of the input value, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async defineAuxiliaryFunction(name,inputValues,outputValues)
    {
        /** @type {number} **/
        let siz;
        /** @type {string} **/
        let defstr;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let inputVal;
        /** @type {number} **/
        let outputVal;
        /** @type {string} **/
        let fname;
        siz = inputValues.length;
        if (!(siz > 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'auxiliary function must be defined by at least two points',this._yapi.INVALID_ARGUMENT);
        }
        if (!(siz == outputValues.length)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'table sizes mismatch',this._yapi.INVALID_ARGUMENT);
        }
        defstr = '';
        idx = 0;
        while (idx < siz) {
            inputVal = inputValues[idx];
            outputVal = outputValues[idx];
            defstr = defstr+''+String(Math.round(inputVal*1000)/1000)+':'+String(Math.round(outputVal*1000)/1000)+'\n';
            idx = idx + 1;
        }
        fname = 'userMap'+name+'.txt';

        return await this._upload(fname, this._yapi.imm_str2bin(defstr));
    }

    /**
     * Retrieves the reference points table defining an auxiliary function previously
     * configured using the defineAuxiliaryFunction function.
     *
     * @param name {string} : auxiliary function name, up to 16 characters.
     * @param inputValues {number[]} : array of floating point numbers, that is filled by the function
     *         with all the function reference input value.
     * @param outputValues {number[]} : array of floating point numbers, that is filled by the function
     *         output value for each of the input value, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadAuxiliaryFunction(name,inputValues,outputValues)
    {
        /** @type {string} **/
        let fname;
        /** @type {Uint8Array} **/
        let defbin;
        /** @type {number} **/
        let siz;

        fname = 'userMap'+name+'.txt';
        defbin = await this._download(fname);
        siz = (defbin).length;
        if (!(siz > 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'auxiliary function does not exist',this._yapi.INVALID_ARGUMENT);
        }
        inputValues.length = 0;
        outputValues.length = 0;
        // FIXME: decode line by line
        return this._yapi.SUCCESS;
    }

    /**
     * Continues the enumeration of arithmetic sensors started using yFirstArithmeticSensor().
     * Caution: You can't make any assumption about the returned arithmetic sensors order.
     * If you want to find a specific an arithmetic sensor, use ArithmeticSensor.findArithmeticSensor()
     * and a hardwareID or a logical name.
     *
     * @return {YArithmeticSensor} a pointer to a YArithmeticSensor object, corresponding to
     *         an arithmetic sensor currently online, or a null pointer
     *         if there are no more arithmetic sensors to enumerate.
     */
    nextArithmeticSensor()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YArithmeticSensor.FindArithmeticSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of arithmetic sensors currently accessible.
     * Use the method YArithmeticSensor.nextArithmeticSensor() to iterate on
     * next arithmetic sensors.
     *
     * @return {YArithmeticSensor} a pointer to a YArithmeticSensor object, corresponding to
     *         the first arithmetic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstArithmeticSensor()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('ArithmeticSensor');
        if(next_hwid == null) return null;
        return YArithmeticSensor.FindArithmeticSensor(next_hwid);
    }

    /**
     * Starts the enumeration of arithmetic sensors currently accessible.
     * Use the method YArithmeticSensor.nextArithmeticSensor() to iterate on
     * next arithmetic sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YArithmeticSensor} a pointer to a YArithmeticSensor object, corresponding to
     *         the first arithmetic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstArithmeticSensorInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('ArithmeticSensor');
        if(next_hwid == null) return null;
        return YArithmeticSensor.FindArithmeticSensorInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            DESCRIPTION_INVALID          : YAPI.INVALID_STRING,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YArithmeticSensor implementation)
}

//
// YArithmeticSensorProxy Class: synchronous proxy to YArithmeticSensor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YArithmeticSensor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YArithmeticSensorProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YArithmeticSensor accessors declaration)

    /**
     * Changes the measuring unit for the arithmetic sensor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the arithmetic sensor
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
     * Returns a short informative description of the formula.
     *
     * @return a string corresponding to a short informative description of the formula
     *
     * On failure, throws an exception or returns Y_DESCRIPTION_INVALID.
     */
    get_description()
    {
        return this.liveFunc._description;
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
     * Defines a auxiliary function by means of a table of reference points. Intermediate values
     * will be interpolated between specified reference points. The reference points are given
     * as pairs of floating point numbers.
     * The auxiliary function will be available for use by all ArithmeticSensor objects of the
     * device. Up to nine auxiliary function can be defined in a device, each containing up to
     * 96 reference points.
     *
     * @param name : auxiliary function name, up to 16 characters.
     * @param inputValues : array of floating point numbers, corresponding to the function input value.
     * @param outputValues : array of floating point numbers, corresponding to the output value
     *         desired for each of the input value, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    defineAuxiliaryFunction(name,inputValues,outputValues)
    {
        this.liveFunc.defineAuxiliaryFunction(name, inputValues, outputValues);
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves the reference points table defining an auxiliary function previously
     * configured using the defineAuxiliaryFunction function.
     *
     * @param name : auxiliary function name, up to 16 characters.
     * @param inputValues : array of floating point numbers, that is filled by the function
     *         with all the function reference input value.
     * @param outputValues : array of floating point numbers, that is filled by the function
     *         output value for each of the input value, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadAuxiliaryFunction(name,inputValues,outputValues)
    {
        this.liveFunc.loadAuxiliaryFunction(name, inputValues, outputValues);
        return YAPI_SUCCESS;
    }
    //--- (end of YArithmeticSensor accessors declaration)
}

//--- (YArithmeticSensor functions)

YoctoLibExport('YArithmeticSensor', YArithmeticSensor);
YoctoLibExport('YArithmeticSensorProxy', YArithmeticSensorProxy);
YArithmeticSensor.imm_Init();

//--- (end of YArithmeticSensor functions)
