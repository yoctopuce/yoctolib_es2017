Yoctopuce library as an ECMAScript module
=========================================

## What is this library good for ?

This library provides access to [Yoctopuce devices](https://www.yoctopuce.com) for Node.js v14 and later.
It handles asynchronous communication with the devices using Promise objects, 
leveraging the new EcmaScript 2017 `async` / `await` non-blocking syntax for asynchronous I/O.

This npm module [yoctolib-esm](https://www.npmjs.com/package/yoctolib-esm) follows the new
ECMAScript module standard, instead of the traditional CommonJS format used in the past.
This facilitates static resolution of dependencies and type checking. If you need a
CommonJS version, use the npm package 
[yoctolib-es2017](https://www.npmjs.com/package/yoctolib-es2017) instead.

You will find examples in the zipped library on [Yoctopuce web site](https://www.yoctopuce.com/EN/libraries.php)
and on [GitHub](https://github.com/yoctopuce/yoctolib_es2017).

## License information

Copyright (C) 2015 and beyond by Yoctopuce Sarl, Switzerland.

Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
non-exclusive license to use, modify, copy and integrate this
file into your software for the sole purpose of interfacing
with Yoctopuce products.

You may reproduce and distribute copies of this file in
source or object form, as long as the sole purpose of this
code is to interface with Yoctopuce products. You must retain
this notice in the distributed source file.

You should refer to Yoctopuce General Terms and Conditions
for additional information regarding your rights and
obligations.

THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA,
COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR
SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT
LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
WARRANTY, OR OTHERWISE.

