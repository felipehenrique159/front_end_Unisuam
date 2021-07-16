import React, { useEffect, useState } from 'react'
import './indicacoes.css'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Indicacoes() {

    const [indicacoes, setIndicacoes] = useState([])

    useEffect(() => {

        getIndicacoes()

    }, [])

    async function getIndicacoes() {
        try {
            const res = await api.get('indicacoes')
            console.log(res.data);
            setIndicacoes(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function alterarStatus(id) {
        try {
            await api.put(`indicacoes/${id}`)
            toast.info('Status Alterado com sucesso')
            getIndicacoes()
        } catch (error) {
            toast.error('Erro ao alterar status')
            console.log(error);
        }
    }

    return (
        indicacoes.length !== 0 ?
                <div className="container-table">
                    <div className="margins-table">
                        <table className="table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Cpf</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indicacoes.map((indicacao) => {
                                    return (

                                        <tr key={indicacao.id}>
                                            <td>{indicacao.nome}</td>
                                            <td>{indicacao.cpf}</td>
                                            <td>{indicacao.telefone}</td>
                                            <td>{indicacao.email}</td>
                                            <td>{indicacao.get_status.descricao}</td>
                                            <td className="btn-grid">
                                                {indicacao.get_status.id == 2 && indicacao.get_status.id != 3 ?
                                                    <button className="btn-alterar-status" onClick={() => { alterarStatus(indicacao.id) }}>Ir para em finalizar</button>
                                                    :
                                                    <button className="btn-alterar-status" onClick={() => { alterarStatus(indicacao.id) }}>Ir para em processo</button>

                                                }
                                                <button className="btn-excluir">excluir indicacao</button>
                                            </td>
                                        </tr>

                                    )
                                })}

                            </tbody>
                        </table>

                        <div className="table-null-msg">
                            <Link to="/" title="Voltar Página inicio" >
                                Voltar Página inicio
                            </Link>
                        </div>

                </div>

            </div> :
            <div className="container-table">
                <div className="table-null-msg">
                    <h1>
                        Ainda não possui indicações cadastrada
                    </h1>

                    <Link to="/" title="Voltar Página inicio">
                        Voltar Página inicio
                    </Link>
                </div>

            </div>
    )
}
