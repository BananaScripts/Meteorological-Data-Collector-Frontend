import { useState } from "react"
import axios from "axios"
import "./index.css"

import { Parametro, UnidadeMedida } from "../../../../types/parametro"

export default function CreateParametro() {

    const[estacoes, setEstacoes] = useState<Array<Parametro>>([])
    const[nome, setNome] = useState('')
    const[fator, setFator] = useState('')
    const[offset, setOffset] = useState(Number)
    const[unidadeMedida, setUnidadeMedida] = useState('')

    function cadastrar(){
        console.clear()


        if(nome !== '' && fator !== '' && unidadeMedida !== '' && offset !== 0){
            axios.post('http://localhost:3002/tipoParametro/cadastrar', {nome, fator, offset, unidadeMedida})
            .then(()=>{
                setNome('')
                setFator('')
                setOffset(0)
                setUnidadeMedida('')
                alert("Parametro Cadastrada com Sucesso!")
            })
            .catch((error)=>{
                console.error(error)
            })
        }
        else{
            alert("Preencha os campos obrigatórios!")
        }
    }

    return(
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
                    <input type="text" value={nome} onChange={(event)=>setNome(event.target.value)} placeholder="(*Obrigatório)" />
                </p>

                <p>
                    Fator:
                    <input type="text" value={fator} onChange={(event)=>setFator(event.target.value)} placeholder="(*Obrigatório)"  />
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
                    Offset:
                    <input type="number" value={offset} onChange={(event)=>setOffset(event.target.valueAsNumber)} />
                </p>

            </div>
        
            <div id="Action">

                <button onClick={cadastrar}>
                    Cadastrar
                </button>

            </div>
        
        </div>
        </>
    )
}


