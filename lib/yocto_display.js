/*********************************************************************
 *
 * $Id: yocto_display.js 75525 2026-08-14 08:04:04Z mvuilleu $
 *
 * Implements yFindDisplay(), the high-level API for Display functions
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

//--- (generated code: YDisplay definitions)
//--- (end of generated code: YDisplay definitions)

//--- (generated code: YDisplayLayer definitions)
//--- (end of generated code: YDisplayLayer definitions)

//--- (generated code: YDisplayLayer class start)
/**
 * YDisplayLayer Class: Interface for drawing into display layers, obtained by calling display.get_displayLayer.
 *
 * Each DisplayLayer represents an image layer containing objects
 * to display (bitmaps, text, etc.). The content is displayed only when
 * the layer is active on the screen (and not masked by other
 * overlapping layers).
 */
//--- (end of generated code: YDisplayLayer class start)

class YDisplayLayer
{
    constructor(obj_parent, str_id)
    {
        this._yapi         = obj_parent._yapi;
        this._display      = obj_parent;
        this._id           = str_id;
        this._cmdbuff      = '';
        this._hidden       = false;
        //--- (generated code: YDisplayLayer constructor)
        /** @member {number} **/
        this.NO_INK                      = -1;
        /** @member {number} **/
        this.BG_INK                      = -2;
        /** @member {number} **/
        this.FG_INK                      = -3;
        /** @member {number} **/
        this.ALIGN_TOP_LEFT              = 0;
        /** @member {number} **/
        this.ALIGN_CENTER_LEFT           = 1;
        /** @member {number} **/
        this.ALIGN_BASELINE_LEFT         = 2;
        /** @member {number} **/
        this.ALIGN_BOTTOM_LEFT           = 3;
        /** @member {number} **/
        this.ALIGN_TOP_CENTER            = 4;
        /** @member {number} **/
        this.ALIGN_CENTER                = 5;
        /** @member {number} **/
        this.ALIGN_BASELINE_CENTER       = 6;
        /** @member {number} **/
        this.ALIGN_BOTTOM_CENTER         = 7;
        /** @member {number} **/
        this.ALIGN_TOP_DECIMAL           = 8;
        /** @member {number} **/
        this.ALIGN_CENTER_DECIMAL        = 9;
        /** @member {number} **/
        this.ALIGN_BASELINE_DECIMAL      = 10;
        /** @member {number} **/
        this.ALIGN_BOTTOM_DECIMAL        = 11;
        /** @member {number} **/
        this.ALIGN_TOP_RIGHT             = 12;
        /** @member {number} **/
        this.ALIGN_CENTER_RIGHT          = 13;
        /** @member {number} **/
        this.ALIGN_BASELINE_RIGHT        = 14;
        /** @member {number} **/
        this.ALIGN_BOTTOM_RIGHT          = 15;
        /** @member {string} **/
        this._cmdbuff                    = '';
        /** @member {boolean} **/
        this._hidden                     = false;
        /** @member {number} **/
        this._polyPrevX                  = 0;
        /** @member {number} **/
        this._polyPrevY                  = 0;
        //--- (end of generated code: YDisplayLayer constructor)
    }

    // internal function to flush any pending command for this layer
    imm_must_be_flushed()
    {
        return (this._cmdbuff != '');
    }

    imm_resetHiddenFlag()
    {
        this._hidden = false;
        return this._yapi.SUCCESS;
    }

    // internal function to flush any pending command for this layer
    async flush_now()
    {
        var res = YAPI.SUCCESS;
        if(this._cmdbuff != '') {
            res = await this._display.sendCommand(this._cmdbuff);
            this._cmdbuff = '';
        }
        return res;
    }

    // internal function to buffer a command for this layer
    async command_push(str_cmd)
    {
        var res = YAPI.SUCCESS;

        if(this._cmdbuff.length + str_cmd.length >= 100) {
            // force flush before, to prevent overflow
            res = await this.flush_now();
        }
        if(this._cmdbuff == '') {
            // always prepend layer ID first
            this._cmdbuff = this._id;
        }
        this._cmdbuff += str_cmd;
        return res;
    }

    // internal function to send a command for this layer
    async command_flush(str_cmd)
    {
        var res = await this.command_push(str_cmd);
        if(this._hidden) {
            return res;
        }
        return await this.flush_now();
    }

    //--- (generated code: YDisplayLayer implementation)
    static imm_Init()
    {
        if (typeof(YFunction.imm_InitStatics) != 'undefined') {
            YFunction.imm_InitStatics(this);
        }
    }

    must_be_flushed()
    {
        return (this._cmdbuff).length > 0;
    }

    resetHiddenFlag()
    {
        this._hidden = false;
        return YAPI.SUCCESS;
    }

    async flush_now()
    {
        /** @type {number} **/
        let res;
        res = YAPI.SUCCESS;
        if ((this._cmdbuff).length > 0) {
            res = await this._display.sendCommand(this._cmdbuff);
            this._cmdbuff = '';
        }
        return res;
    }

    async command_push(cmd)
    {
        /** @type {number} **/
        let res;
        res = YAPI.SUCCESS;
        if ((this._cmdbuff).length + (cmd).length >= 64) {
            // force flush before, to prevent overflow
            await this.flush_now();
        }
        if ((this._cmdbuff).length == 0) {
            // always prepend layer ID first
            this._cmdbuff = (this._id).toString();
        }
        this._cmdbuff = this._cmdbuff + cmd;
        return res;
    }

    async command_flush(cmd)
    {
        /** @type {number} **/
        let res;

        res = await this.command_push(cmd);
        if (this._hidden) {
            return res;
        }
        if (this._display.isFrozen()) {
            return res;
        }
        return await this.flush_now();
    }

