/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for AngularSpeed functions
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

//--- (YAngularSpeed return codes)
//--- (end of YAngularSpeed return codes)
//--- (YAngularSpeed definitions)
//--- (end of YAngularSpeed definitions)

//--- (YAngularSpeed class start)
/**
 * YAngularSpeed Class: tachometer control interface
 *
 * The YAngularSpeed class allows you to read and configure Yoctopuce tachometers.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YAngularSpeed class start)

class YAngularSpeed extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YAngularSpeed constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'AngularSpeed';
        //--- (end of YAngularSpeed constructor)
    }

    //--- (YAngularSpeed implementation)

    /**
     * Retrieves a tachometer for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the rtachometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAngularSpeed.isOnline() to test if the rtachometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a tachometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the rtachometer, for instance
     *         MyDevice.angularSpeed.
     *
     * @return {YAngularSpeed} a YAngularSpeed object allowing you to drive the rtachometer.
     */
    static FindAngularSpeed(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('AngularSpeed', func);
        if (obj == null) {
            obj = new YAngularSpeed(YAPI, func);
            YFunction._AddToCache('AngularSpeed', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a tachometer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the rtachometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAngularSpeed.isOnline() to test if the rtachometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a tachometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the rtachometer, for instance
     *         MyDevice.angularSpeed.
     *
     * @return {YAngularSpeed} a YAngularSpeed object allowing you to drive the rtachometer.
     */
    static FindAngularSpeedInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'AngularSpeed', func);
        if (obj == null) {
            obj = new YAngularSpeed(yctx, func);
            YFunction._AddToCache('AngularSpeed', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of tachometers started using yFirstAngularSpeed().
     * Caution: You can't make any assumption about the returned tachometers order.
     * If you want to find a specific a tachometer, use AngularSpeed.findAngularSpeed()
     * and a hardwareID or a logical name.
     *
     * @return {YAngularSpeed | null} a pointer to a YAngularSpeed object, corresponding to
     *         a tachometer currently online, or a null pointer
     *         if there are no more tachometers to enumerate.
     */
    nextAngularSpeed()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAngularSpeed.FindAngularSpeedInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of tachometers currently accessible.
     * Use the method YAngularSpeed.nextAngularSpeed() to iterate on
     * next tachometers.
     *
     * @return {YAngularSpeed | null} a pointer to a YAngularSpeed object, corresponding to
     *         the first tachometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstAngularSpeed()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('AngularSpeed');
        if(next_hwid == null) return null;
        return YAngularSpeed.FindAngularSpeed(next_hwid);
    }

    /**
     * Starts the enumeration of tachometers currently accessible.
     * Use the method YAngularSpeed.nextAngularSpeed() to iterate on
     * next tachometers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YAngularSpeed | null} a pointer to a YAngularSpeed object, corresponding to
     *         the first tachometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstAngularSpeedInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('AngularSpeed');
        if(next_hwid == null) return null;
        return YAngularSpeed.FindAngularSpeedInContext(yctx, next_hwid);
    }

    //--- (end of YAngularSpeed implementation)
}

//
// YAngularSpeedProxy Class: synchronous proxy to YAngularSpeed objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YAngularSpeed objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YAngularSpeedProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YAngularSpeed accessors declaration)
    //--- (end of YAngularSpeed accessors declaration)
}

//--- (YAngularSpeed functions)

YoctoLibExport('YAngularSpeed', YAngularSpeed);
YoctoLibExport('YAngularSpeedProxy', YAngularSpeedProxy);
YAngularSpeed.imm_Init();

//--- (end of YAngularSpeed functions)

