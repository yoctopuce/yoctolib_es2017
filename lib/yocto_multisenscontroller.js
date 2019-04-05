/*********************************************************************
 *
 *  $Id: yocto_multisenscontroller.js 34975 2019-04-04 17:01:43Z seb $
 *
 *  Implements the high-level API for MultiSensController functions
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

//--- (YMultiSensController return codes)
//--- (end of YMultiSensController return codes)
//--- (YMultiSensController definitions)
//--- (end of YMultiSensController definitions)

//--- (YMultiSensController class start)
/**
 * YMultiSensController Class: MultiSensController function interface
 *
 * The Yoctopuce application programming interface allows you to setup a customized
 * sensor chain.
 */
//--- (end of YMultiSensController class start)

class YMultiSensController extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YMultiSensController constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'MultiSensController';
        /** @member {number} **/
        this._nSensors                   = YMultiSensController.NSENSORS_INVALID;
        /** @member {number} **/
        this._maxSensors                 = YMultiSensController.MAXSENSORS_INVALID;
        /** @member {number} **/
        this._maintenanceMode            = YMultiSensController.MAINTENANCEMODE_INVALID;
        /** @member {string} **/
        this._command                    = YMultiSensController.COMMAND_INVALID;
        //--- (end of YMultiSensController constructor)
    }

    //--- (YMultiSensController implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'nSensors':
            this._nSensors = parseInt(val);
            return 1;
        case 'maxSensors':
            this._maxSensors = parseInt(val);
            return 1;
        case 'maintenanceMode':
            this._maintenanceMode = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of sensors to poll.
     *
     * @return {number} an integer corresponding to the number of sensors to poll
     *
     * On failure, throws an exception or returns YMultiSensController.NSENSORS_INVALID.
     */
    async get_nSensors()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiSensController.NSENSORS_INVALID;
            }
        }
        res = this._nSensors;
        return res;
    }

    /**
     * Changes the number of sensors to poll. Remember to call the
     * saveToFlash() method of the module if the
     * modification must be kept. It is recommended to restart the
     * device with  module->reboot() after modifying
     * (and saving) this settings
     *
     * @param newval {number} : an integer corresponding to the number of sensors to poll
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_nSensors(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('nSensors',rest_val);
    }

    /**
     * Returns the maximum configurable sensor count allowed on this device.
     *
     * @return {number} an integer corresponding to the maximum configurable sensor count allowed on this device
     *
     * On failure, throws an exception or returns YMultiSensController.MAXSENSORS_INVALID.
     */
    async get_maxSensors()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiSensController.MAXSENSORS_INVALID;
            }
        }
        res = this._maxSensors;
        return res;
    }

    /**
     * Returns true when the device is in maintenance mode.
     *
     * @return {number} either YMultiSensController.MAINTENANCEMODE_FALSE or
     * YMultiSensController.MAINTENANCEMODE_TRUE, according to true when the device is in maintenance mode
     *
     * On failure, throws an exception or returns YMultiSensController.MAINTENANCEMODE_INVALID.
     */
    async get_maintenanceMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiSensController.MAINTENANCEMODE_INVALID;
            }
        }
        res = this._maintenanceMode;
        return res;
    }

    /**
     * Changes the device mode to enable maintenance and to stop sensor polling.
     * This way, the device does not automatically restart when it cannot
     * communicate with one of the sensors.
     *
     * @param newval {number} : either YMultiSensController.MAINTENANCEMODE_FALSE or
     * YMultiSensController.MAINTENANCEMODE_TRUE, according to the device mode to enable maintenance and
     * to stop sensor polling
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maintenanceMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('maintenanceMode',rest_val);
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiSensController.COMMAND_INVALID;
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
     * Retrieves a multi-sensor controller for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-sensor controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiSensController.isOnline() to test if the multi-sensor controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-sensor controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the multi-sensor controller
     *
     * @return {YMultiSensController} a YMultiSensController object allowing you to drive the multi-sensor controller.
     */
    static FindMultiSensController(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('MultiSensController', func);
        if (obj == null) {
            obj = new YMultiSensController(YAPI, func);
            YFunction._AddToCache('MultiSensController',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a multi-sensor controller for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-sensor controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiSensController.isOnline() to test if the multi-sensor controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-sensor controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the multi-sensor controller
     *
     * @return {YMultiSensController} a YMultiSensController object allowing you to drive the multi-sensor controller.
     */
    static FindMultiSensControllerInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'MultiSensController', func);
        if (obj == null) {
            obj = new YMultiSensController(yctx, func);
            YFunction._AddToCache('MultiSensController',  func, obj);
        }
        return obj;
    }

    /**
     * Configures the I2C address of the only sensor connected to the device.
     * It is recommended to put the the device in maintenance mode before
     * changing sensor addresses.  This method is only intended to work with a single
     * sensor connected to the device, if several sensors are connected, the result
     * is unpredictable.
     * Note that the device is probably expecting to find a string of sensors with specific
     * addresses. Check the device documentation to find out which addresses should be used.
     *
     * @param addr {number} : new address of the connected sensor
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async setupAddress(addr)
    {
        /** @type {string} **/
        let cmd;
        cmd = 'A'+String(Math.round(addr));
        return await this.set_command(cmd);
    }

    /**
     * Continues the enumeration of multi-sensor controllers started using yFirstMultiSensController().
     * Caution: You can't make any assumption about the returned multi-sensor controllers order.
     * If you want to find a specific a multi-sensor controller, use MultiSensController.findMultiSensController()
     * and a hardwareID or a logical name.
     *
     * @return {YMultiSensController} a pointer to a YMultiSensController object, corresponding to
     *         a multi-sensor controller currently online, or a null pointer
     *         if there are no more multi-sensor controllers to enumerate.
     */
    nextMultiSensController()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMultiSensController.FindMultiSensControllerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of multi-sensor controllers currently accessible.
     * Use the method YMultiSensController.nextMultiSensController() to iterate on
     * next multi-sensor controllers.
     *
     * @return {YMultiSensController} a pointer to a YMultiSensController object, corresponding to
     *         the first multi-sensor controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiSensController()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('MultiSensController');
        if(next_hwid == null) return null;
        return YMultiSensController.FindMultiSensController(next_hwid);
    }

    /**
     * Starts the enumeration of multi-sensor controllers currently accessible.
     * Use the method YMultiSensController.nextMultiSensController() to iterate on
     * next multi-sensor controllers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMultiSensController} a pointer to a YMultiSensController object, corresponding to
     *         the first multi-sensor controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiSensControllerInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('MultiSensController');
        if(next_hwid == null) return null;
        return YMultiSensController.FindMultiSensControllerInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            NSENSORS_INVALID             : YAPI.INVALID_UINT,
            MAXSENSORS_INVALID           : YAPI.INVALID_UINT,
            MAINTENANCEMODE_FALSE        : 0,
            MAINTENANCEMODE_TRUE         : 1,
            MAINTENANCEMODE_INVALID      : -1,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YMultiSensController implementation)
}

//
// YMultiSensControllerProxy Class: synchronous proxy to YMultiSensController objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YMultiSensController objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YMultiSensControllerProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YMultiSensController accessors declaration)

    /**
     * Returns the number of sensors to poll.
     *
     * @return an integer corresponding to the number of sensors to poll
     *
     * On failure, throws an exception or returns Y_NSENSORS_INVALID.
     */
    get_nSensors()
    {
        return this.liveFunc._nSensors;
    }

    /**
     * Changes the number of sensors to poll. Remember to call the
     * saveToFlash() method of the module if the
     * modification must be kept. It is recommended to restart the
     * device with  module->reboot() after modifying
     * (and saving) this settings
     *
     * @param newval : an integer corresponding to the number of sensors to poll
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nSensors(newval)
    {
        this.liveFunc.set_nSensors(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximum configurable sensor count allowed on this device.
     *
     * @return an integer corresponding to the maximum configurable sensor count allowed on this device
     *
     * On failure, throws an exception or returns Y_MAXSENSORS_INVALID.
     */
    get_maxSensors()
    {
        return this.liveFunc._maxSensors;
    }

    /**
     * Returns true when the device is in maintenance mode.
     *
     * @return either Y_MAINTENANCEMODE_FALSE or Y_MAINTENANCEMODE_TRUE, according to true when the device
     * is in maintenance mode
     *
     * On failure, throws an exception or returns Y_MAINTENANCEMODE_INVALID.
     */
    get_maintenanceMode()
    {
        return this.liveFunc._maintenanceMode;
    }

    /**
     * Changes the device mode to enable maintenance and to stop sensor polling.
     * This way, the device does not automatically restart when it cannot
     * communicate with one of the sensors.
     *
     * @param newval : either Y_MAINTENANCEMODE_FALSE or Y_MAINTENANCEMODE_TRUE, according to the device
     * mode to enable maintenance and to stop sensor polling
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maintenanceMode(newval)
    {
        this.liveFunc.set_maintenanceMode(newval);
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

    /**
     * Configures the I2C address of the only sensor connected to the device.
     * It is recommended to put the the device in maintenance mode before
     * changing sensor addresses.  This method is only intended to work with a single
     * sensor connected to the device, if several sensors are connected, the result
     * is unpredictable.
     * Note that the device is probably expecting to find a string of sensors with specific
     * addresses. Check the device documentation to find out which addresses should be used.
     *
     * @param addr : new address of the connected sensor
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    setupAddress(addr)
    {
        this.liveFunc.setupAddress(addr);
        return YAPI_SUCCESS;
    }
    //--- (end of YMultiSensController accessors declaration)
}

//--- (YMultiSensController functions)

YoctoLibExport('YMultiSensController', YMultiSensController);
YoctoLibExport('YMultiSensControllerProxy', YMultiSensControllerProxy);
YMultiSensController.imm_Init();

//--- (end of YMultiSensController functions)
