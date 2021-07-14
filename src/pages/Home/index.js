import React from 'react'
// import api from '../../services/api'
import './home.css'

export default function index() {
    return (
        <div className="container">
            <div className="form-container">
                <div className="banner-area">
                    <label>Sistema Indicação</label>
                </div>
                <form >
                    <label>Nome</label>
                    <input type="text" />
                    <label>Cpf</label>
                    <input type="text" />
                    <label>Telefone</label>
                    <input type="text" />
                    <label>Email</label>
                    <input type="email" />
                </form>

                <button className="btn-form">Indicar</button>
            </div>
        </div>




    )
}
