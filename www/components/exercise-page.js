import s from '../services/s.js'
const {html, css, LitElement} = s.lit

export class ExercisePage extends LitElement {
    constructor() { super() ; this.init() }
    init = () => setTimeout(async () => {
        console.log('home init')    
        const user = await s.user.get()
        if(!user || user.error) return location.hash = '#login'
    }, 0)
    render = () => html`
        <ui-card bg="transparent">
            <list-card table="video"></list-card>
        </ui-card>
        ${s.style.forms}
    `
  }
  customElements.define('exercise-page', ExercisePage)