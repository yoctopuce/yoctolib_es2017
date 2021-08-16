/*********************************************************************
 *
 *  $Id: yocto_quadraturedecoder.js 45843 2021-08-04 07:51:59Z mvuilleu $
 *
 *  Implements the high-level API for QuadratureDecoder functions
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

//--- (YQuadratureDecoder return codes)
//--- (end of YQuadratureDecoder return codes)
//--- (YQuadratureDecoder definitions)
//--- (end of YQuadratureDecoder definitions)

//--- (YQuadratureDecoder class start)
/**
 * YQuadratureDecoder Class: quadrature decoder control interface, available for instance in the
 * Yocto-MaxiKnob or the Yocto-PWM-Rx
 *
 * The YQuadratureDecoder class allows you to read and configure Yoctopuce quadrature decoders.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YQuadratureDecoder class start)

class YQuadratureDecoder extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YQuadratureDecoder constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'QuadratureDecoder';
        /** @member {number} **/
        this._speed                      = YQuadratureDecoder.SPEED_INVALID;
        /** @member {number} **/
        this._decoding                   = YQuadratureDecoder.DECODING_INVALID;
        /** @member {number} **/
        this._edgesPerCycle              = YQuadratureDecoder.EDGESPERCYCLE_INVALID;
        //--- (end of YQuadratureDecoder constructor)
    }

    //--- (YQuadratureDecoder implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'speed':
            this._speed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'decoding':
            this._decoding = parseInt(val);
            return 1;
        case 'edgesPerCycle':
            this._edgesPerCycle = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the current expected position of the quadrature decoder.
     * Invoking this function implicitly activates the quadrature decoder.
     *
     * @param newval {number} : a floating point number corresponding to the current expected position of
     * the quadrature decoder
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentValue(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentValue',rest_val);
    }

    /**
     * Returns the cycle frequency, in Hz.
     *
     * @return {Promise<number>} a floating point number corresponding to the cycle frequency, in Hz
     *
     * On failure, throws an exception or returns YQuadratureDecoder.SPEED_INVALID.
     */
    async get_speed()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YQuadratureDecoder.SPEED_INVALID;
            }
        }
        res = this._speed;
        return res;
    }

    /**
     * Returns the current activation state of the quadrature decoder.
     *
     * @return {Promise<number>} either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON,
     * according to the current activation state of the quadrature decoder
     *
     * On failure, throws an exception or returns YQuadratureDecoder.DECODING_INVALID.
     */
    async get_decoding()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YQuadratureDecoder.DECODING_INVALID;
            }
        }
        res = this._decoding;
        return res;
    }

    /**
     * Changes the activation state of the quadrature decoder.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON,
     * according to the activation state of the quadrature decoder
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_decoding(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('decoding',rest_val);
    }

    /**
     * Returns the edge count per full cycle configuration setting.
     *
     * @return {Promise<number>} an integer corresponding to the edge count per full cycle configuration setting
     *
     * On failure, throws an exception or returns YQuadratureDecoder.EDGESPERCYCLE_INVALID.
     */
    async get_edgesPerCycle()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YQuadratureDecoder.EDGESPERCYCLE_INVALID;
            }
        }
        res = this._edgesPerCycle;
        return res;
    }

    /**
     * Changes the edge count per full cycle configuration setting.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the edge count per full cycle configuration setting
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_edgesPerCycle(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('edgesPerCycle',rest_val);
    }

    /**
     * Retrieves a quadrature decoder for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the quadrature decoder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quadrature decoder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the quadrature decoder, for instance
     *         YMXBTN01.quadratureDecoder1.
     *
     * @return {YQuadratureDecoder} a YQuadratureDecoder object allowing you to drive the quadrature decoder.
     */
    static FindQuadratureDecoder(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('QuadratureDecoder', func);
        if (obj == null) {
            obj = new YQuadratureDecoder(YAPI, func);
            YFunction._AddToCache('QuadratureDecoder',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a quadrature decoder for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the quadrature decoder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quadrature decoder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the quadrature decoder, for instance
     *         YMXBTN01.quadratureDecoder1.
     *
     * @return {YQuadratureDecoder} a YQuadratureDecoder object allowing you to drive the quadrature decoder.
     */
    static FindQuadratureDecoderInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'QuadratureDecoder', func);
        if (obj == null) {
            obj = new YQuadratureDecoder(yctx, func);
            YFunction._AddToCache('QuadratureDecoder',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of quadrature decoders started using yFirstQuadratureDecoder().
     * Caution: You can't make any assumption about the returned quadrature decoders order.
     * If you want to find a specific a quadrature decoder, use QuadratureDecoder.findQuadratureDecoder()
     * and a hardwareID or a logical name.
     *
     * @return {YQuadratureDecoder | null} a pointer to a YQuadratureDecoder object, corresponding to
     *         a quadrature decoder currently online, or a null pointer
     *         if there are no more quadrature decoders to enumerate.
     */
    nextQuadratureDecoder()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoderInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of quadrature decoders currently accessible.
     * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
     * next quadrature decoders.
     *
     * @return {YQuadratureDecoder | null} a pointer to a YQuadratureDecoder object, corresponding to
     *         the first quadrature decoder currently online, or a null pointer
     *         if there are none.
     */
    static FirstQuadratureDecoder()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('QuadratureDecoder');
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoder(next_hwid);
    }

    /**
     * Starts the enumeration of quadrature decoders currently accessible.
     * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
     * next quadrature decoders.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YQuadratureDecoder | null} a pointer to a YQuadratureDecoder object, corresponding to
     *         the first quadrature decoder currently online, or a null pointer
     *         if there are none.
     */
    static FirstQuadratureDecoderInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('QuadratureDecoder');
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoderInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            SPEED_INVALID                : YAPI.INVALID_DOUBLE,
            DECODING_OFF                 : 0,
            DECODING_ON                  : 1,
            DECODING_INVALID             : -1,
            EDGESPERCYCLE_INVALID        : YAPI.INVALID_UINT
        });
    }

    //--- (end of YQuadratureDecoder implementation)
}

