/*********************************************************************
 *
 *  $Id: yocto_realtimeclock.js 50595 2022-07-28 07:54:15Z mvuilleu $
 *
 *  Implements the high-level API for RealTimeClock functions
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

//--- (YRealTimeClock return codes)
//--- (end of YRealTimeClock return codes)
//--- (YRealTimeClock definitions)
//--- (end of YRealTimeClock definitions)

//--- (YRealTimeClock class start)
/**
 * YRealTimeClock Class: real-time clock control interface, available for instance in the
 * YoctoHub-GSM-4G, the YoctoHub-Wireless-SR, the YoctoHub-Wireless-g or the YoctoHub-Wireless-n
 *
 * The YRealTimeClock class provide access to the embedded real-time clock available on some Yoctopuce
 * devices. It can provide current date and time, even after a power outage
 * lasting several days. It is the base for automated wake-up functions provided by the WakeUpScheduler.
 * The current time may represent a local time as well as an UTC time, but no automatic time change
 * will occur to account for daylight saving time.
 */
//--- (end of YRealTimeClock class start)

class YRealTimeClock extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YRealTimeClock constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'RealTimeClock';
        /** @member {number} **/
        this._unixTime                   = YRealTimeClock.UNIXTIME_INVALID;
        /** @member {string} **/
        this._dateTime                   = YRealTimeClock.DATETIME_INVALID;
        /** @member {number} **/
        this._utcOffset                  = YRealTimeClock.UTCOFFSET_INVALID;
        /** @member {number} **/
        this._timeSet                    = YRealTimeClock.TIMESET_INVALID;
        /** @member {number} **/
        this._disableHostSync            = YRealTimeClock.DISABLEHOSTSYNC_INVALID;
        //--- (end of YRealTimeClock constructor)
    }

    //--- (YRealTimeClock implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'unixTime':
            this._unixTime = parseInt(val);
            return 1;
        case 'dateTime':
            this._dateTime = val;
            return 1;
        case 'utcOffset':
            this._utcOffset = parseInt(val);
            return 1;
        case 'timeSet':
            this._timeSet = parseInt(val);
            return 1;
        case 'disableHostSync':
            this._disableHostSync = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current time in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @return {Promise<number>} an integer corresponding to the current time in Unix format (number of
     * elapsed seconds since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YRealTimeClock.UNIXTIME_INVALID.
     */
    async get_unixTime()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRealTimeClock.UNIXTIME_INVALID;
            }
        }
        res = this._unixTime;
        return res;
    }

    /**
     * Changes the current time. Time is specifid in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @param newval {number} : an integer corresponding to the current time
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_unixTime(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('unixTime',rest_val);
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return {Promise<string>} a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YRealTimeClock.DATETIME_INVALID.
     */
    async get_dateTime()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRealTimeClock.DATETIME_INVALID;
            }
        }
        res = this._dateTime;
        return res;
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return {Promise<number>} an integer corresponding to the number of seconds between current time
     * and UTC time (time zone)
     *
     * On failure, throws an exception or returns YRealTimeClock.UTCOFFSET_INVALID.
     */
    async get_utcOffset()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRealTimeClock.UTCOFFSET_INVALID;
            }
        }
        res = this._utcOffset;
        return res;
    }

    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the number of seconds between current time and
     * UTC time (time zone)
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_utcOffset(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('utcOffset',rest_val);
    }

    /**
     * Returns true if the clock has been set, and false otherwise.
     *
     * @return {Promise<number>} either YRealTimeClock.TIMESET_FALSE or YRealTimeClock.TIMESET_TRUE,
     * according to true if the clock has been set, and false otherwise
     *
     * On failure, throws an exception or returns YRealTimeClock.TIMESET_INVALID.
     */
    async get_timeSet()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRealTimeClock.TIMESET_INVALID;
            }
        }
        res = this._timeSet;
        return res;
    }

    /**
     * Returns true if the automatic clock synchronization with host has been disabled,
     * and false otherwise.
     *
     * @return {Promise<number>} either YRealTimeClock.DISABLEHOSTSYNC_FALSE or
     * YRealTimeClock.DISABLEHOSTSYNC_TRUE, according to true if the automatic clock synchronization with
     * host has been disabled,
     *         and false otherwise
     *
     * On failure, throws an exception or returns YRealTimeClock.DISABLEHOSTSYNC_INVALID.
     */
    async get_disableHostSync()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRealTimeClock.DISABLEHOSTSYNC_INVALID;
            }
        }
        res = this._disableHostSync;
        return res;
    }

    /**
     * Changes the automatic clock synchronization with host working state.
     * To disable automatic synchronization, set the value to true.
     * To enable automatic synchronization (default), set the value to false.
     *
     * @param newval {number} : either YRealTimeClock.DISABLEHOSTSYNC_FALSE or
     * YRealTimeClock.DISABLEHOSTSYNC_TRUE, according to the automatic clock synchronization with host working state
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_disableHostSync(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('disableHostSync',rest_val);
    }

    /**
     * Retrieves a real-time clock for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the real-time clock is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRealTimeClock.isOnline() to test if the real-time clock is
     * indeed online at a given time. In case of ambiguity when looking for
     * a real-time clock by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the real-time clock, for instance
     *         YHUBGSM5.realTimeClock.
     *
     * @return {YRealTimeClock} a YRealTimeClock object allowing you to drive the real-time clock.
     */
    static FindRealTimeClock(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('RealTimeClock', func);
        if (obj == null) {
            obj = new YRealTimeClock(YAPI, func);
            YFunction._AddToCache('RealTimeClock',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a real-time clock for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the real-time clock is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRealTimeClock.isOnline() to test if the real-time clock is
     * indeed online at a given time. In case of ambiguity when looking for
     * a real-time clock by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the real-time clock, for instance
     *         YHUBGSM5.realTimeClock.
     *
     * @return {YRealTimeClock} a YRealTimeClock object allowing you to drive the real-time clock.
     */
    static FindRealTimeClockInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'RealTimeClock', func);
        if (obj == null) {
            obj = new YRealTimeClock(yctx, func);
            YFunction._AddToCache('RealTimeClock',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of real-time clocks started using yFirstRealTimeClock().
     * Caution: You can't make any assumption about the returned real-time clocks order.
     * If you want to find a specific a real-time clock, use RealTimeClock.findRealTimeClock()
     * and a hardwareID or a logical name.
     *
     * @return {YRealTimeClock | null} a pointer to a YRealTimeClock object, corresponding to
     *         a real-time clock currently online, or a null pointer
     *         if there are no more real-time clocks to enumerate.
     */
    nextRealTimeClock()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YRealTimeClock.FindRealTimeClockInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of real-time clocks currently accessible.
     * Use the method YRealTimeClock.nextRealTimeClock() to iterate on
     * next real-time clocks.
     *
     * @return {YRealTimeClock | null} a pointer to a YRealTimeClock object, corresponding to
     *         the first real-time clock currently online, or a null pointer
     *         if there are none.
     */
    static FirstRealTimeClock()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('RealTimeClock');
        if(next_hwid == null) return null;
        return YRealTimeClock.FindRealTimeClock(next_hwid);
    }

    /**
     * Starts the enumeration of real-time clocks currently accessible.
     * Use the method YRealTimeClock.nextRealTimeClock() to iterate on
     * next real-time clocks.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YRealTimeClock | null} a pointer to a YRealTimeClock object, corresponding to
     *         the first real-time clock currently online, or a null pointer
     *         if there are none.
     */
    static FirstRealTimeClockInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('RealTimeClock');
        if(next_hwid == null) return null;
        return YRealTimeClock.FindRealTimeClockInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            UNIXTIME_INVALID             : YAPI.INVALID_LONG,
            DATETIME_INVALID             : YAPI.INVALID_STRING,
            UTCOFFSET_INVALID            : YAPI.INVALID_INT,
            TIMESET_FALSE                : 0,
            TIMESET_TRUE                 : 1,
            TIMESET_INVALID              : -1,
            DISABLEHOSTSYNC_FALSE        : 0,
            DISABLEHOSTSYNC_TRUE         : 1,
            DISABLEHOSTSYNC_INVALID      : -1
        });
    }

    //--- (end of YRealTimeClock implementation)
}

