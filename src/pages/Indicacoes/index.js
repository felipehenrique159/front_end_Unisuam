import React, { useEffect, useState } from 'react'
import './indicacoes.css'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FiTrash } from 'react-icons/fi'
import Swal from 'sweetalert2'

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

    async function alterarStatus(id, alterarParaStatus) {
        try {
            await api.put(`indicacoes/${id}`, { status_id: alterarParaStatus })
            toast.info('Status Alterado com sucesso')
            getIndicacoes()
        } catch (error) {
            toast.error('Erro ao alterar status')
            console.log(error);
        }
    }

    async function deletarIndicacao(id) {
        try {
            const res = await api.delete(`indicacoes/${id}`)
            if (res.data.result === 'success') {
                toast.info('Indicação excluida com sucesso')
                getIndicacoes()
            }
            else {
                Swal.fire({
                    title: 'Erros ao excluir indicação',
                    text: res.data.message,
                    icon: 'error',
                    heightAuto: false
                });
            }

        } catch (error) {
            toast.error('Erro ao excluir indicação')
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


                                            {indicacao.get_status.id === 1 &&
                                                <button className="btn-alterar-status" onClick={() => { alterarStatus(indicacao.id, 2) }}>Mudar p/ processo</button>
                                            }
                                            {
                                                indicacao.get_status.id === 2 &&
                                                <button className="btn-alterar-status" onClick={() => { alterarStatus(indicacao.id, 3) }}>Mudar p/ finalizar</button>
                                            }

                                            <button className="btn-excluir" onClick={() => { deletarIndicacao(indicacao.id) }}>Excluir <FiTrash /></button>
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
