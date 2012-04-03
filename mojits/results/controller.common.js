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
            var page = ac.params.url('next');
            page = parseInt(page, 10) || 1;

            Y.mojito.models.twitter.search('jsconf', page, function (err, tweets) {
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
                        'text': v.text,
                        'profile_image_url': v.profile_image_url,
                        'from_user_id': v.from_user_id,
                        'from_user': v.from_user,
                        'id_str': v.id_str,
                        'created_at':v.created_at,
                        'to_user': v.to_user || "",
                        'in_reply_to_status_id_str': v.in_reply_to_status_id_str || "",
                        'from_user_name': v.from_user_name,
                        'to_user_id': v.to_user_id
                    });
                });

                ac.done(Y.mix({}, {tweets: data.tweets}));
            });
        }

    };

}, '0.0.1', {requires: ['mojito']});
