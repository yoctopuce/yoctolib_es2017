/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SoundSpectrum functions
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

//--- (YSoundSpectrum return codes)
//--- (end of YSoundSpectrum return codes)
//--- (YSoundSpectrum definitions)
//--- (end of YSoundSpectrum definitions)

//--- (YSoundSpectrum class start)
/**
 * YSoundSpectrum Class: sound spectrum analyzer control interface
 *
 * The YSoundSpectrum class allows you to read and configure Yoctopuce sound spectrum analyzers.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSoundSpectrum class start)

class YSoundSpectrum extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YSoundSpectrum constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'SoundSpectrum';
        /** @member {number} **/
        this._integrationTime            = YSoundSpectrum.INTEGRATIONTIME_INVALID;
        /** @member {string} **/
        this._spectrumData               = YSoundSpectrum.SPECTRUMDATA_INVALID;
        //--- (end of YSoundSpectrum constructor)
    }

    //--- (YSoundSpectrum implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'integrationTime':
            this._integrationTime = parseInt(val);
            return 1;
        case 'spectrumData':
            this._spectrumData = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the integration time in milliseconds for calculating time
     * weighted spectrum data.
     *
     * @return {Promise<number>} an integer corresponding to the integration time in milliseconds for calculating time
     *         weighted spectrum data
     *
     * On failure, throws an exception or returns YSoundSpectrum.INTEGRATIONTIME_INVALID.
     */
    async get_integrationTime()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSoundSpectrum.INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }

    /**
     * Changes the integration time in milliseconds for computing time weighted
     * spectrum data. Be aware that on some devices, changing the integration
     * time for time-weighted spectrum data may also affect the integration
     * period for one or more sound pressure level measurements.
     * Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the integration time in milliseconds for
     * computing time weighted
     *         spectrum data
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_integrationTime(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('integrationTime',rest_val);
    }

    async get_spectrumData()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSoundSpectrum.SPECTRUMDATA_INVALID;
            }
        }
        res = this._spectrumData;
        return res;
    }

    /**
     * Retrieves a sound spectrum analyzer for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound spectrum analyzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundSpectrum.isOnline() to test if the sound spectrum analyzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound spectrum analyzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the sound spectrum analyzer, for instance
     *         MyDevice.soundSpectrum.
     *
     * @return {YSoundSpectrum} a YSoundSpectrum object allowing you to drive the sound spectrum analyzer.
     */
    static FindSoundSpectrum(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('SoundSpectrum', func);
        if (obj == null) {
            obj = new YSoundSpectrum(YAPI, func);
            YFunction._AddToCache('SoundSpectrum', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a sound spectrum analyzer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound spectrum analyzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundSpectrum.isOnline() to test if the sound spectrum analyzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound spectrum analyzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the sound spectrum analyzer, for instance
     *         MyDevice.soundSpectrum.
     *
     * @return {YSoundSpectrum} a YSoundSpectrum object allowing you to drive the sound spectrum analyzer.
     */
    static FindSoundSpectrumInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'SoundSpectrum', func);
        if (obj == null) {
            obj = new YSoundSpectrum(yctx, func);
            YFunction._AddToCache('SoundSpectrum', func, obj);
        }
        return obj;
    }

    /**
     * Returns the next SoundSpectrum
     *
     * @returns {YSoundSpectrum}
     */
    nextSoundSpectrum()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSoundSpectrum.FindSoundSpectrumInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first SoundSpectrum in a YAPI context
     *
     * @returns {YSoundSpectrum}
     */
    static FirstSoundSpectrum()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('SoundSpectrum');
        if(next_hwid == null) return null;
        return YSoundSpectrum.FindSoundSpectrum(next_hwid);
    }

    /**
     * Retrieves the first SoundSpectrum in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YSoundSpectrum}
     */
    static FirstSoundSpectrumInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('SoundSpectrum');
        if(next_hwid == null) return null;
        return YSoundSpectrum.FindSoundSpectrumInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            INTEGRATIONTIME_INVALID      : YAPI.INVALID_UINT,
            SPECTRUMDATA_INVALID         : YAPI.INVALID_STRING
        });
    }

    //--- (end of YSoundSpectrum implementation)
}

//
// YSoundSpectrumProxy Class: synchronous proxy to YSoundSpectrum objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YSoundSpectrum objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YSoundSpectrumProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YSoundSpectrum accessors declaration)

    /**
     * Returns the integration time in milliseconds for calculating time
     * weighted spectrum data.
     *
     * @return an integer corresponding to the integration time in milliseconds for calculating time
     *         weighted spectrum data
     *
     * On failure, throws an exception or returns YSoundSpectrum.INTEGRATIONTIME_INVALID.
     */
    get_integrationTime()
    {
        return this.liveFunc._integrationTime;
    }

    /**
     * Changes the integration time in milliseconds for computing time weighted
     * spectrum data. Be aware that on some devices, changing the integration
     * time for time-weighted spectrum data may also affect the integration
     * period for one or more sound pressure level measurements.
     * Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the integration time in milliseconds for computing time weighted
     *         spectrum data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_integrationTime(newval)
    {
        this.liveFunc.set_integrationTime(newval);
        return this._yapi.SUCCESS;
    }

    get_spectrumData()
    {
        return this.liveFunc._spectrumData;
    }
    //--- (end of YSoundSpectrum accessors declaration)
}

//--- (YSoundSpectrum functions)

YoctoLibExport('YSoundSpectrum', YSoundSpectrum);
YoctoLibExport('YSoundSpectrumProxy', YSoundSpectrumProxy);
YSoundSpectrum.imm_Init();

//--- (end of YSoundSpectrum functions)

