import s from './s.js'
const {html} = s.lit

s.style.forms = html`
    <style>
        input, button {
            padding: var(--s2);
            border: none;
            border-radius: 3px;
            box-shadow: 0 3px 5px var(--shadow);
            cursor: pointer;
            transition: .3s;
            margin: var(--s2);
            background: purple;
            color: white;
            font-weight: bold;
            font-size: var(--fs6);
        }
        input:hover, button:hover {
            box-shadow: 0 3px 5px var(--shadow-dark);
        }
    </style>
`

s.style.headers = html`
    <style>
        h1 { font-size: var(--fs1); }
        h2 { font-size: var(--fs2); }
        h3 { font-size: var(--fs3); }
        h4 { font-size: var(--fs4); }
        h5 { font-size: var(--fs5); }
        h6 { font-size: var(--fs6); }
        h1, h2, h3 {
            margin: var(--s3) 0;
        } 
        h4, h5, h6 {
            margin: var(--s4) 0;
        }
    </style>
`

s.style.grids = html`
    <style>
        .flex{
            display: flex;
            width: 100%;
        }
        .space-between{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        @media screen and (min-width: 800px){
            .d-flex{
                display: flex;
                width: 100%;
            }
            .d-space-between{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        @media screen and (max-width: 800px){
            .m-flex{
                display: flex;
                width: 100%;
            }
            .m-space-between{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    </style>
`

export default {}