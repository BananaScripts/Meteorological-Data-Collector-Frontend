import { useState } from "react"
import axios from "axios"
import "./index.css"

import { Estacao } from "../../../../types/estacao"

export default function CreateEstacao() {

    const[estacoes, setEstacoes] = useState<Array<Estacao>>([])
    const[nome, setNome] = useState('')
    const[macAdress, setMacAdress] = useState('')
    const[cidade, setCidade] = useState('')
    const[estado, setEstado] = useState('')
    const[numero, setNumero] = useState('')
    const[cep, setCep] = useState('')

    function cadastrar(){
        console.clear()

        let cidadeDefault = cidade !== '' ? cidade : 'Não informado'
        let estadoDefault = estado !== '' ? estado : 'Não informado'
        let numeroDefault = numero !== '' ? numero : 'Não informado'


        if(nome !== '' && macAdress !== '' && cep !== ''){
            axios.post('http://localhost:3002/estacao/cadastrar', {nome, macAdress , cidade:cidadeDefault, estado:estadoDefault, numero:numeroDefault, cep})
            .then(()=>{
                setNome('')
                setMacAdress('')
                setCidade('')
                setEstado('')
                setNumero('')
                setCep('')
                alert("Estação Cadastrada com Sucesso!")
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
        <div id="CreateEstacao">

            <hr />
        
            <div id="Title_Section">

                <h3>Cadastrar Nova Estação</h3>

                <p>*Preencha os campos obrigatórios para poder finalizar o cadastro</p>

            </div>

            <div id="Inputs_Camp">

                <p>
                    Nome: 
                    <input type="text" value={nome} onChange={(event)=>setNome(event.target.value)} placeholder="(*Obrigatótrio)" />
                </p>

                <p>
                    MacAdress:
                    <input type="text" value={macAdress} onChange={(event)=>setMacAdress(event.target.value)} placeholder="(*Obrigatótrio)"  />
                </p>

                <br />
                <b>Localização</b>

                <p>
                    Cidade:
                    <input type="text" value={cidade} onChange={(event)=>setCidade(event.target.value)} />
                </p>

                <p>
                    Estado:
                    <input type="text" value={estado} onChange={(event)=>setEstado(event.target.value)} />
                </p>

                <p>
                    Número:
                    <input type="text" value={numero} onChange={(event)=>setNumero(event.target.value)} />
                </p>

                <p>
                    CEP (Apenas Números):
                    <input type="number" maxLength={12} value={cep} onChange={(event)=>setCep(event.target.value)} placeholder="(*Obrigatótrio)" />
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


