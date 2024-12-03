import { useState, useEffect } from "react";
import axios from "axios";
import { Alarme } from "../../../../types/alarme";
import "../../main.css";

export default function INTERFACE_CONFIGURAR_ALARMES() {
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
    const [id, setId] = useState(0);
    const [tempo, setTempo] = useState(1);
    const [tipoTempo, setTipoTempo] = useState<string>('Minuto')

    useEffect(() => {

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/alarmes')
            .then(response => {
                setAlarmes(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar alarmes:", error);
            });
    }, []);

    const monitorar = () => {
        if (id === 0) {
            alert("Selecione um alarme para monitorar!");
            return;
        }

        axios.post('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/alarme/monitorar', {
            cod_alarme: id,
            tempo: tempo,
            tipoTempo: tipoTempo

        })
        .then(() => {
            setId(0);
            setTempo(1);
            setTipoTempo('Minuto');
            alert("Alarme configurado com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao cadastrar alarme:", error);
        });
    };

    return (
        <div id="CreateAlarme">

            <div id="Title_Section">
                <h3>Inciar Monitoramento de Alarme</h3>
                <p>*Preencha os campos obrigatórios</p>
            </div>

            <div id="Inputs_Camp">

                <p>
                    Alarme a ser monitorado:
                    <select value={id} onChange={(e) => setId(Number(e.target.value))}>
                        <option value="0">Selecione um alarme</option>
                        {alarmes.map((alarme) => (
                            <option key={alarme.cod_alarme} value={alarme.cod_alarme}>
                                {alarme.cod_alarme} - {alarme.nome}
                            </option>
                        ))}
                    </select>
                </p>
                <br />

                <p>
                    Tipo de intervalo de tempo:
                    <select value={tipoTempo} onChange={(e)=> setTipoTempo(e.target.value)}>
                        <option value="Minuto">Minuto</option>
                        <option value="Hora">Hora</option>
                    </select>
                </p>
                <br />
                <p>
                    Intervalo de tempo (horas/minutos):
                    <input type="number" value={tempo} onChange={(e)=>setTempo(Number(e.target.value))}></input>
                </p>
                <br />
            </div>

            <div id="Action">
                <button onClick={monitorar}>
                    Monitorar
                </button>
            </div>
        </div>
    );
}
