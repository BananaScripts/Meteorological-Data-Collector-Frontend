import { useState, useEffect } from "react";
import axios from "axios";
import { Parametro } from "../../../../types/parametro";

export default function CreateAlarme() {
    const [nome, setNome] = useState('');
    const [codTipoParametro, setCodTipoParametro] = useState<number | string>('');
    const [valor, setValor] = useState<number | string>('');
    const [condicao, setCondicao] = useState('igual a');

    const [tiposParametro, setTiposParametro] = useState<Array<Parametro>>([]);

    useEffect(() => {
        axios.get('http://localhost:3002/tipoParametro/listar')
            .then(response => {
                setTiposParametro(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar tipos de parâmetro:", error);
            });
    }, []);

    const cadastrar = () => {
        if (!nome || !codTipoParametro || !valor) {
            alert("Por favor, preencha os campos obrigatórios!");
            return;
        }

        const codTipoParametroNum = Number(codTipoParametro);
        const valorNum = Number(valor);

        if (isNaN(codTipoParametroNum) || isNaN(valorNum)) {
            alert("Código do Tipo de Parâmetro ou Valor inválido!");
            return;
        }

        axios.post('http://localhost:3002/alarme/cadastrar', {
            nome,
            cod_tipoParametro: codTipoParametroNum,  
            valor: valorNum, 
            condicao
        })
        .then(() => {
            setNome('');
            setCodTipoParametro('');
            setValor('');
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
                <h3>Cadastrar Novo Alarme</h3>
                <p>*Preencha os campos obrigatórios para poder finalizar o cadastro</p>
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
                    Parâmetro:
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
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="(*Obrigatório)"
                    />
                </p>

                <p>
                    Condição:
                    <select value={condicao} onChange={(e) => setCondicao(e.target.value)}>
                        <option value="igual a">Igual a</option>
                        <option value="menor que">Menor que</option>
                        <option value="maior que">Maior que</option>
                        <option value="diferente">Diferente</option>
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
