/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for VirtualSensor functions
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

//--- (YVirtualSensor return codes)
//--- (end of YVirtualSensor return codes)
//--- (YVirtualSensor definitions)
//--- (end of YVirtualSensor definitions)

//--- (YVirtualSensor class start)
/**
 * YVirtualSensor Class: virtual sensor control interface
 *
 * The YVirtualSensor class allows you to use Yoctopuce virtual sensors.
 * These sensors make it possible to show external data collected by the user
 * as a Yoctopuce Sensor. This class inherits from YSensor class the core
 * functions to read measurements, to register callback functions, and to access
 * the autonomous datalogger. It adds the ability to change the sensor value as
 * needed, or to mark current value as invalid.
 */
//--- (end of YVirtualSensor class start)

class YVirtualSensor extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YVirtualSensor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'VirtualSensor';
        /** @member {number} **/
        this._invalidValue               = YVirtualSensor.INVALIDVALUE_INVALID;
        //--- (end of YVirtualSensor constructor)
    }

    //--- (YVirtualSensor implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'invalidValue':
            this._invalidValue = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured value.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the measured value
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
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
     * Changes the current value of the sensor (raw value, before calibration).
     *
     * @param newval {number} : a floating point number corresponding to the current value of the sensor
     * (raw value, before calibration)
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentRawValue(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentRawValue',rest_val);
    }

    async set_sensorState(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('sensorState',rest_val);
    }

    /**
     * Changes the invalid value of the sensor, returned if the sensor is read when in invalid state
     * (for instance before having been set). Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : a floating point number corresponding to the invalid value of the sensor,
     * returned if the sensor is read when in invalid state
     *         (for instance before having been set)
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_invalidValue(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('invalidValue',rest_val);
    }

    /**
     * Returns the invalid value of the sensor, returned if the sensor is read when in invalid state
     * (for instance before having been set).
     *
     * @return {Promise<number>} a floating point number corresponding to the invalid value of the sensor,
     * returned if the sensor is read when in invalid state
     *         (for instance before having been set)
     *
     * On failure, throws an exception or returns YVirtualSensor.INVALIDVALUE_INVALID.
     */
    async get_invalidValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YVirtualSensor.INVALIDVALUE_INVALID;
            }
        }
        res = this._invalidValue;
        return res;
    }

    /**
     * Retrieves a virtual sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the virtual sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVirtualSensor.isOnline() to test if the virtual sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a virtual sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the virtual sensor, for instance
     *         MyDevice.virtualSensor1.
     *
     * @return {YVirtualSensor} a YVirtualSensor object allowing you to drive the virtual sensor.
     */
    static FindVirtualSensor(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('VirtualSensor', func);
        if (obj == null) {
            obj = new YVirtualSensor(YAPI, func);
            YFunction._AddToCache('VirtualSensor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a virtual sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the virtual sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVirtualSensor.isOnline() to test if the virtual sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a virtual sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the virtual sensor, for instance
     *         MyDevice.virtualSensor1.
     *
     * @return {YVirtualSensor} a YVirtualSensor object allowing you to drive the virtual sensor.
     */
    static FindVirtualSensorInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'VirtualSensor', func);
        if (obj == null) {
            obj = new YVirtualSensor(yctx, func);
            YFunction._AddToCache('VirtualSensor', func, obj);
        }
        return obj;
    }

    /**
     * Changes the current sensor state to invalid (as if no value would have been ever set).
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_sensorAsInvalid()
    {
        return await this.set_sensorState(1);
    }

    /**
     * Continues the enumeration of virtual sensors started using yFirstVirtualSensor().
     * Caution: You can't make any assumption about the returned virtual sensors order.
     * If you want to find a specific a virtual sensor, use VirtualSensor.findVirtualSensor()
     * and a hardwareID or a logical name.
     *
     * @return {YVirtualSensor | null} a pointer to a YVirtualSensor object, corresponding to
     *         a virtual sensor currently online, or a null pointer
     *         if there are no more virtual sensors to enumerate.
     */
    nextVirtualSensor()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YVirtualSensor.FindVirtualSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of virtual sensors currently accessible.
     * Use the method YVirtualSensor.nextVirtualSensor() to iterate on
     * next virtual sensors.
     *
     * @return {YVirtualSensor | null} a pointer to a YVirtualSensor object, corresponding to
     *         the first virtual sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstVirtualSensor()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('VirtualSensor');
        if(next_hwid == null) return null;
        return YVirtualSensor.FindVirtualSensor(next_hwid);
    }

    /**
     * Starts the enumeration of virtual sensors currently accessible.
     * Use the method YVirtualSensor.nextVirtualSensor() to iterate on
     * next virtual sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YVirtualSensor | null} a pointer to a YVirtualSensor object, corresponding to
     *         the first virtual sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstVirtualSensorInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('VirtualSensor');
        if(next_hwid == null) return null;
        return YVirtualSensor.FindVirtualSensorInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            INVALIDVALUE_INVALID         : YAPI.INVALID_DOUBLE
        });
    }

    //--- (end of YVirtualSensor implementation)
}

//
// YVirtualSensorProxy Class: synchronous proxy to YVirtualSensor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YVirtualSensor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YVirtualSensorProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YVirtualSensor accessors declaration)

    /**
     * Changes the measuring unit for the measured value.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the measured value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval)
    {
        this.liveFunc.set_unit(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the current value of the sensor (raw value, before calibration).
     *
     * @param newval : a floating point number corresponding to the current value of the sensor (raw
     * value, before calibration)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentRawValue(newval)
    {
        this.liveFunc.set_currentRawValue(newval);
        return this._yapi.SUCCESS;
    }

    set_sensorState(newval)
    {
        this.liveFunc.set_sensorState(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the invalid value of the sensor, returned if the sensor is read when in invalid state
     * (for instance before having been set). Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the invalid value of the sensor, returned
     * if the sensor is read when in invalid state
     *         (for instance before having been set)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_invalidValue(newval)
    {
        this.liveFunc.set_invalidValue(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the invalid value of the sensor, returned if the sensor is read when in invalid state
     * (for instance before having been set).
     *
     * @return a floating point number corresponding to the invalid value of the sensor, returned if the
     * sensor is read when in invalid state
     *         (for instance before having been set)
     *
     * On failure, throws an exception or returns YVirtualSensor.INVALIDVALUE_INVALID.
     */
    get_invalidValue()
    {
        return this.liveFunc._invalidValue;
    }

    /**
     * Changes the current sensor state to invalid (as if no value would have been ever set).
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sensorAsInvalid()
    {
        this.liveFunc.set_sensorAsInvalid();
        return YAPI_SUCCESS;
    }
    //--- (end of YVirtualSensor accessors declaration)
}

//--- (YVirtualSensor functions)

YoctoLibExport('YVirtualSensor', YVirtualSensor);
YoctoLibExport('YVirtualSensorProxy', YVirtualSensorProxy);
YVirtualSensor.imm_Init();

//--- (end of YVirtualSensor functions)

