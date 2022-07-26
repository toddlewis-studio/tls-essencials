import s from '../../services/s.js'
const {html, css, LitElement} = s.lit

export class TopNav extends LitElement {
    static properties = {
        links: {type: String}
    }
    constructor() {
        super()
        this.links = ''
        s.broadcast.on('hash', hash => this.update())
    }
    render = () => html`
        <nav>
            <ui-card bg="transparent">
                <div class="space-between">
                    <a class="brand ${location.hash === '#login' ? 'active' : ''}" href="#login">Essencials</a>
                    <ul>
                        ${this.links.split(',').map(obj => {
                            const text = obj.split(':')[0]
                            const component = obj.split(':')[1]
                            let hasClass = Object.keys(s.routes)
                                .filter(k => s.routes[k] === component)
                                .find(k => k === location.hash) !== undefined
                            const href = Object.keys(s.routes).find(h=>component===s.routes[h]) || '#'
                            return html`<li><a @click="${() => setTimeout(() => this.update(), 1)}" class="${hasClass ? 'active' : ''}" href="${href}">${text}</a></li>`
                        })}
                    </ul>                
                </div>
            </ui-card>
        </nav>
    `
    static styles = css`
    a{
        text-decoration: none;
        font-weight: bold;
        color: black;
        opacity: 0.7;
        transition: .3s;
        font-size: var(--fs5);
        padding: var(--s2);
        margin: 0 var(--s2);
        cursor: pointer;
    }
    a:hover{
        opacity: 1;
    }
    .brand{
        font-size: var(--fs2);
    }
    .space-between{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    ul{
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
    }
    a.active{
        background: white;
        border-radius: 30px;
        color: black;
        padding: var(--s2) var(--s4);
        box-shadow: 0 3px 5px var(--shadow-light);
        opacity: 1;
    }
`
  }
  customElements.define('top-nav', TopNav)