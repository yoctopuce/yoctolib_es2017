/*********************************************************************
 *
 *  $Id: yocto_gps.js 43580 2021-01-26 17:46:01Z mvuilleu $
 *
 *  Implements the high-level API for Gps functions
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

//--- (YGps return codes)
//--- (end of YGps return codes)
//--- (YGps definitions)
//--- (end of YGps definitions)

//--- (YGps class start)
/**
 * YGps Class: Geolocalization control interface (GPS, GNSS, ...), available for instance in the Yocto-GPS-V2
 *
 * The YGps class allows you to retrieve positioning
 * data from a GPS/GNSS sensor. This class can provides
 * complete positioning information. However, if you
 * wish to define callbacks on position changes or record
 * the position in the datalogger, you
 * should use the YLatitude et YLongitude classes.
 */
//--- (end of YGps class start)

class YGps extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YGps constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Gps';
        /** @member {number} **/
        this._isFixed                    = YGps.ISFIXED_INVALID;
        /** @member {number} **/
        this._satCount                   = YGps.SATCOUNT_INVALID;
        /** @member {number} **/
        this._satPerConst                = YGps.SATPERCONST_INVALID;
        /** @member {number} **/
        this._gpsRefreshRate             = YGps.GPSREFRESHRATE_INVALID;
        /** @member {number} **/
        this._coordSystem                = YGps.COORDSYSTEM_INVALID;
        /** @member {number} **/
        this._constellation              = YGps.CONSTELLATION_INVALID;
        /** @member {string} **/
        this._latitude                   = YGps.LATITUDE_INVALID;
        /** @member {string} **/
        this._longitude                  = YGps.LONGITUDE_INVALID;
        /** @member {number} **/
        this._dilution                   = YGps.DILUTION_INVALID;
        /** @member {number} **/
        this._altitude                   = YGps.ALTITUDE_INVALID;
        /** @member {number} **/
        this._groundSpeed                = YGps.GROUNDSPEED_INVALID;
        /** @member {number} **/
        this._direction                  = YGps.DIRECTION_INVALID;
        /** @member {number} **/
        this._unixTime                   = YGps.UNIXTIME_INVALID;
        /** @member {string} **/
        this._dateTime                   = YGps.DATETIME_INVALID;
        /** @member {number} **/
        this._utcOffset                  = YGps.UTCOFFSET_INVALID;
        /** @member {string} **/
        this._command                    = YGps.COMMAND_INVALID;
        //--- (end of YGps constructor)
    }

    //--- (YGps implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'isFixed':
            this._isFixed = parseInt(val);
            return 1;
        case 'satCount':
            this._satCount = parseInt(val);
            return 1;
        case 'satPerConst':
            this._satPerConst = parseInt(val);
            return 1;
        case 'gpsRefreshRate':
            this._gpsRefreshRate = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'coordSystem':
            this._coordSystem = parseInt(val);
            return 1;
        case 'constellation':
            this._constellation = parseInt(val);
            return 1;
        case 'latitude':
            this._latitude = val;
            return 1;
        case 'longitude':
            this._longitude = val;
            return 1;
        case 'dilution':
            this._dilution = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'altitude':
            this._altitude = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'groundSpeed':
            this._groundSpeed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'direction':
            this._direction = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'unixTime':
            this._unixTime = parseInt(val);
            return 1;
        case 'dateTime':
            this._dateTime = val;
            return 1;
        case 'utcOffset':
            this._utcOffset = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns TRUE if the receiver has found enough satellites to work.
     *
     * @return {Promise<number>} either YGps.ISFIXED_FALSE or YGps.ISFIXED_TRUE, according to TRUE if the
     * receiver has found enough satellites to work
     *
     * On failure, throws an exception or returns YGps.ISFIXED_INVALID.
     */
    async get_isFixed()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.ISFIXED_INVALID;
            }
        }
        res = this._isFixed;
        return res;
    }

    /**
     * Returns the total count of satellites used to compute GPS position.
     *
     * @return {Promise<number>} an integer corresponding to the total count of satellites used to compute GPS position
     *
     * On failure, throws an exception or returns YGps.SATCOUNT_INVALID.
     */
    async get_satCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.SATCOUNT_INVALID;
            }
        }
        res = this._satCount;
        return res;
    }

    /**
     * Returns the count of visible satellites per constellation encoded
     * on a 32 bit integer: bits 0..5: GPS satellites count,  bits 6..11 : Glonass, bits 12..17 : Galileo.
     * this value is refreshed every 5 seconds only.
     *
     * @return {Promise<number>} an integer corresponding to the count of visible satellites per constellation encoded
     *         on a 32 bit integer: bits 0.
     *
     * On failure, throws an exception or returns YGps.SATPERCONST_INVALID.
     */
    async get_satPerConst()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.SATPERCONST_INVALID;
            }
        }
        res = this._satPerConst;
        return res;
    }

    /**
     * Returns effective GPS data refresh frequency.
     * this value is refreshed every 5 seconds only.
     *
     * @return {Promise<number>} a floating point number corresponding to effective GPS data refresh frequency
     *
     * On failure, throws an exception or returns YGps.GPSREFRESHRATE_INVALID.
     */
    async get_gpsRefreshRate()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.GPSREFRESHRATE_INVALID;
            }
        }
        res = this._gpsRefreshRate;
        return res;
    }

    /**
     * Returns the representation system used for positioning data.
     *
     * @return {Promise<number>} a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and
     * YGps.COORDSYSTEM_GPS_D corresponding to the representation system used for positioning data
     *
     * On failure, throws an exception or returns YGps.COORDSYSTEM_INVALID.
     */
    async get_coordSystem()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.COORDSYSTEM_INVALID;
            }
        }
        res = this._coordSystem;
        return res;
    }

    /**
     * Changes the representation system used for positioning data.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and
     * YGps.COORDSYSTEM_GPS_D corresponding to the representation system used for positioning data
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_coordSystem(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('coordSystem',rest_val);
    }

    /**
     * Returns the the satellites constellation used to compute
     * positioning data.
     *
     * @return {Promise<number>} a value among YGps.CONSTELLATION_GNSS, YGps.CONSTELLATION_GPS,
     * YGps.CONSTELLATION_GLONASS, YGps.CONSTELLATION_GALILEO, YGps.CONSTELLATION_GPS_GLONASS,
     * YGps.CONSTELLATION_GPS_GALILEO and YGps.CONSTELLATION_GLONASS_GALILEO corresponding to the the
     * satellites constellation used to compute
     *         positioning data
     *
     * On failure, throws an exception or returns YGps.CONSTELLATION_INVALID.
     */
    async get_constellation()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.CONSTELLATION_INVALID;
            }
        }
        res = this._constellation;
        return res;
    }

    /**
     * Changes the satellites constellation used to compute
     * positioning data. Possible  constellations are GNSS ( = all supported constellations),
     * GPS, Glonass, Galileo , and the 3 possible pairs. This setting has  no effect on Yocto-GPS (V1).
     *
     * @param newval {number} : a value among YGps.CONSTELLATION_GNSS, YGps.CONSTELLATION_GPS,
     * YGps.CONSTELLATION_GLONASS, YGps.CONSTELLATION_GALILEO, YGps.CONSTELLATION_GPS_GLONASS,
     * YGps.CONSTELLATION_GPS_GALILEO and YGps.CONSTELLATION_GLONASS_GALILEO corresponding to the
     * satellites constellation used to compute
     *         positioning data
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_constellation(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('constellation',rest_val);
    }

    /**
     * Returns the current latitude.
     *
     * @return {Promise<string>} a string corresponding to the current latitude
     *
     * On failure, throws an exception or returns YGps.LATITUDE_INVALID.
     */
    async get_latitude()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.LATITUDE_INVALID;
            }
        }
        res = this._latitude;
        return res;
    }

    /**
     * Returns the current longitude.
     *
     * @return {Promise<string>} a string corresponding to the current longitude
     *
     * On failure, throws an exception or returns YGps.LONGITUDE_INVALID.
     */
    async get_longitude()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.LONGITUDE_INVALID;
            }
        }
        res = this._longitude;
        return res;
    }

    /**
     * Returns the current horizontal dilution of precision,
     * the smaller that number is, the better .
     *
     * @return {Promise<number>} a floating point number corresponding to the current horizontal dilution of precision,
     *         the smaller that number is, the better
     *
     * On failure, throws an exception or returns YGps.DILUTION_INVALID.
     */
    async get_dilution()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.DILUTION_INVALID;
            }
        }
        res = this._dilution;
        return res;
    }

    /**
     * Returns the current altitude. Beware:  GPS technology
     * is very inaccurate regarding altitude.
     *
     * @return {Promise<number>} a floating point number corresponding to the current altitude
     *
     * On failure, throws an exception or returns YGps.ALTITUDE_INVALID.
     */
    async get_altitude()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.ALTITUDE_INVALID;
            }
        }
        res = this._altitude;
        return res;
    }

    /**
     * Returns the current ground speed in Km/h.
     *
     * @return {Promise<number>} a floating point number corresponding to the current ground speed in Km/h
     *
     * On failure, throws an exception or returns YGps.GROUNDSPEED_INVALID.
     */
    async get_groundSpeed()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.GROUNDSPEED_INVALID;
            }
        }
        res = this._groundSpeed;
        return res;
    }

    /**
     * Returns the current move bearing in degrees, zero
     * is the true (geographic) north.
     *
     * @return {Promise<number>} a floating point number corresponding to the current move bearing in degrees, zero
     *         is the true (geographic) north
     *
     * On failure, throws an exception or returns YGps.DIRECTION_INVALID.
     */
    async get_direction()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.DIRECTION_INVALID;
            }
        }
        res = this._direction;
        return res;
    }

    /**
     * Returns the current time in Unix format (number of
     * seconds elapsed since Jan 1st, 1970).
     *
     * @return {Promise<number>} an integer corresponding to the current time in Unix format (number of
     *         seconds elapsed since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YGps.UNIXTIME_INVALID.
     */
    async get_unixTime()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.UNIXTIME_INVALID;
            }
        }
        res = this._unixTime;
        return res;
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return {Promise<string>} a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YGps.DATETIME_INVALID.
     */
    async get_dateTime()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.DATETIME_INVALID;
            }
        }
        res = this._dateTime;
        return res;
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return {Promise<number>} an integer corresponding to the number of seconds between current time
     * and UTC time (time zone)
     *
     * On failure, throws an exception or returns YGps.UTCOFFSET_INVALID.
     */
    async get_utcOffset()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.UTCOFFSET_INVALID;
            }
        }
        res = this._utcOffset;
        return res;
    }

    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * If current UTC time is known, the current time is automatically be updated according to the selected time zone.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the number of seconds between current time and
     * UTC time (time zone)
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_utcOffset(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('utcOffset',rest_val);
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.COMMAND_INVALID;
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
     * Retrieves a geolocalization module for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the geolocalization module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGps.isOnline() to test if the geolocalization module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a geolocalization module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the geolocalization module, for instance
     *         YGNSSMK2.gps.
     *
     * @return {YGps} a YGps object allowing you to drive the geolocalization module.
     */
    static FindGps(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Gps', func);
        if (obj == null) {
            obj = new YGps(YAPI, func);
            YFunction._AddToCache('Gps',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a geolocalization module for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the geolocalization module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGps.isOnline() to test if the geolocalization module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a geolocalization module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the geolocalization module, for instance
     *         YGNSSMK2.gps.
     *
     * @return {YGps} a YGps object allowing you to drive the geolocalization module.
     */
    static FindGpsInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Gps', func);
        if (obj == null) {
            obj = new YGps(yctx, func);
            YFunction._AddToCache('Gps',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of geolocalization modules started using yFirstGps().
     * Caution: You can't make any assumption about the returned geolocalization modules order.
     * If you want to find a specific a geolocalization module, use Gps.findGps()
     * and a hardwareID or a logical name.
     *
     * @return {YGps | null} a pointer to a YGps object, corresponding to
     *         a geolocalization module currently online, or a null pointer
     *         if there are no more geolocalization modules to enumerate.
     */
    nextGps()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YGps.FindGpsInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of geolocalization modules currently accessible.
     * Use the method YGps.nextGps() to iterate on
     * next geolocalization modules.
     *
     * @return {YGps | null} a pointer to a YGps object, corresponding to
     *         the first geolocalization module currently online, or a null pointer
     *         if there are none.
     */
    static FirstGps()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Gps');
        if(next_hwid == null) return null;
        return YGps.FindGps(next_hwid);
    }

    /**
     * Starts the enumeration of geolocalization modules currently accessible.
     * Use the method YGps.nextGps() to iterate on
     * next geolocalization modules.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YGps | null} a pointer to a YGps object, corresponding to
     *         the first geolocalization module currently online, or a null pointer
     *         if there are none.
     */
    static FirstGpsInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Gps');
        if(next_hwid == null) return null;
        return YGps.FindGpsInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            ISFIXED_FALSE                : 0,
            ISFIXED_TRUE                 : 1,
            ISFIXED_INVALID              : -1,
            SATCOUNT_INVALID             : YAPI.INVALID_LONG,
            SATPERCONST_INVALID          : YAPI.INVALID_LONG,
            GPSREFRESHRATE_INVALID       : YAPI.INVALID_DOUBLE,
            COORDSYSTEM_GPS_DMS          : 0,
            COORDSYSTEM_GPS_DM           : 1,
            COORDSYSTEM_GPS_D            : 2,
            COORDSYSTEM_INVALID          : -1,
            CONSTELLATION_GNSS           : 0,
            CONSTELLATION_GPS            : 1,
            CONSTELLATION_GLONASS        : 2,
            CONSTELLATION_GALILEO        : 3,
            CONSTELLATION_GPS_GLONASS    : 4,
            CONSTELLATION_GPS_GALILEO    : 5,
            CONSTELLATION_GLONASS_GALILEO : 6,
            CONSTELLATION_INVALID        : -1,
            LATITUDE_INVALID             : YAPI.INVALID_STRING,
            LONGITUDE_INVALID            : YAPI.INVALID_STRING,
            DILUTION_INVALID             : YAPI.INVALID_DOUBLE,
            ALTITUDE_INVALID             : YAPI.INVALID_DOUBLE,
            GROUNDSPEED_INVALID          : YAPI.INVALID_DOUBLE,
            DIRECTION_INVALID            : YAPI.INVALID_DOUBLE,
            UNIXTIME_INVALID             : YAPI.INVALID_LONG,
            DATETIME_INVALID             : YAPI.INVALID_STRING,
            UTCOFFSET_INVALID            : YAPI.INVALID_INT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of YGps implementation)
}

//
// YGpsProxy Class: synchronous proxy to YGps objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YGps objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YGpsProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YGps accessors declaration)

    /**
     * Returns TRUE if the receiver has found enough satellites to work.
     *
     * @return either YGps.ISFIXED_FALSE or YGps.ISFIXED_TRUE, according to TRUE if the receiver has found
     * enough satellites to work
     *
     * On failure, throws an exception or returns YGps.ISFIXED_INVALID.
     */
    get_isFixed()
    {
        return this.liveFunc._isFixed;
    }

    /**
     * Returns the total count of satellites used to compute GPS position.
     *
     * @return an integer corresponding to the total count of satellites used to compute GPS position
     *
     * On failure, throws an exception or returns YGps.SATCOUNT_INVALID.
     */
    get_satCount()
    {
        return this.liveFunc._satCount;
    }

    /**
     * Returns the count of visible satellites per constellation encoded
     * on a 32 bit integer: bits 0..5: GPS satellites count,  bits 6..11 : Glonass, bits 12..17 : Galileo.
     * this value is refreshed every 5 seconds only.
     *
     * @return an integer corresponding to the count of visible satellites per constellation encoded
     *         on a 32 bit integer: bits 0.
     *
     * On failure, throws an exception or returns YGps.SATPERCONST_INVALID.
     */
    get_satPerConst()
    {
        return this.liveFunc._satPerConst;
    }

    /**
     * Returns effective GPS data refresh frequency.
     * this value is refreshed every 5 seconds only.
     *
     * @return a floating point number corresponding to effective GPS data refresh frequency
     *
     * On failure, throws an exception or returns YGps.GPSREFRESHRATE_INVALID.
     */
    get_gpsRefreshRate()
    {
        return this.liveFunc._gpsRefreshRate;
    }

    /**
     * Returns the representation system used for positioning data.
     *
     * @return a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and YGps.COORDSYSTEM_GPS_D
     * corresponding to the representation system used for positioning data
     *
     * On failure, throws an exception or returns YGps.COORDSYSTEM_INVALID.
     */
    get_coordSystem()
    {
        return this.liveFunc._coordSystem;
    }

    /**
     * Changes the representation system used for positioning data.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and
     * YGps.COORDSYSTEM_GPS_D corresponding to the representation system used for positioning data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_coordSystem(newval)
    {
        this.liveFunc.set_coordSystem(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the the satellites constellation used to compute
     * positioning data.
     *
     * @return a value among YGps.CONSTELLATION_GNSS, YGps.CONSTELLATION_GPS, YGps.CONSTELLATION_GLONASS,
     * YGps.CONSTELLATION_GALILEO, YGps.CONSTELLATION_GPS_GLONASS, YGps.CONSTELLATION_GPS_GALILEO and
     * YGps.CONSTELLATION_GLONASS_GALILEO corresponding to the the satellites constellation used to compute
     *         positioning data
     *
     * On failure, throws an exception or returns YGps.CONSTELLATION_INVALID.
     */
    get_constellation()
    {
        return this.liveFunc._constellation;
    }

    /**
     * Changes the satellites constellation used to compute
     * positioning data. Possible  constellations are GNSS ( = all supported constellations),
     * GPS, Glonass, Galileo , and the 3 possible pairs. This setting has  no effect on Yocto-GPS (V1).
     *
     * @param newval : a value among YGps.CONSTELLATION_GNSS, YGps.CONSTELLATION_GPS,
     * YGps.CONSTELLATION_GLONASS, YGps.CONSTELLATION_GALILEO, YGps.CONSTELLATION_GPS_GLONASS,
     * YGps.CONSTELLATION_GPS_GALILEO and YGps.CONSTELLATION_GLONASS_GALILEO corresponding to the
     * satellites constellation used to compute
     *         positioning data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_constellation(newval)
    {
        this.liveFunc.set_constellation(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current latitude.
     *
     * @return a string corresponding to the current latitude
     *
     * On failure, throws an exception or returns YGps.LATITUDE_INVALID.
     */
    get_latitude()
    {
        return this.liveFunc._latitude;
    }

    /**
     * Returns the current longitude.
     *
     * @return a string corresponding to the current longitude
     *
     * On failure, throws an exception or returns YGps.LONGITUDE_INVALID.
     */
    get_longitude()
    {
        return this.liveFunc._longitude;
    }

    /**
     * Returns the current horizontal dilution of precision,
     * the smaller that number is, the better .
     *
     * @return a floating point number corresponding to the current horizontal dilution of precision,
     *         the smaller that number is, the better
     *
     * On failure, throws an exception or returns YGps.DILUTION_INVALID.
     */
    get_dilution()
    {
        return this.liveFunc._dilution;
    }

    /**
     * Returns the current altitude. Beware:  GPS technology
     * is very inaccurate regarding altitude.
     *
     * @return a floating point number corresponding to the current altitude
     *
     * On failure, throws an exception or returns YGps.ALTITUDE_INVALID.
     */
    get_altitude()
    {
        return this.liveFunc._altitude;
    }

    /**
     * Returns the current ground speed in Km/h.
     *
     * @return a floating point number corresponding to the current ground speed in Km/h
     *
     * On failure, throws an exception or returns YGps.GROUNDSPEED_INVALID.
     */
    get_groundSpeed()
    {
        return this.liveFunc._groundSpeed;
    }

    /**
     * Returns the current move bearing in degrees, zero
     * is the true (geographic) north.
     *
     * @return a floating point number corresponding to the current move bearing in degrees, zero
     *         is the true (geographic) north
     *
     * On failure, throws an exception or returns YGps.DIRECTION_INVALID.
     */
    get_direction()
    {
        return this.liveFunc._direction;
    }

    /**
     * Returns the current time in Unix format (number of
     * seconds elapsed since Jan 1st, 1970).
     *
     * @return an integer corresponding to the current time in Unix format (number of
     *         seconds elapsed since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YGps.UNIXTIME_INVALID.
     */
    get_unixTime()
    {
        return this.liveFunc._unixTime;
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YGps.DATETIME_INVALID.
     */
    get_dateTime()
    {
        return this.liveFunc._dateTime;
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns YGps.UTCOFFSET_INVALID.
     */
    get_utcOffset()
    {
        return this.liveFunc._utcOffset;
    }

    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * If current UTC time is known, the current time is automatically be updated according to the selected time zone.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_utcOffset(newval)
    {
        this.liveFunc.set_utcOffset(newval);
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
    //--- (end of YGps accessors declaration)
}

//--- (YGps functions)

YoctoLibExport('YGps', YGps);
YoctoLibExport('YGpsProxy', YGpsProxy);
YGps.imm_Init();

//--- (end of YGps functions)
