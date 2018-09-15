[//]: # (Do not edit README.md as it is automatically generated from src/README.tpl.md)

# jQuery groupRequired v2.2.0

[![Build status](https://img.shields.io/travis/andyexeter/jquery-grouprequired.svg)](https://travis-ci.org/andyexeter/jquery-grouprequired)
[![npm version](https://img.shields.io/npm/v/jquery-grouprequired.svg)](https://www.npmjs.com/package/jquery-grouprequired)
[![devDependency Status](https://img.shields.io/david/dev/andyexeter/jquery-grouprequired.svg)](https://david-dm.org/andyexeter/jquery-grouprequired#info=devDependencies)

A jQuery plugin to use the HTML5 required attribute and require one of many elements

Say you have form with two inputs: telephone number and mobile number. You want the user to enter at least one
of those numbers, but you don't want to make both fields required. This plugin will set both fields as `required` but
will still allow the form to be submitted as long as one of them is filled.

## Installation

#### Download
* [jquery.grouprequired.min.js](https://unpkg.com/jquery-grouprequired@2.2.0/dist/jquery.grouprequired.min.js) (1.56kB, 710B gzipped)
* [jquery.grouprequired.js](https://unpkg.com/jquery-grouprequired@2.2.0/dist/jquery.grouprequired.js)  (4.24kB, 1.35kB gzipped)

#### CDN
```html
<script src="https://unpkg.com/jquery-grouprequired@2.2.0/dist/jquery.grouprequired.min.js"></script>
<!-- OR -->
<script src="https://unpkg.com/jquery-grouprequired@2.2.0/dist/jquery.grouprequired.js"></script>
```

#### Package Managers
Install via yarn:
```sh
$ yarn add jquery-grouprequired
```

Install via NPM:
```sh
$ npm install jquery-grouprequired --save
```

## Usage

#### Standard Usage
```html
<form>
  Telephone: <input type="tel" name="telephone" value="" required><br>
  Mobile: <input type="tel" name="mobile" value="" required><br>
  <input type="submit" value="Submit">
</form>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="https://unpkg.com/jquery-grouprequired@2.2.0/dist/jquery.grouprequired.min.js"></script>
<script>
$(function () {
    $('input[type=tel]').groupRequired({
        errorMessage: 'Please enter at least one contact number'
    });
});
</script>
```

#### Webpack / Browserify
```sh
$ yarn add jquery-grouprequired
```

```js
var $ = require('jquery');
require('jquery-grouprequired')($);

$('input[type=tel]').groupRequired();
```

## Options

| Option         | Type               | Description                                                                                  | Default           |
|----------------|--------------------|----------------------------------------------------------------------------------------------|-------------------|
| errorMessage   | `string\|function` | Custom error message                                                                         | `''`              |
| requiredFilter | `function`         | Function which returns a boolean dictating whether the group of elements should be required. | `null`            |
| namespace      | `string`           | Unique plugin namespace for events and data                                                  | `'groupRequired'` |

Using the `errorMessage` option as a function:
```js
$('input[type=tel]').groupRequired({
    errorMessage: function (pluginInstance, event) {
        // do some logic checking with function arguments
        // 'this' is bound to the current input element
        return 'Please enter a number';
    }
});
```

Modify the `$.fn.groupRequired` object to change default option values:

```js
$.fn.groupRequired.namespace = 'my_namespace';
```

## License

Released under the [MIT license](LICENSE)
