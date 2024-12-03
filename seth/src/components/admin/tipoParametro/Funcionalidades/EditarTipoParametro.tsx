import { useState, useEffect } from "react"
import axios from "axios"

import { tipoParametro, UnidadeMedida } from "../../../../types/tipoParametro"
import "../../main.css";

export default function EditParametro() {
    const [id, setId] = useState(0)
    const [tipoParametro, setTipoParametro] = useState<Array<tipoParametro>>([])
    const [nome, setNome] = useState('')
    const [fator, setFator] = useState('')
    const [offset, setOffset] = useState("")
    const [unidadeMedida, setUnidadeMedida] = useState('')
    const [json, setJson] = useState('')

    const[encontrado, setEncontrado] = useState(true)

    useEffect(() => {

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/tiposParametros')
            .then(response => {
                setTipoParametro(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar tipos de parâmetro:", error);
            });


        if (id) {
            setEncontrado(false)
            const parametroData = tipoParametro.find(parametro => parametro.cod_tipoParametro === id)



            if (parametroData) {


                const { nome, fator, offset, unidadeMedida, json } = parametroData
                setNome(nome)
                setOffset(offset);
                setFator(fator)
                setUnidadeMedida(unidadeMedida)
                setJson(json)
            } else {

                setEncontrado(true)
                resetForm();
            }
        }
    }, [id])

    function resetForm() {
        setNome('')
        setFator('')
        setOffset('')
        setUnidadeMedida('')
        setJson('')
    }

    function editar() {

        let offsetDefault = offset !== '' ? offset : '0';


        if (nome !== '' && fator !== '' && unidadeMedida !== '' && json !== '') {
            axios.put(`https://seth-backend-app-652283507250.southamerica-east1.run.app/api/tipoParametro/atualizar/${id}`, {
                nome,
                fator,
                offset: offsetDefault,
                unidadeMedida,
                json
            })
                .then(() => {
                    alert("Parâmetro editado com sucesso!")
                })
                .catch((error => {
                    console.error(error)
                    alert("Erro ao editar o parâmetro.")
                }));
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
                    Selecione o Parametro a ser editado:

                        <select onChange={(e) => setId(parseInt(e.target.value))}>
                            <option value=''>Selecione um Parametro</option>
                                {tipoParametro.map((tipoParametro) => (
                            <option key={tipoParametro.cod_tipoParametro} value={tipoParametro.cod_tipoParametro}>{tipoParametro.nome}</option>
                            ))}
                        </select>
                    
                </p>

                <hr />
                {!encontrado && (


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
                                type="number"
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
                                onChange={(event) => setOffset(event.target.value)}
                            />
                        </p>

                        <p>
                            Sigla (Para Tratamento de Dados):
                            <input
                                type="text"
                                value={json}
                                onChange={(event) => setJson(event.target.value)}
                            />
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
    )
}
