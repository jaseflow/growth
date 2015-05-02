module.exports = function(grunt) {

    var mozjpeg = require('imagemin-mozjpeg');
    var envToUse = grunt.option('env') || 'production';
    var env = require('./_environments/' + envToUse + '.js');
    var s3 = require('./_config/s3.js');
    grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),
            releaseDirectory: 'releases/<%= pkg.version %>-' + envToUse,

            stylus: {
                compile: {
                    options: {
                        "include css": true
                    },
                    files: {
                        'public/css/app.css': 'styles/app.styl'
                    }
                }
            },
            compress: {
                options: 'gzip',
                assets: {
                    expand: true,
                    cwd: 'public/css',
                    src: '*',
                    dest: 'public/css',
                    ext: '.gz.css'
                }
            },
            clean: {
                release : ['<%= releaseDirectory %>/']
            },
            copy: {
                release: {
                    expand: true,
                    cwd: 'public',
                    src: '**',
                    dest: '<%= releaseDirectory %>/'
                } 
            },
            imagemin: {
                dynamic: {
                    options: {
                        optimizationLevel: 3,
                        svgoPlugins: [{ removeViewBox: false }],
                        use: [mozjpeg()]
                    },
                    files: [{
                        expand: true,
                        cwd: 'assets/images',
                        src: ['**/*.{png,jpg,gif,svg}'],
                        dest: 'public/images'
                    }]
                }
            },
            connect: {
                server: {
                    options: {
                        port: 8000,
                        useAvailablePort: true,
                        base: 'public',
                        hostname: '*',
                        livereload: true
                    }
                }
            },
            uglify: {
                options: {
                    mangle: false,
                    compress: false
                },
                client: {
                    files: {
                        'public/js/client.js': ['scripts/*.js'],
                    }
                }
            },
            jade: {
                compile: {
                    options: {
                        data: function(dest, src){
                            return require('./models/db.json');
                        }
                    },
                    files: {
                        'public/index.html': ['templates/index.jade'],
                        'public/admin/index.html': ['templates/admin.jade'],
                        'public/student/index.html': ['templates/student.jade'],
                        'public/student/courses.html': ['templates/courses.jade'],
                        'public/student/module.html': ['templates/module.jade']
                    }
                }
            },
            autoprefixer: {
                options: {},
                no_dest: {
                    src: 'public/css/app.css'
                }
            },
            aws_s3: {
                release: {
                    options: {
                        accessKeyId: s3.accessKeyId, // Use the variables
                        secretAccessKey: s3.secretAccessKey, // You can also use env variables
                        region: env.s3.region,
                        bucket: env.s3.bucket,
                        uploadConcurrency: 5, // 5 simultaneous uploads
                        downloadConcurrency: 5, // 5 simultaneous downloads
                    },
                    files: [
                        {
                            expand: true, 
                            dest: '.', 
                            cwd: '<%= releaseDirectory %>/', 
                            src: ['**'], 
                            action: 'upload',
                            differential: true
                        },
                        { 
                            dest: '/', 
                            cwd: '<%= releaseDirectory %>/', 
                            action: 'delete',
                            differential: true
                        }
                    ]
                }
            },
            html2js: {
                options: {
                    jade: {
                        doctype: 'html'
                    },
                    watch: true
                },
                main: {
                    src: ['templates/**/*.jade'],
                    dest: 'public/templates/templates.js'
                }
            },
            watch: {
                uglify: {
                    files: ['scripts/*.js'],
                    tasks: ['uglify']
                },
                compileStyles: {
                    files: ['styles/**/*.styl'],
                    tasks: ['stylus','autoprefixer']
                },
                jade: {
                    files: ['templates/**/*.jade','modules/**/*.md'],
                    tasks: ['jade']
                },
                imagemin: {
                    files: ['assets/images/*.{jpg,gif,png,svg}'],
                    tasks: ['imagemin'] 
                },
                livereload: {
                    options: {
                        livereload: true
                    },
                    files: [
                        'public/**/*'
                    ]
                }
            }

    });


    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-stylus'); 
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-html2js');

    // Register tasks
    grunt.registerTask('build', ['stylus','autoprefixer','uglify', 'jade','imagemin']);
    grunt.registerTask('server', ['connect','watch']);
    grunt.registerTask('deploy',
        [
            'build',
            'clean:release',
            'copy:release',
            'aws_s3:release'
        ]
    );
}
