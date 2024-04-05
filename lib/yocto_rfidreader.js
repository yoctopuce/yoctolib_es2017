/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for RfidReader functions
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

//--- (generated code: YRfidTagInfo definitions)
//--- (end of generated code: YRfidTagInfo definitions)

//--- (generated code: YRfidTagInfo class start)
/**
 * YRfidTagInfo Class: RFID tag description, used by class YRfidReader
 *
 * YRfidTagInfo objects are used to describe RFID tag attributes,
 * such as the tag type and its storage size. These objects are returned by
 * method get_tagInfo() of class YRfidReader.
 */
//--- (end of generated code: YRfidTagInfo class start)

class YRfidTagInfo
{
    constructor()
    {
        //--- (generated code: YRfidTagInfo constructor)
        /** @member {number} **/
        this.IEC_15693                   = 1;
        /** @member {number} **/
        this.IEC_14443                   = 2;
        /** @member {number} **/
        this.IEC_14443_MIFARE_ULTRALIGHT = 3;
        /** @member {number} **/
        this.IEC_14443_MIFARE_CLASSIC1K  = 4;
        /** @member {number} **/
        this.IEC_14443_MIFARE_CLASSIC4K  = 5;
        /** @member {number} **/
        this.IEC_14443_MIFARE_DESFIRE    = 6;
        /** @member {number} **/
        this.IEC_14443_NTAG_213          = 7;
        /** @member {number} **/
        this.IEC_14443_NTAG_215          = 8;
        /** @member {number} **/
        this.IEC_14443_NTAG_216          = 9;
        /** @member {number} **/
        this.IEC_14443_NTAG_424_DNA      = 10;
        /** @member {string} **/
        this._tagId                      = '';
        /** @member {number} **/
        this._tagType                    = 0;
        /** @member {string} **/
        this._typeStr                    = '';
        /** @member {number} **/
        this._size                       = 0;
        /** @member {number} **/
        this._usable                     = 0;
        /** @member {number} **/
        this._blksize                    = 0;
        /** @member {number} **/
        this._fblk                       = 0;
        /** @member {number} **/
        this._lblk                       = 0;
        //--- (end of generated code: YRfidTagInfo constructor)
    }

    //--- (generated code: YRfidTagInfo implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    /**
     * Returns the RFID tag identifier.
     *
     * @return {string} a string with the RFID tag identifier.
     */
    get_tagId()
    {
        return this._tagId;
    }

    /**
     * Returns the type of the RFID tag, as a numeric constant.
     * (IEC_14443_MIFARE_CLASSIC1K, ...).
     *
     * @return {number} an integer corresponding to the RFID tag type
     */
    get_tagType()
    {
        return this._tagType;
    }

    /**
     * Returns the type of the RFID tag, as a string.
     *
     * @return {string} a string corresponding to the RFID tag type
     */
    get_tagTypeStr()
    {
        return this._typeStr;
    }

    /**
     * Returns the total memory size of the RFID tag, in bytes.
     *
     * @return {number} the total memory size of the RFID tag
     */
    get_tagMemorySize()
    {
        return this._size;
    }

    /**
     * Returns the usable storage size of the RFID tag, in bytes.
     *
     * @return {number} the usable storage size of the RFID tag
     */
    get_tagUsableSize()
    {
        return this._usable;
    }

    /**
     * Returns the block size of the RFID tag, in bytes.
     *
     * @return {number} the block size of the RFID tag
     */
    get_tagBlockSize()
    {
        return this._blksize;
    }

    /**
     * Returns the index of the block available for data storage on the RFID tag.
     * Some tags have special block used to configure the tag behavior, these
     * blocks must be handled with precaution. However, the  block return by
     * get_tagFirstBlock() can be locked, use get_tagLockState()
     * to find out  which block are locked.
     *
     * @return {number} the index of the first usable storage block on the RFID tag
     */
    get_tagFirstBlock()
    {
        return this._fblk;
    }

    /**
     * Returns the index of the last last black available for data storage on the RFID tag,
     * However, this block can be locked, use get_tagLockState() to find out
     * which block are locked.
     *
     * @return {number} the index of the last usable storage block on the RFID tag
     */
    get_tagLastBlock()
    {
        return this._lblk;
    }

    imm_init(tagId,tagType,size,usable,blksize,fblk,lblk)
    {
        /** @type {string} **/
        let typeStr;
        typeStr = 'unknown';
        if (tagType == YRfidTagInfo.IEC_15693) {
            typeStr = 'IEC 15693';
        }
        if (tagType == YRfidTagInfo.IEC_14443) {
            typeStr = 'IEC 14443';
        }
        if (tagType == YRfidTagInfo.IEC_14443_MIFARE_ULTRALIGHT) {
            typeStr = 'MIFARE Ultralight';
        }
        if (tagType == YRfidTagInfo.IEC_14443_MIFARE_CLASSIC1K) {
            typeStr = 'MIFARE Classic 1K';
        }
        if (tagType == YRfidTagInfo.IEC_14443_MIFARE_CLASSIC4K) {
            typeStr = 'MIFARE Classic 4K';
        }
        if (tagType == YRfidTagInfo.IEC_14443_MIFARE_DESFIRE) {
            typeStr = 'MIFARE DESFire';
        }
        if (tagType == YRfidTagInfo.IEC_14443_NTAG_213) {
            typeStr = 'NTAG 213';
        }
        if (tagType == YRfidTagInfo.IEC_14443_NTAG_215) {
            typeStr = 'NTAG 215';
        }
        if (tagType == YRfidTagInfo.IEC_14443_NTAG_216) {
            typeStr = 'NTAG 216';
        }
        if (tagType == YRfidTagInfo.IEC_14443_NTAG_424_DNA) {
            typeStr = 'NTAG 424 DNA';
        }
        this._tagId = tagId;
        this._tagType = tagType;
        this._typeStr = typeStr;
        this._size = size;
        this._usable = usable;
        this._blksize = blksize;
        this._fblk = fblk;
        this._lblk = lblk;
    }

    static imm_Const()
    {
        return {
            IEC_15693                    : 1,
            IEC_14443                    : 2,
            IEC_14443_MIFARE_ULTRALIGHT  : 3,
            IEC_14443_MIFARE_CLASSIC1K   : 4,
            IEC_14443_MIFARE_CLASSIC4K   : 5,
            IEC_14443_MIFARE_DESFIRE     : 6,
            IEC_14443_NTAG_213           : 7,
            IEC_14443_NTAG_215           : 8,
            IEC_14443_NTAG_216           : 9,
            IEC_14443_NTAG_424_DNA       : 10
        };
    }

    //--- (end of generated code: YRfidTagInfo implementation)
}

//--- (generated code: YRfidTagInfo functions)

YoctoLibExport('YRfidTagInfo', YRfidTagInfo);
YRfidTagInfo.imm_Init();

//--- (end of generated code: YRfidTagInfo functions)


//--- (generated code: YRfidStatus definitions)
//--- (end of generated code: YRfidStatus definitions)

//--- (generated code: YRfidStatus class start)
/**
 * YRfidStatus Class: Detailled information about the result of RFID tag operations, allowing to find
 * out what happened exactly after a tag operation failure.
 *
 * YRfidStatus objects provide additional information about
 * operations on RFID tags, including the range of blocks affected
 * by read/write operations and possible errors when communicating
 * with RFID tags.
 * This makes it possible, for example, to distinguish communication
 * errors that can be recovered by an additional attempt, from
 * security or other errors on the tag.
 * Combined with the EnableDryRun option in RfidOptions,
 * this structure can be used to predict which blocks will be affected
 * by a write operation.
 */
//--- (end of generated code: YRfidStatus class start)

