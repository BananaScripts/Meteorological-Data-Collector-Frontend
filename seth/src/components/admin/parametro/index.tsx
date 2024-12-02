import { useEffect, useState } from "react"
import axios from "axios"

import "../main.css";
import { Estacao } from "../../../types/estacao"
import Funcionalidades from "./Funcionalidades";
import { Parametro } from "../../../types/parametro";
import { tipoParametro } from "../../../types/tipoParametro";



export default function INTERFACE_CONTROLE_PARAMETROSRELACIONADO() {

    const [parametros, setParametros] = useState<Array<Parametro>>([]);
    const [parametrosFormatados, setParametrosFormatados] = useState<Array<Parametro & {parametroNome: string} & {estacaoNome: string}>>([]);
    const [tipoParametro, setTipoParametro] = useState<Array<tipoParametro>>([]);
    const [estacoes, setEstacoes] = useState<Array<Estacao>>([]);
    const [actionType, setActionType] = useState<number | null>(null);

    const atualizarEstacoes = () => {
        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametros')
            .then((response) => {
                setParametros(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/tiposParametros') 
            .then((response) => {
                setTipoParametro(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/estacoes')
            .then((response) => {
                setEstacoes(response.data);
            })
            .catch((error) => {
                console.error(error);
            })


    };

    useEffect(() => {
        atualizarEstacoes(); 


    });



    const handleAction = (type: number | null) => {
        setActionType(type);

        atualizarEstacoes()
    };
    function formatar() {
        const parametrosFormatados = parametros.map((parametro) => {
            const tipo = tipoParametro.find((tipo) => tipo.cod_tipoParametro === parametro.cod_tipoParametro)
            const parametroNome = tipo ? tipo.nome : 'Desconhecido'
            return {...parametro, parametroNome}
        })

        const parametroscomEstacoes = parametrosFormatados.map((parametro) => {
            const estacao = estacoes.find((estacao) => estacao.cod_estacao === parametro.cod_estacao)
            const estacaoNome = estacao ? estacao.nome : 'Desconhecido'
            return {...parametro, estacaoNome}
        })
        setParametrosFormatados(parametroscomEstacoes)
    }

    useEffect(() => {
        formatar()
    })
    



    return (
        <>
            <div id="Box_Estacoes">


                <div id="Title_Box">

                    <h2> Relacionamentos dos Parâmetros </h2>

                    {actionType === null && (
                        <button onClick={() => handleAction(2)}>Editar</button>
                    )}                   

                    {actionType === null && (    
                        <button onClick={() => handleAction(3)}>Deletar</button>
                    )}            

                    {actionType === null && (
                        <button onClick={() => handleAction(1)}>Cadastrar Estação</button>
                    )}

                    {actionType !== null && (
                        <button onClick={() => handleAction(null)}>Cancelar</button>
                    )}


                </div>

                {actionType === null && (

                    <div id="Scroll_Table">

                        <hr />


                        <table>

                            <thead>

                                <tr>

                                    <th>Parâmetro</th>
                                    <th>Estação</th>

                                </tr>

                            </thead>

                            <tbody>

                                {parametrosFormatados.map((parametro) => (
                                    <tr key={parametro.cod_parametro}>

                                        <td>{parametro.parametroNome}</td>
                                        <td>{parametro.estacaoNome}</td>



                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                )}

                {actionType === 1 && <Funcionalidades.CreateParametroRelacionado />}
                {actionType === 2 && <Funcionalidades.EditarParametroRelacionado />}
                {actionType === 3 && <Funcionalidades.DeleteParametroRelacionado />}
            </div>
        </>
    );
}