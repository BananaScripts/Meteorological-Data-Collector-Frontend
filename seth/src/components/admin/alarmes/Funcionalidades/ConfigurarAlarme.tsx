import { useState, useEffect } from "react";
import axios from "axios";
import { Parametro } from "../../../../types/parametro";

export default function ConfigAlarme() {
    const [nome, setNome] = useState('');
    const [codTipoParametro, setCodTipoParametro] = useState<number | string>('');
    const [valorAlvo, setValorAlvo] = useState<number | string>('');
    const [condicao, setCondicao] = useState<string>('igual a');
    const [tempo, setTempo] = useState(1);
    const [tipoTempo, setTipoTempo] = useState<string>('Minuto')

    const [tiposParametro, setTiposParametro] = useState<Array<Parametro>>([]);

    useEffect(() => {
        axios.get('http://localhost:30105/api/tiposparametros')
            .then(response => {
                setTiposParametro(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar tipos de parâmetro:", error);
            });
    }, []);

    const monitorar = () => {
        if (!nome || !codTipoParametro || !valorAlvo) {
            alert("Por favor, preencha os campos obrigatórios!");
            return;
        }

        const codTipoParametroNum = Number(codTipoParametro);
        const valorNum = Number(valorAlvo);

        if (isNaN(codTipoParametroNum) || isNaN(valorNum)) {
            alert("Código do Tipo de Parâmetro ou Valor inválido!");
            return;
        }

        axios.post('http://localhost:30105/api/alarme/monitorar', {
            nome,
            valorAlvo: valorNum, 
            condicao,
            cod_tipoParametro: codTipoParametroNum,
            tempo,
            tipoTempo  
        })
        .then(() => {
            setNome('');
            setCodTipoParametro('');
            setValorAlvo('');
            setCondicao('igual a');
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
                <h3>Configurar criação de Alarme</h3>
                <p>*Preencha os campos obrigatórios</p>
            </div>

            <div id="Inputs_Camp">
                <p>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="(*Obrigatório)"
                    />
                </p>

                <p>
                    Tipo de Parâmetro:
                    <select
                        value={codTipoParametro}
                        onChange={(e) => setCodTipoParametro(e.target.value)}
                    >
                        <option value="">Selecione um tipo</option>
                        {tiposParametro.map((parametro) => (
                            <option key={parametro.cod_tipoParametro} value={parametro.cod_tipoParametro}>
                                {parametro.nome}
                            </option>
                        ))}
                    </select>
                </p>

                <p>
                    Valor:
                    <input
                        type="number"
                        value={valorAlvo}
                        onChange={(e) => setValorAlvo(e.target.value)}
                        placeholder="(*Obrigatório)"
                    />
                </p>

                <p>
                    Condição:
                    <select value={condicao} onChange={(e) => setCondicao(e.target.value)}>
                        <option value="igual a">Igual a</option>
                        <option value="menor">Menor que</option>
                        <option value="maior">Maior que</option>
                    </select>
                </p>

                <p>
                    Tipo de intervalo de tempo:
                    <select value={tipoTempo} onChange={(e)=> setTipoTempo(e.target.value)}>
                        <option value="Minuto">Minuto</option>
                        <option value="Hora">Hora</option>
                    </select>
                </p>
                <p>
                    Intervalo de tempo (horas/minutos):
                    <input type="number" value={tempo} onChange={(e)=>setTempo(Number(e.target.value))}></input>
                </p>
            </div>

            <div id="Action">
                <button onClick={monitorar}>
                    Monitorar
                </button>
            </div>
        </div>
    );
}
