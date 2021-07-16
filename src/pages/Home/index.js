import React, { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import './home.css'
import Swal from 'sweetalert2'

export default function Home() {

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [erroCampoObg, setErroCampoObg] = useState(false)

    async function salvar(e) {
        e.preventDefault()

        if (validaDados()) {
            try {
                const res = await api.post('indicacoes', {
                    nome: nome,
                    cpf: cpf,
                    telefone: telefone,
                    email: email,
                })
                toast.info(res.data.message)
                setNome('')
                setCpf('')
                setTelefone('')
                setEmail('')
            } catch (error) {
                let mensagensBackend = []
                let path = error.response.data.errors
                Object.keys(path).forEach(function (item) {
                    mensagensBackend.push(" " + path[item] + ' ');
                });

                Swal.fire({
                    title: 'Erros ao salvar',
                    text: mensagensBackend,
                    icon: 'error',
                    heightAuto: false
                });

            }

        }
        else {
            toast.error('Preencher campos obrigatórios')
        }
    }

    function validaDados() {

        let erro = 0;
        if (nome.trim() === '') {
            erro++
        }
        if (cpf.trim() === '') {
            erro++
        }
        else {
            if (cpf.trim().length < 11 || cpf.trim().length > 11) { //cpf invalido
                toast.error('Cpf Inválido')
                erro++
            }
        }

        if (telefone.trim() === '') {
            erro++
        }
        if (email.trim() === '') {
            erro++
        }
        else {
            if (!validateEmail(email)) {
                toast.error('Email Inválido')
                erro++
            }
        }
        if (erro === 0) {
            setErroCampoObg(false)
            return 1
        }
        else {
            setErroCampoObg(true)
            return 0
        }
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (
        <div className="container">
            <div className="form-container">
                <div className="banner-area">
                    <label>Sistema Indicação</label>
                </div>
                <form >
                    <label>Nome*</label>
                    <input type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <label>CPF*</label>
                    <input type="text"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                    />
                    <label>Telefone*</label>
                    <input type="text"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    />
                    <label>E-mail*</label>
                    <input type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <small>
                        {
                            erroCampoObg &&
                            <label className="txt-small">* Campos Obrigatórios</label>
                        }
                    </small>
                </form>

                <button type="submit" className="btn-form" onClick={salvar}>Indicar</button>
            </div>
        </div>




    )
}
