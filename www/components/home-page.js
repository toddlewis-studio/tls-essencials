import s from '../services/s.js'
import {ListCard} from './home/list-card.js'
const {html, css, LitElement} = s.lit

export class HomePage extends LitElement {
    constructor() { super() ; this.init() }
    init = () => setTimeout(async () => {
        const user = await s.user.get()
        if(!user || user.error) return location.hash = '#login'
    }, 0)
    render = () => html`
        <ui-card bg="transparent">
            <div class="d-flex">
                <list-card table="affirmation"></list-card>
                <list-card table="goal"></list-card>
            </div>
        </ui-card>
        ${s.style.grids}
    `
  }
  customElements.define('home-page', HomePage)