class YRfidStatus
{
    constructor()
    {
        //--- (generated code: YRfidStatus constructor)
        /** @member {number} **/
        this.SUCCESS                     = 0;
        /** @member {number} **/
        this.COMMAND_NOT_SUPPORTED       = 1;
        /** @member {number} **/
        this.COMMAND_NOT_RECOGNIZED      = 2;
        /** @member {number} **/
        this.COMMAND_OPTION_NOT_RECOGNIZED = 3;
        /** @member {number} **/
        this.COMMAND_CANNOT_BE_PROCESSED_IN_TIME = 4;
        /** @member {number} **/
        this.UNDOCUMENTED_ERROR          = 15;
        /** @member {number} **/
        this.BLOCK_NOT_AVAILABLE         = 16;
        /** @member {number} **/
        this.BLOCK_ALREADY_LOCKED        = 17;
        /** @member {number} **/
        this.BLOCK_LOCKED                = 18;
        /** @member {number} **/
        this.BLOCK_NOT_SUCESSFULLY_PROGRAMMED = 19;
        /** @member {number} **/
        this.BLOCK_NOT_SUCESSFULLY_LOCKED = 20;
        /** @member {number} **/
        this.BLOCK_IS_PROTECTED          = 21;
        /** @member {number} **/
        this.CRYPTOGRAPHIC_ERROR         = 64;
        /** @member {number} **/
        this.READER_BUSY                 = 1000;
        /** @member {number} **/
        this.TAG_NOTFOUND                = 1001;
        /** @member {number} **/
        this.TAG_LEFT                    = 1002;
        /** @member {number} **/
        this.TAG_JUSTLEFT                = 1003;
        /** @member {number} **/
        this.TAG_COMMUNICATION_ERROR     = 1004;
        /** @member {number} **/
        this.TAG_NOT_RESPONDING          = 1005;
        /** @member {number} **/
        this.TIMEOUT_ERROR               = 1006;
        /** @member {number} **/
        this.COLLISION_DETECTED          = 1007;
        /** @member {number} **/
        this.INVALID_CMD_ARGUMENTS       = -66;
        /** @member {number} **/
        this.UNKNOWN_CAPABILITIES        = -67;
        /** @member {number} **/
        this.MEMORY_NOT_SUPPORTED        = -68;
        /** @member {number} **/
        this.INVALID_BLOCK_INDEX         = -69;
        /** @member {number} **/
        this.MEM_SPACE_UNVERRUN_ATTEMPT  = -70;
        /** @member {number} **/
        this.BROWNOUT_DETECTED           = -71     ;
        /** @member {number} **/
        this.BUFFER_OVERFLOW             = -72;
        /** @member {number} **/
        this.CRC_ERROR                   = -73;
        /** @member {number} **/
        this.COMMAND_RECEIVE_TIMEOUT     = -75;
        /** @member {number} **/
        this.DID_NOT_SLEEP               = -76;
        /** @member {number} **/
        this.ERROR_DECIMAL_EXPECTED      = -77;
        /** @member {number} **/
        this.HARDWARE_FAILURE            = -78;
        /** @member {number} **/
        this.ERROR_HEX_EXPECTED          = -79;
        /** @member {number} **/
        this.FIFO_LENGTH_ERROR           = -80;
        /** @member {number} **/
        this.FRAMING_ERROR               = -81;
        /** @member {number} **/
        this.NOT_IN_CNR_MODE             = -82;
        /** @member {number} **/
        this.NUMBER_OU_OF_RANGE          = -83;
        /** @member {number} **/
        this.NOT_SUPPORTED               = -84;
        /** @member {number} **/
        this.NO_RF_FIELD_ACTIVE          = -85;
        /** @member {number} **/
        this.READ_DATA_LENGTH_ERROR      = -86;
        /** @member {number} **/
        this.WATCHDOG_RESET              = -87;
        /** @member {number} **/
        this.UNKNOW_COMMAND              = -91;
        /** @member {number} **/
        this.UNKNOW_ERROR                = -92;
        /** @member {number} **/
        this.UNKNOW_PARAMETER            = -93;
        /** @member {number} **/
        this.UART_RECEIVE_ERROR          = -94;
        /** @member {number} **/
        this.WRONG_DATA_LENGTH           = -95;
        /** @member {number} **/
        this.WRONG_MODE                  = -96;
        /** @member {number} **/
        this.UNKNOWN_DWARFxx_ERROR_CODE  = -97;
        /** @member {number} **/
        this.RESPONSE_SHORT              = -98;
        /** @member {number} **/
        this.UNEXPECTED_TAG_ID_IN_RESPONSE = -99;
        /** @member {number} **/
        this.UNEXPECTED_TAG_INDEX        = -100;
        /** @member {number} **/
        this.READ_EOF                    = -101;
        /** @member {number} **/
        this.READ_OK_SOFAR               = -102;
        /** @member {number} **/
        this.WRITE_DATA_MISSING          = -103;
        /** @member {number} **/
        this.WRITE_TOO_MUCH_DATA         = -104;
        /** @member {number} **/
        this.TRANSFER_CLOSED             = -105;
        /** @member {number} **/
        this.COULD_NOT_BUILD_REQUEST     = -106;
        /** @member {number} **/
        this.INVALID_OPTIONS             = -107;
        /** @member {number} **/
        this.UNEXPECTED_RESPONSE         = -108;
        /** @member {number} **/
        this.AFI_NOT_AVAILABLE           = -109;
        /** @member {number} **/
        this.DSFID_NOT_AVAILABLE         = -110;
        /** @member {number} **/
        this.TAG_RESPONSE_TOO_SHORT      = -111;
        /** @member {number} **/
        this.DEC_EXPECTED                = -112 ;
        /** @member {number} **/
        this.HEX_EXPECTED                = -113;
        /** @member {number} **/
        this.NOT_SAME_SECOR              = -114;
        /** @member {number} **/
        this.MIFARE_AUTHENTICATED        = -115;
        /** @member {number} **/
        this.NO_DATABLOCK                = -116;
        /** @member {number} **/
        this.KEYB_IS_READABLE            = -117;
        /** @member {number} **/
        this.OPERATION_NOT_EXECUTED      = -118;
        /** @member {number} **/
        this.BLOK_MODE_ERROR             = -119;
        /** @member {number} **/
        this.BLOCK_NOT_WRITABLE          = -120;
        /** @member {number} **/
        this.BLOCK_ACCESS_ERROR          = -121;
        /** @member {number} **/
        this.BLOCK_NOT_AUTHENTICATED     = -122;
        /** @member {number} **/
        this.ACCESS_KEY_BIT_NOT_WRITABLE = -123;
        /** @member {number} **/
        this.USE_KEYA_FOR_AUTH           = -124;
        /** @member {number} **/
        this.USE_KEYB_FOR_AUTH           = -125;
        /** @member {number} **/
        this.KEY_NOT_CHANGEABLE          = -126;
        /** @member {number} **/
        this.BLOCK_TOO_HIGH              = -127;
        /** @member {number} **/
        this.AUTH_ERR                    = -128;
        /** @member {number} **/
        this.NOKEY_SELECT                = -129;
        /** @member {number} **/
        this.CARD_NOT_SELECTED           = -130;
        /** @member {number} **/
        this.BLOCK_TO_READ_NONE          = -131;
        /** @member {number} **/
        this.NO_TAG                      = -132;
        /** @member {number} **/
        this.TOO_MUCH_DATA               = -133;
        /** @member {number} **/
        this.CON_NOT_SATISFIED           = -134;
        /** @member {number} **/
        this.BLOCK_IS_SPECIAL            = -135;
        /** @member {number} **/
        this.READ_BEYOND_ANNOUNCED_SIZE  = -136;
        /** @member {number} **/
        this.BLOCK_ZERO_IS_RESERVED      = -137;
        /** @member {number} **/
        this.VALUE_BLOCK_BAD_FORMAT      = -138;
        /** @member {number} **/
        this.ISO15693_ONLY_FEATURE       = -139;
        /** @member {number} **/
        this.ISO14443_ONLY_FEATURE       = -140;
        /** @member {number} **/
        this.MIFARE_CLASSIC_ONLY_FEATURE = -141;
        /** @member {number} **/
        this.BLOCK_MIGHT_BE_PROTECTED    = -142;
        /** @member {number} **/
        this.NO_SUCH_BLOCK               = -143;
        /** @member {number} **/
        this.COUNT_TOO_BIG               = -144;
        /** @member {number} **/
        this.UNKNOWN_MEM_SIZE            = -145;
        /** @member {number} **/
        this.MORE_THAN_2BLOCKS_MIGHT_NOT_WORK = -146;
        /** @member {number} **/
        this.READWRITE_NOT_SUPPORTED     = -147;
        /** @member {number} **/
        this.UNEXPECTED_VICC_ID_IN_RESPONSE = -148;
        /** @member {number} **/
        this.LOCKBLOCK_NOT_SUPPORTED     = -150;
        /** @member {number} **/
        this.INTERNAL_ERROR_SHOULD_NEVER_HAPPEN = -151;
        /** @member {number} **/
        this.INVLD_BLOCK_MODE_COMBINATION = -152;
        /** @member {number} **/
        this.INVLD_ACCESS_MODE_COMBINATION = -153;
        /** @member {number} **/
        this.INVALID_SIZE                = -154;
        /** @member {number} **/
        this.BAD_PASSWORD_FORMAT         = -155;
        /** @member {number} **/
        this.RADIO_IS_OFF                = -156;
        /** @member {string} **/
        this._tagId                      = '';
        /** @member {number} **/
        this._errCode                    = 0;
        /** @member {number} **/
        this._errBlk                     = 0;
        /** @member {string} **/
        this._errMsg                     = '';
        /** @member {number} **/
        this._yapierr                    = 0;
        /** @member {number} **/
        this._fab                        = 0;
        /** @member {number} **/
        this._lab                        = 0;
        //--- (end of generated code: YRfidStatus constructor)
    }

    //--- (generated code: YRfidStatus implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    /**
     * Returns RFID tag identifier related to the status.
     *
     * @return {string} a string with the RFID tag identifier.
     */
    get_tagId()
    {
        return this._tagId;
    }

    /**
     * Returns the detailled error code, or 0 if no error happened.
     *
     * @return {number} a numeric error code
     */
    get_errorCode()
    {
        return this._errCode;
    }

    /**
     * Returns the RFID tag memory block number where the error was encountered, or -1 if the
     * error is not specific to a memory block.
     *
     * @return {number} an RFID tag block number
     */
    get_errorBlock()
    {
        return this._errBlk;
    }

    /**
     * Returns a string describing precisely the RFID commande result.
     *
     * @return {string} an error message string
     */
    get_errorMessage()
    {
        return this._errMsg;
    }

    get_yapiError()
    {
        return this._yapierr;
    }

    /**
     * Returns the block number of the first RFID tag memory block affected
     * by the operation. Depending on the type of operation and on the tag
     * memory granularity, this number may be smaller than the requested
     * memory block index.
     *
     * @return {number} an RFID tag block number
     */
    get_firstAffectedBlock()
    {
        return this._fab;
    }

    /**
     * Returns the block number of the last RFID tag memory block affected
     * by the operation. Depending on the type of operation and on the tag
     * memory granularity, this number may be bigger than the requested
     * memory block index.
     *
     * @return {number} an RFID tag block number
     */
    get_lastAffectedBlock()
    {
        return this._lab;
    }

