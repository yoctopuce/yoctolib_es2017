/*********************************************************************
 *
 *  $Id: yocto_tvoc.js 33270 2018-11-22 08:41:15Z seb $
 *
 *  Implements the high-level API for Tvoc functions
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

//--- (YTvoc return codes)
//--- (end of YTvoc return codes)
//--- (YTvoc definitions)
//--- (end of YTvoc definitions)

//--- (YTvoc class start)
/**
 * YTvoc Class: Tvoc function interface
 *
 * The Yoctopuce class YTvoc allows you to read and configure Yoctopuce Total Volatile Organic
 * Compound sensors. It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 */
//--- (end of YTvoc class start)

class YTvoc extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YTvoc constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Tvoc';
        //--- (end of YTvoc constructor)
    }

    //--- (YTvoc implementation)

    /**
     * Retrieves a Total  Volatile Organic Compound sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the Total  Volatile Organic Compound sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTvoc.isOnline() to test if the Total  Volatile Organic Compound sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Total  Volatile Organic Compound sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the Total  Volatile Organic Compound sensor
     *
     * @return {YTvoc} a YTvoc object allowing you to drive the Total  Volatile Organic Compound sensor.
     */
    static FindTvoc(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Tvoc', func);
        if (obj == null) {
            obj = new YTvoc(YAPI, func);
            YFunction._AddToCache('Tvoc',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a Total  Volatile Organic Compound sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the Total  Volatile Organic Compound sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTvoc.isOnline() to test if the Total  Volatile Organic Compound sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Total  Volatile Organic Compound sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the Total  Volatile Organic Compound sensor
     *
     * @return {YTvoc} a YTvoc object allowing you to drive the Total  Volatile Organic Compound sensor.
     */
    static FindTvocInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Tvoc', func);
        if (obj == null) {
            obj = new YTvoc(yctx, func);
            YFunction._AddToCache('Tvoc',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of Total Volatile Organic Compound sensors started using yFirstTvoc().
     * Caution: You can't make any assumption about the returned Total Volatile Organic Compound sensors order.
     * If you want to find a specific a Total  Volatile Organic Compound sensor, use Tvoc.findTvoc()
     * and a hardwareID or a logical name.
     *
     * @return {YTvoc} a pointer to a YTvoc object, corresponding to
     *         a Total  Volatile Organic Compound sensor currently online, or a null pointer
     *         if there are no more Total Volatile Organic Compound sensors to enumerate.
     */
    nextTvoc()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YTvoc.FindTvocInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of Total Volatile Organic Compound sensors currently accessible.
     * Use the method YTvoc.nextTvoc() to iterate on
     * next Total Volatile Organic Compound sensors.
     *
     * @return {YTvoc} a pointer to a YTvoc object, corresponding to
     *         the first Total Volatile Organic Compound sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTvoc()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Tvoc');
        if(next_hwid == null) return null;
        return YTvoc.FindTvoc(next_hwid);
    }

    /**
     * Starts the enumeration of Total Volatile Organic Compound sensors currently accessible.
     * Use the method YTvoc.nextTvoc() to iterate on
     * next Total Volatile Organic Compound sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YTvoc} a pointer to a YTvoc object, corresponding to
     *         the first Total Volatile Organic Compound sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTvocInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Tvoc');
        if(next_hwid == null) return null;
        return YTvoc.FindTvocInContext(yctx, next_hwid);
    }

    //--- (end of YTvoc implementation)
}

//
// YTvocProxy Class: synchronous proxy to YTvoc objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YTvoc objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YTvocProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YTvoc accessors declaration)
    //--- (end of YTvoc accessors declaration)
}

//--- (YTvoc functions)

YoctoLibExport('YTvoc', YTvoc);
YoctoLibExport('YTvocProxy', YTvocProxy);
YTvoc.imm_Init();

//--- (end of YTvoc functions)
