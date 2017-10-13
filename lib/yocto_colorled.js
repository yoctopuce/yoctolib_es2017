/*********************************************************************
 *
 * $Id: yocto_colorled.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for ColorLed functions
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

//--- (YColorLed return codes)
//--- (end of YColorLed return codes)
//--- (YColorLed definitions)
//--- (end of YColorLed definitions)

//--- (YColorLed class start)
/**
 * YColorLed Class: ColorLed function interface
 *
 * The Yoctopuce application programming interface
 * allows you to drive a color LED using RGB coordinates as well as HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a LED with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
//--- (end of YColorLed class start)

class YColorLed extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YColorLed constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'ColorLed';
        /** @member {number} **/
        this._rgbColor                   = YColorLed.RGBCOLOR_INVALID;
        /** @member {number} **/
        this._hslColor                   = YColorLed.HSLCOLOR_INVALID;
        /** @member {YMove} **/
        this._rgbMove                    = YColorLed.RGBMOVE_INVALID;
        /** @member {YMove} **/
        this._hslMove                    = YColorLed.HSLMOVE_INVALID;
        /** @member {number} **/
        this._rgbColorAtPowerOn          = YColorLed.RGBCOLORATPOWERON_INVALID;
        /** @member {number} **/
        this._blinkSeqSize               = YColorLed.BLINKSEQSIZE_INVALID;
        /** @member {number} **/
        this._blinkSeqMaxSize            = YColorLed.BLINKSEQMAXSIZE_INVALID;
        /** @member {number} **/
        this._blinkSeqSignature          = YColorLed.BLINKSEQSIGNATURE_INVALID;
        /** @member {string} **/
        this._command                    = YColorLed.COMMAND_INVALID;
        //--- (end of YColorLed constructor)
    }

    //--- (YColorLed implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'rgbColor':
            this._rgbColor = parseInt(val);
            return 1;
        case 'hslColor':
            this._hslColor = parseInt(val);
            return 1;
        case 'rgbMove':
            this._rgbMove = val;
            return 1;
        case 'hslMove':
            this._hslMove = val;
            return 1;
        case 'rgbColorAtPowerOn':
            this._rgbColorAtPowerOn = parseInt(val);
            return 1;
        case 'blinkSeqSize':
            this._blinkSeqSize = parseInt(val);
            return 1;
        case 'blinkSeqMaxSize':
            this._blinkSeqMaxSize = parseInt(val);
            return 1;
        case 'blinkSeqSignature':
            this._blinkSeqSignature = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current RGB color of the LED.
     *
     * @return {number} an integer corresponding to the current RGB color of the LED
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLOR_INVALID.
     */
    async get_rgbColor()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.RGBCOLOR_INVALID;
            }
        }
        res = this._rgbColor;
        return res;
    }

    /**
     * Changes the current color of the LED, using an RGB color. Encoding is done as follows: 0xRRGGBB.
     *
     * @param newval {number} : an integer corresponding to the current color of the LED, using an RGB color
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rgbColor(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = '0x'+newval.toString(16);
        return await this._setAttr('rgbColor',rest_val);
    }

    /**
     * Returns the current HSL color of the LED.
     *
     * @return {number} an integer corresponding to the current HSL color of the LED
     *
     * On failure, throws an exception or returns YColorLed.HSLCOLOR_INVALID.
     */
    async get_hslColor()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.HSLCOLOR_INVALID;
            }
        }
        res = this._hslColor;
        return res;
    }

    /**
     * Changes the current color of the LED, using a color HSL. Encoding is done as follows: 0xHHSSLL.
     *
     * @param newval {number} : an integer corresponding to the current color of the LED, using a color HSL
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_hslColor(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = '0x'+newval.toString(16);
        return await this._setAttr('hslColor',rest_val);
    }

    async get_rgbMove()
    {
        /** @type {YMove} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.RGBMOVE_INVALID;
            }
        }
        res = this._rgbMove;
        return res;
    }

    async set_rgbMove(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval.target)+':'+String(newval.ms);
        return await this._setAttr('rgbMove',rest_val);
    }

    /**
     * Performs a smooth transition in the RGB color space between the current color and a target color.
     *
     * @param rgb_target  : desired RGB color at the end of the transition
     * @param ms_duration {number} : duration of the transition, in millisecond
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async rgbMove(rgb_target,ms_duration)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(rgb_target)+':'+String(ms_duration);
        return await this._setAttr('rgbMove',rest_val);
    }

    async get_hslMove()
    {
        /** @type {YMove} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.HSLMOVE_INVALID;
            }
        }
        res = this._hslMove;
        return res;
    }

    async set_hslMove(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval.target)+':'+String(newval.ms);
        return await this._setAttr('hslMove',rest_val);
    }

    /**
     * Performs a smooth transition in the HSL color space between the current color and a target color.
     *
     * @param hsl_target  : desired HSL color at the end of the transition
     * @param ms_duration {number} : duration of the transition, in millisecond
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async hslMove(hsl_target,ms_duration)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(hsl_target)+':'+String(ms_duration);
        return await this._setAttr('hslMove',rest_val);
    }

    /**
     * Returns the configured color to be displayed when the module is turned on.
     *
     * @return {number} an integer corresponding to the configured color to be displayed when the module is turned on
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLORATPOWERON_INVALID.
     */
    async get_rgbColorAtPowerOn()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.RGBCOLORATPOWERON_INVALID;
            }
        }
        res = this._rgbColorAtPowerOn;
        return res;
    }

    /**
     * Changes the color that the LED will display by default when the module is turned on.
     *
     * @param newval {number} : an integer corresponding to the color that the LED will display by default
     * when the module is turned on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rgbColorAtPowerOn(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = '0x'+newval.toString(16);
        return await this._setAttr('rgbColorAtPowerOn',rest_val);
    }

    /**
     * Returns the current length of the blinking sequence.
     *
     * @return {number} an integer corresponding to the current length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIZE_INVALID.
     */
    async get_blinkSeqSize()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.BLINKSEQSIZE_INVALID;
            }
        }
        res = this._blinkSeqSize;
        return res;
    }

    /**
     * Returns the maximum length of the blinking sequence.
     *
     * @return {number} an integer corresponding to the maximum length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQMAXSIZE_INVALID.
     */
    async get_blinkSeqMaxSize()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.BLINKSEQMAXSIZE_INVALID;
            }
        }
        res = this._blinkSeqMaxSize;
        return res;
    }

    /**
     * Return the blinking sequence signature. Since blinking
     * sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already
     * programmed.
     *
     * @return {number} an integer
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIGNATURE_INVALID.
     */
    async get_blinkSeqSignature()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.BLINKSEQSIGNATURE_INVALID;
            }
        }
        res = this._blinkSeqSignature;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.COMMAND_INVALID;
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
     * Retrieves an RGB LED for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the RGB LED
     *
     * @return {YColorLed} a YColorLed object allowing you to drive the RGB LED.
     */
    static FindColorLed(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('ColorLed', func);
        if (obj == null) {
            obj = new YColorLed(YAPI, func);
            YFunction._AddToCache('ColorLed',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an RGB LED for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the RGB LED
     *
     * @return {YColorLed} a YColorLed object allowing you to drive the RGB LED.
     */
    static FindColorLedInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'ColorLed', func);
        if (obj == null) {
            obj = new YColorLed(yctx, func);
            YFunction._AddToCache('ColorLed',  func, obj);
        }
        return obj;
    }

    async sendCommand(command)
    {
        return await this.set_command(command);
    }

    /**
     * Add a new transition to the blinking sequence, the move will
     * be performed in the HSL space.
     *
     * @param HSLcolor {number} : desired HSL color when the traisntion is completed
     * @param msDelay {number} : duration of the color transition, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addHslMoveToBlinkSeq(HSLcolor,msDelay)
    {
        return await this.sendCommand('H'+String(Math.round(HSLcolor))+','+String(Math.round(msDelay)));
    }

    /**
     * Adds a new transition to the blinking sequence, the move is
     * performed in the RGB space.
     *
     * @param RGBcolor {number} : desired RGB color when the transition is completed
     * @param msDelay {number} : duration of the color transition, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addRgbMoveToBlinkSeq(RGBcolor,msDelay)
    {
        return await this.sendCommand('R'+String(Math.round(RGBcolor))+','+String(Math.round(msDelay)));
    }

    /**
     * Starts the preprogrammed blinking sequence. The sequence is
     * run in a loop until it is stopped by stopBlinkSeq or an explicit
     * change.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async startBlinkSeq()
    {
        return await this.sendCommand('S');
    }

    /**
     * Stops the preprogrammed blinking sequence.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async stopBlinkSeq()
    {
        return await this.sendCommand('X');
    }

    /**
     * Resets the preprogrammed blinking sequence.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async resetBlinkSeq()
    {
        return await this.sendCommand('Z');
    }

    /**
     * Continues the enumeration of RGB LEDs started using yFirstColorLed().
     *
     * @return {YColorLed} a pointer to a YColorLed object, corresponding to
     *         an RGB LED currently online, or a null pointer
     *         if there are no more RGB LEDs to enumerate.
     */
    nextColorLed()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YColorLed.FindColorLedInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of RGB LEDs currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB LEDs.
     *
     * @return {YColorLed} a pointer to a YColorLed object, corresponding to
     *         the first RGB LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLed()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('ColorLed');
        if(next_hwid == null) return null;
        return YColorLed.FindColorLed(next_hwid);
    }

    /**
     * Starts the enumeration of RGB LEDs currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB LEDs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YColorLed} a pointer to a YColorLed object, corresponding to
     *         the first RGB LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLedInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('ColorLed');
        if(next_hwid == null) return null;
        return YColorLed.FindColorLedInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            RGBCOLOR_INVALID             : YAPI.INVALID_UINT,
            HSLCOLOR_INVALID             : YAPI.INVALID_UINT,
            RGBCOLORATPOWERON_INVALID    : YAPI.INVALID_UINT,
            BLINKSEQSIZE_INVALID         : YAPI.INVALID_UINT,
            BLINKSEQMAXSIZE_INVALID      : YAPI.INVALID_UINT,
            BLINKSEQSIGNATURE_INVALID    : YAPI.INVALID_UINT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YColorLed implementation)
}

//
// YColorLedProxy Class: synchronous proxy to YColorLed objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YColorLed objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YColorLedProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YColorLed accessors declaration)

    /**
     * Returns the current RGB color of the LED.
     *
     * @return an integer corresponding to the current RGB color of the LED
     *
     * On failure, throws an exception or returns Y_RGBCOLOR_INVALID.
     */
    get_rgbColor()
    {
        return this.liveFunc._rgbColor;
    }

    /**
     * Changes the current color of the LED, using an RGB color. Encoding is done as follows: 0xRRGGBB.
     *
     * @param newval : an integer corresponding to the current color of the LED, using an RGB color
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColor(newval)
    {
        this.liveFunc.set_rgbColor(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current HSL color of the LED.
     *
     * @return an integer corresponding to the current HSL color of the LED
     *
     * On failure, throws an exception or returns Y_HSLCOLOR_INVALID.
     */
    get_hslColor()
    {
        return this.liveFunc._hslColor;
    }

    /**
     * Changes the current color of the LED, using a color HSL. Encoding is done as follows: 0xHHSSLL.
     *
     * @param newval : an integer corresponding to the current color of the LED, using a color HSL
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColor(newval)
    {
        this.liveFunc.set_hslColor(newval);
        return this._yapi.SUCCESS;
    }

    get_rgbMove()
    {
        return this.liveFunc._rgbMove;
    }

    set_rgbMove(newval)
    {
        this.liveFunc.set_rgbMove(newval);
        return this._yapi.SUCCESS;
    }

    get_hslMove()
    {
        return this.liveFunc._hslMove;
    }

    set_hslMove(newval)
    {
        this.liveFunc.set_hslMove(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the configured color to be displayed when the module is turned on.
     *
     * @return an integer corresponding to the configured color to be displayed when the module is turned on
     *
     * On failure, throws an exception or returns Y_RGBCOLORATPOWERON_INVALID.
     */
    get_rgbColorAtPowerOn()
    {
        return this.liveFunc._rgbColorAtPowerOn;
    }

    /**
     * Changes the color that the LED will display by default when the module is turned on.
     *
     * @param newval : an integer corresponding to the color that the LED will display by default when the
     * module is turned on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorAtPowerOn(newval)
    {
        this.liveFunc.set_rgbColorAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current length of the blinking sequence.
     *
     * @return an integer corresponding to the current length of the blinking sequence
     *
     * On failure, throws an exception or returns Y_BLINKSEQSIZE_INVALID.
     */
    get_blinkSeqSize()
    {
        return this.liveFunc._blinkSeqSize;
    }

    /**
     * Returns the maximum length of the blinking sequence.
     *
     * @return an integer corresponding to the maximum length of the blinking sequence
     *
     * On failure, throws an exception or returns Y_BLINKSEQMAXSIZE_INVALID.
     */
    get_blinkSeqMaxSize()
    {
        return this.liveFunc._blinkSeqMaxSize;
    }

    /**
     * Return the blinking sequence signature. Since blinking
     * sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already
     * programmed.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns Y_BLINKSEQSIGNATURE_INVALID.
     */
    get_blinkSeqSignature()
    {
        return this.liveFunc._blinkSeqSignature;
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
     * Add a new transition to the blinking sequence, the move will
     * be performed in the HSL space.
     *
     * @param HSLcolor : desired HSL color when the traisntion is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addHslMoveToBlinkSeq(HSLcolor,msDelay)
    {
        this.liveFunc.addHslMoveToBlinkSeq(HSLcolor, msDelay);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a new transition to the blinking sequence, the move is
     * performed in the RGB space.
     *
     * @param RGBcolor : desired RGB color when the transition is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addRgbMoveToBlinkSeq(RGBcolor,msDelay)
    {
        this.liveFunc.addRgbMoveToBlinkSeq(RGBcolor, msDelay);
        return YAPI_SUCCESS;
    }

    /**
     * Starts the preprogrammed blinking sequence. The sequence is
     * run in a loop until it is stopped by stopBlinkSeq or an explicit
     * change.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    startBlinkSeq()
    {
        this.liveFunc.startBlinkSeq();
        return YAPI_SUCCESS;
    }

    /**
     * Stops the preprogrammed blinking sequence.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    stopBlinkSeq()
    {
        this.liveFunc.stopBlinkSeq();
        return YAPI_SUCCESS;
    }

    /**
     * Resets the preprogrammed blinking sequence.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetBlinkSeq()
    {
        this.liveFunc.resetBlinkSeq();
        return YAPI_SUCCESS;
    }
    //--- (end of YColorLed accessors declaration)
}

//--- (YColorLed functions)

YoctoLibExport('YColorLed', YColorLed);
YoctoLibExport('YColorLedProxy', YColorLedProxy);
YColorLed.imm_Init();

//--- (end of YColorLed functions)
