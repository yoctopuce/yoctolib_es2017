/*********************************************************************
 *
 *  $Id: yocto_poweroutput.js 43580 2021-01-26 17:46:01Z mvuilleu $
 *
 *  Implements the high-level API for PowerOutput functions
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

//--- (YPowerOutput return codes)
//--- (end of YPowerOutput return codes)
//--- (YPowerOutput definitions)
//--- (end of YPowerOutput definitions)

//--- (YPowerOutput class start)
/**
 * YPowerOutput Class: power output control interface, available for instance in the Yocto-I2C, the
 * Yocto-MaxiMicroVolt-Rx, the Yocto-SPI or the Yocto-Serial
 *
 * The YPowerOutput class allows you to control
 * the power output featured on some Yoctopuce devices.
 */
//--- (end of YPowerOutput class start)

class YPowerOutput extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YPowerOutput constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'PowerOutput';
        /** @member {number} **/
        this._voltage                    = YPowerOutput.VOLTAGE_INVALID;
        //--- (end of YPowerOutput constructor)
    }

    //--- (YPowerOutput implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'voltage':
            this._voltage = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the voltage on the power output featured by the module.
     *
     * @return {Promise<number>} a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3,
     * YPowerOutput.VOLTAGE_OUT5V, YPowerOutput.VOLTAGE_OUT4V7 and YPowerOutput.VOLTAGE_OUT1V8
     * corresponding to the voltage on the power output featured by the module
     *
     * On failure, throws an exception or returns YPowerOutput.VOLTAGE_INVALID.
     */
    async get_voltage()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerOutput.VOLTAGE_INVALID;
            }
        }
        res = this._voltage;
        return res;
    }

    /**
     * Changes the voltage on the power output provided by the
     * module. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3,
     * YPowerOutput.VOLTAGE_OUT5V, YPowerOutput.VOLTAGE_OUT4V7 and YPowerOutput.VOLTAGE_OUT1V8
     * corresponding to the voltage on the power output provided by the
     *         module
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltage(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('voltage',rest_val);
    }

    /**
     * Retrieves a power output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerOutput.isOnline() to test if the power output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a power output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the power output, for instance
     *         YI2CMK01.powerOutput.
     *
     * @return {YPowerOutput} a YPowerOutput object allowing you to drive the power output.
     */
    static FindPowerOutput(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('PowerOutput', func);
        if (obj == null) {
            obj = new YPowerOutput(YAPI, func);
            YFunction._AddToCache('PowerOutput',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a power output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerOutput.isOnline() to test if the power output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a power output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the power output, for instance
     *         YI2CMK01.powerOutput.
     *
     * @return {YPowerOutput} a YPowerOutput object allowing you to drive the power output.
     */
    static FindPowerOutputInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'PowerOutput', func);
        if (obj == null) {
            obj = new YPowerOutput(yctx, func);
            YFunction._AddToCache('PowerOutput',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of power output started using yFirstPowerOutput().
     * Caution: You can't make any assumption about the returned power output order.
     * If you want to find a specific a power output, use PowerOutput.findPowerOutput()
     * and a hardwareID or a logical name.
     *
     * @return {YPowerOutput | null} a pointer to a YPowerOutput object, corresponding to
     *         a power output currently online, or a null pointer
     *         if there are no more power output to enumerate.
     */
    nextPowerOutput()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPowerOutput.FindPowerOutputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of power output currently accessible.
     * Use the method YPowerOutput.nextPowerOutput() to iterate on
     * next power output.
     *
     * @return {YPowerOutput | null} a pointer to a YPowerOutput object, corresponding to
     *         the first power output currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerOutput()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('PowerOutput');
        if(next_hwid == null) return null;
        return YPowerOutput.FindPowerOutput(next_hwid);
    }

    /**
     * Starts the enumeration of power output currently accessible.
     * Use the method YPowerOutput.nextPowerOutput() to iterate on
     * next power output.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPowerOutput | null} a pointer to a YPowerOutput object, corresponding to
     *         the first power output currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerOutputInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('PowerOutput');
        if(next_hwid == null) return null;
        return YPowerOutput.FindPowerOutputInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            VOLTAGE_OFF                  : 0,
            VOLTAGE_OUT3V3               : 1,
            VOLTAGE_OUT5V                : 2,
            VOLTAGE_OUT4V7               : 3,
            VOLTAGE_OUT1V8               : 4,
            VOLTAGE_INVALID              : -1
        });
    }

    //--- (end of YPowerOutput implementation)
}

//
// YPowerOutputProxy Class: synchronous proxy to YPowerOutput objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPowerOutput objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YPowerOutputProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YPowerOutput accessors declaration)

    /**
     * Returns the voltage on the power output featured by the module.
     *
     * @return a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3,
     * YPowerOutput.VOLTAGE_OUT5V, YPowerOutput.VOLTAGE_OUT4V7 and YPowerOutput.VOLTAGE_OUT1V8
     * corresponding to the voltage on the power output featured by the module
     *
     * On failure, throws an exception or returns YPowerOutput.VOLTAGE_INVALID.
     */
    get_voltage()
    {
        return this.liveFunc._voltage;
    }

    /**
     * Changes the voltage on the power output provided by the
     * module. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3,
     * YPowerOutput.VOLTAGE_OUT5V, YPowerOutput.VOLTAGE_OUT4V7 and YPowerOutput.VOLTAGE_OUT1V8
     * corresponding to the voltage on the power output provided by the
     *         module
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltage(newval)
    {
        this.liveFunc.set_voltage(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YPowerOutput accessors declaration)
}

//--- (YPowerOutput functions)

YoctoLibExport('YPowerOutput', YPowerOutput);
YoctoLibExport('YPowerOutputProxy', YPowerOutputProxy);
YPowerOutput.imm_Init();

//--- (end of YPowerOutput functions)
