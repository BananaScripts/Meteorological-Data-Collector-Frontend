

import { useEffect, useState } from "react"

import axios from "axios"
import "../../main.css";
import { Estacao } from "../../../../types/estacao";
import { Parametro } from "../../../../types/parametro";
import { tipoParametro } from "../../../../types/tipoParametro";

export default function EditarParametroRelacionado() {



    const [parametros, setParametros] = useState<Array<Parametro>>([])
    const [tipoParametro, setTipoParametro] = useState<Array<tipoParametro>>([])
    const [estacoes, setEstacoes] = useState<Array<Estacao>>([])

    const [id, setId] = useState(0)
    const [idParametro, setIdParametro] = useState(0)
    const [idEstacaoParametro, setIdEstacaoParametro] = useState(0)

    const [parametrosFormatados, setParametrosFormatados] = useState<Array<Parametro & {parametroNome: string}>>([])

    const [encontrado, setEncontrado] = useState(true)

    console.log(setEncontrado)


    function buscar() {
        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametros')
        .then((response) => {
            setParametros(response.data)
        })
        .catch((error) => { 
            console.error(error)
        })

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
    }

    function formatar() {
        const parametrosFormatados = parametros.map((parametro) => {
            const tipo = tipoParametro.find((tipo) => tipo.cod_tipoParametro === parametro.cod_tipoParametro)
            const parametroNome = tipo ? tipo.nome : 'Desconhecido'
            return {...parametro, parametroNome}
        })
        setParametrosFormatados(parametrosFormatados)
    }

    useEffect(() => {
        buscar ()

        formatar()

        if (id){
            axios.get(`https://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametro/${id}`)
            .then((response) => {
                setIdParametro(response.data.cod_tipoParametro)
                setIdEstacaoParametro(response.data.cod_estacao)
                setEncontrado(true)
            })
            .catch((error) => {
                console.error(error)
            })
        }
    },  [id])



    function editarParametro () {
        axios.put(`https://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametro/atualizar/${id}`, 
            {
                cod_tipoParametro: idParametro, 
                cod_estacao: idEstacaoParametro
            })
        .then((response) => {
            
            alert("Parâmetro editado com sucesso!")
            setId(0)
            setIdParametro(0)
            setIdEstacaoParametro(0)
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
                        <select name="" value={id} onChange={(event) => setId(parseInt(event.target.value))} id="Select_Estacao">

                            <option value="">Selecione uma Parametro</option>

                            {parametrosFormatados.map((parametro) => (
                                <option key={parametro.cod_parametro} value={parametro.cod_parametro}>{parametro.parametroNome}</option>
                            ))}

                        </select>
                    </p>

                    
                    <hr />

                {!encontrado && (
                <>
                        


                        <p>
                            Parametro: 
                            <select value={idParametro} onChange={(e)=> setIdParametro(Number(e.target.value))}>
                                {tipoParametro.map((tipoParametro) => (
                                    <option key={tipoParametro.cod_tipoParametro} value={tipoParametro.cod_tipoParametro}>
                                        {tipoParametro.nome}
                                    </option>
                                ))}
                            </select>
                        </p>


                    <p>
                        Estacao: 
                        <select value={idEstacaoParametro} onChange={(e)=> setIdEstacaoParametro(Number(e.target.value))}>
                            {estacoes.map((estacao) => (
                                <option key={estacao.cod_estacao} value={estacao.cod_estacao}>
                                    {estacao.nome}
                                </option>
                            ))}
                        </select>
                    </p>

                </>

                )}


            </div>


            <div id="Action">
                <button onClick={editarParametro} disabled={!encontrado}>
                    Monitorar
                </button>
            </div>
        </div>

         
        </>
    )
}