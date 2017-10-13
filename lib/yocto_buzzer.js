/*********************************************************************
 *
 * $Id: yocto_buzzer.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements the high-level API for Buzzer functions
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

//--- (YBuzzer return codes)
//--- (end of YBuzzer return codes)
//--- (YBuzzer definitions)
//--- (end of YBuzzer definitions)

//--- (YBuzzer class start)
/**
 * YBuzzer Class: Buzzer function interface
 *
 * The Yoctopuce application programming interface allows you to
 * choose the frequency and volume at which the buzzer must sound.
 * You can also pre-program a play sequence.
 */
//--- (end of YBuzzer class start)

class YBuzzer extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YBuzzer constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Buzzer';
        /** @member {number} **/
        this._frequency                  = YBuzzer.FREQUENCY_INVALID;
        /** @member {number} **/
        this._volume                     = YBuzzer.VOLUME_INVALID;
        /** @member {number} **/
        this._playSeqSize                = YBuzzer.PLAYSEQSIZE_INVALID;
        /** @member {number} **/
        this._playSeqMaxSize             = YBuzzer.PLAYSEQMAXSIZE_INVALID;
        /** @member {number} **/
        this._playSeqSignature           = YBuzzer.PLAYSEQSIGNATURE_INVALID;
        /** @member {string} **/
        this._command                    = YBuzzer.COMMAND_INVALID;
        //--- (end of YBuzzer constructor)
    }

    //--- (YBuzzer implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'frequency':
            this._frequency = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'volume':
            this._volume = parseInt(val);
            return 1;
        case 'playSeqSize':
            this._playSeqSize = parseInt(val);
            return 1;
        case 'playSeqMaxSize':
            this._playSeqMaxSize = parseInt(val);
            return 1;
        case 'playSeqSignature':
            this._playSeqSignature = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the frequency of the signal sent to the buzzer. A zero value stops the buzzer.
     *
     * @param newval {number} : a floating point number corresponding to the frequency of the signal sent to the buzzer
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_frequency(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('frequency',rest_val);
    }

    /**
     * Returns the  frequency of the signal sent to the buzzer/speaker.
     *
     * @return {number} a floating point number corresponding to the  frequency of the signal sent to the
     * buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.FREQUENCY_INVALID.
     */
    async get_frequency()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }

    /**
     * Returns the volume of the signal sent to the buzzer/speaker.
     *
     * @return {number} an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.VOLUME_INVALID.
     */
    async get_volume()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }

    /**
     * Changes the volume of the signal sent to the buzzer/speaker.
     *
     * @param newval {number} : an integer corresponding to the volume of the signal sent to the buzzer/speaker
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
     * Returns the current length of the playing sequence.
     *
     * @return {number} an integer corresponding to the current length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIZE_INVALID.
     */
    async get_playSeqSize()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.PLAYSEQSIZE_INVALID;
            }
        }
        res = this._playSeqSize;
        return res;
    }

    /**
     * Returns the maximum length of the playing sequence.
     *
     * @return {number} an integer corresponding to the maximum length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQMAXSIZE_INVALID.
     */
    async get_playSeqMaxSize()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.PLAYSEQMAXSIZE_INVALID;
            }
        }
        res = this._playSeqMaxSize;
        return res;
    }

    /**
     * Returns the playing sequence signature. As playing
     * sequences cannot be read from the device, this can be used
     * to detect if a specific playing sequence is already
     * programmed.
     *
     * @return {number} an integer corresponding to the playing sequence signature
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIGNATURE_INVALID.
     */
    async get_playSeqSignature()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.PLAYSEQSIGNATURE_INVALID;
            }
        }
        res = this._playSeqSignature;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.COMMAND_INVALID;
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
     * Retrieves a buzzer for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the buzzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBuzzer.isOnline() to test if the buzzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a buzzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the buzzer
     *
     * @return {YBuzzer} a YBuzzer object allowing you to drive the buzzer.
     */
    static FindBuzzer(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Buzzer', func);
        if (obj == null) {
            obj = new YBuzzer(YAPI, func);
            YFunction._AddToCache('Buzzer',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a buzzer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the buzzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBuzzer.isOnline() to test if the buzzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a buzzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the buzzer
     *
     * @return {YBuzzer} a YBuzzer object allowing you to drive the buzzer.
     */
    static FindBuzzerInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Buzzer', func);
        if (obj == null) {
            obj = new YBuzzer(yctx, func);
            YFunction._AddToCache('Buzzer',  func, obj);
        }
        return obj;
    }

    async sendCommand(command)
    {
        return await this.set_command(command);
    }

    /**
     * Adds a new frequency transition to the playing sequence.
     *
     * @param freq    : desired frequency when the transition is completed, in Hz
     * @param msDelay {number} : duration of the frequency transition, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addFreqMoveToPlaySeq(freq,msDelay)
    {
        return await this.sendCommand('A'+String(Math.round(freq))+','+String(Math.round(msDelay)));
    }

    /**
     * Adds a pulse to the playing sequence.
     *
     * @param freq {number} : pulse frequency, in Hz
     * @param msDuration {number} : pulse duration, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addPulseToPlaySeq(freq,msDuration)
    {
        return await this.sendCommand('B'+String(Math.round(freq))+','+String(Math.round(msDuration)));
    }

    /**
     * Adds a new volume transition to the playing sequence. Frequency stays untouched:
     * if frequency is at zero, the transition has no effect.
     *
     * @param volume    : desired volume when the transition is completed, as a percentage.
     * @param msDuration {number} : duration of the volume transition, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addVolMoveToPlaySeq(volume,msDuration)
    {
        return await this.sendCommand('C'+String(Math.round(volume))+','+String(Math.round(msDuration)));
    }

    /**
     * Adds notes to the playing sequence. Notes are provided as text words, separated by
     * spaces. The pitch is specified using the usual letter from A to G. The duration is
     * specified as the divisor of a whole note: 4 for a fourth, 8 for an eight note, etc.
     * Some modifiers are supported: # and b to alter a note pitch,
     * ' and , to move to the upper/lower octave, . to enlarge
     * the note duration.
     *
     * @param notes {string} : notes to be played, as a text string.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addNotesToPlaySeq(notes)
    {
        /** @type {number} **/
        let tempo;
        /** @type {number} **/
        let prevPitch;
        /** @type {number} **/
        let prevDuration;
        /** @type {number} **/
        let prevFreq;
        /** @type {number} **/
        let note;
        /** @type {number} **/
        let num;
        /** @type {number} **/
        let typ;
        /** @type {Uint8Array} **/
        let ascNotes;
        /** @type {number} **/
        let notesLen;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let ch;
        /** @type {number} **/
        let dNote;
        /** @type {number} **/
        let pitch;
        /** @type {number} **/
        let freq;
        /** @type {number} **/
        let ms;
        /** @type {number} **/
        let ms16;
        /** @type {number} **/
        let rest;
        tempo = 100;
        prevPitch = 3;
        prevDuration = 4;
        prevFreq = 110;
        note = -99;
        num = 0;
        typ = 3;
        ascNotes = this._yapi.imm_str2bin(notes);
        notesLen = (ascNotes).length;
        i = 0;
        while (i < notesLen) {
            ch = ascNotes[i];
            // A (note))
            if (ch == 65) {
                note = 0;
            }
            // B (note)
            if (ch == 66) {
                note = 2;
            }
            // C (note)
            if (ch == 67) {
                note = 3;
            }
            // D (note)
            if (ch == 68) {
                note = 5;
            }
            // E (note)
            if (ch == 69) {
                note = 7;
            }
            // F (note)
            if (ch == 70) {
                note = 8;
            }
            // G (note)
            if (ch == 71) {
                note = 10;
            }
            // '#' (sharp modifier)
            if (ch == 35) {
                note = note + 1;
            }
            // 'b' (flat modifier)
            if (ch == 98) {
                note = note - 1;
            }
            // ' (octave up)
            if (ch == 39) {
                prevPitch = prevPitch + 12;
            }
            // , (octave down)
            if (ch == 44) {
                prevPitch = prevPitch - 12;
            }
            // R (rest)
            if (ch == 82) {
                typ = 0;
            }
            // ! (staccato modifier)
            if (ch == 33) {
                typ = 1;
            }
            // ^ (short modifier)
            if (ch == 94) {
                typ = 2;
            }
            // _ (legato modifier)
            if (ch == 95) {
                typ = 4;
            }
            // - (glissando modifier)
            if (ch == 45) {
                typ = 5;
            }
            // % (tempo change)
            if ((ch == 37) && (num > 0)) {
                tempo = num;
                num = 0;
            }
            if ((ch >= 48) && (ch <= 57)) {
                // 0-9 (number)
                num = (num * 10) + (ch - 48);
            }
            if (ch == 46) {
                // . (duration modifier)
                num = parseInt((num * 2) / (3), 10);
            }
            if (((ch == 32) || (i+1 == notesLen)) && ((note > -99) || (typ != 3))) {
                if (num == 0) {
                    num = prevDuration;
                } else {
                    prevDuration = num;
                }
                ms = Math.round(320000.0 / (tempo * num));
                if (typ == 0) {
                    await this.addPulseToPlaySeq(0, ms);
                } else {
                    dNote = note - (((prevPitch) % (12)));
                    if (dNote > 6) {
                        dNote = dNote - 12;
                    }
                    if (dNote <= -6) {
                        dNote = dNote + 12;
                    }
                    pitch = prevPitch + dNote;
                    freq = Math.round(440 * Math.exp(pitch * 0.05776226504666));
                    ms16 = ((ms) >> (4));
                    rest = 0;
                    if (typ == 3) {
                        rest = 2 * ms16;
                    }
                    if (typ == 2) {
                        rest = 8 * ms16;
                    }
                    if (typ == 1) {
                        rest = 12 * ms16;
                    }
                    if (typ == 5) {
                        await this.addPulseToPlaySeq(prevFreq, ms16);
                        await this.addFreqMoveToPlaySeq(freq, 8 * ms16);
                        await this.addPulseToPlaySeq(freq, ms - 9 * ms16);
                    } else {
                        await this.addPulseToPlaySeq(freq, ms - rest);
                        if (rest > 0) {
                            await this.addPulseToPlaySeq(0, rest);
                        }
                    }
                    prevFreq = freq;
                    prevPitch = pitch;
                }
                note = -99;
                num = 0;
                typ = 3;
            }
            i = i + 1;
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Starts the preprogrammed playing sequence. The sequence
     * runs in loop until it is stopped by stopPlaySeq or an explicit
     * change. To play the sequence only once, use oncePlaySeq().
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async startPlaySeq()
    {
        return await this.sendCommand('S');
    }

    /**
     * Stops the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async stopPlaySeq()
    {
        return await this.sendCommand('X');
    }

    /**
     * Resets the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async resetPlaySeq()
    {
        return await this.sendCommand('Z');
    }

    /**
     * Starts the preprogrammed playing sequence and run it once only.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async oncePlaySeq()
    {
        return await this.sendCommand('s');
    }

    /**
     * Activates the buzzer for a short duration.
     *
     * @param frequency {number} : pulse frequency, in hertz
     * @param duration {number} : pulse duration in millseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async pulse(frequency,duration)
    {
        return await this.set_command('P'+String(Math.round(frequency))+','+String(Math.round(duration)));
    }

    /**
     * Makes the buzzer frequency change over a period of time.
     *
     * @param frequency {number} : frequency to reach, in hertz. A frequency under 25Hz stops the buzzer.
     * @param duration {number} :  pulse duration in millseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async freqMove(frequency,duration)
    {
        return await this.set_command('F'+String(Math.round(frequency))+','+String(Math.round(duration)));
    }

    /**
     * Makes the buzzer volume change over a period of time, frequency  stays untouched.
     *
     * @param volume {number} : volume to reach in %
     * @param duration {number} : change duration in millseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async volumeMove(volume,duration)
    {
        return await this.set_command('V'+String(Math.round(volume))+','+String(Math.round(duration)));
    }

    /**
     * Immediately play a note sequence. Notes are provided as text words, separated by
     * spaces. The pitch is specified using the usual letter from A to G. The duration is
     * specified as the divisor of a whole note: 4 for a fourth, 8 for an eight note, etc.
     * Some modifiers are supported: # and b to alter a note pitch,
     * ' and , to move to the upper/lower octave, . to enlarge
     * the note duration.
     *
     * @param notes {string} : notes to be played, as a text string.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async playNotes(notes)
    {
        await this.resetPlaySeq();
        await this.addNotesToPlaySeq(notes);
        return await this.oncePlaySeq();
    }

    /**
     * Continues the enumeration of buzzers started using yFirstBuzzer().
     *
     * @return {YBuzzer} a pointer to a YBuzzer object, corresponding to
     *         a buzzer currently online, or a null pointer
     *         if there are no more buzzers to enumerate.
     */
    nextBuzzer()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YBuzzer.FindBuzzerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of buzzers currently accessible.
     * Use the method YBuzzer.nextBuzzer() to iterate on
     * next buzzers.
     *
     * @return {YBuzzer} a pointer to a YBuzzer object, corresponding to
     *         the first buzzer currently online, or a null pointer
     *         if there are none.
     */
    static FirstBuzzer()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Buzzer');
        if(next_hwid == null) return null;
        return YBuzzer.FindBuzzer(next_hwid);
    }

    /**
     * Starts the enumeration of buzzers currently accessible.
     * Use the method YBuzzer.nextBuzzer() to iterate on
     * next buzzers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YBuzzer} a pointer to a YBuzzer object, corresponding to
     *         the first buzzer currently online, or a null pointer
     *         if there are none.
     */
    static FirstBuzzerInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Buzzer');
        if(next_hwid == null) return null;
        return YBuzzer.FindBuzzerInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            FREQUENCY_INVALID            : YAPI.INVALID_DOUBLE,
            VOLUME_INVALID               : YAPI.INVALID_UINT,
            PLAYSEQSIZE_INVALID          : YAPI.INVALID_UINT,
            PLAYSEQMAXSIZE_INVALID       : YAPI.INVALID_UINT,
            PLAYSEQSIGNATURE_INVALID     : YAPI.INVALID_UINT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YBuzzer implementation)
}

