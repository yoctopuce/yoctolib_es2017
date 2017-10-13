/*********************************************************************
 *
 * $Id: yocto_voltageoutput.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for VoltageOutput functions
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

//--- (YVoltageOutput return codes)
//--- (end of YVoltageOutput return codes)
//--- (YVoltageOutput definitions)
//--- (end of YVoltageOutput definitions)

//--- (YVoltageOutput class start)
/**
 * YVoltageOutput Class: VoltageOutput function interface
 *
 * The Yoctopuce application programming interface allows you to change the value of the voltage output.
 */
//--- (end of YVoltageOutput class start)

class YVoltageOutput extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YVoltageOutput constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'VoltageOutput';
        /** @member {number} **/
        this._currentVoltage             = YVoltageOutput.CURRENTVOLTAGE_INVALID;
        /** @member {string} **/
        this._voltageTransition          = YVoltageOutput.VOLTAGETRANSITION_INVALID;
        /** @member {number} **/
        this._voltageAtStartUp           = YVoltageOutput.VOLTAGEATSTARTUP_INVALID;
        //--- (end of YVoltageOutput constructor)
    }

    //--- (YVoltageOutput implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'currentVoltage':
            this._currentVoltage = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'voltageTransition':
            this._voltageTransition = val;
            return 1;
        case 'voltageAtStartUp':
            this._voltageAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the output voltage, in V. Valid range is from 0 to 10V.
     *
     * @param newval {number} : a floating point number corresponding to the output voltage, in V
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentVoltage(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentVoltage',rest_val);
    }

    /**
     * Returns the output voltage set point, in V.
     *
     * @return {number} a floating point number corresponding to the output voltage set point, in V
     *
     * On failure, throws an exception or returns YVoltageOutput.CURRENTVOLTAGE_INVALID.
     */
    async get_currentVoltage()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YVoltageOutput.CURRENTVOLTAGE_INVALID;
            }
        }
        res = this._currentVoltage;
        return res;
    }

    async get_voltageTransition()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YVoltageOutput.VOLTAGETRANSITION_INVALID;
            }
        }
        res = this._voltageTransition;
        return res;
    }

    async set_voltageTransition(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('voltageTransition',rest_val);
    }

    /**
     * Changes the output voltage at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval {number} : a floating point number corresponding to the output voltage at device start up
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageAtStartUp(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('voltageAtStartUp',rest_val);
    }

    /**
     * Returns the selected voltage output at device startup, in V.
     *
     * @return {number} a floating point number corresponding to the selected voltage output at device startup, in V
     *
     * On failure, throws an exception or returns YVoltageOutput.VOLTAGEATSTARTUP_INVALID.
     */
    async get_voltageAtStartUp()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YVoltageOutput.VOLTAGEATSTARTUP_INVALID;
            }
        }
        res = this._voltageAtStartUp;
        return res;
    }

    /**
     * Retrieves a voltage output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltageOutput.isOnline() to test if the voltage output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the voltage output
     *
     * @return {YVoltageOutput} a YVoltageOutput object allowing you to drive the voltage output.
     */
    static FindVoltageOutput(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('VoltageOutput', func);
        if (obj == null) {
            obj = new YVoltageOutput(YAPI, func);
            YFunction._AddToCache('VoltageOutput',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a voltage output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltageOutput.isOnline() to test if the voltage output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the voltage output
     *
     * @return {YVoltageOutput} a YVoltageOutput object allowing you to drive the voltage output.
     */
    static FindVoltageOutputInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'VoltageOutput', func);
        if (obj == null) {
            obj = new YVoltageOutput(yctx, func);
            YFunction._AddToCache('VoltageOutput',  func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transistion of output voltage. Any explicit voltage
     * change cancels any ongoing transition process.
     *
     * @param V_target   : new output voltage value at the end of the transition
     *         (floating-point number, representing the end voltage in V)
     * @param ms_duration {number} : total duration of the transition, in milliseconds
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     */
    async voltageMove(V_target,ms_duration)
    {
        /** @type {string} **/
        let newval;
        if (V_target < 0.0) {
            V_target  = 0.0;
        }
        if (V_target > 10.0) {
            V_target = 10.0;
        }
        newval = String(Math.round(Math.round(V_target*65536)))+':'+String(Math.round(ms_duration));

        return await this.set_voltageTransition(newval);
    }

    /**
     * Continues the enumeration of voltage outputs started using yFirstVoltageOutput().
     *
     * @return {YVoltageOutput} a pointer to a YVoltageOutput object, corresponding to
     *         a voltage output currently online, or a null pointer
     *         if there are no more voltage outputs to enumerate.
     */
    nextVoltageOutput()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YVoltageOutput.FindVoltageOutputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of voltage outputs currently accessible.
     * Use the method YVoltageOutput.nextVoltageOutput() to iterate on
     * next voltage outputs.
     *
     * @return {YVoltageOutput} a pointer to a YVoltageOutput object, corresponding to
     *         the first voltage output currently online, or a null pointer
     *         if there are none.
     */
    static FirstVoltageOutput()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('VoltageOutput');
        if(next_hwid == null) return null;
        return YVoltageOutput.FindVoltageOutput(next_hwid);
    }

    /**
     * Starts the enumeration of voltage outputs currently accessible.
     * Use the method YVoltageOutput.nextVoltageOutput() to iterate on
     * next voltage outputs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YVoltageOutput} a pointer to a YVoltageOutput object, corresponding to
     *         the first voltage output currently online, or a null pointer
     *         if there are none.
     */
    static FirstVoltageOutputInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('VoltageOutput');
        if(next_hwid == null) return null;
        return YVoltageOutput.FindVoltageOutputInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            CURRENTVOLTAGE_INVALID       : YAPI.INVALID_DOUBLE,
            VOLTAGETRANSITION_INVALID    : YAPI.INVALID_STRING,
            VOLTAGEATSTARTUP_INVALID     : YAPI.INVALID_DOUBLE
        });
    }

    //--- (end of YVoltageOutput implementation)
}

