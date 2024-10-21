import { useState, useEffect } from "react"
import axios from "axios"
import "./index.css"
import { Estacao } from "../../../../types/estacao"

export default function EditEstacao() {


    const [id, setId] = useState('')
    const [estacao, setEstacao] = useState<Estacao | null>(null)
    const [nome, setNome] = useState('')
    const [macAdress, setMacAdress] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep] = useState('')

    const[encontrado, setEncontrado] = useState(true)


    useEffect(() => {
        if (id) {
            
            axios.get(`http://localhost:30105/api/estacao/${id}`)
                .then(response => {
                    
                    const estacaoData = response.data[0]
                    if (estacaoData) {

                        setEncontrado(true)

                        const { nome, macAdress, cidade, estado, numero, cep } = estacaoData
                        setEstacao(estacaoData)
                        setNome(nome)
                        setMacAdress(macAdress)
                        setCidade(cidade)
                        setEstado(estado)
                        setNumero(numero)
                        setCep(cep)
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar a estação:", error)
                    setEncontrado(false)
                    resetForm()
                })
        } else {
            resetForm()
            setEncontrado(true)
        }
    }, [id])

    function resetForm() {
        setEstacao(null)
        setNome('')
        setMacAdress('')
        setCidade('')
        setEstado('')
        setNumero('')
        setCep('')
    }

    function editar() {
        console.clear()

        let cidadeDefault = cidade !== '' ? cidade : 'Não informado'
        let estadoDefault = estado !== '' ? estado : 'Não informado'
        let numeroDefault = numero !== '' ? numero : 'Não informado'

        if (nome !== '' && macAdress !== '' && cep !== '' ) {
            axios.put(`http://localhost:30105/api/estacao/atualizar/${id}`, {
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
                        ID da Estação:
                        <input type="text" value={id} onChange={(event) => setId(event.target.value)} placeholder="Digite o ID" />
                    </p>

                    
                    {!encontrado && (
                        <p>*Estação não encontrada</p>
                    )}

                    <hr />

                    {estacao && (
                        <>
                            
                            <p>
                                Nome:
                                <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} placeholder="(*Obrigatório)" />
                            </p>

                            <p>
                                MacAdress:
                                <input type="text" value={macAdress} onChange={(event) => setMacAdress(event.target.value)} placeholder="(*Obrigatório)" />
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
                                Número:
                                <input type="text" value={numero} onChange={(event) => setNumero(event.target.value)} />
                            </p>

                            <p>
                                CEP (Apenas Números):
                                <input type="number" maxLength={12} value={cep} onChange={(event) => setCep(event.target.value)} placeholder="(*Obrigatório)" />
                            </p>
                        </>
                    )}
                </div>

                <div id="Action">
                    <button onClick={editar} disabled={!estacao}>
                        Editar
                    </button>
                </div>
            </div>
        </>
    )
}
