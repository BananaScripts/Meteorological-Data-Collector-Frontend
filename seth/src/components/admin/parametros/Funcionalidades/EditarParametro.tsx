import { useState, useEffect } from "react"
import axios from "axios"
import "./index.css"

import { Parametro, UnidadeMedida } from "../../../../types/parametro"

export default function EditParametro() {
    const [id, setId] = useState('')
    const [parametro, setParametro] = useState<Parametro | null>(null)
    const [nome, setNome] = useState('')
    const [fator, setFator] = useState('')
    const [offset, setOffset] = useState<number>(0)
    const [unidadeMedida, setUnidadeMedida] = useState('')

    const[encontrado, setEncontrado] = useState(true)

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3002/api/tipoParametro/${id}`)
                .then(response => {
                    const parametroData = response.data[0]
                    setEncontrado(true)

                    if (parametroData) {
                        const { nome, fator, offset, unidadeMedida } = parametroData
                        setParametro(parametroData)
                        setNome(nome)
                        setOffset(offset)
                        setFator(fator)
                        setUnidadeMedida(unidadeMedida)
                    }
                })
                .catch(error => {
                    setEncontrado(false)
                    resetForm()
                })
        } else {
            setEncontrado(true)    
            resetForm()

        }
    }, [id])

    function resetForm() {
        setParametro(null)
        setNome('')
        setFator('')
        setOffset(0)
        setUnidadeMedida('')
    }

    function editar() {

        let offsetDefault = offset < 0 ? Math.abs(offset) : offset;


        if (nome !== '' && fator !== '' && unidadeMedida !== '') {
            axios.put(`http://localhost:3002/api/estacao/atualizar/${id}`, {
                nome,
                fator,
                offset: offsetDefault,
                unidadeMedida
            })
                .then(() => {
                    alert("Parâmetro editado com sucesso!")
                })
                .catch(() => {
                    alert("Erro ao editar o parâmetro.")
                })
        } else {
            alert("Preencha os campos obrigatórios!")
        }
    }

    return (
        <div id="EditParametro">
            <hr />

            <div id="Title_Section">
                <h3>Editar Parâmetro</h3>
                <p>*Informe o ID do Parâmetro para editar</p>
            </div>

            <div id="Inputs_Camp">
                <p>
                    ID do Parâmetro:
                    <input
                        type="text"
                        value={id}
                        onChange={(event) => setId(event.target.value)}
                        placeholder="Digite o ID"
                    />
                </p>

                {!encontrado && (
                    <p>*Parâmetro não encontrado</p>
                )}

                <hr />

                {parametro && (
                    <>
                        <p>
                            Nome:
                            <input
                                type="text"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                placeholder="(*Obrigatório)"
                            />
                        </p>

                        <p>
                            Fator:
                            <input
                                type="text"
                                value={fator}
                                onChange={(event) => setFator(event.target.value)}
                                placeholder="(*Obrigatório)"
                            />
                        </p>

                        <p>
                            Unidade de Medida:
                            <select
                                value={unidadeMedida}
                                onChange={(e) => setUnidadeMedida(e.target.value as UnidadeMedida)}
                            >
                                <option value="">Selecione uma unidade</option>
                                {Object.values(UnidadeMedida).map((unidade) => (
                                    <option key={unidade} value={unidade}>
                                        {unidade}
                                    </option>
                                ))}
                            </select>
                        </p>

                        <p>
                            Offset (Coloque um número Positivo):
                            <input
                                type="number"
                                value={offset}
                                onChange={(event) => setOffset(event.target.valueAsNumber)}
                            />
                        </p>
                    </>
                )}
            </div>

            <div id="Action">
                <button onClick={editar} disabled={!parametro}>
                    Editar
                </button>
            </div>
        </div>
    )
}
