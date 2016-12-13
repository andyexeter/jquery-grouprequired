[//]: # (Do not edit README.md as it is automatically generated from src/README.tpl.md)

# <%= pkg.title %> v<%= pkg.version %>

[![Build status](https://img.shields.io/travis/andyexeter/<%= pkg.name %>.svg)](https://travis-ci.org/andyexeter/<%= pkg.name %>)
[![npm version](https://img.shields.io/npm/v/<%= pkg.name %>.svg)](https://www.npmjs.com/package/<%= pkg.name %>)
![Bower version](https://img.shields.io/bower/v/<%= bwr.name %>.svg)
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
Install via NPM:
```sh
$ npm install <%= pkg.name %> --save
```

Install via Bower:
```sh
$ bower install <%= bwr.name %> --save
```

## Usage

#### Standard Usage
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="https://unpkg.com/<%= pkg.name %>@<%= pkg.version %>/dist/<%= files.min.name %>"></script>
<form>
  Telephone: <input type="tel" name="telephone" value="" required><br>
  Mobile: <input type="tel" name="mobile" value="" required><br>
  <input type="submit" value="Submit">
</form>
<script>
// When the DOM is loaded
$( function() {
	$( 'input[type=tel]' ).groupRequired();
} );
</script>
```

#### Browserify
```sh
$ npm install <%= pkg.name %> --save
```

```js
var $ = require( 'jquery' );
require( '<%= pkg.name %>' );

$( 'input[type=tel]' ).groupRequired();
```

## Options

`namespace` - The unique plugin namespace for events etc. Defaults to `groupRequired`.

Modify the `$.fn.groupRequired` object to change default option values:

```js
$.fn.groupRequired.namespace = 'my_namespace';
```

## License

The MIT License (MIT)
Copyright (c) 2016 [The <%= pkg.title %> authors](<%= pkg.repository.url %>/graphs/contributors)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
