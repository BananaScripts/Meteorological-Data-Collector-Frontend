import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { Alarme } from "../../../../types/alarme";
import { Parametro } from "../../../../types/parametro";

export default function EditAlarme() {
    const [id, setId] = useState('');
    const [codTipoParametro, setCodTipoParametro] = useState<number | string>('');
    const [tiposParametro, setTiposParametro] = useState<Array<Parametro>>([]);
    
    const [alarme, setAlarme] = useState<Alarme | null>(null);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [condicao, setCondicao] = useState('');

    const[encontrado, setEncontrado] = useState(true)

    // Carrega os tipos de parâmetros ao montar o componente
    useEffect(() => {
        axios.get('http://localhost:3002/api/tiposParametros')
            .then(response => {
                setTiposParametro(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar tipos de parâmetro:", error);
            });
    }, []);

    // Efeito para buscar um alarme específico
    useEffect(() => {
        if (id.trim()) {
            axios.get(`http://localhost:3002/api/alarme/${id}`)
                .then(response => {
                    console.log("Resposta da API:", response.data);
                    const alarmeData = response.data; 
                    if (alarmeData) {

                        setEncontrado(true)

                        const { nome, cod_tipoParametro, valor, condicao } = alarmeData; 
                        setAlarme(alarmeData);
                        setNome(nome);
                        setCodTipoParametro(cod_tipoParametro); // Certifique-se de que o servidor está enviando 'cod_tipoParametro'
                        setValor(valor);
                        setCondicao(condicao);
                    } else {
                        alert("Alarme não encontrado.");
                        resetForm();
                    }
                })
                .catch(error => {
                    console.error("Erro na requisição:", error);
                    setEncontrado(false);
                    resetForm();
                });
        } else {
            resetForm();
            setEncontrado(true);
        }
    }, [id]);

    function resetForm() {
        setAlarme(null);
        setNome('');
        setCodTipoParametro('');
        setValor('');
        setCondicao('');
    }

    function editar() {
        if (nome && codTipoParametro && valor && condicao) { 
            axios.put(`http://localhost:3002/api/alarme/atualizar/${id}`, {
                nome,
                valor,
                condicao,
                cod_tipoParametro: codTipoParametro // Este deve ser o nome correto
            })
            .then(() => {
                alert("Alarme editado com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao editar o alarme:", error.response); // Verifique a resposta de erro
                alert("Erro ao editar o alarme.");
            });
        } else {
            alert("Preencha os campos obrigatórios!");
        }
    }
    

    return (
        <div id="EditAlarme">
            <hr />
            <div id="Title_Section">
                <h3>Editar Alarme</h3>
                <p>*Informe o ID do alarme para editar</p>
            </div>
            <div id="Inputs_Camp">
                <p>
                    ID do Alarme:
                    <input type="text" value={id} onChange={(event) => setId(event.target.value)} placeholder="Digite o ID" />
                </p>

                
                {!encontrado && (
                    <p>*Parâmetro não encontrado</p>
                )}

                <hr />
                {alarme && (
                    <>
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
                    </>
                )}
            </div>
            <div id="Action">
                <button onClick={editar} disabled={!alarme}>
                    Editar
                </button>
            </div>
        </div>
    );
}
