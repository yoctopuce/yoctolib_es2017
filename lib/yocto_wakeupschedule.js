/*********************************************************************
 *
 *  $Id: yocto_wakeupschedule.js 33712 2018-12-14 14:19:38Z seb $
 *
 *  Implements the high-level API for WakeUpSchedule functions
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

//--- (YWakeUpSchedule return codes)
//--- (end of YWakeUpSchedule return codes)
//--- (YWakeUpSchedule definitions)
//--- (end of YWakeUpSchedule definitions)

//--- (YWakeUpSchedule class start)
/**
 * YWakeUpSchedule Class: WakeUpSchedule function interface
 *
 * The WakeUpSchedule function implements a wake up condition. The wake up time is
 * specified as a set of months and/or days and/or hours and/or minutes when the
 * wake up should happen.
 */
//--- (end of YWakeUpSchedule class start)

class YWakeUpSchedule extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YWakeUpSchedule constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'WakeUpSchedule';
        /** @member {number} **/
        this._minutesA                   = YWakeUpSchedule.MINUTESA_INVALID;
        /** @member {number} **/
        this._minutesB                   = YWakeUpSchedule.MINUTESB_INVALID;
        /** @member {number} **/
        this._hours                      = YWakeUpSchedule.HOURS_INVALID;
        /** @member {number} **/
        this._weekDays                   = YWakeUpSchedule.WEEKDAYS_INVALID;
        /** @member {number} **/
        this._monthDays                  = YWakeUpSchedule.MONTHDAYS_INVALID;
        /** @member {number} **/
        this._months                     = YWakeUpSchedule.MONTHS_INVALID;
        /** @member {number} **/
        this._nextOccurence              = YWakeUpSchedule.NEXTOCCURENCE_INVALID;
        //--- (end of YWakeUpSchedule constructor)
    }

    //--- (YWakeUpSchedule implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'minutesA':
            this._minutesA = parseInt(val);
            return 1;
        case 'minutesB':
            this._minutesB = parseInt(val);
            return 1;
        case 'hours':
            this._hours = parseInt(val);
            return 1;
        case 'weekDays':
            this._weekDays = parseInt(val);
            return 1;
        case 'monthDays':
            this._monthDays = parseInt(val);
            return 1;
        case 'months':
            this._months = parseInt(val);
            return 1;
        case 'nextOccurence':
            this._nextOccurence = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the minutes in the 00-29 interval of each hour scheduled for wake up.
     *
     * @return {number} an integer corresponding to the minutes in the 00-29 interval of each hour
     * scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESA_INVALID.
     */
    async get_minutesA()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.MINUTESA_INVALID;
            }
        }
        res = this._minutesA;
        return res;
    }

    /**
     * Changes the minutes in the 00-29 interval when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the minutes in the 00-29 interval when a wake
     * up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_minutesA(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('minutesA',rest_val);
    }

    /**
     * Returns the minutes in the 30-59 interval of each hour scheduled for wake up.
     *
     * @return {number} an integer corresponding to the minutes in the 30-59 interval of each hour
     * scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESB_INVALID.
     */
    async get_minutesB()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.MINUTESB_INVALID;
            }
        }
        res = this._minutesB;
        return res;
    }

    /**
     * Changes the minutes in the 30-59 interval when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the minutes in the 30-59 interval when a wake
     * up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_minutesB(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('minutesB',rest_val);
    }

    /**
     * Returns the hours scheduled for wake up.
     *
     * @return {number} an integer corresponding to the hours scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.HOURS_INVALID.
     */
    async get_hours()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.HOURS_INVALID;
            }
        }
        res = this._hours;
        return res;
    }

    /**
     * Changes the hours when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the hours when a wake up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_hours(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('hours',rest_val);
    }

    /**
     * Returns the days of the week scheduled for wake up.
     *
     * @return {number} an integer corresponding to the days of the week scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.WEEKDAYS_INVALID.
     */
    async get_weekDays()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.WEEKDAYS_INVALID;
            }
        }
        res = this._weekDays;
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
    async set_weekDays(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('weekDays',rest_val);
    }

    /**
     * Returns the days of the month scheduled for wake up.
     *
     * @return {number} an integer corresponding to the days of the month scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHDAYS_INVALID.
     */
    async get_monthDays()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.MONTHDAYS_INVALID;
            }
        }
        res = this._monthDays;
        return res;
    }

    /**
     * Changes the days of the month when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the days of the month when a wake up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_monthDays(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('monthDays',rest_val);
    }

    /**
     * Returns the months scheduled for wake up.
     *
     * @return {number} an integer corresponding to the months scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHS_INVALID.
     */
    async get_months()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.MONTHS_INVALID;
            }
        }
        res = this._months;
        return res;
    }

    /**
     * Changes the months when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the months when a wake up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_months(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('months',rest_val);
    }

    /**
     * Returns the date/time (seconds) of the next wake up occurrence.
     *
     * @return {number} an integer corresponding to the date/time (seconds) of the next wake up occurrence
     *
     * On failure, throws an exception or returns YWakeUpSchedule.NEXTOCCURENCE_INVALID.
     */
    async get_nextOccurence()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.NEXTOCCURENCE_INVALID;
            }
        }
        res = this._nextOccurence;
        return res;
    }

    /**
     * Retrieves a wake up schedule for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the wake up schedule is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpSchedule.isOnline() to test if the wake up schedule is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake up schedule by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the wake up schedule
     *
     * @return {YWakeUpSchedule} a YWakeUpSchedule object allowing you to drive the wake up schedule.
     */
    static FindWakeUpSchedule(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('WakeUpSchedule', func);
        if (obj == null) {
            obj = new YWakeUpSchedule(YAPI, func);
            YFunction._AddToCache('WakeUpSchedule',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a wake up schedule for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the wake up schedule is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpSchedule.isOnline() to test if the wake up schedule is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake up schedule by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the wake up schedule
     *
     * @return {YWakeUpSchedule} a YWakeUpSchedule object allowing you to drive the wake up schedule.
     */
    static FindWakeUpScheduleInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'WakeUpSchedule', func);
        if (obj == null) {
            obj = new YWakeUpSchedule(yctx, func);
            YFunction._AddToCache('WakeUpSchedule',  func, obj);
        }
        return obj;
    }

    /**
     * Returns all the minutes of each hour that are scheduled for wake up.
     */
    async get_minutes()
    {
        /** @type {number} **/
        let res;

        res = await this.get_minutesB();
        res = ((res) << (30));
        res = res + await this.get_minutesA();
        return res;
    }

    /**
     * Changes all the minutes where a wake up must take place.
     *
     * @param bitmap {number} : Minutes 00-59 of each hour scheduled for wake up.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_minutes(bitmap)
    {
        await this.set_minutesA(((bitmap) & (0x3fffffff)));
        bitmap = ((bitmap) >> (30));
        return await this.set_minutesB(((bitmap) & (0x3fffffff)));
    }

    /**
     * Continues the enumeration of wake up schedules started using yFirstWakeUpSchedule().
     * Caution: You can't make any assumption about the returned wake up schedules order.
     * If you want to find a specific a wake up schedule, use WakeUpSchedule.findWakeUpSchedule()
     * and a hardwareID or a logical name.
     *
     * @return {YWakeUpSchedule} a pointer to a YWakeUpSchedule object, corresponding to
     *         a wake up schedule currently online, or a null pointer
     *         if there are no more wake up schedules to enumerate.
     */
    nextWakeUpSchedule()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpScheduleInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of wake up schedules currently accessible.
     * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
     * next wake up schedules.
     *
     * @return {YWakeUpSchedule} a pointer to a YWakeUpSchedule object, corresponding to
     *         the first wake up schedule currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpSchedule()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('WakeUpSchedule');
        if(next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpSchedule(next_hwid);
    }

    /**
     * Starts the enumeration of wake up schedules currently accessible.
     * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
     * next wake up schedules.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YWakeUpSchedule} a pointer to a YWakeUpSchedule object, corresponding to
     *         the first wake up schedule currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpScheduleInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('WakeUpSchedule');
        if(next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpScheduleInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            MINUTESA_INVALID             : YAPI.INVALID_UINT,
            MINUTESB_INVALID             : YAPI.INVALID_UINT,
            HOURS_INVALID                : YAPI.INVALID_UINT,
            WEEKDAYS_INVALID             : YAPI.INVALID_UINT,
            MONTHDAYS_INVALID            : YAPI.INVALID_UINT,
            MONTHS_INVALID               : YAPI.INVALID_UINT,
            NEXTOCCURENCE_INVALID        : YAPI.INVALID_LONG
        });
    }

    //--- (end of YWakeUpSchedule implementation)
}

//
// YWakeUpScheduleProxy Class: synchronous proxy to YWakeUpSchedule objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YWakeUpSchedule objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YWakeUpScheduleProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YWakeUpSchedule accessors declaration)

    /**
     * Returns the minutes in the 00-29 interval of each hour scheduled for wake up.
     *
     * @return an integer corresponding to the minutes in the 00-29 interval of each hour scheduled for wake up
     *
     * On failure, throws an exception or returns Y_MINUTESA_INVALID.
     */
    get_minutesA()
    {
        return this.liveFunc._minutesA;
    }

    /**
     * Changes the minutes in the 00-29 interval when a wake up must take place.
     *
     * @param newval : an integer corresponding to the minutes in the 00-29 interval when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_minutesA(newval)
    {
        this.liveFunc.set_minutesA(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the minutes in the 30-59 interval of each hour scheduled for wake up.
     *
     * @return an integer corresponding to the minutes in the 30-59 interval of each hour scheduled for wake up
     *
     * On failure, throws an exception or returns Y_MINUTESB_INVALID.
     */
    get_minutesB()
    {
        return this.liveFunc._minutesB;
    }

    /**
     * Changes the minutes in the 30-59 interval when a wake up must take place.
     *
     * @param newval : an integer corresponding to the minutes in the 30-59 interval when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_minutesB(newval)
    {
        this.liveFunc.set_minutesB(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the hours scheduled for wake up.
     *
     * @return an integer corresponding to the hours scheduled for wake up
     *
     * On failure, throws an exception or returns Y_HOURS_INVALID.
     */
    get_hours()
    {
        return this.liveFunc._hours;
    }

    /**
     * Changes the hours when a wake up must take place.
     *
     * @param newval : an integer corresponding to the hours when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hours(newval)
    {
        this.liveFunc.set_hours(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the days of the week scheduled for wake up.
     *
     * @return an integer corresponding to the days of the week scheduled for wake up
     *
     * On failure, throws an exception or returns Y_WEEKDAYS_INVALID.
     */
    get_weekDays()
    {
        return this.liveFunc._weekDays;
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
    set_weekDays(newval)
    {
        this.liveFunc.set_weekDays(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the days of the month scheduled for wake up.
     *
     * @return an integer corresponding to the days of the month scheduled for wake up
     *
     * On failure, throws an exception or returns Y_MONTHDAYS_INVALID.
     */
    get_monthDays()
    {
        return this.liveFunc._monthDays;
    }

    /**
     * Changes the days of the month when a wake up must take place.
     *
     * @param newval : an integer corresponding to the days of the month when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_monthDays(newval)
    {
        this.liveFunc.set_monthDays(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the months scheduled for wake up.
     *
     * @return an integer corresponding to the months scheduled for wake up
     *
     * On failure, throws an exception or returns Y_MONTHS_INVALID.
     */
    get_months()
    {
        return this.liveFunc._months;
    }

    /**
     * Changes the months when a wake up must take place.
     *
     * @param newval : an integer corresponding to the months when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_months(newval)
    {
        this.liveFunc.set_months(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the date/time (seconds) of the next wake up occurrence.
     *
     * @return an integer corresponding to the date/time (seconds) of the next wake up occurrence
     *
     * On failure, throws an exception or returns Y_NEXTOCCURENCE_INVALID.
     */
    get_nextOccurence()
    {
        return this.liveFunc._nextOccurence;
    }

    /**
     * Changes all the minutes where a wake up must take place.
     *
     * @param bitmap : Minutes 00-59 of each hour scheduled for wake up.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_minutes(bitmap)
    {
        this.liveFunc.set_minutes(bitmap);
        return YAPI_SUCCESS;
    }
    //--- (end of YWakeUpSchedule accessors declaration)
}

//--- (YWakeUpSchedule functions)

YoctoLibExport('YWakeUpSchedule', YWakeUpSchedule);
YoctoLibExport('YWakeUpScheduleProxy', YWakeUpScheduleProxy);
YWakeUpSchedule.imm_Init();

//--- (end of YWakeUpSchedule functions)
