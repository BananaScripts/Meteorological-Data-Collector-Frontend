import { useState, useEffect } from "react"
import axios from "axios"

import { Estacao } from "../../../../types/estacao"
import { Parametro } from "../../../../types/parametro"
import "../../main.css";

export default function EditEstacao() {


    const [id, setId] = useState(0)
    const [estacao, setEstacao] = useState<Estacao | null>(null)
    const [estacoes, setEstacoes] = useState<Array<Estacao>>([])
    const [parametros, setParametros] = useState<Array<Parametro>>([])
    const [nome, setNome] = useState('')
    const [macAdress, setMacAdress] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [numero, setNumero] = useState(0)
    const [cep, setCep] = useState('')

    const[encontrado, setEncontrado] = useState(true)

    const noerror = estacao && parametros;
    console.log(noerror)


    useEffect(() => {

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/estacoes')
        .then((response) => {
            setEstacoes(response.data)
        })
        .catch((error) => {
            console.error(error)
        })

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametros')
        .then((response) => {
            setParametros(response.data)
        })
        .catch((error) => {
            console.error(error)
        })




        if (id) {

            
                    const estacaoData = estacoes.find(estacao => estacao.cod_estacao === id)
                    


                    if (estacaoData) {

                        setEncontrado(false)

                        const { nome, macAdress, cidade, estado, numero, cep } = estacaoData
                        setEstacao(estacaoData)
                        setNome(nome)
                        setMacAdress(macAdress)
                        setCidade(cidade)
                        setEstado(estado)
                        setNumero(numero)
                        setCep(cep)
                    }

            
            }
        }, [id, estacoes])


    function editar() {
        console.clear()



        let cidadeDefault = cidade !== '' ? cidade : 'Não informado'
        let estadoDefault = estado !== '' ? estado : 'Não informado'
        let numeroDefault = numero === 0 ? numero : 0

        if (nome !== '' && macAdress !== '' && cep !== '' ) {
            axios.put(`https://seth-backend-app-652283507250.southamerica-east1.run.app/api/estacao/atualizar/${id}`, {
                nome,
                macAdress,
                cidade: cidadeDefault,
                estado: estadoDefault,
                numero: numeroDefault,
                cep
              })
                .then(() => {
                    alert("Estação Editada com Sucesso!")
                })
                .catch(error => {
                    console.error(error)
                })
        } else {
            alert("Preencha os campos obrigatórios!")
        }
    }

    return (
        <>
            <div id="EditEstacao">
                <hr />

                <div id="Title_Section">
                    <h3>Editar Estação</h3>
                    <p>*Informe o ID da estação para editar</p>
                </div>

                <div id="Inputs_Camp">
                    <p>
                        <select value={id} onChange={(event) => setId(parseInt(event.target.value))}>
                            <option value="">Selecione um Usuário</option>
                                {estacoes.map((estacao) => (
                                    <option key={estacao.cod_estacao} value={estacao.cod_estacao}>{estacao.cod_estacao}</option>
                                ))}    
                        </select>
                    </p>

                    
                    <hr />

                    {!encontrado && (
                        <>
                            
                            <p>
                                Nome:
                                <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
                            </p>

                            <p>
                                MacAdress:
                                <input type="text" value={macAdress} onChange={(event) => setMacAdress(event.target.value)}  />
                            </p>

                            <br />
                            <b>Localização</b>

                            <p>
                                Cidade:
                                <input type="text" value={cidade} onChange={(event) => setCidade(event.target.value)} />
                            </p>

                            <p>
                                Estado:
                                <input type="text" value={estado} onChange={(event) => setEstado(event.target.value)} />
                            </p>

                            <p>
                                Número (Apenas Números):
                                <input type="number" value={numero} onChange={(event) => setNumero(parseInt(event.target.value))} />
                            </p>

                            <p>
                                CEP (Apenas Números):
                                <input type="number" maxLength={12} value={cep} onChange={(event) => setCep(event.target.value)} />
                            </p>
                        </>
                    )}
                </div>

                <div id="Action">
                    <button onClick={editar} disabled={encontrado}>
                        Editar
                    </button>
                </div>
            </div>
        </>
    )
}
