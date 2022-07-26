import s from './s.js'
import { ExercisePage } from "../components/exercise-page.js"
import { HomePage } from "../components/home-page.js"
import { LoginPage } from "../components/login-page.js"

s.routes = {
    '': 'home-page',
    '#': 'home-page',
    '#home': 'home-page',
    '#exercise': 'exercise-page',
    '#login': 'login-page'
}

export default {}