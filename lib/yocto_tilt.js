/*********************************************************************
 *
 *  $Id: yocto_tilt.js 32902 2018-11-02 10:13:53Z seb $
 *
 *  Implements the high-level API for Tilt functions
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

//--- (YTilt return codes)
//--- (end of YTilt return codes)
//--- (YTilt definitions)
//--- (end of YTilt definitions)

//--- (YTilt class start)
/**
 * YTilt Class: Tilt function interface
 *
 * The YSensor class is the parent class for all Yoctopuce sensors. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provide a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
//--- (end of YTilt class start)

class YTilt extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YTilt constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Tilt';
        /** @member {number} **/
        this._bandwidth                  = YTilt.BANDWIDTH_INVALID;
        /** @member {number} **/
        this._axis                       = YTilt.AXIS_INVALID;
        //--- (end of YTilt constructor)
    }

    //--- (YTilt implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'bandwidth':
            this._bandwidth = parseInt(val);
            return 1;
        case 'axis':
            this._axis = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the measure update frequency, measured in Hz (Yocto-3D-V2 only).
     *
     * @return {number} an integer corresponding to the measure update frequency, measured in Hz (Yocto-3D-V2 only)
     *
     * On failure, throws an exception or returns YTilt.BANDWIDTH_INVALID.
     */
    async get_bandwidth()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTilt.BANDWIDTH_INVALID;
            }
        }
        res = this._bandwidth;
        return res;
    }

    /**
     * Changes the measure update frequency, measured in Hz (Yocto-3D-V2 only). When the
     * frequency is lower, the device performs averaging.
     *
     * @param newval {number} : an integer corresponding to the measure update frequency, measured in Hz
     * (Yocto-3D-V2 only)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bandwidth(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('bandwidth',rest_val);
    }

    async get_axis()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTilt.AXIS_INVALID;
            }
        }
        res = this._axis;
        return res;
    }

    /**
     * Retrieves a tilt sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the tilt sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTilt.isOnline() to test if the tilt sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a tilt sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the tilt sensor
     *
     * @return {YTilt} a YTilt object allowing you to drive the tilt sensor.
     */
    static FindTilt(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Tilt', func);
        if (obj == null) {
            obj = new YTilt(YAPI, func);
            YFunction._AddToCache('Tilt',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a tilt sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the tilt sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTilt.isOnline() to test if the tilt sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a tilt sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the tilt sensor
     *
     * @return {YTilt} a YTilt object allowing you to drive the tilt sensor.
     */
    static FindTiltInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Tilt', func);
        if (obj == null) {
            obj = new YTilt(yctx, func);
            YFunction._AddToCache('Tilt',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of tilt sensors started using yFirstTilt().
     * Caution: You can't make any assumption about the returned tilt sensors order.
     * If you want to find a specific a tilt sensor, use Tilt.findTilt()
     * and a hardwareID or a logical name.
     *
     * @return {YTilt} a pointer to a YTilt object, corresponding to
     *         a tilt sensor currently online, or a null pointer
     *         if there are no more tilt sensors to enumerate.
     */
    nextTilt()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YTilt.FindTiltInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of tilt sensors currently accessible.
     * Use the method YTilt.nextTilt() to iterate on
     * next tilt sensors.
     *
     * @return {YTilt} a pointer to a YTilt object, corresponding to
     *         the first tilt sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTilt()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Tilt');
        if(next_hwid == null) return null;
        return YTilt.FindTilt(next_hwid);
    }

    /**
     * Starts the enumeration of tilt sensors currently accessible.
     * Use the method YTilt.nextTilt() to iterate on
     * next tilt sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YTilt} a pointer to a YTilt object, corresponding to
     *         the first tilt sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTiltInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Tilt');
        if(next_hwid == null) return null;
        return YTilt.FindTiltInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            BANDWIDTH_INVALID            : YAPI.INVALID_INT,
            AXIS_X                       : 0,
            AXIS_Y                       : 1,
            AXIS_Z                       : 2,
            AXIS_INVALID                 : -1
        });
    }

    //--- (end of YTilt implementation)
}

//
// YTiltProxy Class: synchronous proxy to YTilt objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YTilt objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YTiltProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YTilt accessors declaration)

    /**
     * Returns the measure update frequency, measured in Hz (Yocto-3D-V2 only).
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz (Yocto-3D-V2 only)
     *
     * On failure, throws an exception or returns Y_BANDWIDTH_INVALID.
     */
    get_bandwidth()
    {
        return this.liveFunc._bandwidth;
    }

    /**
     * Changes the measure update frequency, measured in Hz (Yocto-3D-V2 only). When the
     * frequency is lower, the device performs averaging.
     *
     * @param newval : an integer corresponding to the measure update frequency, measured in Hz (Yocto-3D-V2 only)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bandwidth(newval)
    {
        this.liveFunc.set_bandwidth(newval);
        return this._yapi.SUCCESS;
    }

    get_axis()
    {
        return this.liveFunc._axis;
    }
    //--- (end of YTilt accessors declaration)
}

//--- (YTilt functions)

YoctoLibExport('YTilt', YTilt);
YoctoLibExport('YTiltProxy', YTiltProxy);
YTilt.imm_Init();

//--- (end of YTilt functions)
