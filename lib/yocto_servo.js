/*********************************************************************
 *
 * $Id: yocto_servo.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for Servo functions
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

//--- (YServo return codes)
//--- (end of YServo return codes)
//--- (YServo definitions)
//--- (end of YServo definitions)

//--- (YServo class start)
/**
 * YServo Class: Servo function interface
 *
 * Yoctopuce application programming interface allows you not only to move
 * a servo to a given position, but also to specify the time interval
 * in which the move should be performed. This makes it possible to
 * synchronize two servos involved in a same move.
 */
//--- (end of YServo class start)

class YServo extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YServo constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Servo';
        /** @member {number} **/
        this._position                   = YServo.POSITION_INVALID;
        /** @member {number} **/
        this._enabled                    = YServo.ENABLED_INVALID;
        /** @member {number} **/
        this._range                      = YServo.RANGE_INVALID;
        /** @member {number} **/
        this._neutral                    = YServo.NEUTRAL_INVALID;
        /** @member {YMove} **/
        this._move                       = YServo.MOVE_INVALID;
        /** @member {number} **/
        this._positionAtPowerOn          = YServo.POSITIONATPOWERON_INVALID;
        /** @member {number} **/
        this._enabledAtPowerOn           = YServo.ENABLEDATPOWERON_INVALID;
        //--- (end of YServo constructor)
    }

    //--- (YServo implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'position':
            this._position = parseInt(val);
            return 1;
        case 'enabled':
            this._enabled = parseInt(val);
            return 1;
        case 'range':
            this._range = parseInt(val);
            return 1;
        case 'neutral':
            this._neutral = parseInt(val);
            return 1;
        case 'move':
            this._move = val;
            return 1;
        case 'positionAtPowerOn':
            this._positionAtPowerOn = parseInt(val);
            return 1;
        case 'enabledAtPowerOn':
            this._enabledAtPowerOn = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current servo position.
     *
     * @return {number} an integer corresponding to the current servo position
     *
     * On failure, throws an exception or returns YServo.POSITION_INVALID.
     */
    async get_position()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.POSITION_INVALID;
            }
        }
        res = this._position;
        return res;
    }

    /**
     * Changes immediately the servo driving position.
     *
     * @param newval {number} : an integer corresponding to immediately the servo driving position
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_position(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('position',rest_val);
    }

    /**
     * Returns the state of the servos.
     *
     * @return {number} either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE, according to the state of the servos
     *
     * On failure, throws an exception or returns YServo.ENABLED_INVALID.
     */
    async get_enabled()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Stops or starts the servo.
     *
     * @param newval {number} : either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabled',rest_val);
    }

    /**
     * Returns the current range of use of the servo.
     *
     * @return {number} an integer corresponding to the current range of use of the servo
     *
     * On failure, throws an exception or returns YServo.RANGE_INVALID.
     */
    async get_range()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.RANGE_INVALID;
            }
        }
        res = this._range;
        return res;
    }

    /**
     * Changes the range of use of the servo, specified in per cents.
     * A range of 100% corresponds to a standard control signal, that varies
     * from 1 [ms] to 2 [ms], When using a servo that supports a double range,
     * from 0.5 [ms] to 2.5 [ms], you can select a range of 200%.
     * Be aware that using a range higher than what is supported by the servo
     * is likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval {number} : an integer corresponding to the range of use of the servo, specified in per cents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_range(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('range',rest_val);
    }

    /**
     * Returns the duration in microseconds of a neutral pulse for the servo.
     *
     * @return {number} an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     *
     * On failure, throws an exception or returns YServo.NEUTRAL_INVALID.
     */
    async get_neutral()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.NEUTRAL_INVALID;
            }
        }
        res = this._neutral;
        return res;
    }

    /**
     * Changes the duration of the pulse corresponding to the neutral position of the servo.
     * The duration is specified in microseconds, and the standard value is 1500 [us].
     * This setting makes it possible to shift the range of use of the servo.
     * Be aware that using a range higher than what is supported by the servo is
     * likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval {number} : an integer corresponding to the duration of the pulse corresponding to the
     * neutral position of the servo
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_neutral(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('neutral',rest_val);
    }

    async get_move()
    {
        /** @type {YMove} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.MOVE_INVALID;
            }
        }
        res = this._move;
        return res;
    }

    async set_move(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval.target)+':'+String(newval.ms);
        return await this._setAttr('move',rest_val);
    }

    /**
     * Performs a smooth move at constant speed toward a given position.
     *
     * @param target      : new position at the end of the move
     * @param ms_duration {number} : total duration of the move, in milliseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async move(target,ms_duration)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(target)+':'+String(ms_duration);
        return await this._setAttr('move',rest_val);
    }

    /**
     * Returns the servo position at device power up.
     *
     * @return {number} an integer corresponding to the servo position at device power up
     *
     * On failure, throws an exception or returns YServo.POSITIONATPOWERON_INVALID.
     */
    async get_positionAtPowerOn()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.POSITIONATPOWERON_INVALID;
            }
        }
        res = this._positionAtPowerOn;
        return res;
    }

    /**
     * Configure the servo position at device power up. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval {number} : an integer
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_positionAtPowerOn(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('positionAtPowerOn',rest_val);
    }

    /**
     * Returns the servo signal generator state at power up.
     *
     * @return {number} either YServo.ENABLEDATPOWERON_FALSE or YServo.ENABLEDATPOWERON_TRUE, according to
     * the servo signal generator state at power up
     *
     * On failure, throws an exception or returns YServo.ENABLEDATPOWERON_INVALID.
     */
    async get_enabledAtPowerOn()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.ENABLEDATPOWERON_INVALID;
            }
        }
        res = this._enabledAtPowerOn;
        return res;
    }

    /**
     * Configure the servo signal generator state at power up. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval {number} : either YServo.ENABLEDATPOWERON_FALSE or YServo.ENABLEDATPOWERON_TRUE
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabledAtPowerOn(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabledAtPowerOn',rest_val);
    }

    /**
     * Retrieves a servo for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the servo is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YServo.isOnline() to test if the servo is
     * indeed online at a given time. In case of ambiguity when looking for
     * a servo by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the servo
     *
     * @return {YServo} a YServo object allowing you to drive the servo.
     */
    static FindServo(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Servo', func);
        if (obj == null) {
            obj = new YServo(YAPI, func);
            YFunction._AddToCache('Servo',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a servo for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the servo is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YServo.isOnline() to test if the servo is
     * indeed online at a given time. In case of ambiguity when looking for
     * a servo by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the servo
     *
     * @return {YServo} a YServo object allowing you to drive the servo.
     */
    static FindServoInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Servo', func);
        if (obj == null) {
            obj = new YServo(yctx, func);
            YFunction._AddToCache('Servo',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of servos started using yFirstServo().
     *
     * @return {YServo} a pointer to a YServo object, corresponding to
     *         a servo currently online, or a null pointer
     *         if there are no more servos to enumerate.
     */
    nextServo()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YServo.FindServoInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of servos currently accessible.
     * Use the method YServo.nextServo() to iterate on
     * next servos.
     *
     * @return {YServo} a pointer to a YServo object, corresponding to
     *         the first servo currently online, or a null pointer
     *         if there are none.
     */
    static FirstServo()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Servo');
        if(next_hwid == null) return null;
        return YServo.FindServo(next_hwid);
    }

    /**
     * Starts the enumeration of servos currently accessible.
     * Use the method YServo.nextServo() to iterate on
     * next servos.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YServo} a pointer to a YServo object, corresponding to
     *         the first servo currently online, or a null pointer
     *         if there are none.
     */
    static FirstServoInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Servo');
        if(next_hwid == null) return null;
        return YServo.FindServoInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            POSITION_INVALID             : YAPI.INVALID_INT,
            ENABLED_FALSE                : 0,
            ENABLED_TRUE                 : 1,
            ENABLED_INVALID              : -1,
            RANGE_INVALID                : YAPI.INVALID_UINT,
            NEUTRAL_INVALID              : YAPI.INVALID_UINT,
            POSITIONATPOWERON_INVALID    : YAPI.INVALID_INT,
            ENABLEDATPOWERON_FALSE       : 0,
            ENABLEDATPOWERON_TRUE        : 1,
            ENABLEDATPOWERON_INVALID     : -1
        });
    }

    //--- (end of YServo implementation)
}

