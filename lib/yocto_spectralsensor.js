/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SpectralSensor functions
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

//--- (YSpectralSensor return codes)
//--- (end of YSpectralSensor return codes)
//--- (YSpectralSensor definitions)
//--- (end of YSpectralSensor definitions)

//--- (YSpectralSensor class start)
/**
 * YSpectralSensor Class: spectral sensor control interface
 *
 * The YSpectralSensor class allows you to read and configure Yoctopuce spectral sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSpectralSensor class start)

class YSpectralSensor extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YSpectralSensor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'SpectralSensor';
        /** @member {number} **/
        this._ledCurrent                 = YSpectralSensor.LEDCURRENT_INVALID;
        /** @member {number} **/
        this._resolution                 = YSpectralSensor.RESOLUTION_INVALID;
        /** @member {number} **/
        this._integrationTime            = YSpectralSensor.INTEGRATIONTIME_INVALID;
        /** @member {number} **/
        this._gain                       = YSpectralSensor.GAIN_INVALID;
        /** @member {number} **/
        this._estimationModel            = YSpectralSensor.ESTIMATIONMODEL_INVALID;
        /** @member {number} **/
        this._saturation                 = YSpectralSensor.SATURATION_INVALID;
        /** @member {number} **/
        this._estimatedRGB               = YSpectralSensor.ESTIMATEDRGB_INVALID;
        /** @member {number} **/
        this._estimatedHSL               = YSpectralSensor.ESTIMATEDHSL_INVALID;
        /** @member {string} **/
        this._estimatedXYZ               = YSpectralSensor.ESTIMATEDXYZ_INVALID;
        /** @member {string} **/
        this._estimatedOkLab             = YSpectralSensor.ESTIMATEDOKLAB_INVALID;
        /** @member {string} **/
        this._nearRAL1                   = YSpectralSensor.NEARRAL1_INVALID;
        /** @member {string} **/
        this._nearRAL2                   = YSpectralSensor.NEARRAL2_INVALID;
        /** @member {string} **/
        this._nearRAL3                   = YSpectralSensor.NEARRAL3_INVALID;
        /** @member {string} **/
        this._nearHTMLColor              = YSpectralSensor.NEARHTMLCOLOR_INVALID;
        /** @member {string} **/
        this._nearSimpleColor            = YSpectralSensor.NEARSIMPLECOLOR_INVALID;
        /** @member {number} **/
        this._ledCurrentAtPowerOn        = YSpectralSensor.LEDCURRENTATPOWERON_INVALID;
        /** @member {number} **/
        this._integrationTimeAtPowerOn   = YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID;
        /** @member {number} **/
        this._gainAtPowerOn              = YSpectralSensor.GAINATPOWERON_INVALID;
        //--- (end of YSpectralSensor constructor)
    }

    //--- (YSpectralSensor implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'ledCurrent':
            this._ledCurrent = parseInt(val);
            return 1;
        case 'resolution':
            this._resolution = Math.round(val / 65.536) / 1000.0;
            return 1;
        case 'integrationTime':
            this._integrationTime = parseInt(val);
            return 1;
        case 'gain':
            this._gain = parseInt(val);
            return 1;
        case 'estimationModel':
            this._estimationModel = parseInt(val);
            return 1;
        case 'saturation':
            this._saturation = parseInt(val);
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
        case 'ledCurrentAtPowerOn':
            this._ledCurrentAtPowerOn = parseInt(val);
            return 1;
        case 'integrationTimeAtPowerOn':
            this._integrationTimeAtPowerOn = parseInt(val);
            return 1;
        case 'gainAtPowerOn':
            this._gainAtPowerOn = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current value of the LED.
     * This method retrieves the current flowing through the LED
     * and returns it as an integer or an object.
     *
     * @return {Promise<number>} an integer corresponding to the current value of the LED
     *
     * On failure, throws an exception or returns YSpectralSensor.LEDCURRENT_INVALID.
     */
    async get_ledCurrent()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.LEDCURRENT_INVALID;
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
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_resolution(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('resolution',rest_val);
    }

    async get_resolution()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.RESOLUTION_INVALID;
            }
        }
        res = this._resolution;
        return res;
    }

    /**
     * Returns the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @return {Promise<number>} an integer corresponding to the current integration time
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIME_INVALID.
     */
    async get_integrationTime()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }

    /**
     * Sets the integration time for data processing.
     * This method takes a parameter `val` and assigns it
     * as the new integration time. This affects the duration
     * for which data is integrated before being processed.
     *
     * @param newval {number} : an integer
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
     * Retrieves the current gain.
     * This method updates the gain value.
     *
     * @return {Promise<number>} an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.GAIN_INVALID.
     */
    async get_gain()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.GAIN_INVALID;
            }
        }
        res = this._gain;
        return res;
    }

    /**
     * Sets the gain for signal processing.
     * This method takes a parameter `val` and assigns it
     * as the new gain. This affects the sensitivity and
     * intensity of the processed signal.
     *
     * @param newval {number} : an integer
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
     * Returns the model for color estimation.
     *
     * @return {Promise<number>} either YSpectralSensor.ESTIMATIONMODEL_REFLECTION or
     * YSpectralSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATIONMODEL_INVALID.
     */
    async get_estimationModel()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATIONMODEL_INVALID;
            }
        }
        res = this._estimationModel;
        return res;
    }

    /**
     * Changes the model for color estimation.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : either YSpectralSensor.ESTIMATIONMODEL_REFLECTION or
     * YSpectralSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
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
     * Returns the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @return {Promise<number>} an integer corresponding to the current saturation of the sensor
     *
     * On failure, throws an exception or returns YSpectralSensor.SATURATION_INVALID.
     */
    async get_saturation()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.SATURATION_INVALID;
            }
        }
        res = this._saturation;
        return res;
    }

    /**
     * Returns the estimated color in RGB format (0xRRGGBB).
     * This method retrieves the estimated color values
     * and returns them as an RGB object or structure.
     *
     * @return {Promise<number>} an integer corresponding to the estimated color in RGB format (0xRRGGBB)
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDRGB_INVALID.
     */
    async get_estimatedRGB()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATEDRGB_INVALID;
            }
        }
        res = this._estimatedRGB;
        return res;
    }

    /**
     * Returns the estimated color in HSL (Hue, Saturation, Lightness) format.
     * This method retrieves the estimated color values
     * and returns them as an HSL object or structure.
     *
     * @return {Promise<number>} an integer corresponding to the estimated color in HSL (Hue, Saturation,
     * Lightness) format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDHSL_INVALID.
     */
    async get_estimatedHSL()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATEDHSL_INVALID;
            }
        }
        res = this._estimatedHSL;
        return res;
    }

    /**
     * Returns the estimated color in XYZ format.
     * This method retrieves the estimated color values
     * and returns them as an XYZ object or structure.
     *
     * @return {Promise<string>} a string corresponding to the estimated color in XYZ format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDXYZ_INVALID.
     */
    async get_estimatedXYZ()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATEDXYZ_INVALID;
            }
        }
        res = this._estimatedXYZ;
        return res;
    }

    /**
     * Returns the estimated color in OkLab format.
     * This method retrieves the estimated color values
     * and returns them as an OkLab object or structure.
     *
     * @return {Promise<string>} a string corresponding to the estimated color in OkLab format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDOKLAB_INVALID.
     */
    async get_estimatedOkLab()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATEDOKLAB_INVALID;
            }
        }
        res = this._estimatedOkLab;
        return res;
    }

    async get_nearRAL1()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARRAL1_INVALID;
            }
        }
        res = this._nearRAL1;
        return res;
    }

    async get_nearRAL2()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARRAL2_INVALID;
            }
        }
        res = this._nearRAL2;
        return res;
    }

    async get_nearRAL3()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARRAL3_INVALID;
            }
        }
        res = this._nearRAL3;
        return res;
    }

    async get_nearHTMLColor()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARHTMLCOLOR_INVALID;
            }
        }
        res = this._nearHTMLColor;
        return res;
    }

    /**
     * Returns the estimated color.
     * This method retrieves the estimated color values
     * and returns them as the color name.
     *
     * @return {Promise<string>} a string corresponding to the estimated color
     *
     * On failure, throws an exception or returns YSpectralSensor.NEARSIMPLECOLOR_INVALID.
     */
    async get_nearSimpleColor()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARSIMPLECOLOR_INVALID;
            }
        }
        res = this._nearSimpleColor;
        return res;
    }

    async get_ledCurrentAtPowerOn()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.LEDCURRENTATPOWERON_INVALID;
            }
        }
        res = this._ledCurrentAtPowerOn;
        return res;
    }

    /**
     * Sets the LED current at power-on.
     * This method takes a parameter `val` and assigns it to startupLumin, representing the LED current defined
     * at startup.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ledCurrentAtPowerOn(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('ledCurrentAtPowerOn',rest_val);
    }

    /**
     * Retrieves the integration time at power-on.
     * This method updates the power-on integration time value.
     *
     * @return {Promise<number>} an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID.
     */
    async get_integrationTimeAtPowerOn()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID;
            }
        }
        res = this._integrationTimeAtPowerOn;
        return res;
    }

    /**
     * Sets the integration time at power-on.
     * This method takes a parameter `val` and assigns it to integrationTimeAtPowerOn, representing the
     * integration time
     * defined at startup.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_integrationTimeAtPowerOn(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('integrationTimeAtPowerOn',rest_val);
    }

    async get_gainAtPowerOn()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.GAINATPOWERON_INVALID;
            }
        }
        res = this._gainAtPowerOn;
        return res;
    }

    /**
     * Sets the gain at power-on.
     * This method takes a parameter `val` and assigns it to startupGain, representing the gain defined at startup.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_gainAtPowerOn(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('gainAtPowerOn',rest_val);
    }

    /**
     * Retrieves a spectral sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralSensor.isOnline() to test if the spectral sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the spectral sensor, for instance
     *         MyDevice.spectralSensor.
     *
     * @return {YSpectralSensor} a YSpectralSensor object allowing you to drive the spectral sensor.
     */
    static FindSpectralSensor(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('SpectralSensor', func);
        if (obj == null) {
            obj = new YSpectralSensor(YAPI, func);
            YFunction._AddToCache('SpectralSensor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a spectral sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralSensor.isOnline() to test if the spectral sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the spectral sensor, for instance
     *         MyDevice.spectralSensor.
     *
     * @return {YSpectralSensor} a YSpectralSensor object allowing you to drive the spectral sensor.
     */
    static FindSpectralSensorInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'SpectralSensor', func);
        if (obj == null) {
            obj = new YSpectralSensor(yctx, func);
            YFunction._AddToCache('SpectralSensor', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of spectral sensors started using yFirstSpectralSensor().
     * Caution: You can't make any assumption about the returned spectral sensors order.
     * If you want to find a specific a spectral sensor, use SpectralSensor.findSpectralSensor()
     * and a hardwareID or a logical name.
     *
     * @return {YSpectralSensor | null} a pointer to a YSpectralSensor object, corresponding to
     *         a spectral sensor currently online, or a null pointer
     *         if there are no more spectral sensors to enumerate.
     */
    nextSpectralSensor()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSpectralSensor.FindSpectralSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of spectral sensors currently accessible.
     * Use the method YSpectralSensor.nextSpectralSensor() to iterate on
     * next spectral sensors.
     *
     * @return {YSpectralSensor | null} a pointer to a YSpectralSensor object, corresponding to
     *         the first spectral sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralSensor()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('SpectralSensor');
        if(next_hwid == null) return null;
        return YSpectralSensor.FindSpectralSensor(next_hwid);
    }

    /**
     * Starts the enumeration of spectral sensors currently accessible.
     * Use the method YSpectralSensor.nextSpectralSensor() to iterate on
     * next spectral sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YSpectralSensor | null} a pointer to a YSpectralSensor object, corresponding to
     *         the first spectral sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralSensorInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('SpectralSensor');
        if(next_hwid == null) return null;
        return YSpectralSensor.FindSpectralSensorInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            LEDCURRENT_INVALID           : YAPI.INVALID_INT,
            RESOLUTION_INVALID           : YAPI.INVALID_DOUBLE,
            INTEGRATIONTIME_INVALID      : YAPI.INVALID_INT,
            GAIN_INVALID                 : YAPI.INVALID_INT,
            ESTIMATIONMODEL_REFLECTION   : 0,
            ESTIMATIONMODEL_EMISSION     : 1,
            ESTIMATIONMODEL_INVALID      : -1,
            SATURATION_INVALID           : YAPI.INVALID_UINT,
            ESTIMATEDRGB_INVALID         : YAPI.INVALID_UINT,
            ESTIMATEDHSL_INVALID         : YAPI.INVALID_UINT,
            ESTIMATEDXYZ_INVALID         : YAPI.INVALID_STRING,
            ESTIMATEDOKLAB_INVALID       : YAPI.INVALID_STRING,
            NEARRAL1_INVALID             : YAPI.INVALID_STRING,
            NEARRAL2_INVALID             : YAPI.INVALID_STRING,
            NEARRAL3_INVALID             : YAPI.INVALID_STRING,
            NEARHTMLCOLOR_INVALID        : YAPI.INVALID_STRING,
            NEARSIMPLECOLOR_INVALID      : YAPI.INVALID_STRING,
            LEDCURRENTATPOWERON_INVALID  : YAPI.INVALID_INT,
            INTEGRATIONTIMEATPOWERON_INVALID : YAPI.INVALID_INT,
            GAINATPOWERON_INVALID        : YAPI.INVALID_INT
        });
    }

    //--- (end of YSpectralSensor implementation)
}

//
// YSpectralSensorProxy Class: synchronous proxy to YSpectralSensor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YSpectralSensor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YSpectralSensorProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YSpectralSensor accessors declaration)

    /**
     * Returns the current value of the LED.
     * This method retrieves the current flowing through the LED
     * and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current value of the LED
     *
     * On failure, throws an exception or returns YSpectralSensor.LEDCURRENT_INVALID.
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
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_resolution(newval)
    {
        this.liveFunc.set_resolution(newval);
        return this._yapi.SUCCESS;
    }

    get_resolution()
    {
        return this.liveFunc._resolution;
    }

    /**
     * Returns the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current integration time
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIME_INVALID.
     */
    get_integrationTime()
    {
        return this.liveFunc._integrationTime;
    }

    /**
     * Sets the integration time for data processing.
     * This method takes a parameter `val` and assigns it
     * as the new integration time. This affects the duration
     * for which data is integrated before being processed.
     *
     * @param newval : an integer
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
     * Retrieves the current gain.
     * This method updates the gain value.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.GAIN_INVALID.
     */
    get_gain()
    {
        return this.liveFunc._gain;
    }

    /**
     * Sets the gain for signal processing.
     * This method takes a parameter `val` and assigns it
     * as the new gain. This affects the sensitivity and
     * intensity of the processed signal.
     *
     * @param newval : an integer
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
     * Returns the model for color estimation.
     *
     * @return either YSpectralSensor.ESTIMATIONMODEL_REFLECTION or
     * YSpectralSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATIONMODEL_INVALID.
     */
    get_estimationModel()
    {
        return this.liveFunc._estimationModel;
    }

    /**
     * Changes the model for color estimation.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YSpectralSensor.ESTIMATIONMODEL_REFLECTION or
     * YSpectralSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
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
     * Returns the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @return an integer corresponding to the current saturation of the sensor
     *
     * On failure, throws an exception or returns YSpectralSensor.SATURATION_INVALID.
     */
    get_saturation()
    {
        return this.liveFunc._saturation;
    }

    /**
     * Returns the estimated color in RGB format (0xRRGGBB).
     * This method retrieves the estimated color values
     * and returns them as an RGB object or structure.
     *
     * @return an integer corresponding to the estimated color in RGB format (0xRRGGBB)
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDRGB_INVALID.
     */
    get_estimatedRGB()
    {
        return this.liveFunc._estimatedRGB;
    }

    /**
     * Returns the estimated color in HSL (Hue, Saturation, Lightness) format.
     * This method retrieves the estimated color values
     * and returns them as an HSL object or structure.
     *
     * @return an integer corresponding to the estimated color in HSL (Hue, Saturation, Lightness) format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDHSL_INVALID.
     */
    get_estimatedHSL()
    {
        return this.liveFunc._estimatedHSL;
    }

    /**
     * Returns the estimated color in XYZ format.
     * This method retrieves the estimated color values
     * and returns them as an XYZ object or structure.
     *
     * @return a string corresponding to the estimated color in XYZ format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDXYZ_INVALID.
     */
    get_estimatedXYZ()
    {
        return this.liveFunc._estimatedXYZ;
    }

    /**
     * Returns the estimated color in OkLab format.
     * This method retrieves the estimated color values
     * and returns them as an OkLab object or structure.
     *
     * @return a string corresponding to the estimated color in OkLab format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDOKLAB_INVALID.
     */
    get_estimatedOkLab()
    {
        return this.liveFunc._estimatedOkLab;
    }

    get_nearRAL1()
    {
        return this.liveFunc._nearRAL1;
    }

    get_nearRAL2()
    {
        return this.liveFunc._nearRAL2;
    }

    get_nearRAL3()
    {
        return this.liveFunc._nearRAL3;
    }

    get_nearHTMLColor()
    {
        return this.liveFunc._nearHTMLColor;
    }

    /**
     * Returns the estimated color.
     * This method retrieves the estimated color values
     * and returns them as the color name.
     *
     * @return a string corresponding to the estimated color
     *
     * On failure, throws an exception or returns YSpectralSensor.NEARSIMPLECOLOR_INVALID.
     */
    get_nearSimpleColor()
    {
        return this.liveFunc._nearSimpleColor;
    }

    get_ledCurrentAtPowerOn()
    {
        return this.liveFunc._ledCurrentAtPowerOn;
    }

    /**
     * Sets the LED current at power-on.
     * This method takes a parameter `val` and assigns it to startupLumin, representing the LED current defined
     * at startup.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ledCurrentAtPowerOn(newval)
    {
        this.liveFunc.set_ledCurrentAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Retrieves the integration time at power-on.
     * This method updates the power-on integration time value.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID.
     */
    get_integrationTimeAtPowerOn()
    {
        return this.liveFunc._integrationTimeAtPowerOn;
    }

    /**
     * Sets the integration time at power-on.
     * This method takes a parameter `val` and assigns it to integrationTimeAtPowerOn, representing the
     * integration time
     * defined at startup.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_integrationTimeAtPowerOn(newval)
    {
        this.liveFunc.set_integrationTimeAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }

    get_gainAtPowerOn()
    {
        return this.liveFunc._gainAtPowerOn;
    }

    /**
     * Sets the gain at power-on.
     * This method takes a parameter `val` and assigns it to startupGain, representing the gain defined at startup.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_gainAtPowerOn(newval)
    {
        this.liveFunc.set_gainAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YSpectralSensor accessors declaration)
}

//--- (YSpectralSensor functions)

YoctoLibExport('YSpectralSensor', YSpectralSensor);
YoctoLibExport('YSpectralSensorProxy', YSpectralSensorProxy);
YSpectralSensor.imm_Init();

//--- (end of YSpectralSensor functions)

