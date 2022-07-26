import s from '../../services/s.js'
const {html, css, LitElement} = s.lit

export class ListItem extends LitElement {
    constructor(user, table, item) {
        super()
        this.user = user
        this.table = table
        this.item = item
    }
    complete = () => {
        s.firebase.set(`user/${this.user.uid}/${this.table}/${this.item.id}`, null)
        s.broadcast.send('list-update', this.table, this.item)
    }
    render = () => html`
        <div class="card space-between">
            <span>${this.item.text}</span>
            ${!this.item.isComplete ? html`<button @click="${this.complete}">x</button>` : ''}
        </div>
        ${s.style.forms}
        ${s.style.grids}
    `
    static styles = css`
        .card{
            background: rgba(255, 255, 255, 0.3);
            padding: var(--s4);
        }
        @media screen and (max-width: 800px){
            .card{
                padding: var(--s2);
            }   
        }
    `
  }
  customElements.define('list-item', ListItem)