/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SoundLevel functions
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

//--- (YSoundLevel return codes)
//--- (end of YSoundLevel return codes)
//--- (YSoundLevel definitions)
//--- (end of YSoundLevel definitions)

//--- (YSoundLevel class start)
/**
 * YSoundLevel Class: sound pressure level meter control interface
 *
 * The YSoundLevel class allows you to read and configure Yoctopuce sound pressure level meters.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSoundLevel class start)

class YSoundLevel extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YSoundLevel constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'SoundLevel';
        /** @member {string} **/
        this._label                      = YSoundLevel.LABEL_INVALID;
        /** @member {number} **/
        this._integrationTime            = YSoundLevel.INTEGRATIONTIME_INVALID;
        //--- (end of YSoundLevel constructor)
    }

    //--- (YSoundLevel implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'label':
            this._label = val;
            return 1;
        case 'integrationTime':
            this._integrationTime = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the sound pressure level (dBA, dBC or dBZ).
     * That unit will directly determine frequency weighting to be used to compute
     * the measured value. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the sound pressure level
     * (dBA, dBC or dBZ)
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
     * Returns the label for the sound pressure level measurement, as per
     * IEC standard 61672-1:2013.
     *
     * @return {Promise<string>} a string corresponding to the label for the sound pressure level measurement, as per
     *         IEC standard 61672-1:2013
     *
     * On failure, throws an exception or returns YSoundLevel.LABEL_INVALID.
     */
    async get_label()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSoundLevel.LABEL_INVALID;
            }
        }
        res = this._label;
        return res;
    }

    /**
     * Returns the integration time in milliseconds for measuring the sound pressure level.
     *
     * @return {Promise<number>} an integer corresponding to the integration time in milliseconds for
     * measuring the sound pressure level
     *
     * On failure, throws an exception or returns YSoundLevel.INTEGRATIONTIME_INVALID.
     */
    async get_integrationTime()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSoundLevel.INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }

    /**
     * Retrieves a sound pressure level meter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound pressure level meter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundLevel.isOnline() to test if the sound pressure level meter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound pressure level meter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the sound pressure level meter, for instance
     *         MyDevice.soundLevel1.
     *
     * @return {YSoundLevel} a YSoundLevel object allowing you to drive the sound pressure level meter.
     */
    static FindSoundLevel(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('SoundLevel', func);
        if (obj == null) {
            obj = new YSoundLevel(YAPI, func);
            YFunction._AddToCache('SoundLevel', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a sound pressure level meter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound pressure level meter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundLevel.isOnline() to test if the sound pressure level meter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound pressure level meter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the sound pressure level meter, for instance
     *         MyDevice.soundLevel1.
     *
     * @return {YSoundLevel} a YSoundLevel object allowing you to drive the sound pressure level meter.
     */
    static FindSoundLevelInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'SoundLevel', func);
        if (obj == null) {
            obj = new YSoundLevel(yctx, func);
            YFunction._AddToCache('SoundLevel', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of sound pressure level meters started using yFirstSoundLevel().
     * Caution: You can't make any assumption about the returned sound pressure level meters order.
     * If you want to find a specific a sound pressure level meter, use SoundLevel.findSoundLevel()
     * and a hardwareID or a logical name.
     *
     * @return {YSoundLevel | null} a pointer to a YSoundLevel object, corresponding to
     *         a sound pressure level meter currently online, or a null pointer
     *         if there are no more sound pressure level meters to enumerate.
     */
    nextSoundLevel()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSoundLevel.FindSoundLevelInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of sound pressure level meters currently accessible.
     * Use the method YSoundLevel.nextSoundLevel() to iterate on
     * next sound pressure level meters.
     *
     * @return {YSoundLevel | null} a pointer to a YSoundLevel object, corresponding to
     *         the first sound pressure level meter currently online, or a null pointer
     *         if there are none.
     */
    static FirstSoundLevel()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('SoundLevel');
        if(next_hwid == null) return null;
        return YSoundLevel.FindSoundLevel(next_hwid);
    }

    /**
     * Starts the enumeration of sound pressure level meters currently accessible.
     * Use the method YSoundLevel.nextSoundLevel() to iterate on
     * next sound pressure level meters.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YSoundLevel | null} a pointer to a YSoundLevel object, corresponding to
     *         the first sound pressure level meter currently online, or a null pointer
     *         if there are none.
     */
    static FirstSoundLevelInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('SoundLevel');
        if(next_hwid == null) return null;
        return YSoundLevel.FindSoundLevelInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            LABEL_INVALID                : YAPI.INVALID_STRING,
            INTEGRATIONTIME_INVALID      : YAPI.INVALID_UINT
        });
    }

    //--- (end of YSoundLevel implementation)
}

//
// YSoundLevelProxy Class: synchronous proxy to YSoundLevel objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YSoundLevel objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YSoundLevelProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YSoundLevel accessors declaration)

    /**
     * Changes the measuring unit for the sound pressure level (dBA, dBC or dBZ).
     * That unit will directly determine frequency weighting to be used to compute
     * the measured value. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the sound pressure level (dBA, dBC or dBZ)
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
     * Returns the label for the sound pressure level measurement, as per
     * IEC standard 61672-1:2013.
     *
     * @return a string corresponding to the label for the sound pressure level measurement, as per
     *         IEC standard 61672-1:2013
     *
     * On failure, throws an exception or returns YSoundLevel.LABEL_INVALID.
     */
    get_label()
    {
        return this.liveFunc._label;
    }

    /**
     * Returns the integration time in milliseconds for measuring the sound pressure level.
     *
     * @return an integer corresponding to the integration time in milliseconds for measuring the sound pressure level
     *
     * On failure, throws an exception or returns YSoundLevel.INTEGRATIONTIME_INVALID.
     */
    get_integrationTime()
    {
        return this.liveFunc._integrationTime;
    }
    //--- (end of YSoundLevel accessors declaration)
}

//--- (YSoundLevel functions)

YoctoLibExport('YSoundLevel', YSoundLevel);
YoctoLibExport('YSoundLevelProxy', YSoundLevelProxy);
YSoundLevel.imm_Init();

//--- (end of YSoundLevel functions)

