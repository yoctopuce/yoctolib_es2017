/*********************************************************************
 *
 *  $Id: yocto_pwminput.js 32902 2018-11-02 10:13:53Z seb $
 *
 *  Implements the high-level API for PwmInput functions
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

//--- (YPwmInput return codes)
//--- (end of YPwmInput return codes)
//--- (YPwmInput definitions)
//--- (end of YPwmInput definitions)

//--- (YPwmInput class start)
/**
 * YPwmInput Class: PwmInput function interface
 *
 * The Yoctopuce class YPwmInput allows you to read and configure Yoctopuce PWM
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 * This class adds the ability to configure the signal parameter used to transmit
 * information: the duty cycle, the frequency or the pulse width.
 */
//--- (end of YPwmInput class start)

class YPwmInput extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YPwmInput constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'PwmInput';
        /** @member {number} **/
        this._dutyCycle                  = YPwmInput.DUTYCYCLE_INVALID;
        /** @member {number} **/
        this._pulseDuration              = YPwmInput.PULSEDURATION_INVALID;
        /** @member {number} **/
        this._frequency                  = YPwmInput.FREQUENCY_INVALID;
        /** @member {number} **/
        this._period                     = YPwmInput.PERIOD_INVALID;
        /** @member {number} **/
        this._pulseCounter               = YPwmInput.PULSECOUNTER_INVALID;
        /** @member {number} **/
        this._pulseTimer                 = YPwmInput.PULSETIMER_INVALID;
        /** @member {number} **/
        this._pwmReportMode              = YPwmInput.PWMREPORTMODE_INVALID;
        /** @member {number} **/
        this._debouncePeriod             = YPwmInput.DEBOUNCEPERIOD_INVALID;
        //--- (end of YPwmInput constructor)
    }

    //--- (YPwmInput implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'dutyCycle':
            this._dutyCycle = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'pulseDuration':
            this._pulseDuration = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'frequency':
            this._frequency = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'period':
            this._period = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'pulseCounter':
            this._pulseCounter = parseInt(val);
            return 1;
        case 'pulseTimer':
            this._pulseTimer = parseInt(val);
            return 1;
        case 'pwmReportMode':
            this._pwmReportMode = parseInt(val);
            return 1;
        case 'debouncePeriod':
            this._debouncePeriod = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured quantity. That unit
     * is just a string which is automatically initialized each time
     * the measurement mode is changed. But is can be set to an
     * arbitrary value.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the measured quantity
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
     * Returns the PWM duty cycle, in per cents.
     *
     * @return {number} a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmInput.DUTYCYCLE_INVALID.
     */
    async get_dutyCycle()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.DUTYCYCLE_INVALID;
            }
        }
        res = this._dutyCycle;
        return res;
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the PWM pulse length in milliseconds, as
     * a floating point number
     *
     * On failure, throws an exception or returns YPwmInput.PULSEDURATION_INVALID.
     */
    async get_pulseDuration()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PULSEDURATION_INVALID;
            }
        }
        res = this._pulseDuration;
        return res;
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return {number} a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmInput.FREQUENCY_INVALID.
     */
    async get_frequency()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }

    /**
     * Returns the PWM period in milliseconds.
     *
     * @return {number} a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmInput.PERIOD_INVALID.
     */
    async get_period()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PERIOD_INVALID;
            }
        }
        res = this._period;
        return res;
    }

    /**
     * Returns the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion.
     *
     * @return {number} an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YPwmInput.PULSECOUNTER_INVALID.
     */
    async get_pulseCounter()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PULSECOUNTER_INVALID;
            }
        }
        res = this._pulseCounter;
        return res;
    }

    async set_pulseCounter(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pulseCounter',rest_val);
    }

    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return {number} an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YPwmInput.PULSETIMER_INVALID.
     */
    async get_pulseTimer()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PULSETIMER_INVALID;
            }
        }
        res = this._pulseTimer;
        return res;
    }

    /**
     * Returns the parameter (frequency/duty cycle, pulse width, edges count) returned by the
     * get_currentValue function and callbacks. Attention
     *
     * @return {number} a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE,
     * YPwmInput.PWMREPORTMODE_PWM_FREQUENCY, YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION,
     * YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT, YPwmInput.PWMREPORTMODE_PWM_PULSECOUNT,
     * YPwmInput.PWMREPORTMODE_PWM_CPS, YPwmInput.PWMREPORTMODE_PWM_CPM,
     * YPwmInput.PWMREPORTMODE_PWM_STATE, YPwmInput.PWMREPORTMODE_PWM_FREQ_CPS and
     * YPwmInput.PWMREPORTMODE_PWM_FREQ_CPM corresponding to the parameter (frequency/duty cycle, pulse
     * width, edges count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns YPwmInput.PWMREPORTMODE_INVALID.
     */
    async get_pwmReportMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PWMREPORTMODE_INVALID;
            }
        }
        res = this._pwmReportMode;
        return res;
    }

    /**
     * Changes the  parameter  type (frequency/duty cycle, pulse width, or edge count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval {number} : a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE,
     * YPwmInput.PWMREPORTMODE_PWM_FREQUENCY, YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION,
     * YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT, YPwmInput.PWMREPORTMODE_PWM_PULSECOUNT,
     * YPwmInput.PWMREPORTMODE_PWM_CPS, YPwmInput.PWMREPORTMODE_PWM_CPM,
     * YPwmInput.PWMREPORTMODE_PWM_STATE, YPwmInput.PWMREPORTMODE_PWM_FREQ_CPS and
     * YPwmInput.PWMREPORTMODE_PWM_FREQ_CPM corresponding to the  parameter  type (frequency/duty cycle,
     * pulse width, or edge count) returned by the get_currentValue function and callbacks
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_pwmReportMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pwmReportMode',rest_val);
    }

    /**
     * Returns the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     *
     * @return {number} an integer corresponding to the shortest expected pulse duration, in ms
     *
     * On failure, throws an exception or returns YPwmInput.DEBOUNCEPERIOD_INVALID.
     */
    async get_debouncePeriod()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.DEBOUNCEPERIOD_INVALID;
            }
        }
        res = this._debouncePeriod;
        return res;
    }

    /**
     * Changes the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     *
     * @param newval {number} : an integer corresponding to the shortest expected pulse duration, in ms
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_debouncePeriod(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('debouncePeriod',rest_val);
    }

    /**
     * Retrieves a PWM input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmInput.isOnline() to test if the PWM input is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the PWM input
     *
     * @return {YPwmInput} a YPwmInput object allowing you to drive the PWM input.
     */
    static FindPwmInput(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('PwmInput', func);
        if (obj == null) {
            obj = new YPwmInput(YAPI, func);
            YFunction._AddToCache('PwmInput',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a PWM input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmInput.isOnline() to test if the PWM input is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the PWM input
     *
     * @return {YPwmInput} a YPwmInput object allowing you to drive the PWM input.
     */
    static FindPwmInputInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'PwmInput', func);
        if (obj == null) {
            obj = new YPwmInput(yctx, func);
            YFunction._AddToCache('PwmInput',  func, obj);
        }
        return obj;
    }

    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetCounter()
    {
        return await this.set_pulseCounter(0);
    }

    /**
     * Continues the enumeration of PWM inputs started using yFirstPwmInput().
     * Caution: You can't make any assumption about the returned PWM inputs order.
     * If you want to find a specific a PWM input, use PwmInput.findPwmInput()
     * and a hardwareID or a logical name.
     *
     * @return {YPwmInput} a pointer to a YPwmInput object, corresponding to
     *         a PWM input currently online, or a null pointer
     *         if there are no more PWM inputs to enumerate.
     */
    nextPwmInput()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPwmInput.FindPwmInputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of PWM inputs currently accessible.
     * Use the method YPwmInput.nextPwmInput() to iterate on
     * next PWM inputs.
     *
     * @return {YPwmInput} a pointer to a YPwmInput object, corresponding to
     *         the first PWM input currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmInput()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('PwmInput');
        if(next_hwid == null) return null;
        return YPwmInput.FindPwmInput(next_hwid);
    }

    /**
     * Starts the enumeration of PWM inputs currently accessible.
     * Use the method YPwmInput.nextPwmInput() to iterate on
     * next PWM inputs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPwmInput} a pointer to a YPwmInput object, corresponding to
     *         the first PWM input currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmInputInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('PwmInput');
        if(next_hwid == null) return null;
        return YPwmInput.FindPwmInputInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            DUTYCYCLE_INVALID            : YAPI.INVALID_DOUBLE,
            PULSEDURATION_INVALID        : YAPI.INVALID_DOUBLE,
            FREQUENCY_INVALID            : YAPI.INVALID_DOUBLE,
            PERIOD_INVALID               : YAPI.INVALID_DOUBLE,
            PULSECOUNTER_INVALID         : YAPI.INVALID_LONG,
            PULSETIMER_INVALID           : YAPI.INVALID_LONG,
            PWMREPORTMODE_PWM_DUTYCYCLE  : 0,
            PWMREPORTMODE_PWM_FREQUENCY  : 1,
            PWMREPORTMODE_PWM_PULSEDURATION : 2,
            PWMREPORTMODE_PWM_EDGECOUNT  : 3,
            PWMREPORTMODE_PWM_PULSECOUNT : 4,
            PWMREPORTMODE_PWM_CPS        : 5,
            PWMREPORTMODE_PWM_CPM        : 6,
            PWMREPORTMODE_PWM_STATE      : 7,
            PWMREPORTMODE_PWM_FREQ_CPS   : 8,
            PWMREPORTMODE_PWM_FREQ_CPM   : 9,
            PWMREPORTMODE_INVALID        : -1,
            DEBOUNCEPERIOD_INVALID       : YAPI.INVALID_UINT
        });
    }

    //--- (end of YPwmInput implementation)
}

//
// YPwmInputProxy Class: synchronous proxy to YPwmInput objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPwmInput objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YPwmInputProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YPwmInput accessors declaration)

    /**
     * Changes the measuring unit for the measured quantity. That unit
     * is just a string which is automatically initialized each time
     * the measurement mode is changed. But is can be set to an
     * arbitrary value.
     *
     * @param newval : a string corresponding to the measuring unit for the measured quantity
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
     * Returns the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     */
    get_pulseCounter()
    {
        return this.liveFunc._pulseCounter;
    }

    set_pulseCounter(newval)
    {
        this.liveFunc.set_pulseCounter(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    get_pulseTimer()
    {
        return this.liveFunc._pulseTimer;
    }

    /**
     * Returns the parameter (frequency/duty cycle, pulse width, edges count) returned by the
     * get_currentValue function and callbacks. Attention
     *
     * @return a value among Y_PWMREPORTMODE_PWM_DUTYCYCLE, Y_PWMREPORTMODE_PWM_FREQUENCY,
     * Y_PWMREPORTMODE_PWM_PULSEDURATION, Y_PWMREPORTMODE_PWM_EDGECOUNT, Y_PWMREPORTMODE_PWM_PULSECOUNT,
     * Y_PWMREPORTMODE_PWM_CPS, Y_PWMREPORTMODE_PWM_CPM, Y_PWMREPORTMODE_PWM_STATE,
     * Y_PWMREPORTMODE_PWM_FREQ_CPS and Y_PWMREPORTMODE_PWM_FREQ_CPM corresponding to the parameter
     * (frequency/duty cycle, pulse width, edges count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns Y_PWMREPORTMODE_INVALID.
     */
    get_pwmReportMode()
    {
        return this.liveFunc._pwmReportMode;
    }

    /**
     * Changes the  parameter  type (frequency/duty cycle, pulse width, or edge count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval : a value among Y_PWMREPORTMODE_PWM_DUTYCYCLE, Y_PWMREPORTMODE_PWM_FREQUENCY,
     * Y_PWMREPORTMODE_PWM_PULSEDURATION, Y_PWMREPORTMODE_PWM_EDGECOUNT, Y_PWMREPORTMODE_PWM_PULSECOUNT,
     * Y_PWMREPORTMODE_PWM_CPS, Y_PWMREPORTMODE_PWM_CPM, Y_PWMREPORTMODE_PWM_STATE,
     * Y_PWMREPORTMODE_PWM_FREQ_CPS and Y_PWMREPORTMODE_PWM_FREQ_CPM corresponding to the  parameter  type
     * (frequency/duty cycle, pulse width, or edge count) returned by the get_currentValue function and callbacks
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pwmReportMode(newval)
    {
        this.liveFunc.set_pwmReportMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     *
     * @return an integer corresponding to the shortest expected pulse duration, in ms
     *
     * On failure, throws an exception or returns Y_DEBOUNCEPERIOD_INVALID.
     */
    get_debouncePeriod()
    {
        return this.liveFunc._debouncePeriod;
    }

    /**
     * Changes the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     *
     * @param newval : an integer corresponding to the shortest expected pulse duration, in ms
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_debouncePeriod(newval)
    {
        this.liveFunc.set_debouncePeriod(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter()
    {
        this.liveFunc.resetCounter();
        return YAPI_SUCCESS;
    }
    //--- (end of YPwmInput accessors declaration)
}

//--- (YPwmInput functions)

YoctoLibExport('YPwmInput', YPwmInput);
YoctoLibExport('YPwmInputProxy', YPwmInputProxy);
YPwmInput.imm_Init();

//--- (end of YPwmInput functions)
