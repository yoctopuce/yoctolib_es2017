/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Orientation functions
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

//--- (YOrientation return codes)
//--- (end of YOrientation return codes)
//--- (YOrientation definitions)
//--- (end of YOrientation definitions)

//--- (YOrientation class start)
/**
 * YOrientation Class: orientation sensor control interface
 *
 * The YOrientation class allows you to read and configure Yoctopuce orientation sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YOrientation class start)

class YOrientation extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YOrientation constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Orientation';
        /** @member {string} **/
        this._command                    = YOrientation.COMMAND_INVALID;
        /** @member {number} **/
        this._zeroOffset                 = YOrientation.ZEROOFFSET_INVALID;
        //--- (end of YOrientation constructor)
    }

    //--- (YOrientation implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'command':
            this._command = val;
            return 1;
        case 'zeroOffset':
            this._zeroOffset = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YOrientation.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('command',rest_val);
    }

    /**
     * Sets an offset between the orientation reported by the sensor and the actual orientation. This
     * can typically be used  to compensate for mechanical offset. This offset can also be set
     * automatically using the zero() method.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * On failure, throws an exception or returns a negative error code.
     *
     * @param newval {number} : a floating point number
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_zeroOffset(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('zeroOffset',rest_val);
    }

    /**
     * Returns the Offset between the orientation reported by the sensor and the actual orientation.
     *
     * @return {Promise<number>} a floating point number corresponding to the Offset between the
     * orientation reported by the sensor and the actual orientation
     *
     * On failure, throws an exception or returns YOrientation.ZEROOFFSET_INVALID.
     */
    async get_zeroOffset()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YOrientation.ZEROOFFSET_INVALID;
            }
        }
        res = this._zeroOffset;
        return res;
    }

    /**
     * Retrieves an orientation sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the orientation sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YOrientation.isOnline() to test if the orientation sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an orientation sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the orientation sensor, for instance
     *         MyDevice.orientation.
     *
     * @return {YOrientation} a YOrientation object allowing you to drive the orientation sensor.
     */
    static FindOrientation(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Orientation', func);
        if (obj == null) {
            obj = new YOrientation(YAPI, func);
            YFunction._AddToCache('Orientation', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an orientation sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the orientation sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YOrientation.isOnline() to test if the orientation sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an orientation sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the orientation sensor, for instance
     *         MyDevice.orientation.
     *
     * @return {YOrientation} a YOrientation object allowing you to drive the orientation sensor.
     */
    static FindOrientationInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Orientation', func);
        if (obj == null) {
            obj = new YOrientation(yctx, func);
            YFunction._AddToCache('Orientation', func, obj);
        }
        return obj;
    }

    async sendCommand(command)
    {
        return await this.set_command(command);
    }

    /**
     * Reset the sensor's zero to current position by automatically setting a new offset.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async zero()
    {
        return await this.sendCommand('Z');
    }

    /**
     * Modifies the calibration of the MA600A sensor using an array of 32
     * values representing the offset in degrees between the true values and
     * those measured regularly every 11.25 degrees starting from zero. The calibration
     * is applied immediately and is stored permanently in the MA600A sensor.
     * Before calculating the offset values, remember to clear any previous
     * calibration using the clearCalibration function and set
     * the zero offset  to 0. After a calibration change, the sensor will stop
     * measurements for about one second.
     * Do not confuse this function with the generic calibrateFromPoints function,
     * which works at the YSensor level and is not necessarily well suited to
     * a sensor returning circular values.
     *
     * @param offsetValues {number[]} : array of 32 floating point values in the [-11.25..+11.25] range
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_calibration(offsetValues)
    {
        /** @type {string} **/
        let res;
        /** @type {number} **/
        let npt;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let corr;
        npt = offsetValues.length;
        if (npt != 32) {
            this._throw(this._yapi.INVALID_ARGUMENT, 'Invalid calibration parameters (32 expected)');
            return this._yapi.INVALID_ARGUMENT;
        }
        res = 'C';
        idx = 0;
        while (idx < npt) {
            corr = Math.round(offsetValues[idx] * 128 / 11.25);
            if ((corr < -128) || (corr > 127)) {
                this._throw(this._yapi.INVALID_ARGUMENT, 'Calibration parameter exceeds permitted range (+/-11.25)');
                return this._yapi.INVALID_ARGUMENT;
            }
            if (corr < 0) {
                corr = corr + 256;
            }
            res = res+''+('00'+(corr).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        return await this.sendCommand(res);
    }

    /**
     * Retrieves offset correction data points previously entered using the method
     * set_calibration.
     *
     * @param offsetValues : array of 32 floating point numbers, that will be filled by the
     *         function with the offset values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_Calibration(offsetValues)
    {
        return 0;
    }

    /**
     * Cancels any calibration set with set_calibration. This function
     * is equivalent to calling set_calibration with only zeros.
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clearCalibration()
    {
        return await this.sendCommand('-');
    }

    /**
     * Continues the enumeration of orientation sensors started using yFirstOrientation().
     * Caution: You can't make any assumption about the returned orientation sensors order.
     * If you want to find a specific an orientation sensor, use Orientation.findOrientation()
     * and a hardwareID or a logical name.
     *
     * @return {YOrientation | null} a pointer to a YOrientation object, corresponding to
     *         an orientation sensor currently online, or a null pointer
     *         if there are no more orientation sensors to enumerate.
     */
    nextOrientation()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YOrientation.FindOrientationInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of orientation sensors currently accessible.
     * Use the method YOrientation.nextOrientation() to iterate on
     * next orientation sensors.
     *
     * @return {YOrientation | null} a pointer to a YOrientation object, corresponding to
     *         the first orientation sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstOrientation()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Orientation');
        if(next_hwid == null) return null;
        return YOrientation.FindOrientation(next_hwid);
    }

    /**
     * Starts the enumeration of orientation sensors currently accessible.
     * Use the method YOrientation.nextOrientation() to iterate on
     * next orientation sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YOrientation | null} a pointer to a YOrientation object, corresponding to
     *         the first orientation sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstOrientationInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Orientation');
        if(next_hwid == null) return null;
        return YOrientation.FindOrientationInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            COMMAND_INVALID              : YAPI.INVALID_STRING,
            ZEROOFFSET_INVALID           : YAPI.INVALID_DOUBLE
        });
    }

    //--- (end of YOrientation implementation)
}

//
// YOrientationProxy Class: synchronous proxy to YOrientation objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YOrientation objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
class YOrientationProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YOrientation accessors declaration)

    get_command()
    {
        return this.liveFunc._command;
    }

    set_command(newval)
    {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Sets an offset between the orientation reported by the sensor and the actual orientation. This
     * can typically be used  to compensate for mechanical offset. This offset can also be set
     * automatically using the zero() method.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * On failure, throws an exception or returns a negative error code.
     *
     * @param newval : a floating point number
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_zeroOffset(newval)
    {
        this.liveFunc.set_zeroOffset(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the Offset between the orientation reported by the sensor and the actual orientation.
     *
     * @return a floating point number corresponding to the Offset between the orientation reported by the
     * sensor and the actual orientation
     *
     * On failure, throws an exception or returns YOrientation.ZEROOFFSET_INVALID.
     */
    get_zeroOffset()
    {
        return this.liveFunc._zeroOffset;
    }

    sendCommand(command)
    {
        this.liveFunc.sendCommand(command);
        return YAPI_SUCCESS;
    }

    /**
     * Reset the sensor's zero to current position by automatically setting a new offset.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    zero()
    {
        this.liveFunc.zero();
        return YAPI_SUCCESS;
    }

    /**
     * Modifies the calibration of the MA600A sensor using an array of 32
     * values representing the offset in degrees between the true values and
     * those measured regularly every 11.25 degrees starting from zero. The calibration
     * is applied immediately and is stored permanently in the MA600A sensor.
     * Before calculating the offset values, remember to clear any previous
     * calibration using the clearCalibration function and set
     * the zero offset  to 0. After a calibration change, the sensor will stop
     * measurements for about one second.
     * Do not confuse this function with the generic calibrateFromPoints function,
     * which works at the YSensor level and is not necessarily well suited to
     * a sensor returning circular values.
     *
     * @param offsetValues : array of 32 floating point values in the [-11.25..+11.25] range
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_calibration(offsetValues)
    {
        this.liveFunc.set_calibration(offsetValues);
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves offset correction data points previously entered using the method
     * set_calibration.
     *
     * @param offsetValues : array of 32 floating point numbers, that will be filled by the
     *         function with the offset values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    get_Calibration(offsetValues)
    {
        this.liveFunc.get_Calibration(offsetValues);
        return YAPI_SUCCESS;
    }

    /**
     * Cancels any calibration set with set_calibration. This function
     * is equivalent to calling set_calibration with only zeros.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clearCalibration()
    {
        this.liveFunc.clearCalibration();
        return YAPI_SUCCESS;
    }
    //--- (end of YOrientation accessors declaration)
}

//--- (YOrientation functions)

YoctoLibExport('YOrientation', YOrientation);
YoctoLibExport('YOrientationProxy', YOrientationProxy);
YOrientation.imm_Init();

//--- (end of YOrientation functions)

