/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for InputCaptureData functions
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

//--- (generated code: YInputCaptureData definitions)
//--- (end of generated code: YInputCaptureData definitions)

//--- (generated code: YInputCaptureData class start)
/**
 * YInputCaptureData Class: Sampled data from a Yoctopuce electrical sensor
 *
 * InputCaptureData objects represent raw data
 * sampled by the analog/digital converter present in
 * a Yoctopuce electrical sensor. When several inputs
 * are samples simultaneously, their data are provided
 * as distinct series.
 */
//--- (end of generated code: YInputCaptureData class start)

class YInputCaptureData
{
    constructor(obj_yfunc, sdata)
    {
        this._yapi = obj_yfunc._yapi;
        //--- (generated code: YInputCaptureData constructor)
        /** @member {number} **/
        this._fmt                        = 0;
        /** @member {number} **/
        this._var1size                   = 0;
        /** @member {number} **/
        this._var2size                   = 0;
        /** @member {number} **/
        this._var3size                   = 0;
        /** @member {number} **/
        this._nVars                      = 0;
        /** @member {number} **/
        this._recOfs                     = 0;
        /** @member {number} **/
        this._nRecs                      = 0;
        /** @member {number} **/
        this._samplesPerSec              = 0;
        /** @member {number} **/
        this._trigType                   = 0;
        /** @member {number} **/
        this._trigVal                    = 0;
        /** @member {number} **/
        this._trigPos                    = 0;
        /** @member {number} **/
        this._trigUTC                    = 0;
        /** @member {string} **/
        this._var1unit                   = '';
        /** @member {string} **/
        this._var2unit                   = '';
        /** @member {string} **/
        this._var3unit                   = '';
        /** @member {number[]} **/
        this._var1samples                = [];
        /** @member {number[]} **/
        this._var2samples                = [];
        /** @member {number[]} **/
        this._var3samples                = [];
        //--- (end of generated code: YInputCaptureData constructor)
        this.imm_decodeSnapBin(sdata);
    }

