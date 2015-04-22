module.exports = function(grunt) {
    
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

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
                mangle: false
            },
            client: {
                files: {
                    'public/js/client.js': ['scripts/*.js']
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
                    'public/index.html': ['templates/*.jade']
                }
            }
        },

        autoprefixer: {
            options: {},
            no_dest: {
                src: 'public/css/app.css'
            }
        },

        watch: {
            uglify: {
                files: ['scripts/*.js'],
                tasks: ['uglify']
            },
            stylus: {
                files: ['styles/app.styl'],
                tasks: ['stylus']
            },
            jade: {
                files: ['templates/**/*.jade'],
                tasks: ['jade']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'public/css/*.css',
                    'public/*.html'
                ]
            }
        }

    });


    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-stylus'); 
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');

    // Register tasks
    grunt.registerTask('default', ['stylus','autoprefixer']);
    grunt.registerTask('server', ['connect','watch']);
}
