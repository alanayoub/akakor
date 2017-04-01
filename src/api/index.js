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
    }

    get db() {
        return firebase.database();
    }

    get auth() {
        return firebase.auth();
    }

    get_configurations(type) {
        const api = this;
        let result;
        if (type === 'private') {
            result = api.db
                .ref(`configurations_${type}`)
                .child(api.current_user.uid)
                .once('value');
        }
        if (type === 'default') {
            result = api.db
                .ref(`configurations_${type}`)
                .once('value');
        }
        return result;
    }

    get_configuration_private(id) {
        const api = this;
        return api.db
            .ref(`configurations_private/${api.current_user.uid}/${id}`)
            .once('value');
    }

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

    update_user() {
        const api = this;
        api.check_if_user_exists().then(exists => {
            const provider_data = api.current_user.providerData[0];
            if (exists) {
                for (let [key, val] of Object.entries(provider_data)) {
                    api.db.ref(`users/${api.current_user.uid}/${key}/`).set(val);
                }
            } else {
                api.db.ref(`users/${api.current_user.uid}`).set(provider_data);
            }
        });
    }

    save({layout, id}) {
        const api = this;
        return new Promise(resolve => {
            api.check_if_config_exists(id).then(exists => {
                console.log('exists? ', exists);
                const updates = {};
                const path = `configurations_private/${api.current_user.uid}`;
                if (!exists) {
                    id = api.db.ref(`configurations_private/${api.current_user.uid}`).push().key;
                    updates[`${path}/${id}/title`] = 'Untitled';
                }
                updates[`${path}/${id}/layout`] = JSON.stringify(layout);
                api.db.ref().update(updates);
                resolve(id);
            });
        });
    }

}
