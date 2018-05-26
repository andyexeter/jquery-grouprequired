[//]: # (Do not edit README.md as it is automatically generated from src/README.tpl.md)

# <%= pkg.title %> v<%= pkg.version %>

[![Build status](https://img.shields.io/travis/andyexeter/<%= pkg.name %>.svg)](https://travis-ci.org/andyexeter/<%= pkg.name %>)
[![npm version](https://img.shields.io/npm/v/<%= pkg.name %>.svg)](https://www.npmjs.com/package/<%= pkg.name %>)
[![devDependency Status](https://img.shields.io/david/dev/andyexeter/<%= pkg.name %>.svg)](https://david-dm.org/andyexeter/<%= pkg.name %>#info=devDependencies)

<%= pkg.description %>

Say you have form with two inputs: telephone number and mobile number. You want the user to enter at least one
of those numbers, but you don't want to make both fields required. This plugin will set both fields as `required` but
will still allow the form to be submitted as long as one of them is filled.

## Installation

#### Download
* [<%= files.min.name %>](https://unpkg.com/<%= pkg.name %>@<%= pkg.version %>/dist/<%= files.min.name %>) (<%= files.min.size %>, <%= files.min.gzipped %> gzipped)
* [<%= files.main.name %>](https://unpkg.com/<%= pkg.name %>@<%= pkg.version %>/dist/<%= files.main.name %>)  (<%= files.main.size %>, <%= files.main.gzipped %> gzipped)

#### CDN
```html
<script src="https://unpkg.com/<%= pkg.name %>@<%= pkg.version %>/dist/<%= files.min.name %>"></script>
<!-- OR -->
<script src="https://unpkg.com/<%= pkg.name %>@<%= pkg.version %>/dist/<%= files.main.name %>"></script>
```

#### Package Managers
Install via yarn:
```sh
$ yarn add <%= pkg.name %>
```

Install via NPM:
```sh
$ npm install <%= pkg.name %> --save
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
<script src="https://unpkg.com/<%= pkg.name %>@<%= pkg.version %>/dist/<%= files.min.name %>"></script>
<script>
$(function () {
    $('input[type=tel]').groupRequired({
        errorMessage: 'Please enter at least one contact number'
    });
});
</script>
```

#### Browserify
```sh
$ npm install <%= pkg.name %> --save
```

```js
var $ = require('jquery');
require('<%= pkg.name %>')($);

$('input[type=tel]').groupRequired();
```

## Options

`namespace` - The unique plugin namespace for events etc. Defaults to `groupRequired`.

`errorMessage` - String or function which returns a string for custom error message.

`requiredFilter` - Function which returns a boolean dictating whether the group of elements should be required.

Using the `errorMessage` option as a function:
```js
$('input[type=tel]').groupRequired({
    errorMessage: function (message, $fields, options, event) {
        // do some logic checking with function arguments
        return message;
    }
});
```

Modify the `$.fn.groupRequired` object to change default option values:

```js
$.fn.groupRequired.namespace = 'my_namespace';
```

## License

The MIT License (MIT)
Copyright (c) <%= grunt.template.today('yyyy') %> [The <%= pkg.title %> authors](<%= pkg.repository.url %>/graphs/contributors)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