    _throw(int_errType, str_errMsg, obj_retVal)
    {
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    //--- (generated code: YInputCaptureData implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    imm_decodeU16(sdata,ofs)
    {
        /** @type {number} **/
        let v;
        v = sdata[ofs];
        v = v + 256 * sdata[ofs+1];
        return v;
    }

    imm_decodeU32(sdata,ofs)
    {
        /** @type {number} **/
        let v;
        v = this.imm_decodeU16(sdata, ofs);
        v = v + 65536.0 * this.imm_decodeU16(sdata, ofs+2);
        return v;
    }

    imm_decodeVal(sdata,ofs,len)
    {
        /** @type {number} **/
        let v;
        /** @type {number} **/
        let b;
        v = this.imm_decodeU16(sdata, ofs);
        b = 65536.0;
        ofs = ofs + 2;
        len = len - 2;
        while (len > 0) {
            v = v + b * sdata[ofs];
            b = b * 256;
            ofs = ofs + 1;
            len = len - 1;
        }
        if (v > (b/2)) {
            // negative number
            v = v - b;
        }
        return v;
    }

    imm_decodeSnapBin(sdata)
    {
        /** @type {number} **/
        let buffSize;
        /** @type {number} **/
        let recOfs;
        /** @type {number} **/
        let ms;
        /** @type {number} **/
        let recSize;
        /** @type {number} **/
        let count;
        /** @type {number} **/
        let mult1;
        /** @type {number} **/
        let mult2;
        /** @type {number} **/
        let mult3;
        /** @type {number} **/
        let v;

        buffSize = (sdata).length;
        if (!(buffSize >= 24)) {
            return this._throw(YAPI.INVALID_ARGUMENT,'Invalid snapshot data (too short)',YAPI.INVALID_ARGUMENT);
        }
        this._fmt = sdata[0];
        this._var1size = sdata[1] - 48;
        this._var2size = sdata[2] - 48;
        this._var3size = sdata[3] - 48;
        if (!(this._fmt == 83)) {
            return this._throw(YAPI.INVALID_ARGUMENT,'Unsupported snapshot format',YAPI.INVALID_ARGUMENT);
        }
        if (!((this._var1size >= 2) && (this._var1size <= 4))) {
            return this._throw(YAPI.INVALID_ARGUMENT,'Invalid sample size',YAPI.INVALID_ARGUMENT);
        }
        if (!((this._var2size >= 0) && (this._var1size <= 4))) {
            return this._throw(YAPI.INVALID_ARGUMENT,'Invalid sample size',YAPI.INVALID_ARGUMENT);
        }
        if (!((this._var3size >= 0) && (this._var1size <= 4))) {
            return this._throw(YAPI.INVALID_ARGUMENT,'Invalid sample size',YAPI.INVALID_ARGUMENT);
        }
        if (this._var2size == 0) {
            this._nVars = 1;
        } else {
            if (this._var3size == 0) {
                this._nVars = 2;
            } else {
                this._nVars = 3;
            }
        }
        recSize = this._var1size + this._var2size + this._var3size;
        this._recOfs = this.imm_decodeU16(sdata, 4);
        this._nRecs = this.imm_decodeU16(sdata, 6);
        this._samplesPerSec = this.imm_decodeU16(sdata, 8);
        this._trigType = this.imm_decodeU16(sdata, 10);
        this._trigVal = this.imm_decodeVal(sdata,  12, 4) / 1000;
        this._trigPos = this.imm_decodeU16(sdata, 16);
        ms = this.imm_decodeU16(sdata, 18);
        this._trigUTC = this.imm_decodeVal(sdata,  20, 4);
        this._trigUTC = this._trigUTC + (ms / 1000.0);
        recOfs = 24;
        while (sdata[recOfs] >= 32) {
            this._var1unit = this._var1unit+''+String.fromCharCode(sdata[recOfs]);
            recOfs = recOfs + 1;
        }
        if (this._var2size > 0) {
            recOfs = recOfs + 1;
            while (sdata[recOfs] >= 32) {
                this._var2unit = this._var2unit+''+String.fromCharCode(sdata[recOfs]);
                recOfs = recOfs + 1;
            }
        }
        if (this._var3size > 0) {
            recOfs = recOfs + 1;
            while (sdata[recOfs] >= 32) {
                this._var3unit = this._var3unit+''+String.fromCharCode(sdata[recOfs]);
                recOfs = recOfs + 1;
            }
        }
        if (((recOfs) & (1)) == 1) {
            // align to next word
            recOfs = recOfs + 1;
        }
        mult1 = 1;
        mult2 = 1;
        mult3 = 1;
        if (recOfs < this._recOfs) {
            // load optional value multiplier
            mult1 = this.imm_decodeU16(sdata, recOfs);
            recOfs = recOfs + 2;
            if (this._var2size > 0) {
                mult2 = this.imm_decodeU16(sdata, recOfs);
                recOfs = recOfs + 2;
            }
            if (this._var3size > 0) {
                mult3 = this.imm_decodeU16(sdata, recOfs);
                recOfs = recOfs + 2;
            }
        }
        recOfs = this._recOfs;
        count = this._nRecs;
        while ((count > 0) && (recOfs + this._var1size <= buffSize)) {
            v = this.imm_decodeVal(sdata,  recOfs, this._var1size) / 1000.0;
            this._var1samples.push(v*mult1);
            recOfs = recOfs + recSize;
        }
        if (this._var2size > 0) {
            recOfs = this._recOfs + this._var1size;
            count = this._nRecs;
            while ((count > 0) && (recOfs + this._var2size <= buffSize)) {
                v = this.imm_decodeVal(sdata,  recOfs, this._var2size) / 1000.0;
                this._var2samples.push(v*mult2);
                recOfs = recOfs + recSize;
            }
        }
        if (this._var3size > 0) {
            recOfs = this._recOfs + this._var1size + this._var2size;
            count = this._nRecs;
            while ((count > 0) && (recOfs + this._var3size <= buffSize)) {
                v = this.imm_decodeVal(sdata,  recOfs, this._var3size) / 1000.0;
                this._var3samples.push(v*mult3);
                recOfs = recOfs + recSize;
            }
        }
        return YAPI.SUCCESS;
    }

    /**
     * Returns the number of series available in the capture.
     *
     * @return {number} an integer corresponding to the number of
     *         simultaneous data series available.
     */
    get_serieCount()
    {
        return this._nVars;
    }

    /**
     * Returns the number of records captured (in a serie).
     * In the exceptional case where it was not possible
     * to transfer all data in time, the number of records
     * actually present in the series might be lower than
     * the number of records captured
     *
     * @return {number} an integer corresponding to the number of
     *         records expected in each serie.
     */
    get_recordCount()
    {
        return this._nRecs;
    }

    /**
     * Returns the effective sampling rate of the device.
     *
     * @return {number} an integer corresponding to the number of
     *         samples taken each second.
     */
    get_samplingRate()
    {
        return this._samplesPerSec;
    }

    /**
     * Returns the type of automatic conditional capture
     * that triggered the capture of this data sequence.
     *
     * @return {number} the type of conditional capture.
     */
    get_captureType()
    {
        return this._trigType;
    }

    /**
     * Returns the threshold value that triggered
     * this automatic conditional capture, if it was
     * not an instant captured triggered manually.
     *
     * @return {number} the conditional threshold value
     *         at the time of capture.
     */
    get_triggerValue()
    {
        return this._trigVal;
    }

    /**
     * Returns the index in the series of the sample
     * corresponding to the exact time when the capture
     * was triggered. In case of trigger based on average
     * or RMS value, the trigger index corresponds to
     * the end of the averaging period.
     *
     * @return {number} an integer corresponding to a position
     *         in the data serie.
     */
    get_triggerPosition()
    {
        return this._trigPos;
    }

    /**
     * Returns the absolute time when the capture was
     * triggered, as a Unix timestamp. Milliseconds are
     * included in this timestamp (floating-point number).
     *
     * @return {number} a floating-point number corresponding to
     *         the number of seconds between the Jan 1,
     *         1970 and the moment where the capture
     *         was triggered.
     */
    get_triggerRealTimeUTC()
    {
        return this._trigUTC;
    }

    /**
     * Returns the unit of measurement for data points in
     * the first serie.
     *
     * @return {string} a string containing to a physical unit of
     *         measurement.
     */
    get_serie1Unit()
    {
        return this._var1unit;
    }

    /**
     * Returns the unit of measurement for data points in
     * the second serie.
     *
     * @return {string} a string containing to a physical unit of
     *         measurement.
     */
    get_serie2Unit()
    {
        if (!(this._nVars >= 2)) {
            return this._throw(YAPI.INVALID_ARGUMENT,'There is no serie 2 in this capture data','');
        }
        return this._var2unit;
    }

    /**
     * Returns the unit of measurement for data points in
     * the third serie.
     *
     * @return {string} a string containing to a physical unit of
     *         measurement.
     */
    get_serie3Unit()
    {
        if (!(this._nVars >= 3)) {
            return this._throw(YAPI.INVALID_ARGUMENT,'There is no serie 3 in this capture data','');
        }
        return this._var3unit;
    }

    /**
     * Returns the sampled data corresponding to the first serie.
     * The corresponding physical unit can be obtained
     * using the method get_serie1Unit().
     *
     * @return {number[]} a list of real numbers corresponding to all
     *         samples received for serie 1.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_serie1Values()
    {
        return this._var1samples;
    }

    /**
     * Returns the sampled data corresponding to the second serie.
     * The corresponding physical unit can be obtained
     * using the method get_serie2Unit().
     *
     * @return {number[]} a list of real numbers corresponding to all
     *         samples received for serie 2.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_serie2Values()
    {
        if (!(this._nVars >= 2)) {
            return this._throw(YAPI.INVALID_ARGUMENT,'There is no serie 2 in this capture data',this._var2samples);
        }
        return this._var2samples;
    }

    /**
     * Returns the sampled data corresponding to the third serie.
     * The corresponding physical unit can be obtained
     * using the method get_serie3Unit().
     *
     * @return {number[]} a list of real numbers corresponding to all
     *         samples received for serie 3.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_serie3Values()
    {
        if (!(this._nVars >= 3)) {
            return this._throw(YAPI.INVALID_ARGUMENT,'There is no serie 3 in this capture data',this._var3samples);
        }
        return this._var3samples;
    }

    //--- (end of generated code: YInputCaptureData implementation)
}

//--- (generated code: YInputCaptureData functions)

YoctoLibExport('YInputCaptureData', YInputCaptureData);
YInputCaptureData.imm_Init();

//--- (end of generated code: YInputCaptureData functions)


//--- (generated code: YInputCapture return codes)
//--- (end of generated code: YInputCapture return codes)
//--- (generated code: YInputCapture definitions)
//--- (end of generated code: YInputCapture definitions)

//--- (generated code: YInputCapture class start)
/**
 * YInputCapture Class: instant snapshot trigger control interface
 *
 * The YInputCapture class allows you to access data samples
 * measured by a Yoctopuce electrical sensor. The data capture can be
 * triggered manually, or be configured to detect specific events.
 */
//--- (end of generated code: YInputCapture class start)

class YInputCapture extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (generated code: YInputCapture constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'InputCapture';
        /** @member {number} **/
        this._lastCaptureTime            = YInputCapture.LASTCAPTURETIME_INVALID;
        /** @member {number} **/
        this._nSamples                   = YInputCapture.NSAMPLES_INVALID;
        /** @member {number} **/
        this._samplingRate               = YInputCapture.SAMPLINGRATE_INVALID;
        /** @member {number} **/
        this._captureType                = YInputCapture.CAPTURETYPE_INVALID;
        /** @member {number} **/
        this._condValue                  = YInputCapture.CONDVALUE_INVALID;
        /** @member {number} **/
        this._condAlign                  = YInputCapture.CONDALIGN_INVALID;
        /** @member {number} **/
        this._captureTypeAtStartup       = YInputCapture.CAPTURETYPEATSTARTUP_INVALID;
        /** @member {number} **/
        this._condValueAtStartup         = YInputCapture.CONDVALUEATSTARTUP_INVALID;
        //--- (end of generated code: YInputCapture constructor)
    }

    //--- (generated code: YInputCapture implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'lastCaptureTime':
            this._lastCaptureTime = parseInt(val);
            return 1;
        case 'nSamples':
            this._nSamples = parseInt(val);
            return 1;
        case 'samplingRate':
            this._samplingRate = parseInt(val);
            return 1;
        case 'captureType':
            this._captureType = parseInt(val);
            return 1;
        case 'condValue':
            this._condValue = Math.round(val / 65.536) / 1000.0;
            return 1;
        case 'condAlign':
            this._condAlign = parseInt(val);
            return 1;
        case 'captureTypeAtStartup':
            this._captureTypeAtStartup = parseInt(val);
            return 1;
        case 'condValueAtStartup':
            this._condValueAtStartup = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on
     * and the last capture (time of trigger), or zero if no capture has been done.
     *
     * @return {Promise<number>} an integer corresponding to the number of elapsed milliseconds between
     * the module power on
     *         and the last capture (time of trigger), or zero if no capture has been done
     *
     * On failure, throws an exception or returns YInputCapture.LASTCAPTURETIME_INVALID.
     */
    async get_lastCaptureTime()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.LASTCAPTURETIME_INVALID;
            }
        }
        res = this._lastCaptureTime;
        return res;
    }

    /**
     * Returns the number of samples that will be captured.
     *
     * @return {Promise<number>} an integer corresponding to the number of samples that will be captured
     *
     * On failure, throws an exception or returns YInputCapture.NSAMPLES_INVALID.
     */
    async get_nSamples()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.NSAMPLES_INVALID;
            }
        }
        res = this._nSamples;
        return res;
    }

    /**
     * Changes the type of automatic conditional capture.
     * The maximum number of samples depends on the device memory.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval {number} : an integer corresponding to the type of automatic conditional capture
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_nSamples(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('nSamples',rest_val);
    }

    /**
     * Returns the sampling frequency, in Hz.
     *
     * @return {Promise<number>} an integer corresponding to the sampling frequency, in Hz
     *
     * On failure, throws an exception or returns YInputCapture.SAMPLINGRATE_INVALID.
     */
    async get_samplingRate()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.SAMPLINGRATE_INVALID;
            }
        }
        res = this._samplingRate;
        return res;
    }

    /**
     * Returns the type of automatic conditional capture.
     *
     * @return {Promise<number>} a value among YInputCapture.CAPTURETYPE_NONE,
     * YInputCapture.CAPTURETYPE_TIMED, YInputCapture.CAPTURETYPE_V_MAX, YInputCapture.CAPTURETYPE_V_MIN,
     * YInputCapture.CAPTURETYPE_I_MAX, YInputCapture.CAPTURETYPE_I_MIN, YInputCapture.CAPTURETYPE_P_MAX,
     * YInputCapture.CAPTURETYPE_P_MIN, YInputCapture.CAPTURETYPE_V_AVG_MAX,
     * YInputCapture.CAPTURETYPE_V_AVG_MIN, YInputCapture.CAPTURETYPE_V_RMS_MAX,
     * YInputCapture.CAPTURETYPE_V_RMS_MIN, YInputCapture.CAPTURETYPE_I_AVG_MAX,
     * YInputCapture.CAPTURETYPE_I_AVG_MIN, YInputCapture.CAPTURETYPE_I_RMS_MAX,
     * YInputCapture.CAPTURETYPE_I_RMS_MIN, YInputCapture.CAPTURETYPE_P_AVG_MAX,
     * YInputCapture.CAPTURETYPE_P_AVG_MIN, YInputCapture.CAPTURETYPE_PF_MIN and
     * YInputCapture.CAPTURETYPE_DPF_MIN corresponding to the type of automatic conditional capture
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPE_INVALID.
     */
    async get_captureType()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CAPTURETYPE_INVALID;
            }
        }
        res = this._captureType;
        return res;
    }

    /**
     * Changes the type of automatic conditional capture.
     *
     * @param newval {number} : a value among YInputCapture.CAPTURETYPE_NONE,
     * YInputCapture.CAPTURETYPE_TIMED, YInputCapture.CAPTURETYPE_V_MAX, YInputCapture.CAPTURETYPE_V_MIN,
     * YInputCapture.CAPTURETYPE_I_MAX, YInputCapture.CAPTURETYPE_I_MIN, YInputCapture.CAPTURETYPE_P_MAX,
     * YInputCapture.CAPTURETYPE_P_MIN, YInputCapture.CAPTURETYPE_V_AVG_MAX,
     * YInputCapture.CAPTURETYPE_V_AVG_MIN, YInputCapture.CAPTURETYPE_V_RMS_MAX,
     * YInputCapture.CAPTURETYPE_V_RMS_MIN, YInputCapture.CAPTURETYPE_I_AVG_MAX,
     * YInputCapture.CAPTURETYPE_I_AVG_MIN, YInputCapture.CAPTURETYPE_I_RMS_MAX,
     * YInputCapture.CAPTURETYPE_I_RMS_MIN, YInputCapture.CAPTURETYPE_P_AVG_MAX,
     * YInputCapture.CAPTURETYPE_P_AVG_MIN, YInputCapture.CAPTURETYPE_PF_MIN and
     * YInputCapture.CAPTURETYPE_DPF_MIN corresponding to the type of automatic conditional capture
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_captureType(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('captureType',rest_val);
    }

    /**
     * Changes current threshold value for automatic conditional capture.
     *
     * @param newval {number} : a floating point number corresponding to current threshold value for
     * automatic conditional capture
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_condValue(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('condValue',rest_val);
    }

    /**
     * Returns current threshold value for automatic conditional capture.
     *
     * @return {Promise<number>} a floating point number corresponding to current threshold value for
     * automatic conditional capture
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUE_INVALID.
     */
    async get_condValue()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CONDVALUE_INVALID;
            }
        }
        res = this._condValue;
        return res;
    }

    /**
     * Returns the relative position of the trigger event within the capture window.
     * When the value is 50%, the capture is centered on the event.
     *
     * @return {Promise<number>} an integer corresponding to the relative position of the trigger event
     * within the capture window
     *
     * On failure, throws an exception or returns YInputCapture.CONDALIGN_INVALID.
     */
    async get_condAlign()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CONDALIGN_INVALID;
            }
        }
        res = this._condAlign;
        return res;
    }

    /**
     * Changes the relative position of the trigger event within the capture window.
     * The new value must be between 10% (on the left) and 90% (on the right).
     * When the value is 50%, the capture is centered on the event.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval {number} : an integer corresponding to the relative position of the trigger event
     * within the capture window
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_condAlign(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('condAlign',rest_val);
    }

    /**
     * Returns the type of automatic conditional capture
     * applied at device power on.
     *
     * @return {Promise<number>} a value among YInputCapture.CAPTURETYPEATSTARTUP_NONE,
     * YInputCapture.CAPTURETYPEATSTARTUP_TIMED, YInputCapture.CAPTURETYPEATSTARTUP_V_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN and
     * YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN corresponding to the type of automatic conditional capture
     *         applied at device power on
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPEATSTARTUP_INVALID.
     */
    async get_captureTypeAtStartup()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CAPTURETYPEATSTARTUP_INVALID;
            }
        }
        res = this._captureTypeAtStartup;
        return res;
    }

    /**
     * Changes the type of automatic conditional capture
     * applied at device power on.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval {number} : a value among YInputCapture.CAPTURETYPEATSTARTUP_NONE,
     * YInputCapture.CAPTURETYPEATSTARTUP_TIMED, YInputCapture.CAPTURETYPEATSTARTUP_V_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN and
     * YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN corresponding to the type of automatic conditional capture
     *         applied at device power on
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_captureTypeAtStartup(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('captureTypeAtStartup',rest_val);
    }

    /**
     * Changes current threshold value for automatic conditional
     * capture applied at device power on.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval {number} : a floating point number corresponding to current threshold value for
     * automatic conditional
     *         capture applied at device power on
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_condValueAtStartup(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('condValueAtStartup',rest_val);
    }

    /**
     * Returns the threshold value for automatic conditional
     * capture applied at device power on.
     *
     * @return {Promise<number>} a floating point number corresponding to the threshold value for automatic conditional
     *         capture applied at device power on
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUEATSTARTUP_INVALID.
     */
    async get_condValueAtStartup()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CONDVALUEATSTARTUP_INVALID;
            }
        }
        res = this._condValueAtStartup;
        return res;
    }

    /**
     * Retrieves an instant snapshot trigger for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the instant snapshot trigger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputCapture.isOnline() to test if the instant snapshot trigger is
     * indeed online at a given time. In case of ambiguity when looking for
     * an instant snapshot trigger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the instant snapshot trigger, for instance
     *         MyDevice.inputCapture.
     *
     * @return {YInputCapture} a YInputCapture object allowing you to drive the instant snapshot trigger.
     */
    static FindInputCapture(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('InputCapture', func);
        if (obj == null) {
            obj = new YInputCapture(YAPI, func);
            YFunction._AddToCache('InputCapture',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an instant snapshot trigger for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the instant snapshot trigger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputCapture.isOnline() to test if the instant snapshot trigger is
     * indeed online at a given time. In case of ambiguity when looking for
     * an instant snapshot trigger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the instant snapshot trigger, for instance
     *         MyDevice.inputCapture.
     *
     * @return {YInputCapture} a YInputCapture object allowing you to drive the instant snapshot trigger.
     */
    static FindInputCaptureInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'InputCapture', func);
        if (obj == null) {
            obj = new YInputCapture(yctx, func);
            YFunction._AddToCache('InputCapture',  func, obj);
        }
        return obj;
    }

    /**
     * Returns all details about the last automatic input capture.
     *
     * @return {Promise<YInputCaptureData>} an YInputCaptureData object including
     *         data series and all related meta-information.
     *         On failure, throws an exception or returns an capture object.
     */
    async get_lastCapture()
    {
        /** @type {Uint8Array} **/
        let snapData;

        snapData = await this._download('snap.bin');
        return new YInputCaptureData(this, snapData);
    }

    /**
     * Returns a new immediate capture of the device inputs.
     *
     * @param msDuration {number} : duration of the capture window,
     *         in milliseconds (eg. between 20 and 1000).
     *
     * @return {Promise<YInputCaptureData>} an YInputCaptureData object including
     *         data series for the specified duration.
     *         On failure, throws an exception or returns an capture object.
     */
    async get_immediateCapture(msDuration)
    {
        /** @type {string} **/
        let snapUrl;
        /** @type {Uint8Array} **/
        let snapData;
        /** @type {number} **/
        let snapStart;
        if (msDuration < 1) {
            msDuration = 20;
        }
        if (msDuration > 1000) {
            msDuration = 1000;
        }
        snapStart = parseInt((-msDuration) / (2), 10);
        snapUrl = 'snap.bin?t='+String(Math.round(snapStart))+'&d='+String(Math.round(msDuration));

        snapData = await this._download(snapUrl);
        return new YInputCaptureData(this, snapData);
    }

    /**
     * Returns the next InputCapture
     *
     * @returns {YInputCapture}
     */
    nextInputCapture()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YInputCapture.FindInputCaptureInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first InputCapture in a YAPI context
     *
     * @returns {YInputCapture}
     */
    static FirstInputCapture()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('InputCapture');
        if(next_hwid == null) return null;
        return YInputCapture.FindInputCapture(next_hwid);
    }

    /**
     * Retrieves the first InputCapture in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YInputCapture}
     */
    static FirstInputCaptureInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('InputCapture');
        if(next_hwid == null) return null;
        return YInputCapture.FindInputCaptureInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            LASTCAPTURETIME_INVALID      : YAPI.INVALID_LONG,
            NSAMPLES_INVALID             : YAPI.INVALID_UINT,
            SAMPLINGRATE_INVALID         : YAPI.INVALID_UINT,
            CAPTURETYPE_NONE             : 0,
            CAPTURETYPE_TIMED            : 1,
            CAPTURETYPE_V_MAX            : 2,
            CAPTURETYPE_V_MIN            : 3,
            CAPTURETYPE_I_MAX            : 4,
            CAPTURETYPE_I_MIN            : 5,
            CAPTURETYPE_P_MAX            : 6,
            CAPTURETYPE_P_MIN            : 7,
            CAPTURETYPE_V_AVG_MAX        : 8,
            CAPTURETYPE_V_AVG_MIN        : 9,
            CAPTURETYPE_V_RMS_MAX        : 10,
            CAPTURETYPE_V_RMS_MIN        : 11,
            CAPTURETYPE_I_AVG_MAX        : 12,
            CAPTURETYPE_I_AVG_MIN        : 13,
            CAPTURETYPE_I_RMS_MAX        : 14,
            CAPTURETYPE_I_RMS_MIN        : 15,
            CAPTURETYPE_P_AVG_MAX        : 16,
            CAPTURETYPE_P_AVG_MIN        : 17,
            CAPTURETYPE_PF_MIN           : 18,
            CAPTURETYPE_DPF_MIN          : 19,
            CAPTURETYPE_INVALID          : -1,
            CONDVALUE_INVALID            : YAPI.INVALID_DOUBLE,
            CONDALIGN_INVALID            : YAPI.INVALID_UINT,
            CAPTURETYPEATSTARTUP_NONE    : 0,
            CAPTURETYPEATSTARTUP_TIMED   : 1,
            CAPTURETYPEATSTARTUP_V_MAX   : 2,
            CAPTURETYPEATSTARTUP_V_MIN   : 3,
            CAPTURETYPEATSTARTUP_I_MAX   : 4,
            CAPTURETYPEATSTARTUP_I_MIN   : 5,
            CAPTURETYPEATSTARTUP_P_MAX   : 6,
            CAPTURETYPEATSTARTUP_P_MIN   : 7,
            CAPTURETYPEATSTARTUP_V_AVG_MAX : 8,
            CAPTURETYPEATSTARTUP_V_AVG_MIN : 9,
            CAPTURETYPEATSTARTUP_V_RMS_MAX : 10,
            CAPTURETYPEATSTARTUP_V_RMS_MIN : 11,
            CAPTURETYPEATSTARTUP_I_AVG_MAX : 12,
            CAPTURETYPEATSTARTUP_I_AVG_MIN : 13,
            CAPTURETYPEATSTARTUP_I_RMS_MAX : 14,
            CAPTURETYPEATSTARTUP_I_RMS_MIN : 15,
            CAPTURETYPEATSTARTUP_P_AVG_MAX : 16,
            CAPTURETYPEATSTARTUP_P_AVG_MIN : 17,
            CAPTURETYPEATSTARTUP_PF_MIN  : 18,
            CAPTURETYPEATSTARTUP_DPF_MIN : 19,
            CAPTURETYPEATSTARTUP_INVALID : -1,
            CONDVALUEATSTARTUP_INVALID   : YAPI.INVALID_DOUBLE
        });
    }

    //--- (end of generated code: YInputCapture implementation)
}

