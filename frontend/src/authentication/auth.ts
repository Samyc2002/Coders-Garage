import firebase from '../config/firebase'

export const socialMediaAuth = (provider: firebase.auth.AuthProvider) => {

    return firebase
        .auth()
            .signInWithPopup(provider)
                .then((res) => {

                    return res.user;
                })
                .catch((err) => {

                    return err;
                });
};

export const socialMediaLogout = (provider: firebase.auth.AuthProvider) => {

    return firebase
        .auth()
            .signOut()
                .then((res) => {

                    return res;
                })
                .catch((err) => {
                    
                    return err;
                });
};