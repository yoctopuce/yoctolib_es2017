/*********************************************************************
 *
 * $Id: yocto_bluetoothlink.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for BluetoothLink functions
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

//--- (YBluetoothLink return codes)
//--- (end of YBluetoothLink return codes)
//--- (YBluetoothLink definitions)
//--- (end of YBluetoothLink definitions)

//--- (YBluetoothLink class start)
/**
 * YBluetoothLink Class: BluetoothLink function interface
 *
 * BluetoothLink function provides control over bluetooth link
 * and status for devices that are bluetooth-enabled.
 */
//--- (end of YBluetoothLink class start)

class YBluetoothLink extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YBluetoothLink constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'BluetoothLink';
        /** @member {string} **/
        this._ownAddress                 = YBluetoothLink.OWNADDRESS_INVALID;
        /** @member {string} **/
        this._pairingPin                 = YBluetoothLink.PAIRINGPIN_INVALID;
        /** @member {string} **/
        this._remoteAddress              = YBluetoothLink.REMOTEADDRESS_INVALID;
        /** @member {string} **/
        this._remoteName                 = YBluetoothLink.REMOTENAME_INVALID;
        /** @member {number} **/
        this._mute                       = YBluetoothLink.MUTE_INVALID;
        /** @member {number} **/
        this._preAmplifier               = YBluetoothLink.PREAMPLIFIER_INVALID;
        /** @member {number} **/
        this._volume                     = YBluetoothLink.VOLUME_INVALID;
        /** @member {number} **/
        this._linkState                  = YBluetoothLink.LINKSTATE_INVALID;
        /** @member {number} **/
        this._linkQuality                = YBluetoothLink.LINKQUALITY_INVALID;
        /** @member {string} **/
        this._command                    = YBluetoothLink.COMMAND_INVALID;
        //--- (end of YBluetoothLink constructor)
    }

    //--- (YBluetoothLink implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'ownAddress':
            this._ownAddress = val;
            return 1;
        case 'pairingPin':
            this._pairingPin = val;
            return 1;
        case 'remoteAddress':
            this._remoteAddress = val;
            return 1;
        case 'remoteName':
            this._remoteName = val;
            return 1;
        case 'mute':
            this._mute = parseInt(val);
            return 1;
        case 'preAmplifier':
            this._preAmplifier = parseInt(val);
            return 1;
        case 'volume':
            this._volume = parseInt(val);
            return 1;
        case 'linkState':
            this._linkState = parseInt(val);
            return 1;
        case 'linkQuality':
            this._linkQuality = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the MAC-48 address of the bluetooth interface, which is unique on the bluetooth network.
     *
     * @return {string} a string corresponding to the MAC-48 address of the bluetooth interface, which is
     * unique on the bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.OWNADDRESS_INVALID.
     */
    async get_ownAddress()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.OWNADDRESS_INVALID;
            }
        }
        res = this._ownAddress;
        return res;
    }

    /**
     * Returns an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @return {string} a string corresponding to an opaque string if a PIN code has been configured in
     * the device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     *
     * On failure, throws an exception or returns YBluetoothLink.PAIRINGPIN_INVALID.
     */
    async get_pairingPin()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.PAIRINGPIN_INVALID;
            }
        }
        res = this._pairingPin;
        return res;
    }

    /**
     * Changes the PIN code used by the module for bluetooth pairing.
     * Remember to call the saveToFlash() method of the module to save the
     * new value in the device flash.
     *
     * @param newval {string} : a string corresponding to the PIN code used by the module for bluetooth pairing
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_pairingPin(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('pairingPin',rest_val);
    }

    /**
     * Returns the MAC-48 address of the remote device to connect to.
     *
     * @return {string} a string corresponding to the MAC-48 address of the remote device to connect to
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTEADDRESS_INVALID.
     */
    async get_remoteAddress()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.REMOTEADDRESS_INVALID;
            }
        }
        res = this._remoteAddress;
        return res;
    }

    /**
     * Changes the MAC-48 address defining which remote device to connect to.
     *
     * @param newval {string} : a string corresponding to the MAC-48 address defining which remote device to connect to
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_remoteAddress(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('remoteAddress',rest_val);
    }

    /**
     * Returns the bluetooth name the remote device, if found on the bluetooth network.
     *
     * @return {string} a string corresponding to the bluetooth name the remote device, if found on the
     * bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTENAME_INVALID.
     */
    async get_remoteName()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.REMOTENAME_INVALID;
            }
        }
        res = this._remoteName;
        return res;
    }

    /**
     * Returns the state of the mute function.
     *
     * @return {number} either YBluetoothLink.MUTE_FALSE or YBluetoothLink.MUTE_TRUE, according to the
     * state of the mute function
     *
     * On failure, throws an exception or returns YBluetoothLink.MUTE_INVALID.
     */
    async get_mute()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.MUTE_INVALID;
            }
        }
        res = this._mute;
        return res;
    }

    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval {number} : either YBluetoothLink.MUTE_FALSE or YBluetoothLink.MUTE_TRUE, according to
     * the state of the mute function
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
     * Returns the audio pre-amplifier volume, in per cents.
     *
     * @return {number} an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.PREAMPLIFIER_INVALID.
     */
    async get_preAmplifier()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.PREAMPLIFIER_INVALID;
            }
        }
        res = this._preAmplifier;
        return res;
    }

    /**
     * Changes the audio pre-amplifier volume, in per cents.
     *
     * @param newval {number} : an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_preAmplifier(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('preAmplifier',rest_val);
    }

    /**
     * Returns the connected headset volume, in per cents.
     *
     * @return {number} an integer corresponding to the connected headset volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.VOLUME_INVALID.
     */
    async get_volume()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }

    /**
     * Changes the connected headset volume, in per cents.
     *
     * @param newval {number} : an integer corresponding to the connected headset volume, in per cents
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
     * Returns the bluetooth link state.
     *
     * @return {number} a value among YBluetoothLink.LINKSTATE_DOWN, YBluetoothLink.LINKSTATE_FREE,
     * YBluetoothLink.LINKSTATE_SEARCH, YBluetoothLink.LINKSTATE_EXISTS, YBluetoothLink.LINKSTATE_LINKED
     * and YBluetoothLink.LINKSTATE_PLAY corresponding to the bluetooth link state
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKSTATE_INVALID.
     */
    async get_linkState()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.LINKSTATE_INVALID;
            }
        }
        res = this._linkState;
        return res;
    }

    /**
     * Returns the bluetooth receiver signal strength, in pourcents, or 0 if no connection is established.
     *
     * @return {number} an integer corresponding to the bluetooth receiver signal strength, in pourcents,
     * or 0 if no connection is established
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKQUALITY_INVALID.
     */
    async get_linkQuality()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.LINKQUALITY_INVALID;
            }
        }
        res = this._linkQuality;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.COMMAND_INVALID;
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
     * Retrieves a cellular interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the cellular interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBluetoothLink.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the cellular interface
     *
     * @return {YBluetoothLink} a YBluetoothLink object allowing you to drive the cellular interface.
     */
    static FindBluetoothLink(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('BluetoothLink', func);
        if (obj == null) {
            obj = new YBluetoothLink(YAPI, func);
            YFunction._AddToCache('BluetoothLink',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a cellular interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the cellular interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBluetoothLink.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the cellular interface
     *
     * @return {YBluetoothLink} a YBluetoothLink object allowing you to drive the cellular interface.
     */
    static FindBluetoothLinkInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'BluetoothLink', func);
        if (obj == null) {
            obj = new YBluetoothLink(yctx, func);
            YFunction._AddToCache('BluetoothLink',  func, obj);
        }
        return obj;
    }

    /**
     * Attempt to connect to the previously selected remote device.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async connect()
    {
        return await this.set_command('C');
    }

    /**
     * Disconnect from the previously selected remote device.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async disconnect()
    {
        return await this.set_command('D');
    }

    /**
     * Continues the enumeration of cellular interfaces started using yFirstBluetoothLink().
     *
     * @return {YBluetoothLink} a pointer to a YBluetoothLink object, corresponding to
     *         a cellular interface currently online, or a null pointer
     *         if there are no more cellular interfaces to enumerate.
     */
    nextBluetoothLink()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YBluetoothLink.FindBluetoothLinkInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
     * next cellular interfaces.
     *
     * @return {YBluetoothLink} a pointer to a YBluetoothLink object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstBluetoothLink()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('BluetoothLink');
        if(next_hwid == null) return null;
        return YBluetoothLink.FindBluetoothLink(next_hwid);
    }

    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
     * next cellular interfaces.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YBluetoothLink} a pointer to a YBluetoothLink object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstBluetoothLinkInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('BluetoothLink');
        if(next_hwid == null) return null;
        return YBluetoothLink.FindBluetoothLinkInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            OWNADDRESS_INVALID           : YAPI.INVALID_STRING,
            PAIRINGPIN_INVALID           : YAPI.INVALID_STRING,
            REMOTEADDRESS_INVALID        : YAPI.INVALID_STRING,
            REMOTENAME_INVALID           : YAPI.INVALID_STRING,
            MUTE_FALSE                   : 0,
            MUTE_TRUE                    : 1,
            MUTE_INVALID                 : -1,
            PREAMPLIFIER_INVALID         : YAPI.INVALID_UINT,
            VOLUME_INVALID               : YAPI.INVALID_UINT,
            LINKSTATE_DOWN               : 0,
            LINKSTATE_FREE               : 1,
            LINKSTATE_SEARCH             : 2,
            LINKSTATE_EXISTS             : 3,
            LINKSTATE_LINKED             : 4,
            LINKSTATE_PLAY               : 5,
            LINKSTATE_INVALID            : -1,
            LINKQUALITY_INVALID          : YAPI.INVALID_UINT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YBluetoothLink implementation)
}

