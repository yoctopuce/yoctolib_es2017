/*********************************************************************
 *
 *  $Id: yocto_pwmpowersource.js 32902 2018-11-02 10:13:53Z seb $
 *
 *  Implements the high-level API for PwmPowerSource functions
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

//--- (YPwmPowerSource return codes)
//--- (end of YPwmPowerSource return codes)
//--- (YPwmPowerSource definitions)
//--- (end of YPwmPowerSource definitions)

//--- (YPwmPowerSource class start)
/**
 * YPwmPowerSource Class: PwmPowerSource function interface
 *
 * The Yoctopuce application programming interface allows you to configure
 * the voltage source used by all PWM on the same device.
 */
//--- (end of YPwmPowerSource class start)

class YPwmPowerSource extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YPwmPowerSource constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'PwmPowerSource';
        /** @member {number} **/
        this._powerMode                  = YPwmPowerSource.POWERMODE_INVALID;
        //--- (end of YPwmPowerSource constructor)
    }

    //--- (YPwmPowerSource implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'powerMode':
            this._powerMode = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the selected power source for the PWM on the same device.
     *
     * @return {number} a value among YPwmPowerSource.POWERMODE_USB_5V, YPwmPowerSource.POWERMODE_USB_3V,
     * YPwmPowerSource.POWERMODE_EXT_V and YPwmPowerSource.POWERMODE_OPNDRN corresponding to the selected
     * power source for the PWM on the same device
     *
     * On failure, throws an exception or returns YPwmPowerSource.POWERMODE_INVALID.
     */
    async get_powerMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmPowerSource.POWERMODE_INVALID;
            }
        }
        res = this._powerMode;
        return res;
    }

    /**
     * Changes  the PWM power source. PWM can use isolated 5V from USB, isolated 3V from USB or
     * voltage from an external power source. The PWM can also work in open drain  mode. In that
     * mode, the PWM actively pulls the line down.
     * Warning: this setting is common to all PWM on the same device. If you change that parameter,
     * all PWM located on the same device are  affected.
     * If you want the change to be kept after a device reboot, make sure  to call the matching
     * module saveToFlash().
     *
     * @param newval {number} : a value among YPwmPowerSource.POWERMODE_USB_5V,
     * YPwmPowerSource.POWERMODE_USB_3V, YPwmPowerSource.POWERMODE_EXT_V and
     * YPwmPowerSource.POWERMODE_OPNDRN corresponding to  the PWM power source
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_powerMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('powerMode',rest_val);
    }

    /**
     * Retrieves a voltage source for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage source is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmPowerSource.isOnline() to test if the voltage source is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage source by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the voltage source
     *
     * @return {YPwmPowerSource} a YPwmPowerSource object allowing you to drive the voltage source.
     */
    static FindPwmPowerSource(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('PwmPowerSource', func);
        if (obj == null) {
            obj = new YPwmPowerSource(YAPI, func);
            YFunction._AddToCache('PwmPowerSource',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a voltage source for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage source is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmPowerSource.isOnline() to test if the voltage source is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage source by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the voltage source
     *
     * @return {YPwmPowerSource} a YPwmPowerSource object allowing you to drive the voltage source.
     */
    static FindPwmPowerSourceInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'PwmPowerSource', func);
        if (obj == null) {
            obj = new YPwmPowerSource(yctx, func);
            YFunction._AddToCache('PwmPowerSource',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of Voltage sources started using yFirstPwmPowerSource().
     * Caution: You can't make any assumption about the returned Voltage sources order.
     * If you want to find a specific a voltage source, use PwmPowerSource.findPwmPowerSource()
     * and a hardwareID or a logical name.
     *
     * @return {YPwmPowerSource} a pointer to a YPwmPowerSource object, corresponding to
     *         a voltage source currently online, or a null pointer
     *         if there are no more Voltage sources to enumerate.
     */
    nextPwmPowerSource()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPwmPowerSource.FindPwmPowerSourceInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of Voltage sources currently accessible.
     * Use the method YPwmPowerSource.nextPwmPowerSource() to iterate on
     * next Voltage sources.
     *
     * @return {YPwmPowerSource} a pointer to a YPwmPowerSource object, corresponding to
     *         the first source currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmPowerSource()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('PwmPowerSource');
        if(next_hwid == null) return null;
        return YPwmPowerSource.FindPwmPowerSource(next_hwid);
    }

    /**
     * Starts the enumeration of Voltage sources currently accessible.
     * Use the method YPwmPowerSource.nextPwmPowerSource() to iterate on
     * next Voltage sources.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPwmPowerSource} a pointer to a YPwmPowerSource object, corresponding to
     *         the first source currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmPowerSourceInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('PwmPowerSource');
        if(next_hwid == null) return null;
        return YPwmPowerSource.FindPwmPowerSourceInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            POWERMODE_USB_5V             : 0,
            POWERMODE_USB_3V             : 1,
            POWERMODE_EXT_V              : 2,
            POWERMODE_OPNDRN             : 3,
            POWERMODE_INVALID            : -1
        });
    }

    //--- (end of YPwmPowerSource implementation)
}

//
// YPwmPowerSourceProxy Class: synchronous proxy to YPwmPowerSource objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPwmPowerSource objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YPwmPowerSourceProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YPwmPowerSource accessors declaration)

    /**
     * Returns the selected power source for the PWM on the same device.
     *
     * @return a value among Y_POWERMODE_USB_5V, Y_POWERMODE_USB_3V, Y_POWERMODE_EXT_V and
     * Y_POWERMODE_OPNDRN corresponding to the selected power source for the PWM on the same device
     *
     * On failure, throws an exception or returns Y_POWERMODE_INVALID.
     */
    get_powerMode()
    {
        return this.liveFunc._powerMode;
    }

    /**
     * Changes  the PWM power source. PWM can use isolated 5V from USB, isolated 3V from USB or
     * voltage from an external power source. The PWM can also work in open drain  mode. In that
     * mode, the PWM actively pulls the line down.
     * Warning: this setting is common to all PWM on the same device. If you change that parameter,
     * all PWM located on the same device are  affected.
     * If you want the change to be kept after a device reboot, make sure  to call the matching
     * module saveToFlash().
     *
     * @param newval : a value among Y_POWERMODE_USB_5V, Y_POWERMODE_USB_3V, Y_POWERMODE_EXT_V and
     * Y_POWERMODE_OPNDRN corresponding to  the PWM power source
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerMode(newval)
    {
        this.liveFunc.set_powerMode(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YPwmPowerSource accessors declaration)
}

//--- (YPwmPowerSource functions)

YoctoLibExport('YPwmPowerSource', YPwmPowerSource);
YoctoLibExport('YPwmPowerSourceProxy', YPwmPowerSourceProxy);
YPwmPowerSource.imm_Init();

//--- (end of YPwmPowerSource functions)
