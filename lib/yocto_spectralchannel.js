/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SpectralChannel functions
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

//--- (YSpectralChannel return codes)
//--- (end of YSpectralChannel return codes)
//--- (YSpectralChannel definitions)
//--- (end of YSpectralChannel definitions)

//--- (YSpectralChannel class start)
/**
 * YSpectralChannel Class: spectral analysis channel control interface
 *
 * The YSpectralChannel class allows you to read and configure Yoctopuce spectral analysis channels.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSpectralChannel class start)

class YSpectralChannel extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YSpectralChannel constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'SpectralChannel';
        /** @member {number} **/
        this._rawCount                   = YSpectralChannel.RAWCOUNT_INVALID;
        /** @member {string} **/
        this._channelName                = YSpectralChannel.CHANNELNAME_INVALID;
        /** @member {number} **/
        this._peakWavelength             = YSpectralChannel.PEAKWAVELENGTH_INVALID;
        //--- (end of YSpectralChannel constructor)
    }

    //--- (YSpectralChannel implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'rawCount':
            this._rawCount = parseInt(val);
            return 1;
        case 'channelName':
            this._channelName = val;
            return 1;
        case 'peakWavelength':
            this._peakWavelength = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Retrieves the raw spectral intensity value as measured by the sensor, without any scaling or calibration.
     *
     * @return {Promise<number>} an integer
     *
     * On failure, throws an exception or returns YSpectralChannel.RAWCOUNT_INVALID.
     */
    async get_rawCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralChannel.RAWCOUNT_INVALID;
            }
        }
        res = this._rawCount;
        return res;
    }

    /**
     * Returns the target spectral band name.
     *
     * @return {Promise<string>} a string corresponding to the target spectral band name
     *
     * On failure, throws an exception or returns YSpectralChannel.CHANNELNAME_INVALID.
     */
    async get_channelName()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralChannel.CHANNELNAME_INVALID;
            }
        }
        res = this._channelName;
        return res;
    }

    /**
     * Returns the target spectral band peak wavelenght, in nm.
     *
     * @return {Promise<number>} an integer corresponding to the target spectral band peak wavelenght, in nm
     *
     * On failure, throws an exception or returns YSpectralChannel.PEAKWAVELENGTH_INVALID.
     */
    async get_peakWavelength()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralChannel.PEAKWAVELENGTH_INVALID;
            }
        }
        res = this._peakWavelength;
        return res;
    }

    /**
     * Retrieves a spectral analysis channel for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral analysis channel is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralChannel.isOnline() to test if the spectral analysis channel is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral analysis channel by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the spectral analysis channel, for instance
     *         MyDevice.spectralChannel1.
     *
     * @return {YSpectralChannel} a YSpectralChannel object allowing you to drive the spectral analysis channel.
     */
    static FindSpectralChannel(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('SpectralChannel', func);
        if (obj == null) {
            obj = new YSpectralChannel(YAPI, func);
            YFunction._AddToCache('SpectralChannel', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a spectral analysis channel for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral analysis channel is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralChannel.isOnline() to test if the spectral analysis channel is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral analysis channel by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the spectral analysis channel, for instance
     *         MyDevice.spectralChannel1.
     *
     * @return {YSpectralChannel} a YSpectralChannel object allowing you to drive the spectral analysis channel.
     */
    static FindSpectralChannelInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'SpectralChannel', func);
        if (obj == null) {
            obj = new YSpectralChannel(yctx, func);
            YFunction._AddToCache('SpectralChannel', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of spectral analysis channels started using yFirstSpectralChannel().
     * Caution: You can't make any assumption about the returned spectral analysis channels order.
     * If you want to find a specific a spectral analysis channel, use SpectralChannel.findSpectralChannel()
     * and a hardwareID or a logical name.
     *
     * @return {YSpectralChannel | null} a pointer to a YSpectralChannel object, corresponding to
     *         a spectral analysis channel currently online, or a null pointer
     *         if there are no more spectral analysis channels to enumerate.
     */
    nextSpectralChannel()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSpectralChannel.FindSpectralChannelInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of spectral analysis channels currently accessible.
     * Use the method YSpectralChannel.nextSpectralChannel() to iterate on
     * next spectral analysis channels.
     *
     * @return {YSpectralChannel | null} a pointer to a YSpectralChannel object, corresponding to
     *         the first spectral analysis channel currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralChannel()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('SpectralChannel');
        if(next_hwid == null) return null;
        return YSpectralChannel.FindSpectralChannel(next_hwid);
    }

    /**
     * Starts the enumeration of spectral analysis channels currently accessible.
     * Use the method YSpectralChannel.nextSpectralChannel() to iterate on
     * next spectral analysis channels.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YSpectralChannel | null} a pointer to a YSpectralChannel object, corresponding to
     *         the first spectral analysis channel currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralChannelInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('SpectralChannel');
        if(next_hwid == null) return null;
        return YSpectralChannel.FindSpectralChannelInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            RAWCOUNT_INVALID             : YAPI.INVALID_INT,
            CHANNELNAME_INVALID          : YAPI.INVALID_STRING,
            PEAKWAVELENGTH_INVALID       : YAPI.INVALID_INT
        });
    }

    //--- (end of YSpectralChannel implementation)
}

//
// YSpectralChannelProxy Class: synchronous proxy to YSpectralChannel objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YSpectralChannel objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YSpectralChannelProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YSpectralChannel accessors declaration)

    /**
     * Retrieves the raw spectral intensity value as measured by the sensor, without any scaling or calibration.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralChannel.RAWCOUNT_INVALID.
     */
    get_rawCount()
    {
        return this.liveFunc._rawCount;
    }

    /**
     * Returns the target spectral band name.
     *
     * @return a string corresponding to the target spectral band name
     *
     * On failure, throws an exception or returns YSpectralChannel.CHANNELNAME_INVALID.
     */
    get_channelName()
    {
        return this.liveFunc._channelName;
    }

    /**
     * Returns the target spectral band peak wavelenght, in nm.
     *
     * @return an integer corresponding to the target spectral band peak wavelenght, in nm
     *
     * On failure, throws an exception or returns YSpectralChannel.PEAKWAVELENGTH_INVALID.
     */
    get_peakWavelength()
    {
        return this.liveFunc._peakWavelength;
    }
    //--- (end of YSpectralChannel accessors declaration)
}

//--- (YSpectralChannel functions)

YoctoLibExport('YSpectralChannel', YSpectralChannel);
YoctoLibExport('YSpectralChannelProxy', YSpectralChannelProxy);
YSpectralChannel.imm_Init();

//--- (end of YSpectralChannel functions)

