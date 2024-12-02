import { useState, useEffect } from "react";
import axios from "axios";
import { Alarme } from "../../../../types/alarme";
import { Parametro } from "../../../../types/parametro";
import "../../main.css";

export default function EditAlarme() {
    const [id, setId] = useState(0);
    const [codParametro, setCodParametro] = useState(0);
    const [parametro, setParametro] = useState<Array<Parametro>>([]);
    
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
    const [alarme, setAlarme] = useState<Alarme | null>(null);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [condicao, setCondicao] = useState('');

    const[encontrado, setEncontrado] = useState(true)

    const noerro = (alarme && id)
    console.log(noerro)

    // Carrega os tipos de parâmetros ao montar o componente
    useEffect(() => {

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/alarmes')
        .then(response => {
            setAlarmes(response.data);
            
        })
        .catch(error => {
            console.error("Erro ao buscar alarmes:", error);
        });

        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametros')
            .then(response => {
                setParametro(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar tipos de parâmetro:", error);
            });



            if (id) {
                
                setEncontrado(false)

                axios.get(`https://seth-backend-app-652283507250.southamerica-east1.run.app/api/alarme/buscar/${id}`)
                .then(response => {
                    setAlarme(response.data);
                    setNome(response.data.nome);
                    setCodParametro(response.data.cod_tipoParametro);
                    setValor(response.data.valor);
                    setCondicao(response.data.condicao);
                    setEncontrado(false);
                })
                .catch(error => {
                    console.error("Erro ao buscar alarme:", error);
                })
            }
            


    }, [id]);

    function resetForm() {
        setNome('');
        setCodParametro(0);
        setValor('');
        setCondicao('');
    }

    function editar() {
        if (codParametro !== 0 ) { 
            axios.put(`https://seth-backend-app-652283507250.southamerica-east1.run.app/api/alarme/atualizar/${id}`, {
                nome,
                valor,
                condicao,
                cod_tipoParametro: codParametro 

                
            })
            .then(() => {
                alert("Alarme editado com sucesso!");

                resetForm();
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
                    Selecione o Alarme que deve ser editado:
                    <select value={id} onChange={(e) => setId(Number(e.target.value))}>
                        <option value="">Selecione um alarme</option>
                        {alarmes.map((alarme) => (
                            <option key={alarme.cod_alarme} value={alarme.cod_alarme}>
                                {alarme.nome}
                            </option>
                        ))}
                    </select>
                    
                </p>

    

                <hr />
                {!encontrado && (
                    <>
                        <p>
                            Nome:
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                
                            />
                        </p>

                        <p>
                            Parâmetro:
                            <select
                                value={codParametro}
                                onChange={(e) => setCodParametro(Number(e.target.value))}
                            >
                                <option value="">Selecione um tipo</option>
                                {parametro.map((parametro) => (
                                    <option key={parametro.cod_tipoParametro} value={parametro.cod_tipoParametro}>
                                        {parametro.cod_tipoParametro}
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
                                
                            />
                        </p>

                        <p>
                            Condição:
                            <select value={condicao} onChange={(e) => setCondicao(e.target.value)}>
                                <option value="Igual a">Igual a</option>
                                <option value="Menor que">Menor que</option>
                                <option value="Maior que">Maior que</option>
                            </select>
                        </p>
                    </>
                )}
            </div>
            <div id="Action">
                <button onClick={editar} disabled={encontrado}>
                    Editar
                </button>
            </div>
        </div>
    );
}
