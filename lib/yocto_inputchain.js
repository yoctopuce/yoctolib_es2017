/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for InputChain functions
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

//--- (YInputChain return codes)
//--- (end of YInputChain return codes)
//--- (YInputChain definitions)
//--- (end of YInputChain definitions)

async function yInternalEventCallback(YInputChain_obj, str_value)
{
    await YInputChain_obj._internalEventHandler(str_value);
}

//--- (YInputChain class start)
/**
 * YInputChain Class: InputChain function interface
 *
 * The YInputChain class provides access to separate
 * digital inputs connected in a chain.
 */
//--- (end of YInputChain class start)

class YInputChain extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YInputChain constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'InputChain';
        /** @member {number} **/
        this._expectedNodes              = YInputChain.EXPECTEDNODES_INVALID;
        /** @member {number} **/
        this._detectedNodes              = YInputChain.DETECTEDNODES_INVALID;
        /** @member {number} **/
        this._loopbackTest               = YInputChain.LOOPBACKTEST_INVALID;
        /** @member {number} **/
        this._refreshRate                = YInputChain.REFRESHRATE_INVALID;
        /** @member {string} **/
        this._bitChain1                  = YInputChain.BITCHAIN1_INVALID;
        /** @member {string} **/
        this._bitChain2                  = YInputChain.BITCHAIN2_INVALID;
        /** @member {string} **/
        this._bitChain3                  = YInputChain.BITCHAIN3_INVALID;
        /** @member {string} **/
        this._bitChain4                  = YInputChain.BITCHAIN4_INVALID;
        /** @member {string} **/
        this._bitChain5                  = YInputChain.BITCHAIN5_INVALID;
        /** @member {string} **/
        this._bitChain6                  = YInputChain.BITCHAIN6_INVALID;
        /** @member {string} **/
        this._bitChain7                  = YInputChain.BITCHAIN7_INVALID;
        /** @member {number} **/
        this._watchdogPeriod             = YInputChain.WATCHDOGPERIOD_INVALID;
        /** @member {number} **/
        this._chainDiags                 = YInputChain.CHAINDIAGS_INVALID;
        /** @member {function} **/
        this._stateChangeCallback        = null;
        /** @member {number} **/
        this._prevPos                    = 0;
        /** @member {number} **/
        this._eventPos                   = 0;
        /** @member {number} **/
        this._eventStamp                 = 0;
        /** @member {string[]} **/
        this._eventChains                = [];
        //--- (end of YInputChain constructor)
    }

    //--- (YInputChain implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'expectedNodes':
            this._expectedNodes = parseInt(val);
            return 1;
        case 'detectedNodes':
            this._detectedNodes = parseInt(val);
            return 1;
        case 'loopbackTest':
            this._loopbackTest = parseInt(val);
            return 1;
        case 'refreshRate':
            this._refreshRate = parseInt(val);
            return 1;
        case 'bitChain1':
            this._bitChain1 = val;
            return 1;
        case 'bitChain2':
            this._bitChain2 = val;
            return 1;
        case 'bitChain3':
            this._bitChain3 = val;
            return 1;
        case 'bitChain4':
            this._bitChain4 = val;
            return 1;
        case 'bitChain5':
            this._bitChain5 = val;
            return 1;
        case 'bitChain6':
            this._bitChain6 = val;
            return 1;
        case 'bitChain7':
            this._bitChain7 = val;
            return 1;
        case 'watchdogPeriod':
            this._watchdogPeriod = parseInt(val);
            return 1;
        case 'chainDiags':
            this._chainDiags = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of nodes expected in the chain.
     *
     * @return {Promise<number>} an integer corresponding to the number of nodes expected in the chain
     *
     * On failure, throws an exception or returns YInputChain.EXPECTEDNODES_INVALID.
     */
    async get_expectedNodes()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.EXPECTEDNODES_INVALID;
            }
        }
        res = this._expectedNodes;
        return res;
    }

    /**
     * Changes the number of nodes expected in the chain.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the number of nodes expected in the chain
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_expectedNodes(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('expectedNodes',rest_val);
    }

    /**
     * Returns the number of nodes detected in the chain.
     *
     * @return {Promise<number>} an integer corresponding to the number of nodes detected in the chain
     *
     * On failure, throws an exception or returns YInputChain.DETECTEDNODES_INVALID.
     */
    async get_detectedNodes()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.DETECTEDNODES_INVALID;
            }
        }
        res = this._detectedNodes;
        return res;
    }

    /**
     * Returns the activation state of the exhaustive chain connectivity test.
     * The connectivity test requires a cable connecting the end of the chain
     * to the loopback test connector.
     *
     * @return {Promise<number>} either YInputChain.LOOPBACKTEST_OFF or YInputChain.LOOPBACKTEST_ON,
     * according to the activation state of the exhaustive chain connectivity test
     *
     * On failure, throws an exception or returns YInputChain.LOOPBACKTEST_INVALID.
     */
    async get_loopbackTest()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.LOOPBACKTEST_INVALID;
            }
        }
        res = this._loopbackTest;
        return res;
    }

    /**
     * Changes the activation state of the exhaustive chain connectivity test.
     * The connectivity test requires a cable connecting the end of the chain
     * to the loopback test connector.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval {number} : either YInputChain.LOOPBACKTEST_OFF or YInputChain.LOOPBACKTEST_ON,
     * according to the activation state of the exhaustive chain connectivity test
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_loopbackTest(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('loopbackTest',rest_val);
    }

    /**
     * Returns the desired refresh rate, measured in Hz.
     * The higher the refresh rate is set, the higher the
     * communication speed on the chain will be.
     *
     * @return {Promise<number>} an integer corresponding to the desired refresh rate, measured in Hz
     *
     * On failure, throws an exception or returns YInputChain.REFRESHRATE_INVALID.
     */
    async get_refreshRate()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.REFRESHRATE_INVALID;
            }
        }
        res = this._refreshRate;
        return res;
    }

    /**
     * Changes the desired refresh rate, measured in Hz.
     * The higher the refresh rate is set, the higher the
     * communication speed on the chain will be.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the desired refresh rate, measured in Hz
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_refreshRate(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('refreshRate',rest_val);
    }

    /**
     * Returns the state of input 1 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return {Promise<string>} a string corresponding to the state of input 1 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN1_INVALID.
     */
    async get_bitChain1()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.BITCHAIN1_INVALID;
            }
        }
        res = this._bitChain1;
        return res;
    }

    /**
     * Returns the state of input 2 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return {Promise<string>} a string corresponding to the state of input 2 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN2_INVALID.
     */
    async get_bitChain2()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.BITCHAIN2_INVALID;
            }
        }
        res = this._bitChain2;
        return res;
    }

    /**
     * Returns the state of input 3 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return {Promise<string>} a string corresponding to the state of input 3 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN3_INVALID.
     */
    async get_bitChain3()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.BITCHAIN3_INVALID;
            }
        }
        res = this._bitChain3;
        return res;
    }

    /**
     * Returns the state of input 4 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return {Promise<string>} a string corresponding to the state of input 4 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN4_INVALID.
     */
    async get_bitChain4()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.BITCHAIN4_INVALID;
            }
        }
        res = this._bitChain4;
        return res;
    }

    /**
     * Returns the state of input 5 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return {Promise<string>} a string corresponding to the state of input 5 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN5_INVALID.
     */
    async get_bitChain5()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.BITCHAIN5_INVALID;
            }
        }
        res = this._bitChain5;
        return res;
    }

    /**
     * Returns the state of input 6 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return {Promise<string>} a string corresponding to the state of input 6 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN6_INVALID.
     */
    async get_bitChain6()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.BITCHAIN6_INVALID;
            }
        }
        res = this._bitChain6;
        return res;
    }

    /**
     * Returns the state of input 7 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return {Promise<string>} a string corresponding to the state of input 7 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN7_INVALID.
     */
    async get_bitChain7()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.BITCHAIN7_INVALID;
            }
        }
        res = this._bitChain7;
        return res;
    }

    /**
     * Returns the wait time in seconds before triggering an inactivity
     * timeout error.
     *
     * @return {Promise<number>} an integer corresponding to the wait time in seconds before triggering an inactivity
     *         timeout error
     *
     * On failure, throws an exception or returns YInputChain.WATCHDOGPERIOD_INVALID.
     */
    async get_watchdogPeriod()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.WATCHDOGPERIOD_INVALID;
            }
        }
        res = this._watchdogPeriod;
        return res;
    }

    /**
     * Changes the wait time in seconds before triggering an inactivity
     * timeout error. Remember to call the saveToFlash() method
     * of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the wait time in seconds before triggering an inactivity
     *         timeout error
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_watchdogPeriod(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('watchdogPeriod',rest_val);
    }

    /**
     * Returns the controller state diagnostics. Bit 0 indicates a chain length
     * error, bit 1 indicates an inactivity timeout and bit 2 indicates
     * a loopback test failure.
     *
     * @return {Promise<number>} an integer corresponding to the controller state diagnostics
     *
     * On failure, throws an exception or returns YInputChain.CHAINDIAGS_INVALID.
     */
    async get_chainDiags()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputChain.CHAINDIAGS_INVALID;
            }
        }
        res = this._chainDiags;
        return res;
    }

    /**
     * Retrieves a digital input chain for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the digital input chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputChain.isOnline() to test if the digital input chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital input chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the digital input chain, for instance
     *         MyDevice.inputChain.
     *
     * @return {YInputChain} a YInputChain object allowing you to drive the digital input chain.
     */
    static FindInputChain(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('InputChain', func);
        if (obj == null) {
            obj = new YInputChain(YAPI, func);
            YFunction._AddToCache('InputChain',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a digital input chain for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the digital input chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputChain.isOnline() to test if the digital input chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital input chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the digital input chain, for instance
     *         MyDevice.inputChain.
     *
     * @return {YInputChain} a YInputChain object allowing you to drive the digital input chain.
     */
    static FindInputChainInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'InputChain', func);
        if (obj == null) {
            obj = new YInputChain(yctx, func);
            YFunction._AddToCache('InputChain',  func, obj);
        }
        return obj;
    }

    /**
     * Resets the application watchdog countdown.
     * If you have setup a non-zero watchdogPeriod, you should
     * call this function on a regular basis to prevent the application
     * inactivity error to be triggered.
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetWatchdog()
    {
        return await this.set_watchdogPeriod(-1);
    }

    /**
     * Returns a string with last events observed on the digital input chain.
     * This method return only events that are still buffered in the device memory.
     *
     * @return {Promise<string>} a string with last events observed (one per line).
     *
     * On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async get_lastEvents()
    {
        /** @type {Uint8Array} **/
        let content;

        content = await this._download('events.txt');
        return this._yapi.imm_bin2str(content);
    }

    /**
     * Registers a callback function to be called each time that an event is detected on the
     * input chain.The callback is invoked only during the execution of
     * ySleep or yHandleEvents. This provides control over the time when
     * the callback is triggered. For good responsiveness, remember to call one of these
     * two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback {YInputChain.YStateChangeCallback | null} : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YInputChain object that emitted the event, the
     *         UTC timestamp of the event, a character string describing
     *         the type of event and a character string with the event data.
     *         On failure, throws an exception or returns a negative error code.
     */
    async registerStateChangeCallback(callback)
    {
        if (callback != null) {
            await this.registerValueCallback(yInternalEventCallback);
        } else {
            await this.registerValueCallback(null);
        }
        // register user callback AFTER the internal pseudo-event,
        // to make sure we start with future events only
        this._stateChangeCallback = callback;
        return 0;
    }

    async _internalEventHandler(cbpos)
    {
        /** @type {number} **/
        let newPos;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let content;
        /** @type {string} **/
        let contentStr;
        /** @type {string[]} **/
        let eventArr = [];
        /** @type {number} **/
        let arrLen;
        /** @type {string} **/
        let lenStr;
        /** @type {number} **/
        let arrPos;
        /** @type {string} **/
        let eventStr;
        /** @type {number} **/
        let eventLen;
        /** @type {string} **/
        let hexStamp;
        /** @type {number} **/
        let typePos;
        /** @type {number} **/
        let dataPos;
        /** @type {number} **/
        let evtStamp;
        /** @type {string} **/
        let evtType;
        /** @type {string} **/
        let evtData;
        /** @type {string} **/
        let evtChange;
        /** @type {number} **/
        let chainIdx;
        newPos = this._yapi.imm_atoi(cbpos);
        if (newPos < this._prevPos) {
            this._eventPos = 0;
        }
        this._prevPos = newPos;
        if (newPos < this._eventPos) {
            return this._yapi.SUCCESS;
        }
        if (!(this._stateChangeCallback != null)) {
            // first simulated event, use it to initialize reference values
            this._eventPos = newPos;
            this._eventChains.length = 0;
            this._eventChains.push(await this.get_bitChain1());
            this._eventChains.push(await this.get_bitChain2());
            this._eventChains.push(await this.get_bitChain3());
            this._eventChains.push(await this.get_bitChain4());
            this._eventChains.push(await this.get_bitChain5());
            this._eventChains.push(await this.get_bitChain6());
            this._eventChains.push(await this.get_bitChain7());
            return this._yapi.SUCCESS;
        }
        url = 'events.txt?pos='+String(Math.round(this._eventPos));

        content = await this._download(url);
        contentStr = this._yapi.imm_bin2str(content);
        eventArr = (contentStr).split('\n');
        arrLen = eventArr.length;
        if (!(arrLen > 0)) {
            return this._throw(this._yapi.IO_ERROR,'fail to download events',this._yapi.IO_ERROR);
        }
        // last element of array is the new position preceeded by '@'
        arrLen = arrLen - 1;
        lenStr = eventArr[arrLen];
        lenStr = (lenStr).substr(1, (lenStr).length-1);
        // update processed event position pointer
        this._eventPos = this._yapi.imm_atoi(lenStr);
        // now generate callbacks for each event received
        arrPos = 0;
        while (arrPos < arrLen) {
            eventStr = eventArr[arrPos];
            eventLen = (eventStr).length;
            if (eventLen >= 1) {
                hexStamp = (eventStr).substr(0, 8);
                evtStamp = parseInt(hexStamp, 16);
                typePos = (eventStr).indexOf(':')+1;
                if ((evtStamp >= this._eventStamp) && (typePos > 8)) {
                    this._eventStamp = evtStamp;
                    dataPos = (eventStr).indexOf('=')+1;
                    evtType = (eventStr).substr(typePos, 1);
                    evtData = '';
                    evtChange = '';
                    if (dataPos > 10) {
                        evtData = (eventStr).substr(dataPos, (eventStr).length-dataPos);
                        if (('1234567').indexOf(evtType) >= 0) {
                            chainIdx = this._yapi.imm_atoi(evtType) - 1;
                            evtChange = await this._strXor(evtData, this._eventChains[chainIdx]);
                            this._eventChains[chainIdx] = evtData;
                        }
                    }
                    try {
                        await this._stateChangeCallback(this, evtStamp, evtType, evtData, evtChange);
                    } catch (e) {
                        this._yapi.imm_log('Exception in stateChangeCallback:', e);
                    }
                }
            }
            arrPos = arrPos + 1;
        }
        return this._yapi.SUCCESS;
    }

    async _strXor(a,b)
    {
        /** @type {number} **/
        let lenA;
        /** @type {number} **/
        let lenB;
        /** @type {string} **/
        let res;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let digitA;
        /** @type {number} **/
        let digitB;
        // make sure the result has the same length as first argument
        lenA = (a).length;
        lenB = (b).length;
        if (lenA > lenB) {
            res = (a).substr(0, lenA-lenB);
            a = (a).substr(lenA-lenB, lenB);
            lenA = lenB;
        } else {
            res = '';
            b = (b).substr(lenA-lenB, lenA);
        }
        // scan strings and compare digit by digit
        idx = 0;
        while (idx < lenA) {
            digitA = parseInt((a).substr(idx, 1), 16);
            digitB = parseInt((b).substr(idx, 1), 16);
            res = res+''+(((digitA) ^ (digitB))).toString(16).toLowerCase();
            idx = idx + 1;
        }
        return res;
    }

    async hex2array(hexstr)
    {
        /** @type {number} **/
        let hexlen;
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let digit;
        hexlen = (hexstr).length;
        res.length = 0;
        idx = hexlen;
        while (idx > 0) {
            idx = idx - 1;
            digit = parseInt((hexstr).substr(idx, 1), 16);
            res.push(((digit) & (1)));
            res.push(((((digit) >> (1))) & (1)));
            res.push(((((digit) >> (2))) & (1)));
            res.push(((((digit) >> (3))) & (1)));
        }
        return res;
    }

    /**
     * Continues the enumeration of digital input chains started using yFirstInputChain().
     * Caution: You can't make any assumption about the returned digital input chains order.
     * If you want to find a specific a digital input chain, use InputChain.findInputChain()
     * and a hardwareID or a logical name.
     *
     * @return {YInputChain | null} a pointer to a YInputChain object, corresponding to
     *         a digital input chain currently online, or a null pointer
     *         if there are no more digital input chains to enumerate.
     */
    nextInputChain()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YInputChain.FindInputChainInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of digital input chains currently accessible.
     * Use the method YInputChain.nextInputChain() to iterate on
     * next digital input chains.
     *
     * @return {YInputChain | null} a pointer to a YInputChain object, corresponding to
     *         the first digital input chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstInputChain()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('InputChain');
        if(next_hwid == null) return null;
        return YInputChain.FindInputChain(next_hwid);
    }

    /**
     * Starts the enumeration of digital input chains currently accessible.
     * Use the method YInputChain.nextInputChain() to iterate on
     * next digital input chains.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YInputChain | null} a pointer to a YInputChain object, corresponding to
     *         the first digital input chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstInputChainInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('InputChain');
        if(next_hwid == null) return null;
        return YInputChain.FindInputChainInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            EXPECTEDNODES_INVALID        : YAPI.INVALID_UINT,
            DETECTEDNODES_INVALID        : YAPI.INVALID_UINT,
            LOOPBACKTEST_OFF             : 0,
            LOOPBACKTEST_ON              : 1,
            LOOPBACKTEST_INVALID         : -1,
            REFRESHRATE_INVALID          : YAPI.INVALID_UINT,
            BITCHAIN1_INVALID            : YAPI.INVALID_STRING,
            BITCHAIN2_INVALID            : YAPI.INVALID_STRING,
            BITCHAIN3_INVALID            : YAPI.INVALID_STRING,
            BITCHAIN4_INVALID            : YAPI.INVALID_STRING,
            BITCHAIN5_INVALID            : YAPI.INVALID_STRING,
            BITCHAIN6_INVALID            : YAPI.INVALID_STRING,
            BITCHAIN7_INVALID            : YAPI.INVALID_STRING,
            WATCHDOGPERIOD_INVALID       : YAPI.INVALID_UINT,
            CHAINDIAGS_INVALID           : YAPI.INVALID_UINT
        });
    }

    //--- (end of YInputChain implementation)
}

//
// YInputChainProxy Class: synchronous proxy to YInputChain objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YInputChain objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YInputChainProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YInputChain accessors declaration)

    /**
     * Returns the number of nodes expected in the chain.
     *
     * @return an integer corresponding to the number of nodes expected in the chain
     *
     * On failure, throws an exception or returns YInputChain.EXPECTEDNODES_INVALID.
     */
    get_expectedNodes()
    {
        return this.liveFunc._expectedNodes;
    }

    /**
     * Changes the number of nodes expected in the chain.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of nodes expected in the chain
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_expectedNodes(newval)
    {
        this.liveFunc.set_expectedNodes(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the number of nodes detected in the chain.
     *
     * @return an integer corresponding to the number of nodes detected in the chain
     *
     * On failure, throws an exception or returns YInputChain.DETECTEDNODES_INVALID.
     */
    get_detectedNodes()
    {
        return this.liveFunc._detectedNodes;
    }

    /**
     * Returns the activation state of the exhaustive chain connectivity test.
     * The connectivity test requires a cable connecting the end of the chain
     * to the loopback test connector.
     *
     * @return either YInputChain.LOOPBACKTEST_OFF or YInputChain.LOOPBACKTEST_ON, according to the
     * activation state of the exhaustive chain connectivity test
     *
     * On failure, throws an exception or returns YInputChain.LOOPBACKTEST_INVALID.
     */
    get_loopbackTest()
    {
        return this.liveFunc._loopbackTest;
    }

    /**
     * Changes the activation state of the exhaustive chain connectivity test.
     * The connectivity test requires a cable connecting the end of the chain
     * to the loopback test connector.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : either YInputChain.LOOPBACKTEST_OFF or YInputChain.LOOPBACKTEST_ON, according to
     * the activation state of the exhaustive chain connectivity test
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_loopbackTest(newval)
    {
        this.liveFunc.set_loopbackTest(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the desired refresh rate, measured in Hz.
     * The higher the refresh rate is set, the higher the
     * communication speed on the chain will be.
     *
     * @return an integer corresponding to the desired refresh rate, measured in Hz
     *
     * On failure, throws an exception or returns YInputChain.REFRESHRATE_INVALID.
     */
    get_refreshRate()
    {
        return this.liveFunc._refreshRate;
    }

    /**
     * Changes the desired refresh rate, measured in Hz.
     * The higher the refresh rate is set, the higher the
     * communication speed on the chain will be.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the desired refresh rate, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_refreshRate(newval)
    {
        this.liveFunc.set_refreshRate(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the state of input 1 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 1 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN1_INVALID.
     */
    get_bitChain1()
    {
        return this.liveFunc._bitChain1;
    }

    /**
     * Returns the state of input 2 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 2 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN2_INVALID.
     */
    get_bitChain2()
    {
        return this.liveFunc._bitChain2;
    }

    /**
     * Returns the state of input 3 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 3 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN3_INVALID.
     */
    get_bitChain3()
    {
        return this.liveFunc._bitChain3;
    }

    /**
     * Returns the state of input 4 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 4 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN4_INVALID.
     */
    get_bitChain4()
    {
        return this.liveFunc._bitChain4;
    }

    /**
     * Returns the state of input 5 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 5 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN5_INVALID.
     */
    get_bitChain5()
    {
        return this.liveFunc._bitChain5;
    }

    /**
     * Returns the state of input 6 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 6 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN6_INVALID.
     */
    get_bitChain6()
    {
        return this.liveFunc._bitChain6;
    }

    /**
     * Returns the state of input 7 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 7 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN7_INVALID.
     */
    get_bitChain7()
    {
        return this.liveFunc._bitChain7;
    }

    /**
     * Returns the wait time in seconds before triggering an inactivity
     * timeout error.
     *
     * @return an integer corresponding to the wait time in seconds before triggering an inactivity
     *         timeout error
     *
     * On failure, throws an exception or returns YInputChain.WATCHDOGPERIOD_INVALID.
     */
    get_watchdogPeriod()
    {
        return this.liveFunc._watchdogPeriod;
    }

    /**
     * Changes the wait time in seconds before triggering an inactivity
     * timeout error. Remember to call the saveToFlash() method
     * of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the wait time in seconds before triggering an inactivity
     *         timeout error
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_watchdogPeriod(newval)
    {
        this.liveFunc.set_watchdogPeriod(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the controller state diagnostics. Bit 0 indicates a chain length
     * error, bit 1 indicates an inactivity timeout and bit 2 indicates
     * a loopback test failure.
     *
     * @return an integer corresponding to the controller state diagnostics
     *
     * On failure, throws an exception or returns YInputChain.CHAINDIAGS_INVALID.
     */
    get_chainDiags()
    {
        return this.liveFunc._chainDiags;
    }

    /**
     * Resets the application watchdog countdown.
     * If you have setup a non-zero watchdogPeriod, you should
     * call this function on a regular basis to prevent the application
     * inactivity error to be triggered.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetWatchdog()
    {
        this.liveFunc.resetWatchdog();
        return YAPI_SUCCESS;
    }

    /**
     * Registers a callback function to be called each time that an event is detected on the
     * input chain.The callback is invoked only during the execution of
     * ySleep or yHandleEvents. This provides control over the time when
     * the callback is triggered. For good responsiveness, remember to call one of these
     * two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YInputChain object that emitted the event, the
     *         UTC timestamp of the event, a character string describing
     *         the type of event and a character string with the event data.
     *         On failure, throws an exception or returns a negative error code.
     */
    registerStateChangeCallback(callback)
    {
        this.liveFunc.registerStateChangeCallback(callback);
        return YAPI_SUCCESS;
    }
    //--- (end of YInputChain accessors declaration)
}

//--- (YInputChain functions)

YoctoLibExport('YInputChain', YInputChain);
YoctoLibExport('YInputChainProxy', YInputChainProxy);
YInputChain.imm_Init();

//--- (end of YInputChain functions)

