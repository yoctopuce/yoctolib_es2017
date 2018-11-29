/*********************************************************************
 *
 *  $Id: yocto_wakeupmonitor.js 32902 2018-11-02 10:13:53Z seb $
 *
 *  Implements the high-level API for WakeUpMonitor functions
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

//--- (YWakeUpMonitor return codes)
//--- (end of YWakeUpMonitor return codes)
//--- (YWakeUpMonitor definitions)
//--- (end of YWakeUpMonitor definitions)

//--- (YWakeUpMonitor class start)
/**
 * YWakeUpMonitor Class: WakeUpMonitor function interface
 *
 * The WakeUpMonitor function handles globally all wake-up sources, as well
 * as automated sleep mode.
 */
//--- (end of YWakeUpMonitor class start)

class YWakeUpMonitor extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YWakeUpMonitor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'WakeUpMonitor';
        /** @member {number} **/
        this._powerDuration              = YWakeUpMonitor.POWERDURATION_INVALID;
        /** @member {number} **/
        this._sleepCountdown             = YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID;
        /** @member {number} **/
        this._nextWakeUp                 = YWakeUpMonitor.NEXTWAKEUP_INVALID;
        /** @member {number} **/
        this._wakeUpReason               = YWakeUpMonitor.WAKEUPREASON_INVALID;
        /** @member {number} **/
        this._wakeUpState                = YWakeUpMonitor.WAKEUPSTATE_INVALID;
        /** @member {number} **/
        this._rtcTime                    = YWakeUpMonitor.RTCTIME_INVALID;
        /** @member {number} **/
        this._endOfTime                  = 2145960000;
        //--- (end of YWakeUpMonitor constructor)
    }

    //--- (YWakeUpMonitor implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'powerDuration':
            this._powerDuration = parseInt(val);
            return 1;
        case 'sleepCountdown':
            this._sleepCountdown = parseInt(val);
            return 1;
        case 'nextWakeUp':
            this._nextWakeUp = parseInt(val);
            return 1;
        case 'wakeUpReason':
            this._wakeUpReason = parseInt(val);
            return 1;
        case 'wakeUpState':
            this._wakeUpState = parseInt(val);
            return 1;
        case 'rtcTime':
            this._rtcTime = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the maximal wake up time (in seconds) before automatically going to sleep.
     *
     * @return {number} an integer corresponding to the maximal wake up time (in seconds) before
     * automatically going to sleep
     *
     * On failure, throws an exception or returns YWakeUpMonitor.POWERDURATION_INVALID.
     */
    async get_powerDuration()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.POWERDURATION_INVALID;
            }
        }
        res = this._powerDuration;
        return res;
    }

    /**
     * Changes the maximal wake up time (seconds) before automatically going to sleep.
     *
     * @param newval {number} : an integer corresponding to the maximal wake up time (seconds) before
     * automatically going to sleep
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_powerDuration(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('powerDuration',rest_val);
    }

    /**
     * Returns the delay before the  next sleep period.
     *
     * @return {number} an integer corresponding to the delay before the  next sleep period
     *
     * On failure, throws an exception or returns YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID.
     */
    async get_sleepCountdown()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID;
            }
        }
        res = this._sleepCountdown;
        return res;
    }

    /**
     * Changes the delay before the next sleep period.
     *
     * @param newval {number} : an integer corresponding to the delay before the next sleep period
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_sleepCountdown(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('sleepCountdown',rest_val);
    }

    /**
     * Returns the next scheduled wake up date/time (UNIX format).
     *
     * @return {number} an integer corresponding to the next scheduled wake up date/time (UNIX format)
     *
     * On failure, throws an exception or returns YWakeUpMonitor.NEXTWAKEUP_INVALID.
     */
    async get_nextWakeUp()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.NEXTWAKEUP_INVALID;
            }
        }
        res = this._nextWakeUp;
        return res;
    }

    /**
     * Changes the days of the week when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the days of the week when a wake up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_nextWakeUp(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('nextWakeUp',rest_val);
    }

    /**
     * Returns the latest wake up reason.
     *
     * @return {number} a value among YWakeUpMonitor.WAKEUPREASON_USBPOWER,
     * YWakeUpMonitor.WAKEUPREASON_EXTPOWER, YWakeUpMonitor.WAKEUPREASON_ENDOFSLEEP,
     * YWakeUpMonitor.WAKEUPREASON_EXTSIG1, YWakeUpMonitor.WAKEUPREASON_SCHEDULE1 and
     * YWakeUpMonitor.WAKEUPREASON_SCHEDULE2 corresponding to the latest wake up reason
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPREASON_INVALID.
     */
    async get_wakeUpReason()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.WAKEUPREASON_INVALID;
            }
        }
        res = this._wakeUpReason;
        return res;
    }

    /**
     * Returns  the current state of the monitor.
     *
     * @return {number} either YWakeUpMonitor.WAKEUPSTATE_SLEEPING or YWakeUpMonitor.WAKEUPSTATE_AWAKE,
     * according to  the current state of the monitor
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPSTATE_INVALID.
     */
    async get_wakeUpState()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.WAKEUPSTATE_INVALID;
            }
        }
        res = this._wakeUpState;
        return res;
    }

    async set_wakeUpState(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('wakeUpState',rest_val);
    }

    async get_rtcTime()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.RTCTIME_INVALID;
            }
        }
        res = this._rtcTime;
        return res;
    }

    /**
     * Retrieves a monitor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the monitor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpMonitor.isOnline() to test if the monitor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a monitor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the monitor
     *
     * @return {YWakeUpMonitor} a YWakeUpMonitor object allowing you to drive the monitor.
     */
    static FindWakeUpMonitor(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('WakeUpMonitor', func);
        if (obj == null) {
            obj = new YWakeUpMonitor(YAPI, func);
            YFunction._AddToCache('WakeUpMonitor',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a monitor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the monitor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpMonitor.isOnline() to test if the monitor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a monitor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the monitor
     *
     * @return {YWakeUpMonitor} a YWakeUpMonitor object allowing you to drive the monitor.
     */
    static FindWakeUpMonitorInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'WakeUpMonitor', func);
        if (obj == null) {
            obj = new YWakeUpMonitor(yctx, func);
            YFunction._AddToCache('WakeUpMonitor',  func, obj);
        }
        return obj;
    }

    /**
     * Forces a wake up.
     */
    async wakeUp()
    {
        return await this.set_wakeUpState(YWakeUpMonitor.WAKEUPSTATE_AWAKE);
    }

    /**
     * Goes to sleep until the next wake up condition is met,  the
     * RTC time must have been set before calling this function.
     *
     * @param secBeforeSleep {number} : number of seconds before going into sleep mode,
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async sleep(secBeforeSleep)
    {
        /** @type {number} **/
        let currTime;
        currTime = await this.get_rtcTime();
        if (!(currTime != 0)) {
            return this._throw(this._yapi.RTC_NOT_READY,'RTC time not set',this._yapi.RTC_NOT_READY);
        }
        await this.set_nextWakeUp(this._endOfTime);
        await this.set_sleepCountdown(secBeforeSleep);
        return this._yapi.SUCCESS;
    }

    /**
     * Goes to sleep for a specific duration or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param secUntilWakeUp {number} : number of seconds before next wake up
     * @param secBeforeSleep {number} : number of seconds before going into sleep mode
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async sleepFor(secUntilWakeUp,secBeforeSleep)
    {
        /** @type {number} **/
        let currTime;
        currTime = await this.get_rtcTime();
        if (!(currTime != 0)) {
            return this._throw(this._yapi.RTC_NOT_READY,'RTC time not set',this._yapi.RTC_NOT_READY);
        }
        await this.set_nextWakeUp(currTime+secUntilWakeUp);
        await this.set_sleepCountdown(secBeforeSleep);
        return this._yapi.SUCCESS;
    }

    /**
     * Go to sleep until a specific date is reached or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param wakeUpTime {number} : wake-up datetime (UNIX format)
     * @param secBeforeSleep {number} : number of seconds before going into sleep mode
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async sleepUntil(wakeUpTime,secBeforeSleep)
    {
        /** @type {number} **/
        let currTime;
        currTime = await this.get_rtcTime();
        if (!(currTime != 0)) {
            return this._throw(this._yapi.RTC_NOT_READY,'RTC time not set',this._yapi.RTC_NOT_READY);
        }
        await this.set_nextWakeUp(wakeUpTime);
        await this.set_sleepCountdown(secBeforeSleep);
        return this._yapi.SUCCESS;
    }

    /**
     * Resets the sleep countdown.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async resetSleepCountDown()
    {
        await this.set_sleepCountdown(0);
        await this.set_nextWakeUp(0);
        return this._yapi.SUCCESS;
    }

    /**
     * Continues the enumeration of monitors started using yFirstWakeUpMonitor().
     * Caution: You can't make any assumption about the returned monitors order.
     * If you want to find a specific a monitor, use WakeUpMonitor.findWakeUpMonitor()
     * and a hardwareID or a logical name.
     *
     * @return {YWakeUpMonitor} a pointer to a YWakeUpMonitor object, corresponding to
     *         a monitor currently online, or a null pointer
     *         if there are no more monitors to enumerate.
     */
    nextWakeUpMonitor()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of monitors currently accessible.
     * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
     * next monitors.
     *
     * @return {YWakeUpMonitor} a pointer to a YWakeUpMonitor object, corresponding to
     *         the first monitor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpMonitor()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('WakeUpMonitor');
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitor(next_hwid);
    }

    /**
     * Starts the enumeration of monitors currently accessible.
     * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
     * next monitors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YWakeUpMonitor} a pointer to a YWakeUpMonitor object, corresponding to
     *         the first monitor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpMonitorInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('WakeUpMonitor');
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitorInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            POWERDURATION_INVALID        : YAPI.INVALID_INT,
            SLEEPCOUNTDOWN_INVALID       : YAPI.INVALID_INT,
            NEXTWAKEUP_INVALID           : YAPI.INVALID_LONG,
            WAKEUPREASON_USBPOWER        : 0,
            WAKEUPREASON_EXTPOWER        : 1,
            WAKEUPREASON_ENDOFSLEEP      : 2,
            WAKEUPREASON_EXTSIG1         : 3,
            WAKEUPREASON_SCHEDULE1       : 4,
            WAKEUPREASON_SCHEDULE2       : 5,
            WAKEUPREASON_INVALID         : -1,
            WAKEUPSTATE_SLEEPING         : 0,
            WAKEUPSTATE_AWAKE            : 1,
            WAKEUPSTATE_INVALID          : -1,
            RTCTIME_INVALID              : YAPI.INVALID_LONG
        });
    }

    //--- (end of YWakeUpMonitor implementation)
}

//
// YWakeUpMonitorProxy Class: synchronous proxy to YWakeUpMonitor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YWakeUpMonitor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YWakeUpMonitorProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YWakeUpMonitor accessors declaration)

    /**
     * Returns the maximal wake up time (in seconds) before automatically going to sleep.
     *
     * @return an integer corresponding to the maximal wake up time (in seconds) before automatically going to sleep
     *
     * On failure, throws an exception or returns Y_POWERDURATION_INVALID.
     */
    get_powerDuration()
    {
        return this.liveFunc._powerDuration;
    }

    /**
     * Changes the maximal wake up time (seconds) before automatically going to sleep.
     *
     * @param newval : an integer corresponding to the maximal wake up time (seconds) before automatically
     * going to sleep
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerDuration(newval)
    {
        this.liveFunc.set_powerDuration(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the delay before the  next sleep period.
     *
     * @return an integer corresponding to the delay before the  next sleep period
     *
     * On failure, throws an exception or returns Y_SLEEPCOUNTDOWN_INVALID.
     */
    get_sleepCountdown()
    {
        return this.liveFunc._sleepCountdown;
    }

    /**
     * Changes the delay before the next sleep period.
     *
     * @param newval : an integer corresponding to the delay before the next sleep period
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sleepCountdown(newval)
    {
        this.liveFunc.set_sleepCountdown(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the next scheduled wake up date/time (UNIX format).
     *
     * @return an integer corresponding to the next scheduled wake up date/time (UNIX format)
     *
     * On failure, throws an exception or returns Y_NEXTWAKEUP_INVALID.
     */
    get_nextWakeUp()
    {
        return this.liveFunc._nextWakeUp;
    }

    /**
     * Changes the days of the week when a wake up must take place.
     *
     * @param newval : an integer corresponding to the days of the week when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nextWakeUp(newval)
    {
        this.liveFunc.set_nextWakeUp(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the latest wake up reason.
     *
     * @return a value among Y_WAKEUPREASON_USBPOWER, Y_WAKEUPREASON_EXTPOWER, Y_WAKEUPREASON_ENDOFSLEEP,
     * Y_WAKEUPREASON_EXTSIG1, Y_WAKEUPREASON_SCHEDULE1 and Y_WAKEUPREASON_SCHEDULE2 corresponding to the
     * latest wake up reason
     *
     * On failure, throws an exception or returns Y_WAKEUPREASON_INVALID.
     */
    get_wakeUpReason()
    {
        return this.liveFunc._wakeUpReason;
    }

    /**
     * Returns  the current state of the monitor.
     *
     * @return either Y_WAKEUPSTATE_SLEEPING or Y_WAKEUPSTATE_AWAKE, according to  the current state of the monitor
     *
     * On failure, throws an exception or returns Y_WAKEUPSTATE_INVALID.
     */
    get_wakeUpState()
    {
        return this.liveFunc._wakeUpState;
    }

    set_wakeUpState(newval)
    {
        this.liveFunc.set_wakeUpState(newval);
        return this._yapi.SUCCESS;
    }

    get_rtcTime()
    {
        return this.liveFunc._rtcTime;
    }

    /**
     * Forces a wake up.
     */
    wakeUp()
    {
        this.liveFunc.wakeUp();
        return YAPI_SUCCESS;
    }

    /**
     * Goes to sleep until the next wake up condition is met,  the
     * RTC time must have been set before calling this function.
     *
     * @param secBeforeSleep : number of seconds before going into sleep mode,
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sleep(secBeforeSleep)
    {
        this.liveFunc.sleep(secBeforeSleep);
        return YAPI_SUCCESS;
    }

    /**
     * Goes to sleep for a specific duration or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param secUntilWakeUp : number of seconds before next wake up
     * @param secBeforeSleep : number of seconds before going into sleep mode
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sleepFor(secUntilWakeUp,secBeforeSleep)
    {
        this.liveFunc.sleepFor(secUntilWakeUp, secBeforeSleep);
        return YAPI_SUCCESS;
    }

    /**
     * Go to sleep until a specific date is reached or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param wakeUpTime : wake-up datetime (UNIX format)
     * @param secBeforeSleep : number of seconds before going into sleep mode
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sleepUntil(wakeUpTime,secBeforeSleep)
    {
        this.liveFunc.sleepUntil(wakeUpTime, secBeforeSleep);
        return YAPI_SUCCESS;
    }

    /**
     * Resets the sleep countdown.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetSleepCountDown()
    {
        this.liveFunc.resetSleepCountDown();
        return YAPI_SUCCESS;
    }
    //--- (end of YWakeUpMonitor accessors declaration)
}

//--- (YWakeUpMonitor functions)

YoctoLibExport('YWakeUpMonitor', YWakeUpMonitor);
YoctoLibExport('YWakeUpMonitorProxy', YWakeUpMonitorProxy);
YWakeUpMonitor.imm_Init();

//--- (end of YWakeUpMonitor functions)