//
// YVoltageOutputProxy Class: synchronous proxy to YVoltageOutput objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YVoltageOutput objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YVoltageOutputProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YVoltageOutput accessors declaration)

    /**
     * Changes the output voltage, in V. Valid range is from 0 to 10V.
     *
     * @param newval : a floating point number corresponding to the output voltage, in V
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentVoltage(newval)
    {
        this.liveFunc.set_currentVoltage(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the output voltage set point, in V.
     *
     * @return a floating point number corresponding to the output voltage set point, in V
     *
     * On failure, throws an exception or returns Y_CURRENTVOLTAGE_INVALID.
     */
    get_currentVoltage()
    {
        return this.liveFunc._currentVoltage;
    }

    get_voltageTransition()
    {
        return this.liveFunc._voltageTransition;
    }

    set_voltageTransition(newval)
    {
        this.liveFunc.set_voltageTransition(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the output voltage at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the output voltage at device start up
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageAtStartUp(newval)
    {
        this.liveFunc.set_voltageAtStartUp(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the selected voltage output at device startup, in V.
     *
     * @return a floating point number corresponding to the selected voltage output at device startup, in V
     *
     * On failure, throws an exception or returns Y_VOLTAGEATSTARTUP_INVALID.
     */
    get_voltageAtStartUp()
    {
        return this.liveFunc._voltageAtStartUp;
    }

    /**
     * Performs a smooth transistion of output voltage. Any explicit voltage
     * change cancels any ongoing transition process.
     *
     * @param V_target   : new output voltage value at the end of the transition
     *         (floating-point number, representing the end voltage in V)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI_SUCCESS when the call succeeds.
     */
    voltageMove(V_target,ms_duration)
    {
        this.liveFunc.voltageMove(V_target, ms_duration);
        return YAPI_SUCCESS;
    }
    //--- (end of YVoltageOutput accessors declaration)
}

//--- (YVoltageOutput functions)

YoctoLibExport('YVoltageOutput', YVoltageOutput);
YoctoLibExport('YVoltageOutputProxy', YVoltageOutputProxy);
YVoltageOutput.imm_Init();

//--- (end of YVoltageOutput functions)
