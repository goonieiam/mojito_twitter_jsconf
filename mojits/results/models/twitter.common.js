/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
YUI.add('twitter.results.model', function(Y) {

/**
 * The twitter.results.model module.
 *
 * @module twitter.results.model
 */

    /**
     * Constructor for the resultsModelFoo class.
     *
     * @class resultsModelFoo
     * @constructor
     */
    Y.mojito.models.twitter = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {Function} The callback function to call when the
         *        data has been retrieved.
         */
        search: function(query, callback) {
            var uri = 'http://search.twitter.com/search.json?q=' + encodeURIComponent(query);
            Y.io(uri, {
                on: {
                    success: function(id, o, args) {
                        var tweets;

                        try {
                            tweets = JSON.parse(o.responseText);
                        } catch (e) {
                            return callback(e);
                        }

                        return callback(null, tweets.results);
                    }
                }
            });
        }

    };

}, '0.0.1', {requires: ['io']});
