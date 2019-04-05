/*********************************************************************
 *
 * $Id: yocto_messagebox.js 34661 2019-03-18 11:02:50Z seb $
 *
 * Implements the high-level API for MessageBox functions
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

//--- (generated code: YSms return codes)
//--- (end of generated code: YSms return codes)
//--- (generated code: YSms definitions)
//--- (end of generated code: YSms definitions)

//--- (generated code: YSms class start)
/**
 * YSms Class: SMS message sent or received
 *
 * YSms objects are used to describe a SMS.
 * These objects are used in particular in conjunction with the YMessageBox class.
 */
//--- (end of generated code: YSms class start)

class YSms
{
    constructor(obj_mbox)
    {
        //--- (generated code: YSms constructor)
        /** @member {YMessageBox} **/
        this._mbox                       = null;
        /** @member {number} **/
        this._slot                       = 0;
        /** @member {boolean} **/
        this._deliv                      = 0;
        /** @member {string} **/
        this._smsc                       = '';
        /** @member {number} **/
        this._mref                       = 0;
        /** @member {string} **/
        this._orig                       = '';
        /** @member {string} **/
        this._dest                       = '';
        /** @member {number} **/
        this._pid                        = 0;
        /** @member {number} **/
        this._alphab                     = 0;
        /** @member {number} **/
        this._mclass                     = 0;
        /** @member {string} **/
        this._stamp                      = '';
        /** @member {Uint8Array} **/
        this._udh                        = new Uint8Array(0);
        /** @member {Uint8Array} **/
        this._udata                      = new Uint8Array(0);
        /** @member {number} **/
        this._npdu                       = 0;
        /** @member {Uint8Array} **/
        this._pdu                        = new Uint8Array(0);
        /** @member {YSms[]} **/
        this._parts                      = [];
        /** @member {string} **/
        this._aggSig                     = '';
        /** @member {number} **/
        this._aggIdx                     = 0;
        /** @member {number} **/
        this._aggCnt                     = 0;
        //--- (end of generated code: YSms constructor)
        this._yapi = obj_mbox._yapi;
        this._mbox = obj_mbox;
    }

    //--- (generated code: YSms implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    async get_slot()
    {
        return this._slot;
    }

    async get_smsc()
    {
        return this._smsc;
    }

    async get_msgRef()
    {
        return this._mref;
    }

    async get_sender()
    {
        return this._orig;
    }

    async get_recipient()
    {
        return this._dest;
    }

    async get_protocolId()
    {
        return this._pid;
    }

    async isReceived()
    {
        return this._deliv;
    }

    async get_alphabet()
    {
        return this._alphab;
    }

    async get_msgClass()
    {
        if (((this._mclass) & (16)) == 0) {
            return -1;
        }
        return ((this._mclass) & (3));
    }

    async get_dcs()
    {
        return ((this._mclass) | ((((this._alphab) << (2)))));
    }

    async get_timestamp()
    {
        return this._stamp;
    }

    async get_userDataHeader()
    {
        return this._udh;
    }

    async get_userData()
    {
        return this._udata;
    }

    /**
     * Returns the content of the message.
     *
     * @return {string}  a string with the content of the message.
     */
    async get_textData()
    {
        /** @type {Uint8Array} **/
        let isolatin;
        /** @type {number} **/
        let isosize;
        /** @type {number} **/
        let i;
        if (this._alphab == 0) {
            // using GSM standard 7-bit alphabet
            return await this._mbox.gsm2str(this._udata);
        }
        if (this._alphab == 2) {
            // using UCS-2 alphabet
            isosize = (((this._udata).length) >> (1));
            isolatin = new Uint8Array(isosize);
            i = 0;
            while (i < isosize) {
                isolatin.set([this._udata[2*i+1]], i);
                i = i + 1;
            }
            return this._yapi.imm_bin2str(isolatin);
        }
        // default: convert 8 bit to string as-is
        return this._yapi.imm_bin2str(this._udata);
    }

    async get_unicodeData()
    {
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let unisize;
        /** @type {number} **/
        let unival;
        /** @type {number} **/
        let i;
        if (this._alphab == 0) {
            // using GSM standard 7-bit alphabet
            return await this._mbox.gsm2unicode(this._udata);
        }
        if (this._alphab == 2) {
            // using UCS-2 alphabet
            unisize = (((this._udata).length) >> (1));
            res.length = 0;
            i = 0;
            while (i < unisize) {
                unival = 256*this._udata[2*i]+this._udata[2*i+1];
                res.push(unival);
                i = i + 1;
            }
        } else {
            // return straight 8-bit values
            unisize = (this._udata).length;
            res.length = 0;
            i = 0;
            while (i < unisize) {
                res.push(this._udata[i]+0);
                i = i + 1;
            }
        }
        return res;
    }

    async get_partCount()
    {
        if (this._npdu == 0) {
            await this.generatePdu();
        }
        return this._npdu;
    }

    async get_pdu()
    {
        if (this._npdu == 0) {
            await this.generatePdu();
        }
        return this._pdu;
    }

    async get_parts()
    {
        if (this._npdu == 0) {
            await this.generatePdu();
        }
        return this._parts;
    }

    async get_concatSignature()
    {
        if (this._npdu == 0) {
            await this.generatePdu();
        }
        return this._aggSig;
    }

    async get_concatIndex()
    {
        if (this._npdu == 0) {
            await this.generatePdu();
        }
        return this._aggIdx;
    }

    async get_concatCount()
    {
        if (this._npdu == 0) {
            await this.generatePdu();
        }
        return this._aggCnt;
    }

    async set_slot(val)
    {
        this._slot = val;
        return this._yapi.SUCCESS;
    }

    async set_received(val)
    {
        this._deliv = val;
        return this._yapi.SUCCESS;
    }

