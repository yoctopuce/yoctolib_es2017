/*********************************************************************
 *
 *  $Id: yocto_multiaxiscontroller.js 32902 2018-11-02 10:13:53Z seb $
 *
 *  Implements the high-level API for MultiAxisController functions
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

//--- (YMultiAxisController return codes)
//--- (end of YMultiAxisController return codes)
//--- (YMultiAxisController definitions)
//--- (end of YMultiAxisController definitions)

//--- (YMultiAxisController class start)
/**
 * YMultiAxisController Class: MultiAxisController function interface
 *
 * The Yoctopuce application programming interface allows you to drive a stepper motor.
 */
//--- (end of YMultiAxisController class start)

class YMultiAxisController extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YMultiAxisController constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'MultiAxisController';
        /** @member {number} **/
        this._nAxis                      = YMultiAxisController.NAXIS_INVALID;
        /** @member {number} **/
        this._globalState                = YMultiAxisController.GLOBALSTATE_INVALID;
        /** @member {string} **/
        this._command                    = YMultiAxisController.COMMAND_INVALID;
        //--- (end of YMultiAxisController constructor)
    }

    //--- (YMultiAxisController implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'nAxis':
            this._nAxis = parseInt(val);
            return 1;
        case 'globalState':
            this._globalState = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of synchronized controllers.
     *
     * @return {number} an integer corresponding to the number of synchronized controllers
     *
     * On failure, throws an exception or returns YMultiAxisController.NAXIS_INVALID.
     */
    async get_nAxis()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiAxisController.NAXIS_INVALID;
            }
        }
        res = this._nAxis;
        return res;
    }

    /**
     * Changes the number of synchronized controllers.
     *
     * @param newval {number} : an integer corresponding to the number of synchronized controllers
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_nAxis(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('nAxis',rest_val);
    }

    /**
     * Returns the stepper motor set overall state.
     *
     * @return {number} a value among YMultiAxisController.GLOBALSTATE_ABSENT,
     * YMultiAxisController.GLOBALSTATE_ALERT, YMultiAxisController.GLOBALSTATE_HI_Z,
     * YMultiAxisController.GLOBALSTATE_STOP, YMultiAxisController.GLOBALSTATE_RUN and
     * YMultiAxisController.GLOBALSTATE_BATCH corresponding to the stepper motor set overall state
     *
     * On failure, throws an exception or returns YMultiAxisController.GLOBALSTATE_INVALID.
     */
    async get_globalState()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiAxisController.GLOBALSTATE_INVALID;
            }
        }
        res = this._globalState;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiAxisController.COMMAND_INVALID;
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
     * Retrieves a multi-axis controller for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-axis controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if the multi-axis controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-axis controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the multi-axis controller
     *
     * @return {YMultiAxisController} a YMultiAxisController object allowing you to drive the multi-axis controller.
     */
    static FindMultiAxisController(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('MultiAxisController', func);
        if (obj == null) {
            obj = new YMultiAxisController(YAPI, func);
            YFunction._AddToCache('MultiAxisController',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a multi-axis controller for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-axis controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if the multi-axis controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-axis controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the multi-axis controller
     *
     * @return {YMultiAxisController} a YMultiAxisController object allowing you to drive the multi-axis controller.
     */
    static FindMultiAxisControllerInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'MultiAxisController', func);
        if (obj == null) {
            obj = new YMultiAxisController(yctx, func);
            YFunction._AddToCache('MultiAxisController',  func, obj);
        }
        return obj;
    }

    async sendCommand(command)
    {
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let retBin;
        /** @type {number} **/
        let res;
        url = 'cmd.txt?X='+command;
        //may throw an exception
        retBin = await this._download(url);
        res = retBin[0];
        if (res == 49) {
            if (!(res == 48)) {
                return this._throw(this._yapi.DEVICE_BUSY,'Motor command pipeline is full, try again later',this._yapi.DEVICE_BUSY);
            }
        } else {
            if (!(res == 48)) {
                return this._throw(this._yapi.IO_ERROR,'Motor command failed permanently',this._yapi.IO_ERROR);
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Reinitialize all controllers and clear all alert flags.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async reset()
    {
        return await this.set_command('Z');
    }

    /**
     * Starts all motors backward at the specified speeds, to search for the motor home position.
     *
     * @param speed {number[]} : desired speed for all axis, in steps per second.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async findHomePosition(speed)
    {
        /** @type {string} **/
        let cmd;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let ndim;
        ndim = speed.length;
        cmd = 'H'+String(Math.round(Math.round(1000*speed[0])));
        i = 1;
        while (i < ndim) {
            cmd = cmd+','+String(Math.round(Math.round(1000*speed[i])));
            i = i + 1;
        }
        return await this.sendCommand(cmd);
    }

    /**
     * Starts all motors synchronously to reach a given absolute position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param absPos {number[]} : absolute position, measured in steps from each origin.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveTo(absPos)
    {
        /** @type {string} **/
        let cmd;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let ndim;
        ndim = absPos.length;
        cmd = 'M'+String(Math.round(Math.round(16*absPos[0])));
        i = 1;
        while (i < ndim) {
            cmd = cmd+','+String(Math.round(Math.round(16*absPos[i])));
            i = i + 1;
        }
        return await this.sendCommand(cmd);
    }

    /**
     * Starts all motors synchronously to reach a given relative position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param relPos {number[]} : relative position, measured in steps from the current position.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveRel(relPos)
    {
        /** @type {string} **/
        let cmd;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let ndim;
        ndim = relPos.length;
        cmd = 'm'+String(Math.round(Math.round(16*relPos[0])));
        i = 1;
        while (i < ndim) {
            cmd = cmd+','+String(Math.round(Math.round(16*relPos[i])));
            i = i + 1;
        }
        return await this.sendCommand(cmd);
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs {number} : wait time, specified in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async pause(waitMs)
    {
        return await this.sendCommand('_'+String(Math.round(waitMs)));
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async emergencyStop()
    {
        return await this.set_command('!');
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndBrake()
    {
        return await this.set_command('B');
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndHiZ()
    {
        return await this.set_command('z');
    }

    /**
     * Continues the enumeration of multi-axis controllers started using yFirstMultiAxisController().
     * Caution: You can't make any assumption about the returned multi-axis controllers order.
     * If you want to find a specific a multi-axis controller, use MultiAxisController.findMultiAxisController()
     * and a hardwareID or a logical name.
     *
     * @return {YMultiAxisController} a pointer to a YMultiAxisController object, corresponding to
     *         a multi-axis controller currently online, or a null pointer
     *         if there are no more multi-axis controllers to enumerate.
     */
    nextMultiAxisController()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisControllerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of multi-axis controllers currently accessible.
     * Use the method YMultiAxisController.nextMultiAxisController() to iterate on
     * next multi-axis controllers.
     *
     * @return {YMultiAxisController} a pointer to a YMultiAxisController object, corresponding to
     *         the first multi-axis controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiAxisController()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('MultiAxisController');
        if(next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisController(next_hwid);
    }

    /**
     * Starts the enumeration of multi-axis controllers currently accessible.
     * Use the method YMultiAxisController.nextMultiAxisController() to iterate on
     * next multi-axis controllers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMultiAxisController} a pointer to a YMultiAxisController object, corresponding to
     *         the first multi-axis controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiAxisControllerInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('MultiAxisController');
        if(next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisControllerInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            NAXIS_INVALID                : YAPI.INVALID_UINT,
            GLOBALSTATE_ABSENT           : 0,
            GLOBALSTATE_ALERT            : 1,
            GLOBALSTATE_HI_Z             : 2,
            GLOBALSTATE_STOP             : 3,
            GLOBALSTATE_RUN              : 4,
            GLOBALSTATE_BATCH            : 5,
            GLOBALSTATE_INVALID          : -1,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YMultiAxisController implementation)
}

//
// YMultiAxisControllerProxy Class: synchronous proxy to YMultiAxisController objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YMultiAxisController objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YMultiAxisControllerProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YMultiAxisController accessors declaration)

    /**
     * Returns the number of synchronized controllers.
     *
     * @return an integer corresponding to the number of synchronized controllers
     *
     * On failure, throws an exception or returns Y_NAXIS_INVALID.
     */
    get_nAxis()
    {
        return this.liveFunc._nAxis;
    }

    /**
     * Changes the number of synchronized controllers.
     *
     * @param newval : an integer corresponding to the number of synchronized controllers
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nAxis(newval)
    {
        this.liveFunc.set_nAxis(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the stepper motor set overall state.
     *
     * @return a value among Y_GLOBALSTATE_ABSENT, Y_GLOBALSTATE_ALERT, Y_GLOBALSTATE_HI_Z,
     * Y_GLOBALSTATE_STOP, Y_GLOBALSTATE_RUN and Y_GLOBALSTATE_BATCH corresponding to the stepper motor
     * set overall state
     *
     * On failure, throws an exception or returns Y_GLOBALSTATE_INVALID.
     */
    get_globalState()
    {
        return this.liveFunc._globalState;
    }

    get_command()
    {
        return this.liveFunc._command;
    }

    set_command(newval)
    {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    sendCommand(command)
    {
        this.liveFunc.sendCommand(command);
        return YAPI_SUCCESS;
    }

    /**
     * Reinitialize all controllers and clear all alert flags.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    reset()
    {
        this.liveFunc.reset();
        return YAPI_SUCCESS;
    }

    /**
     * Starts all motors backward at the specified speeds, to search for the motor home position.
     *
     * @param speed : desired speed for all axis, in steps per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    findHomePosition(speed)
    {
        this.liveFunc.findHomePosition(speed);
        return YAPI_SUCCESS;
    }

    /**
     * Starts all motors synchronously to reach a given absolute position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param absPos : absolute position, measured in steps from each origin.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveTo(absPos)
    {
        this.liveFunc.moveTo(absPos);
        return YAPI_SUCCESS;
    }

    /**
     * Starts all motors synchronously to reach a given relative position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveRel(relPos)
    {
        this.liveFunc.moveRel(relPos);
        return YAPI_SUCCESS;
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    pause(waitMs)
    {
        this.liveFunc.pause(waitMs);
        return YAPI_SUCCESS;
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    emergencyStop()
    {
        this.liveFunc.emergencyStop();
        return YAPI_SUCCESS;
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndBrake()
    {
        this.liveFunc.abortAndBrake();
        return YAPI_SUCCESS;
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndHiZ()
    {
        this.liveFunc.abortAndHiZ();
        return YAPI_SUCCESS;
    }
    //--- (end of YMultiAxisController accessors declaration)
}

//--- (YMultiAxisController functions)

YoctoLibExport('YMultiAxisController', YMultiAxisController);
YoctoLibExport('YMultiAxisControllerProxy', YMultiAxisControllerProxy);
YMultiAxisController.imm_Init();

//--- (end of YMultiAxisController functions)
