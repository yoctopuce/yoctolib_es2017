/*********************************************************************
 *
 *  $Id: yocto_powersupply.js 34115 2019-01-23 14:23:54Z seb $
 *
 *  Implements the high-level API for PowerSupply functions
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

//--- (YPowerSupply return codes)
//--- (end of YPowerSupply return codes)
//--- (YPowerSupply definitions)
//--- (end of YPowerSupply definitions)

//--- (YPowerSupply class start)
/**
 * YPowerSupply Class: PowerSupply function interface
 *
 * The Yoctopuce application programming interface allows you to change the voltage set point,
 * the current limit and the enable/disable the output.
 */
//--- (end of YPowerSupply class start)

class YPowerSupply extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YPowerSupply constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'PowerSupply';
        /** @member {number} **/
        this._voltageSetPoint            = YPowerSupply.VOLTAGESETPOINT_INVALID;
        /** @member {number} **/
        this._currentLimit               = YPowerSupply.CURRENTLIMIT_INVALID;
        /** @member {number} **/
        this._powerOutput                = YPowerSupply.POWEROUTPUT_INVALID;
        /** @member {number} **/
        this._voltageSense               = YPowerSupply.VOLTAGESENSE_INVALID;
        /** @member {number} **/
        this._measuredVoltage            = YPowerSupply.MEASUREDVOLTAGE_INVALID;
        /** @member {number} **/
        this._measuredCurrent            = YPowerSupply.MEASUREDCURRENT_INVALID;
        /** @member {number} **/
        this._inputVoltage               = YPowerSupply.INPUTVOLTAGE_INVALID;
        /** @member {number} **/
        this._vInt                       = YPowerSupply.VINT_INVALID;
        /** @member {number} **/
        this._ldoTemperature             = YPowerSupply.LDOTEMPERATURE_INVALID;
        /** @member {string} **/
        this._voltageTransition          = YPowerSupply.VOLTAGETRANSITION_INVALID;
        /** @member {number} **/
        this._voltageAtStartUp           = YPowerSupply.VOLTAGEATSTARTUP_INVALID;
        /** @member {number} **/
        this._currentAtStartUp           = YPowerSupply.CURRENTATSTARTUP_INVALID;
        /** @member {string} **/
        this._command                    = YPowerSupply.COMMAND_INVALID;
        //--- (end of YPowerSupply constructor)
    }

    //--- (YPowerSupply implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'voltageSetPoint':
            this._voltageSetPoint = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'currentLimit':
            this._currentLimit = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'powerOutput':
            this._powerOutput = parseInt(val);
            return 1;
        case 'voltageSense':
            this._voltageSense = parseInt(val);
            return 1;
        case 'measuredVoltage':
            this._measuredVoltage = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'measuredCurrent':
            this._measuredCurrent = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'inputVoltage':
            this._inputVoltage = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'vInt':
            this._vInt = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'ldoTemperature':
            this._ldoTemperature = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'voltageTransition':
            this._voltageTransition = val;
            return 1;
        case 'voltageAtStartUp':
            this._voltageAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'currentAtStartUp':
            this._currentAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the voltage set point, in V.
     *
     * @param newval {number} : a floating point number corresponding to the voltage set point, in V
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageSetPoint(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('voltageSetPoint',rest_val);
    }

    /**
     * Returns the voltage set point, in V.
     *
     * @return {number} a floating point number corresponding to the voltage set point, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGESETPOINT_INVALID.
     */
    async get_voltageSetPoint()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGESETPOINT_INVALID;
            }
        }
        res = this._voltageSetPoint;
        return res;
    }

    /**
     * Changes the current limit, in mA.
     *
     * @param newval {number} : a floating point number corresponding to the current limit, in mA
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentLimit(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentLimit',rest_val);
    }

    /**
     * Returns the current limit, in mA.
     *
     * @return {number} a floating point number corresponding to the current limit, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.CURRENTLIMIT_INVALID.
     */
    async get_currentLimit()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.CURRENTLIMIT_INVALID;
            }
        }
        res = this._currentLimit;
        return res;
    }

    /**
     * Returns the power supply output switch state.
     *
     * @return {number} either YPowerSupply.POWEROUTPUT_OFF or YPowerSupply.POWEROUTPUT_ON, according to
     * the power supply output switch state
     *
     * On failure, throws an exception or returns YPowerSupply.POWEROUTPUT_INVALID.
     */
    async get_powerOutput()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.POWEROUTPUT_INVALID;
            }
        }
        res = this._powerOutput;
        return res;
    }

    /**
     * Changes the power supply output switch state.
     *
     * @param newval {number} : either YPowerSupply.POWEROUTPUT_OFF or YPowerSupply.POWEROUTPUT_ON,
     * according to the power supply output switch state
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_powerOutput(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('powerOutput',rest_val);
    }

    /**
     * Returns the output voltage control point.
     *
     * @return {number} either YPowerSupply.VOLTAGESENSE_INT or YPowerSupply.VOLTAGESENSE_EXT, according
     * to the output voltage control point
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGESENSE_INVALID.
     */
    async get_voltageSense()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGESENSE_INVALID;
            }
        }
        res = this._voltageSense;
        return res;
    }

    /**
     * Changes the voltage control point.
     *
     * @param newval {number} : either YPowerSupply.VOLTAGESENSE_INT or YPowerSupply.VOLTAGESENSE_EXT,
     * according to the voltage control point
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageSense(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('voltageSense',rest_val);
    }

    /**
     * Returns the measured output voltage, in V.
     *
     * @return {number} a floating point number corresponding to the measured output voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.MEASUREDVOLTAGE_INVALID.
     */
    async get_measuredVoltage()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.MEASUREDVOLTAGE_INVALID;
            }
        }
        res = this._measuredVoltage;
        return res;
    }

    /**
     * Returns the measured output current, in mA.
     *
     * @return {number} a floating point number corresponding to the measured output current, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.MEASUREDCURRENT_INVALID.
     */
    async get_measuredCurrent()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.MEASUREDCURRENT_INVALID;
            }
        }
        res = this._measuredCurrent;
        return res;
    }

    /**
     * Returns the measured input voltage, in V.
     *
     * @return {number} a floating point number corresponding to the measured input voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.INPUTVOLTAGE_INVALID.
     */
    async get_inputVoltage()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.INPUTVOLTAGE_INVALID;
            }
        }
        res = this._inputVoltage;
        return res;
    }

    /**
     * Returns the internal voltage, in V.
     *
     * @return {number} a floating point number corresponding to the internal voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VINT_INVALID.
     */
    async get_vInt()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VINT_INVALID;
            }
        }
        res = this._vInt;
        return res;
    }

    /**
     * Returns the LDO temperature, in Celsius.
     *
     * @return {number} a floating point number corresponding to the LDO temperature, in Celsius
     *
     * On failure, throws an exception or returns YPowerSupply.LDOTEMPERATURE_INVALID.
     */
    async get_ldoTemperature()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.LDOTEMPERATURE_INVALID;
            }
        }
        res = this._ldoTemperature;
        return res;
    }

    async get_voltageTransition()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGETRANSITION_INVALID;
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
     * Changes the voltage set point at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval {number} : a floating point number corresponding to the voltage set point at device start up
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
     * Returns the selected voltage set point at device startup, in V.
     *
     * @return {number} a floating point number corresponding to the selected voltage set point at device startup, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGEATSTARTUP_INVALID.
     */
    async get_voltageAtStartUp()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGEATSTARTUP_INVALID;
            }
        }
        res = this._voltageAtStartUp;
        return res;
    }

    /**
     * Changes the current limit at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval {number} : a floating point number corresponding to the current limit at device start up
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentAtStartUp(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentAtStartUp',rest_val);
    }

    /**
     * Returns the selected current limit at device startup, in mA.
     *
     * @return {number} a floating point number corresponding to the selected current limit at device startup, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.CURRENTATSTARTUP_INVALID.
     */
    async get_currentAtStartUp()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.CURRENTATSTARTUP_INVALID;
            }
        }
        res = this._currentAtStartUp;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.COMMAND_INVALID;
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
     * Retrieves a regulated power supply for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the regulated power supply is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerSupply.isOnline() to test if the regulated power supply is
     * indeed online at a given time. In case of ambiguity when looking for
     * a regulated power supply by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the regulated power supply
     *
     * @return {YPowerSupply} a YPowerSupply object allowing you to drive the regulated power supply.
     */
    static FindPowerSupply(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('PowerSupply', func);
        if (obj == null) {
            obj = new YPowerSupply(YAPI, func);
            YFunction._AddToCache('PowerSupply',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a regulated power supply for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the regulated power supply is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerSupply.isOnline() to test if the regulated power supply is
     * indeed online at a given time. In case of ambiguity when looking for
     * a regulated power supply by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the regulated power supply
     *
     * @return {YPowerSupply} a YPowerSupply object allowing you to drive the regulated power supply.
     */
    static FindPowerSupplyInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'PowerSupply', func);
        if (obj == null) {
            obj = new YPowerSupply(yctx, func);
            YFunction._AddToCache('PowerSupply',  func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transition of output voltage. Any explicit voltage
     * change cancels any ongoing transition process.
     *
     * @param V_target   : new output voltage value at the end of the transition
     *         (floating-point number, representing the end voltage in V)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI_SUCCESS when the call succeeds.
     */
    async voltageMove(V_target,ms_duration)
    {
        /** @type {string} **/
        let newval;
        if (V_target < 0.0) {
            V_target  = 0.0;
        }
        newval = String(Math.round(Math.round(V_target*65536)))+':'+String(Math.round(ms_duration));

        return await this.set_voltageTransition(newval);
    }

    /**
     * Continues the enumeration of regulated power supplies started using yFirstPowerSupply().
     * Caution: You can't make any assumption about the returned regulated power supplies order.
     * If you want to find a specific a regulated power supply, use PowerSupply.findPowerSupply()
     * and a hardwareID or a logical name.
     *
     * @return {YPowerSupply} a pointer to a YPowerSupply object, corresponding to
     *         a regulated power supply currently online, or a null pointer
     *         if there are no more regulated power supplies to enumerate.
     */
    nextPowerSupply()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPowerSupply.FindPowerSupplyInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of regulated power supplies currently accessible.
     * Use the method YPowerSupply.nextPowerSupply() to iterate on
     * next regulated power supplies.
     *
     * @return {YPowerSupply} a pointer to a YPowerSupply object, corresponding to
     *         the first regulated power supply currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerSupply()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('PowerSupply');
        if(next_hwid == null) return null;
        return YPowerSupply.FindPowerSupply(next_hwid);
    }

    /**
     * Starts the enumeration of regulated power supplies currently accessible.
     * Use the method YPowerSupply.nextPowerSupply() to iterate on
     * next regulated power supplies.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPowerSupply} a pointer to a YPowerSupply object, corresponding to
     *         the first regulated power supply currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerSupplyInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('PowerSupply');
        if(next_hwid == null) return null;
        return YPowerSupply.FindPowerSupplyInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            VOLTAGESETPOINT_INVALID      : YAPI.INVALID_DOUBLE,
            CURRENTLIMIT_INVALID         : YAPI.INVALID_DOUBLE,
            POWEROUTPUT_OFF              : 0,
            POWEROUTPUT_ON               : 1,
            POWEROUTPUT_INVALID          : -1,
            VOLTAGESENSE_INT             : 0,
            VOLTAGESENSE_EXT             : 1,
            VOLTAGESENSE_INVALID         : -1,
            MEASUREDVOLTAGE_INVALID      : YAPI.INVALID_DOUBLE,
            MEASUREDCURRENT_INVALID      : YAPI.INVALID_DOUBLE,
            INPUTVOLTAGE_INVALID         : YAPI.INVALID_DOUBLE,
            VINT_INVALID                 : YAPI.INVALID_DOUBLE,
            LDOTEMPERATURE_INVALID       : YAPI.INVALID_DOUBLE,
            VOLTAGETRANSITION_INVALID    : YAPI.INVALID_STRING,
            VOLTAGEATSTARTUP_INVALID     : YAPI.INVALID_DOUBLE,
            CURRENTATSTARTUP_INVALID     : YAPI.INVALID_DOUBLE,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YPowerSupply implementation)
}

//
// YPowerSupplyProxy Class: synchronous proxy to YPowerSupply objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPowerSupply objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YPowerSupplyProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YPowerSupply accessors declaration)

    /**
     * Changes the voltage set point, in V.
     *
     * @param newval : a floating point number corresponding to the voltage set point, in V
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageSetPoint(newval)
    {
        this.liveFunc.set_voltageSetPoint(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the voltage set point, in V.
     *
     * @return a floating point number corresponding to the voltage set point, in V
     *
     * On failure, throws an exception or returns Y_VOLTAGESETPOINT_INVALID.
     */
    get_voltageSetPoint()
    {
        return this.liveFunc._voltageSetPoint;
    }

    /**
     * Changes the current limit, in mA.
     *
     * @param newval : a floating point number corresponding to the current limit, in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentLimit(newval)
    {
        this.liveFunc.set_currentLimit(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current limit, in mA.
     *
     * @return a floating point number corresponding to the current limit, in mA
     *
     * On failure, throws an exception or returns Y_CURRENTLIMIT_INVALID.
     */
    get_currentLimit()
    {
        return this.liveFunc._currentLimit;
    }

    /**
     * Returns the power supply output switch state.
     *
     * @return either Y_POWEROUTPUT_OFF or Y_POWEROUTPUT_ON, according to the power supply output switch state
     *
     * On failure, throws an exception or returns Y_POWEROUTPUT_INVALID.
     */
    get_powerOutput()
    {
        return this.liveFunc._powerOutput;
    }

    /**
     * Changes the power supply output switch state.
     *
     * @param newval : either Y_POWEROUTPUT_OFF or Y_POWEROUTPUT_ON, according to the power supply output switch state
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerOutput(newval)
    {
        this.liveFunc.set_powerOutput(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the output voltage control point.
     *
     * @return either Y_VOLTAGESENSE_INT or Y_VOLTAGESENSE_EXT, according to the output voltage control point
     *
     * On failure, throws an exception or returns Y_VOLTAGESENSE_INVALID.
     */
    get_voltageSense()
    {
        return this.liveFunc._voltageSense;
    }

    /**
     * Changes the voltage control point.
     *
     * @param newval : either Y_VOLTAGESENSE_INT or Y_VOLTAGESENSE_EXT, according to the voltage control point
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageSense(newval)
    {
        this.liveFunc.set_voltageSense(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the measured output voltage, in V.
     *
     * @return a floating point number corresponding to the measured output voltage, in V
     *
     * On failure, throws an exception or returns Y_MEASUREDVOLTAGE_INVALID.
     */
    get_measuredVoltage()
    {
        return this.liveFunc._measuredVoltage;
    }

    /**
     * Returns the measured output current, in mA.
     *
     * @return a floating point number corresponding to the measured output current, in mA
     *
     * On failure, throws an exception or returns Y_MEASUREDCURRENT_INVALID.
     */
    get_measuredCurrent()
    {
        return this.liveFunc._measuredCurrent;
    }

    /**
     * Returns the measured input voltage, in V.
     *
     * @return a floating point number corresponding to the measured input voltage, in V
     *
     * On failure, throws an exception or returns Y_INPUTVOLTAGE_INVALID.
     */
    get_inputVoltage()
    {
        return this.liveFunc._inputVoltage;
    }

    /**
     * Returns the internal voltage, in V.
     *
     * @return a floating point number corresponding to the internal voltage, in V
     *
     * On failure, throws an exception or returns Y_VINT_INVALID.
     */
    get_vInt()
    {
        return this.liveFunc._vInt;
    }

    /**
     * Returns the LDO temperature, in Celsius.
     *
     * @return a floating point number corresponding to the LDO temperature, in Celsius
     *
     * On failure, throws an exception or returns Y_LDOTEMPERATURE_INVALID.
     */
    get_ldoTemperature()
    {
        return this.liveFunc._ldoTemperature;
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
     * Changes the voltage set point at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the voltage set point at device start up
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
     * Returns the selected voltage set point at device startup, in V.
     *
     * @return a floating point number corresponding to the selected voltage set point at device startup, in V
     *
     * On failure, throws an exception or returns Y_VOLTAGEATSTARTUP_INVALID.
     */
    get_voltageAtStartUp()
    {
        return this.liveFunc._voltageAtStartUp;
    }

    /**
     * Changes the current limit at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the current limit at device start up
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentAtStartUp(newval)
    {
        this.liveFunc.set_currentAtStartUp(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the selected current limit at device startup, in mA.
     *
     * @return a floating point number corresponding to the selected current limit at device startup, in mA
     *
     * On failure, throws an exception or returns Y_CURRENTATSTARTUP_INVALID.
     */
    get_currentAtStartUp()
    {
        return this.liveFunc._currentAtStartUp;
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
     * Performs a smooth transition of output voltage. Any explicit voltage
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
    //--- (end of YPowerSupply accessors declaration)
}

//--- (YPowerSupply functions)

YoctoLibExport('YPowerSupply', YPowerSupply);
YoctoLibExport('YPowerSupplyProxy', YPowerSupplyProxy);
YPowerSupply.imm_Init();

//--- (end of YPowerSupply functions)
