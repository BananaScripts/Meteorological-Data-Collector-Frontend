import { useState, useEffect } from "react";
import axios from "axios";
import { Alarme } from "../../../../types/alarme";
import { Parametro } from "../../../../types/parametro";
import "../../main.css";


export default function CreateAlarme() {
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
    const [parametros, setParametros] = useState<Array<Parametro>>([]);
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState(0);
    const [condicao, setCondicao] = useState('');
    const [codParametro, setCodParametro] = useState(0);

    const noerro = (alarmes && id)
    console.log(noerro)

    useEffect(() => {

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/alarmes')
            .then(response => {
                setAlarmes(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar alarmes:", error);
            });

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app//api/parametros')
            .then(response => {
                setParametros(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar tipos de parâmetro:", error);
            });
        
    }, []);

    const cadastrar = () => {

        
        if (nome === '' && valor === 0 && condicao === '' && codParametro === 0) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        axios.post('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/alarme/cadastrar', {
            nome,
            valor,
            condicao,
            cod_parametro: codParametro

        })
        .then(() => {
            setId(0);
            setNome('');
            setValor(0);
            setCondicao('');
            alert("Alarme cadastrado com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao cadastrar alarme:", error);
        });
    };

    return (
        <div id="CreateAlarme">
            <hr />

            <div id="Title_Section">
                <h3>Cadastrar Novo Alarme</h3>
                <p>*Preencha os campos obrigatórios</p>
            </div>

            <div id="Inputs_Camp">

                <p>
                    Parametro associado ao alarme:
                    <select value={codParametro} onChange={(event) => setCodParametro(Number(event.target.value))}>
                        {parametros.map((parametro) => (
                            <option key={parametro.cod_tipoParametro} value={parametro.cod_tipoParametro}>
                                {parametro.cod_tipoParametro}
                            </option>
                        ))}
                    </select>
                </p>

                <p>
                    Nome do alarme:
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                    
                </p>
                <p>
                    Valor do alarme:
                    <input type="number" value={valor} onChange={(e) => setValor(Number(e.target.value))}></input>
                </p>

                <p>
                    Condição do alarme:
                    <select value={condicao} onChange={(e) => setCondicao(e.target.value)}>
                        <option value="Maior que">Maior que</option>
                        <option value="Menor que">Menor que</option>
                        <option value="Igual a">Igual a</option>
                    </select>
                </p>

            </div>

            <div id="Action">
                <button onClick={cadastrar}>
                    Cadastrar
                </button>
            </div>
        </div>
    );
}

