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

    get db() {
        return firebase.database();
    }

    get auth() {
        return firebase.auth();
    }

    get_default_configurations() {
        const api = this;
        return api.db.ref('default_configurations').once('value');
    }

    check_if_user_exists(auth_data) {
        const api = this;
        return api.db
            .ref('users')
            .child(auth_data.uid)
            .once('value')
            .then(dataSnapshot => {
                return Promise.resolve({
                    auth_data,
                    exists: dataSnapshot.exists(),
                });
            });
    }

    update_user(user) {
        const api = this;
        api.check_if_user_exists(user).then(({auth_data, exists}) => {
            const provider_data = auth_data.providerData[0];
            if (exists) {
                for (let [key, val] of Object.entries(provider_data)) {
                    api.db.ref(`users/${auth_data.uid}/${key}/`).set(val);
                }
            } else {
                api.db.ref(`users/${auth_data.uid}`).set(provider_data);
            }
        });
    }

    save_config() {
        const api = this;
    }

}