    imm_init(tagId,errCode,errBlk,fab,lab)
    {
        /** @type {string} **/
        let errMsg;
        if (errCode == 0) {
            this._yapierr = YAPI.SUCCESS;
            errMsg = 'Success (no error)';
        } else {
            if (errCode < 0) {
                if (errCode > -50) {
                    this._yapierr = errCode;
                    errMsg = 'YoctoLib error '+String(Math.round(errCode));
                } else {
                    this._yapierr = YAPI.RFID_HARD_ERROR;
                    errMsg = 'Non-recoverable RFID error '+String(Math.round(errCode));
                }
            } else {
                if (errCode > 1000) {
                    this._yapierr = YAPI.RFID_SOFT_ERROR;
                    errMsg = 'Recoverable RFID error '+String(Math.round(errCode));
                } else {
                    this._yapierr = YAPI.RFID_HARD_ERROR;
                    errMsg = 'Non-recoverable RFID error '+String(Math.round(errCode));
                }
            }
            if (errCode == YRfidStatus.TAG_NOTFOUND) {
                errMsg = 'Tag not found';
            }
            if (errCode == YRfidStatus.TAG_JUSTLEFT) {
                errMsg = 'Tag left during operation';
            }
            if (errCode == YRfidStatus.TAG_LEFT) {
                errMsg = 'Tag not here anymore';
            }
            if (errCode == YRfidStatus.READER_BUSY) {
                errMsg = 'Reader is busy';
            }
            if (errCode == YRfidStatus.INVALID_CMD_ARGUMENTS) {
                errMsg = 'Invalid command arguments';
            }
            if (errCode == YRfidStatus.UNKNOWN_CAPABILITIES) {
                errMsg = 'Unknown capabilities';
            }
            if (errCode == YRfidStatus.MEMORY_NOT_SUPPORTED) {
                errMsg = 'Memory no present';
            }
            if (errCode == YRfidStatus.INVALID_BLOCK_INDEX) {
                errMsg = 'Invalid block index';
            }
            if (errCode == YRfidStatus.MEM_SPACE_UNVERRUN_ATTEMPT) {
                errMsg = 'Tag memory space overrun attempt';
            }
            if (errCode == YRfidStatus.COMMAND_NOT_SUPPORTED) {
                errMsg = 'The command is not supported';
            }
            if (errCode == YRfidStatus.COMMAND_NOT_RECOGNIZED) {
                errMsg = 'The command is not recognized';
            }
            if (errCode == YRfidStatus.COMMAND_OPTION_NOT_RECOGNIZED) {
                errMsg = 'The command option is not supported.';
            }
            if (errCode == YRfidStatus.COMMAND_CANNOT_BE_PROCESSED_IN_TIME) {
                errMsg = 'The command cannot be processed in time';
            }
            if (errCode == YRfidStatus.UNDOCUMENTED_ERROR) {
                errMsg = 'Error with no information given';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_AVAILABLE) {
                errMsg = 'Block is not available';
            }
            if (errCode == YRfidStatus.BLOCK_ALREADY_LOCKED) {
                errMsg = 'Block / byte is already locked and thus cannot be locked again.';
            }
            if (errCode == YRfidStatus.BLOCK_LOCKED) {
                errMsg = 'Block / byte is locked and its content cannot be changed';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_SUCESSFULLY_PROGRAMMED) {
                errMsg = 'Block was not successfully programmed';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_SUCESSFULLY_LOCKED) {
                errMsg = 'Block was not successfully locked';
            }
            if (errCode == YRfidStatus.BLOCK_IS_PROTECTED) {
                errMsg = 'Block is protected';
            }
            if (errCode == YRfidStatus.CRYPTOGRAPHIC_ERROR) {
                errMsg = 'Generic cryptographic error';
            }
            if (errCode == YRfidStatus.BROWNOUT_DETECTED) {
                errMsg = 'BrownOut detected (BOD)';
            }
            if (errCode == YRfidStatus.BUFFER_OVERFLOW) {
                errMsg = 'Buffer Overflow (BOF)';
            }
            if (errCode == YRfidStatus.CRC_ERROR) {
                errMsg = 'Communication CRC Error (CCE)';
            }
            if (errCode == YRfidStatus.COLLISION_DETECTED) {
                errMsg = 'Collision Detected (CLD/CDT)';
            }
            if (errCode == YRfidStatus.COMMAND_RECEIVE_TIMEOUT) {
                errMsg = 'Command Receive Timeout (CRT)';
            }
            if (errCode == YRfidStatus.DID_NOT_SLEEP) {
                errMsg = 'Did Not Sleep (DNS)';
            }
            if (errCode == YRfidStatus.ERROR_DECIMAL_EXPECTED) {
                errMsg = 'Error Decimal Expected (EDX)';
            }
            if (errCode == YRfidStatus.HARDWARE_FAILURE) {
                errMsg = 'Error Hardware Failure (EHF)';
            }
            if (errCode == YRfidStatus.ERROR_HEX_EXPECTED) {
                errMsg = 'Error Hex Expected (EHX)';
            }
            if (errCode == YRfidStatus.FIFO_LENGTH_ERROR) {
                errMsg = 'FIFO length error (FLE)';
            }
            if (errCode == YRfidStatus.FRAMING_ERROR) {
                errMsg = 'Framing error (FER)';
            }
            if (errCode == YRfidStatus.NOT_IN_CNR_MODE) {
                errMsg = 'Not in CNR Mode (NCM)';
            }
            if (errCode == YRfidStatus.NUMBER_OU_OF_RANGE) {
                errMsg = 'Number Out of Range (NOR)';
            }
            if (errCode == YRfidStatus.NOT_SUPPORTED) {
                errMsg = 'Not Supported (NOS)';
            }
            if (errCode == YRfidStatus.NO_RF_FIELD_ACTIVE) {
                errMsg = 'No RF field active (NRF)';
            }
            if (errCode == YRfidStatus.READ_DATA_LENGTH_ERROR) {
                errMsg = 'Read data length error (RDL)';
            }
            if (errCode == YRfidStatus.WATCHDOG_RESET) {
                errMsg = 'Watchdog reset (SRT)';
            }
            if (errCode == YRfidStatus.TAG_COMMUNICATION_ERROR) {
                errMsg = 'Tag Communication Error (TCE)';
            }
            if (errCode == YRfidStatus.TAG_NOT_RESPONDING) {
                errMsg = 'Tag Not Responding (TNR)';
            }
            if (errCode == YRfidStatus.TIMEOUT_ERROR) {
                errMsg = 'TimeOut Error (TOE)';
            }
            if (errCode == YRfidStatus.UNKNOW_COMMAND) {
                errMsg = 'Unknown Command (UCO)';
            }
            if (errCode == YRfidStatus.UNKNOW_ERROR) {
                errMsg = 'Unknown error (UER)';
            }
            if (errCode == YRfidStatus.UNKNOW_PARAMETER) {
                errMsg = 'Unknown Parameter (UPA)';
            }
            if (errCode == YRfidStatus.UART_RECEIVE_ERROR) {
                errMsg = 'UART Receive Error (URE)';
            }
            if (errCode == YRfidStatus.WRONG_DATA_LENGTH) {
                errMsg = 'Wrong Data Length (WDL)';
            }
            if (errCode == YRfidStatus.WRONG_MODE) {
                errMsg = 'Wrong Mode (WMO)';
            }
            if (errCode == YRfidStatus.UNKNOWN_DWARFxx_ERROR_CODE) {
                errMsg = 'Unknown DWARF15 error code';
            }
            if (errCode == YRfidStatus.UNEXPECTED_TAG_ID_IN_RESPONSE) {
                errMsg = 'Unexpected Tag id in response';
            }
            if (errCode == YRfidStatus.UNEXPECTED_TAG_INDEX) {
                errMsg = 'internal error : unexpected TAG index';
            }
            if (errCode == YRfidStatus.TRANSFER_CLOSED) {
                errMsg = 'transfer closed';
            }
            if (errCode == YRfidStatus.WRITE_DATA_MISSING) {
                errMsg = 'Missing write data';
            }
            if (errCode == YRfidStatus.WRITE_TOO_MUCH_DATA) {
                errMsg = 'Attempt to write too much data';
            }
            if (errCode == YRfidStatus.COULD_NOT_BUILD_REQUEST) {
                errMsg = 'Could not not request';
            }
            if (errCode == YRfidStatus.INVALID_OPTIONS) {
                errMsg = 'Invalid transfer options';
            }
            if (errCode == YRfidStatus.UNEXPECTED_RESPONSE) {
                errMsg = 'Unexpected Tag response';
            }
            if (errCode == YRfidStatus.AFI_NOT_AVAILABLE) {
                errMsg = 'AFI not available';
            }
            if (errCode == YRfidStatus.DSFID_NOT_AVAILABLE) {
                errMsg = 'DSFID not available';
            }
            if (errCode == YRfidStatus.TAG_RESPONSE_TOO_SHORT) {
                errMsg = 'Tag\'s response too short';
            }
            if (errCode == YRfidStatus.DEC_EXPECTED) {
                errMsg = 'Error Decimal value Expected, or is missing';
            }
            if (errCode == YRfidStatus.HEX_EXPECTED) {
                errMsg = 'Error Hexadecimal value Expected, or is missing';
            }
            if (errCode == YRfidStatus.NOT_SAME_SECOR) {
                errMsg = 'Input and Output block are not in the same Sector';
            }
            if (errCode == YRfidStatus.MIFARE_AUTHENTICATED) {
                errMsg = 'No chip with MIFARE Classic technology Authenticated';
            }
            if (errCode == YRfidStatus.NO_DATABLOCK) {
                errMsg = 'No Data Block';
            }
            if (errCode == YRfidStatus.KEYB_IS_READABLE) {
                errMsg = 'Key B is Readable';
            }
            if (errCode == YRfidStatus.OPERATION_NOT_EXECUTED) {
                errMsg = 'Operation Not Executed, would have caused an overflow';
            }
            if (errCode == YRfidStatus.BLOK_MODE_ERROR) {
                errMsg = 'Block has not been initialized as a \'value block\'';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_WRITABLE) {
                errMsg = 'Block Not Writable';
            }
            if (errCode == YRfidStatus.BLOCK_ACCESS_ERROR) {
                errMsg = 'Block Access Error';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_AUTHENTICATED) {
                errMsg = 'Block Not Authenticated';
            }
            if (errCode == YRfidStatus.ACCESS_KEY_BIT_NOT_WRITABLE) {
                errMsg = 'Access bits or Keys not Writable';
            }
            if (errCode == YRfidStatus.USE_KEYA_FOR_AUTH) {
                errMsg = 'Use Key B for authentication';
            }
            if (errCode == YRfidStatus.USE_KEYB_FOR_AUTH) {
                errMsg = 'Use Key A for authentication';
            }
            if (errCode == YRfidStatus.KEY_NOT_CHANGEABLE) {
                errMsg = 'Key(s) not changeable';
            }
            if (errCode == YRfidStatus.BLOCK_TOO_HIGH) {
                errMsg = 'Block index is too high';
            }
            if (errCode == YRfidStatus.AUTH_ERR) {
                errMsg = 'Authentication Error (i.e. wrong key)';
            }
            if (errCode == YRfidStatus.NOKEY_SELECT) {
                errMsg = 'No Key Select, select a temporary or a static key';
            }
            if (errCode == YRfidStatus.CARD_NOT_SELECTED) {
                errMsg = ' Card is Not Selected';
            }
            if (errCode == YRfidStatus.BLOCK_TO_READ_NONE) {
                errMsg = 'Number of Blocks to Read is 0';
            }
            if (errCode == YRfidStatus.NO_TAG) {
                errMsg = 'No Tag detected';
            }
            if (errCode == YRfidStatus.TOO_MUCH_DATA) {
                errMsg = 'Too Much Data (i.e. Uart input buffer overflow)';
            }
            if (errCode == YRfidStatus.CON_NOT_SATISFIED) {
                errMsg = 'Conditions Not Satisfied';
            }
            if (errCode == YRfidStatus.BLOCK_IS_SPECIAL) {
                errMsg = 'Bad parameter: block is a special block';
            }
            if (errCode == YRfidStatus.READ_BEYOND_ANNOUNCED_SIZE) {
                errMsg = 'Attempt to read more than announced size.';
            }
            if (errCode == YRfidStatus.BLOCK_ZERO_IS_RESERVED) {
                errMsg = 'Block 0 is reserved and cannot be used';
            }
            if (errCode == YRfidStatus.VALUE_BLOCK_BAD_FORMAT) {
                errMsg = 'One value block is not properly initialized';
            }
            if (errCode == YRfidStatus.ISO15693_ONLY_FEATURE) {
                errMsg = 'Feature available on ISO 15693 only';
            }
            if (errCode == YRfidStatus.ISO14443_ONLY_FEATURE) {
                errMsg = 'Feature available on ISO 14443 only';
            }
            if (errCode == YRfidStatus.MIFARE_CLASSIC_ONLY_FEATURE) {
                errMsg = 'Feature available on ISO 14443 MIFARE Classic only';
            }
            if (errCode == YRfidStatus.BLOCK_MIGHT_BE_PROTECTED) {
                errMsg = 'Block might be protected';
            }
            if (errCode == YRfidStatus.NO_SUCH_BLOCK) {
                errMsg = 'No such block';
            }
            if (errCode == YRfidStatus.COUNT_TOO_BIG) {
                errMsg = 'Count parameter is too large';
            }
            if (errCode == YRfidStatus.UNKNOWN_MEM_SIZE) {
                errMsg = 'Tag memory size is unknown';
            }
            if (errCode == YRfidStatus.MORE_THAN_2BLOCKS_MIGHT_NOT_WORK) {
                errMsg = 'Writing more than two blocks at once might not be supported by this tag';
            }
            if (errCode == YRfidStatus.READWRITE_NOT_SUPPORTED) {
                errMsg = 'Read/write operation not supported for this tag';
            }
            if (errCode == YRfidStatus.UNEXPECTED_VICC_ID_IN_RESPONSE) {
                errMsg = 'Unexpected VICC ID in response';
            }
            if (errCode == YRfidStatus.LOCKBLOCK_NOT_SUPPORTED) {
                errMsg = 'This tag does not support the Lock block function';
            }
            if (errCode == YRfidStatus.INTERNAL_ERROR_SHOULD_NEVER_HAPPEN) {
                errMsg = 'Yoctopuce RFID code ran into an unexpected state, please contact support';
            }
            if (errCode == YRfidStatus.INVLD_BLOCK_MODE_COMBINATION) {
                errMsg = 'Invalid combination of block mode options';
            }
            if (errCode == YRfidStatus.INVLD_ACCESS_MODE_COMBINATION) {
                errMsg = 'Invalid combination of access mode options';
            }
            if (errCode == YRfidStatus.INVALID_SIZE) {
                errMsg = 'Invalid data size parameter';
            }
            if (errCode == YRfidStatus.BAD_PASSWORD_FORMAT) {
                errMsg = 'Bad password format or type';
            }
            if (errCode == YRfidStatus.RADIO_IS_OFF) {
                errMsg = 'Radio is OFF (refreshRate=0).';
            }
            if (errBlk >= 0) {
                errMsg = errMsg+' (block '+String(Math.round(errBlk))+')';
            }
        }
        this._tagId = tagId;
        this._errCode = errCode;
        this._errBlk = errBlk;
        this._errMsg = errMsg;
        this._fab = fab;
        this._lab = lab;
    }

