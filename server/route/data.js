const server = require('../util/server.js')
const s = require('../service/s.js')

module.exports = server.post('data', async body => {
  console.log('data', body.cmd)
  switch(body.cmd){
    case 'goal': return await s.data.goal( body.idToken, body.text )
    case 'affirmation': return await s.data.affirmation(body.idToken, body.text )
    case 'video': return await s.data.video( body.idToken, body.text )
  }
})