    /**
     * Reverts the layer to its initial state (fully transparent, default settings).
     * Reinitializes the drawing pointer to the upper left position,
     * and selects the most visible pen color. If you only want to erase the layer
     * content, use the method clear() instead.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reset()
    {
        this._hidden = false;
        return await this.command_flush('X');
    }

    /**
     * Erases the whole content of the layer (makes it fully transparent).
     * This method does not change any other attribute of the layer.
     * To reinitialize the layer attributes to defaults settings, use the method
     * reset() instead.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clear()
    {
        return await this.command_flush('x');
    }

    /**
     * Selects the color to be used for all subsequent drawing functions,
     * for filling as well as for line and text drawing.
     * To select a different fill and outline color, use
     * selectFillColor and selectLineColor.
     * The pen color is provided as an RGB value.
     * For grayscale or monochrome displays, the value is
     * automatically converted to the proper range.
     *
     * @param color : the desired pen color, as a 24-bit RGB value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectColorPen(color)
    {
        return await this.command_push('c'+('000000'+(color).toString(16)).slice(-6).toLowerCase());
    }

    /**
     * Selects the pen gray level for all subsequent drawing functions,
     * for filling as well as for line and text drawing.
     * To select a different fill and outline color, use
     * selectFillColor and selectLineColor.
     * The gray level is provided as a number between
     * 0 (black) and 255 (white, or whichever the lightest color is).
     * For monochrome displays (without gray levels), any value
     * lower than 128 is rendered as black, and any value equal
     * or above to 128 is non-black.
     *
     * @param graylevel : the desired gray level, from 0 to 255
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectGrayPen(graylevel)
    {
        return await this.command_push('g'+String(Math.round(graylevel)));
    }

    /**
     * Selects an eraser instead of a pen for all subsequent drawing functions,
     * except for bitmap copy functions. Any point drawn using the eraser
     * becomes transparent (as when the layer is empty), showing the other
     * layers beneath it.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectEraser()
    {
        return await this.command_push('e');
    }

    /**
     * Selects the color to be used for filling rectangular bars,
     * discs and polygons. The color is provided as an RGB value.
     * For grayscale or monochrome displays, the value is
     * automatically converted to the proper range.
     * You can also use the constants FG_INK to use the
     * default drawing colour, BG_INK to use the default
     * background colour, and NO_INK to disable filling.
     *
     * @param color : the desired drawing color, as a 24-bit RGB value,
     *         or one of the constants NO_INK, FG_INK
     *         or BG_INK
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectFillColor(color)
    {
        /** @type {number} **/
        let r;
        /** @type {number} **/
        let g;
        /** @type {number} **/
        let b;
        if (color==-1) {
            return await this.command_push('f_');
        }
        if (color==-2) {
            return await this.command_push('f-');
        }
        if (color==-3) {
            return await this.command_push('f.');
        }
        r = ((color >> 20) & 15);
        g = ((color >> 12) & 15);
        b = ((color >> 4) & 15);
        return await this.command_push('f'+(r).toString(16).toLowerCase()+''+(g).toString(16).toLowerCase()+''+(b).toString(16).toLowerCase());
    }

    /**
     * Selects the color to be used for drawing the outline of rectangular
     * bars, discs and polygons, as well as for drawing lines and text.
     * The color is provided as an RGB value.
     * For grayscale or monochrome displays, the value is
     * automatically converted to the proper range.
     * You can also use the constants FG_INK to use the
     * default drawing colour, BG_INK to use the default
     * background colour, and NO_INK to disable outline drawing.
     *
     * @param color : the desired drawing color, as a 24-bit RGB value,
     *         or one of the constants NO_INK, FG_INK
     *         or BG_INK
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectLineColor(color)
    {
        /** @type {number} **/
        let r;
        /** @type {number} **/
        let g;
        /** @type {number} **/
        let b;
        if (color==-1) {
            return await this.command_push('l_');
        }
        if (color==-2) {
            return await this.command_push('l-');
        }
        if (color==-3) {
            return await this.command_push('l*');
        }
        r = ((color >> 20) & 15);
        g = ((color >> 12) & 15);
        b = ((color >> 4) & 15);
        return await this.command_push('l'+(r).toString(16).toLowerCase()+''+(g).toString(16).toLowerCase()+''+(b).toString(16).toLowerCase());
    }

    /**
     * Selects the line width for drawing the outline of rectangular
     * bars, discs and polygons, as well as for drawing lines.
     *
     * @param width : the desired line width, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectLineWidth(width)
    {
        return await this.command_push('t'+String(Math.round(width)));
    }

    async setAntialiasingMode(mode)
    {
        return await this.command_push('a'+(mode?"1":"0"));
    }

    /**
     * Draws a single pixel at the specified position.
     *
     * @param x : the distance from left of layer, in pixels
     * @param y : the distance from top of layer, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawPixel(x,y)
    {
        return await this.command_flush('P'+String(Math.round(x))+','+String(Math.round(y)));
    }

    /**
     * Draws an empty rectangle at a specified position.
     *
     * @param x1 : the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1 : the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2 : the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2 : the distance from top of layer to the bottom border of the rectangle, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawRect(x1,y1,x2,y2)
    {
        return await this.command_flush('R'+String(Math.round(x1))+','+String(Math.round(y1))+','+String(Math.round(x2))+','+String(Math.round(y2)));
    }

    /**
     * Draws a filled rectangular bar at a specified position.
     *
     * @param x1 : the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1 : the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2 : the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2 : the distance from top of layer to the bottom border of the rectangle, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawBar(x1,y1,x2,y2)
    {
        return await this.command_flush('B'+String(Math.round(x1))+','+String(Math.round(y1))+','+String(Math.round(x2))+','+String(Math.round(y2)));
    }

    /**
     * Draws an empty circle at a specified position.
     *
     * @param x : the distance from left of layer to the center of the circle, in pixels
     * @param y : the distance from top of layer to the center of the circle, in pixels
     * @param r : the radius of the circle, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawCircle(x,y,r)
    {
        return await this.command_flush('C'+String(Math.round(x))+','+String(Math.round(y))+','+String(Math.round(r)));
    }

    /**
     * Draws a filled disc at a given position.
     *
     * @param x : the distance from left of layer to the center of the disc, in pixels
     * @param y : the distance from top of layer to the center of the disc, in pixels
     * @param r : the radius of the disc, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawDisc(x,y,r)
    {
        return await this.command_flush('D'+String(Math.round(x))+','+String(Math.round(y))+','+String(Math.round(r)));
    }

    /**
     * Selects a font to use for the next text drawing functions, by providing the name of the
     * font file. You can use a built-in font as well as a font file that you have previously
     * uploaded to the device built-in memory. If you experience problems selecting a font
     * file, check the device logs for any error message such as missing font file or bad font
     * file format.
     *
     * @param fontname : the font file name, embedded fonts are 8x8.yfm, Small.yfm, Medium.yfm, Large.yfm
     * (not available on Yocto-MiniDisplay).
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectFont(fontname)
    {
        return await this.command_push('&'+fontname+''+String.fromCharCode(27));
    }

    /**
     * Draws a text string at the specified position. The point of the text that is aligned
     * to the specified pixel position is called the anchor point, and can be chosen among
     * several options. Text is rendered from left to right, without implicit wrapping.
     *
     * @param x : the distance from left of layer to the text anchor point, in pixels
     * @param y : the distance from top of layer to the text anchor point, in pixels
     * @param anchor : the text anchor point, chosen among the YDisplayLayer.ALIGN enumeration:
     *         YDisplayLayer.ALIGN_TOP_LEFT,         YDisplayLayer.ALIGN_CENTER_LEFT,
     *         YDisplayLayer.ALIGN_BASELINE_LEFT,    YDisplayLayer.ALIGN_BOTTOM_LEFT,
     *         YDisplayLayer.ALIGN_TOP_CENTER,       YDisplayLayer.ALIGN_CENTER,
     *         YDisplayLayer.ALIGN_BASELINE_CENTER,  YDisplayLayer.ALIGN_BOTTOM_CENTER,
     *         YDisplayLayer.ALIGN_TOP_DECIMAL,      YDisplayLayer.ALIGN_CENTER_DECIMAL,
     *         YDisplayLayer.ALIGN_BASELINE_DECIMAL, YDisplayLayer.ALIGN_BOTTOM_DECIMAL,
     *         YDisplayLayer.ALIGN_TOP_RIGHT,        YDisplayLayer.ALIGN_CENTER_RIGHT,
     *         YDisplayLayer.ALIGN_BASELINE_RIGHT,   YDisplayLayer.ALIGN_BOTTOM_RIGHT.
     * @param text : the text string to draw
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawText(x,y,anchor,text)
    {
        /** @type {number} **/
        let textlen;
        /** @type {string} **/
        let destname;
        textlen = (text).length;
        if (textlen > 60) {
            if (textlen > 1000) {
                this._display._throw(YAPI.INVALID_ARGUMENT, 'text too large (max 1000 characters)');
                return YAPI.INVALID_ARGUMENT;
            }
            await this._display.flushLayers();
            destname = 'layer'+String(Math.round(this._id))+':T'+String(Math.round(x))+','+String(Math.round(y))+','+String(anchor)+',';
            return await this._display.upload(destname, this._yapi.imm_str2bin(text));
        }
        return await this.command_flush('T'+String(Math.round(x))+','+String(Math.round(y))+','+String(anchor)+','+text+''+String.fromCharCode(27));
    }

    /**
     * Draws an image previously uploaded to the device filesystem, at the specified position.
     * At present time, GIF images are the only supported image format. If you experience
     * problems using an image file, check the device logs for any error message such as
     * missing image file or bad image file format.
     *
     * @param x : the distance from left of layer to the left of the image, in pixels
     * @param y : the distance from top of layer to the top of the image, in pixels
     * @param imagename : the GIF file name
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawImage(x,y,imagename)
    {
        return await this.command_flush('*'+String(Math.round(x))+','+String(Math.round(y))+','+imagename+''+String.fromCharCode(27));
    }

    /**
     * Draws a GIF image provided as a binary buffer at the specified position.
     * If the image drawing must be included in an animation sequence, save it
     * in the device filesystem first and use drawImage instead.
     *
     * @param x : the distance from left of layer to the left of the image, in pixels
     * @param y : the distance from top of layer to the top of the image, in pixels
     * @param gifimage : a binary object with the content of a GIF file
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawGIF(x,y,gifimage)
    {
        /** @type {string} **/
        let destname;
        await this._display.flushLayers();
        destname = 'layer'+String(Math.round(this._id))+':G,-1@'+String(Math.round(x))+','+String(Math.round(y));
        return await this._display.upload(destname, gifimage);
    }

    /**
     * Draws a bitmap at the specified position. The bitmap is provided as a binary object,
     * where each pixel maps to a bit, from left to right and from top to bottom.
     * The most significant bit of each byte maps to the leftmost pixel, and the least
     * significant bit maps to the rightmost pixel. Bits set to 1 are drawn using the
     * layer selected pen color. Bits set to 0 are drawn using the specified background
     * color, unless NO_INK (-1) is specified, in which case they are not
     * drawn at all (as if transparent).
     *
     * @param x : the distance from left of layer to the left of the bitmap, in pixels
     * @param y : the distance from top of layer to the top of the bitmap, in pixels
     * @param w : the width of the bitmap, in pixels
     * @param bitmap : a binary object
     * @param bgcol : the RGB background color to use for zero bits, as a 24-bit RGB value,
     *         or one of the constants NO_INK, FG_INK or BG_INK
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawBitmap(x,y,w,bitmap,bgcol)
    {
        /** @type {string} **/
        let destname;
        /** @type {number} **/
        let r;
        /** @type {number} **/
        let g;
        /** @type {number} **/
        let b;
        /** @type {string} **/
        let rgbcol;
        if ((w < 0) || (w > 512)) {
            this._display._throw(YAPI.INVALID_ARGUMENT, 'bitmap width must be in range 1..512');
            return YAPI.INVALID_ARGUMENT;
        }
        await this._display.flushLayers();
        if (bgcol <= 255) {
            if (bgcol >= -1) {
                // backward-compatible behaviour (gray level)
                rgbcol = String(Math.round(bgcol));
            } else {
                // background color or foreground color
                if (bgcol <= -3) {
                    rgbcol = '#.';
                } else {
                    rgbcol = '#-';
                }
            }
        } else {
            // RGB color
            r = ((bgcol >> 20) & 15);
            g = ((bgcol >> 12) & 15);
            b = ((bgcol >> 4) & 15);
            rgbcol = '#'+(r).toString(16).toLowerCase()+''+(g).toString(16).toLowerCase()+''+(b).toString(16).toLowerCase();
        }
        destname = 'layer'+String(Math.round(this._id))+':'+String(Math.round(w))+','+rgbcol+'@'+String(Math.round(x))+','+String(Math.round(y));
        return await this._display.upload(destname, bitmap);
    }

    /**
     * Moves the drawing pointer of this layer to the specified position.
     *
     * @param x : the distance from left of layer, in pixels
     * @param y : the distance from top of layer, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async moveTo(x,y)
    {
        return await this.command_push('@'+String(Math.round(x))+','+String(Math.round(y)));
    }

    /**
     * Draws a line from current drawing pointer position to the specified position.
     * The specified destination pixel is included in the line. The pointer position
     * is then moved to the end point of the line.
     *
     * @param x : the distance from left of layer to the end point of the line, in pixels
     * @param y : the distance from top of layer to the end point of the line, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async lineTo(x,y)
    {
        return await this.command_flush('-'+String(Math.round(x))+','+String(Math.round(y)));
    }

    /**
     * Starts drawing a polygon with the first corner at the specified position.
     *
     * @param x : the distance from left of layer, in pixels
     * @param y : the distance from top of layer, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async polygonStart(x,y)
    {
        this._polyPrevX = x;
        this._polyPrevY = y;
        return await this.command_push('['+String(Math.round(x))+','+String(Math.round(y)));
    }

    /**
     * Adds a point to the currently open polygon, previously opened using
     * polygonStart.
     *
     * @param x : the distance from left of layer to the new point, in pixels
     * @param y : the distance from top of layer to the new point, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async polygonAdd(x,y)
    {
        /** @type {number} **/
        let dx;
        /** @type {number} **/
        let dy;
        dx = x - this._polyPrevX;
        dy = y - this._polyPrevY;
        this._polyPrevX = x;
        this._polyPrevY = y;
        return await this.command_flush(';'+String(Math.round(dx))+','+String(Math.round(dy)));
    }

    /**
     * Closes the currently open polygon, fill its content the fill color currently
     * selected for the layer, and draw its outline using the selected line color.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async polygonEnd()
    {
        return await this.command_flush(']');
    }

    /**
     * Outputs a message in the console area, and advances the console pointer accordingly.
     * The console pointer position is automatically moved to the beginning
     * of the next line when a newline character is met, or when the right margin
     * is hit. When the new text to display extends below the lower margin, the
     * console area is automatically scrolled up.
     *
     * @param text : the message to display
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async consoleOut(text)
    {
        /** @type {number} **/
        let textlen;
        /** @type {string} **/
        let destname;
        textlen = (text).length;
        if (textlen > 60) {
            if (textlen > 1000) {
                this._display._throw(YAPI.INVALID_ARGUMENT, 'text too large (max 1000 characters)');
                return YAPI.INVALID_ARGUMENT;
            }
            await this._display.flushLayers();
            destname = 'layer'+String(Math.round(this._id))+':!';
            return await this._display.upload(destname, this._yapi.imm_str2bin(text));
        }
        return await this.command_flush('!'+text+''+String.fromCharCode(27));
    }

    /**
     * Sets up display margins for the consoleOut function.
     *
     * @param x1 : the distance from left of layer to the left margin, in pixels
     * @param y1 : the distance from top of layer to the top margin, in pixels
     * @param x2 : the distance from left of layer to the right margin, in pixels
     * @param y2 : the distance from top of layer to the bottom margin, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setConsoleMargins(x1,y1,x2,y2)
    {
        return await this.command_push('m'+String(Math.round(x1))+','+String(Math.round(y1))+','+String(Math.round(x2))+','+String(Math.round(y2)));
    }

    /**
     * Sets up the background color used by the clearConsole function and by
     * the console scrolling feature.
     *
     * @param bgcol : the background gray level to use when scrolling (0 = black,
     *         255 = white), or -1 for transparent
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setConsoleBackground(bgcol)
    {
        return await this.command_push('b'+String(Math.round(bgcol)));
    }

    /**
     * Sets up the wrapping behavior used by the consoleOut function.
     *
     * @param wordwrap : true to wrap only between words,
     *         false to wrap on the last column anyway.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setConsoleWordWrap(wordwrap)
    {
        return await this.command_push('w'+(wordwrap?"1":"0"));
    }

    /**
     * Blanks the console area within console margins, and resets the console pointer
     * to the upper left corner of the console.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clearConsole()
    {
        return await this.command_flush('^');
    }

    /**
     * Sets the position of the layer relative to the display upper left corner.
     * When smooth scrolling is used, the display offset of the layer is
     * automatically updated during the next milliseconds to animate the move of the layer.
     *
     * @param x : the distance from left of display to the upper left corner of the layer
     * @param y : the distance from top of display to the upper left corner of the layer
     * @param scrollTime : number of milliseconds to use for smooth scrolling, or
     *         0 if the scrolling should be immediate.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setLayerPosition(x,y,scrollTime)
    {
        return await this.command_flush('#'+String(Math.round(x))+','+String(Math.round(y))+','+String(Math.round(scrollTime)));
    }

    /**
     * Hides the layer. The state of the layer is preserved but the layer is not displayed
     * on the screen until the next call to unhide(). Hiding the layer can positively
     * affect the drawing speed, since it postpones the rendering until all operations are
     * completed (double-buffering).
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async hide()
    {
        await this.command_push('h');
        this._hidden = true;
        return await this.flush_now();
    }

    /**
     * Shows the layer. Shows the layer again after a hide command.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async unhide()
    {
        this._hidden = false;
        return await this.command_flush('s');
    }

    /**
     * Gets parent YDisplay. Returns the parent YDisplay object of the current YDisplayLayer.
     *
     * @return an YDisplay object
     */
    async get_display()
    {
        return this._display;
    }

    /**
     * Returns the display width, in pixels.
     *
     * @return an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYWIDTH_INVALID.
     */
    async get_displayWidth()
    {
        return await this._display.get_displayWidth();
    }

    /**
     * Returns the display height, in pixels.
     *
     * @return an integer corresponding to the display height, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYHEIGHT_INVALID.
     */
    async get_displayHeight()
    {
        return await this._display.get_displayHeight();
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.LAYERWIDTH_INVALID.
     */
    async get_layerWidth()
    {
        return await this._display.get_layerWidth();
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.LAYERHEIGHT_INVALID.
     */
    async get_layerHeight()
    {
        return await this._display.get_layerHeight();
    }

    static imm_Const()
    {
        return {
            NO_INK                       : -1,
            BG_INK                       : -2,
            FG_INK                       : -3,
            ALIGN_TOP_LEFT               : 0,
            ALIGN_CENTER_LEFT            : 1,
            ALIGN_BASELINE_LEFT          : 2,
            ALIGN_BOTTOM_LEFT            : 3,
            ALIGN_TOP_CENTER             : 4,
            ALIGN_CENTER                 : 5,
            ALIGN_BASELINE_CENTER        : 6,
            ALIGN_BOTTOM_CENTER          : 7,
            ALIGN_TOP_DECIMAL            : 8,
            ALIGN_CENTER_DECIMAL         : 9,
            ALIGN_BASELINE_DECIMAL       : 10,
            ALIGN_BOTTOM_DECIMAL         : 11,
            ALIGN_TOP_RIGHT              : 12,
            ALIGN_CENTER_RIGHT           : 13,
            ALIGN_BASELINE_RIGHT         : 14,
            ALIGN_BOTTOM_RIGHT           : 15
        };
    }

    //--- (end of generated code: YDisplayLayer implementation)
}

if(typeof window != 'undefined') {
    // Global exports for backward compatibility with old JavaScript library
    YoctoLibExport('Y_ALIGN_TOP_LEFT', 0);
    YoctoLibExport('Y_ALIGN_CENTER_LEFT', 1);
    YoctoLibExport('Y_ALIGN_BASELINE_LEFT', 2);
    YoctoLibExport('Y_ALIGN_BOTTOM_LEFT', 3);
    YoctoLibExport('Y_ALIGN_TOP_CENTER', 4);
    YoctoLibExport('Y_ALIGN_CENTER', 5);
    YoctoLibExport('Y_ALIGN_BASELINE_CENTER', 6);
    YoctoLibExport('Y_ALIGN_BOTTOM_CENTER', 7);
    YoctoLibExport('Y_ALIGN_TOP_DECIMAL', 8);
    YoctoLibExport('Y_ALIGN_CENTER_DECIMAL', 9);
    YoctoLibExport('Y_ALIGN_BASELINE_DECIMAL', 10);
    YoctoLibExport('Y_ALIGN_BOTTOM_DECIMAL', 11);
    YoctoLibExport('Y_ALIGN_TOP_RIGHT', 12);
    YoctoLibExport('Y_ALIGN_CENTER_RIGHT', 13);
    YoctoLibExport('Y_ALIGN_BASELINE_RIGHT', 14);
    YoctoLibExport('Y_ALIGN_BOTTOM_RIGHT', 15);
}

//--- (generated code: YDisplay class start)
/**
 * YDisplay Class: display control interface, available for instance in the Yocto-Display, the
 * Yocto-MaxiDisplay, the Yocto-MaxiDisplay-G or the Yocto-MiniDisplay
 *
 * The YDisplay class allows to drive Yoctopuce displays.
 * Yoctopuce display interface has been designed to easily
 * show information and images. The device provides built-in
 * multi-layer rendering. Layers can be drawn offline, individually,
 * and freely moved on the display. It can also replay recorded
 * sequences (animations).
 *
 * In order to draw on the screen, you should use the
 * display.get_displayLayer method to retrieve the layer(s) on
 * which you want to draw, and then use methods defined in
 * YDisplayLayer to draw on the layers.
 */
//--- (end of generated code: YDisplay class start)
class YDisplay extends YFunction
{
    constructor(obj_yapi,str_func)
    {
        //--- (generated code: YDisplay constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Display';
        /** @member {number} **/
        this._enabled                    = YDisplay.ENABLED_INVALID;
        /** @member {string} **/
        this._startupSeq                 = YDisplay.STARTUPSEQ_INVALID;
        /** @member {number} **/
        this._brightness                 = YDisplay.BRIGHTNESS_INVALID;
        /** @member {number} **/
        this._autoInvertDelay            = YDisplay.AUTOINVERTDELAY_INVALID;
        /** @member {number} **/
        this._orientation                = YDisplay.ORIENTATION_INVALID;
        /** @member {string} **/
        this._displayPanel               = YDisplay.DISPLAYPANEL_INVALID;
        /** @member {number} **/
        this._displayWidth               = YDisplay.DISPLAYWIDTH_INVALID;
        /** @member {number} **/
        this._displayHeight              = YDisplay.DISPLAYHEIGHT_INVALID;
        /** @member {number} **/
        this._displayType                = YDisplay.DISPLAYTYPE_INVALID;
        /** @member {number} **/
        this._layerWidth                 = YDisplay.LAYERWIDTH_INVALID;
        /** @member {number} **/
        this._layerHeight                = YDisplay.LAYERHEIGHT_INVALID;
        /** @member {number} **/
        this._layerCount                 = YDisplay.LAYERCOUNT_INVALID;
        /** @member {string} **/
        this._command                    = YDisplay.COMMAND_INVALID;
        /** @member {YDisplayLayer[]} **/
        this._allDisplayLayers           = [];
        /** @member {number} **/
        this._frozenUntil                = 0;
        /** @member {boolean} **/
        this._recording                  = 0;
        /** @member {string} **/
        this._sequence                   = '';
        //--- (end of generated code: YDisplay constructor)

        this._sequence         = '';
        this._recording        = false;
    }

    //--- (generated code: YDisplay implementation)

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'enabled':
            this._enabled = parseInt(val);
            return 1;
        case 'startupSeq':
            this._startupSeq = val;
            return 1;
        case 'brightness':
            this._brightness = parseInt(val);
            return 1;
        case 'autoInvertDelay':
            this._autoInvertDelay = parseInt(val);
            return 1;
        case 'orientation':
            this._orientation = parseInt(val);
            return 1;
        case 'displayPanel':
            this._displayPanel = val;
            return 1;
        case 'displayWidth':
            this._displayWidth = parseInt(val);
            return 1;
        case 'displayHeight':
            this._displayHeight = parseInt(val);
            return 1;
        case 'displayType':
            this._displayType = parseInt(val);
            return 1;
        case 'layerWidth':
            this._layerWidth = parseInt(val);
            return 1;
        case 'layerHeight':
            this._layerHeight = parseInt(val);
            return 1;
        case 'layerCount':
            this._layerCount = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns true if the screen is powered, false otherwise.
     *
     * @return either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to true if the screen is
     * powered, false otherwise
     *
     * On failure, throws an exception or returns YDisplay.ENABLED_INVALID.
     */
    async get_enabled()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Changes the power state of the display.
     *
     * @param newval : either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to the power
     * state of the display
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabled',rest_val);
    }

    /**
     * Returns the name of the sequence to play when the displayed is powered on.
     *
     * @return a string corresponding to the name of the sequence to play when the displayed is powered on
     *
     * On failure, throws an exception or returns YDisplay.STARTUPSEQ_INVALID.
     */
    async get_startupSeq()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.STARTUPSEQ_INVALID;
            }
        }
        res = this._startupSeq;
        return res;
    }

    /**
     * Changes the name of the sequence to play when the display is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the name of the sequence to play when the display is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_startupSeq(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('startupSeq',rest_val);
    }

    /**
     * Returns the luminosity of the  module informative LEDs (from 0 to 100).
     *
     * @return an integer corresponding to the luminosity of the  module informative LEDs (from 0 to 100)
     *
     * On failure, throws an exception or returns YDisplay.BRIGHTNESS_INVALID.
     */
    async get_brightness()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.BRIGHTNESS_INVALID;
            }
        }
        res = this._brightness;
        return res;
    }

    /**
     * Changes the brightness of the display. The parameter is a value between 0 and
     * 100. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the brightness of the display
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_brightness(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('brightness',rest_val);
    }

    /**
     * Returns the interval between automatic display inversions, or 0 if automatic
     * inversion is disabled. Using the automatic inversion mechanism reduces the
     * burn-in that occurs on OLED screens over long periods when the same content
     * remains displayed on the screen.
     *
     * @return an integer corresponding to the interval between automatic display inversions, or 0 if automatic
     *         inversion is disabled
     *
     * On failure, throws an exception or returns YDisplay.AUTOINVERTDELAY_INVALID.
     */
    async get_autoInvertDelay()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.AUTOINVERTDELAY_INVALID;
            }
        }
        res = this._autoInvertDelay;
        return res;
    }

    /**
     * Changes the interval between automatic display inversions.
     * The parameter is the number of seconds, or 0 to disable automatic inversion.
     * Using the automatic inversion mechanism reduces the burn-in that occurs on OLED
     * screens over long periods when the same content remains displayed on the screen.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the interval between automatic display inversions
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_autoInvertDelay(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('autoInvertDelay',rest_val);
    }

    /**
     * Returns the currently selected display orientation. The orientation is defined as the side of the
     * screen where the
     * USB connector (for OLED displays) or the ribbon cable (for ePaper panels) is located when the
     * display is up straight.
     *
     * @return a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the currently selected
     * display orientation
     *
     * On failure, throws an exception or returns YDisplay.ORIENTATION_INVALID.
     */
    async get_orientation()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.ORIENTATION_INVALID;
            }
        }
        res = this._orientation;
        return res;
    }

    /**
     * Changes the display orientation. he orientation is defined as the side of the screen where the
     * USB connector (for OLED displays) or the ribbon cable (for ePaper panels) is located when the
     * display is up straight. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the display orientation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_orientation(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('orientation',rest_val);
    }

    /**
     * Returns the exact model of the display panel.
     *
     * @return a string corresponding to the exact model of the display panel
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYPANEL_INVALID.
     */
    async get_displayPanel()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.DISPLAYPANEL_INVALID;
            }
        }
        res = this._displayPanel;
        return res;
    }

    /**
     * Changes the model of display to match the connected display panel.
     * This function has no effect if the module does not support the selected
     * display panel. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the model of display to match the connected display panel
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_displayPanel(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('displayPanel',rest_val);
    }

    /**
     * Returns the display width, in pixels.
     *
     * @return an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYWIDTH_INVALID.
     */
    async get_displayWidth()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.DISPLAYWIDTH_INVALID;
            }
        }
        res = this._displayWidth;
        return res;
    }

    /**
     * Returns the display height, in pixels.
     *
     * @return an integer corresponding to the display height, in pixels
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYHEIGHT_INVALID.
     */
    async get_displayHeight()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.DISPLAYHEIGHT_INVALID;
            }
        }
        res = this._displayHeight;
        return res;
    }

    /**
     * Returns the display type: monochrome OLED, black and white ePaper, color ePaper, and so on.
     *
     * @return a value among YDisplay.DISPLAYTYPE_MONO, YDisplay.DISPLAYTYPE_EPAPER_BW,
     * YDisplay.DISPLAYTYPE_EPAPER_BWR and YDisplay.DISPLAYTYPE_EPAPER_BWRY corresponding to the display
     * type: monochrome OLED, black and white ePaper, color ePaper, and so on
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYTYPE_INVALID.
     */
    async get_displayType()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.DISPLAYTYPE_INVALID;
            }
        }
        res = this._displayType;
        return res;
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplay.LAYERWIDTH_INVALID.
     */
    async get_layerWidth()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.LAYERWIDTH_INVALID;
            }
        }
        res = this._layerWidth;
        return res;
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplay.LAYERHEIGHT_INVALID.
     */
    async get_layerHeight()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.LAYERHEIGHT_INVALID;
            }
        }
        res = this._layerHeight;
        return res;
    }

    /**
     * Returns the number of available layers to draw on.
     *
     * @return an integer corresponding to the number of available layers to draw on
     *
     * On failure, throws an exception or returns YDisplay.LAYERCOUNT_INVALID.
     */
    async get_layerCount()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.LAYERCOUNT_INVALID;
            }
        }
        res = this._layerCount;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.COMMAND_INVALID;
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
     * Retrieves a display for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the display is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDisplay.isOnline() to test if the display is
     * indeed online at a given time. In case of ambiguity when looking for
     * a display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the display, for instance
     *         YD128X32.display.
     *
     * @return a YDisplay object allowing you to drive the display.
     */
    static FindDisplay(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Display', func);
        if (obj == null) {
            obj = new YDisplay(YAPI, func);
            YFunction._AddToCache('Display', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a display for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the display is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDisplay.isOnline() to test if the display is
     * indeed online at a given time. In case of ambiguity when looking for
     * a display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the display, for instance
     *         YD128X32.display.
     *
     * @return a YDisplay object allowing you to drive the display.
     */
    static FindDisplayInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Display', func);
        if (obj == null) {
            obj = new YDisplay(yctx, func);
            YFunction._AddToCache('Display', func, obj);
        }
        return obj;
    }

    async sendCommand(cmd)
    {
        if (!(this._recording)) {
            return await this.set_command(cmd);
        }
        this._sequence = this._sequence+''+cmd+'\n';
        return this._yapi.SUCCESS;
    }

    async flushLayers()
    {
        for (let ii_0 of this._allDisplayLayers) {
            if (ii_0.must_be_flushed()) {
                await ii_0.flush_now();
            }
        }
        return this._yapi.SUCCESS;
    }

    resetHiddenLayerFlags()
    {
        for (let ii_0 of this._allDisplayLayers) {
            ii_0.resetHiddenFlag();
        }
        return this._yapi.SUCCESS;
    }

    isFrozen()
    {
        if (this._frozenUntil == 0) {
            return false;
        }
        if (this._frozenUntil <= this._yapi.GetTickCount()) {
            this._frozenUntil = 0;
            return false;
        }
        return true;
    }

    /**
     * Returns the fast refresh usage policy in use (ePaper displays only).
     * This setting is combined with the regenerate policy to determine when the screen
     * should be updated using a fast update versus or regenerated using a slower,
     * flickering full refresh.
     *
     * @return a value among the YDisplay.FASTREFRESH enumeration
     *         (YDisplay.FASTREFRESH_WHENEVER_POSSIBLE,
     *         YDisplay.FASTREFRESH_WHENEVER_SUPPORTED,
     *         YDisplay.FASTREFRESH_NEVER).
     *
     * On failure, throws an exception or returns YDisplay.FASTREFRESH_INVALID.
     */
    async get_fastRefreshPolicy()
    {
        /** @type {number} **/
        let combined;
        /** @type {number} **/
        let fmod;
        combined = await this.get_brightness();
        if (combined < 0) {
            return YDisplay.FASTREFRESH_INVALID;
        }
        fmod = parseInt(combined / 25, 10);
        if (fmod >= 2) {
            fmod = fmod - 2;
        }
        return fmod;
    }

    /**
     * Returns the display regeneration minimal frequency (ePaper displays only).
     * This setting is combined with the fast refresh usage policy to determine
     * when the screen should be updated using a fast update versus or regenerated
     * using a slower, flickering full refresh. To change the display regeneration minimal
     * frequency, use methode set_fastRefreshPolicy().
     *
     * @return a value among the YDisplay.REGENERATE enumeration
     *         (YDisplay.REGENERATE_ON_REQUEST_ONLY,
     *         YDisplay.REGENERATE_EVERY_DAY, YDisplay.REGENERATE_EVERY_12H,
     *         YDisplay.REGENERATE_EVERY_6H, YDisplay.REGENERATE_EVERY_3H,
     *         YDisplay.REGENERATE_EVERY_2H, YDisplay.REGENERATE_EVERY_HOUR,
     *         YDisplay.REGENERATE_EVERY_30MIN, YDisplay.REGENERATE_EVERY_15MIN,
     *         YDisplay.REGENERATE_EVERY_480, YDisplay.REGENERATE_EVERY_432,
     *         YDisplay.REGENERATE_EVERY_360, YDisplay.REGENERATE_EVERY_288,
     *         YDisplay.REGENERATE_EVERY_240, YDisplay.REGENERATE_EVERY_192,
     *         YDisplay.REGENERATE_EVERY_144, YDisplay.REGENERATE_EVERY_96,
     *         YDisplay.REGENERATE_EVERY_48, YDisplay.REGENERATE_EVERY_36,
     *         YDisplay.REGENERATE_EVERY_24, YDisplay.REGENERATE_EVERY_12,
     *         YDisplay.REGENERATE_EVERY_10, YDisplay.REGENERATE_EVERY_8,
     *         YDisplay.REGENERATE_EVERY_6, YDisplay.REGENERATE_EVERY_4,
     *         YDisplay.REGENERATE_ALWAYS).
     *
     * On failure, throws an exception or returns YDisplay.REGENERATE_INVALID.
     */
    async get_regeneratePolicy()
    {
        /** @type {number} **/
        let combined;
        /** @type {number} **/
        let fval;
        combined= await this.get_brightness();
        if (combined < 0) {
            return YDisplay.REGENERATE_INVALID;
        }
        if (combined >= 100) {
            fval = 25;
        } else {
            fval = (combined % 25);
        }
        return fval;
    }

    /**
     * Changes the fast refresh usage policy and display regeneration minimal frequency
     * (ePaper displays only). These settings jointly determine when the screen should be
     * updated using a fast update versus or regenerated using a slower, flickering full
     * refresh.
     *
     * @param fastRefresh : a value among the YDisplay.FASTREFRESH enumeration
     *         (YDisplay.FASTREFRESH_WHENEVER_POSSIBLE,
     *         YDisplay.FASTREFRESH_WHENEVER_SUPPORTED,
     *         YDisplay.FASTREFRESH_NEVER),
     *         corresponding to the policy for using fast refresh.
     * @param regenerate : a value among the enumeration YRefFrame.REGENERATE
     *         (YDisplay.REGENERATE_ON_REQUEST_ONLY,
     *         YDisplay.REGENERATE_EVERY_DAY, YDisplay.REGENERATE_EVERY_12H,
     *         YDisplay.REGENERATE_EVERY_6H, YDisplay.REGENERATE_EVERY_3H,
     *         YDisplay.REGENERATE_EVERY_2H, YDisplay.REGENERATE_EVERY_HOUR,
     *         YDisplay.REGENERATE_EVERY_30MIN, YDisplay.REGENERATE_EVERY_15MIN,
     *         YDisplay.REGENERATE_EVERY_480, YDisplay.REGENERATE_EVERY_432,
     *         YDisplay.REGENERATE_EVERY_360, YDisplay.REGENERATE_EVERY_288,
     *         YDisplay.REGENERATE_EVERY_240, YDisplay.REGENERATE_EVERY_192,
     *         YDisplay.REGENERATE_EVERY_144, YDisplay.REGENERATE_EVERY_96,
     *         YDisplay.REGENERATE_EVERY_48, YDisplay.REGENERATE_EVERY_36,
     *         YDisplay.REGENERATE_EVERY_24, YDisplay.REGENERATE_EVERY_12,
     *         YDisplay.REGENERATE_EVERY_10, YDisplay.REGENERATE_EVERY_8,
     *         YDisplay.REGENERATE_EVERY_6, YDisplay.REGENERATE_EVERY_4,
     *         YDisplay.REGENERATE_ALWAYS),
     *         corresponding to the display minimal regeneration frequency.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_fastRefreshPolicy(fastRefresh,regenerate)
    {
        /** @type {number} **/
        let combined;
        /** @type {number} **/
        let fmod;
        /** @type {number} **/
        let fval;
        fmod = fastRefresh;
        fval = regenerate;
        if ((fval == 25) || (fmod == 2)) {
            combined = 100;
        } else {
            combined = 50 + fmod * 25 + fval;
        }
        return await this.set_brightness(combined);
    }

    /**
     * Clears the display screen and resets all display layers to their default state.
     * Using this function in a sequence will kill the sequence play-back. Do not use that
     * function to reset the display at sequence start-up.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetAll()
    {
        await this.flushLayers();
        this.resetHiddenLayerFlags();
        return await this.sendCommand('Z');
    }

    /**
     * Forces an ePaper screen to perform a regenerative update using the slow
     * update method. Periodic use of the slow method (total panel update with
     * multiple inversions) prevents ghosting effects and improves contrast.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async regenerateDisplay()
    {
        return await this.sendCommand('z');
    }

    /**
     * Returns the current state of an ePaper display, specifically to
     * determine whether an update is in progress or whether a
     * configuration issue has been detected. If a display configuration
     * error has been detected, the error message can be retrieved.
     *
     * @param errmsg : a string passed by reference to receive the error message.
     *
     * @return a value among the enumeration YDisplay.DISPLAYSTATE
     *         (YDisplay.DISPLAYSTATE_FAILURE, YDisplay.DISPLAYSTATE_OFF,
     *         YDisplay.DISPLAYSTATE_POWERING, YDisplay.DISPLAYSTATE_IDLE,
     *         YDisplay.DISPLAYSTATE_REFRESHING)
     *         corresponding to the current display state.
     */
    async get_ePaperState(errmsg)
    {
        /** @type {Uint8Array} **/
        let json;
        /** @type {string} **/
        let jsonStr;
        /** @type {string} **/
        let dispError;
        /** @type {number} **/
        let dispState;

        if (await this.get_displayType() == YDisplay.DISPLAYTYPE_MONO) {
            errmsg = 'Not an ePaper display';
            return 0;
        }
        json = await this._download('disp.json');
        if ((json).length == 0) {
            errmsg = await this.get_errorMessage();
            return 0;
        } else {
            jsonStr = this._yapi.imm_bin2str(json);
            dispError = this.imm_decode_json_string(this.imm_get_json_path(jsonStr, 'err'));
            errmsg = dispError;
            if ((dispError).length > 0) {
                return 0;
            }
            dispState = this._yapi.imm_atoi(this.imm_json_get_key(json, 'state'));
            if (dispState > 10) {
                return 4;
            }
            if (dispState == 10) {
                return 3;
            }
            if (dispState > 0) {
                return 2;
            }
        }
        return 1;
    }

    /**
     * Disables screen refresh for a short period of time. The combination of
     * postponeRefresh and triggerRefresh can be used as an
     * alternative to double-buffering to avoid flickering during display updates.
     *
     * @param duration : duration of deactivation in milliseconds (max. 30 seconds)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async postponeRefresh(duration)
    {
        this._frozenUntil = this._yapi.GetTickCount() + duration;
        return await this.sendCommand('H'+String(Math.round(duration)));
    }

    /**
     * Triggers an immediate screen refresh. The combination of
     * postponeRefresh and triggerRefresh can be used as an
     * alternative to double-buffering to avoid flickering during display updates.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerRefresh()
    {
        this._frozenUntil = 0;
        await this.flushLayers();
        return await this.sendCommand('H0');
    }

    /**
     * Smoothly changes the brightness of the screen to produce a fade-in or fade-out
     * effect.
     *
     * @param brightness : the new screen brightness
     * @param duration : duration of the brightness transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async fade(brightness,duration)
    {
        await this.flushLayers();
        return await this.sendCommand('+'+String(Math.round(brightness))+','+String(Math.round(duration)));
    }

    /**
     * Starts to record all display commands into a sequence, for later replay.
     * The name used to store the sequence is specified when calling
     * saveSequence(), once the recording is complete.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async newSequence()
    {
        await this.flushLayers();
        this._sequence = '';
        this._recording = true;
        return this._yapi.SUCCESS;
    }

    /**
     * Stops recording display commands and saves the sequence into the specified
     * file on the display internal memory. The sequence can be later replayed
     * using playSequence().
     *
     * @param sequenceName : the name of the newly created sequence
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async saveSequence(sequenceName)
    {
        await this.flushLayers();
        this._recording = false;
        await this._upload(sequenceName, this._yapi.imm_str2bin(this._sequence));
        //We need to use YPRINTF("") for Objective-C
        this._sequence = '';
        return this._yapi.SUCCESS;
    }

    /**
     * Replays a display sequence previously recorded using
     * newSequence() and saveSequence().
     *
     * @param sequenceName : the name of the newly created sequence
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async playSequence(sequenceName)
    {
        await this.flushLayers();
        return await this.sendCommand('S'+sequenceName);
    }

    /**
     * Waits for a specified delay (in milliseconds) before playing next
     * commands in current sequence. This method can be used while
     * recording a display sequence, to insert a timed wait in the sequence
     * (without any immediate effect). It can also be used dynamically while
     * playing a pre-recorded sequence, to suspend or resume the execution of
     * the sequence. To cancel a delay, call the same method with a zero delay.
     *
     * @param delay_ms : the duration to wait, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async pauseSequence(delay_ms)
    {
        await this.flushLayers();
        return await this.sendCommand('W'+String(Math.round(delay_ms)));
    }

    /**
     * Stops immediately any ongoing sequence replay.
     * The display is left as is.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async stopSequence()
    {
        await this.flushLayers();
        return await this.sendCommand('S');
    }

    /**
     * Uploads an arbitrary file (for instance a GIF file) to the display, to the
     * specified full path name. If a file already exists with the same path name,
     * its content is overwritten.
     *
     * @param pathname : path and name of the new file to create
     * @param content : binary buffer with the content to set
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async upload(pathname,content)
    {
        await this.flushLayers();
        return await this._upload(pathname, content);
    }

    /**
     * Copies the whole content of a layer to another layer. The color and transparency
     * of all the pixels from the destination layer are set to match the source pixels.
     * This method only affects the displayed content, but does not change any
     * property of the layer object.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param srcLayerId : the identifier of the source layer (a number in range 0..layerCount-1)
     * @param dstLayerId : the identifier of the destination layer (a number in range 0..layerCount-1)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async copyLayerContent(srcLayerId,dstLayerId)
    {
        await this.flushLayers();
        return await this.sendCommand('o'+String(Math.round(srcLayerId))+','+String(Math.round(dstLayerId)));
    }

    /**
     * Swaps the whole content of two layers. The color and transparency of all the pixels from
     * the two layers are swapped. This method only affects the displayed content, but does
     * not change any property of the layer objects. In particular, the visibility of each
     * layer stays unchanged. When used between one hidden layer and a visible layer,
     * this method makes it possible to easily implement double-buffering.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param layerIdA : the first layer (a number in range 0..layerCount-1)
     * @param layerIdB : the second layer (a number in range 0..layerCount-1)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async swapLayerContent(layerIdA,layerIdB)
    {
        await this.flushLayers();
        return await this.sendCommand('E'+String(Math.round(layerIdA))+','+String(Math.round(layerIdB)));
    }

    /**
     * Returns a YDisplayLayer object that can be used to draw on the specified
     * layer. The content is displayed only when the layer is active on the
     * screen (and not masked by other overlapping layers).
     *
     * @param layerId : the identifier of the layer (a number in range 0..layerCount-1)
     *
     * @return an YDisplayLayer object
     *
     * On failure, throws an exception or returns null.
     */
    async get_displayLayer(layerId)
    {
        /** @type {number} **/
        let layercount;
        /** @type {number} **/
        let idx;
        layercount = await this.get_layerCount();
        if (!((layerId >= 0) && (layerId < layercount))) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'invalid DisplayLayer index',null);
        }
        if (this._allDisplayLayers.length == 0) {
            idx = 0;
            while (idx < layercount) {
                this._allDisplayLayers.push(new YDisplayLayer(this, idx));
                idx = idx + 1;
            }
        }
        return this._allDisplayLayers[layerId];
    }

    /**
     * Returns a color image with the current content of the display.
     * The image is returned as a binary object, where each byte represents a pixel,
     * from left to right and from top to bottom. The palette used to map byte
     * values to RGB colors is filled into the list provided as argument.
     * In all cases, the first palette entry (value 0) corresponds to the
     * screen default background color.
     * The image dimensions are given by the display width and height.
     *
     * @param palette : a list to be filled with the image palette
     *
     * @return a binary object if the call succeeds.
     *
     * On failure, throws an exception or returns an empty binary object.
     */
    async readDisplay(palette)
    {
        /** @type {Uint8Array} **/
        let zipmap;
        /** @type {number} **/
        let zipsize;
        /** @type {number} **/
        let zipwidth;
        /** @type {number} **/
        let zipheight;
        /** @type {number} **/
        let ziprotate;
        /** @type {number} **/
        let zipcolors;
        /** @type {number} **/
        let zipcol;
        /** @type {number} **/
        let zipbits;
        /** @type {number} **/
        let zipmask;
        /** @type {number} **/
        let srcpos;
        /** @type {number} **/
        let endrun;
        /** @type {number} **/
        let srcpat;
        /** @type {number} **/
        let srcbit;
        /** @type {number} **/
        let srcval;
        /** @type {number} **/
        let srcx;
        /** @type {number} **/
        let srcy;
        /** @type {number} **/
        let srci;
        /** @type {Uint8Array} **/
        let pixmap;
        /** @type {number} **/
        let pixcount;
        /** @type {number} **/
        let pixval;
        /** @type {number} **/
        let pixpos;
        /** @type {Uint8Array} **/
        let rotmap;
        pixmap = new Uint8Array(0);
        // Check if the display firmware has autoInvertDelay and pixels.bin support

        if (await this.get_autoInvertDelay() < 0) {
            // Old firmware, use uncompressed GIF output to rebuild pixmap
            zipmap = await this._download('display.gif');
            zipsize = (zipmap).length;
            if (zipsize == 0) {
                return pixmap;
            }
            if (!(zipsize >= 32)) {
                return this._throw(this._yapi.IO_ERROR,'not a GIF image',pixmap);
            }
            if (!((zipmap[0] == 71) && (zipmap[2] == 70))) {
                return this._throw(this._yapi.INVALID_ARGUMENT,'not a GIF image',pixmap);
            }
            zipwidth = zipmap[6] + 256 * zipmap[7];
            zipheight = zipmap[8] + 256 * zipmap[9];
            palette.length = 0;
            zipcol = zipmap[13] * 65536 + zipmap[14] * 256 + zipmap[15];
            palette.push(zipcol);
            zipcol = zipmap[16] * 65536 + zipmap[17] * 256 + zipmap[18];
            palette.push(zipcol);
            pixcount = zipwidth * zipheight;
            pixmap = new Uint8Array(pixcount);
            pixpos = 0;
            srcpos = 30;
            zipsize = zipsize - 2;
            while (srcpos < zipsize) {
                // load next run size
                endrun = srcpos + 1 + zipmap[srcpos];
                srcpos = srcpos + 1;
                while (srcpos < endrun) {
                    srcval = zipmap[srcpos];
                    srcpos = srcpos + 1;
                    srcbit = 8;
                    while (srcbit != 0) {
                        if (srcbit < 3) {
                            srcval = srcval + (zipmap[srcpos] << srcbit);
                            srcpos = srcpos + 1;
                        }
                        pixval = (srcval & 7);
                        srcval = (srcval >> 3);
                        if (!((pixval > 1) && (pixval != 4))) {
                            return this._throw(this._yapi.INVALID_ARGUMENT,'unexpected encoding',pixmap);
                        }
                        pixmap.set([pixval], pixpos);
                        pixpos = pixpos + 1;
                        srcbit = srcbit - 3;
                    }
                }
            }
            return pixmap;
        }
        // New firmware, use compressed pixels.bin
        zipmap = await this._download('pixels.bin');
        zipsize = (zipmap).length;
        if (zipsize == 0) {
            return pixmap;
        }
        if (!(zipsize >= 16)) {
            return this._throw(this._yapi.IO_ERROR,'not a pixmap',pixmap);
        }
        if (!((zipmap[0] == 80) && (zipmap[2] == 88))) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'not a pixmap',pixmap);
        }
        zipwidth = zipmap[4] + 256 * zipmap[5];
        zipheight = zipmap[6] + 256 * zipmap[7];
        ziprotate = zipmap[8];
        zipcolors = zipmap[9];
        palette.length = 0;
        srcpos = 10;
        srci = 0;
        while (srci < zipcolors) {
            zipcol = zipmap[srcpos] * 65536 + zipmap[srcpos+1] * 256 + zipmap[srcpos+2];
            palette.push(zipcol);
            srcpos = srcpos + 3;
            srci = srci + 1;
        }
        zipbits = 1;
        while ((1 << zipbits) < zipcolors) {
            zipbits = zipbits + 1;
        }
        zipmask = (1 << zipbits) - 1;
        pixcount = zipwidth * zipheight;
        pixmap = new Uint8Array(pixcount);
        srcx = 0;
        srcy = 0;
        srcval = 0;
        while (srcpos < zipsize) {
            // load next compression pattern byte
            srcpat = zipmap[srcpos];
            srcpos = srcpos + 1;
            srcbit = 7;
            while (srcbit >= 0) {
                // get next bitmap byte
                if ((srcpat & 128) != 0) {
                    srcval = zipmap[srcpos];
                    srcpos = srcpos + 1;
                    if (zipbits > 1) {
                        srcval = (srcval << 8) + zipmap[srcpos];
                        srcpos = srcpos + 1;
                    }
                }
                srcpat = (srcpat << 1);
                pixpos = srcy * zipwidth + srcx;
                // produce 8 pixels
                srci = 7 * zipbits;
                while (srci >= 0) {
                    pixval = ((srcval >> srci) & zipmask);
                    pixmap.set([pixval], pixpos);
                    pixpos = pixpos + 1;
                    srci = srci - zipbits;
                }
                srcy = srcy + 1;
                if (srcy >= zipheight) {
                    srcy = 0;
                    srcx = srcx + 8;
                    // drop last bytes if image is not a multiple of 8
                    if (srcx >= zipwidth) {
                        srcbit = 0;
                    }
                }
                srcbit = srcbit - 1;
            }
        }
        // rotate pixmap to match display orientation
        if (ziprotate == 0) {
            return pixmap;
        }
        if ((ziprotate & 2) != 0) {
            // rotate buffer 180 degrees by swapping pixels
            srcpos = 0;
            pixpos = pixcount - 1;
            while (srcpos < pixpos) {
                pixval = pixmap[srcpos];
                pixmap.set([pixmap[pixpos]], srcpos);
                pixmap.set([pixval], pixpos);
                srcpos = srcpos + 1;
                pixpos = pixpos - 1;
            }
        }
        if ((ziprotate & 1) == 0) {
            return pixmap;
        }
        // rotate 90 ccw: first pixel is bottom left
        rotmap = new Uint8Array(pixcount);
        srcx = 0;
        srcy = zipwidth - 1;
        srcpos = 0;
        while (srcpos < pixcount) {
            pixval = pixmap[srcpos];
            pixpos = srcy * zipheight + srcx;
            rotmap.set([pixval], pixpos);
            srcy = srcy - 1;
            if (srcy < 0) {
                srcx = srcx + 1;
                srcy = zipwidth - 1;
            }
            srcpos = srcpos + 1;
        }
        return rotmap;
    }

    /**
     * Continues the enumeration of displays started using yFirstDisplay().
     * Caution: You can't make any assumption about the returned displays order.
     * If you want to find a specific a display, use Display.findDisplay()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDisplay object, corresponding to
     *         a display currently online, or a null pointer
     *         if there are no more displays to enumerate.
     */
    nextDisplay()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YDisplay.FindDisplayInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of displays currently accessible.
     * Use the method YDisplay.nextDisplay() to iterate on
     * next displays.
     *
     * @return a pointer to a YDisplay object, corresponding to
     *         the first display currently online, or a null pointer
     *         if there are none.
     */
    static FirstDisplay()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Display');
        if(next_hwid == null) return null;
        return YDisplay.FindDisplay(next_hwid);
    }

    /**
     * Starts the enumeration of displays currently accessible.
     * Use the method YDisplay.nextDisplay() to iterate on
     * next displays.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YDisplay object, corresponding to
     *         the first display currently online, or a null pointer
     *         if there are none.
     */
    static FirstDisplayInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Display');
        if(next_hwid == null) return null;
        return YDisplay.FindDisplayInContext(yctx, next_hwid);
    }

    static imm_Const()
    {
        return Object.assign(super.imm_Const(), {
            ENABLED_FALSE                : 0,
            ENABLED_TRUE                 : 1,
            ENABLED_INVALID              : -1,
            STARTUPSEQ_INVALID           : YAPI.INVALID_STRING,
            BRIGHTNESS_INVALID           : YAPI.INVALID_UINT,
            AUTOINVERTDELAY_INVALID      : YAPI.INVALID_UINT,
            ORIENTATION_LEFT             : 0,
            ORIENTATION_UP               : 1,
            ORIENTATION_RIGHT            : 2,
            ORIENTATION_DOWN             : 3,
            ORIENTATION_INVALID          : -1,
            DISPLAYPANEL_INVALID         : YAPI.INVALID_STRING,
            DISPLAYWIDTH_INVALID         : YAPI.INVALID_UINT,
            DISPLAYHEIGHT_INVALID        : YAPI.INVALID_UINT,
            DISPLAYTYPE_MONO             : 0,
            DISPLAYTYPE_EPAPER_BW        : 1,
            DISPLAYTYPE_EPAPER_BWR       : 2,
            DISPLAYTYPE_EPAPER_BWRY      : 3,
            DISPLAYTYPE_INVALID          : -1,
            LAYERWIDTH_INVALID           : YAPI.INVALID_UINT,
            LAYERHEIGHT_INVALID          : YAPI.INVALID_UINT,
            LAYERCOUNT_INVALID           : YAPI.INVALID_UINT,
            COMMAND_INVALID              : YAPI.INVALID_STRING,
            FASTREFRESH_WHENEVER_POSSIBLE : 0,
            FASTREFRESH_WHENEVER_SUPPORTED : 1,
            FASTREFRESH_NEVER            : 2,
            FASTREFRESH_INVALID          : 3,
            REGENERATE_ON_REQUEST_ONLY   : 0,
            REGENERATE_EVERY_DAY         : 1,
            REGENERATE_EVERY_12H         : 2,
            REGENERATE_EVERY_6H          : 3,
            REGENERATE_EVERY_3H          : 4,
            REGENERATE_EVERY_2H          : 5,
            REGENERATE_EVERY_HOUR        : 6,
            REGENERATE_EVERY_30MIN       : 7,
            REGENERATE_EVERY_15MIN       : 8,
            REGENERATE_EVERY_480         : 9,
            REGENERATE_EVERY_432         : 10,
            REGENERATE_EVERY_360         : 11,
            REGENERATE_EVERY_288         : 12,
            REGENERATE_EVERY_240         : 13,
            REGENERATE_EVERY_192         : 14,
            REGENERATE_EVERY_144         : 15,
            REGENERATE_EVERY_96          : 16,
            REGENERATE_EVERY_48          : 17,
            REGENERATE_EVERY_36          : 18,
            REGENERATE_EVERY_24          : 19,
            REGENERATE_EVERY_12          : 20,
            REGENERATE_EVERY_10          : 21,
            REGENERATE_EVERY_8           : 22,
            REGENERATE_EVERY_6           : 23,
            REGENERATE_EVERY_4           : 24,
            REGENERATE_ALWAYS            : 25,
            REGENERATE_INVALID           : 26,
            DISPLAYSTATE_FAILURE         : 0,
            DISPLAYSTATE_OFF             : 1,
            DISPLAYSTATE_POWERING        : 2,
            DISPLAYSTATE_IDLE            : 3,
            DISPLAYSTATE_REFRESHING      : 4
        });
    }

    //--- (end of generated code: YDisplay implementation)

    async flushLayers()
    {
        if(this._allDisplayLayers) {
            for(var i = 0; i < this._allDisplayLayers.length; i++) {
                if(this._allDisplayLayers[i].imm_must_be_flushed()) {
                    await this._allDisplayLayers[i].flush_now();
                }
            }
        }
        return YAPI.SUCCESS;
    }

    async resetHiddenLayerFlags()
    {
        if(this._allDisplayLayers) {
            for(var i = 0; i < this._allDisplayLayers.length; i++) {
                await this._allDisplayLayers[i].resetHiddenFlag();
            }
        }
    }

    imm_resetHiddenLayerFlags()
    {
        if(this._allDisplayLayers) {
            for(var i = 0; i < this._allDisplayLayers.length; i++) {
                this._allDisplayLayers[i].imm_resetHiddenFlag();
            }
        }
    }

    async sendCommand(cmd)
    {
        if(!this._recording) {
            // ignore call when there is no ongoing sequence
            return await this.set_command(cmd);
        }
        this._sequence += cmd+'\n';
        return YAPI.SUCCESS;
    }
}

