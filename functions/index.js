'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//
// Copy items posted to configurations_public/uid to configurations_public_read
//
exports.sync_public_configs = functions.database
    .ref('/configurations_public/{uid}/{config_id}').onWrite(event => {
        const message = event.data.val();
        const item = {};
        const valid_fields = [
            'author_id',
            'author_display_name',
            'author_photo_url',
            'title',
            'description',
            'date_created',
            'version',
            'layout'
        ];
        valid_fields.forEach(field => {
            if (message[field] !== void 0) item[field] = message[field];
        });
        admin.database().ref('/configurations_public_read').push(item).then(snapshot => {
            console.log('added new item', snapshot);
        });
    });
