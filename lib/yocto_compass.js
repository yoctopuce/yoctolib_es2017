/*********************************************************************
 *
 *  $Id: yocto_compass.js 43580 2021-01-26 17:46:01Z mvuilleu $
 *
 *  Implements the high-level API for Compass functions
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

//--- (YCompass return codes)
//--- (end of YCompass return codes)
//--- (YCompass definitions)
//--- (end of YCompass definitions)

//--- (YCompass class start)
/**
 * YCompass Class: compass function control interface, available for instance in the Yocto-3D-V2
 *
 * The YCompass class allows you to read and configure Yoctopuce compass functions.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YCompass class start)

class YCompass extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YCompass constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Compass';
        /** @member {number} **/
        this._bandwidth                  = YCompass.BANDWIDTH_INVALID;
        /** @member {number} **/
        this._axis                       = YCompass.AXIS_INVALID;
        /** @member {number} **/
        this._magneticHeading            = YCompass.MAGNETICHEADING_INVALID;
        //--- (end of YCompass constructor)
    }

    //--- (YCompass implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'bandwidth':
            this._bandwidth = parseInt(val);
            return 1;
        case 'axis':
            this._axis = parseInt(val);
            return 1;
        case 'magneticHeading':
            this._magneticHeading = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return {Promise<number>} an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns YCompass.BANDWIDTH_INVALID.
     */
    async get_bandwidth()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCompass.BANDWIDTH_INVALID;
            }
        }
        res = this._bandwidth;
        return res;
    }

    /**
     * Changes the measure update frequency, measured in Hz. When the
     * frequency is lower, the device performs averaging.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the measure update frequency, measured in Hz
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
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
                return YCompass.AXIS_INVALID;
            }
        }
        res = this._axis;
        return res;
    }

    /**
     * Returns the magnetic heading, regardless of the configured bearing.
     *
     * @return {Promise<number>} a floating point number corresponding to the magnetic heading, regardless
     * of the configured bearing
     *
     * On failure, throws an exception or returns YCompass.MAGNETICHEADING_INVALID.
     */
    async get_magneticHeading()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCompass.MAGNETICHEADING_INVALID;
            }
        }
        res = this._magneticHeading;
        return res;
    }

    /**
     * Retrieves a compass function for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the compass function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCompass.isOnline() to test if the compass function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a compass function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the compass function, for instance
     *         Y3DMK002.compass.
     *
     * @return {YCompass} a YCompass object allowing you to drive the compass function.
     */
    static FindCompass(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Compass', func);
        if (obj == null) {
            obj = new YCompass(YAPI, func);
            YFunction._AddToCache('Compass',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a compass function for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the compass function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCompass.isOnline() to test if the compass function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a compass function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the compass function, for instance
     *         Y3DMK002.compass.
     *
     * @return {YCompass} a YCompass object allowing you to drive the compass function.
     */
    static FindCompassInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Compass', func);
        if (obj == null) {
            obj = new YCompass(yctx, func);
            YFunction._AddToCache('Compass',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of compass functions started using yFirstCompass().
     * Caution: You can't make any assumption about the returned compass functions order.
     * If you want to find a specific a compass function, use Compass.findCompass()
     * and a hardwareID or a logical name.
     *
     * @return {YCompass | null} a pointer to a YCompass object, corresponding to
     *         a compass function currently online, or a null pointer
     *         if there are no more compass functions to enumerate.
     */
    nextCompass()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCompass.FindCompassInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of compass functions currently accessible.
     * Use the method YCompass.nextCompass() to iterate on
     * next compass functions.
     *
     * @return {YCompass | null} a pointer to a YCompass object, corresponding to
     *         the first compass function currently online, or a null pointer
     *         if there are none.
     */
    static FirstCompass()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Compass');
        if(next_hwid == null) return null;
        return YCompass.FindCompass(next_hwid);
    }

    /**
     * Starts the enumeration of compass functions currently accessible.
     * Use the method YCompass.nextCompass() to iterate on
     * next compass functions.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YCompass | null} a pointer to a YCompass object, corresponding to
     *         the first compass function currently online, or a null pointer
     *         if there are none.
     */
    static FirstCompassInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Compass');
        if(next_hwid == null) return null;
        return YCompass.FindCompassInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            BANDWIDTH_INVALID            : YAPI.INVALID_UINT,
            AXIS_X                       : 0,
            AXIS_Y                       : 1,
            AXIS_Z                       : 2,
            AXIS_INVALID                 : -1,
            MAGNETICHEADING_INVALID      : YAPI.INVALID_DOUBLE
        });
    }

    //--- (end of YCompass implementation)
}

//
// YCompassProxy Class: synchronous proxy to YCompass objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YCompass objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YCompassProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YCompass accessors declaration)

    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns YCompass.BANDWIDTH_INVALID.
     */
    get_bandwidth()
    {
        return this.liveFunc._bandwidth;
    }

    /**
     * Changes the measure update frequency, measured in Hz. When the
     * frequency is lower, the device performs averaging.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the measure update frequency, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
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

    /**
     * Returns the magnetic heading, regardless of the configured bearing.
     *
     * @return a floating point number corresponding to the magnetic heading, regardless of the configured bearing
     *
     * On failure, throws an exception or returns YCompass.MAGNETICHEADING_INVALID.
     */
    get_magneticHeading()
    {
        return this.liveFunc._magneticHeading;
    }
    //--- (end of YCompass accessors declaration)
}

//--- (YCompass functions)

YoctoLibExport('YCompass', YCompass);
YoctoLibExport('YCompassProxy', YCompassProxy);
YCompass.imm_Init();

//--- (end of YCompass functions)
