/*********************************************************************
 *
 * $Id: yocto_files.js 28746 2017-10-03 08:19:35Z seb $
 *
 * Implements yFindFiles(), the high-level API for Files functions
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
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
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

//--- (generated code: YFiles definitions)
//--- (end of generated code: YFiles definitions)

//--- (generated code: YFileRecord definitions)
//--- (end of generated code: YFileRecord definitions)

//--- (generated code: YFileRecord class start)
/**
 * YFileRecord Class: Description of a file on the device filesystem
 *
 *
 */
//--- (end of generated code: YFileRecord class start)

class YFileRecord
{
    constructor(str_json)
    {
        //--- (generated code: YFileRecord constructor)
        /** @member {string} **/
        this._name                       = '';
        /** @member {number} **/
        this._size                       = 0;
        /** @member {number} **/
        this._crc                        = 0;
        //--- (end of generated code: YFileRecord constructor)
        var loadval = JSON.parse(str_json);
        this._name = loadval.name;
        this._size = loadval.size;
        this._crc  = loadval.crc;
    }

    //--- (generated code: YFileRecord implementation)

    async get_name()
    {
        return this._name;
    }

    async get_size()
    {
        return this._size;
    }

    async get_crc()
    {
        return this._crc;
    }

    //--- (end of generated code: YFileRecord implementation)
}


//--- (generated code: YFiles class start)
/**
 * YFiles Class: Files function interface
 *
 * The filesystem interface makes it possible to store files
 * on some devices, for instance to design a custom web UI
 * (for networked devices) or to add fonts (on display
 * devices).
 */
//--- (end of generated code: YFiles class start)