//
// YRealTimeClockProxy Class: synchronous proxy to YRealTimeClock objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YRealTimeClock objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YRealTimeClockProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YRealTimeClock accessors declaration)

    /**
     * Returns the current time in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @return an integer corresponding to the current time in Unix format (number of elapsed seconds
     * since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YRealTimeClock.UNIXTIME_INVALID.
     */
    get_unixTime()
    {
        return this.liveFunc._unixTime;
    }

    /**
     * Changes the current time. Time is specifid in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @param newval : an integer corresponding to the current time
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unixTime(newval)
    {
        this.liveFunc.set_unixTime(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YRealTimeClock.DATETIME_INVALID.
     */
    get_dateTime()
    {
        return this.liveFunc._dateTime;
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns YRealTimeClock.UTCOFFSET_INVALID.
     */
    get_utcOffset()
    {
        return this.liveFunc._utcOffset;
    }

    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_utcOffset(newval)
    {
        this.liveFunc.set_utcOffset(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns true if the clock has been set, and false otherwise.
     *
     * @return either YRealTimeClock.TIMESET_FALSE or YRealTimeClock.TIMESET_TRUE, according to true if
     * the clock has been set, and false otherwise
     *
     * On failure, throws an exception or returns YRealTimeClock.TIMESET_INVALID.
     */
    get_timeSet()
    {
        return this.liveFunc._timeSet;
    }

    /**
     * Returns true if the automatic clock synchronization with host has been disabled,
     * and false otherwise.
     *
     * @return either YRealTimeClock.DISABLEHOSTSYNC_FALSE or YRealTimeClock.DISABLEHOSTSYNC_TRUE,
     * according to true if the automatic clock synchronization with host has been disabled,
     *         and false otherwise
     *
     * On failure, throws an exception or returns YRealTimeClock.DISABLEHOSTSYNC_INVALID.
     */
    get_disableHostSync()
    {
        return this.liveFunc._disableHostSync;
    }

    /**
     * Changes the automatic clock synchronization with host working state.
     * To disable automatic synchronization, set the value to true.
     * To enable automatic synchronization (default), set the value to false.
     *
     * @param newval : either YRealTimeClock.DISABLEHOSTSYNC_FALSE or YRealTimeClock.DISABLEHOSTSYNC_TRUE,
     * according to the automatic clock synchronization with host working state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_disableHostSync(newval)
    {
        this.liveFunc.set_disableHostSync(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YRealTimeClock accessors declaration)
}

//--- (YRealTimeClock functions)

YoctoLibExport('YRealTimeClock', YRealTimeClock);
YoctoLibExport('YRealTimeClockProxy', YRealTimeClockProxy);
YRealTimeClock.imm_Init();

//--- (end of YRealTimeClock functions)
