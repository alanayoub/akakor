import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';
import 'firebase/database';

export class API {

    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyAWPm9I7EinJ1eo_wvhJWzGZQ4FkyIf0tY",
            authDomain: "akakor-b9059.firebaseapp.com",
            databaseURL: "https://akakor-b9059.firebaseio.com",
            storageBucket: "akakor-b9059.appspot.com",
            messagingSenderId: "300145344405"
        });
    }

    set user(user) {
        const api = this;
        api.current_user = user;
        api.db.ref(`num_configs/${api.current_user.uid}`).on('value', snapshot => {
            api.num_configs = snapshot.val();
        });
    }

    get db() {
        return firebase.database();
    }

    get auth() {
        return firebase.auth();
    }

    //
    // Get a list of configurations, private or default
    // depending on paramater provided
    //
    get_configurations({type, token = '', callback}) {
        const api = this;
        let result;
        if (type === 'private') {
            result = api.db
                .ref(`configurations_${type}`)
                .child(api.current_user.uid)
                .on('value', callback);
        }
        if (type === 'default') {
            result = api.db
                .ref(`configurations_${type}`)
                .on('value', callback);
        }
        if (type === 'public') {
            result = api.db
                .ref(`configurations_${type}_read`)
                .orderByChild('title') // change to 'author_display_name'
                .startAt(token)
                .endAt(`${token}\uf8ff`)
                .limitToFirst(100)
                .on('value', callback);
        }
        return result;
    }

    //
    // Get a private configuration
    //
    get_configuration_private(id) {
        const api = this;
        return api.db
            .ref(`configurations_private/${api.current_user.uid}/${id}`)
            .once('value');
    }

    //
    // Check if the current user exists
    //
    check_if_user_exists() {
        const api = this;
        return api.db
            .ref('users')
            .child(api.current_user.uid)
            .once('value')
            .then(data => {
                return Promise.resolve(data.exists());
            });
    }

    //
    // Check if a configuration exists
    //
    check_if_config_exists(id) {
        const api = this;
        return api.db
            .ref('configurations_private')
            .child(api.current_user.uid)
            .child(id)
            .once('value')
            .then(data => {
                return Promise.resolve(data.exists());
            });
    }

    //
    // Delete a configuration
    //
    delete_configuration({id}) {
        const api = this;
        const updates = {};
        updates[`num_configs/${api.current_user.uid}`] = api.num_configs - 1;
        updates[`configurations_private/${api.current_user.uid}/${id}`] = null;
        api.db.ref().update(updates);
    }

    //
    // Create a new public copy of a config
    //
    create_public_copy({config, callback}) {
        const api = this;
        return new Promise(resolve => {
            const updates = {};
            const id = api.db.ref(`configurations_public/${api.current_user.uid}`).push().key;
            const path = `configurations_public/${api.current_user.uid}/${id}`;
            const user = api.current_user;
            updates[`${path}/author_id`] = user.uid;
            updates[`${path}/author_display_name`] = user.displayName;
            updates[`${path}/author_photo_url`] = user.photoURL;
            updates[`${path}/title`] = config.title;
            updates[`${path}/description`] = config.description;
            updates[`${path}/date_created`] = +new Date;
            updates[`${path}/version`] = 1;
            updates[`${path}/layout`] = config.layout;
            api.db.ref().update(updates);
            resolve(id);
        });
    }

    //
    // If the current user exists update their credentials
    // otherwise create a new user
    //
    update_user() {
        const api = this;
        return new Promise(resolve => {
            api.check_if_user_exists().then(exists => {
                const provider_data = api.current_user.providerData[0];
                const handler = () => {
                    api.db.ref(`users/${api.current_user.uid}`).once('value').then(user => {
                        resolve(user);
                    });
                }
                if (exists) {
                    const updates = {};
                    for (let [key, val] of Object.entries(provider_data)) {
                        updates[key] = val;
                    }
                    api.db.ref(`users/${api.current_user.uid}`).update(updates).then(handler);
                } else {
                    api.db.ref(`users/${api.current_user.uid}`).set(provider_data).then(handler);
                }
            });
        });
    }

    //
    // Update a configurate title
    //
    update_title({id, title}) {
        const api = this;
        return new Promise(resolve => {
            api.check_if_config_exists(id).then(exists => {
                if (!exists) return resolve(false);
                const updates = {};
                const path = `configurations_private/${api.current_user.uid}`;
                updates[`${path}/${id}/title`] = title;
                api.db.ref().update(updates);
                resolve(true);
            });
        });
    }

    //
    // Save a configuration
    //
    save({layout, id, title='Untitled'}) {
        const api = this;
        return new Promise(resolve => {
            api.check_if_config_exists(id).then(exists => {
                const updates = {};
                const path = `configurations_private/${api.current_user.uid}`;
                if (!exists) {
                    updates[`num_configs/${api.current_user.uid}`] = api.num_configs + 1;
                    id = api.db.ref(`configurations_private/${api.current_user.uid}`).push().key;
                }
                layout = typeof layout === 'string' ? layout : JSON.stringify(layout);
                updates[`${path}/${id}/title`] = title;
                updates[`${path}/${id}/layout`] = layout;
                api.db.ref().update(updates);
                resolve(id);
            });
        });
    }

}