//
// YBluetoothLinkProxy Class: synchronous proxy to YBluetoothLink objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YBluetoothLink objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YBluetoothLinkProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YBluetoothLink accessors declaration)

    /**
     * Returns the MAC-48 address of the bluetooth interface, which is unique on the bluetooth network.
     *
     * @return a string corresponding to the MAC-48 address of the bluetooth interface, which is unique on
     * the bluetooth network
     *
     * On failure, throws an exception or returns Y_OWNADDRESS_INVALID.
     */
    get_ownAddress()
    {
        return this.liveFunc._ownAddress;
    }

    /**
     * Returns an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @return a string corresponding to an opaque string if a PIN code has been configured in the device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     *
     * On failure, throws an exception or returns Y_PAIRINGPIN_INVALID.
     */
    get_pairingPin()
    {
        return this.liveFunc._pairingPin;
    }

    /**
     * Changes the PIN code used by the module for bluetooth pairing.
     * Remember to call the saveToFlash() method of the module to save the
     * new value in the device flash.
     *
     * @param newval : a string corresponding to the PIN code used by the module for bluetooth pairing
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pairingPin(newval)
    {
        this.liveFunc.set_pairingPin(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the MAC-48 address of the remote device to connect to.
     *
     * @return a string corresponding to the MAC-48 address of the remote device to connect to
     *
     * On failure, throws an exception or returns Y_REMOTEADDRESS_INVALID.
     */
    get_remoteAddress()
    {
        return this.liveFunc._remoteAddress;
    }

    /**
     * Changes the MAC-48 address defining which remote device to connect to.
     *
     * @param newval : a string corresponding to the MAC-48 address defining which remote device to connect to
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_remoteAddress(newval)
    {
        this.liveFunc.set_remoteAddress(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the bluetooth name the remote device, if found on the bluetooth network.
     *
     * @return a string corresponding to the bluetooth name the remote device, if found on the bluetooth network
     *
     * On failure, throws an exception or returns Y_REMOTENAME_INVALID.
     */
    get_remoteName()
    {
        return this.liveFunc._remoteName;
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
     * Returns the audio pre-amplifier volume, in per cents.
     *
     * @return an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * On failure, throws an exception or returns Y_PREAMPLIFIER_INVALID.
     */
    get_preAmplifier()
    {
        return this.liveFunc._preAmplifier;
    }

    /**
     * Changes the audio pre-amplifier volume, in per cents.
     *
     * @param newval : an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_preAmplifier(newval)
    {
        this.liveFunc.set_preAmplifier(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the connected headset volume, in per cents.
     *
     * @return an integer corresponding to the connected headset volume, in per cents
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    get_volume()
    {
        return this.liveFunc._volume;
    }

    /**
     * Changes the connected headset volume, in per cents.
     *
     * @param newval : an integer corresponding to the connected headset volume, in per cents
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
     * Returns the bluetooth link state.
     *
     * @return a value among Y_LINKSTATE_DOWN, Y_LINKSTATE_FREE, Y_LINKSTATE_SEARCH, Y_LINKSTATE_EXISTS,
     * Y_LINKSTATE_LINKED and Y_LINKSTATE_PLAY corresponding to the bluetooth link state
     *
     * On failure, throws an exception or returns Y_LINKSTATE_INVALID.
     */
    get_linkState()
    {
        return this.liveFunc._linkState;
    }

    /**
     * Returns the bluetooth receiver signal strength, in pourcents, or 0 if no connection is established.
     *
     * @return an integer corresponding to the bluetooth receiver signal strength, in pourcents, or 0 if
     * no connection is established
     *
     * On failure, throws an exception or returns Y_LINKQUALITY_INVALID.
     */
    get_linkQuality()
    {
        return this.liveFunc._linkQuality;
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
     * Attempt to connect to the previously selected remote device.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    connect()
    {
        this.liveFunc.connect();
        return YAPI_SUCCESS;
    }

    /**
     * Disconnect from the previously selected remote device.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    disconnect()
    {
        this.liveFunc.disconnect();
        return YAPI_SUCCESS;
    }
    //--- (end of YBluetoothLink accessors declaration)
}

//--- (YBluetoothLink functions)

YoctoLibExport('YBluetoothLink', YBluetoothLink);
YoctoLibExport('YBluetoothLinkProxy', YBluetoothLinkProxy);
YBluetoothLink.imm_Init();

//--- (end of YBluetoothLink functions)