    static imm_Const()
    {
        return {
            SUCCESS                      : 0,
            COMMAND_NOT_SUPPORTED        : 1,
            COMMAND_NOT_RECOGNIZED       : 2,
            COMMAND_OPTION_NOT_RECOGNIZED : 3,
            COMMAND_CANNOT_BE_PROCESSED_IN_TIME : 4,
            UNDOCUMENTED_ERROR           : 15,
            BLOCK_NOT_AVAILABLE          : 16,
            BLOCK_ALREADY_LOCKED         : 17,
            BLOCK_LOCKED                 : 18,
            BLOCK_NOT_SUCESSFULLY_PROGRAMMED : 19,
            BLOCK_NOT_SUCESSFULLY_LOCKED : 20,
            BLOCK_IS_PROTECTED           : 21,
            CRYPTOGRAPHIC_ERROR          : 64,
            READER_BUSY                  : 1000,
            TAG_NOTFOUND                 : 1001,
            TAG_LEFT                     : 1002,
            TAG_JUSTLEFT                 : 1003,
            TAG_COMMUNICATION_ERROR      : 1004,
            TAG_NOT_RESPONDING           : 1005,
            TIMEOUT_ERROR                : 1006,
            COLLISION_DETECTED           : 1007,
            INVALID_CMD_ARGUMENTS        : -66,
            UNKNOWN_CAPABILITIES         : -67,
            MEMORY_NOT_SUPPORTED         : -68,
            INVALID_BLOCK_INDEX          : -69,
            MEM_SPACE_UNVERRUN_ATTEMPT   : -70,
            BROWNOUT_DETECTED            : -71     ,
            BUFFER_OVERFLOW              : -72,
            CRC_ERROR                    : -73,
            COMMAND_RECEIVE_TIMEOUT      : -75,
            DID_NOT_SLEEP                : -76,
            ERROR_DECIMAL_EXPECTED       : -77,
            HARDWARE_FAILURE             : -78,
            ERROR_HEX_EXPECTED           : -79,
            FIFO_LENGTH_ERROR            : -80,
            FRAMING_ERROR                : -81,
            NOT_IN_CNR_MODE              : -82,
            NUMBER_OU_OF_RANGE           : -83,
            NOT_SUPPORTED                : -84,
            NO_RF_FIELD_ACTIVE           : -85,
            READ_DATA_LENGTH_ERROR       : -86,
            WATCHDOG_RESET               : -87,
            UNKNOW_COMMAND               : -91,
            UNKNOW_ERROR                 : -92,
            UNKNOW_PARAMETER             : -93,
            UART_RECEIVE_ERROR           : -94,
            WRONG_DATA_LENGTH            : -95,
            WRONG_MODE                   : -96,
            UNKNOWN_DWARFxx_ERROR_CODE   : -97,
            RESPONSE_SHORT               : -98,
            UNEXPECTED_TAG_ID_IN_RESPONSE : -99,
            UNEXPECTED_TAG_INDEX         : -100,
            READ_EOF                     : -101,
            READ_OK_SOFAR                : -102,
            WRITE_DATA_MISSING           : -103,
            WRITE_TOO_MUCH_DATA          : -104,
            TRANSFER_CLOSED              : -105,
            COULD_NOT_BUILD_REQUEST      : -106,
            INVALID_OPTIONS              : -107,
            UNEXPECTED_RESPONSE          : -108,
            AFI_NOT_AVAILABLE            : -109,
            DSFID_NOT_AVAILABLE          : -110,
            TAG_RESPONSE_TOO_SHORT       : -111,
            DEC_EXPECTED                 : -112 ,
            HEX_EXPECTED                 : -113,
            NOT_SAME_SECOR               : -114,
            MIFARE_AUTHENTICATED         : -115,
            NO_DATABLOCK                 : -116,
            KEYB_IS_READABLE             : -117,
            OPERATION_NOT_EXECUTED       : -118,
            BLOK_MODE_ERROR              : -119,
            BLOCK_NOT_WRITABLE           : -120,
            BLOCK_ACCESS_ERROR           : -121,
            BLOCK_NOT_AUTHENTICATED      : -122,
            ACCESS_KEY_BIT_NOT_WRITABLE  : -123,
            USE_KEYA_FOR_AUTH            : -124,
            USE_KEYB_FOR_AUTH            : -125,
            KEY_NOT_CHANGEABLE           : -126,
            BLOCK_TOO_HIGH               : -127,
            AUTH_ERR                     : -128,
            NOKEY_SELECT                 : -129,
            CARD_NOT_SELECTED            : -130,
            BLOCK_TO_READ_NONE           : -131,
            NO_TAG                       : -132,
            TOO_MUCH_DATA                : -133,
            CON_NOT_SATISFIED            : -134,
            BLOCK_IS_SPECIAL             : -135,
            READ_BEYOND_ANNOUNCED_SIZE   : -136,
            BLOCK_ZERO_IS_RESERVED       : -137,
            VALUE_BLOCK_BAD_FORMAT       : -138,
            ISO15693_ONLY_FEATURE        : -139,
            ISO14443_ONLY_FEATURE        : -140,
            MIFARE_CLASSIC_ONLY_FEATURE  : -141,
            BLOCK_MIGHT_BE_PROTECTED     : -142,
            NO_SUCH_BLOCK                : -143,
            COUNT_TOO_BIG                : -144,
            UNKNOWN_MEM_SIZE             : -145,
            MORE_THAN_2BLOCKS_MIGHT_NOT_WORK : -146,
            READWRITE_NOT_SUPPORTED      : -147,
            UNEXPECTED_VICC_ID_IN_RESPONSE : -148,
            LOCKBLOCK_NOT_SUPPORTED      : -150,
            INTERNAL_ERROR_SHOULD_NEVER_HAPPEN : -151,
            INVLD_BLOCK_MODE_COMBINATION : -152,
            INVLD_ACCESS_MODE_COMBINATION : -153,
            INVALID_SIZE                 : -154,
            BAD_PASSWORD_FORMAT          : -155,
            RADIO_IS_OFF                 : -156
        };
    }