//
// YDisplayProxy Class: synchronous proxy to YDisplay objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YDisplay objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YDisplayProxy extends YFunctionProxy
{
    constructor(obj_func) {
        super(obj_func);
    }

    async _asyncInit()
    {
        await this.liveFunc.get_displayLayer(0);
    }

    //--- (generated code: YDisplay accessors declaration)

    /**
     * Returns true if the screen is powered, false otherwise.
     *
     * @return either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to true if the screen is
     * powered, false otherwise
     *
     * On failure, throws an exception or returns YDisplay.ENABLED_INVALID.
     */
    get_enabled()
    {
        return this.liveFunc._enabled;
    }

    /**
     * Changes the power state of the display.
     *
     * @param newval : either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to the power
     * state of the display
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval)
    {
        this.liveFunc.set_enabled(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the name of the sequence to play when the displayed is powered on.
     *
     * @return a string corresponding to the name of the sequence to play when the displayed is powered on
     *
     * On failure, throws an exception or returns YDisplay.STARTUPSEQ_INVALID.
     */
    get_startupSeq()
    {
        return this.liveFunc._startupSeq;
    }

    /**
     * Changes the name of the sequence to play when the display is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the name of the sequence to play when the display is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_startupSeq(newval)
    {
        this.liveFunc.set_startupSeq(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the luminosity of the  module informative LEDs (from 0 to 100).
     *
     * @return an integer corresponding to the luminosity of the  module informative LEDs (from 0 to 100)
     *
     * On failure, throws an exception or returns YDisplay.BRIGHTNESS_INVALID.
     */
    get_brightness()
    {
        return this.liveFunc._brightness;
    }

    /**
     * Changes the brightness of the display. The parameter is a value between 0 and
     * 100. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the brightness of the display
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_brightness(newval)
    {
        this.liveFunc.set_brightness(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the interval between automatic display inversions, or 0 if automatic
     * inversion is disabled. Using the automatic inversion mechanism reduces the
     * burn-in that occurs on OLED screens over long periods when the same content
     * remains displayed on the screen.
     *
     * @return an integer corresponding to the interval between automatic display inversions, or 0 if automatic
     *         inversion is disabled
     *
     * On failure, throws an exception or returns YDisplay.AUTOINVERTDELAY_INVALID.
     */
    get_autoInvertDelay()
    {
        return this.liveFunc._autoInvertDelay;
    }

    /**
     * Changes the interval between automatic display inversions.
     * The parameter is the number of seconds, or 0 to disable automatic inversion.
     * Using the automatic inversion mechanism reduces the burn-in that occurs on OLED
     * screens over long periods when the same content remains displayed on the screen.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the interval between automatic display inversions
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_autoInvertDelay(newval)
    {
        this.liveFunc.set_autoInvertDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the currently selected display orientation. The orientation is defined as the side of the
     * screen where the
     * USB connector (for OLED displays) or the ribbon cable (for ePaper panels) is located when the
     * display is up straight.
     *
     * @return a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the currently selected
     * display orientation
     *
     * On failure, throws an exception or returns YDisplay.ORIENTATION_INVALID.
     */
    get_orientation()
    {
        return this.liveFunc._orientation;
    }

    /**
     * Changes the display orientation. he orientation is defined as the side of the screen where the
     * USB connector (for OLED displays) or the ribbon cable (for ePaper panels) is located when the
     * display is up straight. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the display orientation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_orientation(newval)
    {
        this.liveFunc.set_orientation(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the exact model of the display panel.
     *
     * @return a string corresponding to the exact model of the display panel
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYPANEL_INVALID.
     */
    get_displayPanel()
    {
        return this.liveFunc._displayPanel;
    }

    /**
     * Changes the model of display to match the connected display panel.
     * This function has no effect if the module does not support the selected
     * display panel. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the model of display to match the connected display panel
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_displayPanel(newval)
    {
        this.liveFunc.set_displayPanel(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the display width, in pixels.
     *
     * @return an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYWIDTH_INVALID.
     */
    get_displayWidth()
    {
        return this.liveFunc._displayWidth;
    }

    /**
     * Returns the display height, in pixels.
     *
     * @return an integer corresponding to the display height, in pixels
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYHEIGHT_INVALID.
     */
    get_displayHeight()
    {
        return this.liveFunc._displayHeight;
    }

    /**
     * Returns the display type: monochrome OLED, black and white ePaper, color ePaper, and so on.
     *
     * @return a value among YDisplay.DISPLAYTYPE_MONO, YDisplay.DISPLAYTYPE_EPAPER_BW,
     * YDisplay.DISPLAYTYPE_EPAPER_BWR and YDisplay.DISPLAYTYPE_EPAPER_BWRY corresponding to the display
     * type: monochrome OLED, black and white ePaper, color ePaper, and so on
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYTYPE_INVALID.
     */
    get_displayType()
    {
        return this.liveFunc._displayType;
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplay.LAYERWIDTH_INVALID.
     */
    get_layerWidth()
    {
        return this.liveFunc._layerWidth;
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplay.LAYERHEIGHT_INVALID.
     */
    get_layerHeight()
    {
        return this.liveFunc._layerHeight;
    }

    /**
     * Returns the number of available layers to draw on.
     *
     * @return an integer corresponding to the number of available layers to draw on
     *
     * On failure, throws an exception or returns YDisplay.LAYERCOUNT_INVALID.
     */
    get_layerCount()
    {
        return this.liveFunc._layerCount;
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

    sendCommand(cmd)
    {
        this.liveFunc.sendCommand(cmd);
        return YAPI_SUCCESS;
    }

    flushLayers()
    {
        this.liveFunc.flushLayers();
        return YAPI_SUCCESS;
    }

    resetHiddenLayerFlags()
    {
        this.liveFunc.resetHiddenLayerFlags();
        return YAPI_SUCCESS;
    }

    /**
     * Changes the fast refresh usage policy and display regeneration minimal frequency
     * (ePaper displays only). These settings jointly determine when the screen should be
     * updated using a fast update versus or regenerated using a slower, flickering full
     * refresh.
     *
     * @param fastRefresh : a value among the YDisplay.FASTREFRESH enumeration
     *         (YDisplay.FASTREFRESH_WHENEVER_POSSIBLE,
     *         YDisplay.FASTREFRESH_WHENEVER_SUPPORTED,
     *         YDisplay.FASTREFRESH_NEVER),
     *         corresponding to the policy for using fast refresh.
     * @param regenerate : a value among the enumeration YRefFrame.REGENERATE
     *         (YDisplay.REGENERATE_ON_REQUEST_ONLY,
     *         YDisplay.REGENERATE_EVERY_DAY, YDisplay.REGENERATE_EVERY_12H,
     *         YDisplay.REGENERATE_EVERY_6H, YDisplay.REGENERATE_EVERY_3H,
     *         YDisplay.REGENERATE_EVERY_2H, YDisplay.REGENERATE_EVERY_HOUR,
     *         YDisplay.REGENERATE_EVERY_30MIN, YDisplay.REGENERATE_EVERY_15MIN,
     *         YDisplay.REGENERATE_EVERY_480, YDisplay.REGENERATE_EVERY_432,
     *         YDisplay.REGENERATE_EVERY_360, YDisplay.REGENERATE_EVERY_288,
     *         YDisplay.REGENERATE_EVERY_240, YDisplay.REGENERATE_EVERY_192,
     *         YDisplay.REGENERATE_EVERY_144, YDisplay.REGENERATE_EVERY_96,
     *         YDisplay.REGENERATE_EVERY_48, YDisplay.REGENERATE_EVERY_36,
     *         YDisplay.REGENERATE_EVERY_24, YDisplay.REGENERATE_EVERY_12,
     *         YDisplay.REGENERATE_EVERY_10, YDisplay.REGENERATE_EVERY_8,
     *         YDisplay.REGENERATE_EVERY_6, YDisplay.REGENERATE_EVERY_4,
     *         YDisplay.REGENERATE_ALWAYS),
     *         corresponding to the display minimal regeneration frequency.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_fastRefreshPolicy(fastRefresh,regenerate)
    {
        this.liveFunc.set_fastRefreshPolicy(fastRefresh, regenerate);
        return YAPI_SUCCESS;
    }

    /**
     * Clears the display screen and resets all display layers to their default state.
     * Using this function in a sequence will kill the sequence play-back. Do not use that
     * function to reset the display at sequence start-up.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetAll()
    {
        this.liveFunc.resetAll();
        return YAPI_SUCCESS;
    }

    /**
     * Forces an ePaper screen to perform a regenerative update using the slow
     * update method. Periodic use of the slow method (total panel update with
     * multiple inversions) prevents ghosting effects and improves contrast.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    regenerateDisplay()
    {
        this.liveFunc.regenerateDisplay();
        return YAPI_SUCCESS;
    }

    /**
     * Disables screen refresh for a short period of time. The combination of
     * postponeRefresh and triggerRefresh can be used as an
     * alternative to double-buffering to avoid flickering during display updates.
     *
     * @param duration : duration of deactivation in milliseconds (max. 30 seconds)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    postponeRefresh(duration)
    {
        this.liveFunc.postponeRefresh(duration);
        return YAPI_SUCCESS;
    }

    /**
     * Triggers an immediate screen refresh. The combination of
     * postponeRefresh and triggerRefresh can be used as an
     * alternative to double-buffering to avoid flickering during display updates.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerRefresh()
    {
        this.liveFunc.triggerRefresh();
        return YAPI_SUCCESS;
    }

    /**
     * Smoothly changes the brightness of the screen to produce a fade-in or fade-out
     * effect.
     *
     * @param brightness : the new screen brightness
     * @param duration : duration of the brightness transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    fade(brightness,duration)
    {
        this.liveFunc.fade(brightness, duration);
        return YAPI_SUCCESS;
    }

    /**
     * Starts to record all display commands into a sequence, for later replay.
     * The name used to store the sequence is specified when calling
     * saveSequence(), once the recording is complete.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    newSequence()
    {
        this.liveFunc.newSequence();
        return YAPI_SUCCESS;
    }

    /**
     * Stops recording display commands and saves the sequence into the specified
     * file on the display internal memory. The sequence can be later replayed
     * using playSequence().
     *
     * @param sequenceName : the name of the newly created sequence
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveSequence(sequenceName)
    {
        this.liveFunc.saveSequence(sequenceName);
        return YAPI_SUCCESS;
    }

    /**
     * Replays a display sequence previously recorded using
     * newSequence() and saveSequence().
     *
     * @param sequenceName : the name of the newly created sequence
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    playSequence(sequenceName)
    {
        this.liveFunc.playSequence(sequenceName);
        return YAPI_SUCCESS;
    }

    /**
     * Waits for a specified delay (in milliseconds) before playing next
     * commands in current sequence. This method can be used while
     * recording a display sequence, to insert a timed wait in the sequence
     * (without any immediate effect). It can also be used dynamically while
     * playing a pre-recorded sequence, to suspend or resume the execution of
     * the sequence. To cancel a delay, call the same method with a zero delay.
     *
     * @param delay_ms : the duration to wait, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pauseSequence(delay_ms)
    {
        this.liveFunc.pauseSequence(delay_ms);
        return YAPI_SUCCESS;
    }

    /**
     * Stops immediately any ongoing sequence replay.
     * The display is left as is.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    stopSequence()
    {
        this.liveFunc.stopSequence();
        return YAPI_SUCCESS;
    }

    /**
     * Uploads an arbitrary file (for instance a GIF file) to the display, to the
     * specified full path name. If a file already exists with the same path name,
     * its content is overwritten.
     *
     * @param pathname : path and name of the new file to create
     * @param content : binary buffer with the content to set
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    upload(pathname,content)
    {
        this.liveFunc.upload(pathname, content);
        return YAPI_SUCCESS;
    }

    /**
     * Copies the whole content of a layer to another layer. The color and transparency
     * of all the pixels from the destination layer are set to match the source pixels.
     * This method only affects the displayed content, but does not change any
     * property of the layer object.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param srcLayerId : the identifier of the source layer (a number in range 0..layerCount-1)
     * @param dstLayerId : the identifier of the destination layer (a number in range 0..layerCount-1)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    copyLayerContent(srcLayerId,dstLayerId)
    {
        this.liveFunc.copyLayerContent(srcLayerId, dstLayerId);
        return YAPI_SUCCESS;
    }

    /**
     * Swaps the whole content of two layers. The color and transparency of all the pixels from
     * the two layers are swapped. This method only affects the displayed content, but does
     * not change any property of the layer objects. In particular, the visibility of each
     * layer stays unchanged. When used between one hidden layer and a visible layer,
     * this method makes it possible to easily implement double-buffering.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param layerIdA : the first layer (a number in range 0..layerCount-1)
     * @param layerIdB : the second layer (a number in range 0..layerCount-1)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    swapLayerContent(layerIdA,layerIdB)
    {
        this.liveFunc.swapLayerContent(layerIdA, layerIdB);
        return YAPI_SUCCESS;
    }
    //--- (end of generated code: YDisplay accessors declaration)

    /**
     * Returns a YDisplayLayer object that can be used to draw on the specified
     * layer. The content is displayed only when the layer is active on the
     * screen (and not masked by other overlapping layers).
     *
     * @param layerId {number} : the identifier of the layer (a number in range 0..layerCount-1)
     *
     * @return {YDisplayLayer} an YDisplayLayer object
     *
     * On failure, throws an exception or returns null.
     */
    get_displayLayer(layerId)
    {
        return this.liveFunc._allDisplayLayers[layerId];
    }

    flushLayers()
    {
        this.liveFunc.flushLayers();
        return YAPI.SUCCESS;
    }

    resetHiddenLayerFlags()
    {
        this.liveFunc.resetHiddenLayerFlags();
        return YAPI.SUCCESS;
    }

    sendCommand(cmd)
    {
        this.liveFunc.sendCommand(cmd);
        return YAPI.SUCCESS;
    }
}

//--- (generated code: YDisplayLayer functions)

YoctoLibExport('YDisplayLayer', YDisplayLayer);
YDisplayLayer.imm_Init();

//--- (end of generated code: YDisplayLayer functions)

//--- (generated code: YDisplay functions)

YoctoLibExport('YDisplay', YDisplay);
YoctoLibExport('YDisplayProxy', YDisplayProxy);
YDisplay.imm_Init();

//--- (end of generated code: YDisplay functions)
