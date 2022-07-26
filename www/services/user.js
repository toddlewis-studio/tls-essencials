import s from './s.js';
let authUser, user

s.user.getAuth = async () => authUser
s.user.get = async () => user

s.user.auth = async (uid, displayName, email, photoURL) => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) {
        s.broadcast.send('user', idToken)
        return idToken
    }
    if(!user) user = {uid, displayName, email, photoURL}
    const res = await s.post('user', {cmd: 'auth', idToken})
    // console.log('auth', res)
    if(res && res.uid) authUser = res
    const userRes = await s.user.loadUser(res.uid)
    console.log(userRes)
    s.broadcast.send('user', userRes)
}

s.user.loadUser = async uid => {
    if(!uid && authUser) uid = authUser.uid
    else if(!uid && user) uid = user.uid
    const userRes = await s.firebase.get(`user/${uid}`)
    if(userRes && userRes.uid) user = userRes
    return user
}

s.user.setUsername = async username => {
    const user = await s.user.get()
    await s.firebase.Set(`user/${user.uid}/username`, username)
}

s.user.setProfilePicture = async url => {
    const user = await s.user.get()
    await s.firebase.Set(`user/${user.uid}/img`, url)
}

export default null;