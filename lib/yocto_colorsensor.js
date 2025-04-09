/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for ColorSensor functions
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

//--- (YColorSensor return codes)
//--- (end of YColorSensor return codes)
//--- (YColorSensor definitions)
//--- (end of YColorSensor definitions)

//--- (YColorSensor class start)
/**
 * YColorSensor Class: color sensor control interface
 *
 * The YColorSensor class allows you to read and configure Yoctopuce color sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YColorSensor class start)

class YColorSensor extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YColorSensor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'ColorSensor';
        /** @member {number} **/
        this._estimationModel            = YColorSensor.ESTIMATIONMODEL_INVALID;
        /** @member {number} **/
        this._workingMode                = YColorSensor.WORKINGMODE_INVALID;
        /** @member {number} **/
        this._saturation                 = YColorSensor.SATURATION_INVALID;
        /** @member {number} **/
        this._ledCurrent                 = YColorSensor.LEDCURRENT_INVALID;
        /** @member {number} **/
        this._ledCalibration             = YColorSensor.LEDCALIBRATION_INVALID;
        /** @member {number} **/
        this._integrationTime            = YColorSensor.INTEGRATIONTIME_INVALID;
        /** @member {number} **/
        this._gain                       = YColorSensor.GAIN_INVALID;
        /** @member {number} **/
        this._estimatedRGB               = YColorSensor.ESTIMATEDRGB_INVALID;
        /** @member {number} **/
        this._estimatedHSL               = YColorSensor.ESTIMATEDHSL_INVALID;
        /** @member {string} **/
        this._estimatedXYZ               = YColorSensor.ESTIMATEDXYZ_INVALID;
        /** @member {string} **/
        this._estimatedOkLab             = YColorSensor.ESTIMATEDOKLAB_INVALID;
        /** @member {string} **/
        this._nearRAL1                   = YColorSensor.NEARRAL1_INVALID;
        /** @member {string} **/
        this._nearRAL2                   = YColorSensor.NEARRAL2_INVALID;
        /** @member {string} **/
        this._nearRAL3                   = YColorSensor.NEARRAL3_INVALID;
        /** @member {string} **/
        this._nearHTMLColor              = YColorSensor.NEARHTMLCOLOR_INVALID;
        /** @member {string} **/
        this._nearSimpleColor            = YColorSensor.NEARSIMPLECOLOR_INVALID;
        /** @member {number} **/
        this._nearSimpleColorIndex       = YColorSensor.NEARSIMPLECOLORINDEX_INVALID;
        //--- (end of YColorSensor constructor)
    }

    //--- (YColorSensor implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'estimationModel':
            this._estimationModel = parseInt(val);
            return 1;
        case 'workingMode':
            this._workingMode = parseInt(val);
            return 1;
        case 'saturation':
            this._saturation = parseInt(val);
            return 1;
        case 'ledCurrent':
            this._ledCurrent = parseInt(val);
            return 1;
        case 'ledCalibration':
            this._ledCalibration = parseInt(val);
            return 1;
        case 'integrationTime':
            this._integrationTime = parseInt(val);
            return 1;
        case 'gain':
            this._gain = parseInt(val);
            return 1;
        case 'estimatedRGB':
            this._estimatedRGB = parseInt(val);
            return 1;
        case 'estimatedHSL':
            this._estimatedHSL = parseInt(val);
            return 1;
        case 'estimatedXYZ':
            this._estimatedXYZ = val;
            return 1;
        case 'estimatedOkLab':
            this._estimatedOkLab = val;
            return 1;
        case 'nearRAL1':
            this._nearRAL1 = val;
            return 1;
        case 'nearRAL2':
            this._nearRAL2 = val;
            return 1;
        case 'nearRAL3':
            this._nearRAL3 = val;
            return 1;
        case 'nearHTMLColor':
            this._nearHTMLColor = val;
            return 1;
        case 'nearSimpleColor':
            this._nearSimpleColor = val;
            return 1;
        case 'nearSimpleColorIndex':
            this._nearSimpleColorIndex = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the model for color estimation.
     *
     * @return {Promise<number>} either YColorSensor.ESTIMATIONMODEL_REFLECTION or
     * YColorSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATIONMODEL_INVALID.
     */
    async get_estimationModel()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATIONMODEL_INVALID;
            }
        }
        res = this._estimationModel;
        return res;
    }

    /**
     * Changes the model for color estimation.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : either YColorSensor.ESTIMATIONMODEL_REFLECTION or
     * YColorSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_estimationModel(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('estimationModel',rest_val);
    }

    /**
     * Returns the active working mode.
     *
     * @return {Promise<number>} either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT,
     * according to the active working mode
     *
     * On failure, throws an exception or returns YColorSensor.WORKINGMODE_INVALID.
     */
    async get_workingMode()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.WORKINGMODE_INVALID;
            }
        }
        res = this._workingMode;
        return res;
    }

    /**
     * Changes the operating mode.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT,
     * according to the operating mode
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_workingMode(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('workingMode',rest_val);
    }

    /**
     * Returns the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @return {Promise<number>} an integer corresponding to the current saturation of the sensor
     *
     * On failure, throws an exception or returns YColorSensor.SATURATION_INVALID.
     */
    async get_saturation()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.SATURATION_INVALID;
            }
        }
        res = this._saturation;
        return res;
    }

    /**
     * Returns the current value of the LED.
     *
     * @return {Promise<number>} an integer corresponding to the current value of the LED
     *
     * On failure, throws an exception or returns YColorSensor.LEDCURRENT_INVALID.
     */
    async get_ledCurrent()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.LEDCURRENT_INVALID;
            }
        }
        res = this._ledCurrent;
        return res;
    }

    /**
     * Changes the luminosity of the module leds. The parameter is a
     * value between 0 and 254.
     *
     * @param newval {number} : an integer corresponding to the luminosity of the module leds
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ledCurrent(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('ledCurrent',rest_val);
    }

    /**
     * Returns the LED current at calibration.
     *
     * @return {Promise<number>} an integer corresponding to the LED current at calibration
     *
     * On failure, throws an exception or returns YColorSensor.LEDCALIBRATION_INVALID.
     */
    async get_ledCalibration()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.LEDCALIBRATION_INVALID;
            }
        }
        res = this._ledCalibration;
        return res;
    }

    /**
     * Sets the LED current for calibration.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ledCalibration(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('ledCalibration',rest_val);
    }

    /**
     * Returns the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @return {Promise<number>} an integer corresponding to the current integration time
     *
     * On failure, throws an exception or returns YColorSensor.INTEGRATIONTIME_INVALID.
     */
    async get_integrationTime()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }

    /**
     * Changes the integration time for data processing.
     * This method takes a parameter and assigns it
     * as the new integration time. This affects the duration
     * for which data is integrated before being processed.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the integration time for data processing
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_integrationTime(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('integrationTime',rest_val);
    }

    /**
     * Returns the current gain.
     * This method updates the gain value.
     *
     * @return {Promise<number>} an integer corresponding to the current gain
     *
     * On failure, throws an exception or returns YColorSensor.GAIN_INVALID.
     */
    async get_gain()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.GAIN_INVALID;
            }
        }
        res = this._gain;
        return res;
    }

    /**
     * Changes the gain for signal processing.
     * This method takes a parameter and assigns it
     * as the new gain. This affects the sensitivity and
     * intensity of the processed signal.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the gain for signal processing
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_gain(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('gain',rest_val);
    }

    /**
     * Returns the estimated color in RGB format (0xRRGGBB).
     *
     * @return {Promise<number>} an integer corresponding to the estimated color in RGB format (0xRRGGBB)
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDRGB_INVALID.
     */
    async get_estimatedRGB()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDRGB_INVALID;
            }
        }
        res = this._estimatedRGB;
        return res;
    }

    /**
     * Returns the estimated color in HSL (Hue, Saturation, Lightness) format.
     *
     * @return {Promise<number>} an integer corresponding to the estimated color in HSL (Hue, Saturation,
     * Lightness) format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDHSL_INVALID.
     */
    async get_estimatedHSL()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDHSL_INVALID;
            }
        }
        res = this._estimatedHSL;
        return res;
    }

    /**
     * Returns the estimated color in XYZ format.
     *
     * @return {Promise<string>} a string corresponding to the estimated color in XYZ format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDXYZ_INVALID.
     */
    async get_estimatedXYZ()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDXYZ_INVALID;
            }
        }
        res = this._estimatedXYZ;
        return res;
    }

    /**
     * Returns the estimated color in OkLab format.
     *
     * @return {Promise<string>} a string corresponding to the estimated color in OkLab format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDOKLAB_INVALID.
     */
    async get_estimatedOkLab()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDOKLAB_INVALID;
            }
        }
        res = this._estimatedOkLab;
        return res;
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return {Promise<string>} a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL1_INVALID.
     */
    async get_nearRAL1()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARRAL1_INVALID;
            }
        }
        res = this._nearRAL1;
        return res;
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return {Promise<string>} a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL2_INVALID.
     */
    async get_nearRAL2()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARRAL2_INVALID;
            }
        }
        res = this._nearRAL2;
        return res;
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return {Promise<string>} a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL3_INVALID.
     */
    async get_nearRAL3()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARRAL3_INVALID;
            }
        }
        res = this._nearRAL3;
        return res;
    }

    /**
     * Returns the estimated HTML color .
     *
     * @return {Promise<string>} a string corresponding to the estimated HTML color
     *
     * On failure, throws an exception or returns YColorSensor.NEARHTMLCOLOR_INVALID.
     */
    async get_nearHTMLColor()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARHTMLCOLOR_INVALID;
            }
        }
        res = this._nearHTMLColor;
        return res;
    }

    /**
     * Returns the estimated color .
     *
     * @return {Promise<string>} a string corresponding to the estimated color
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLOR_INVALID.
     */
    async get_nearSimpleColor()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARSIMPLECOLOR_INVALID;
            }
        }
        res = this._nearSimpleColor;
        return res;
    }

    /**
     * Returns the estimated color as an index.
     *
     * @return {Promise<number>} a value among YColorSensor.NEARSIMPLECOLORINDEX_BROWN,
     * YColorSensor.NEARSIMPLECOLORINDEX_RED, YColorSensor.NEARSIMPLECOLORINDEX_ORANGE,
     * YColorSensor.NEARSIMPLECOLORINDEX_YELLOW, YColorSensor.NEARSIMPLECOLORINDEX_WHITE,
     * YColorSensor.NEARSIMPLECOLORINDEX_GRAY, YColorSensor.NEARSIMPLECOLORINDEX_BLACK,
     * YColorSensor.NEARSIMPLECOLORINDEX_GREEN, YColorSensor.NEARSIMPLECOLORINDEX_BLUE,
     * YColorSensor.NEARSIMPLECOLORINDEX_PURPLE and YColorSensor.NEARSIMPLECOLORINDEX_PINK corresponding
     * to the estimated color as an index
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLORINDEX_INVALID.
     */
    async get_nearSimpleColorIndex()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARSIMPLECOLORINDEX_INVALID;
            }
        }
        res = this._nearSimpleColorIndex;
        return res;
    }

    /**
     * Retrieves a color sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the color sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorSensor.isOnline() to test if the color sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a color sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the color sensor, for instance
     *         MyDevice.colorSensor.
     *
     * @return {YColorSensor} a YColorSensor object allowing you to drive the color sensor.
     */
    static FindColorSensor(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('ColorSensor', func);
        if (obj == null) {
            obj = new YColorSensor(YAPI, func);
            YFunction._AddToCache('ColorSensor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a color sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the color sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorSensor.isOnline() to test if the color sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a color sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the color sensor, for instance
     *         MyDevice.colorSensor.
     *
     * @return {YColorSensor} a YColorSensor object allowing you to drive the color sensor.
     */
    static FindColorSensorInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'ColorSensor', func);
        if (obj == null) {
            obj = new YColorSensor(yctx, func);
            YFunction._AddToCache('ColorSensor', func, obj);
        }
        return obj;
    }

    /**
     * Turns on the LEDs at the current used during calibration.
     * On failure, throws an exception or returns YColorSensor.DATA_INVALID.
     */
    async turnLedOn()
    {
        return await this.set_ledCurrent(await this.get_ledCalibration());
    }

    /**
     * Turns off the LEDs.
     * On failure, throws an exception or returns YColorSensor.DATA_INVALID.
     */
    async turnLedOff()
    {
        return await this.set_ledCurrent(0);
    }

    /**
     * Continues the enumeration of color sensors started using yFirstColorSensor().
     * Caution: You can't make any assumption about the returned color sensors order.
     * If you want to find a specific a color sensor, use ColorSensor.findColorSensor()
     * and a hardwareID or a logical name.
     *
     * @return {YColorSensor | null} a pointer to a YColorSensor object, corresponding to
     *         a color sensor currently online, or a null pointer
     *         if there are no more color sensors to enumerate.
     */
    nextColorSensor()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YColorSensor.FindColorSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of color sensors currently accessible.
     * Use the method YColorSensor.nextColorSensor() to iterate on
     * next color sensors.
     *
     * @return {YColorSensor | null} a pointer to a YColorSensor object, corresponding to
     *         the first color sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorSensor()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('ColorSensor');
        if(next_hwid == null) return null;
        return YColorSensor.FindColorSensor(next_hwid);
    }

    /**
     * Starts the enumeration of color sensors currently accessible.
     * Use the method YColorSensor.nextColorSensor() to iterate on
     * next color sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YColorSensor | null} a pointer to a YColorSensor object, corresponding to
     *         the first color sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorSensorInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('ColorSensor');
        if(next_hwid == null) return null;
        return YColorSensor.FindColorSensorInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            ESTIMATIONMODEL_REFLECTION   : 0,
            ESTIMATIONMODEL_EMISSION     : 1,
            ESTIMATIONMODEL_INVALID      : -1,
            WORKINGMODE_AUTO             : 0,
            WORKINGMODE_EXPERT           : 1,
            WORKINGMODE_INVALID          : -1,
            SATURATION_INVALID           : YAPI.INVALID_UINT,
            LEDCURRENT_INVALID           : YAPI.INVALID_UINT,
            LEDCALIBRATION_INVALID       : YAPI.INVALID_UINT,
            INTEGRATIONTIME_INVALID      : YAPI.INVALID_UINT,
            GAIN_INVALID                 : YAPI.INVALID_UINT,
            ESTIMATEDRGB_INVALID         : YAPI.INVALID_UINT,
            ESTIMATEDHSL_INVALID         : YAPI.INVALID_UINT,
            ESTIMATEDXYZ_INVALID         : YAPI.INVALID_STRING,
            ESTIMATEDOKLAB_INVALID       : YAPI.INVALID_STRING,
            NEARRAL1_INVALID             : YAPI.INVALID_STRING,
            NEARRAL2_INVALID             : YAPI.INVALID_STRING,
            NEARRAL3_INVALID             : YAPI.INVALID_STRING,
            NEARHTMLCOLOR_INVALID        : YAPI.INVALID_STRING,
            NEARSIMPLECOLOR_INVALID      : YAPI.INVALID_STRING,
            NEARSIMPLECOLORINDEX_BROWN   : 0,
            NEARSIMPLECOLORINDEX_RED     : 1,
            NEARSIMPLECOLORINDEX_ORANGE  : 2,
            NEARSIMPLECOLORINDEX_YELLOW  : 3,
            NEARSIMPLECOLORINDEX_WHITE   : 4,
            NEARSIMPLECOLORINDEX_GRAY    : 5,
            NEARSIMPLECOLORINDEX_BLACK   : 6,
            NEARSIMPLECOLORINDEX_GREEN   : 7,
            NEARSIMPLECOLORINDEX_BLUE    : 8,
            NEARSIMPLECOLORINDEX_PURPLE  : 9,
            NEARSIMPLECOLORINDEX_PINK    : 10,
            NEARSIMPLECOLORINDEX_INVALID : -1
        });
    }

    //--- (end of YColorSensor implementation)
}

//
// YColorSensorProxy Class: synchronous proxy to YColorSensor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YColorSensor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YColorSensorProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YColorSensor accessors declaration)

    /**
     * Returns the model for color estimation.
     *
     * @return either YColorSensor.ESTIMATIONMODEL_REFLECTION or YColorSensor.ESTIMATIONMODEL_EMISSION,
     * according to the model for color estimation
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATIONMODEL_INVALID.
     */
    get_estimationModel()
    {
        return this.liveFunc._estimationModel;
    }

    /**
     * Changes the model for color estimation.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YColorSensor.ESTIMATIONMODEL_REFLECTION or
     * YColorSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_estimationModel(newval)
    {
        this.liveFunc.set_estimationModel(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the active working mode.
     *
     * @return either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according to the
     * active working mode
     *
     * On failure, throws an exception or returns YColorSensor.WORKINGMODE_INVALID.
     */
    get_workingMode()
    {
        return this.liveFunc._workingMode;
    }

    /**
     * Changes the operating mode.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according
     * to the operating mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_workingMode(newval)
    {
        this.liveFunc.set_workingMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @return an integer corresponding to the current saturation of the sensor
     *
     * On failure, throws an exception or returns YColorSensor.SATURATION_INVALID.
     */
    get_saturation()
    {
        return this.liveFunc._saturation;
    }

    /**
     * Returns the current value of the LED.
     *
     * @return an integer corresponding to the current value of the LED
     *
     * On failure, throws an exception or returns YColorSensor.LEDCURRENT_INVALID.
     */
    get_ledCurrent()
    {
        return this.liveFunc._ledCurrent;
    }

    /**
     * Changes the luminosity of the module leds. The parameter is a
     * value between 0 and 254.
     *
     * @param newval : an integer corresponding to the luminosity of the module leds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ledCurrent(newval)
    {
        this.liveFunc.set_ledCurrent(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the LED current at calibration.
     *
     * @return an integer corresponding to the LED current at calibration
     *
     * On failure, throws an exception or returns YColorSensor.LEDCALIBRATION_INVALID.
     */
    get_ledCalibration()
    {
        return this.liveFunc._ledCalibration;
    }

    /**
     * Sets the LED current for calibration.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ledCalibration(newval)
    {
        this.liveFunc.set_ledCalibration(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current integration time
     *
     * On failure, throws an exception or returns YColorSensor.INTEGRATIONTIME_INVALID.
     */
    get_integrationTime()
    {
        return this.liveFunc._integrationTime;
    }

    /**
     * Changes the integration time for data processing.
     * This method takes a parameter and assigns it
     * as the new integration time. This affects the duration
     * for which data is integrated before being processed.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the integration time for data processing
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_integrationTime(newval)
    {
        this.liveFunc.set_integrationTime(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current gain.
     * This method updates the gain value.
     *
     * @return an integer corresponding to the current gain
     *
     * On failure, throws an exception or returns YColorSensor.GAIN_INVALID.
     */
    get_gain()
    {
        return this.liveFunc._gain;
    }

    /**
     * Changes the gain for signal processing.
     * This method takes a parameter and assigns it
     * as the new gain. This affects the sensitivity and
     * intensity of the processed signal.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the gain for signal processing
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_gain(newval)
    {
        this.liveFunc.set_gain(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the estimated color in RGB format (0xRRGGBB).
     *
     * @return an integer corresponding to the estimated color in RGB format (0xRRGGBB)
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDRGB_INVALID.
     */
    get_estimatedRGB()
    {
        return this.liveFunc._estimatedRGB;
    }

    /**
     * Returns the estimated color in HSL (Hue, Saturation, Lightness) format.
     *
     * @return an integer corresponding to the estimated color in HSL (Hue, Saturation, Lightness) format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDHSL_INVALID.
     */
    get_estimatedHSL()
    {
        return this.liveFunc._estimatedHSL;
    }

    /**
     * Returns the estimated color in XYZ format.
     *
     * @return a string corresponding to the estimated color in XYZ format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDXYZ_INVALID.
     */
    get_estimatedXYZ()
    {
        return this.liveFunc._estimatedXYZ;
    }

    /**
     * Returns the estimated color in OkLab format.
     *
     * @return a string corresponding to the estimated color in OkLab format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDOKLAB_INVALID.
     */
    get_estimatedOkLab()
    {
        return this.liveFunc._estimatedOkLab;
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL1_INVALID.
     */
    get_nearRAL1()
    {
        return this.liveFunc._nearRAL1;
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL2_INVALID.
     */
    get_nearRAL2()
    {
        return this.liveFunc._nearRAL2;
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL3_INVALID.
     */
    get_nearRAL3()
    {
        return this.liveFunc._nearRAL3;
    }

    /**
     * Returns the estimated HTML color .
     *
     * @return a string corresponding to the estimated HTML color
     *
     * On failure, throws an exception or returns YColorSensor.NEARHTMLCOLOR_INVALID.
     */
    get_nearHTMLColor()
    {
        return this.liveFunc._nearHTMLColor;
    }

    /**
     * Returns the estimated color .
     *
     * @return a string corresponding to the estimated color
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLOR_INVALID.
     */
    get_nearSimpleColor()
    {
        return this.liveFunc._nearSimpleColor;
    }

    /**
     * Returns the estimated color as an index.
     *
     * @return a value among YColorSensor.NEARSIMPLECOLORINDEX_BROWN,
     * YColorSensor.NEARSIMPLECOLORINDEX_RED, YColorSensor.NEARSIMPLECOLORINDEX_ORANGE,
     * YColorSensor.NEARSIMPLECOLORINDEX_YELLOW, YColorSensor.NEARSIMPLECOLORINDEX_WHITE,
     * YColorSensor.NEARSIMPLECOLORINDEX_GRAY, YColorSensor.NEARSIMPLECOLORINDEX_BLACK,
     * YColorSensor.NEARSIMPLECOLORINDEX_GREEN, YColorSensor.NEARSIMPLECOLORINDEX_BLUE,
     * YColorSensor.NEARSIMPLECOLORINDEX_PURPLE and YColorSensor.NEARSIMPLECOLORINDEX_PINK corresponding
     * to the estimated color as an index
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLORINDEX_INVALID.
     */
    get_nearSimpleColorIndex()
    {
        return this.liveFunc._nearSimpleColorIndex;
    }

    /**
     * Turns on the LEDs at the current used during calibration.
     * On failure, throws an exception or returns Y_DATA_INVALID.
     */
    turnLedOn()
    {
        this.liveFunc.turnLedOn();
        return YAPI_SUCCESS;
    }

    /**
     * Turns off the LEDs.
     * On failure, throws an exception or returns Y_DATA_INVALID.
     */
    turnLedOff()
    {
        this.liveFunc.turnLedOff();
        return YAPI_SUCCESS;
    }
    //--- (end of YColorSensor accessors declaration)
}

//--- (YColorSensor functions)

YoctoLibExport('YColorSensor', YColorSensor);
YoctoLibExport('YColorSensorProxy', YColorSensorProxy);
YColorSensor.imm_Init();

//--- (end of YColorSensor functions)

