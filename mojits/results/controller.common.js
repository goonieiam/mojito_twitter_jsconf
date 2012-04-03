/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
YUI.add('twitter.results.controller', function (Y, NAME) {

/**
 * The results module.
 *
 * @module results
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.mojito.controllers[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        search: function(ac) {
            Y.mojito.models.twitter.search('jsconf', function (err, tweets) {
                var data = {
                    tweets: []
                };

                if (err) {
                    Y.log(err.message);
                    return;
                }

                Y.each(tweets, function (v) {
                    Y.log(v);
                    data.tweets.push({
                        'author': v.from_user,
                        'text': v.text
                    });
                });

                ac.done(Y.mix({}, {tweets: data.tweets}));
            });
        }

    };

}, '0.0.1', {requires: ['mojito']});