//
// YInputCaptureProxy Class: synchronous proxy to YInputCapture objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YInputCapture objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YInputCaptureProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (generated code: YInputCapture accessors declaration)

    /**
     * Returns the number of elapsed milliseconds between the module power on
     * and the last capture (time of trigger), or zero if no capture has been done.
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     *         and the last capture (time of trigger), or zero if no capture has been done
     *
     * On failure, throws an exception or returns YInputCapture.LASTCAPTURETIME_INVALID.
     */
    get_lastCaptureTime()
    {
        return this.liveFunc._lastCaptureTime;
    }

    /**
     * Returns the number of samples that will be captured.
     *
     * @return an integer corresponding to the number of samples that will be captured
     *
     * On failure, throws an exception or returns YInputCapture.NSAMPLES_INVALID.
     */
    get_nSamples()
    {
        return this.liveFunc._nSamples;
    }

    /**
     * Changes the type of automatic conditional capture.
     * The maximum number of samples depends on the device memory.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : an integer corresponding to the type of automatic conditional capture
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nSamples(newval)
    {
        this.liveFunc.set_nSamples(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the sampling frequency, in Hz.
     *
     * @return an integer corresponding to the sampling frequency, in Hz
     *
     * On failure, throws an exception or returns YInputCapture.SAMPLINGRATE_INVALID.
     */
    get_samplingRate()
    {
        return this.liveFunc._samplingRate;
    }

    /**
     * Returns the type of automatic conditional capture.
     *
     * @return a value among YInputCapture.CAPTURETYPE_NONE, YInputCapture.CAPTURETYPE_TIMED,
     * YInputCapture.CAPTURETYPE_V_MAX, YInputCapture.CAPTURETYPE_V_MIN, YInputCapture.CAPTURETYPE_I_MAX,
     * YInputCapture.CAPTURETYPE_I_MIN, YInputCapture.CAPTURETYPE_P_MAX, YInputCapture.CAPTURETYPE_P_MIN,
     * YInputCapture.CAPTURETYPE_V_AVG_MAX, YInputCapture.CAPTURETYPE_V_AVG_MIN,
     * YInputCapture.CAPTURETYPE_V_RMS_MAX, YInputCapture.CAPTURETYPE_V_RMS_MIN,
     * YInputCapture.CAPTURETYPE_I_AVG_MAX, YInputCapture.CAPTURETYPE_I_AVG_MIN,
     * YInputCapture.CAPTURETYPE_I_RMS_MAX, YInputCapture.CAPTURETYPE_I_RMS_MIN,
     * YInputCapture.CAPTURETYPE_P_AVG_MAX, YInputCapture.CAPTURETYPE_P_AVG_MIN,
     * YInputCapture.CAPTURETYPE_PF_MIN and YInputCapture.CAPTURETYPE_DPF_MIN corresponding to the type of
     * automatic conditional capture
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPE_INVALID.
     */
    get_captureType()
    {
        return this.liveFunc._captureType;
    }

    /**
     * Changes the type of automatic conditional capture.
     *
     * @param newval : a value among YInputCapture.CAPTURETYPE_NONE, YInputCapture.CAPTURETYPE_TIMED,
     * YInputCapture.CAPTURETYPE_V_MAX, YInputCapture.CAPTURETYPE_V_MIN, YInputCapture.CAPTURETYPE_I_MAX,
     * YInputCapture.CAPTURETYPE_I_MIN, YInputCapture.CAPTURETYPE_P_MAX, YInputCapture.CAPTURETYPE_P_MIN,
     * YInputCapture.CAPTURETYPE_V_AVG_MAX, YInputCapture.CAPTURETYPE_V_AVG_MIN,
     * YInputCapture.CAPTURETYPE_V_RMS_MAX, YInputCapture.CAPTURETYPE_V_RMS_MIN,
     * YInputCapture.CAPTURETYPE_I_AVG_MAX, YInputCapture.CAPTURETYPE_I_AVG_MIN,
     * YInputCapture.CAPTURETYPE_I_RMS_MAX, YInputCapture.CAPTURETYPE_I_RMS_MIN,
     * YInputCapture.CAPTURETYPE_P_AVG_MAX, YInputCapture.CAPTURETYPE_P_AVG_MIN,
     * YInputCapture.CAPTURETYPE_PF_MIN and YInputCapture.CAPTURETYPE_DPF_MIN corresponding to the type of
     * automatic conditional capture
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_captureType(newval)
    {
        this.liveFunc.set_captureType(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes current threshold value for automatic conditional capture.
     *
     * @param newval : a floating point number corresponding to current threshold value for automatic
     * conditional capture
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_condValue(newval)
    {
        this.liveFunc.set_condValue(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns current threshold value for automatic conditional capture.
     *
     * @return a floating point number corresponding to current threshold value for automatic conditional capture
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUE_INVALID.
     */
    get_condValue()
    {
        return this.liveFunc._condValue;
    }

    /**
     * Returns the relative position of the trigger event within the capture window.
     * When the value is 50%, the capture is centered on the event.
     *
     * @return an integer corresponding to the relative position of the trigger event within the capture window
     *
     * On failure, throws an exception or returns YInputCapture.CONDALIGN_INVALID.
     */
    get_condAlign()
    {
        return this.liveFunc._condAlign;
    }

    /**
     * Changes the relative position of the trigger event within the capture window.
     * The new value must be between 10% (on the left) and 90% (on the right).
     * When the value is 50%, the capture is centered on the event.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : an integer corresponding to the relative position of the trigger event within the capture window
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_condAlign(newval)
    {
        this.liveFunc.set_condAlign(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the type of automatic conditional capture
     * applied at device power on.
     *
     * @return a value among YInputCapture.CAPTURETYPEATSTARTUP_NONE,
     * YInputCapture.CAPTURETYPEATSTARTUP_TIMED, YInputCapture.CAPTURETYPEATSTARTUP_V_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN and
     * YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN corresponding to the type of automatic conditional capture
     *         applied at device power on
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPEATSTARTUP_INVALID.
     */
    get_captureTypeAtStartup()
    {
        return this.liveFunc._captureTypeAtStartup;
    }

    /**
     * Changes the type of automatic conditional capture
     * applied at device power on.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : a value among YInputCapture.CAPTURETYPEATSTARTUP_NONE,
     * YInputCapture.CAPTURETYPEATSTARTUP_TIMED, YInputCapture.CAPTURETYPEATSTARTUP_V_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN and
     * YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN corresponding to the type of automatic conditional capture
     *         applied at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_captureTypeAtStartup(newval)
    {
        this.liveFunc.set_captureTypeAtStartup(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes current threshold value for automatic conditional
     * capture applied at device power on.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : a floating point number corresponding to current threshold value for automatic conditional
     *         capture applied at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_condValueAtStartup(newval)
    {
        this.liveFunc.set_condValueAtStartup(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the threshold value for automatic conditional
     * capture applied at device power on.
     *
     * @return a floating point number corresponding to the threshold value for automatic conditional
     *         capture applied at device power on
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUEATSTARTUP_INVALID.
     */
    get_condValueAtStartup()
    {
        return this.liveFunc._condValueAtStartup;
    }
    //--- (end of generated code: YInputCapture accessors declaration)
}

//--- (generated code: YInputCapture functions)

YoctoLibExport('YInputCapture', YInputCapture);
YoctoLibExport('YInputCaptureProxy', YInputCaptureProxy);
YInputCapture.imm_Init();

//--- (end of generated code: YInputCapture functions)
