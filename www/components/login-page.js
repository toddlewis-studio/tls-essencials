import s from '../services/s.js'
const {html, css, LitElement} = s.lit

export class LoginPage extends LitElement {
    constructor() { 
        super()
        this.signedIn = false
        s.broadcast.on('user', user => {
            if(user && !user.error) this.signedIn = true
            this.user = user
            this.update()
        })
    }
    render = () => html`
        <ui-card bg="transparent">
                ${!this.signedIn ? html`<h1>Login</h1><google-auth></google-auth>` :''}
                ${this.signedIn ? html`<ui-card>
                    <div class="space">
                        <h1>Welcome ${this.user.username}</h1>
                        <div class="space">
                            <a href="#home">> Home</a>
                        </div>
                    </div>
                </ui-card>`:''}
        </ul-card>
        ${s.style.headers}
    `
    static styles = css`
        a {
            font-size: var(--fs3);
            text-decoration: none;
        }
        .space{
            padding: var(--s4);
        }
    `
  }
  customElements.define('login-page', LoginPage)