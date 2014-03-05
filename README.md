# grunt-twigtojst

Exporting simple twig templates to jst

## Getting Started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-twigtojst --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-twigtojst');
```

## The "twigtojst" task

### Overview
In your project's Gruntfile, add a section named `twigtojst` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  twigtojst: {
    options: {
      // no options
    },
    twigs: {
      expand: true,
      cwd: 'Views/',
      src: [
        'test1.html.twig',
        'test2.html.twig',
      ],
      dest: '.tmp/',
      ext: '.html'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