    //--- (end of generated code: YRfidStatus implementation)
}

//--- (generated code: YRfidStatus functions)

YoctoLibExport('YRfidStatus', YRfidStatus);
YRfidStatus.imm_Init();

//--- (end of generated code: YRfidStatus functions)


//--- (generated code: YRfidOptions definitions)
//--- (end of generated code: YRfidOptions definitions)

//--- (generated code: YRfidOptions class start)
/**
 * YRfidOptions Class: Additional parameters for operations on RFID tags.
 *
 * The YRfidOptions objects are used to specify additional
 * optional parameters to RFID commands that interact with tags,
 * including security keys. When instantiated,the parameters of
 * this object are pre-initialized to a value  which corresponds
 * to the most common usage.
 */
//--- (end of generated code: YRfidOptions class start)

class YRfidOptions
{
    constructor()
    {
        //--- (generated code: YRfidOptions constructor)
        /**
         * Type of security key to be used to access the RFID tag.
         * For MIFARE Classic tags, allowed values are
         * Y_MIFARE_KEY_A or Y_MIFARE_KEY_B.
         * The default value is Y_NO_RFID_KEY, in that case
         * the reader will use the most common default key for the
         * tag type.
         * When a security key is required, it must be provided
         * using property HexKey.
         */
        this.KeyType                     = 0;
        /**
         * Security key to be used to access the RFID tag, as an
         * hexadecimal string. The key will only be used if you
         * also specify which type of key it is, using property
         * KeyType.
         */
        this.HexKey                      = '';
        /**
         * Force the use of single-block commands to access RFID tag memory blocks.
         * By default, the Yoctopuce library uses the most efficient access strategy
         * generally available for each tag type, but you can force the use of
         * single-block commands if the RFID tags you are using do not support
         * multi-block commands. If opération speed is not a priority, choose
         * single-block mode as it will work with any mode.
         */
        this.ForceSingleBlockAccess      = 0;
        /**
         * Force the use of multi-block commands to access RFID tag memory blocks.
         * By default, the Yoctopuce library uses the most efficient access strategy
         * generally available for each tag type, but you can force the use of
         * multi-block commands if you know for sure that the RFID tags you are using
         * do support multi-block commands. Be  aware that even if a tag allows multi-block
         * operations, the maximum number of blocks that can be written or read at the same
         * time can be (very) limited. If the tag does not support multi-block mode
         * for the wanted opération, the option will be ignored.
         */
        this.ForceMultiBlockAccess       = 0;
        /**
         * Enable direct access to RFID tag control blocks.
         * By default, Yoctopuce library read and write functions only work
         * on data blocks and automatically skip special blocks, as specific functions are provided
         * to configure security parameters found in control blocks.
         * If you need to access control blocks in your own way using
         * read/write functions, enable this option.  Use this option wisely,
         * as overwriting a special block migth very well irreversibly alter your
         * tag behavior.
         */
        this.EnableRawAccess             = 0;
        /**
         * Disables the tag memory overflow test. By default, the Yoctopuce
         * library's read/write functions detect overruns and do not run
         * commands that are likely to fail. If you nevertheless wish to
         * try to access more memory than the tag announces, you can try to use
         * this option.
         */
        this.DisableBoundaryChecks       = 0;
        /**
         * Enable simulation mode to check the affected block range as well
         * as access rights. When this option is active, the operation is
         * not fully applied to the RFID tag but the affected block range
         * is determined and the optional access key is tested on these blocks.
         * The access key rights are not tested though. This option applies to
         * write / configure operations only, it is ignored for read operations.
         */
        this.EnableDryRun                = 0;
        /** @member {number} **/
        this.NO_RFID_KEY                 = 0;
        /** @member {number} **/
        this.MIFARE_KEY_A                = 1;
        /** @member {number} **/
        this.MIFARE_KEY_B                = 2;
        //--- (end of generated code: YRfidOptions constructor)
    }

    //--- (generated code: YRfidOptions implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    imm_getParams()
    {
        /** @type {number} **/
        let opt;
        /** @type {string} **/
        let res;
        if (this.ForceSingleBlockAccess) {
            opt = 1;
        } else {
            opt = 0;
        }
        if (this.ForceMultiBlockAccess) {
            opt = ((opt) | (2));
        }
        if (this.EnableRawAccess) {
            opt = ((opt) | (4));
        }
        if (this.DisableBoundaryChecks) {
            opt = ((opt) | (8));
        }
        if (this.EnableDryRun) {
            opt = ((opt) | (16));
        }
        res = '&o='+String(Math.round(opt));
        if (this.KeyType != 0) {
            res = res+'&k='+('00'+(this.KeyType).toString(16)).slice(-2).toLowerCase()+':'+this.HexKey;
        }
        return res;
    }

    static imm_Const()
    {
        return {
            NO_RFID_KEY                  : 0,
            MIFARE_KEY_A                 : 1,
            MIFARE_KEY_B                 : 2
        };
    }

    //--- (end of generated code: YRfidOptions implementation)
}

//--- (generated code: YRfidOptions functions)

YoctoLibExport('YRfidOptions', YRfidOptions);
YRfidOptions.imm_Init();

//--- (end of generated code: YRfidOptions functions)


//--- (generated code: YRfidReader return codes)
//--- (end of generated code: YRfidReader return codes)
//--- (generated code: YRfidReader definitions)
//--- (end of generated code: YRfidReader definitions)

async function yInternalEventCallback(YRfidReader_obj, str_value)
{
    await YRfidReader_obj._internalEventHandler(str_value);
}

//--- (generated code: YRfidReader class start)
/**
 * YRfidReader Class: RfidReader function interface
 *
 * The YRfidReader class allows you to detect RFID tags, as well as
 * read and write on these tags if the security settings allow it.
 *
 * Short reminder:
 *
 * - A tag's memory is generally organized in fixed-size blocks.
 * - At tag level, each block must be read and written in its entirety.
 * - Some blocks are special configuration blocks, and may alter the tag's behaviour
 * tag behavior if they are rewritten with arbitrary data.
 * - Data blocks can be set to read-only mode, but on many tags, this operation is irreversible.
 *
 *
 * By default, the RfidReader class automatically manages these blocks so that
 * arbitrary size data  can be manipulated of  without risk and without knowledge of
 * tag architecture .
 */
//--- (end of generated code: YRfidReader class start)

