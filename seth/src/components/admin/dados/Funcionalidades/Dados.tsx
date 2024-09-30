import axios from "axios";
import { useEffect, useState } from "react";
import { Dados } from "../../../../types/dados";
import { Parametro } from "../../../../types/parametro";
import { Estacao } from "../../../../types/estacao";
import './index.css'

export default function EnviarDados() {
    const [dados, setDados] = useState<Array<Dados>>([]);
    const [cod_estacao, setCodEstacao] = useState<number | string>('');
    const [cod_tipoParametro, setCodTipoParametro] = useState<number | string>('');
    const [valor, setValor] = useState(0);
    const [tiposParametro, setTiposParametro] = useState<Array<Parametro>>([]);
    const [estacao, setEstacao] = useState<Array<Estacao>>([]);

    const currentDate = new Date();
    const data = currentDate.toISOString().split('T')[0];
    const hora = currentDate.toTimeString().split(' ')[0];


    useEffect(() => {
        axios.get('http://localhost:3002/tipoParametro/listar')
            .then(response => {
                setTiposParametro(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar tipos de parâmetro:", error);
            });
        axios.get('http://localhost:3002/estacao/listar')
            .then(response => {
                setEstacao(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar tipos de parâmetro:", error);
            });
        axios.get('http://localhost:3002/estacao/listarDados')
            .then(response => {
                setDados(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
        
    }, []);

    function enviarDados() {
        const currentDate = new Date();
        const data = currentDate.toISOString().split('T')[0];
        const hora = currentDate.toTimeString().split(' ')[0];

        if (cod_estacao && cod_tipoParametro && valor) {
            axios.post('http://localhost:3002/estacao/dados', {cod_estacao,cod_tipoParametro,data,hora,valor
            })
            .then(() => {
                alert("Dados enviados com sucesso!");
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao enviar os dados.");
            });
        } else {
            alert("Preencha todos os campos obrigatórios!");
        }
    }


    return (
        <div id="Box_Estacoes">
            <div id="Title_Section">
                <h3>Enviar Dados</h3>
            </div>
            <div id="Inputs_Camp">
                <p>
                    Estação:
                    <select
                        value={cod_estacao}
                        onChange={(e) => setCodEstacao(e.target.value)}
                    >
                        <option value="">Selecione uma Estação</option>
                        {estacao.map((estacao) => (
                            <option key={estacao.cod_estacao} value={estacao.cod_estacao}>
                                {estacao.nome}
                            </option>
                        ))}

                    </select>
                </p>
                <p>
                    Tipo de Parâmetro:
                    <select
                        value={cod_tipoParametro}
                        onChange={(e) => setCodTipoParametro(e.target.value)}
                    >
                        <option value="">Selecione um tipo</option>
                        {tiposParametro.map((tipoParametro) => (
                            <option key={tipoParametro.cod_tipoParametro} value={tipoParametro.cod_tipoParametro}>
                                {tipoParametro.nome}
                            </option>
                        ))}
                    </select>
                </p>
                <p>
                    Valor:
                    <input type="number" value={valor} onChange={(e) => setValor(Number(e.target.value))} placeholder="Valor" />
                </p>
                <button className="botaoEnvio" onClick={enviarDados}>Enviar Dados</button>
            </div>

            <h3>Dados Registrados</h3>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Valor</th>
                        <th>Estação</th>
                        <th>Tipo de Parâmetro</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((dado) => {
                        const estacaoNome = estacao.find(est => est.cod_estacao === dado.cod_estacao)?.nome || 'Desconhecida';
                        const parametroNome = tiposParametro.find(tipo => tipo.cod_tipoParametro === dado.cod_tipoParametro)?.nome || 'Desconhecido';
                        return (
                            <tr key={dado.cod_dados}>
                                <td>{dado.data}</td>
                                <td>{dado.hora}</td>
                                <td>{dado.valor}</td>
                                <td>{estacaoNome}</td>
                                <td>{parametroNome}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>



        </div>
    );
}
