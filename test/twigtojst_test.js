'use strict';

var grunt = require('grunt');
var _ = require('lodash-node');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.twigtojst = {
  areFiles: function(test) {
    test.expect(1);

    var isFile1 = grunt.file.isFile('tmp/test1.html');
    var isFile2 = grunt.file.isFile('tmp/test2.html');
    var isFile3 = grunt.file.isFile('tmp/test3.html');
    console.log(isFile3);
    test.ok(isFile1 && isFile2 && isFile3, 'No generated htmls');
    test.done();
  },

  areJst: function(test) {
    test.expect(1);

    var isFile1 = grunt.file.isFile('tmp/templates.js');
    test.ok(isFile1, 'No generated templates');

    test.done();
  },

  jst: function(test) {
    test.expect(1);
    var modContent = 'module.exports = function(_) {';
    modContent += grunt.file.read('tmp/templates.js');
    modContent += ' return this["JST"] ';
    modContent += '};';
    grunt.file.write('tmp/templatesMod.js', modContent);
    var templates = require('./../tmp/templatesMod.js', _)(_);
    var generatedTemplate = templates['tmp/test2.html']({seq: [
      { name: 'Name 1', description: 'Description 1' },
      { name: 'Name 1' }
    ]}); 
    test.ok(generatedTemplate, 'should describe what the default behavior is.');

    test.done();
  },
};
