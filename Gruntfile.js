'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'index.html',
                    'chapter/*.html',
                    '*.css'
                ]
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            markdown: {
                files: [ 'template.html', 'src/*.md' ],
                tasks: [ 'markdown' ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('./'),
                        ];
                    }
                }
            },
        },
        
        markdown: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '*.md',
                    dest: 'chapter/',
                    ext: '.html'
                 }],
                 options: {
                     template: "template.html"
                 }
            }
        }
    });    

    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });
}
