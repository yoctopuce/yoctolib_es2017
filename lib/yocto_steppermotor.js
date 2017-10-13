/*********************************************************************
 *
 * $Id: yocto_steppermotor.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for StepperMotor functions
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

//--- (YStepperMotor return codes)
//--- (end of YStepperMotor return codes)
//--- (YStepperMotor definitions)
//--- (end of YStepperMotor definitions)

//--- (YStepperMotor class start)
/**
 * YStepperMotor Class: StepperMotor function interface
 *
 * The Yoctopuce application programming interface allows you to drive a stepper motor.
 */
//--- (end of YStepperMotor class start)

class YStepperMotor extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YStepperMotor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'StepperMotor';
        /** @member {number} **/
        this._motorState                 = YStepperMotor.MOTORSTATE_INVALID;
        /** @member {number} **/
        this._diags                      = YStepperMotor.DIAGS_INVALID;
        /** @member {number} **/
        this._stepPos                    = YStepperMotor.STEPPOS_INVALID;
        /** @member {number} **/
        this._speed                      = YStepperMotor.SPEED_INVALID;
        /** @member {number} **/
        this._pullinSpeed                = YStepperMotor.PULLINSPEED_INVALID;
        /** @member {number} **/
        this._maxAccel                   = YStepperMotor.MAXACCEL_INVALID;
        /** @member {number} **/
        this._maxSpeed                   = YStepperMotor.MAXSPEED_INVALID;
        /** @member {number} **/
        this._stepping                   = YStepperMotor.STEPPING_INVALID;
        /** @member {number} **/
        this._overcurrent                = YStepperMotor.OVERCURRENT_INVALID;
        /** @member {number} **/
        this._tCurrStop                  = YStepperMotor.TCURRSTOP_INVALID;
        /** @member {number} **/
        this._tCurrRun                   = YStepperMotor.TCURRRUN_INVALID;
        /** @member {string} **/
        this._alertMode                  = YStepperMotor.ALERTMODE_INVALID;
        /** @member {string} **/
        this._auxMode                    = YStepperMotor.AUXMODE_INVALID;
        /** @member {number} **/
        this._auxSignal                  = YStepperMotor.AUXSIGNAL_INVALID;
        /** @member {string} **/
        this._command                    = YStepperMotor.COMMAND_INVALID;
        //--- (end of YStepperMotor constructor)
    }

    //--- (YStepperMotor implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'motorState':
            this._motorState = parseInt(val);
            return 1;
        case 'diags':
            this._diags = parseInt(val);
            return 1;
        case 'stepPos':
            this._stepPos = val / 16.0;
            return 1;
        case 'speed':
            this._speed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'pullinSpeed':
            this._pullinSpeed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'maxAccel':
            this._maxAccel = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'maxSpeed':
            this._maxSpeed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'stepping':
            this._stepping = parseInt(val);
            return 1;
        case 'overcurrent':
            this._overcurrent = parseInt(val);
            return 1;
        case 'tCurrStop':
            this._tCurrStop = parseInt(val);
            return 1;
        case 'tCurrRun':
            this._tCurrRun = parseInt(val);
            return 1;
        case 'alertMode':
            this._alertMode = val;
            return 1;
        case 'auxMode':
            this._auxMode = val;
            return 1;
        case 'auxSignal':
            this._auxSignal = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the motor working state.
     *
     * @return {number} a value among YStepperMotor.MOTORSTATE_ABSENT, YStepperMotor.MOTORSTATE_ALERT,
     * YStepperMotor.MOTORSTATE_HI_Z, YStepperMotor.MOTORSTATE_STOP, YStepperMotor.MOTORSTATE_RUN and
     * YStepperMotor.MOTORSTATE_BATCH corresponding to the motor working state
     *
     * On failure, throws an exception or returns YStepperMotor.MOTORSTATE_INVALID.
     */
    async get_motorState()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.MOTORSTATE_INVALID;
            }
        }
        res = this._motorState;
        return res;
    }

    /**
     * Returns the stepper motor controller diagnostics, as a bitmap.
     *
     * @return {number} an integer corresponding to the stepper motor controller diagnostics, as a bitmap
     *
     * On failure, throws an exception or returns YStepperMotor.DIAGS_INVALID.
     */
    async get_diags()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.DIAGS_INVALID;
            }
        }
        res = this._diags;
        return res;
    }

    /**
     * Changes the current logical motor position, measured in steps.
     * This command does not cause any motor move, as its purpose is only to setup
     * the origin of the position counter. The fractional part of the position,
     * that corresponds to the physical position of the rotor, is not changed.
     * To trigger a motor move, use methods moveTo() or moveRel()
     * instead.
     *
     * @param newval {number} : a floating point number corresponding to the current logical motor
     * position, measured in steps
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_stepPos(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 100.0)/100.0);
        return await this._setAttr('stepPos',rest_val);
    }

    /**
     * Returns the current logical motor position, measured in steps.
     * The value may include a fractional part when micro-stepping is in use.
     *
     * @return {number} a floating point number corresponding to the current logical motor position, measured in steps
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPOS_INVALID.
     */
    async get_stepPos()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.STEPPOS_INVALID;
            }
        }
        res = this._stepPos;
        return res;
    }

    /**
     * Returns current motor speed, measured in steps per second.
     * To change speed, use method changeSpeed().
     *
     * @return {number} a floating point number corresponding to current motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.SPEED_INVALID.
     */
    async get_speed()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.SPEED_INVALID;
            }
        }
        res = this._speed;
        return res;
    }

    /**
     * Changes the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @param newval {number} : a floating point number corresponding to the motor speed immediately
     * reachable from stop state, measured in steps per second
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_pullinSpeed(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('pullinSpeed',rest_val);
    }

    /**
     * Returns the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @return {number} a floating point number corresponding to the motor speed immediately reachable
     * from stop state, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.PULLINSPEED_INVALID.
     */
    async get_pullinSpeed()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.PULLINSPEED_INVALID;
            }
        }
        res = this._pullinSpeed;
        return res;
    }

    /**
     * Changes the maximal motor acceleration, measured in steps per second^2.
     *
     * @param newval {number} : a floating point number corresponding to the maximal motor acceleration,
     * measured in steps per second^2
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maxAccel(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('maxAccel',rest_val);
    }

    /**
     * Returns the maximal motor acceleration, measured in steps per second^2.
     *
     * @return {number} a floating point number corresponding to the maximal motor acceleration, measured
     * in steps per second^2
     *
     * On failure, throws an exception or returns YStepperMotor.MAXACCEL_INVALID.
     */
    async get_maxAccel()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.MAXACCEL_INVALID;
            }
        }
        res = this._maxAccel;
        return res;
    }

    /**
     * Changes the maximal motor speed, measured in steps per second.
     *
     * @param newval {number} : a floating point number corresponding to the maximal motor speed, measured
     * in steps per second
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maxSpeed(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('maxSpeed',rest_val);
    }

    /**
     * Returns the maximal motor speed, measured in steps per second.
     *
     * @return {number} a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.MAXSPEED_INVALID.
     */
    async get_maxSpeed()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.MAXSPEED_INVALID;
            }
        }
        res = this._maxSpeed;
        return res;
    }

    /**
     * Returns the stepping mode used to drive the motor.
     *
     * @return {number} a value among YStepperMotor.STEPPING_MICROSTEP16,
     * YStepperMotor.STEPPING_MICROSTEP8, YStepperMotor.STEPPING_MICROSTEP4,
     * YStepperMotor.STEPPING_HALFSTEP and YStepperMotor.STEPPING_FULLSTEP corresponding to the stepping
     * mode used to drive the motor
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPING_INVALID.
     */
    async get_stepping()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.STEPPING_INVALID;
            }
        }
        res = this._stepping;
        return res;
    }

    /**
     * Changes the stepping mode used to drive the motor.
     *
     * @param newval {number} : a value among YStepperMotor.STEPPING_MICROSTEP16,
     * YStepperMotor.STEPPING_MICROSTEP8, YStepperMotor.STEPPING_MICROSTEP4,
     * YStepperMotor.STEPPING_HALFSTEP and YStepperMotor.STEPPING_FULLSTEP corresponding to the stepping
     * mode used to drive the motor
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_stepping(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('stepping',rest_val);
    }

    /**
     * Returns the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @return {number} an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.OVERCURRENT_INVALID.
     */
    async get_overcurrent()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.OVERCURRENT_INVALID;
            }
        }
        res = this._overcurrent;
        return res;
    }

    /**
     * Changes the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @param newval {number} : an integer corresponding to the overcurrent alert and emergency stop
     * threshold, measured in mA
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_overcurrent(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('overcurrent',rest_val);
    }

    /**
     * Returns the torque regulation current when the motor is stopped, measured in mA.
     *
     * @return {number} an integer corresponding to the torque regulation current when the motor is
     * stopped, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRSTOP_INVALID.
     */
    async get_tCurrStop()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.TCURRSTOP_INVALID;
            }
        }
        res = this._tCurrStop;
        return res;
    }

    /**
     * Changes the torque regulation current when the motor is stopped, measured in mA.
     *
     * @param newval {number} : an integer corresponding to the torque regulation current when the motor
     * is stopped, measured in mA
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tCurrStop(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('tCurrStop',rest_val);
    }

    /**
     * Returns the torque regulation current when the motor is running, measured in mA.
     *
     * @return {number} an integer corresponding to the torque regulation current when the motor is
     * running, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRRUN_INVALID.
     */
    async get_tCurrRun()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.TCURRRUN_INVALID;
            }
        }
        res = this._tCurrRun;
        return res;
    }

    /**
     * Changes the torque regulation current when the motor is running, measured in mA.
     *
     * @param newval {number} : an integer corresponding to the torque regulation current when the motor
     * is running, measured in mA
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tCurrRun(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('tCurrRun',rest_val);
    }

    async get_alertMode()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.ALERTMODE_INVALID;
            }
        }
        res = this._alertMode;
        return res;
    }

    async set_alertMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('alertMode',rest_val);
    }

    async get_auxMode()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.AUXMODE_INVALID;
            }
        }
        res = this._auxMode;
        return res;
    }

    async set_auxMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('auxMode',rest_val);
    }

    /**
     * Returns the current value of the signal generated on the auxiliary output.
     *
     * @return {number} an integer corresponding to the current value of the signal generated on the auxiliary output
     *
     * On failure, throws an exception or returns YStepperMotor.AUXSIGNAL_INVALID.
     */
    async get_auxSignal()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.AUXSIGNAL_INVALID;
            }
        }
        res = this._auxSignal;
        return res;
    }

    /**
     * Changes the value of the signal generated on the auxiliary output.
     * Acceptable values depend on the auxiliary output signal type configured.
     *
     * @param newval {number} : an integer corresponding to the value of the signal generated on the auxiliary output
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_auxSignal(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('auxSignal',rest_val);
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.COMMAND_INVALID;
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
     * Retrieves a stepper motor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the stepper motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YStepperMotor.isOnline() to test if the stepper motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a stepper motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the stepper motor
     *
     * @return {YStepperMotor} a YStepperMotor object allowing you to drive the stepper motor.
     */
    static FindStepperMotor(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('StepperMotor', func);
        if (obj == null) {
            obj = new YStepperMotor(YAPI, func);
            YFunction._AddToCache('StepperMotor',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a stepper motor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the stepper motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YStepperMotor.isOnline() to test if the stepper motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a stepper motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the stepper motor
     *
     * @return {YStepperMotor} a YStepperMotor object allowing you to drive the stepper motor.
     */
    static FindStepperMotorInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'StepperMotor', func);
        if (obj == null) {
            obj = new YStepperMotor(yctx, func);
            YFunction._AddToCache('StepperMotor',  func, obj);
        }
        return obj;
    }

    async sendCommand(command)
    {
        return await this.set_command(command);
    }

    /**
     * Reinitialize the controller and clear all alert flags.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async reset()
    {
        return await this.sendCommand('Z');
    }

    /**
     * Starts the motor backward at the specified speed, to search for the motor home position.
     *
     * @param speed {number} : desired speed, in steps per second.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async findHomePosition(speed)
    {
        return await this.sendCommand('H'+String(Math.round(Math.round(1000*speed))));
    }

    /**
     * Starts the motor at a given speed. The time needed to reach the requested speed
     * will depend on the acceleration parameters configured for the motor.
     *
     * @param speed {number} : desired speed, in steps per second. The minimal non-zero speed
     *         is 0.001 pulse per second.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async changeSpeed(speed)
    {
        return await this.sendCommand('R'+String(Math.round(Math.round(1000*speed))));
    }

    /**
     * Starts the motor to reach a given absolute position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param absPos {number} : absolute position, measured in steps from the origin.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveTo(absPos)
    {
        return await this.sendCommand('M'+String(Math.round(Math.round(16*absPos))));
    }

    /**
     * Starts the motor to reach a given relative position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param relPos {number} : relative position, measured in steps from the current position.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveRel(relPos)
    {
        return await this.sendCommand('m'+String(Math.round(Math.round(16*relPos))));
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
        return await this.sendCommand('!');
    }

    /**
     * Move one step in the direction opposite the direction set when the most recent alert was raised.
     * The move occures even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async alertStepOut()
    {
        return await this.sendCommand('.');
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndBrake()
    {
        return await this.sendCommand('B');
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndHiZ()
    {
        return await this.sendCommand('z');
    }

    /**
     * Continues the enumeration of stepper motors started using yFirstStepperMotor().
     *
     * @return {YStepperMotor} a pointer to a YStepperMotor object, corresponding to
     *         a stepper motor currently online, or a null pointer
     *         if there are no more stepper motors to enumerate.
     */
    nextStepperMotor()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YStepperMotor.FindStepperMotorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of stepper motors currently accessible.
     * Use the method YStepperMotor.nextStepperMotor() to iterate on
     * next stepper motors.
     *
     * @return {YStepperMotor} a pointer to a YStepperMotor object, corresponding to
     *         the first stepper motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstStepperMotor()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('StepperMotor');
        if(next_hwid == null) return null;
        return YStepperMotor.FindStepperMotor(next_hwid);
    }

    /**
     * Starts the enumeration of stepper motors currently accessible.
     * Use the method YStepperMotor.nextStepperMotor() to iterate on
     * next stepper motors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YStepperMotor} a pointer to a YStepperMotor object, corresponding to
     *         the first stepper motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstStepperMotorInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('StepperMotor');
        if(next_hwid == null) return null;
        return YStepperMotor.FindStepperMotorInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            MOTORSTATE_ABSENT            : 0,
            MOTORSTATE_ALERT             : 1,
            MOTORSTATE_HI_Z              : 2,
            MOTORSTATE_STOP              : 3,
            MOTORSTATE_RUN               : 4,
            MOTORSTATE_BATCH             : 5,
            MOTORSTATE_INVALID           : -1,
            DIAGS_INVALID                : YAPI.INVALID_UINT,
            STEPPOS_INVALID              : YAPI.INVALID_DOUBLE,
            SPEED_INVALID                : YAPI.INVALID_DOUBLE,
            PULLINSPEED_INVALID          : YAPI.INVALID_DOUBLE,
            MAXACCEL_INVALID             : YAPI.INVALID_DOUBLE,
            MAXSPEED_INVALID             : YAPI.INVALID_DOUBLE,
            STEPPING_MICROSTEP16         : 0,
            STEPPING_MICROSTEP8          : 1,
            STEPPING_MICROSTEP4          : 2,
            STEPPING_HALFSTEP            : 3,
            STEPPING_FULLSTEP            : 4,
            STEPPING_INVALID             : -1,
            OVERCURRENT_INVALID          : YAPI.INVALID_UINT,
            TCURRSTOP_INVALID            : YAPI.INVALID_UINT,
            TCURRRUN_INVALID             : YAPI.INVALID_UINT,
            ALERTMODE_INVALID            : YAPI.INVALID_STRING,
            AUXMODE_INVALID              : YAPI.INVALID_STRING,
            AUXSIGNAL_INVALID            : YAPI.INVALID_INT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YStepperMotor implementation)
}

//
// YStepperMotorProxy Class: synchronous proxy to YStepperMotor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YStepperMotor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YStepperMotorProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YStepperMotor accessors declaration)

    /**
     * Returns the motor working state.
     *
     * @return a value among Y_MOTORSTATE_ABSENT, Y_MOTORSTATE_ALERT, Y_MOTORSTATE_HI_Z,
     * Y_MOTORSTATE_STOP, Y_MOTORSTATE_RUN and Y_MOTORSTATE_BATCH corresponding to the motor working state
     *
     * On failure, throws an exception or returns Y_MOTORSTATE_INVALID.
     */
    get_motorState()
    {
        return this.liveFunc._motorState;
    }

    /**
     * Returns the stepper motor controller diagnostics, as a bitmap.
     *
     * @return an integer corresponding to the stepper motor controller diagnostics, as a bitmap
     *
     * On failure, throws an exception or returns Y_DIAGS_INVALID.
     */
    get_diags()
    {
        return this.liveFunc._diags;
    }

    /**
     * Changes the current logical motor position, measured in steps.
     * This command does not cause any motor move, as its purpose is only to setup
     * the origin of the position counter. The fractional part of the position,
     * that corresponds to the physical position of the rotor, is not changed.
     * To trigger a motor move, use methods moveTo() or moveRel()
     * instead.
     *
     * @param newval : a floating point number corresponding to the current logical motor position, measured in steps
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stepPos(newval)
    {
        this.liveFunc.set_stepPos(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current logical motor position, measured in steps.
     * The value may include a fractional part when micro-stepping is in use.
     *
     * @return a floating point number corresponding to the current logical motor position, measured in steps
     *
     * On failure, throws an exception or returns Y_STEPPOS_INVALID.
     */
    get_stepPos()
    {
        return this.liveFunc._stepPos;
    }

    /**
     * Returns current motor speed, measured in steps per second.
     * To change speed, use method changeSpeed().
     *
     * @return a floating point number corresponding to current motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns Y_SPEED_INVALID.
     */
    get_speed()
    {
        return this.liveFunc._speed;
    }

    /**
     * Changes the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the motor speed immediately reachable from
     * stop state, measured in steps per second
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pullinSpeed(newval)
    {
        this.liveFunc.set_pullinSpeed(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @return a floating point number corresponding to the motor speed immediately reachable from stop
     * state, measured in steps per second
     *
     * On failure, throws an exception or returns Y_PULLINSPEED_INVALID.
     */
    get_pullinSpeed()
    {
        return this.liveFunc._pullinSpeed;
    }

    /**
     * Changes the maximal motor acceleration, measured in steps per second^2.
     *
     * @param newval : a floating point number corresponding to the maximal motor acceleration, measured
     * in steps per second^2
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxAccel(newval)
    {
        this.liveFunc.set_maxAccel(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximal motor acceleration, measured in steps per second^2.
     *
     * @return a floating point number corresponding to the maximal motor acceleration, measured in steps per second^2
     *
     * On failure, throws an exception or returns Y_MAXACCEL_INVALID.
     */
    get_maxAccel()
    {
        return this.liveFunc._maxAccel;
    }

    /**
     * Changes the maximal motor speed, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxSpeed(newval)
    {
        this.liveFunc.set_maxSpeed(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximal motor speed, measured in steps per second.
     *
     * @return a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns Y_MAXSPEED_INVALID.
     */
    get_maxSpeed()
    {
        return this.liveFunc._maxSpeed;
    }

    /**
     * Returns the stepping mode used to drive the motor.
     *
     * @return a value among Y_STEPPING_MICROSTEP16, Y_STEPPING_MICROSTEP8, Y_STEPPING_MICROSTEP4,
     * Y_STEPPING_HALFSTEP and Y_STEPPING_FULLSTEP corresponding to the stepping mode used to drive the motor
     *
     * On failure, throws an exception or returns Y_STEPPING_INVALID.
     */
    get_stepping()
    {
        return this.liveFunc._stepping;
    }

    /**
     * Changes the stepping mode used to drive the motor.
     *
     * @param newval : a value among Y_STEPPING_MICROSTEP16, Y_STEPPING_MICROSTEP8, Y_STEPPING_MICROSTEP4,
     * Y_STEPPING_HALFSTEP and Y_STEPPING_FULLSTEP corresponding to the stepping mode used to drive the motor
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stepping(newval)
    {
        this.liveFunc.set_stepping(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @return an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * On failure, throws an exception or returns Y_OVERCURRENT_INVALID.
     */
    get_overcurrent()
    {
        return this.liveFunc._overcurrent;
    }

    /**
     * Changes the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @param newval : an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_overcurrent(newval)
    {
        this.liveFunc.set_overcurrent(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the torque regulation current when the motor is stopped, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is stopped, measured in mA
     *
     * On failure, throws an exception or returns Y_TCURRSTOP_INVALID.
     */
    get_tCurrStop()
    {
        return this.liveFunc._tCurrStop;
    }

    /**
     * Changes the torque regulation current when the motor is stopped, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * stopped, measured in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tCurrStop(newval)
    {
        this.liveFunc.set_tCurrStop(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the torque regulation current when the motor is running, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is running, measured in mA
     *
     * On failure, throws an exception or returns Y_TCURRRUN_INVALID.
     */
    get_tCurrRun()
    {
        return this.liveFunc._tCurrRun;
    }

    /**
     * Changes the torque regulation current when the motor is running, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * running, measured in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tCurrRun(newval)
    {
        this.liveFunc.set_tCurrRun(newval);
        return this._yapi.SUCCESS;
    }

    get_alertMode()
    {
        return this.liveFunc._alertMode;
    }

    set_alertMode(newval)
    {
        this.liveFunc.set_alertMode(newval);
        return this._yapi.SUCCESS;
    }

    get_auxMode()
    {
        return this.liveFunc._auxMode;
    }

    set_auxMode(newval)
    {
        this.liveFunc.set_auxMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current value of the signal generated on the auxiliary output.
     *
     * @return an integer corresponding to the current value of the signal generated on the auxiliary output
     *
     * On failure, throws an exception or returns Y_AUXSIGNAL_INVALID.
     */
    get_auxSignal()
    {
        return this.liveFunc._auxSignal;
    }

    /**
     * Changes the value of the signal generated on the auxiliary output.
     * Acceptable values depend on the auxiliary output signal type configured.
     *
     * @param newval : an integer corresponding to the value of the signal generated on the auxiliary output
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_auxSignal(newval)
    {
        this.liveFunc.set_auxSignal(newval);
        return this._yapi.SUCCESS;
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
     * Reinitialize the controller and clear all alert flags.
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
     * Starts the motor backward at the specified speed, to search for the motor home position.
     *
     * @param speed : desired speed, in steps per second.
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
     * Starts the motor at a given speed. The time needed to reach the requested speed
     * will depend on the acceleration parameters configured for the motor.
     *
     * @param speed : desired speed, in steps per second. The minimal non-zero speed
     *         is 0.001 pulse per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    changeSpeed(speed)
    {
        this.liveFunc.changeSpeed(speed);
        return YAPI_SUCCESS;
    }

    /**
     * Starts the motor to reach a given absolute position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param absPos : absolute position, measured in steps from the origin.
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
     * Starts the motor to reach a given relative position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
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
     * Move one step in the direction opposite the direction set when the most recent alert was raised.
     * The move occures even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    alertStepOut()
    {
        this.liveFunc.alertStepOut();
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
    //--- (end of YStepperMotor accessors declaration)
}

//--- (YStepperMotor functions)

YoctoLibExport('YStepperMotor', YStepperMotor);
YoctoLibExport('YStepperMotorProxy', YStepperMotorProxy);
YStepperMotor.imm_Init();

//--- (end of YStepperMotor functions)
