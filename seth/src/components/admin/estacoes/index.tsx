import { useEffect, useState } from "react"
import axios from "axios"
import "./index.css"

import { Estacao } from "../../../types/estacao"
import Funcionalidades from "./Funcionalidades";



export default function Interface_Controle_Estacoes() {

    const[estacoes, setEstacoes] = useState<Array<Estacao>>([])
    const [actionType, setActionType] = useState<number | null>(null);

    const atualizarEstacoes = () => {
        axios.get('http://localhost:3002/estacao/listar')
            .then((response) => {
                setEstacoes(response.data); 
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        atualizarEstacoes(); 
    }, []);



    const handleAction = (type: number | null) => {
        setActionType(type);

        atualizarEstacoes()
    };

    return (
        <>
            <div id="Box_Estacoes">


                <div id="Title_Box">

                    <h2> Controle de Estações Meteorológicas </h2>

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

                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Mac Address</th>
                                    <th>Número</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                    <th>Cep</th>

                                </tr>

                            </thead>

                            <tbody>

                                {estacoes.map((estacao) => (
                                    <tr key={estacao.cod_estacao}>
                                        <td>{estacao.cod_estacao}</td>
                                        <td>{estacao.nome}</td>
                                        <td>{estacao.macAdress}</td>
                                        <td>{estacao.numero}</td>
                                        <td>{estacao.cidade}</td>
                                        <td>{estacao.estado}</td>
                                        <td>{estacao.cep}</td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                )}

                {actionType === 1 && <Funcionalidades.createEstacao />}
                {actionType === 2 && <Funcionalidades.editEstacao />}
                {actionType === 3 && <Funcionalidades.deleteEstacao />}
            </div>
        </>
    );
}