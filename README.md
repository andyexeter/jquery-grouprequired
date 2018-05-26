[//]: # (Do not edit README.md as it is automatically generated from src/README.tpl.md)

# jQuery groupRequired v2.0.6

[![Build status](https://img.shields.io/travis/andyexeter/jquery-grouprequired.svg)](https://travis-ci.org/andyexeter/jquery-grouprequired)
[![npm version](https://img.shields.io/npm/v/jquery-grouprequired.svg)](https://www.npmjs.com/package/jquery-grouprequired)
![Bower version](https://img.shields.io/bower/v/jquery-grouprequired.svg)
[![devDependency Status](https://img.shields.io/david/dev/andyexeter/jquery-grouprequired.svg)](https://david-dm.org/andyexeter/jquery-grouprequired#info=devDependencies)

A jQuery plugin to use the HTML5 required and require one of many elements

Say you have form with two inputs: telephone number and mobile number. You want the user to enter at least one
of those numbers, but you don't want to make both fields required. This plugin will set both fields as `required` but
will still allow the form to be submitted as long as one of them is filled.

## Installation

#### Download
* [jquery.grouprequired.min.js](https://unpkg.com/jquery-grouprequired@2.0.6/dist/jquery.grouprequired.min.js) (1.8kB, 773B gzipped)
* [jquery.grouprequired.js](https://unpkg.com/jquery-grouprequired@2.0.6/dist/jquery.grouprequired.js)  (4.58kB, 1.36kB gzipped)

#### CDN
```html
<script src="https://unpkg.com/jquery-grouprequired@2.0.6/dist/jquery.grouprequired.min.js"></script>
<!-- OR -->
<script src="https://unpkg.com/jquery-grouprequired@2.0.6/dist/jquery.grouprequired.js"></script>
```

#### Package Managers
Install via NPM:
```sh
$ npm install jquery-grouprequired --save
```

Install via Bower:
```sh
$ bower install jquery-grouprequired --save
```

## Usage

#### Standard Usage
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="https://unpkg.com/jquery-grouprequired@2.0.6/dist/jquery.grouprequired.min.js"></script>
<form>
  Telephone: <input type="tel" name="telephone" value="" required><br>
  Mobile: <input type="tel" name="mobile" value="" required><br>
  <input type="submit" value="Submit">
</form>
<script>
// When the DOM is loaded
$( function() {
	$( 'input[type=tel]' ).groupRequired( {
		errorMessage: 'Please enter at least one contact number'
	} );
} );
</script>
```

#### Browserify
```sh
$ npm install jquery-grouprequired --save
```

```js
var $ = require( 'jquery' );
require( 'jquery-grouprequired' );

$( 'input[type=tel]' ).groupRequired();
```

## Options

`namespace` - The unique plugin namespace for events etc. Defaults to `groupRequired`.

`errorMessage` - String or function which returns a string for custom error message.

`requiredFilter` - Function which returns a boolean dictating whether the group of elements should be required.

Using the `errorMessage` option as a function:
```js
$( 'input[type=tel]' ).groupRequired( {
	errorMessage: function( message, $fields, options, event ) {
		// do some logic checking with function arguments
		return message;
	}
} );
```

Modify the `$.fn.groupRequired` object to change default option values:

```js
$.fn.groupRequired.namespace = 'my_namespace';
```

## License

The MIT License (MIT)
Copyright (c) 2016 [The jQuery groupRequired authors](https://github.com/andyexeter/jquery-grouprequired/graphs/contributors)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
