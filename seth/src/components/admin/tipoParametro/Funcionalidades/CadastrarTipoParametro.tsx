import { useState } from "react";
import axios from "axios";

import { UnidadeMedida } from "../../../../types/tipoParametro";
import "../../main.css";

export default function CreateParametro() {
    const [nome, setNome] = useState("");
    const [fator, setFator] = useState("");
    const [offset, setOffset] = useState("");
    const [unidadeMedida, setUnidadeMedida] = useState("");
    const [json, setJson] = useState("");

    function cadastrar() {
        console.clear();

        if (nome !== "" && fator !== "" && unidadeMedida !== "" && offset !== "" && json !== "") {
            axios.post("https://seth-backend-app-652283507250.southamerica-east1.run.app/api/tipoParametro/cadastrar", {  
                nome, 
                fator, 
                offset,
                unidadeMedida, 
                json
            })
            .then(() => {
                setNome("");
                setFator("");
                setOffset("");
                setUnidadeMedida("");
                setJson("");
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
                        <input type="number" value={fator} onChange={(event) => setFator(event.target.value)} placeholder="(*Obrigatório)" />
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
                        <input type="number" value={offset} onChange={(event) => setOffset(event.target.value)} />
                    </p>
                    <p>
                        Sigla (Para tratamento de dados):
                        <input type="text" value={json} onChange={(event) => setJson(event.target.value)} />
                    </p>
                    
                </div>
                <div id="Action">
                    <button onClick={cadastrar}>Cadastrar</button>
                </div>
            </div>
        </>
    );
}