class YRfidReader extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (generated code: YRfidReader constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'RfidReader';
        /** @member {number} **/
        this._nTags                      = YRfidReader.NTAGS_INVALID;
        /** @member {number} **/
        this._refreshRate                = YRfidReader.REFRESHRATE_INVALID;
        /** @member {function} **/
        this._eventCallback              = null;
        /** @member {boolean} **/
        this._isFirstCb                  = 0;
        /** @member {number} **/
        this._prevCbPos                  = 0;
        /** @member {number} **/
        this._eventPos                   = 0;
        /** @member {number} **/
        this._eventStamp                 = 0;
        //--- (end of generated code: YRfidReader constructor)
    }

    //--- (generated code: YRfidReader implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'nTags':
            this._nTags = parseInt(val);
            return 1;
        case 'refreshRate':
            this._refreshRate = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of RFID tags currently detected.
     *
     * @return {Promise<number>} an integer corresponding to the number of RFID tags currently detected
     *
     * On failure, throws an exception or returns YRfidReader.NTAGS_INVALID.
     */
    async get_nTags()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRfidReader.NTAGS_INVALID;
            }
        }
        res = this._nTags;
        return res;
    }

    /**
     * Returns the tag list refresh rate, measured in Hz.
     *
     * @return {Promise<number>} an integer corresponding to the tag list refresh rate, measured in Hz
     *
     * On failure, throws an exception or returns YRfidReader.REFRESHRATE_INVALID.
     */
    async get_refreshRate()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRfidReader.REFRESHRATE_INVALID;
            }
        }
        res = this._refreshRate;
        return res;
    }

    /**
     * Changes the present tag list refresh rate, measured in Hz. The reader will do
     * its best to respect it. Note that the reader cannot detect tag arrival or removal
     * while it is  communicating with a tag.  Maximum frequency is limited to 100Hz,
     * but in real life it will be difficult to do better than 50Hz.  A zero value
     * will power off the device radio.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the present tag list refresh rate, measured in Hz
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
     * Retrieves a RFID reader for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the RFID reader is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRfidReader.isOnline() to test if the RFID reader is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RFID reader by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the RFID reader, for instance
     *         MyDevice.rfidReader.
     *
     * @return {YRfidReader} a YRfidReader object allowing you to drive the RFID reader.
     */
    static FindRfidReader(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('RfidReader', func);
        if (obj == null) {
            obj = new YRfidReader(YAPI, func);
            YFunction._AddToCache('RfidReader',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a RFID reader for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the RFID reader is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRfidReader.isOnline() to test if the RFID reader is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RFID reader by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the RFID reader, for instance
     *         MyDevice.rfidReader.
     *
     * @return {YRfidReader} a YRfidReader object allowing you to drive the RFID reader.
     */
    static FindRfidReaderInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'RfidReader', func);
        if (obj == null) {
            obj = new YRfidReader(yctx, func);
            YFunction._AddToCache('RfidReader',  func, obj);
        }
        return obj;
    }

    async _chkerror(tagId,json,status)
    {
        /** @type {string} **/
        let jsonStr;
        /** @type {number} **/
        let errCode;
        /** @type {number} **/
        let errBlk;
        /** @type {number} **/
        let fab;
        /** @type {number} **/
        let lab;
        /** @type {number} **/
        let retcode;

        if ((json).length == 0) {
            errCode = await this.get_errorType();
            errBlk = -1;
            fab = -1;
            lab = -1;
        } else {
            jsonStr = this._yapi.imm_bin2str(json);
            errCode = this._yapi.imm_atoi(this.imm_json_get_key(json, 'err'));
            errBlk = this._yapi.imm_atoi(this.imm_json_get_key(json, 'errBlk'))-1;
            if ((jsonStr).indexOf('"fab":') >= 0) {
                fab = this._yapi.imm_atoi(this.imm_json_get_key(json, 'fab'))-1;
                lab = this._yapi.imm_atoi(this.imm_json_get_key(json, 'lab'))-1;
            } else {
                fab = -1;
                lab = -1;
            }
        }
        status.imm_init(tagId,  errCode,  errBlk,  fab, lab);
        retcode = await status.get_yapiError();
        if (!(retcode == this._yapi.SUCCESS)) {
            return this._throw(retcode,await status.get_errorMessage(),retcode);
        }
        return this._yapi.SUCCESS;
    }

    async reset()
    {
        /** @type {Uint8Array} **/
        let json;
        /** @type {YRfidStatus} **/
        let status;
        status = new YRfidStatus();

        json = await this._download('rfid.json?a=reset');
        return await this._chkerror('',  json, status);
    }

    /**
     * Returns the list of RFID tags currently detected by the reader.
     *
     * @return {Promise<string[]} a list of strings, corresponding to each tag identifier (UID).
     *
     * On failure, throws an exception or returns an empty list.
     */
    async get_tagIdList()
    {
        /** @type {Uint8Array} **/
        let json;
        /** @type {string[]} **/
        let jsonList = [];
        /** @type {string[]} **/
        let taglist = [];

        json = await this._download('rfid.json?a=list');
        taglist.length = 0;
        if ((json).length > 3) {
            jsonList = this.imm_json_get_array(json);
            for (let ii in jsonList) {
                taglist.push(this.imm_json_get_string(this._yapi.imm_str2bin(jsonList[ii])));
            }
        }
        return taglist;
    }

    /**
     * Retourne la description des propriétés d'un tag RFID présent.
     * Cette fonction peut causer des communications avec le tag.
     *
     * @param tagId {string} : identifier of the tag to check
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<YRfidTagInfo>} a YRfidTagInfo object.
     *
     * On failure, throws an exception or returns an empty YRfidTagInfo objact.
     * When it happens, you can get more information from the status object.
     */
    async get_tagInfo(tagId,status)
    {
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        /** @type {number} **/
        let tagType;
        /** @type {number} **/
        let size;
        /** @type {number} **/
        let usable;
        /** @type {number} **/
        let blksize;
        /** @type {number} **/
        let fblk;
        /** @type {number} **/
        let lblk;
        /** @type {YRfidTagInfo} **/
        let res;
        url = 'rfid.json?a=info&t='+tagId;

        json = await this._download(url);
        await this._chkerror(tagId,  json, status);
        tagType = this._yapi.imm_atoi(this.imm_json_get_key(json, 'type'));
        size = this._yapi.imm_atoi(this.imm_json_get_key(json, 'size'));
        usable = this._yapi.imm_atoi(this.imm_json_get_key(json, 'usable'));
        blksize = this._yapi.imm_atoi(this.imm_json_get_key(json, 'blksize'));
        fblk = this._yapi.imm_atoi(this.imm_json_get_key(json, 'fblk'));
        lblk = this._yapi.imm_atoi(this.imm_json_get_key(json, 'lblk'));
        res = new YRfidTagInfo();
        res.imm_init(tagId,  tagType,  size,  usable,  blksize,  fblk, lblk);
        return res;
    }

    /**
     * Change an RFID tag configuration to prevents any further write to
     * the selected blocks. This operation is definitive and irreversible.
     * Depending on the tag type and block index, adjascent blocks may become
     * read-only as well, based on the locking granularity.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : first block to lock
     * @param nBlocks {number} : number of blocks to lock
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagLockBlocks(tagId,firstBlock,nBlocks,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=lock&t='+tagId+'&b='+String(Math.round(firstBlock))+'&n='+String(Math.round(nBlocks))+''+optstr;

        json = await this._download(url);
        return await this._chkerror(tagId,  json, status);
    }

    /**
     * Reads the locked state for RFID tag memory data blocks.
     * FirstBlock cannot be a special block, and any special
     * block encountered in the middle of the read operation will be
     * skipped automatically.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : number of the first block to check
     * @param nBlocks {number} : number of blocks to check
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<boolean[]} a list of booleans with the lock state of selected blocks
     *
     * On failure, throws an exception or returns an empty list. When it
     * happens, you can get more information from the status object.
     */
    async get_tagLockState(tagId,firstBlock,nBlocks,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        /** @type {Uint8Array} **/
        let binRes;
        /** @type {boolean[]} **/
        let res = [];
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {boolean} **/
        let isLocked;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=chkl&t='+tagId+'&b='+String(Math.round(firstBlock))+'&n='+String(Math.round(nBlocks))+''+optstr;

        json = await this._download(url);
        await this._chkerror(tagId,  json, status);
        if (await status.get_yapiError() != this._yapi.SUCCESS) {
            return res;
        }
        binRes = this._yapi.imm_hexstr2bin(this.imm_json_get_key(json, 'bitmap'));
        idx = 0;
        while (idx < nBlocks) {
            val = binRes[((idx) >> (3))];
            isLocked = (((val) & (((1) << (((idx) & (7)))))) != 0);
            res.push(isLocked);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Tells which block of a RFID tag memory are special and cannot be used
     * to store user data. Mistakely writing a special block can lead to
     * an irreversible alteration of the tag.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : number of the first block to check
     * @param nBlocks {number} : number of blocks to check
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<boolean[]} a list of booleans with the lock state of selected blocks
     *
     * On failure, throws an exception or returns an empty list. When it
     * happens, you can get more information from the status object.
     */
    async get_tagSpecialBlocks(tagId,firstBlock,nBlocks,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        /** @type {Uint8Array} **/
        let binRes;
        /** @type {boolean[]} **/
        let res = [];
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let val;
        /** @type {boolean} **/
        let isLocked;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=chks&t='+tagId+'&b='+String(Math.round(firstBlock))+'&n='+String(Math.round(nBlocks))+''+optstr;

        json = await this._download(url);
        await this._chkerror(tagId,  json, status);
        if (await status.get_yapiError() != this._yapi.SUCCESS) {
            return res;
        }
        binRes = this._yapi.imm_hexstr2bin(this.imm_json_get_key(json, 'bitmap'));
        idx = 0;
        while (idx < nBlocks) {
            val = binRes[((idx) >> (3))];
            isLocked = (((val) & (((1) << (((idx) & (7)))))) != 0);
            res.push(isLocked);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from an RFID tag memory, as an hexadecimal string.
     * The read operation may span accross multiple blocks if the requested
     * number of bytes is larger than the RFID tag block size. By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use the EnableRawAccess
     * field from the options parameter.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : block number where read should start
     * @param nBytes {number} : total number of bytes to read
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<string>} an hexadecimal string if the call succeeds.
     *
     * On failure, throws an exception or returns an empty binary buffer. When it
     * happens, you can get more information from the status object.
     */
    async tagReadHex(tagId,firstBlock,nBytes,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        /** @type {string} **/
        let hexbuf;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=read&t='+tagId+'&b='+String(Math.round(firstBlock))+'&n='+String(Math.round(nBytes))+''+optstr;

        json = await this._download(url);
        await this._chkerror(tagId,  json, status);
        if (await status.get_yapiError() == this._yapi.SUCCESS) {
            hexbuf = this.imm_json_get_key(json, 'res');
        } else {
            hexbuf = '';
        }
        return hexbuf;
    }

    /**
     * Reads data from an RFID tag memory, as a binary buffer. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use the EnableRawAccess
     * field frrm the options parameter.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : block number where read should start
     * @param nBytes {number} : total number of bytes to read
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<Uint8Array>} a binary object with the data read if the call succeeds.
     *
     * On failure, throws an exception or returns an empty binary buffer. When it
     * happens, you can get more information from the status object.
     */
    async tagReadBin(tagId,firstBlock,nBytes,options,status)
    {
        return this._yapi.imm_hexstr2bin(await this.tagReadHex(tagId,  firstBlock,  nBytes,  options, status));
    }

    /**
     * Reads data from an RFID tag memory, as a byte list. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use the EnableRawAccess
     * field from the options parameter.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : block number where read should start
     * @param nBytes {number} : total number of bytes to read
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number[]} a byte list with the data read if the call succeeds.
     *
     * On failure, throws an exception or returns an empty list. When it
     * happens, you can get more information from the status object.
     */
    async tagReadArray(tagId,firstBlock,nBytes,options,status)
    {
        /** @type {Uint8Array} **/
        let blk;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let endidx;
        /** @type {number[]} **/
        let res = [];
        blk = await this.tagReadBin(tagId,  firstBlock,  nBytes,  options, status);
        endidx = (blk).length;
        idx = 0;
        while (idx < endidx) {
            res.push(blk[idx]);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from an RFID tag memory, as a text string. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use the EnableRawAccess
     * field from the options parameter.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : block number where read should start
     * @param nChars {number} : total number of characters to read
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<string>} a text string with the data read if the call succeeds.
     *
     * On failure, throws an exception or returns an empty string. When it
     * happens, you can get more information from the status object.
     */
    async tagReadStr(tagId,firstBlock,nChars,options,status)
    {
        return this._yapi.imm_bin2str(await this.tagReadBin(tagId,  firstBlock,  nChars,  options, status));
    }

    /**
     * Writes data provided as a binary buffer to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.  If you rather want
     * to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : block number where write should start
     * @param buff {Uint8Array} : the binary buffer to write
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagWriteBin(tagId,firstBlock,buff,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let hexstr;
        /** @type {number} **/
        let buflen;
        /** @type {string} **/
        let fname;
        /** @type {Uint8Array} **/
        let json;
        buflen = (buff).length;
        if (buflen <= 16) {
            // short data, use an URL-based command
            hexstr = this._yapi.imm_bin2hexstr(buff);
            return await this.tagWriteHex(tagId,  firstBlock,  hexstr,  options, status);
        } else {
            // long data, use an upload command
            optstr = options.imm_getParams();
            fname = 'Rfid:t='+tagId+'&b='+String(Math.round(firstBlock))+'&n='+String(Math.round(buflen))+''+optstr;
            json = await this._uploadEx(fname, buff);
            return await this._chkerror(tagId,  json, status);
        }
    }

    /**
     * Writes data provided as a list of bytes to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.
     * If you rather want to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : block number where write should start
     * @param byteList {number[]} : a list of byte to write
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagWriteArray(tagId,firstBlock,byteList,options,status)
    {
        /** @type {number} **/
        let bufflen;
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let hexb;
        bufflen = byteList.length;
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = byteList[idx];
            buff.set([hexb], idx);
            idx = idx + 1;
        }

        return await this.tagWriteBin(tagId,  firstBlock,  buff,  options, status);
    }

    /**
     * Writes data provided as an hexadecimal string to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.
     * If you rather want to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : block number where write should start
     * @param hexString {string} : a string of hexadecimal byte codes to write
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagWriteHex(tagId,firstBlock,hexString,options,status)
    {
        /** @type {number} **/
        let bufflen;
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let hexb;
        bufflen = (hexString).length;
        bufflen = ((bufflen) >> (1));
        if (bufflen <= 16) {
            // short data, use an URL-based command
            optstr = options.imm_getParams();
            url = 'rfid.json?a=writ&t='+tagId+'&b='+String(Math.round(firstBlock))+'&w='+hexString+''+optstr;
            json = await this._download(url);
            return await this._chkerror(tagId,  json, status);
        } else {
            // long data, use an upload command
            buff = new Uint8Array(bufflen);
            idx = 0;
            while (idx < bufflen) {
                hexb = parseInt((hexString).substr(2 * idx, 2), 16);
                buff.set([hexb], idx);
                idx = idx + 1;
            }
            return await this.tagWriteBin(tagId,  firstBlock,  buff,  options, status);
        }
    }

    /**
     * Writes data provided as an ASCII string to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * Note that only the characters présent  in  the provided string
     * will be written, there is no notion of string length. If your
     * string data have variable length, you'll have to encode the
     * string length yourself.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.
     * If you rather want to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param firstBlock {number} : block number where write should start
     * @param text {string} : the text string to write
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagWriteStr(tagId,firstBlock,text,options,status)
    {
        /** @type {Uint8Array} **/
        let buff;
        buff = this._yapi.imm_str2bin(text);

        return await this.tagWriteBin(tagId,  firstBlock,  buff,  options, status);
    }

    /**
     * Reads an RFID tag AFI byte (ISO 15693 only).
     *
     * @param tagId {string} : identifier of the tag to use
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} the AFI value (0...255)
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagGetAFI(tagId,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        /** @type {number} **/
        let res;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=rdsf&t='+tagId+'&b=0'+optstr;

        json = await this._download(url);
        await this._chkerror(tagId,  json, status);
        if (await status.get_yapiError() == this._yapi.SUCCESS) {
            res = this._yapi.imm_atoi(this.imm_json_get_key(json, 'res'));
        } else {
            res = await status.get_yapiError();
        }
        return res;
    }

    /**
     * Change an RFID tag AFI byte (ISO 15693 only).
     *
     * @param tagId {string} : identifier of the tag to use
     * @param afi {number} : the AFI value to write (0...255)
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagSetAFI(tagId,afi,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=wrsf&t='+tagId+'&b=0&v='+String(Math.round(afi))+''+optstr;

        json = await this._download(url);
        return await this._chkerror(tagId,  json, status);
    }

    /**
     * Locks the RFID tag AFI byte (ISO 15693 only).
     * This operation is definitive and irreversible.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagLockAFI(tagId,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=lksf&t='+tagId+'&b=0'+optstr;

        json = await this._download(url);
        return await this._chkerror(tagId,  json, status);
    }

    /**
     * Reads an RFID tag DSFID byte (ISO 15693 only).
     *
     * @param tagId {string} : identifier of the tag to use
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} the DSFID value (0...255)
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagGetDSFID(tagId,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        /** @type {number} **/
        let res;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=rdsf&t='+tagId+'&b=1'+optstr;

        json = await this._download(url);
        await this._chkerror(tagId,  json, status);
        if (await status.get_yapiError() == this._yapi.SUCCESS) {
            res = this._yapi.imm_atoi(this.imm_json_get_key(json, 'res'));
        } else {
            res = await status.get_yapiError();
        }
        return res;
    }

    /**
     * Change an RFID tag DSFID byte (ISO 15693 only).
     *
     * @param tagId {string} : identifier of the tag to use
     * @param dsfid {number} : the DSFID value to write (0...255)
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagSetDSFID(tagId,dsfid,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=wrsf&t='+tagId+'&b=1&v='+String(Math.round(dsfid))+''+optstr;

        json = await this._download(url);
        return await this._chkerror(tagId,  json, status);
    }

    /**
     * Locks the RFID tag DSFID byte (ISO 15693 only).
     * This operation is definitive and irreversible.
     *
     * @param tagId {string} : identifier of the tag to use
     * @param options {YRfidOptions} : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status {YRfidStatus} : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return {Promise<number>} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    async tagLockDSFID(tagId,options,status)
    {
        /** @type {string} **/
        let optstr;
        /** @type {string} **/
        let url;
        /** @type {Uint8Array} **/
        let json;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=lksf&t='+tagId+'&b=1'+optstr;

        json = await this._download(url);
        return await this._chkerror(tagId,  json, status);
    }

    /**
     * Returns a string with last tag arrival/removal events observed.
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

        content = await this._download('events.txt?pos=0');
        return this._yapi.imm_bin2str(content);
    }

    /**
     * Registers a callback function to be called each time that an RFID tag appears or
     * disappears. The callback is invoked only during the execution of
     * ySleep or yHandleEvents. This provides control over the time when
     * the callback is triggered. For good responsiveness, remember to call one of these
     * two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback {YRfidReader.EventCallback | null} : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YRfidReader object that emitted the event, the
     *         UTC timestamp of the event, a character string describing
     *         the type of event ("+" or "-") and a character string with the
     *         RFID tag identifier.
     *         On failure, throws an exception or returns a negative error code.
     */
    async registerEventCallback(callback)
    {
        this._eventCallback = callback;
        this._isFirstCb = true;
        if (callback != null) {
            await this.registerValueCallback(yInternalEventCallback);
        } else {
            await this.registerValueCallback(null);
        }
        return 0;
    }

    async _internalEventHandler(cbVal)
    {
        /** @type {number} **/
        let cbPos;
        /** @type {number} **/
        let cbDPos;
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
        let intStamp;
        /** @type {Uint8Array} **/
        let binMStamp;
        /** @type {number} **/
        let msStamp;
        /** @type {number} **/
        let evtStamp;
        /** @type {string} **/
        let evtType;
        /** @type {string} **/
        let evtData;
        // detect possible power cycle of the reader to clear event pointer
        cbPos = this._yapi.imm_atoi(cbVal);
        cbPos = parseInt((cbPos) / (1000), 10);
        cbDPos = ((cbPos - this._prevCbPos) & (0x7ffff));
        this._prevCbPos = cbPos;
        if (cbDPos > 16384) {
            this._eventPos = 0;
        }
        if (!(this._eventCallback != null)) {
            return this._yapi.SUCCESS;
        }
        if (this._isFirstCb) {
            // first emulated value callback caused by registerValueCallback:
            // retrieve arrivals of all tags currently present to emulate arrival
            this._isFirstCb = false;
            this._eventStamp = 0;
            content = await this._download('events.txt');
            contentStr = this._yapi.imm_bin2str(content);
            eventArr = (contentStr).split('\n');
            arrLen = eventArr.length;
            if (!(arrLen > 0)) {
                return this._throw(this._yapi.IO_ERROR,'fail to download events',this._yapi.IO_ERROR);
            }
            // first element of array is the new position preceeded by '@'
            arrPos = 1;
            lenStr = eventArr[0];
            lenStr = (lenStr).substr(1, (lenStr).length-1);
            // update processed event position pointer
            this._eventPos = this._yapi.imm_atoi(lenStr);
        } else {
            // load all events since previous call
            url = 'events.txt?pos='+String(Math.round(this._eventPos));
            content = await this._download(url);
            contentStr = this._yapi.imm_bin2str(content);
            eventArr = (contentStr).split('\n');
            arrLen = eventArr.length;
            if (!(arrLen > 0)) {
                return this._throw(this._yapi.IO_ERROR,'fail to download events',this._yapi.IO_ERROR);
            }
            // last element of array is the new position preceeded by '@'
            arrPos = 0;
            arrLen = arrLen - 1;
            lenStr = eventArr[arrLen];
            lenStr = (lenStr).substr(1, (lenStr).length-1);
            // update processed event position pointer
            this._eventPos = this._yapi.imm_atoi(lenStr);
        }
        // now generate callbacks for each real event
        while (arrPos < arrLen) {
            eventStr = eventArr[arrPos];
            eventLen = (eventStr).length;
            typePos = (eventStr).indexOf(':')+1;
            if ((eventLen >= 14) && (typePos > 10)) {
                hexStamp = (eventStr).substr(0, 8);
                intStamp = parseInt(hexStamp, 16);
                if (intStamp >= this._eventStamp) {
                    this._eventStamp = intStamp;
                    binMStamp = this._yapi.imm_str2bin((eventStr).substr(8, 2));
                    msStamp = (binMStamp[0]-64) * 32 + binMStamp[1];
                    evtStamp = intStamp + (0.001 * msStamp);
                    dataPos = (eventStr).indexOf('=')+1;
                    evtType = (eventStr).substr(typePos, 1);
                    evtData = '';
                    if (dataPos > 10) {
                        evtData = (eventStr).substr(dataPos, eventLen-dataPos);
                    }
                    if (this._eventCallback != null) {
                        try {
                            await this._eventCallback(this, evtStamp, evtType, evtData);
                        } catch (e) {
                            this._yapi.imm_log('Exception in eventCallback:', e);
                        }
                    }
                }
            }
            arrPos = arrPos + 1;
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Continues the enumeration of RFID readers started using yFirstRfidReader().
     * Caution: You can't make any assumption about the returned RFID readers order.
     * If you want to find a specific a RFID reader, use RfidReader.findRfidReader()
     * and a hardwareID or a logical name.
     *
     * @return {YRfidReader | null} a pointer to a YRfidReader object, corresponding to
     *         a RFID reader currently online, or a null pointer
     *         if there are no more RFID readers to enumerate.
     */
    nextRfidReader()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YRfidReader.FindRfidReaderInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of RFID readers currently accessible.
     * Use the method YRfidReader.nextRfidReader() to iterate on
     * next RFID readers.
     *
     * @return {YRfidReader | null} a pointer to a YRfidReader object, corresponding to
     *         the first RFID reader currently online, or a null pointer
     *         if there are none.
     */
    static FirstRfidReader()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('RfidReader');
        if(next_hwid == null) return null;
        return YRfidReader.FindRfidReader(next_hwid);
    }

    /**
     * Starts the enumeration of RFID readers currently accessible.
     * Use the method YRfidReader.nextRfidReader() to iterate on
     * next RFID readers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YRfidReader | null} a pointer to a YRfidReader object, corresponding to
     *         the first RFID reader currently online, or a null pointer
     *         if there are none.
     */
    static FirstRfidReaderInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('RfidReader');
        if(next_hwid == null) return null;
        return YRfidReader.FindRfidReaderInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            NTAGS_INVALID                : YAPI.INVALID_UINT,
            REFRESHRATE_INVALID          : YAPI.INVALID_UINT
        });
    }

    //--- (end of generated code: YRfidReader implementation)
}

