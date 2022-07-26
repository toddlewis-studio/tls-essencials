// services
import s from './services/s.js'
import broadcast from './services/broadcast.js'
import data from './services/data.js'
import firebase from './services/firebase.js'
import lit from './services/lit.js'
import post from './services/post.js'
import routes from './services/routes.js'
import style from './services/style.js'
import user from './services/user.js'
// components
import ui from './components/ui/ui.js'

const app = document.querySelector('#app')
let cacheComponent = {}
onhashchange = () => {
    if(!cacheComponent[s.routes[location.hash]])
        cacheComponent[s.routes[location.hash]] = document.createElement( s.routes[location.hash] )
    app.innerHTML = ''
    app.appendChild( cacheComponent[s.routes[location.hash]] )
    s.broadcast.send('hash', location.hash)
}
onhashchange()