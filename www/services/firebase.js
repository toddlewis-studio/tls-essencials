import s from './s.js'

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyDeh01echBr0N3evVDWWPEIYYr1LjBD9QY",
  
    authDomain: "essencials-9d7b4.firebaseapp.com",
  
    projectId: "essencials-9d7b4",
  
    storageBucket: "essencials-9d7b4.appspot.com",
  
    messagingSenderId: "584142672993",
  
    appId: "1:584142672993:web:4813b45f8e87be55300620",
  
    measurementId: "G-EQ9LPGQMZ6"
  
  };
  
  
  // Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const {uid, photoURL, email, displayName} = user
        s.user.auth(uid, photoURL, email, displayName)
    } else console.error(user)
    s.broadcast.send('user', user)
})

const persistentSignIn = () => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        var provider = new firebase.auth.GoogleAuthProvider()
        return firebase.auth().signInWithRedirect(provider)
    })
    .catch((error) => {
        var errorMessage = error.message
        console.error(errorMessage)
    })

s.firebase.idToken = () => firebase.auth().currentUser ? firebase.auth().currentUser.getIdToken(true)
    .then(function(idToken) {
        return idToken
    }).catch(function(error) {
        var errorMessage = error.message
        console.error(errorMessage)
    }) : {error: 'no current user'}

s.firebase.signIn = async () => {
    const res = await persistentSignIn();
    if(!res || res.error) return {error: res}
    const credential = res.credential
    const user = res.user

    const {uid, photoURL, email, displayName, refreshToken} = user
    const providerUID = user.providerData[0].uid
    const credentialAccessToken = credential.accessToken;
    const credentialIDToken = credential.idToken

    return {uid, photoURL, email, displayName, refreshToken, providerUID, credentialAccessToken, credentialIDToken}
}

s.firebase.signOut = async () => {
    const res = await firebase.auth().signOut()
    return res
}

s.firebase.get = async path => {
    const db = firebase.database()
    const res = await db.ref(path).once('value')
    return res.val()
}

s.firebase.on = async (path, fn) => {
    const db = firebase.database()
    const res = await db.ref(path).on('value', snap => fn(snap.val()) )
    return () => s.firebase.Off(path)
}

s.firebase.off = async path => {
    const db = firebase.database()
    const res = await db.ref(path).off()
}

s.firebase.set = async (path, obj) => {
    const db = firebase.database()
    const res = await db.ref(path).set(obj)
    return res
}

s.firebase.query = async (path, query) => {
    const db = firebase.database()
    let ref = await db.ref(path)
    return await query(ref)
}
export default null;