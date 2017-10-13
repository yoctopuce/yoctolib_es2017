/*********************************************************************
 *
 * $Id: yocto_dualpower.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for DualPower functions
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

//--- (YDualPower return codes)
//--- (end of YDualPower return codes)
//--- (YDualPower definitions)
//--- (end of YDualPower definitions)

//--- (YDualPower class start)
/**
 * YDualPower Class: External power supply control interface
 *
 * Yoctopuce application programming interface allows you to control
 * the power source to use for module functions that require high current.
 * The module can also automatically disconnect the external power
 * when a voltage drop is observed on the external power source
 * (external battery running out of power).
 */
//--- (end of YDualPower class start)

class YDualPower extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YDualPower constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'DualPower';
        /** @member {number} **/
        this._powerState                 = YDualPower.POWERSTATE_INVALID;
        /** @member {number} **/
        this._powerControl               = YDualPower.POWERCONTROL_INVALID;
        /** @member {number} **/
        this._extVoltage                 = YDualPower.EXTVOLTAGE_INVALID;
        //--- (end of YDualPower constructor)
    }

    //--- (YDualPower implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'powerState':
            this._powerState = parseInt(val);
            return 1;
        case 'powerControl':
            this._powerControl = parseInt(val);
            return 1;
        case 'extVoltage':
            this._extVoltage = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current power source for module functions that require lots of current.
     *
     * @return {number} a value among YDualPower.POWERSTATE_OFF, YDualPower.POWERSTATE_FROM_USB and
     * YDualPower.POWERSTATE_FROM_EXT corresponding to the current power source for module functions that
     * require lots of current
     *
     * On failure, throws an exception or returns YDualPower.POWERSTATE_INVALID.
     */
    async get_powerState()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDualPower.POWERSTATE_INVALID;
            }
        }
        res = this._powerState;
        return res;
    }

    /**
     * Returns the selected power source for module functions that require lots of current.
     *
     * @return {number} a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     *
     * On failure, throws an exception or returns YDualPower.POWERCONTROL_INVALID.
     */
    async get_powerControl()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDualPower.POWERCONTROL_INVALID;
            }
        }
        res = this._powerControl;
        return res;
    }

    /**
     * Changes the selected power source for module functions that require lots of current.
     *
     * @param newval {number} : a value among YDualPower.POWERCONTROL_AUTO,
     * YDualPower.POWERCONTROL_FROM_USB, YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF
     * corresponding to the selected power source for module functions that require lots of current
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_powerControl(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('powerControl',rest_val);
    }

    /**
     * Returns the measured voltage on the external power source, in millivolts.
     *
     * @return {number} an integer corresponding to the measured voltage on the external power source, in millivolts
     *
     * On failure, throws an exception or returns YDualPower.EXTVOLTAGE_INVALID.
     */
    async get_extVoltage()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDualPower.EXTVOLTAGE_INVALID;
            }
        }
        res = this._extVoltage;
        return res;
    }

    /**
     * Retrieves a dual power control for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the power control is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the power control
     *
     * @return {YDualPower} a YDualPower object allowing you to drive the power control.
     */
    static FindDualPower(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('DualPower', func);
        if (obj == null) {
            obj = new YDualPower(YAPI, func);
            YFunction._AddToCache('DualPower',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a dual power control for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the power control is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the power control
     *
     * @return {YDualPower} a YDualPower object allowing you to drive the power control.
     */
    static FindDualPowerInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'DualPower', func);
        if (obj == null) {
            obj = new YDualPower(yctx, func);
            YFunction._AddToCache('DualPower',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of dual power controls started using yFirstDualPower().
     *
     * @return {YDualPower} a pointer to a YDualPower object, corresponding to
     *         a dual power control currently online, or a null pointer
     *         if there are no more dual power controls to enumerate.
     */
    nextDualPower()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YDualPower.FindDualPowerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of dual power controls currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power controls.
     *
     * @return {YDualPower} a pointer to a YDualPower object, corresponding to
     *         the first dual power control currently online, or a null pointer
     *         if there are none.
     */
    static FirstDualPower()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('DualPower');
        if(next_hwid == null) return null;
        return YDualPower.FindDualPower(next_hwid);
    }

    /**
     * Starts the enumeration of dual power controls currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power controls.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YDualPower} a pointer to a YDualPower object, corresponding to
     *         the first dual power control currently online, or a null pointer
     *         if there are none.
     */
    static FirstDualPowerInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('DualPower');
        if(next_hwid == null) return null;
        return YDualPower.FindDualPowerInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            POWERSTATE_OFF               : 0,
            POWERSTATE_FROM_USB          : 1,
            POWERSTATE_FROM_EXT          : 2,
            POWERSTATE_INVALID           : -1,
            POWERCONTROL_AUTO            : 0,
            POWERCONTROL_FROM_USB        : 1,
            POWERCONTROL_FROM_EXT        : 2,
            POWERCONTROL_OFF             : 3,
            POWERCONTROL_INVALID         : -1,
            EXTVOLTAGE_INVALID           : YAPI.INVALID_UINT
        });
    }

    //--- (end of YDualPower implementation)
}

//
// YDualPowerProxy Class: synchronous proxy to YDualPower objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YDualPower objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YDualPowerProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YDualPower accessors declaration)

    /**
     * Returns the current power source for module functions that require lots of current.
     *
     * @return a value among Y_POWERSTATE_OFF, Y_POWERSTATE_FROM_USB and Y_POWERSTATE_FROM_EXT
     * corresponding to the current power source for module functions that require lots of current
     *
     * On failure, throws an exception or returns Y_POWERSTATE_INVALID.
     */
    get_powerState()
    {
        return this.liveFunc._powerState;
    }

    /**
     * Returns the selected power source for module functions that require lots of current.
     *
     * @return a value among Y_POWERCONTROL_AUTO, Y_POWERCONTROL_FROM_USB, Y_POWERCONTROL_FROM_EXT and
     * Y_POWERCONTROL_OFF corresponding to the selected power source for module functions that require lots of current
     *
     * On failure, throws an exception or returns Y_POWERCONTROL_INVALID.
     */
    get_powerControl()
    {
        return this.liveFunc._powerControl;
    }

    /**
     * Changes the selected power source for module functions that require lots of current.
     *
     * @param newval : a value among Y_POWERCONTROL_AUTO, Y_POWERCONTROL_FROM_USB, Y_POWERCONTROL_FROM_EXT
     * and Y_POWERCONTROL_OFF corresponding to the selected power source for module functions that require
     * lots of current
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerControl(newval)
    {
        this.liveFunc.set_powerControl(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the measured voltage on the external power source, in millivolts.
     *
     * @return an integer corresponding to the measured voltage on the external power source, in millivolts
     *
     * On failure, throws an exception or returns Y_EXTVOLTAGE_INVALID.
     */
    get_extVoltage()
    {
        return this.liveFunc._extVoltage;
    }
    //--- (end of YDualPower accessors declaration)
}

//--- (YDualPower functions)

YoctoLibExport('YDualPower', YDualPower);
YoctoLibExport('YDualPowerProxy', YDualPowerProxy);
YDualPower.imm_Init();

//--- (end of YDualPower functions)
