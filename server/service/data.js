const s = require('./s.js');

const listcardFn = table => s.data[table] = async (idToken, text) => {
  const user = await s.user.auth(idToken)
  if(!user || user.error) return user
  if( text && text != 'undefined' ) {
    const id = s.util.guid()
    s.firebase.set(`user/${user.uid}/${table}/${id}`, {id, text})
  }
  return await s.firebase.get(`user/${user.uid}/${table}`)
}

/* s.data.goal | text         */ listcardFn('goal')
/* s.data.affirmation | text  */ listcardFn('affirmation')
/* s.data.video | text        */ listcardFn('video')