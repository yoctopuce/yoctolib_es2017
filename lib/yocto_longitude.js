/*********************************************************************
 *
 * $Id: yocto_longitude.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for Longitude functions
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

//--- (YLongitude return codes)
//--- (end of YLongitude return codes)
//--- (YLongitude definitions)
//--- (end of YLongitude definitions)

//--- (YLongitude class start)
/**
 * YLongitude Class: Longitude function interface
 *
 * The Yoctopuce class YLongitude allows you to read the longitude from Yoctopuce
 * geolocalization sensors. It inherits from the YSensor class the core functions to
 * read measurements, register callback functions, access the autonomous
 * datalogger.
 */
//--- (end of YLongitude class start)

class YLongitude extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YLongitude constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Longitude';
        //--- (end of YLongitude constructor)
    }

    //--- (YLongitude implementation)

    /**
     * Retrieves a longitude sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the longitude sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLongitude.isOnline() to test if the longitude sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a longitude sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the longitude sensor
     *
     * @return {YLongitude} a YLongitude object allowing you to drive the longitude sensor.
     */
    static FindLongitude(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Longitude', func);
        if (obj == null) {
            obj = new YLongitude(YAPI, func);
            YFunction._AddToCache('Longitude',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a longitude sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the longitude sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLongitude.isOnline() to test if the longitude sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a longitude sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the longitude sensor
     *
     * @return {YLongitude} a YLongitude object allowing you to drive the longitude sensor.
     */
    static FindLongitudeInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Longitude', func);
        if (obj == null) {
            obj = new YLongitude(yctx, func);
            YFunction._AddToCache('Longitude',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of longitude sensors started using yFirstLongitude().
     *
     * @return {YLongitude} a pointer to a YLongitude object, corresponding to
     *         a longitude sensor currently online, or a null pointer
     *         if there are no more longitude sensors to enumerate.
     */
    nextLongitude()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YLongitude.FindLongitudeInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of longitude sensors currently accessible.
     * Use the method YLongitude.nextLongitude() to iterate on
     * next longitude sensors.
     *
     * @return {YLongitude} a pointer to a YLongitude object, corresponding to
     *         the first longitude sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstLongitude()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Longitude');
        if(next_hwid == null) return null;
        return YLongitude.FindLongitude(next_hwid);
    }

    /**
     * Starts the enumeration of longitude sensors currently accessible.
     * Use the method YLongitude.nextLongitude() to iterate on
     * next longitude sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YLongitude} a pointer to a YLongitude object, corresponding to
     *         the first longitude sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstLongitudeInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Longitude');
        if(next_hwid == null) return null;
        return YLongitude.FindLongitudeInContext(yctx, next_hwid);
    }


    //--- (end of YLongitude implementation)
}

//
// YLongitudeProxy Class: synchronous proxy to YLongitude objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YLongitude objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YLongitudeProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YLongitude accessors declaration)
    //--- (end of YLongitude accessors declaration)
}

//--- (YLongitude functions)

YoctoLibExport('YLongitude', YLongitude);
YoctoLibExport('YLongitudeProxy', YLongitudeProxy);
YLongitude.imm_Init();

//--- (end of YLongitude functions)
