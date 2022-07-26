import s from '../../services/s.js'
import {ListItem} from './list-item.js'
const {html, css, LitElement, live} = s.lit

export class ListCard extends LitElement {
    static properties = {
        table: {type: String},
        videoMode: {}
    }

    constructor() { super() ; this.init() ; this.res = [] ; this.videoMode = false }

    init = () => setTimeout(async () => {
        this.user = await s.user.get()
        if(this.user) this.res = this.user[this.table]
        this.text = this.res || ''
        this.res = this.res || {}
        this.update()
        s.broadcast.on('user', user => {
            console.log('user', user[this.table])
            this.res = user[this.table] || {}
            this.user = user
            this.update()
        })
        s.broadcast.on('list-update', (table, item) => {
            if(this.table === table) {
                delete this.res[item.id]
                this.update()
            }
        })
    }, 0)
    changeValue = e => {
        this.text = e.target.value
    }
    submitPost = async e => {
        console.log('submit', this.text)
        if(this.text && this.text != ''){
            this.res = await s.data[this.table](this.text) || {}
            console.log(this.res)
            this.text = ''
            this.update()
        }
    }

    render = () => html`
        <ui-card bg="transparent">
            <h1>${this.table.substr(0,1).toUpperCase() + this.table.substr(1)}</h1>
            <div class="full">
                <input @change="${this.changeValue}" placeholder="New ${this.table}" .value="${live(this.text)}">
                <button @click="${this.submitPost}">Add</button>
            </div>
            <ul>
                ${Object.values(this.res).map(obj => html`<li class="${this.table==='video'?'video':''}">${this.table !== 'video' ? new ListItem(this.user, this.table, obj) : html`<iframe src="https://www.youtube.com/embed/${obj.text}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}</li>`)}
            </ul>
        </ui-card>
        ${s.style.forms}
        ${s.style.headers}
    `
    
    static styles = css`
        :host {
            width: 50%;
        }
        .full{
            display: flex;
            width: 100%;
        }
        .full input{
            width: 80%;
        }
        .full button{
            width: 20%;
        }
        iframe{
            width: 100%;
            margin: var(--s3);
        }
        @media screen and (min-width: 800px) {
            iframe{
                width: 400px;
                height: 300px;
                display: inline-block;   
            }
            .video ul {
                display: flex;
                flex-wrap: wrap;
            }
        }
        ul {
            margin: 0;
            margin-top: var(--s3);
            padding: 0 var(--s1);
            list-style: none;
        }
        li {
            padding: var(--s2);
            font-size: var(--fs1);
            font-weight: bold;
            text-transform: capitalize; 
        }
    `
}
customElements.define('list-card', ListCard)