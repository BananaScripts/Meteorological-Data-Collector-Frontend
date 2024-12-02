import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { UnidadeMedida } from "../../../../types/parametro";
import { Estacao } from "../../../../types/estacao";

export default function CreateParametro() {
    const [cod_estacao, setCodEstacao] = useState<number | string>("");
    const [nome, setNome] = useState("");
    const [fator, setFator] = useState("");
    const [offset, setOffset] = useState(0);
    const [estacoes, setEstacoes] = useState<Array<Estacao>>([]);
    const [unidadeMedida, setUnidadeMedida] = useState("");

    useEffect(() => {
        axios.get("http://seth-backend-app-652283507250.southamerica-east1.run.app/api/estacoes")
            .then((response) => {
                setEstacoes(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar estações:", error);
            });
    }, []);

    function cadastrar() {
        console.clear();

        if (nome !== "" && fator !== "" && unidadeMedida !== "" && offset !== 0 && cod_estacao !== "") {
            axios.post("http://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametro/cadastrar", { 
                estacao: cod_estacao,  
                nome, 
                fator, 
                unidadeMedida, 
                offset 
            })
            .then(() => {
                setNome("");
                setFator("");
                setOffset(0);
                setUnidadeMedida("");
                setCodEstacao("");
                alert("Parâmetro Cadastrado com Sucesso!");
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao cadastrar o parâmetro.");
            });
        } else {
            alert("Preencha os campos obrigatórios!");
        }
    }

    return (
        <>
            <div id="CreateParametro">
                <hr />
                <div id="Title_Section">
                    <h3>Cadastrar Novo Parametro</h3>
                    <p>*Preencha os campos obrigatórios para poder finalizar o cadastro</p>
                </div>
                <div id="Inputs_Camp">
                    <p>
                        Nome: 
                        <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} placeholder="(*Obrigatório)" />
                    </p>
                    <p>
                        Fator:
                        <input type="text" value={fator} onChange={(event) => setFator(event.target.value)} placeholder="(*Obrigatório)" />
                    </p>
                    <p>
                        Unidade de Medida:
                        <select value={unidadeMedida} onChange={(e) => setUnidadeMedida(e.target.value as UnidadeMedida)}>
                            <option value="">Selecione um tipo</option>
                            {Object.values(UnidadeMedida).map((unidade) => (
                                <option key={unidade} value={unidade}>
                                    {unidade}
                                </option>
                            ))}
                        </select>
                    </p>
                    <p>
                        Offset (Coloque um número Positivo):
                        <input type="number" value={offset} onChange={(event) => setOffset(event.target.valueAsNumber)} />
                    </p>
                    <p>
                        Estação:
                        <select value={cod_estacao} onChange={(event) => setCodEstacao(event.target.value)}>
                            <option value="">Selecione uma estação</option>
                            {estacoes.map((estacao) => (
                                <option key={estacao.cod_estacao} value={estacao.cod_estacao}>
                                    {estacao.nome}
                                </option>
                            ))}
                        </select>
                    </p>
                </div>
                <div id="Action">
                    <button onClick={cadastrar}>Cadastrar</button>
                </div>
            </div>
        </>
    );
}