class YFiles extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (generated code: YFiles constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Files';
        /** @member {number} **/
        this._filesCount                 = YFiles.FILESCOUNT_INVALID;
        /** @member {number} **/
        this._freeSpace                  = YFiles.FREESPACE_INVALID;
        //--- (end of generated code: YFiles constructor)
    }

    //--- (generated code: YFiles implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'filesCount':
            this._filesCount = parseInt(val);
            return 1;
        case 'freeSpace':
            this._freeSpace = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of files currently loaded in the filesystem.
     *
     * @return {number} an integer corresponding to the number of files currently loaded in the filesystem
     *
     * On failure, throws an exception or returns YFiles.FILESCOUNT_INVALID.
     */
    async get_filesCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YFiles.FILESCOUNT_INVALID;
            }
        }
        res = this._filesCount;
        return res;
    }

    /**
     * Returns the free space for uploading new files to the filesystem, in bytes.
     *
     * @return {number} an integer corresponding to the free space for uploading new files to the filesystem, in bytes
     *
     * On failure, throws an exception or returns YFiles.FREESPACE_INVALID.
     */
    async get_freeSpace()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YFiles.FREESPACE_INVALID;
            }
        }
        res = this._freeSpace;
        return res;
    }

    /**
     * Retrieves a filesystem for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the filesystem is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFiles.isOnline() to test if the filesystem is
     * indeed online at a given time. In case of ambiguity when looking for
     * a filesystem by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the filesystem
     *
     * @return {YFiles} a YFiles object allowing you to drive the filesystem.
     */
    static FindFiles(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Files', func);
        if (obj == null) {
            obj = new YFiles(YAPI, func);
            YFunction._AddToCache('Files',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a filesystem for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the filesystem is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFiles.isOnline() to test if the filesystem is
     * indeed online at a given time. In case of ambiguity when looking for
     * a filesystem by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the filesystem
     *
     * @return {YFiles} a YFiles object allowing you to drive the filesystem.
     */
    static FindFilesInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Files', func);
        if (obj == null) {
            obj = new YFiles(yctx, func);
            YFunction._AddToCache('Files',  func, obj);
        }
        return obj;
    }

    async sendCommand(command)
    {
        /** @type {string} **/
        let url;
        url = 'files.json?a='+command;

        return await this._download(url);
    }

    /**
     * Reinitialize the filesystem to its clean, unfragmented, empty state.
     * All files previously uploaded are permanently lost.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async format_fs()
    {
        /** @type {Uint8Array} **/
        let json;
        /** @type {string} **/
        let res;
        json = await this.sendCommand('format');
        res = this.imm_json_get_key(json, 'res');
        if (!(res == 'ok')) {
            return this._throw(this._yapi.IO_ERROR,'format failed',this._yapi.IO_ERROR);
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a list of YFileRecord objects that describe files currently loaded
     * in the filesystem.
     *
     * @param pattern {string} : an optional filter pattern, using star and question marks
     *         as wildcards. When an empty pattern is provided, all file records
     *         are returned.
     *
     * @return {YFileRecord[]} a list of YFileRecord objects, containing the file path
     *         and name, byte size and 32-bit CRC of the file content.
     *
     * On failure, throws an exception or returns an empty list.
     */
    async get_list(pattern)
    {
        /** @type {Uint8Array} **/
        let json;
        /** @type {string[]} **/
        let filelist = [];
        /** @type {YFileRecord[]} **/
        let res = [];
        json = await this.sendCommand('dir&f='+pattern);
        filelist = this.imm_json_get_array(json);
        res.length = 0;
        for (let ii in filelist) {
            res.push(new YFileRecord(filelist[ii]));
        }
        return res;
    }

    /**
     * Test if a file exist on the filesystem of the module.
     *
     * @param filename {string} : the file name to test.
     *
     * @return {boolean} a true if the file existe, false ortherwise.
     *
     * On failure, throws an exception.
     */
    async fileExist(filename)
    {
        /** @type {Uint8Array} **/
        let json;
        /** @type {string[]} **/
        let filelist = [];
        if ((filename).length == 0) {
            return false;
        }
        json = await this.sendCommand('dir&f='+filename);
        filelist = this.imm_json_get_array(json);
        if (filelist.length > 0) {
            return true;
        }
        return false;
    }

    /**
     * Downloads the requested file and returns a binary buffer with its content.
     *
     * @param pathname {string} : path and name of the file to download
     *
     * @return {Uint8Array} a binary buffer with the file content
     *
     * On failure, throws an exception or returns an empty content.
     */
    async download(pathname)
    {
        return await this._download(pathname);
    }

    /**
     * Uploads a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param pathname {string} : path and name of the new file to create
     * @param content {Uint8Array} : binary buffer with the content to set
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async upload(pathname,content)
    {
        return await this._upload(pathname, content);
    }

    /**
     * Deletes a file, given by its full path name, from the filesystem.
     * Because of filesystem fragmentation, deleting a file may not always
     * free up the whole space used by the file. However, rewriting a file
     * with the same path name will always reuse any space not freed previously.
     * If you need to ensure that no space is taken by previously deleted files,
     * you can use format_fs to fully reinitialize the filesystem.
     *
     * @param pathname {string} : path and name of the file to remove.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async remove(pathname)
    {
        /** @type {Uint8Array} **/
        let json;
        /** @type {string} **/
        let res;
        json = await this.sendCommand('del&f='+pathname);
        res  = this.imm_json_get_key(json, 'res');
        if (!(res == 'ok')) {
            return this._throw(this._yapi.IO_ERROR,'unable to remove file',this._yapi.IO_ERROR);
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Continues the enumeration of filesystems started using yFirstFiles().
     *
     * @return {YFiles} a pointer to a YFiles object, corresponding to
     *         a filesystem currently online, or a null pointer
     *         if there are no more filesystems to enumerate.
     */
    nextFiles()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YFiles.FindFilesInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of filesystems currently accessible.
     * Use the method YFiles.nextFiles() to iterate on
     * next filesystems.
     *
     * @return {YFiles} a pointer to a YFiles object, corresponding to
     *         the first filesystem currently online, or a null pointer
     *         if there are none.
     */
    static FirstFiles()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Files');
        if(next_hwid == null) return null;
        return YFiles.FindFiles(next_hwid);
    }

    /**
     * Starts the enumeration of filesystems currently accessible.
     * Use the method YFiles.nextFiles() to iterate on
     * next filesystems.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YFiles} a pointer to a YFiles object, corresponding to
     *         the first filesystem currently online, or a null pointer
     *         if there are none.
     */
    static FirstFilesInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Files');
        if(next_hwid == null) return null;
        return YFiles.FindFilesInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            FILESCOUNT_INVALID           : YAPI.INVALID_UINT,
            FREESPACE_INVALID            : YAPI.INVALID_UINT
        });
    }

    //--- (end of generated code: YFiles implementation)
}

