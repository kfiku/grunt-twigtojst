/*
 * grunt-twigtojst
 * https://github.com/kfiku/grunt-twigtojst
 *
 * Copyright (c) 2014 Grzegorz Klimek
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('twigtojst', 'Exporting simple twig templates to jst', function() {
    var options = this.options({

    });

    this.files.forEach(function (f) {
      var content = grunt.file.read(f.src);
      content = content
                       // filters
                       .replace(/([a-z'"][a-z 0-9,\.'"]+)\|([a-z0-9_\-]+)/ig, 
                                'filter.$2($1)') 
                       // tags
                       .replace(/\{\{/ig, '<%=') // {{ -> <%=
                       .replace(/\}\}/ig, '%>')  // }} -> %>
                       .replace(/\{#/ig, '<!--') // {# -> <!--
                       .replace(/#\}/ig, '-->')  // #} -> -->
                       // for
                       .replace(/\{% ?for ([a-z0-9_\-\[\]\{\}\,\. ]+) in ([a-z0-9_\-]+) ?%\}/ig, 
                                '<% _.each($2, function($1) { %>')
                       .replace(/\{% ?endfor ?%\}/ig, 
                                '<% }); %>')
                       // if
                       .replace(/\{% ?if (.*) ?%\}/ig, 
                                '<% if($1) { %>')
                       .replace(/\{% ?endif ?%\}/ig, 
                                '<% } %>')
      ;
      var ifs = content.match(/(<%|{{|{%) ?(.*) ?(%>|}}|%})/ig);

      if (ifs && ifs.length) {
        for (var i = 0; i < ifs.length; i++) {
          if(ifs[i].indexOf('or') >= 0 || ifs[i].indexOf('and') >= 0) {
            var singleIf = ifs[i].replace(/ or /ig, ' || ')
                                 .replace(/ and /ig, ' && ');
            content = content.replace(ifs[i], singleIf);
          }
        }
      }

      grunt.file.write(f.dest, content);
      grunt.log.writeln('File "' + f.dest + '" created.');
      
    });
  });

};