//
// YBuzzerProxy Class: synchronous proxy to YBuzzer objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YBuzzer objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YBuzzerProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YBuzzer accessors declaration)

    /**
     * Changes the frequency of the signal sent to the buzzer. A zero value stops the buzzer.
     *
     * @param newval : a floating point number corresponding to the frequency of the signal sent to the buzzer
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_frequency(newval)
    {
        this.liveFunc.set_frequency(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the  frequency of the signal sent to the buzzer/speaker.
     *
     * @return a floating point number corresponding to the  frequency of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns Y_FREQUENCY_INVALID.
     */
    get_frequency()
    {
        return this.liveFunc._frequency;
    }

    /**
     * Returns the volume of the signal sent to the buzzer/speaker.
     *
     * @return an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    get_volume()
    {
        return this.liveFunc._volume;
    }

    /**
     * Changes the volume of the signal sent to the buzzer/speaker.
     *
     * @param newval : an integer corresponding to the volume of the signal sent to the buzzer/speaker
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
     * Returns the current length of the playing sequence.
     *
     * @return an integer corresponding to the current length of the playing sequence
     *
     * On failure, throws an exception or returns Y_PLAYSEQSIZE_INVALID.
     */
    get_playSeqSize()
    {
        return this.liveFunc._playSeqSize;
    }

    /**
     * Returns the maximum length of the playing sequence.
     *
     * @return an integer corresponding to the maximum length of the playing sequence
     *
     * On failure, throws an exception or returns Y_PLAYSEQMAXSIZE_INVALID.
     */
    get_playSeqMaxSize()
    {
        return this.liveFunc._playSeqMaxSize;
    }

    /**
     * Returns the playing sequence signature. As playing
     * sequences cannot be read from the device, this can be used
     * to detect if a specific playing sequence is already
     * programmed.
     *
     * @return an integer corresponding to the playing sequence signature
     *
     * On failure, throws an exception or returns Y_PLAYSEQSIGNATURE_INVALID.
     */
    get_playSeqSignature()
    {
        return this.liveFunc._playSeqSignature;
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
     * Adds a new frequency transition to the playing sequence.
     *
     * @param freq    : desired frequency when the transition is completed, in Hz
     * @param msDelay : duration of the frequency transition, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addFreqMoveToPlaySeq(freq,msDelay)
    {
        this.liveFunc.addFreqMoveToPlaySeq(freq, msDelay);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a pulse to the playing sequence.
     *
     * @param freq : pulse frequency, in Hz
     * @param msDuration : pulse duration, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addPulseToPlaySeq(freq,msDuration)
    {
        this.liveFunc.addPulseToPlaySeq(freq, msDuration);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a new volume transition to the playing sequence. Frequency stays untouched:
     * if frequency is at zero, the transition has no effect.
     *
     * @param volume    : desired volume when the transition is completed, as a percentage.
     * @param msDuration : duration of the volume transition, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addVolMoveToPlaySeq(volume,msDuration)
    {
        this.liveFunc.addVolMoveToPlaySeq(volume, msDuration);
        return YAPI_SUCCESS;
    }

    /**
     * Adds notes to the playing sequence. Notes are provided as text words, separated by
     * spaces. The pitch is specified using the usual letter from A to G. The duration is
     * specified as the divisor of a whole note: 4 for a fourth, 8 for an eight note, etc.
     * Some modifiers are supported: # and b to alter a note pitch,
     * ' and , to move to the upper/lower octave, . to enlarge
     * the note duration.
     *
     * @param notes : notes to be played, as a text string.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addNotesToPlaySeq(notes)
    {
        this.liveFunc.addNotesToPlaySeq(notes);
        return YAPI_SUCCESS;
    }

    /**
     * Starts the preprogrammed playing sequence. The sequence
     * runs in loop until it is stopped by stopPlaySeq or an explicit
     * change. To play the sequence only once, use oncePlaySeq().
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    startPlaySeq()
    {
        this.liveFunc.startPlaySeq();
        return YAPI_SUCCESS;
    }

    /**
     * Stops the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    stopPlaySeq()
    {
        this.liveFunc.stopPlaySeq();
        return YAPI_SUCCESS;
    }

    /**
     * Resets the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetPlaySeq()
    {
        this.liveFunc.resetPlaySeq();
        return YAPI_SUCCESS;
    }

    /**
     * Starts the preprogrammed playing sequence and run it once only.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    oncePlaySeq()
    {
        this.liveFunc.oncePlaySeq();
        return YAPI_SUCCESS;
    }

    /**
     * Activates the buzzer for a short duration.
     *
     * @param frequency : pulse frequency, in hertz
     * @param duration : pulse duration in millseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pulse(frequency,duration)
    {
        this.liveFunc.pulse(frequency, duration);
        return YAPI_SUCCESS;
    }

    /**
     * Makes the buzzer frequency change over a period of time.
     *
     * @param frequency : frequency to reach, in hertz. A frequency under 25Hz stops the buzzer.
     * @param duration :  pulse duration in millseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    freqMove(frequency,duration)
    {
        this.liveFunc.freqMove(frequency, duration);
        return YAPI_SUCCESS;
    }

    /**
     * Makes the buzzer volume change over a period of time, frequency  stays untouched.
     *
     * @param volume : volume to reach in %
     * @param duration : change duration in millseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    volumeMove(volume,duration)
    {
        this.liveFunc.volumeMove(volume, duration);
        return YAPI_SUCCESS;
    }

    /**
     * Immediately play a note sequence. Notes are provided as text words, separated by
     * spaces. The pitch is specified using the usual letter from A to G. The duration is
     * specified as the divisor of a whole note: 4 for a fourth, 8 for an eight note, etc.
     * Some modifiers are supported: # and b to alter a note pitch,
     * ' and , to move to the upper/lower octave, . to enlarge
     * the note duration.
     *
     * @param notes : notes to be played, as a text string.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    playNotes(notes)
    {
        this.liveFunc.playNotes(notes);
        return YAPI_SUCCESS;
    }
    //--- (end of YBuzzer accessors declaration)
}

//--- (YBuzzer functions)

YoctoLibExport('YBuzzer', YBuzzer);
YoctoLibExport('YBuzzerProxy', YBuzzerProxy);
YBuzzer.imm_Init();

//--- (end of YBuzzer functions)
