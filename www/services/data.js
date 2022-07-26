import s from './s.js'

s.data.goal = async text => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'goal', idToken, text})
    // console.log('goal', res)
    return res
}
s.data.affirmation = async text => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'affirmation', idToken, text})
    // console.log('affirmation', res)
    return res
}
s.data.video = async text => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'video', idToken, text})
    // console.log('video', res)
    return res
}

export default {}