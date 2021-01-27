/*********************************************************************
 *
 *  $Id: yocto_groundspeed.js 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for GroundSpeed functions
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

//--- (YGroundSpeed return codes)
//--- (end of YGroundSpeed return codes)
//--- (YGroundSpeed definitions)
//--- (end of YGroundSpeed definitions)

//--- (YGroundSpeed class start)
/**
 * YGroundSpeed Class: ground speed sensor control interface, available for instance in the Yocto-GPS-V2
 *
 * The YGroundSpeed class allows you to read and configure Yoctopuce ground speed sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YGroundSpeed class start)

class YGroundSpeed extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YGroundSpeed constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'GroundSpeed';
        //--- (end of YGroundSpeed constructor)
    }

    //--- (YGroundSpeed implementation)

    /**
     * Retrieves a ground speed sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the ground speed sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGroundSpeed.isOnline() to test if the ground speed sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a ground speed sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the ground speed sensor, for instance
     *         YGNSSMK2.groundSpeed.
     *
     * @return {YGroundSpeed} a YGroundSpeed object allowing you to drive the ground speed sensor.
     */
    static FindGroundSpeed(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('GroundSpeed', func);
        if (obj == null) {
            obj = new YGroundSpeed(YAPI, func);
            YFunction._AddToCache('GroundSpeed',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a ground speed sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the ground speed sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGroundSpeed.isOnline() to test if the ground speed sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a ground speed sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the ground speed sensor, for instance
     *         YGNSSMK2.groundSpeed.
     *
     * @return {YGroundSpeed} a YGroundSpeed object allowing you to drive the ground speed sensor.
     */
    static FindGroundSpeedInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'GroundSpeed', func);
        if (obj == null) {
            obj = new YGroundSpeed(yctx, func);
            YFunction._AddToCache('GroundSpeed',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of ground speed sensors started using yFirstGroundSpeed().
     * Caution: You can't make any assumption about the returned ground speed sensors order.
     * If you want to find a specific a ground speed sensor, use GroundSpeed.findGroundSpeed()
     * and a hardwareID or a logical name.
     *
     * @return {YGroundSpeed | null} a pointer to a YGroundSpeed object, corresponding to
     *         a ground speed sensor currently online, or a null pointer
     *         if there are no more ground speed sensors to enumerate.
     */
    nextGroundSpeed()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YGroundSpeed.FindGroundSpeedInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of ground speed sensors currently accessible.
     * Use the method YGroundSpeed.nextGroundSpeed() to iterate on
     * next ground speed sensors.
     *
     * @return {YGroundSpeed | null} a pointer to a YGroundSpeed object, corresponding to
     *         the first ground speed sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstGroundSpeed()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('GroundSpeed');
        if(next_hwid == null) return null;
        return YGroundSpeed.FindGroundSpeed(next_hwid);
    }

    /**
     * Starts the enumeration of ground speed sensors currently accessible.
     * Use the method YGroundSpeed.nextGroundSpeed() to iterate on
     * next ground speed sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YGroundSpeed | null} a pointer to a YGroundSpeed object, corresponding to
     *         the first ground speed sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstGroundSpeedInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('GroundSpeed');
        if(next_hwid == null) return null;
        return YGroundSpeed.FindGroundSpeedInContext(yctx, next_hwid);
    }

    //--- (end of YGroundSpeed implementation)
}

//
// YGroundSpeedProxy Class: synchronous proxy to YGroundSpeed objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YGroundSpeed objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YGroundSpeedProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YGroundSpeed accessors declaration)
    //--- (end of YGroundSpeed accessors declaration)
}

//--- (YGroundSpeed functions)

YoctoLibExport('YGroundSpeed', YGroundSpeed);
YoctoLibExport('YGroundSpeedProxy', YGroundSpeedProxy);
YGroundSpeed.imm_Init();

//--- (end of YGroundSpeed functions)