//
// YFilesProxy Class: synchronous proxy to YFiles objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YFiles objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YFilesProxy extends YFunctionProxy
{
    constructor(obj_func) {
        super(obj_func);
    }

    async _asyncInit()
    {
        try {
            this.liveFunc._cachedFileList = await this.liveFunc.get_list('');
        } catch(e) {
            this.liveFunc._cachedFileList = [];
        };
    }

    /**
     * Returns a list of YFileRecord objects that describe files currently loaded
     * in the filesystem.
     *
     * @param pattern {string} : an optional filter pattern, using star and question marks
     *         as wildcards. When an empty pattern is provided, all file records
     *         are returned.
     *
     * @return {YFileRecord[]} a list of YFileRecord objects, containing the file path
     *         and name, byte size and 32-bit CRC of the file content.
     *
     * On failure, throws an exception or returns an empty list.
     */
    get_list(pattern)
    {
        var files = this.liveFunc._cachedFileList;
        var res = [];
        var regExp = new RegExp(pattern.replace(/([+.^])/g,'\\$1').replace(/[*]/g,'.*').replace(/[?]/g,'.'));
        for(let i = 0; i < files.length; i++) {
            if(regExp.test(files[i]._name)) {
                let recProxy = {
                    _name: files[i]._name,
                    _size: files[i]._size,
                    _crc: files[i]._crc
                };
                recProxy.get_name = function() { return this._name; };
                recProxy.get_size = function() { return this._size; };
                recProxy.get_crc = function()  { return this._crc; };
                recProxy.name = recProxy.get_name;
                recProxy.size = recProxy.get_size;
                recProxy.crc = recProxy.get_crc;
                res.push(recProxy);
            }
        }
        return res;
    }

    /**
     * Downloads the requested file and returns a binary buffer with its content.
     * This is the asynchronous version that uses a callback to pass the result
     * when the donwload is completed.
     *
     * @param pathname : path and name of the new file to load
     * @param callback : callback function that is invoked when the w
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFiles object whose download_async was invoked
     *         - a binary buffer with the file content
     * @param context : user-specific object that is passed as-is to the callback function
     */
    download_async(pathname, callback, context)
    {
        this.liveFunc.download(pathname).then((data) => { callback(context, this, this._yapi.imm_bin2str(data)); });
    }

    /**
     * Uploads a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param pathname : path and name of the new file to create
     * @param content : binary buffer with the content to set
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    upload(pathname,content)
    {
        this.liveFunc.upload(pathname, content).then(() => { this._asyncInit(); });
        return YAPI.SUCCESS;
    }

    /**
     * Deletes a file, given by its full path name, from the filesystem.
     * Because of filesystem fragmentation, deleting a file may not always
     * free up the whole space used by the file. However, rewriting a file
     * with the same path name will always reuse any space not freed previously.
     * If you need to ensure that no space is taken by previously deleted files,
     * you can use format_fs to fully reinitialize the filesystem.
     *
     * @param pathname : path and name of the file to remove.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    remove(pathname)
    {
        this.liveFunc.remove(pathname).then(() => { this._asyncInit(); });
        return YAPI.SUCCESS;
    }

    //--- (generated code: YFiles accessors declaration)

    /**
     * Returns the number of files currently loaded in the filesystem.
     *
     * @return an integer corresponding to the number of files currently loaded in the filesystem
     *
     * On failure, throws an exception or returns Y_FILESCOUNT_INVALID.
     */
    get_filesCount()
    {
        return this.liveFunc._filesCount;
    }

    /**
     * Returns the free space for uploading new files to the filesystem, in bytes.
     *
     * @return an integer corresponding to the free space for uploading new files to the filesystem, in bytes
     *
     * On failure, throws an exception or returns Y_FREESPACE_INVALID.
     */
    get_freeSpace()
    {
        return this.liveFunc._freeSpace;
    }

    /**
     * Reinitialize the filesystem to its clean, unfragmented, empty state.
     * All files previously uploaded are permanently lost.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    format_fs()
    {
        this.liveFunc.format_fs();
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YFiles accessors declaration)
}

//--- (generated code: YFiles functions)

YoctoLibExport('YFiles', YFiles);
YoctoLibExport('YFilesProxy', YFilesProxy);
YFiles.imm_Init();

//--- (end of generated code: YFiles functions)
