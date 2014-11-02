
/**
 * RequireJS configuration.
 * @module global/config
 */
define(function () {

    'use strict';

    requirejs.config({
        enforceDefine: false,
        paths: {
            'app': 'app/app',
            'Backbone': 'vendor/backbone/backbone-1.1.2.min',
            'BasePage': 'app/pages/BasePage',
            'BetSlipAdapter': 'app/components/BetSlipAdapter',
            'CompetitionsPage': 'app/pages/CompetitionsPage',
            'DataAdapter': 'app/components/DataAdapter',
            'PreferencesProvider': 'app/components/PreferencesProvider',
            'URLProvider': 'app/components/URLProvider',
            'StorageProvider': 'app/components/StorageProvider',
            'EventPage': 'app/pages/EventPage',
            'HighlightsDOMAdapter': 'app/components/pageDataAdapters/HighlightsDOMAdapter',
            'HighlightsPage': 'app/pages/HighlightsPage',
            'jquery': 'vendor/jquery/jquery-1.11.0.min',
            'jquery-private': 'global/jquery-private',
            'loadmask': 'vendor/jquery/jquery.loadmask.min',
            'MatchesPage': 'app/pages/MatchesPage',
            'PageCommon': 'app/pages/PageCommon',
            'PageController': 'app/controllers/PageController',
            'Pages': 'app/pages/Pages',
            'Router': 'app/controllers/Router',
            'SportsDataRepository': 'app/components/SportsDataRepository',
            'SelectionViewAdapter': 'app/views/SelectionViewAdapter',
            'CompetitionViewAdapter': 'app/views/CompetitionViewAdapter',
            'EventViewAdapter': 'app/views/EventViewAdapter',
            'MarketViewAdapter': 'app/views/MarketViewAdapter',
            'MatchesViewProvider': 'app/views/MatchesViewProvider',
            'FilterViewAdapter': 'app/views/FilterViewAdapter',
            'LivescoreProvider': 'app/components/LivescoreProvider',
            'ScoreboardAdapter': 'app/views/ScoreboardAdapter',
            'Templates':'app/views/templates',
            'text': 'vendor/requirejs/text-2.0.10',
            'underscore': 'vendor/lodash/lodash.underscore-2.4.1.min'
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
