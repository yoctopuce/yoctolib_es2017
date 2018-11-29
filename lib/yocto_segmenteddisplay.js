/*********************************************************************
 *
 *  $Id: yocto_segmenteddisplay.js 32902 2018-11-02 10:13:53Z seb $
 *
 *  Implements the high-level API for SegmentedDisplay functions
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

//--- (YSegmentedDisplay return codes)
//--- (end of YSegmentedDisplay return codes)
//--- (YSegmentedDisplay definitions)
//--- (end of YSegmentedDisplay definitions)

//--- (YSegmentedDisplay class start)
/**
 * YSegmentedDisplay Class: SegmentedDisplay function interface
 *
 * The SegmentedDisplay class allows you to drive segmented displays.
 */
//--- (end of YSegmentedDisplay class start)

class YSegmentedDisplay extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YSegmentedDisplay constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'SegmentedDisplay';
        /** @member {string} **/
        this._displayedText              = YSegmentedDisplay.DISPLAYEDTEXT_INVALID;
        /** @member {number} **/
        this._displayMode                = YSegmentedDisplay.DISPLAYMODE_INVALID;
        //--- (end of YSegmentedDisplay constructor)
    }

    //--- (YSegmentedDisplay implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'displayedText':
            this._displayedText = val;
            return 1;
        case 'displayMode':
            this._displayMode = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the text currently displayed on the screen.
     *
     * @return {string} a string corresponding to the text currently displayed on the screen
     *
     * On failure, throws an exception or returns YSegmentedDisplay.DISPLAYEDTEXT_INVALID.
     */
    async get_displayedText()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSegmentedDisplay.DISPLAYEDTEXT_INVALID;
            }
        }
        res = this._displayedText;
        return res;
    }

    /**
     * Changes the text currently displayed on the screen.
     *
     * @param newval {string} : a string corresponding to the text currently displayed on the screen
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_displayedText(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('displayedText',rest_val);
    }

    async get_displayMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSegmentedDisplay.DISPLAYMODE_INVALID;
            }
        }
        res = this._displayMode;
        return res;
    }

    async set_displayMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('displayMode',rest_val);
    }

    /**
     * Retrieves a segmented display for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the segmented displays is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSegmentedDisplay.isOnline() to test if the segmented displays is
     * indeed online at a given time. In case of ambiguity when looking for
     * a segmented display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the segmented displays
     *
     * @return {YSegmentedDisplay} a YSegmentedDisplay object allowing you to drive the segmented displays.
     */
    static FindSegmentedDisplay(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('SegmentedDisplay', func);
        if (obj == null) {
            obj = new YSegmentedDisplay(YAPI, func);
            YFunction._AddToCache('SegmentedDisplay',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a segmented display for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the segmented displays is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSegmentedDisplay.isOnline() to test if the segmented displays is
     * indeed online at a given time. In case of ambiguity when looking for
     * a segmented display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the segmented displays
     *
     * @return {YSegmentedDisplay} a YSegmentedDisplay object allowing you to drive the segmented displays.
     */
    static FindSegmentedDisplayInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'SegmentedDisplay', func);
        if (obj == null) {
            obj = new YSegmentedDisplay(yctx, func);
            YFunction._AddToCache('SegmentedDisplay',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of segmented displays started using yFirstSegmentedDisplay().
     * Caution: You can't make any assumption about the returned segmented displays order.
     * If you want to find a specific a segmented display, use SegmentedDisplay.findSegmentedDisplay()
     * and a hardwareID or a logical name.
     *
     * @return {YSegmentedDisplay} a pointer to a YSegmentedDisplay object, corresponding to
     *         a segmented display currently online, or a null pointer
     *         if there are no more segmented displays to enumerate.
     */
    nextSegmentedDisplay()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplayInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of segmented displays currently accessible.
     * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
     * next segmented displays.
     *
     * @return {YSegmentedDisplay} a pointer to a YSegmentedDisplay object, corresponding to
     *         the first segmented displays currently online, or a null pointer
     *         if there are none.
     */
    static FirstSegmentedDisplay()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('SegmentedDisplay');
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplay(next_hwid);
    }

    /**
     * Starts the enumeration of segmented displays currently accessible.
     * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
     * next segmented displays.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YSegmentedDisplay} a pointer to a YSegmentedDisplay object, corresponding to
     *         the first segmented displays currently online, or a null pointer
     *         if there are none.
     */
    static FirstSegmentedDisplayInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('SegmentedDisplay');
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplayInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            DISPLAYEDTEXT_INVALID        : YAPI.INVALID_STRING,
            DISPLAYMODE_DISCONNECTED     : 0,
            DISPLAYMODE_MANUAL           : 1,
            DISPLAYMODE_AUTO1            : 2,
            DISPLAYMODE_AUTO60           : 3,
            DISPLAYMODE_INVALID          : -1
        });
    }

    //--- (end of YSegmentedDisplay implementation)
}

//
// YSegmentedDisplayProxy Class: synchronous proxy to YSegmentedDisplay objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YSegmentedDisplay objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YSegmentedDisplayProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YSegmentedDisplay accessors declaration)

    /**
     * Returns the text currently displayed on the screen.
     *
     * @return a string corresponding to the text currently displayed on the screen
     *
     * On failure, throws an exception or returns Y_DISPLAYEDTEXT_INVALID.
     */
    get_displayedText()
    {
        return this.liveFunc._displayedText;
    }

    /**
     * Changes the text currently displayed on the screen.
     *
     * @param newval : a string corresponding to the text currently displayed on the screen
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_displayedText(newval)
    {
        this.liveFunc.set_displayedText(newval);
        return this._yapi.SUCCESS;
    }

    get_displayMode()
    {
        return this.liveFunc._displayMode;
    }

    set_displayMode(newval)
    {
        this.liveFunc.set_displayMode(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YSegmentedDisplay accessors declaration)
}

//--- (YSegmentedDisplay functions)

YoctoLibExport('YSegmentedDisplay', YSegmentedDisplay);
YoctoLibExport('YSegmentedDisplayProxy', YSegmentedDisplayProxy);
YSegmentedDisplay.imm_Init();

//--- (end of YSegmentedDisplay functions)