    async set_smsc(val)
    {
        this._smsc = val;
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async set_msgRef(val)
    {
        this._mref = val;
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async set_sender(val)
    {
        this._orig = val;
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async set_recipient(val)
    {
        this._dest = val;
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async set_protocolId(val)
    {
        this._pid = val;
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async set_alphabet(val)
    {
        this._alphab = val;
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async set_msgClass(val)
    {
        if (val == -1) {
            this._mclass = 0;
        } else {
            this._mclass = 16+val;
        }
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async set_dcs(val)
    {
        this._alphab = (((((val) >> (2)))) & (3));
        this._mclass = ((val) & (16+3));
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async set_timestamp(val)
    {
        this._stamp = val;
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async set_userDataHeader(val)
    {
        this._udh = val;
        this._npdu = 0;
        await this.parseUserDataHeader();
        return this._yapi.SUCCESS;
    }

    async set_userData(val)
    {
        this._udata = val;
        this._npdu = 0;
        return this._yapi.SUCCESS;
    }

    async convertToUnicode()
    {
        /** @type {number[]} **/
        let ucs2 = [];
        /** @type {number} **/
        let udatalen;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let uni;
        if (this._alphab == 2) {
            return this._yapi.SUCCESS;
        }
        if (this._alphab == 0) {
            ucs2 = await this._mbox.gsm2unicode(this._udata);
        } else {
            udatalen = (this._udata).length;
            ucs2.length = 0;
            i = 0;
            while (i < udatalen) {
                uni = this._udata[i];
                ucs2.push(uni);
                i = i + 1;
            }
        }
        this._alphab = 2;
        this._udata = new Uint8Array(0);
        await this.addUnicodeData(ucs2);
        return this._yapi.SUCCESS;
    }

    /**
     * Add a regular text to the SMS. This function support messages
     * of more than 160 characters. ISO-latin accented characters
     * are supported. For messages with special unicode characters such as asian
     * characters and emoticons, use the  addUnicodeData method.
     *
     * @param val {string} : the text to be sent in the message
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     */
    async addText(val)
    {
        /** @type {Uint8Array} **/
        let udata;
        /** @type {number} **/
        let udatalen;
        /** @type {Uint8Array} **/
        let newdata;
        /** @type {number} **/
        let newdatalen;
        /** @type {number} **/
        let i;
        if ((val).length == 0) {
            return this._yapi.SUCCESS;
        }
        if (this._alphab == 0) {
            // Try to append using GSM 7-bit alphabet
            newdata = await this._mbox.str2gsm(val);
            newdatalen = (newdata).length;
            if (newdatalen == 0) {
                // 7-bit not possible, switch to unicode
                await this.convertToUnicode();
                newdata = this._yapi.imm_str2bin(val);
                newdatalen = (newdata).length;
            }
        } else {
            newdata = this._yapi.imm_str2bin(val);
            newdatalen = (newdata).length;
        }
        udatalen = (this._udata).length;
        if (this._alphab == 2) {
            // Append in unicode directly
            udata = new Uint8Array(udatalen + 2*newdatalen);
            i = 0;
            while (i < udatalen) {
                udata.set([this._udata[i]], i);
                i = i + 1;
            }
            i = 0;
            while (i < newdatalen) {
                udata.set([newdata[i]], udatalen+1);
                udatalen = udatalen + 2;
                i = i + 1;
            }
        } else {
            // Append binary buffers
            udata = new Uint8Array(udatalen+newdatalen);
            i = 0;
            while (i < udatalen) {
                udata.set([this._udata[i]], i);
                i = i + 1;
            }
            i = 0;
            while (i < newdatalen) {
                udata.set([newdata[i]], udatalen);
                udatalen = udatalen + 1;
                i = i + 1;
            }
        }
        return await this.set_userData(udata);
    }

    /**
     * Add a unicode text to the SMS. This function support messages
     * of more than 160 characters, using SMS concatenation.
     *
     * @param val {Integer[]} : an array of special unicode characters
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     */
    async addUnicodeData(val)
    {
        /** @type {number} **/
        let arrlen;
        /** @type {number} **/
        let newdatalen;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let uni;
        /** @type {Uint8Array} **/
        let udata;
        /** @type {number} **/
        let udatalen;
        /** @type {number} **/
        let surrogate;
        if (this._alphab != 2) {
            await this.convertToUnicode();
        }
        // compute number of 16-bit code units
        arrlen = val.length;
        newdatalen = arrlen;
        i = 0;
        while (i < arrlen) {
            uni = val[i];
            if (uni > 65535) {
                newdatalen = newdatalen + 1;
            }
            i = i + 1;
        }
        // now build utf-16 buffer
        udatalen = (this._udata).length;
        udata = new Uint8Array(udatalen+2*newdatalen);
        i = 0;
        while (i < udatalen) {
            udata.set([this._udata[i]], i);
            i = i + 1;
        }
        i = 0;
        while (i < arrlen) {
            uni = val[i];
            if (uni >= 65536) {
                surrogate = uni - 65536;
                uni = (((((surrogate) >> (10))) & (1023))) + 55296;
                udata.set([((uni) >> (8))], udatalen);
                udata.set([((uni) & (255))], udatalen+1);
                udatalen = udatalen + 2;
                uni = (((surrogate) & (1023))) + 56320;
            }
            udata.set([((uni) >> (8))], udatalen);
            udata.set([((uni) & (255))], udatalen+1);
            udatalen = udatalen + 2;
            i = i + 1;
        }
        return await this.set_userData(udata);
    }

    async set_pdu(pdu)
    {
        this._pdu = pdu;
        this._npdu = 1;
        return await this.parsePdu(pdu);
    }

    async set_parts(parts)
    {
        /** @type {YSms[]} **/
        let sorted = [];
        /** @type {number} **/
        let partno;
        /** @type {number} **/
        let initpartno;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let retcode;
        /** @type {number} **/
        let totsize;
        /** @type {YSms} **/
        let subsms;
        /** @type {Uint8Array} **/
        let subdata;
        /** @type {Uint8Array} **/
        let res;
        this._npdu = parts.length;
        if (this._npdu == 0) {
            return this._yapi.INVALID_ARGUMENT;
        }
        sorted.length = 0;
        partno = 0;
        while (partno < this._npdu) {
            initpartno = partno;
            i = 0;
            while (i < this._npdu) {
                subsms = parts[i];
                if (await subsms.get_concatIndex() == partno) {
                    sorted.push(subsms);
                    partno = partno + 1;
                }
                i = i + 1;
            }
            if (initpartno == partno) {
                partno = partno + 1;
            }
        }
        this._parts = sorted;
        this._npdu = sorted.length;
        // inherit header fields from first part
        subsms = this._parts[0];
        retcode = await this.parsePdu(await subsms.get_pdu());
        if (retcode != this._yapi.SUCCESS) {
            return retcode;
        }
        // concatenate user data from all parts
        totsize = 0;
        partno = 0;
        while (partno < this._parts.length) {
            subsms = this._parts[partno];
            subdata = await subsms.get_userData();
            totsize = totsize + (subdata).length;
            partno = partno + 1;
        }
        res = new Uint8Array(totsize);
        totsize = 0;
        partno = 0;
        while (partno < this._parts.length) {
            subsms = this._parts[partno];
            subdata = await subsms.get_userData();
            i = 0;
            while (i < (subdata).length) {
                res.set([subdata[i]], totsize);
                totsize = totsize + 1;
                i = i + 1;
            }
            partno = partno + 1;
        }
        this._udata = res;
        return this._yapi.SUCCESS;
    }

    async encodeAddress(addr)
    {
        /** @type {Uint8Array} **/
        let bytes;
        /** @type {number} **/
        let srclen;
        /** @type {number} **/
        let numlen;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let val;
        /** @type {number} **/
        let digit;
        /** @type {Uint8Array} **/
        let res;
        bytes = this._yapi.imm_str2bin(addr);
        srclen = (bytes).length;
        numlen = 0;
        i = 0;
        while (i < srclen) {
            val = bytes[i];
            if ((val >= 48) && (val < 58)) {
                numlen = numlen + 1;
            }
            i = i + 1;
        }
        if (numlen == 0) {
            res = new Uint8Array(1);
            res.set([0], 0);
            return res;
        }
        res = new Uint8Array(2+((numlen+1) >> (1)));
        res.set([numlen], 0);
        if (bytes[0] == 43) {
            res.set([145], 1);
        } else {
            res.set([129], 1);
        }
        numlen = 4;
        digit = 0;
        i = 0;
        while (i < srclen) {
            val = bytes[i];
            if ((val >= 48) && (val < 58)) {
                if (((numlen) & (1)) == 0) {
                    digit = val - 48;
                } else {
                    res.set([digit + 16*(val-48)], ((numlen) >> (1)));
                }
                numlen = numlen + 1;
            }
            i = i + 1;
        }
        // pad with F if needed
        if (((numlen) & (1)) != 0) {
            res.set([digit + 240], ((numlen) >> (1)));
        }
        return res;
    }

    async decodeAddress(addr,ofs,siz)
    {
        /** @type {number} **/
        let addrType;
        /** @type {Uint8Array} **/
        let gsm7;
        /** @type {string} **/
        let res;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let rpos;
        /** @type {number} **/
        let carry;
        /** @type {number} **/
        let nbits;
        /** @type {number} **/
        let byt;
        if (siz == 0) {
            return '';
        }
        res = '';
        addrType = ((addr[ofs]) & (112));
        if (addrType == 80) {
            // alphanumeric number
            siz = parseInt((4*siz) / (7), 10);
            gsm7 = new Uint8Array(siz);
            rpos = 1;
            carry = 0;
            nbits = 0;
            i = 0;
            while (i < siz) {
                if (nbits == 7) {
                    gsm7.set([carry], i);
                    carry = 0;
                    nbits = 0;
                } else {
                    byt = addr[ofs+rpos];
                    rpos = rpos + 1;
                    gsm7.set([((carry) | ((((((byt) << (nbits)))) & (127))))], i);
                    carry = ((byt) >> ((7 - nbits)));
                    nbits = nbits + 1;
                }
                i = i + 1;
            }
            return await this._mbox.gsm2str(gsm7);
        } else {
            // standard phone number
            if (addrType == 16) {
                res = '+';
            }
            siz = (((siz+1)) >> (1));
            i = 0;
            while (i < siz) {
                byt = addr[ofs+i+1];
                res = res+''+(((byt) & (15))).toString(16).toLowerCase()+''+(((byt) >> (4))).toString(16).toLowerCase();
                i = i + 1;
            }
            // remove padding digit if needed
            if (((addr[ofs+siz]) >> (4)) == 15) {
                res = (res).substr( 0, (res).length-1);
            }
            return res;
        }
    }

    async encodeTimeStamp(exp)
    {
        /** @type {number} **/
        let explen;
        /** @type {number} **/
        let i;
        /** @type {Uint8Array} **/
        let res;
        /** @type {number} **/
        let n;
        /** @type {Uint8Array} **/
        let expasc;
        /** @type {number} **/
        let v1;
        /** @type {number} **/
        let v2;
        explen = (exp).length;
        if (explen == 0) {
            res = new Uint8Array(0);
            return res;
        }
        if ((exp).substr(0, 1) == '+') {
            n = this._yapi.imm_atoi((exp).substr(1, explen-1));
            res = new Uint8Array(1);
            if (n > 30*86400) {
                n = 192+parseInt(((n+6*86400)) / ((7*86400)), 10);
            } else {
                if (n > 86400) {
                    n = 166+parseInt(((n+86399)) / (86400), 10);
                } else {
                    if (n > 43200) {
                        n = 143+parseInt(((n-43200+1799)) / (1800), 10);
                    } else {
                        n = -1+parseInt(((n+299)) / (300), 10);
                    }
                }
            }
            if (n < 0) {
                n = 0;
            }
            res.set([n], 0);
            return res;
        }
        if ((exp).substr(4, 1) == '-' || (exp).substr(4, 1) == '/') {
            // ignore century
            exp = (exp).substr( 2, explen-2);
            explen = (exp).length;
        }
        expasc = this._yapi.imm_str2bin(exp);
        res = new Uint8Array(7);
        n = 0;
        i = 0;
        while ((i+1 < explen) && (n < 7)) {
            v1 = expasc[i];
            if ((v1 >= 48) && (v1 < 58)) {
                v2 = expasc[i+1];
                if ((v2 >= 48) && (v2 < 58)) {
                    v1 = v1 - 48;
                    v2 = v2 - 48;
                    res.set([(((v2) << (4))) + v1], n);
                    n = n + 1;
                    i = i + 1;
                }
            }
            i = i + 1;
        }
        while (n < 7) {
            res.set([0], n);
            n = n + 1;
        }
        if (i+2 < explen) {
            // convert for timezone in cleartext ISO format +/-nn:nn
            v1 = expasc[i-3];
            v2 = expasc[i];
            if (((v1 == 43) || (v1 == 45)) && (v2 == 58)) {
                v1 = expasc[i+1];
                v2 = expasc[i+2];
                if ((v1 >= 48) && (v1 < 58) && (v1 >= 48) && (v1 < 58)) {
                    v1 = parseInt(((10*(v1 - 48)+(v2 - 48))) / (15), 10);
                    n = n - 1;
                    v2 = 4 * res[n] + v1;
                    if (expasc[i-3] == 45) {
                        v2 += 128;
                    }
                    res.set([v2], n);
                }
            }
        }
        return res;
    }

    async decodeTimeStamp(exp,ofs,siz)
    {
        /** @type {number} **/
        let n;
        /** @type {string} **/
        let res;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let byt;
        /** @type {string} **/
        let sign;
        /** @type {string} **/
        let hh;
        /** @type {string} **/
        let ss;
        if (siz < 1) {
            return '';
        }
        if (siz == 1) {
            n = exp[ofs];
            if (n < 144) {
                n = n * 300;
            } else {
                if (n < 168) {
                    n = (n-143) * 1800;
                } else {
                    if (n < 197) {
                        n = (n-166) * 86400;
                    } else {
                        n = (n-192) * 7 * 86400;
                    }
                }
            }
            return '+'+String(Math.round(n));
        }
        res = '20';
        i = 0;
        while ((i < siz) && (i < 6)) {
            byt = exp[ofs+i];
            res = res+''+(((byt) & (15))).toString(16).toLowerCase()+''+(((byt) >> (4))).toString(16).toLowerCase();
            if (i < 3) {
                if (i < 2) {
                    res = res+'-';
                } else {
                    res = res+' ';
                }
            } else {
                if (i < 5) {
                    res = res+':';
                }
            }
            i = i + 1;
        }
        if (siz == 7) {
            byt = exp[ofs+i];
            sign = '+';
            if (((byt) & (8)) != 0) {
                byt = byt - 8;
                sign = '-';
            }
            byt = (10*(((byt) & (15)))) + (((byt) >> (4)));
            hh = String(Math.round(((byt) >> (2))));
            ss = String(Math.round(15*(((byt) & (3)))));
            if ((hh).length<2) {
                hh = '0'+hh;
            }
            if ((ss).length<2) {
                ss = '0'+ss;
            }
            res = res+''+sign+''+hh+':'+ss;
        }
        return res;
    }

    async udataSize()
    {
        /** @type {number} **/
        let res;
        /** @type {number} **/
        let udhsize;
        udhsize = (this._udh).length;
        res = (this._udata).length;
        if (this._alphab == 0) {
            if (udhsize > 0) {
                res = res + parseInt(((8 + 8*udhsize + 6)) / (7), 10);
            }
            res = parseInt(((res * 7 + 7)) / (8), 10);
        } else {
            if (udhsize > 0) {
                res = res + 1 + udhsize;
            }
        }
        return res;
    }

    async encodeUserData()
    {
        /** @type {number} **/
        let udsize;
        /** @type {number} **/
        let udlen;
        /** @type {number} **/
        let udhsize;
        /** @type {number} **/
        let udhlen;
        /** @type {Uint8Array} **/
        let res;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let wpos;
        /** @type {number} **/
        let carry;
        /** @type {number} **/
        let nbits;
        /** @type {number} **/
        let thi_b;
        // nbits = number of bits in carry
        udsize = await this.udataSize();
        udhsize = (this._udh).length;
        udlen = (this._udata).length;
        res = new Uint8Array(1+udsize);
        udhlen = 0;
        nbits = 0;
        carry = 0;
        // 1. Encode UDL
        if (this._alphab == 0) {
            // 7-bit encoding
            if (udhsize > 0) {
                udhlen = parseInt(((8 + 8*udhsize + 6)) / (7), 10);
                nbits = 7*udhlen - 8 - 8*udhsize;
            }
            res.set([udhlen+udlen], 0);
        } else {
            // 8-bit encoding
            res.set([udsize], 0);
        }
        // 2. Encode UDHL and UDL
        wpos = 1;
        if (udhsize > 0) {
            res.set([udhsize], wpos);
            wpos = wpos + 1;
            i = 0;
            while (i < udhsize) {
                res.set([this._udh[i]], wpos);
                wpos = wpos + 1;
                i = i + 1;
            }
        }
        // 3. Encode UD
        if (this._alphab == 0) {
            // 7-bit encoding
            i = 0;
            while (i < udlen) {
                if (nbits == 0) {
                    carry = this._udata[i];
                    nbits = 7;
                } else {
                    thi_b = this._udata[i];
                    res.set([((carry) | ((((((thi_b) << (nbits)))) & (255))))], wpos);
                    wpos = wpos + 1;
                    nbits = nbits - 1;
                    carry = ((thi_b) >> ((7 - nbits)));
                }
                i = i + 1;
            }
            if (nbits > 0) {
                res.set([carry], wpos);
            }
        } else {
            // 8-bit encoding
            i = 0;
            while (i < udlen) {
                res.set([this._udata[i]], wpos);
                wpos = wpos + 1;
                i = i + 1;
            }
        }
        return res;
    }

    async generateParts()
    {
        /** @type {number} **/
        let udhsize;
        /** @type {number} **/
        let udlen;
        /** @type {number} **/
        let mss;
        /** @type {number} **/
        let partno;
        /** @type {number} **/
        let partlen;
        /** @type {Uint8Array} **/
        let newud;
        /** @type {Uint8Array} **/
        let newudh;
        /** @type {YSms} **/
        let newpdu;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let wpos;
        udhsize = (this._udh).length;
        udlen = (this._udata).length;
        mss = 140 - 1 - 5 - udhsize;
        if (this._alphab == 0) {
            mss = parseInt(((mss * 8 - 6)) / (7), 10);
        }
        this._npdu = parseInt(((udlen+mss-1)) / (mss), 10);
        this._parts.length = 0;
        partno = 0;
        wpos = 0;
        while (wpos < udlen) {
            partno = partno + 1;
            newudh = new Uint8Array(5+udhsize);
            newudh.set([0], 0);           // IEI: concatenated message
            newudh.set([3], 1);           // IEDL: 3 bytes
            newudh.set([this._mref], 2);
            newudh.set([this._npdu], 3);
            newudh.set([partno], 4);
            i = 0;
            while (i < udhsize) {
                newudh.set([this._udh[i]], 5+i);
                i = i + 1;
            }
            if (wpos+mss < udlen) {
                partlen = mss;
            } else {
                partlen = udlen-wpos;
            }
            newud = new Uint8Array(partlen);
            i = 0;
            while (i < partlen) {
                newud.set([this._udata[wpos]], i);
                wpos = wpos + 1;
                i = i + 1;
            }
            newpdu = new YSms(this._mbox);
            await newpdu.set_received(await this.isReceived());
            await newpdu.set_smsc(await this.get_smsc());
            await newpdu.set_msgRef(await this.get_msgRef());
            await newpdu.set_sender(await this.get_sender());
            await newpdu.set_recipient(await this.get_recipient());
            await newpdu.set_protocolId(await this.get_protocolId());
            await newpdu.set_dcs(await this.get_dcs());
            await newpdu.set_timestamp(await this.get_timestamp());
            await newpdu.set_userDataHeader(newudh);
            await newpdu.set_userData(newud);
            this._parts.push(newpdu);
        }
        return this._yapi.SUCCESS;
    }

    async generatePdu()
    {
        /** @type {Uint8Array} **/
        let sca;
        /** @type {Uint8Array} **/
        let hdr;
        /** @type {Uint8Array} **/
        let addr;
        /** @type {Uint8Array} **/
        let stamp;
        /** @type {Uint8Array} **/
        let udata;
        /** @type {number} **/
        let pdutyp;
        /** @type {number} **/
        let pdulen;
        /** @type {number} **/
        let i;
        // Determine if the message can fit within a single PDU
        this._parts.length = 0;
        if (await this.udataSize() > 140) {
            // multiple PDU are needed
            this._pdu = new Uint8Array(0);
            return await this.generateParts();
        }
        sca = await this.encodeAddress(this._smsc);
        if ((sca).length > 0) {
            sca.set([(sca).length-1], 0);
        }
        stamp = await this.encodeTimeStamp(this._stamp);
        udata = await this.encodeUserData();
        if (this._deliv) {
            addr = await this.encodeAddress(this._orig);
            hdr = new Uint8Array(1);
            pdutyp = 0;
        } else {
            addr = await this.encodeAddress(this._dest);
            this._mref = await this._mbox.nextMsgRef();
            hdr = new Uint8Array(2);
            hdr.set([this._mref], 1);
            pdutyp = 1;
            if ((stamp).length > 0) {
                pdutyp = pdutyp + 16;
            }
            if ((stamp).length == 7) {
                pdutyp = pdutyp + 8;
            }
        }
        if ((this._udh).length > 0) {
            pdutyp = pdutyp + 64;
        }
        hdr.set([pdutyp], 0);
        pdulen = (sca).length+(hdr).length+(addr).length+2+(stamp).length+(udata).length;
        this._pdu = new Uint8Array(pdulen);
        pdulen = 0;
        i = 0;
        while (i < (sca).length) {
            this._pdu.set([sca[i]], pdulen);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        i = 0;
        while (i < (hdr).length) {
            this._pdu.set([hdr[i]], pdulen);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        i = 0;
        while (i < (addr).length) {
            this._pdu.set([addr[i]], pdulen);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        this._pdu.set([this._pid], pdulen);
        pdulen = pdulen + 1;
        this._pdu.set([await this.get_dcs()], pdulen);
        pdulen = pdulen + 1;
        i = 0;
        while (i < (stamp).length) {
            this._pdu.set([stamp[i]], pdulen);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        i = 0;
        while (i < (udata).length) {
            this._pdu.set([udata[i]], pdulen);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        this._npdu = 1;
        return this._yapi.SUCCESS;
    }

    async parseUserDataHeader()
    {
        /** @type {number} **/
        let udhlen;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let iei;
        /** @type {number} **/
        let ielen;
        /** @type {string} **/
        let sig;
        this._aggSig = '';
        this._aggIdx = 0;
        this._aggCnt = 0;
        udhlen = (this._udh).length;
        i = 0;
        while (i+1 < udhlen) {
            iei = this._udh[i];
            ielen = this._udh[i+1];
            i = i + 2;
            if (i + ielen <= udhlen) {
                if ((iei == 0) && (ielen == 3)) {
                    // concatenated SMS, 8-bit ref
                    sig = this._orig+'-'+this._dest+'-'+('00'+(this._mref).toString(16)).slice(-2).toLowerCase()+'-'+('00'+(this._udh[i]).toString(16)).slice(-2).toLowerCase();
                    this._aggSig = sig;
                    this._aggCnt = this._udh[i+1];
                    this._aggIdx = this._udh[i+2];
                }
                if ((iei == 8) && (ielen == 4)) {
                    // concatenated SMS, 16-bit ref
                    sig = this._orig+'-'+this._dest+'-'+('00'+(this._mref).toString(16)).slice(-2).toLowerCase()+'-'+('00'+(this._udh[i]).toString(16)).slice(-2).toLowerCase()+''+('00'+(this._udh[i+1]).toString(16)).slice(-2).toLowerCase();
                    this._aggSig = sig;
                    this._aggCnt = this._udh[i+2];
                    this._aggIdx = this._udh[i+3];
                }
            }
            i = i + ielen;
        }
        return this._yapi.SUCCESS;
    }

    async parsePdu(pdu)
    {
        /** @type {number} **/
        let rpos;
        /** @type {number} **/
        let addrlen;
        /** @type {number} **/
        let pdutyp;
        /** @type {number} **/
        let tslen;
        /** @type {number} **/
        let dcs;
        /** @type {number} **/
        let udlen;
        /** @type {number} **/
        let udhsize;
        /** @type {number} **/
        let udhlen;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let carry;
        /** @type {number} **/
        let nbits;
        /** @type {number} **/
        let thi_b;
        this._pdu = pdu;
        this._npdu = 1;
        // parse meta-data
        this._smsc = await this.decodeAddress(pdu,  1, 2*(pdu[0]-1));
        rpos = 1+pdu[0];
        pdutyp = pdu[rpos];
        rpos = rpos + 1;
        this._deliv = (((pdutyp) & (3)) == 0);
        if (this._deliv) {
            addrlen = pdu[rpos];
            rpos = rpos + 1;
            this._orig = await this.decodeAddress(pdu,  rpos, addrlen);
            this._dest = '';
            tslen = 7;
        } else {
            this._mref = pdu[rpos];
            rpos = rpos + 1;
            addrlen = pdu[rpos];
            rpos = rpos + 1;
            this._dest = await this.decodeAddress(pdu,  rpos, addrlen);
            this._orig = '';
            if ((((pdutyp) & (16))) != 0) {
                if ((((pdutyp) & (8))) != 0) {
                    tslen = 7;
                } else {
                    tslen= 1;
                }
            } else {
                tslen = 0;
            }
        }
        rpos = rpos + ((((addrlen+3)) >> (1)));
        this._pid = pdu[rpos];
        rpos = rpos + 1;
        dcs = pdu[rpos];
        rpos = rpos + 1;
        this._alphab = (((((dcs) >> (2)))) & (3));
        this._mclass = ((dcs) & (16+3));
        this._stamp = await this.decodeTimeStamp(pdu,  rpos, tslen);
        rpos = rpos + tslen;
        // parse user data (including udh)
        nbits = 0;
        carry = 0;
        udlen = pdu[rpos];
        rpos = rpos + 1;
        if (((pdutyp) & (64)) != 0) {
            udhsize = pdu[rpos];
            rpos = rpos + 1;
            this._udh = new Uint8Array(udhsize);
            i = 0;
            while (i < udhsize) {
                this._udh.set([pdu[rpos]], i);
                rpos = rpos + 1;
                i = i + 1;
            }
            if (this._alphab == 0) {
                // 7-bit encoding
                udhlen = parseInt(((8 + 8*udhsize + 6)) / (7), 10);
                nbits = 7*udhlen - 8 - 8*udhsize;
                if (nbits > 0) {
                    thi_b = pdu[rpos];
                    rpos = rpos + 1;
                    carry = ((thi_b) >> (nbits));
                    nbits = 8 - nbits;
                }
            } else {
                // byte encoding
                udhlen = 1+udhsize;
            }
            udlen = udlen - udhlen;
        } else {
            udhsize = 0;
            this._udh = new Uint8Array(0);
        }
        this._udata = new Uint8Array(udlen);
        if (this._alphab == 0) {
            // 7-bit encoding
            i = 0;
            while (i < udlen) {
                if (nbits == 7) {
                    this._udata.set([carry], i);
                    carry = 0;
                    nbits = 0;
                } else {
                    thi_b = pdu[rpos];
                    rpos = rpos + 1;
                    this._udata.set([((carry) | ((((((thi_b) << (nbits)))) & (127))))], i);
                    carry = ((thi_b) >> ((7 - nbits)));
                    nbits = nbits + 1;
                }
                i = i + 1;
            }
        } else {
            // 8-bit encoding
            i = 0;
            while (i < udlen) {
                this._udata.set([pdu[rpos]], i);
                rpos = rpos + 1;
                i = i + 1;
            }
        }
        await this.parseUserDataHeader();
        return this._yapi.SUCCESS;
    }

    /**
     * Sends the SMS to the recipient. Messages of more than 160 characters are supported
     * using SMS concatenation.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async send()
    {
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let retcode;
        /** @type {YSms} **/
        let pdu;

        if (this._npdu == 0) {
            await this.generatePdu();
        }
        if (this._npdu == 1) {
            return await this._mbox._upload('sendSMS', this._pdu);
        }
        retcode = this._yapi.SUCCESS;
        i = 0;
        while ((i < this._npdu) && (retcode == this._yapi.SUCCESS)) {
            pdu = this._parts[i];
            retcode= await pdu.send();
            i = i + 1;
        }
        return retcode;
    }

    async deleteFromSIM()
    {
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let retcode;
        /** @type {YSms} **/
        let pdu;

        if (this._slot > 0) {
            return await this._mbox.clearSIMSlot(this._slot);
        }
        retcode = this._yapi.SUCCESS;
        i = 0;
        while ((i < this._npdu) && (retcode == this._yapi.SUCCESS)) {
            pdu = this._parts[i];
            retcode= await pdu.deleteFromSIM();
            i = i + 1;
        }
        return retcode;
    }

    //--- (end of generated code: YSms implementation)
}



//--- (generated code: YMessageBox return codes)
//--- (end of generated code: YMessageBox return codes)
//--- (generated code: YMessageBox definitions)
//--- (end of generated code: YMessageBox definitions)

//--- (generated code: YMessageBox class start)
/**
 * YMessageBox Class: MessageBox function interface
 *
 * YMessageBox functions provides SMS sending and receiving capability to
 * GSM-enabled Yoctopuce devices.
 */
//--- (end of generated code: YMessageBox class start)

class YMessageBox extends YFunction
{
    constructor(obj_yapi,str_func)
    {
        //--- (generated code: YMessageBox constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'MessageBox';
        /** @member {number} **/
        this._slotsInUse                 = YMessageBox.SLOTSINUSE_INVALID;
        /** @member {number} **/
        this._slotsCount                 = YMessageBox.SLOTSCOUNT_INVALID;
        /** @member {string} **/
        this._slotsBitmap                = YMessageBox.SLOTSBITMAP_INVALID;
        /** @member {number} **/
        this._pduSent                    = YMessageBox.PDUSENT_INVALID;
        /** @member {number} **/
        this._pduReceived                = YMessageBox.PDURECEIVED_INVALID;
        /** @member {string} **/
        this._command                    = YMessageBox.COMMAND_INVALID;
        /** @member {number} **/
        this._nextMsgRef                 = 0;
        /** @member {string} **/
        this._prevBitmapStr              = '';
        /** @member {YSms[]} **/
        this._pdus                       = [];
        /** @member {YSms[]} **/
        this._messages                   = [];
        /** @member {boolean} **/
        this._gsm2unicodeReady           = 0;
        /** @member {number[]} **/
        this._gsm2unicode                = [];
        /** @member {Uint8Array} **/
        this._iso2gsm                    = new Uint8Array(0);
        //--- (end of generated code: YMessageBox constructor)
    }

    //--- (generated code: YMessageBox implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'slotsInUse':
            this._slotsInUse = parseInt(val);
            return 1;
        case 'slotsCount':
            this._slotsCount = parseInt(val);
            return 1;
        case 'slotsBitmap':
            this._slotsBitmap = val;
            return 1;
        case 'pduSent':
            this._pduSent = parseInt(val);
            return 1;
        case 'pduReceived':
            this._pduReceived = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of message storage slots currently in use.
     *
     * @return {number} an integer corresponding to the number of message storage slots currently in use
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSINUSE_INVALID.
     */
    async get_slotsInUse()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMessageBox.SLOTSINUSE_INVALID;
            }
        }
        res = this._slotsInUse;
        return res;
    }

    /**
     * Returns the total number of message storage slots on the SIM card.
     *
     * @return {number} an integer corresponding to the total number of message storage slots on the SIM card
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSCOUNT_INVALID.
     */
    async get_slotsCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMessageBox.SLOTSCOUNT_INVALID;
            }
        }
        res = this._slotsCount;
        return res;
    }

    async get_slotsBitmap()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMessageBox.SLOTSBITMAP_INVALID;
            }
        }
        res = this._slotsBitmap;
        return res;
    }

    /**
     * Returns the number of SMS units sent so far.
     *
     * @return {number} an integer corresponding to the number of SMS units sent so far
     *
     * On failure, throws an exception or returns YMessageBox.PDUSENT_INVALID.
     */
    async get_pduSent()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMessageBox.PDUSENT_INVALID;
            }
        }
        res = this._pduSent;
        return res;
    }

    /**
     * Changes the value of the outgoing SMS units counter.
     *
     * @param newval {number} : an integer corresponding to the value of the outgoing SMS units counter
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_pduSent(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pduSent',rest_val);
    }

    /**
     * Returns the number of SMS units received so far.
     *
     * @return {number} an integer corresponding to the number of SMS units received so far
     *
     * On failure, throws an exception or returns YMessageBox.PDURECEIVED_INVALID.
     */
    async get_pduReceived()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMessageBox.PDURECEIVED_INVALID;
            }
        }
        res = this._pduReceived;
        return res;
    }

    /**
     * Changes the value of the incoming SMS units counter.
     *
     * @param newval {number} : an integer corresponding to the value of the incoming SMS units counter
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_pduReceived(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pduReceived',rest_val);
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMessageBox.COMMAND_INVALID;
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
     * Retrieves a MessageBox interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the MessageBox interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMessageBox.isOnline() to test if the MessageBox interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MessageBox interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func {string} : a string that uniquely characterizes the MessageBox interface
     *
     * @return {YMessageBox} a YMessageBox object allowing you to drive the MessageBox interface.
     */
    static FindMessageBox(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('MessageBox', func);
        if (obj == null) {
            obj = new YMessageBox(YAPI, func);
            YFunction._AddToCache('MessageBox',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a MessageBox interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the MessageBox interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMessageBox.isOnline() to test if the MessageBox interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MessageBox interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the MessageBox interface
     *
     * @return {YMessageBox} a YMessageBox object allowing you to drive the MessageBox interface.
     */
    static FindMessageBoxInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'MessageBox', func);
        if (obj == null) {
            obj = new YMessageBox(yctx, func);
            YFunction._AddToCache('MessageBox',  func, obj);
        }
        return obj;
    }

    async nextMsgRef()
    {
        this._nextMsgRef = this._nextMsgRef + 1;
        return this._nextMsgRef;
    }

    async clearSIMSlot(slot)
    {
        this._prevBitmapStr = '';
        return await this.set_command('DS'+String(Math.round(slot)));
    }

    async fetchPdu(slot)
    {
        /** @type {Uint8Array} **/
        let binPdu;
        /** @type {string[]} **/
        let arrPdu = [];
        /** @type {string} **/
        let hexPdu;
        /** @type {YSms} **/
        let sms;

        binPdu = await this._download('sms.json?pos='+String(Math.round(slot))+'&len=1');
        arrPdu = this.imm_json_get_array(binPdu);
        hexPdu = this.imm_decode_json_string(arrPdu[0]);
        sms = new YSms(this);
        await sms.set_slot(slot);
        await sms.parsePdu(this._yapi.imm_hexstr2bin(hexPdu));
        return sms;
    }

    async initGsm2Unicode()
    {
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let uni;
        this._gsm2unicode.length = 0;
        // 00-07
        this._gsm2unicode.push(64);
        this._gsm2unicode.push(163);
        this._gsm2unicode.push(36);
        this._gsm2unicode.push(165);
        this._gsm2unicode.push(232);
        this._gsm2unicode.push(233);
        this._gsm2unicode.push(249);
        this._gsm2unicode.push(236);
        // 08-0F
        this._gsm2unicode.push(242);
        this._gsm2unicode.push(199);
        this._gsm2unicode.push(10);
        this._gsm2unicode.push(216);
        this._gsm2unicode.push(248);
        this._gsm2unicode.push(13);
        this._gsm2unicode.push(197);
        this._gsm2unicode.push(229);
        // 10-17
        this._gsm2unicode.push(916);
        this._gsm2unicode.push(95);
        this._gsm2unicode.push(934);
        this._gsm2unicode.push(915);
        this._gsm2unicode.push(923);
        this._gsm2unicode.push(937);
        this._gsm2unicode.push(928);
        this._gsm2unicode.push(936);
        // 18-1F
        this._gsm2unicode.push(931);
        this._gsm2unicode.push(920);
        this._gsm2unicode.push(926);
        this._gsm2unicode.push(27);
        this._gsm2unicode.push(198);
        this._gsm2unicode.push(230);
        this._gsm2unicode.push(223);
        this._gsm2unicode.push(201);
        // 20-7A
        i = 32;
        while (i <= 122) {
            this._gsm2unicode.push(i);
            i = i + 1;
        }
        // exceptions in range 20-7A
        this._gsm2unicode[36] = 164;
        this._gsm2unicode[64] = 161;
        this._gsm2unicode[91] = 196;
        this._gsm2unicode[92] = 214;
        this._gsm2unicode[93] = 209;
        this._gsm2unicode[94] = 220;
        this._gsm2unicode[95] = 167;
        this._gsm2unicode[96] = 191;
        // 7B-7F
        this._gsm2unicode.push(228);
        this._gsm2unicode.push(246);
        this._gsm2unicode.push(241);
        this._gsm2unicode.push(252);
        this._gsm2unicode.push(224);
        // Invert table as well wherever possible
        this._iso2gsm = new Uint8Array(256);
        i = 0;
        while (i <= 127) {
            uni = this._gsm2unicode[i];
            if (uni <= 255) {
                this._iso2gsm.set([i], uni);
            }
            i = i + 1;
        }
        i = 0;
        while (i < 4) {
            // mark escape sequences
            this._iso2gsm.set([27], 91+i);
            this._iso2gsm.set([27], 123+i);
            i = i + 1;
        }
        // Done
        this._gsm2unicodeReady = true;
        return this._yapi.SUCCESS;
    }

    async gsm2unicode(gsm)
    {
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let gsmlen;
        /** @type {number} **/
        let reslen;
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let uni;
        if (!(this._gsm2unicodeReady)) {
            await this.initGsm2Unicode();
        }
        gsmlen = (gsm).length;
        reslen = gsmlen;
        i = 0;
        while (i < gsmlen) {
            if (gsm[i] == 27) {
                reslen = reslen - 1;
            }
            i = i + 1;
        }
        res.length = 0;
        i = 0;
        while (i < gsmlen) {
            uni = this._gsm2unicode[gsm[i]];
            if ((uni == 27) && (i+1 < gsmlen)) {
                i = i + 1;
                uni = gsm[i];
                if (uni < 60) {
                    if (uni < 41) {
                        if (uni==20) {
                            uni=94;
                        } else {
                            if (uni==40) {
                                uni=123;
                            } else {
                                uni=0;
                            }
                        }
                    } else {
                        if (uni==41) {
                            uni=125;
                        } else {
                            if (uni==47) {
                                uni=92;
                            } else {
                                uni=0;
                            }
                        }
                    }
                } else {
                    if (uni < 62) {
                        if (uni==60) {
                            uni=91;
                        } else {
                            if (uni==61) {
                                uni=126;
                            } else {
                                uni=0;
                            }
                        }
                    } else {
                        if (uni==62) {
                            uni=93;
                        } else {
                            if (uni==64) {
                                uni=124;
                            } else {
                                if (uni==101) {
                                    uni=164;
                                } else {
                                    uni=0;
                                }
                            }
                        }
                    }
                }
            }
            if (uni > 0) {
                res.push(uni);
            }
            i = i + 1;
        }
        return res;
    }

    async gsm2str(gsm)
    {
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let gsmlen;
        /** @type {number} **/
        let reslen;
        /** @type {Uint8Array} **/
        let resbin;
        /** @type {string} **/
        let resstr;
        /** @type {number} **/
        let uni;
        if (!(this._gsm2unicodeReady)) {
            await this.initGsm2Unicode();
        }
        gsmlen = (gsm).length;
        reslen = gsmlen;
        i = 0;
        while (i < gsmlen) {
            if (gsm[i] == 27) {
                reslen = reslen - 1;
            }
            i = i + 1;
        }
        resbin = new Uint8Array(reslen);
        i = 0;
        reslen = 0;
        while (i < gsmlen) {
            uni = this._gsm2unicode[gsm[i]];
            if ((uni == 27) && (i+1 < gsmlen)) {
                i = i + 1;
                uni = gsm[i];
                if (uni < 60) {
                    if (uni < 41) {
                        if (uni==20) {
                            uni=94;
                        } else {
                            if (uni==40) {
                                uni=123;
                            } else {
                                uni=0;
                            }
                        }
                    } else {
                        if (uni==41) {
                            uni=125;
                        } else {
                            if (uni==47) {
                                uni=92;
                            } else {
                                uni=0;
                            }
                        }
                    }
                } else {
                    if (uni < 62) {
                        if (uni==60) {
                            uni=91;
                        } else {
                            if (uni==61) {
                                uni=126;
                            } else {
                                uni=0;
                            }
                        }
                    } else {
                        if (uni==62) {
                            uni=93;
                        } else {
                            if (uni==64) {
                                uni=124;
                            } else {
                                if (uni==101) {
                                    uni=164;
                                } else {
                                    uni=0;
                                }
                            }
                        }
                    }
                }
            }
            if ((uni > 0) && (uni < 256)) {
                resbin.set([uni], reslen);
                reslen = reslen + 1;
            }
            i = i + 1;
        }
        resstr = this._yapi.imm_bin2str(resbin);
        if ((resstr).length > reslen) {
            resstr = (resstr).substr(0, reslen);
        }
        return resstr;
    }

    async str2gsm(msg)
    {
        /** @type {Uint8Array} **/
        let asc;
        /** @type {number} **/
        let asclen;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let ch;
        /** @type {number} **/
        let gsm7;
        /** @type {number} **/
        let extra;
        /** @type {Uint8Array} **/
        let res;
        /** @type {number} **/
        let wpos;
        if (!(this._gsm2unicodeReady)) {
            await this.initGsm2Unicode();
        }
        asc = this._yapi.imm_str2bin(msg);
        asclen = (asc).length;
        extra = 0;
        i = 0;
        while (i < asclen) {
            ch = asc[i];
            gsm7 = this._iso2gsm[ch];
            if (gsm7 == 27) {
                extra = extra + 1;
            }
            if (gsm7 == 0) {
                // cannot use standard GSM encoding
                res = new Uint8Array(0);
                return res;
            }
            i = i + 1;
        }
        res = new Uint8Array(asclen+extra);
        wpos = 0;
        i = 0;
        while (i < asclen) {
            ch = asc[i];
            gsm7 = this._iso2gsm[ch];
            res.set([gsm7], wpos);
            wpos = wpos + 1;
            if (gsm7 == 27) {
                if (ch < 100) {
                    if (ch<93) {
                        if (ch<92) {
                            gsm7=60;
                        } else {
                            gsm7=47;
                        }
                    } else {
                        if (ch<94) {
                            gsm7=62;
                        } else {
                            gsm7=20;
                        }
                    }
                } else {
                    if (ch<125) {
                        if (ch<124) {
                            gsm7=40;
                        } else {
                            gsm7=64;
                        }
                    } else {
                        if (ch<126) {
                            gsm7=41;
                        } else {
                            gsm7=61;
                        }
                    }
                }
                res.set([gsm7], wpos);
                wpos = wpos + 1;
            }
            i = i + 1;
        }
        return res;
    }

    async checkNewMessages()
    {
        /** @type {string} **/
        let bitmapStr;
        /** @type {Uint8Array} **/
        let prevBitmap;
        /** @type {Uint8Array} **/
        let newBitmap;
        /** @type {number} **/
        let slot;
        /** @type {number} **/
        let nslots;
        /** @type {number} **/
        let pduIdx;
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let bitVal;
        /** @type {number} **/
        let prevBit;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let nsig;
        /** @type {number} **/
        let cnt;
        /** @type {string} **/
        let sig;
        /** @type {YSms[]} **/
        let newArr = [];
        /** @type {YSms[]} **/
        let newMsg = [];
        /** @type {YSms[]} **/
        let newAgg = [];
        /** @type {string[]} **/
        let signatures = [];
        /** @type {YSms} **/
        let sms;

        bitmapStr = await this.get_slotsBitmap();
        if (bitmapStr == this._prevBitmapStr) {
            return this._yapi.SUCCESS;
        }
        prevBitmap = this._yapi.imm_hexstr2bin(this._prevBitmapStr);
        newBitmap = this._yapi.imm_hexstr2bin(bitmapStr);
        this._prevBitmapStr = bitmapStr;
        nslots = 8*(newBitmap).length;
        newArr.length = 0;
        newMsg.length = 0;
        signatures.length = 0;
        nsig = 0;
        // copy known messages
        pduIdx = 0;
        while (pduIdx < this._pdus.length) {
            sms = this._pdus[pduIdx];
            slot = await sms.get_slot();
            idx = ((slot) >> (3));
            if (idx < (newBitmap).length) {
                bitVal = ((1) << ((((slot) & (7)))));
                if ((((newBitmap[idx]) & (bitVal))) != 0) {
                    newArr.push(sms);
                    if (await sms.get_concatCount() == 0) {
                        newMsg.push(sms);
                    } else {
                        sig = await sms.get_concatSignature();
                        i = 0;
                        while ((i < nsig) && ((sig).length > 0)) {
                            if (signatures[i] == sig) {
                                sig = '';
                            }
                            i = i + 1;
                        }
                        if ((sig).length > 0) {
                            signatures.push(sig);
                            nsig = nsig + 1;
                        }
                    }
                }
            }
            pduIdx = pduIdx + 1;
        }
        // receive new messages
        slot = 0;
        while (slot < nslots) {
            idx = ((slot) >> (3));
            bitVal = ((1) << ((((slot) & (7)))));
            prevBit = 0;
            if (idx < (prevBitmap).length) {
                prevBit = ((prevBitmap[idx]) & (bitVal));
            }
            if ((((newBitmap[idx]) & (bitVal))) != 0) {
                if (prevBit == 0) {
                    sms = await this.fetchPdu(slot);
                    newArr.push(sms);
                    if (await sms.get_concatCount() == 0) {
                        newMsg.push(sms);
                    } else {
                        sig = await sms.get_concatSignature();
                        i = 0;
                        while ((i < nsig) && ((sig).length > 0)) {
                            if (signatures[i] == sig) {
                                sig = '';
                            }
                            i = i + 1;
                        }
                        if ((sig).length > 0) {
                            signatures.push(sig);
                            nsig = nsig + 1;
                        }
                    }
                }
            }
            slot = slot + 1;
        }
        this._pdus = newArr;
        // append complete concatenated messages
        i = 0;
        while (i < nsig) {
            sig = signatures[i];
            cnt = 0;
            pduIdx = 0;
            while (pduIdx < this._pdus.length) {
                sms = this._pdus[pduIdx];
                if (await sms.get_concatCount() > 0) {
                    if (await sms.get_concatSignature() == sig) {
                        if (cnt == 0) {
                            cnt = await sms.get_concatCount();
                            newAgg.length = 0;
                        }
                        newAgg.push(sms);
                    }
                }
                pduIdx = pduIdx + 1;
            }
            if ((cnt > 0) && (newAgg.length == cnt)) {
                sms = new YSms(this);
                await sms.set_parts(newAgg);
                newMsg.push(sms);
            }
            i = i + 1;
        }
        this._messages = newMsg;
        return this._yapi.SUCCESS;
    }

    async get_pdus()
    {
        await this.checkNewMessages();
        return this._pdus;
    }

    /**
     * Clear the SMS units counters.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clearPduCounters()
    {
        /** @type {number} **/
        let retcode;

        retcode = await this.set_pduReceived(0);
        if (retcode != this._yapi.SUCCESS) {
            return retcode;
        }
        retcode = await this.set_pduSent(0);
        return retcode;
    }

    /**
     * Sends a regular text SMS, with standard parameters. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText and addUnicodeData.
     *
     * @param recipient {string} : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message {string} : the text to be sent in the message
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async sendTextMessage(recipient,message)
    {
        /** @type {YSms} **/
        let sms;

        sms = new YSms(this);
        await sms.set_recipient(recipient);
        await sms.addText(message);
        return await sms.send();
    }

    /**
     * Sends a Flash SMS (class 0 message). Flash messages are displayed on the handset
     * immediately and are usually not saved on the SIM card. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText et addUnicodeData.
     *
     * @param recipient {string} : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message {string} : the text to be sent in the message
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async sendFlashMessage(recipient,message)
    {
        /** @type {YSms} **/
        let sms;

        sms = new YSms(this);
        await sms.set_recipient(recipient);
        await sms.set_msgClass(0);
        await sms.addText(message);
        return await sms.send();
    }

    /**
     * Creates a new empty SMS message, to be configured and sent later on.
     *
     * @param recipient {string} : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     *
     * @return {YSms} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async newMessage(recipient)
    {
        /** @type {YSms} **/
        let sms;
        sms = new YSms(this);
        await sms.set_recipient(recipient);
        return sms;
    }

    /**
     * Returns the list of messages received and not deleted. This function
     * will automatically decode concatenated SMS.
     *
     * @return {YSms[]} an YSms object list.
     *
     * On failure, throws an exception or returns an empty list.
     */
    async get_messages()
    {
        await this.checkNewMessages();
        return this._messages;
    }

    /**
     * Continues the enumeration of MessageBox interfaces started using yFirstMessageBox().
     * Caution: You can't make any assumption about the returned MessageBox interfaces order.
     * If you want to find a specific a MessageBox interface, use MessageBox.findMessageBox()
     * and a hardwareID or a logical name.
     *
     * @return {YMessageBox} a pointer to a YMessageBox object, corresponding to
     *         a MessageBox interface currently online, or a null pointer
     *         if there are no more MessageBox interfaces to enumerate.
     */
    nextMessageBox()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMessageBox.FindMessageBoxInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of MessageBox interfaces currently accessible.
     * Use the method YMessageBox.nextMessageBox() to iterate on
     * next MessageBox interfaces.
     *
     * @return {YMessageBox} a pointer to a YMessageBox object, corresponding to
     *         the first MessageBox interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstMessageBox()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('MessageBox');
        if(next_hwid == null) return null;
        return YMessageBox.FindMessageBox(next_hwid);
    }

    /**
     * Starts the enumeration of MessageBox interfaces currently accessible.
     * Use the method YMessageBox.nextMessageBox() to iterate on
     * next MessageBox interfaces.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMessageBox} a pointer to a YMessageBox object, corresponding to
     *         the first MessageBox interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstMessageBoxInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('MessageBox');
        if(next_hwid == null) return null;
        return YMessageBox.FindMessageBoxInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            SLOTSINUSE_INVALID           : YAPI.INVALID_UINT,
            SLOTSCOUNT_INVALID           : YAPI.INVALID_UINT,
            SLOTSBITMAP_INVALID          : YAPI.INVALID_STRING,
            PDUSENT_INVALID              : YAPI.INVALID_UINT,
            PDURECEIVED_INVALID          : YAPI.INVALID_UINT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
    }

    //--- (end of generated code: YMessageBox implementation)
}

//
// YMessageBoxProxy Class: synchronous proxy to YMessageBox objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YMessageBox objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YMessageBoxProxy extends YFunctionProxy
{
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (generated code: YMessageBox accessors declaration)

    /**
     * Returns the number of message storage slots currently in use.
     *
     * @return an integer corresponding to the number of message storage slots currently in use
     *
     * On failure, throws an exception or returns Y_SLOTSINUSE_INVALID.
     */
    get_slotsInUse()
    {
        return this.liveFunc._slotsInUse;
    }

    /**
     * Returns the total number of message storage slots on the SIM card.
     *
     * @return an integer corresponding to the total number of message storage slots on the SIM card
     *
     * On failure, throws an exception or returns Y_SLOTSCOUNT_INVALID.
     */
    get_slotsCount()
    {
        return this.liveFunc._slotsCount;
    }

    get_slotsBitmap()
    {
        return this.liveFunc._slotsBitmap;
    }

    /**
     * Returns the number of SMS units sent so far.
     *
     * @return an integer corresponding to the number of SMS units sent so far
     *
     * On failure, throws an exception or returns Y_PDUSENT_INVALID.
     */
    get_pduSent()
    {
        return this.liveFunc._pduSent;
    }

    /**
     * Changes the value of the outgoing SMS units counter.
     *
     * @param newval : an integer corresponding to the value of the outgoing SMS units counter
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pduSent(newval)
    {
        this.liveFunc.set_pduSent(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the number of SMS units received so far.
     *
     * @return an integer corresponding to the number of SMS units received so far
     *
     * On failure, throws an exception or returns Y_PDURECEIVED_INVALID.
     */
    get_pduReceived()
    {
        return this.liveFunc._pduReceived;
    }

    /**
     * Changes the value of the incoming SMS units counter.
     *
     * @param newval : an integer corresponding to the value of the incoming SMS units counter
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pduReceived(newval)
    {
        this.liveFunc.set_pduReceived(newval);
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

    nextMsgRef()
    {
        this.liveFunc.nextMsgRef();
        return YAPI_SUCCESS;
    }

    clearSIMSlot(slot)
    {
        this.liveFunc.clearSIMSlot(slot);
        return YAPI_SUCCESS;
    }

    initGsm2Unicode()
    {
        this.liveFunc.initGsm2Unicode();
        return YAPI_SUCCESS;
    }

    checkNewMessages()
    {
        this.liveFunc.checkNewMessages();
        return YAPI_SUCCESS;
    }

    /**
     * Clear the SMS units counters.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clearPduCounters()
    {
        this.liveFunc.clearPduCounters();
        return YAPI_SUCCESS;
    }

    /**
     * Sends a regular text SMS, with standard parameters. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText and addUnicodeData.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message : the text to be sent in the message
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendTextMessage(recipient,message)
    {
        this.liveFunc.sendTextMessage(recipient, message);
        return YAPI_SUCCESS;
    }

    /**
     * Sends a Flash SMS (class 0 message). Flash messages are displayed on the handset
     * immediately and are usually not saved on the SIM card. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText et addUnicodeData.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message : the text to be sent in the message
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendFlashMessage(recipient,message)
    {
        this.liveFunc.sendFlashMessage(recipient, message);
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YMessageBox accessors declaration)
}

//--- (generated code: YSms functions)

YoctoLibExport('YSms', YSms);
YSms.imm_Init();

//--- (end of generated code: YSms functions)

//--- (generated code: YMessageBox functions)

YoctoLibExport('YMessageBox', YMessageBox);
YoctoLibExport('YMessageBoxProxy', YMessageBoxProxy);
YMessageBox.imm_Init();

//--- (end of generated code: YMessageBox functions)
