import app from './firebaseconfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

const auth = getAuth(app);
const database = getDatabase(app);

let Signupuser = (obj) => {
    return new Promise((resolve, reject) => {
        let { email, password, userName } = obj;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User Successfully Registered in Authentication
                const user = userCredential.user;
                const refrence = ref(database, `users/${user.uid}`)
                obj.id = user.uid;
                console.log(obj)
                set(refrence, obj)
                    .then(() => {
                        resolve("User Created Successfully")
                    }).catch((errr) => {
                        reject(errr);
                    })
            })
            .catch((err) => {
                reject(err);
            })
    })
};

let LoginUser = (obj) => {
    let { email, password } = obj;
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                const reference = ref(database, `users/${user.uid}`);
                onValue(reference, (e) => {
                    let status = e.exists();
                    console.log(status)
                    if (status) {
                        resolve(e.val());
                    }
                    else {
                        reject('Data Not Found');
                    }
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                // alert(errorMessage);
                reject(errorMessage);
            });
    });
};

export { Signupuser, LoginUser, database };