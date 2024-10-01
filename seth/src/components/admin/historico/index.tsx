import { useEffect, useState } from "react"
import axios from "axios"
import "./index.css"

import { Alarme } from "../../../types/alarme";

export default function Interface_Historico_Alarmes() {
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
    const [actionType, setActionType] = useState<number | null>(null);

    const atualizarAlarmes = () => {
        axios.get('http://localhost:3002/alarme/listar')
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
            <div id="Box_Historico">
                <div id="Title_Box">
                    <h2> Historico de Alarmes </h2>

                </div>

                    <div id="Scroll_Table">
                        <hr />
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Parâmetro</th>
                                    <th>Data</th>
                                    <th>Hora</th>
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
                

            </div>
        </>
    );
}
