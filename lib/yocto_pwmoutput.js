/*********************************************************************
 *
 * $Id: yocto_pwmoutput.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for PwmOutput functions
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

//--- (YPwmOutput return codes)
//--- (end of YPwmOutput return codes)
//--- (YPwmOutput definitions)
//--- (end of YPwmOutput definitions)

//--- (YPwmOutput class start)
/**
 * YPwmOutput Class: PwmOutput function interface
 *
 * The Yoctopuce application programming interface allows you to configure, start, and stop the PWM.
 */
//--- (end of YPwmOutput class start)

class YPwmOutput extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YPwmOutput constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'PwmOutput';
        /** @member {number} **/
        this._enabled                    = YPwmOutput.ENABLED_INVALID;
        /** @member {number} **/
        this._frequency                  = YPwmOutput.FREQUENCY_INVALID;
        /** @member {number} **/
        this._period                     = YPwmOutput.PERIOD_INVALID;
        /** @member {number} **/
        this._dutyCycle                  = YPwmOutput.DUTYCYCLE_INVALID;
        /** @member {number} **/
        this._pulseDuration              = YPwmOutput.PULSEDURATION_INVALID;
        /** @member {string} **/
        this._pwmTransition              = YPwmOutput.PWMTRANSITION_INVALID;
        /** @member {number} **/
        this._enabledAtPowerOn           = YPwmOutput.ENABLEDATPOWERON_INVALID;
        /** @member {number} **/
        this._dutyCycleAtPowerOn         = YPwmOutput.DUTYCYCLEATPOWERON_INVALID;
        //--- (end of YPwmOutput constructor)
    }

    //--- (YPwmOutput implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'enabled':
            this._enabled = parseInt(val);
            return 1;
        case 'frequency':
            this._frequency = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'period':
            this._period = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'dutyCycle':
            this._dutyCycle = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'pulseDuration':
            this._pulseDuration = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'pwmTransition':
            this._pwmTransition = val;
            return 1;
        case 'enabledAtPowerOn':
            this._enabledAtPowerOn = parseInt(val);
            return 1;
        case 'dutyCycleAtPowerOn':
            this._dutyCycleAtPowerOn = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the state of the PWMs.
     *
     * @return {number} either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE, according to the state of the PWMs
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLED_INVALID.
     */
    async get_enabled()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Stops or starts the PWM.
     *
     * @param newval {number} : either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabled',rest_val);
    }

    /**
     * Changes the PWM frequency. The duty cycle is kept unchanged thanks to an
     * automatic pulse width change.
     *
     * @param newval {number} : a floating point number corresponding to the PWM frequency
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_frequency(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('frequency',rest_val);
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return {number} a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmOutput.FREQUENCY_INVALID.
     */
    async get_frequency()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }

    /**
     * Changes the PWM period in milliseconds.
     *
     * @param newval {number} : a floating point number corresponding to the PWM period in milliseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_period(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('period',rest_val);
    }

    /**
     * Returns the PWM period in milliseconds.
     *
     * @return {number} a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmOutput.PERIOD_INVALID.
     */
    async get_period()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.PERIOD_INVALID;
            }
        }
        res = this._period;
        return res;
    }

    /**
     * Changes the PWM duty cycle, in per cents.
     *
     * @param newval {number} : a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_dutyCycle(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('dutyCycle',rest_val);
    }

    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return {number} a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLE_INVALID.
     */
    async get_dutyCycle()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.DUTYCYCLE_INVALID;
            }
        }
        res = this._dutyCycle;
        return res;
    }

    /**
     * Changes the PWM pulse length, in milliseconds. A pulse length cannot be longer than period,
     * otherwise it is truncated.
     *
     * @param newval {number} : a floating point number corresponding to the PWM pulse length, in milliseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_pulseDuration(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('pulseDuration',rest_val);
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the PWM pulse length in milliseconds, as
     * a floating point number
     *
     * On failure, throws an exception or returns YPwmOutput.PULSEDURATION_INVALID.
     */
    async get_pulseDuration()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.PULSEDURATION_INVALID;
            }
        }
        res = this._pulseDuration;
        return res;
    }

    async get_pwmTransition()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.PWMTRANSITION_INVALID;
            }
        }
        res = this._pwmTransition;
        return res;
    }

    async set_pwmTransition(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('pwmTransition',rest_val);
    }

    /**
     * Returns the state of the PWM at device power on.
     *
     * @return {number} either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE,
     * according to the state of the PWM at device power on
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLEDATPOWERON_INVALID.
     */
    async get_enabledAtPowerOn()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.ENABLEDATPOWERON_INVALID;
            }
        }
        res = this._enabledAtPowerOn;
        return res;
    }

    /**
     * Changes the state of the PWM at device power on. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval {number} : either YPwmOutput.ENABLEDATPOWERON_FALSE or
     * YPwmOutput.ENABLEDATPOWERON_TRUE, according to the state of the PWM at device power on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabledAtPowerOn(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabledAtPowerOn',rest_val);
    }

    /**
     * Changes the PWM duty cycle at device power on. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval {number} : a floating point number corresponding to the PWM duty cycle at device power on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_dutyCycleAtPowerOn(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('dutyCycleAtPowerOn',rest_val);
    }

    /**
     * Returns the PWMs duty cycle at device power on as a floating point number between 0 and 100.
     *
     * @return {number} a floating point number corresponding to the PWMs duty cycle at device power on as
     * a floating point number between 0 and 100
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLEATPOWERON_INVALID.
     */
    async get_dutyCycleAtPowerOn()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.DUTYCYCLEATPOWERON_INVALID;
            }
        }
        res = this._dutyCycleAtPowerOn;
        return res;
    }

    /**
     * Retrieves a PWM for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmOutput.isOnline() to test if the PWM is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the PWM
     *
     * @return {YPwmOutput} a YPwmOutput object allowing you to drive the PWM.
     */
    static FindPwmOutput(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('PwmOutput', func);
        if (obj == null) {
            obj = new YPwmOutput(YAPI, func);
            YFunction._AddToCache('PwmOutput',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a PWM for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmOutput.isOnline() to test if the PWM is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the PWM
     *
     * @return {YPwmOutput} a YPwmOutput object allowing you to drive the PWM.
     */
    static FindPwmOutputInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'PwmOutput', func);
        if (obj == null) {
            obj = new YPwmOutput(yctx, func);
            YFunction._AddToCache('PwmOutput',  func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transistion of the pulse duration toward a given value. Any period,
     * frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param ms_target   : new pulse duration at the end of the transition
     *         (floating-point number, representing the pulse duration in milliseconds)
     * @param ms_duration {number} : total duration of the transition, in milliseconds
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async pulseDurationMove(ms_target,ms_duration)
    {
        /** @type {string} **/
        let newval;
        if (ms_target < 0.0) {
            ms_target = 0.0;
        }
        newval = String(Math.round(Math.round(ms_target*65536)))+'ms:'+String(Math.round(ms_duration));
        return await this.set_pwmTransition(newval);
    }

    /**
     * Performs a smooth change of the pulse duration toward a given value.
     *
     * @param target      : new duty cycle at the end of the transition
     *         (floating-point number, between 0 and 1)
     * @param ms_duration {number} : total duration of the transition, in milliseconds
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async dutyCycleMove(target,ms_duration)
    {
        /** @type {string} **/
        let newval;
        if (target < 0.0) {
            target = 0.0;
        }
        if (target > 100.0) {
            target = 100.0;
        }
        newval = String(Math.round(Math.round(target*65536)))+':'+String(Math.round(ms_duration));
        return await this.set_pwmTransition(newval);
    }

    /**
     * Continues the enumeration of PWMs started using yFirstPwmOutput().
     *
     * @return {YPwmOutput} a pointer to a YPwmOutput object, corresponding to
     *         a PWM currently online, or a null pointer
     *         if there are no more PWMs to enumerate.
     */
    nextPwmOutput()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPwmOutput.FindPwmOutputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of PWMs currently accessible.
     * Use the method YPwmOutput.nextPwmOutput() to iterate on
     * next PWMs.
     *
     * @return {YPwmOutput} a pointer to a YPwmOutput object, corresponding to
     *         the first PWM currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmOutput()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('PwmOutput');
        if(next_hwid == null) return null;
        return YPwmOutput.FindPwmOutput(next_hwid);
    }

    /**
     * Starts the enumeration of PWMs currently accessible.
     * Use the method YPwmOutput.nextPwmOutput() to iterate on
     * next PWMs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPwmOutput} a pointer to a YPwmOutput object, corresponding to
     *         the first PWM currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmOutputInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('PwmOutput');
        if(next_hwid == null) return null;
        return YPwmOutput.FindPwmOutputInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            ENABLED_FALSE                : 0,
            ENABLED_TRUE                 : 1,
            ENABLED_INVALID              : -1,
            FREQUENCY_INVALID            : YAPI.INVALID_DOUBLE,
            PERIOD_INVALID               : YAPI.INVALID_DOUBLE,
            DUTYCYCLE_INVALID            : YAPI.INVALID_DOUBLE,
            PULSEDURATION_INVALID        : YAPI.INVALID_DOUBLE,
            PWMTRANSITION_INVALID        : YAPI.INVALID_STRING,
            ENABLEDATPOWERON_FALSE       : 0,
            ENABLEDATPOWERON_TRUE        : 1,
            ENABLEDATPOWERON_INVALID     : -1,
            DUTYCYCLEATPOWERON_INVALID   : YAPI.INVALID_DOUBLE
        });
    }

    //--- (end of YPwmOutput implementation)
}

//
// YPwmOutputProxy Class: synchronous proxy to YPwmOutput objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPwmOutput objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YPwmOutputProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YPwmOutput accessors declaration)

    /**
     * Returns the state of the PWMs.
     *
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the state of the PWMs
     *
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    get_enabled()
    {
        return this.liveFunc._enabled;
    }

    /**
     * Stops or starts the PWM.
     *
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval)
    {
        this.liveFunc.set_enabled(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the PWM frequency. The duty cycle is kept unchanged thanks to an
     * automatic pulse width change.
     *
     * @param newval : a floating point number corresponding to the PWM frequency
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_frequency(newval)
    {
        this.liveFunc.set_frequency(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns Y_FREQUENCY_INVALID.
     */
    get_frequency()
    {
        return this.liveFunc._frequency;
    }

    /**
     * Changes the PWM period in milliseconds.
     *
     * @param newval : a floating point number corresponding to the PWM period in milliseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_period(newval)
    {
        this.liveFunc.set_period(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the PWM period in milliseconds.
     *
     * @return a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns Y_PERIOD_INVALID.
     */
    get_period()
    {
        return this.liveFunc._period;
    }

    /**
     * Changes the PWM duty cycle, in per cents.
     *
     * @param newval : a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_dutyCycle(newval)
    {
        this.liveFunc.set_dutyCycle(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns Y_DUTYCYCLE_INVALID.
     */
    get_dutyCycle()
    {
        return this.liveFunc._dutyCycle;
    }

    /**
     * Changes the PWM pulse length, in milliseconds. A pulse length cannot be longer than period,
     * otherwise it is truncated.
     *
     * @param newval : a floating point number corresponding to the PWM pulse length, in milliseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pulseDuration(newval)
    {
        this.liveFunc.set_pulseDuration(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return a floating point number corresponding to the PWM pulse length in milliseconds, as a
     * floating point number
     *
     * On failure, throws an exception or returns Y_PULSEDURATION_INVALID.
     */
    get_pulseDuration()
    {
        return this.liveFunc._pulseDuration;
    }

    get_pwmTransition()
    {
        return this.liveFunc._pwmTransition;
    }

    set_pwmTransition(newval)
    {
        this.liveFunc.set_pwmTransition(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the state of the PWM at device power on.
     *
     * @return either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE, according to the state of the
     * PWM at device power on
     *
     * On failure, throws an exception or returns Y_ENABLEDATPOWERON_INVALID.
     */
    get_enabledAtPowerOn()
    {
        return this.liveFunc._enabledAtPowerOn;
    }

    /**
     * Changes the state of the PWM at device power on. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE, according to the state
     * of the PWM at device power on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabledAtPowerOn(newval)
    {
        this.liveFunc.set_enabledAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the PWM duty cycle at device power on. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : a floating point number corresponding to the PWM duty cycle at device power on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_dutyCycleAtPowerOn(newval)
    {
        this.liveFunc.set_dutyCycleAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the PWMs duty cycle at device power on as a floating point number between 0 and 100.
     *
     * @return a floating point number corresponding to the PWMs duty cycle at device power on as a
     * floating point number between 0 and 100
     *
     * On failure, throws an exception or returns Y_DUTYCYCLEATPOWERON_INVALID.
     */
    get_dutyCycleAtPowerOn()
    {
        return this.liveFunc._dutyCycleAtPowerOn;
    }

    /**
     * Performs a smooth transistion of the pulse duration toward a given value. Any period,
     * frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param ms_target   : new pulse duration at the end of the transition
     *         (floating-point number, representing the pulse duration in milliseconds)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pulseDurationMove(ms_target,ms_duration)
    {
        this.liveFunc.pulseDurationMove(ms_target, ms_duration);
        return YAPI_SUCCESS;
    }

    /**
     * Performs a smooth change of the pulse duration toward a given value.
     *
     * @param target      : new duty cycle at the end of the transition
     *         (floating-point number, between 0 and 1)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    dutyCycleMove(target,ms_duration)
    {
        this.liveFunc.dutyCycleMove(target, ms_duration);
        return YAPI_SUCCESS;
    }
    //--- (end of YPwmOutput accessors declaration)
}

//--- (YPwmOutput functions)

YoctoLibExport('YPwmOutput', YPwmOutput);
YoctoLibExport('YPwmOutputProxy', YPwmOutputProxy);
YPwmOutput.imm_Init();

//--- (end of YPwmOutput functions)
