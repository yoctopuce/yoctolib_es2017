Yoctopuce EcmaScript 2017 library
=================================

## What is this library good for ?

This library provides access to [Yoctopuce devices](https://www.yoctopuce.com) for Node.js v7.6 and later.
Asynchronous communication with the devices is handled across the whole library using Promise objects, 
leveraging the new EcmaScript 2017 `async` / `await` non-blocking syntax for asynchronous I/O.

Happily 2017 is there, and `async` / `await` is available out-of-the-box in Node.js v7.6 and later.
No transpilation is needed: no Babel, no jspm, just plain Javascript.

If you need backward-compatibility with older releases, you can always run `Babel` to transpile your code
and the library to older standards, as described at the end of this document. 

We don't suggest using `jspm 0.17` anymore since that tool is still in Beta after 18 month, and having to
use an extra tool to implement our library is pointless now that `async`/ `await` are standard.

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

