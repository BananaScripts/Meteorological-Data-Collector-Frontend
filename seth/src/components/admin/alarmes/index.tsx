import { useEffect, useState } from "react"
import axios from "axios"
import "./index.css"

import Funcionalidades from "./Funcionalidades";
import { Alarme } from "../../../types/alarme";

export default function INTERFACE_CONTROLE_ALARMES() {
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
    const [actionType, setActionType] = useState<number | null>(null);

    const atualizarAlarmes = () => {
        axios.get('http://localhost:3002/api/alarmes')
            .then((response) => {
                setAlarmes(response.data); 
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        atualizarAlarmes(); 
    }, []);

    const handleAction = (type: number | null) => {
        setActionType(type);
        atualizarAlarmes(); 
    };

    return (
        <>
            <div id="Box_Alarmes">
                <div id="Title_Box">
                    <h2> Controle de Alarmes </h2>

                    {actionType === null && (
                        <button onClick={() => handleAction(2)}>Editar</button>
                    )}                   

                    {actionType === null && (    
                        <button onClick={() => handleAction(3)}>Deletar</button>
                    )}            

                    {actionType === null && (
                        <button onClick={() => handleAction(1)}>Cadastrar Alarme</button>
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
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Código do Tipo de Parâmetro</th>
                                    <th>Valor</th>
                                    <th>Condição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alarmes.map((alarme) => (
                                    <tr key={alarme.cod_alarme}>
                                        <td>{alarme.cod_alarme}</td>
                                        <td>{alarme.nome}</td>
                                        <td>{alarme.cod_tipoParametro}</td>
                                        <td>{alarme.valor}</td>
                                        <td>{alarme.condicao}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {actionType === 1 && <Funcionalidades.CreateAlarme />}
                {actionType === 2 && <Funcionalidades.EditAlarme />}
                {actionType === 3 && <Funcionalidades.DeleteAlarme />}
            </div>
        </>
    );
}