//
// YRfidReaderProxy Class: synchronous proxy to YRfidReader objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YRfidReader objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YRfidReaderProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (generated code: YRfidReader accessors declaration)

    /**
     * Returns the number of RFID tags currently detected.
     *
     * @return an integer corresponding to the number of RFID tags currently detected
     *
     * On failure, throws an exception or returns YRfidReader.NTAGS_INVALID.
     */
    get_nTags()
    {
        return this.liveFunc._nTags;
    }

    /**
     * Returns the tag list refresh rate, measured in Hz.
     *
     * @return an integer corresponding to the tag list refresh rate, measured in Hz
     *
     * On failure, throws an exception or returns YRfidReader.REFRESHRATE_INVALID.
     */
    get_refreshRate()
    {
        return this.liveFunc._refreshRate;
    }

    /**
     * Changes the present tag list refresh rate, measured in Hz. The reader will do
     * its best to respect it. Note that the reader cannot detect tag arrival or removal
     * while it is  communicating with a tag.  Maximum frequency is limited to 100Hz,
     * but in real life it will be difficult to do better than 50Hz.  A zero value
     * will power off the device radio.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the present tag list refresh rate, measured in Hz
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

    reset()
    {
        this.liveFunc.reset();
        return YAPI_SUCCESS;
    }

    /**
     * Change an RFID tag configuration to prevents any further write to
     * the selected blocks. This operation is definitive and irreversible.
     * Depending on the tag type and block index, adjascent blocks may become
     * read-only as well, based on the locking granularity.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : first block to lock
     * @param nBlocks : number of blocks to lock
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagLockBlocks(tagId,firstBlock,nBlocks,options,status)
    {
        this.liveFunc.tagLockBlocks(tagId, firstBlock, nBlocks, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Writes data provided as a binary buffer to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.  If you rather want
     * to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param buff : the binary buffer to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagWriteBin(tagId,firstBlock,buff,options,status)
    {
        this.liveFunc.tagWriteBin(tagId, firstBlock, buff, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Writes data provided as a list of bytes to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.
     * If you rather want to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param byteList : a list of byte to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagWriteArray(tagId,firstBlock,byteList,options,status)
    {
        this.liveFunc.tagWriteArray(tagId, firstBlock, byteList, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Writes data provided as an hexadecimal string to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.
     * If you rather want to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param hexString : a string of hexadecimal byte codes to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagWriteHex(tagId,firstBlock,hexString,options,status)
    {
        this.liveFunc.tagWriteHex(tagId, firstBlock, hexString, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Writes data provided as an ASCII string to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * Note that only the characters présent  in  the provided string
     * will be written, there is no notion of string length. If your
     * string data have variable length, you'll have to encode the
     * string length yourself.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.
     * If you rather want to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param text : the text string to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagWriteStr(tagId,firstBlock,text,options,status)
    {
        this.liveFunc.tagWriteStr(tagId, firstBlock, text, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Reads an RFID tag AFI byte (ISO 15693 only).
     *
     * @param tagId : identifier of the tag to use
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return the AFI value (0...255)
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagGetAFI(tagId,options,status)
    {
        this.liveFunc.tagGetAFI(tagId, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Change an RFID tag AFI byte (ISO 15693 only).
     *
     * @param tagId : identifier of the tag to use
     * @param afi : the AFI value to write (0...255)
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagSetAFI(tagId,afi,options,status)
    {
        this.liveFunc.tagSetAFI(tagId, afi, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Locks the RFID tag AFI byte (ISO 15693 only).
     * This operation is definitive and irreversible.
     *
     * @param tagId : identifier of the tag to use
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagLockAFI(tagId,options,status)
    {
        this.liveFunc.tagLockAFI(tagId, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Reads an RFID tag DSFID byte (ISO 15693 only).
     *
     * @param tagId : identifier of the tag to use
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return the DSFID value (0...255)
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagGetDSFID(tagId,options,status)
    {
        this.liveFunc.tagGetDSFID(tagId, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Change an RFID tag DSFID byte (ISO 15693 only).
     *
     * @param tagId : identifier of the tag to use
     * @param dsfid : the DSFID value to write (0...255)
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagSetDSFID(tagId,dsfid,options,status)
    {
        this.liveFunc.tagSetDSFID(tagId, dsfid, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Locks the RFID tag DSFID byte (ISO 15693 only).
     * This operation is definitive and irreversible.
     *
     * @param tagId : identifier of the tag to use
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagLockDSFID(tagId,options,status)
    {
        this.liveFunc.tagLockDSFID(tagId, options, status);
        return YAPI_SUCCESS;
    }

    /**
     * Registers a callback function to be called each time that an RFID tag appears or
     * disappears. The callback is invoked only during the execution of
     * ySleep or yHandleEvents. This provides control over the time when
     * the callback is triggered. For good responsiveness, remember to call one of these
     * two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YRfidReader object that emitted the event, the
     *         UTC timestamp of the event, a character string describing
     *         the type of event ("+" or "-") and a character string with the
     *         RFID tag identifier.
     *         On failure, throws an exception or returns a negative error code.
     */
    registerEventCallback(callback)
    {
        this.liveFunc.registerEventCallback(callback);
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YRfidReader accessors declaration)
}

//--- (generated code: YRfidReader functions)

YoctoLibExport('YRfidReader', YRfidReader);
YoctoLibExport('YRfidReaderProxy', YRfidReaderProxy);
YRfidReader.imm_Init();

//--- (end of generated code: YRfidReader functions)

