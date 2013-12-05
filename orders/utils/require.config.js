requirejs.config({
    baseUrl: '../orders',
    paths: {
        jquery: './utils/jquery',
        underscore: './utils/underscore',
        backbone: './utils/backbone',
        text: './utils/require_text',
        jst: './utils/require_jst'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});
