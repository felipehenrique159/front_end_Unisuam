import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from './pages/Home'
import Indicacoes from './pages/Indicacoes'
export default function routes() {
    return (
       <BrowserRouter>
        <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/indicacoes' component={Indicacoes} exact/>
        </Switch>
       </BrowserRouter>
    )
}
