/*********************************************************************
 *
 * $Id: yocto_audioout.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for AudioOut functions
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

//--- (YAudioOut return codes)
//--- (end of YAudioOut return codes)
//--- (YAudioOut definitions)
//--- (end of YAudioOut definitions)

//--- (YAudioOut class start)
/**
 * YAudioOut Class: AudioOut function interface
 *
 * The Yoctopuce application programming interface allows you to configure the volume of the outout.
 */
//--- (end of YAudioOut class start)

class YAudioOut extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YAudioOut constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'AudioOut';
        /** @member {number} **/
        this._volume                     = YAudioOut.VOLUME_INVALID;
        /** @member {number} **/
        this._mute                       = YAudioOut.MUTE_INVALID;
        /** @member {string} **/
        this._volumeRange                = YAudioOut.VOLUMERANGE_INVALID;
        /** @member {number} **/
        this._signal                     = YAudioOut.SIGNAL_INVALID;
        /** @member {number} **/
        this._noSignalFor                = YAudioOut.NOSIGNALFOR_INVALID;
        //--- (end of YAudioOut constructor)
    }

    //--- (YAudioOut implementation)

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
     * Returns audio output volume, in per cents.
     *
     * @return {number} an integer corresponding to audio output volume, in per cents
     *
     * On failure, throws an exception or returns YAudioOut.VOLUME_INVALID.
     */
    async get_volume()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }

    /**
     * Changes audio output volume, in per cents.
     *
     * @param newval {number} : an integer corresponding to audio output volume, in per cents
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
     * @return {number} either YAudioOut.MUTE_FALSE or YAudioOut.MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns YAudioOut.MUTE_INVALID.
     */
    async get_mute()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.MUTE_INVALID;
            }
        }
        res = this._mute;
        return res;
    }

    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval {number} : either YAudioOut.MUTE_FALSE or YAudioOut.MUTE_TRUE, according to the state
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
     * On failure, throws an exception or returns YAudioOut.VOLUMERANGE_INVALID.
     */
    async get_volumeRange()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.VOLUMERANGE_INVALID;
            }
        }
        res = this._volumeRange;
        return res;
    }

    /**
     * Returns the detected output current level.
     *
     * @return {number} an integer corresponding to the detected output current level
     *
     * On failure, throws an exception or returns YAudioOut.SIGNAL_INVALID.
     */
    async get_signal()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.SIGNAL_INVALID;
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
     * On failure, throws an exception or returns YAudioOut.NOSIGNALFOR_INVALID.
     */
    async get_noSignalFor()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.NOSIGNALFOR_INVALID;
            }
        }
        res = this._noSignalFor;
        return res;
    }

    /**
     * Retrieves an audio output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the audio output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioOut.isOnline() to test if the audio output is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the audio output
     *
     * @return {YAudioOut} a YAudioOut object allowing you to drive the audio output.
     */
    static FindAudioOut(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('AudioOut', func);
        if (obj == null) {
            obj = new YAudioOut(YAPI, func);
            YFunction._AddToCache('AudioOut',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an audio output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the audio output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioOut.isOnline() to test if the audio output is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the audio output
     *
     * @return {YAudioOut} a YAudioOut object allowing you to drive the audio output.
     */
    static FindAudioOutInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'AudioOut', func);
        if (obj == null) {
            obj = new YAudioOut(yctx, func);
            YFunction._AddToCache('AudioOut',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of audio outputs started using yFirstAudioOut().
     *
     * @return {YAudioOut} a pointer to a YAudioOut object, corresponding to
     *         an audio output currently online, or a null pointer
     *         if there are no more audio outputs to enumerate.
     */
    nextAudioOut()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAudioOut.FindAudioOutInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of audio outputs currently accessible.
     * Use the method YAudioOut.nextAudioOut() to iterate on
     * next audio outputs.
     *
     * @return {YAudioOut} a pointer to a YAudioOut object, corresponding to
     *         the first audio output currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioOut()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('AudioOut');
        if(next_hwid == null) return null;
        return YAudioOut.FindAudioOut(next_hwid);
    }

    /**
     * Starts the enumeration of audio outputs currently accessible.
     * Use the method YAudioOut.nextAudioOut() to iterate on
     * next audio outputs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YAudioOut} a pointer to a YAudioOut object, corresponding to
     *         the first audio output currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioOutInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('AudioOut');
        if(next_hwid == null) return null;
        return YAudioOut.FindAudioOutInContext(yctx, next_hwid);
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

    //--- (end of YAudioOut implementation)
}

//
// YAudioOutProxy Class: synchronous proxy to YAudioOut objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YAudioOut objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YAudioOutProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YAudioOut accessors declaration)

    /**
     * Returns audio output volume, in per cents.
     *
     * @return an integer corresponding to audio output volume, in per cents
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    get_volume()
    {
        return this.liveFunc._volume;
    }

    /**
     * Changes audio output volume, in per cents.
     *
     * @param newval : an integer corresponding to audio output volume, in per cents
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
     * Returns the detected output current level.
     *
     * @return an integer corresponding to the detected output current level
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
    //--- (end of YAudioOut accessors declaration)
}

//--- (YAudioOut functions)

YoctoLibExport('YAudioOut', YAudioOut);
YoctoLibExport('YAudioOutProxy', YAudioOutProxy);
YAudioOut.imm_Init();

//--- (end of YAudioOut functions)
