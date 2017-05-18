Yoctopuce EcmaScript 2017 library
=================================

## Content of this package

* **example_html/**
	Example files that run within a web browser
* **example_node/**
	Example files that run on node.js
* **lib/**
	Yoctopuce library files, as distributed in npm package `yoctolib-es2017`.
* **LICENCE.txt**
	Yoctopuce Licence

## What is this library good for ?

This library provides access to [Yoctopuce devices](https://www.yoctopuce.com) for modern JavaScript
engines. It can be used within a browser as well as with Node.js. Asynchronous communication with the devices
is handled across the whole library using Promise objects, leveraging the new EcmaScript 2017 `async` /
`await` non-blocking syntax for asynchronous I/O.

Happily 2017 is there, and `async` / `await` is available out-of-the-box in most Javascript engines.
No transpilation is needed: no Babel, no jspm, just plain Javascript.
Here is your favorite engines minimum version needed to run this code. All of them are officially released at the time we 
write this document.
- Node.js v7.6 and later
- Firefox 52
- Opera 42 (incl. Android version)
- Chrome 55 (incl. Android version)
- Safari 10.1 (incl. iOS version)
- Android WebView 55
- Google V8 Javascript engine v5.5

If you need backward-compatibility with older releases, you can always run `Babel` to transpile your code
and the library to older standards, as described at the end of this document. 

We don't suggest using `jspm 0.17` anymore since that tool is still in Beta after 18 month, and having to
use an extra tool to implement our library is pointless now that `async`/ `await` are standard.

## Using the official Yoctopuce library with node.js

Start by installing **Node.js** version 7.6 or later on your system, because you'll need it. It is very easy.
On Windows, you only have to run the npm installer and that's it. Make sure to install it fully,
including npm, and add it to the system path.

To give it a try, go into one of the example directory (for instance `example_nodejs/Doc-Inventory`). You will
see that it include an application description file (`package.json`) and a source file (`demo.js`). To 
download and setup the libraries needed by this example, run:
```bash
npm install
```
Once done, you can start the example file using
```bash
node demo.js
```

## Using the local Yoctopuce library with node.js

If for some reason you need to make changes to the Yoctopuce library, you can easily configure your
project to use the local copy in the `lib/` subdirectory rather than the official npm package. In order 
to do so, simply type the following command in your project directory: 
```bash
npm link ../../lib
```
This will tell node.js to use the version of the library found in the specified path. 

## Using the Yoctopuce library within a browser (HTML)

For HTML examples, it is even simpler: there is nothing to install. Each example is a single HTML file that
you can open in a browser to try it. In this context, loading the Yoctopuce library is no different from
any standard HTML script include tag.

## Using the Yoctopuce library on older JavaScript engines

If you need to run this library on older JavaScript engines,
you can use [Babel](https://babeljs.io/) to transpile your code and the library into
older JavaScript standards. To install Babel with typical settings, simply use
```bash
npm instal -g babel-cli
npm instal babel-preset-env
```
You would typically ask Babel to put the transpiled files in another directory, 
named `compat` for instance. Your files and all files of the Yoctopuce library
should be transpiled, as follow:
```bash
babel --presets env demo.js --out-dir compat/
babel --presets env ../../lib --out-dir compat/
```
Although this approach is based on node.js toolchain, it actually works as well for
transpiling JavaScript files for use in a browser. The only thing that you cannot do
so easily is transpiling JavaScript code embedded directly in an HTML page. You have
to use an external script file for using EcmaScript 2017 syntax with Babel.

Babel has many smart features, such as a *watch* mode that will automatically refresh
transpiled files whenever the source file is changed, but this is beyond the scope of this
note. You will find more in Babel documentation.

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