//
// YQuadratureDecoderProxy Class: synchronous proxy to YQuadratureDecoder objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YQuadratureDecoder objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YQuadratureDecoderProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YQuadratureDecoder accessors declaration)

    /**
     * Changes the current expected position of the quadrature decoder.
     * Invoking this function implicitly activates the quadrature decoder.
     *
     * @param newval : a floating point number corresponding to the current expected position of the quadrature decoder
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentValue(newval)
    {
        this.liveFunc.set_currentValue(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the cycle frequency, in Hz.
     *
     * @return a floating point number corresponding to the cycle frequency, in Hz
     *
     * On failure, throws an exception or returns YQuadratureDecoder.SPEED_INVALID.
     */
    get_speed()
    {
        return this.liveFunc._speed;
    }

    /**
     * Returns the current activation state of the quadrature decoder.
     *
     * @return either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON, according to the
     * current activation state of the quadrature decoder
     *
     * On failure, throws an exception or returns YQuadratureDecoder.DECODING_INVALID.
     */
    get_decoding()
    {
        return this.liveFunc._decoding;
    }

    /**
     * Changes the activation state of the quadrature decoder.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON, according
     * to the activation state of the quadrature decoder
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_decoding(newval)
    {
        this.liveFunc.set_decoding(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the edge count per full cycle configuration setting.
     *
     * @return an integer corresponding to the edge count per full cycle configuration setting
     *
     * On failure, throws an exception or returns YQuadratureDecoder.EDGESPERCYCLE_INVALID.
     */
    get_edgesPerCycle()
    {
        return this.liveFunc._edgesPerCycle;
    }

    /**
     * Changes the edge count per full cycle configuration setting.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the edge count per full cycle configuration setting
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_edgesPerCycle(newval)
    {
        this.liveFunc.set_edgesPerCycle(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YQuadratureDecoder accessors declaration)
}

//--- (YQuadratureDecoder functions)

YoctoLibExport('YQuadratureDecoder', YQuadratureDecoder);
YoctoLibExport('YQuadratureDecoderProxy', YQuadratureDecoderProxy);
YQuadratureDecoder.imm_Init();

//--- (end of YQuadratureDecoder functions)
