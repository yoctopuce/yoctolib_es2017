/*********************************************************************
 *
 *  $Id: yocto_audioin.js 32902 2018-11-02 10:13:53Z seb $
 *
 *  Implements the high-level API for AudioIn functions
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

//--- (YAudioIn return codes)
//--- (end of YAudioIn return codes)
//--- (YAudioIn definitions)
//--- (end of YAudioIn definitions)

//--- (YAudioIn class start)
/**
 * YAudioIn Class: AudioIn function interface
 *
 * The Yoctopuce application programming interface allows you to configure the volume of the input channel.
 */
//--- (end of YAudioIn class start)

class YAudioIn extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YAudioIn constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'AudioIn';
        /** @member {number} **/
        this._volume                     = YAudioIn.VOLUME_INVALID;
        /** @member {number} **/
        this._mute                       = YAudioIn.MUTE_INVALID;
        /** @member {string} **/
        this._volumeRange                = YAudioIn.VOLUMERANGE_INVALID;
        /** @member {number} **/
        this._signal                     = YAudioIn.SIGNAL_INVALID;
        /** @member {number} **/
        this._noSignalFor                = YAudioIn.NOSIGNALFOR_INVALID;
        //--- (end of YAudioIn constructor)
    }

    //--- (YAudioIn implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'volume':
            this._volume = parseInt(val);
            return 1;
        case 'mute':
            this._mute = parseInt(val);
            return 1;
        case 'volumeRange':
            this._volumeRange = val;
            return 1;
        case 'signal':
            this._signal = parseInt(val);
            return 1;
        case 'noSignalFor':
            this._noSignalFor = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns audio input gain, in per cents.
     *
     * @return {number} an integer corresponding to audio input gain, in per cents
     *
     * On failure, throws an exception or returns YAudioIn.VOLUME_INVALID.
     */
    async get_volume()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }

    /**
     * Changes audio input gain, in per cents.
     *
     * @param newval {number} : an integer corresponding to audio input gain, in per cents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_volume(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('volume',rest_val);
    }

    /**
     * Returns the state of the mute function.
     *
     * @return {number} either YAudioIn.MUTE_FALSE or YAudioIn.MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns YAudioIn.MUTE_INVALID.
     */
    async get_mute()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.MUTE_INVALID;
            }
        }
        res = this._mute;
        return res;
    }

    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval {number} : either YAudioIn.MUTE_FALSE or YAudioIn.MUTE_TRUE, according to the state
     * of the mute function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_mute(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('mute',rest_val);
    }

    /**
     * Returns the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @return {string} a string corresponding to the supported volume range
     *
     * On failure, throws an exception or returns YAudioIn.VOLUMERANGE_INVALID.
     */
    async get_volumeRange()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.VOLUMERANGE_INVALID;
            }
        }
        res = this._volumeRange;
        return res;
    }

    /**
     * Returns the detected input signal level.
     *
     * @return {number} an integer corresponding to the detected input signal level
     *
     * On failure, throws an exception or returns YAudioIn.SIGNAL_INVALID.
     */
    async get_signal()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.SIGNAL_INVALID;
            }
        }
        res = this._signal;
        return res;
    }

    /**
     * Returns the number of seconds elapsed without detecting a signal.
     *
     * @return {number} an integer corresponding to the number of seconds elapsed without detecting a signal
     *
     * On failure, throws an exception or returns YAudioIn.NOSIGNALFOR_INVALID.
     */
    async get_noSignalFor()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.NOSIGNALFOR_INVALID;
            }
        }
        res = this._noSignalFor;
        return res;
    }

    /**
     * Retrieves an audio input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the audio input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioIn.isOnline() to test if the audio input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the audio input
     *
     * @return {YAudioIn} a YAudioIn object allowing you to drive the audio input.
     */
    static FindAudioIn(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('AudioIn', func);
        if (obj == null) {
            obj = new YAudioIn(YAPI, func);
            YFunction._AddToCache('AudioIn',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an audio input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the audio input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioIn.isOnline() to test if the audio input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the audio input
     *
     * @return {YAudioIn} a YAudioIn object allowing you to drive the audio input.
     */
    static FindAudioInInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'AudioIn', func);
        if (obj == null) {
            obj = new YAudioIn(yctx, func);
            YFunction._AddToCache('AudioIn',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of audio inputs started using yFirstAudioIn().
     * Caution: You can't make any assumption about the returned audio inputs order.
     * If you want to find a specific an audio input, use AudioIn.findAudioIn()
     * and a hardwareID or a logical name.
     *
     * @return {YAudioIn} a pointer to a YAudioIn object, corresponding to
     *         an audio input currently online, or a null pointer
     *         if there are no more audio inputs to enumerate.
     */
    nextAudioIn()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAudioIn.FindAudioInInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of audio inputs currently accessible.
     * Use the method YAudioIn.nextAudioIn() to iterate on
     * next audio inputs.
     *
     * @return {YAudioIn} a pointer to a YAudioIn object, corresponding to
     *         the first audio input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioIn()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('AudioIn');
        if(next_hwid == null) return null;
        return YAudioIn.FindAudioIn(next_hwid);
    }

    /**
     * Starts the enumeration of audio inputs currently accessible.
     * Use the method YAudioIn.nextAudioIn() to iterate on
     * next audio inputs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YAudioIn} a pointer to a YAudioIn object, corresponding to
     *         the first audio input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioInInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('AudioIn');
        if(next_hwid == null) return null;
        return YAudioIn.FindAudioInInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            VOLUME_INVALID               : YAPI.INVALID_UINT,
            MUTE_FALSE                   : 0,
            MUTE_TRUE                    : 1,
            MUTE_INVALID                 : -1,
            VOLUMERANGE_INVALID          : YAPI.INVALID_STRING,
            SIGNAL_INVALID               : YAPI.INVALID_INT,
            NOSIGNALFOR_INVALID          : YAPI.INVALID_INT
        });
    }

    //--- (end of YAudioIn implementation)
}

//
// YAudioInProxy Class: synchronous proxy to YAudioIn objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YAudioIn objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YAudioInProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YAudioIn accessors declaration)

    /**
     * Returns audio input gain, in per cents.
     *
     * @return an integer corresponding to audio input gain, in per cents
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    get_volume()
    {
        return this.liveFunc._volume;
    }

    /**
     * Changes audio input gain, in per cents.
     *
     * @param newval : an integer corresponding to audio input gain, in per cents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_volume(newval)
    {
        this.liveFunc.set_volume(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the state of the mute function.
     *
     * @return either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns Y_MUTE_INVALID.
     */
    get_mute()
    {
        return this.liveFunc._mute;
    }

    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_mute(newval)
    {
        this.liveFunc.set_mute(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @return a string corresponding to the supported volume range
     *
     * On failure, throws an exception or returns Y_VOLUMERANGE_INVALID.
     */
    get_volumeRange()
    {
        return this.liveFunc._volumeRange;
    }

    /**
     * Returns the detected input signal level.
     *
     * @return an integer corresponding to the detected input signal level
     *
     * On failure, throws an exception or returns Y_SIGNAL_INVALID.
     */
    get_signal()
    {
        return this.liveFunc._signal;
    }

    /**
     * Returns the number of seconds elapsed without detecting a signal.
     *
     * @return an integer corresponding to the number of seconds elapsed without detecting a signal
     *
     * On failure, throws an exception or returns Y_NOSIGNALFOR_INVALID.
     */
    get_noSignalFor()
    {
        return this.liveFunc._noSignalFor;
    }
    //--- (end of YAudioIn accessors declaration)
}

//--- (YAudioIn functions)

YoctoLibExport('YAudioIn', YAudioIn);
YoctoLibExport('YAudioInProxy', YAudioInProxy);
YAudioIn.imm_Init();

//--- (end of YAudioIn functions)