//
// YServoProxy Class: synchronous proxy to YServo objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YServo objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YServoProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YServo accessors declaration)

    /**
     * Returns the current servo position.
     *
     * @return an integer corresponding to the current servo position
     *
     * On failure, throws an exception or returns Y_POSITION_INVALID.
     */
    get_position()
    {
        return this.liveFunc._position;
    }

    /**
     * Changes immediately the servo driving position.
     *
     * @param newval : an integer corresponding to immediately the servo driving position
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_position(newval)
    {
        this.liveFunc.set_position(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the state of the servos.
     *
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the state of the servos
     *
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    get_enabled()
    {
        return this.liveFunc._enabled;
    }

    /**
     * Stops or starts the servo.
     *
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval)
    {
        this.liveFunc.set_enabled(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current range of use of the servo.
     *
     * @return an integer corresponding to the current range of use of the servo
     *
     * On failure, throws an exception or returns Y_RANGE_INVALID.
     */
    get_range()
    {
        return this.liveFunc._range;
    }

    /**
     * Changes the range of use of the servo, specified in per cents.
     * A range of 100% corresponds to a standard control signal, that varies
     * from 1 [ms] to 2 [ms], When using a servo that supports a double range,
     * from 0.5 [ms] to 2.5 [ms], you can select a range of 200%.
     * Be aware that using a range higher than what is supported by the servo
     * is likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : an integer corresponding to the range of use of the servo, specified in per cents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_range(newval)
    {
        this.liveFunc.set_range(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the duration in microseconds of a neutral pulse for the servo.
     *
     * @return an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     *
     * On failure, throws an exception or returns Y_NEUTRAL_INVALID.
     */
    get_neutral()
    {
        return this.liveFunc._neutral;
    }

    /**
     * Changes the duration of the pulse corresponding to the neutral position of the servo.
     * The duration is specified in microseconds, and the standard value is 1500 [us].
     * This setting makes it possible to shift the range of use of the servo.
     * Be aware that using a range higher than what is supported by the servo is
     * likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : an integer corresponding to the duration of the pulse corresponding to the neutral
     * position of the servo
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_neutral(newval)
    {
        this.liveFunc.set_neutral(newval);
        return this._yapi.SUCCESS;
    }

    get_move()
    {
        return this.liveFunc._move;
    }

    set_move(newval)
    {
        this.liveFunc.set_move(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the servo position at device power up.
     *
     * @return an integer corresponding to the servo position at device power up
     *
     * On failure, throws an exception or returns Y_POSITIONATPOWERON_INVALID.
     */
    get_positionAtPowerOn()
    {
        return this.liveFunc._positionAtPowerOn;
    }

    /**
     * Configure the servo position at device power up. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : an integer
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_positionAtPowerOn(newval)
    {
        this.liveFunc.set_positionAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the servo signal generator state at power up.
     *
     * @return either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE, according to the servo signal
     * generator state at power up
     *
     * On failure, throws an exception or returns Y_ENABLEDATPOWERON_INVALID.
     */
    get_enabledAtPowerOn()
    {
        return this.liveFunc._enabledAtPowerOn;
    }

    /**
     * Configure the servo signal generator state at power up. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabledAtPowerOn(newval)
    {
        this.liveFunc.set_enabledAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YServo accessors declaration)
}

//--- (YServo functions)

YoctoLibExport('YServo', YServo);
YoctoLibExport('YServoProxy', YServoProxy);
YServo.imm_Init();

//--- (end of YServo functions)
