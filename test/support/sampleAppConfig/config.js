
/**
 * RequireJS configuration.
 * @module global/config
 */
define(function () {

    'use strict';

    requirejs.config({
        enforceDefine: false,
        paths: {
            'Router':'./route/Router',
            'PageController': './controller/PageController',
            'BasePage': './controller/BasePage',
            'Pages': './pages/Pages',
            'Repository': './components/Repository',
            'PageCommon': './pages/PageCommon',
            'Providers': './components/Providers'
        },
        map: {
            '*': {
                'jquery': 'jquery-private'
            },
            'jquery-private': {
                'jquery': 'jquery'
            }
        },
        shim: {}
    });
});
