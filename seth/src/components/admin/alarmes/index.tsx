import { useEffect, useState } from "react"
import axios from "axios"

import "../main.css";
import Funcionalidades from "./Funcionalidades";
import { Alarme } from "../../../types/alarme";
import { Parametro } from "../../../types/parametro";
import { tipoParametro } from "../../../types/tipoParametro";

export default function INTERFACE_CONTROLE_ALARMES() {
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
    const [tipoParametro, setTipoParametro] = useState<Array<tipoParametro>>([]);
    const [alarmesFormatados, setAlarmesFormatados] = useState<Array<Alarme & { tipoParametroNome?: string }>>([]);
    const [parametros, setParametros] = useState<Array<Parametro>>([]);
    const [actionType, setActionType] = useState<number | null>(null);

    const noerro = (tipoParametro && alarmesFormatados && parametros && actionType !== null)
    console.log(noerro)

    const atualizarAlarmes = () => {
        axios.get('http://localhost:30105/api/alarmes')
            .then((response) => {
                setAlarmes(response.data); 
            })
            .catch((error) => {
                console.error(error);
            });
            axios.get('http://localhost:30105/api/tiposParametros')
            .then((response) => {
                setTipoParametro(response.data); 
            })
            .catch((error) => {
                console.error(error);
            });

            axios.get('http://localhost:30105/api/parametros')
            .then((response) => {
                setParametros(response.data);
            })
            .catch((error) => {
                console.error(error);
            })


            setAlarmesFormatados(alarmes)

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
                        <button onClick={() => handleAction(4)}>Cadastrar</button>
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
                                    <th>Nome</th>
                                    <th>Valor</th>
                                    <th>Condição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(alarmes) && alarmes.map((alarme) => (
                                    <tr key={alarme.cod_alarme}>
                                        <td>{alarme.nome}</td>
                                        <td>{alarme.valor}</td>
                                        <td>{alarme.condicao}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


                {actionType === 2 && <Funcionalidades.EditAlarme />}
                {actionType === 3 && <Funcionalidades.DeleteAlarme />}
                {actionType === 4 && <Funcionalidades.CreateAlarme />}
            </div>
        </>
    );
}
