

import { useEffect, useState } from "react"

import axios from "axios"
import "../../main.css";
import { Estacao } from "../../../../types/estacao";
import { tipoParametro } from "../../../../types/tipoParametro";

export default function CreateParametroRelacionado() {

    const [idTipoParametro, setIdTipoParametro] = useState(0)
    const [idEstacao, setIdEstacao] = useState(0)

    const [tipoParametro, setTipoParametro] = useState<Array<tipoParametro>>([])
    const [estacoes, setEstacoes] = useState<Array<Estacao>>([])

    useEffect(() => {


        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/tiposParametros') 
        .then((response) => {
            setTipoParametro(response.data)
        })
        .catch((error) => { 
            console.error(error)
        })

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/estacoes')
        .then((response) => {
            setEstacoes(response.data)
        })
        .catch((error) => { 
            console.error(error)
        })
    }, [])

    function cadastrarParametro () {
        axios.post('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametro/cadastrar', {cod_tipoParametro: idTipoParametro, cod_estacao: idEstacao})
        .then((response) => {
            
            alert("Parâmetro cadastrado com sucesso!")
            setIdTipoParametro(0)
            setIdEstacao(0)
        })
        .catch((error) => {
            console.error(error)

        })
    }
    

    return(
        <>
            <div id="CreateAlarme">

                <div id="Title_Section">
                    <h3>Relacionar Parâmetro com uma Estação</h3>
                    <p>*Preencha os campos obrigatórios</p>
                </div>

                <div id="Inputs_Camp">

                <p>
                    Parametro: 
                    <select value={idTipoParametro} onChange={(e)=> setIdTipoParametro(Number(e.target.value))}>
                        {tipoParametro.map((tipoParametro) => (
                            <option key={tipoParametro.cod_tipoParametro} value={tipoParametro.cod_tipoParametro}>
                                {tipoParametro.nome}
                            </option>
                        ))}
                    </select>
                </p>
                <br />

                <p>
                    Estacao: 
                    <select value={idEstacao} onChange={(e)=> setIdEstacao(Number(e.target.value))}>
                        {estacoes.map((estacao) => (
                            <option key={estacao.cod_estacao} value={estacao.cod_estacao}>
                                {estacao.nome}
                            </option>
                        ))}
                    </select>
                </p>
                <br />

            </div>

            <div id="Action">
                <button onClick={cadastrarParametro}>
                    Cadastrar
                </button>
            </div>
        </div>

         
        </>
    )
}