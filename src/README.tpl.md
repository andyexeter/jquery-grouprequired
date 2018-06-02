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

#### Webpack / Browserify
```sh
$ yarn add <%= pkg.name %>
```

```js
var $ = require('jquery');
require('<%= pkg.name %>')($);

$('input[type=tel]').groupRequired();
```

## Options

| Option         | Type                   | Description                                                                                  | Default           |
|----------------|------------------------|----------------------------------------------------------------------------------------------|-------------------|
| errorMessage   | `string` or `function` | Custom error message                                                                         | `''`              |
| requiredFilter | `function`             | Function which returns a boolean dictating whether the group of elements should be required. | `null`            |
| namespace      | `string`               | Unique plugin namespace for events and data                                                  | `'groupRequired'` |

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

Released under the [MIT license](LICENSE)
