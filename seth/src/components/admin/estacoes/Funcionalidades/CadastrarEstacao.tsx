import { useState } from "react"
import axios from "axios"
import "../../main.css";


export default function CreateEstacao() {

    const[nome, setNome] = useState('')
    const[macAdress, setMacAdress] = useState('')
    const[cidade, setCidade] = useState('')
    const[estado, setEstado] = useState('')
    const[numero, setNumero] = useState(0)
    const[cep, setCep] = useState('')

    function cadastrar(){
        console.clear()

        let cidadeDefault = cidade !== '' ? cidade : 'Não informado'
        let estadoDefault = estado !== '' ? estado : 'Não informado'
        let numeroDefault = numero === 0 ? numero : 0



        if(nome !== '' && macAdress !== '' && cep !== ''){
            axios.post('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/estacao/cadastrar', {nome, macAdress , cidade:cidadeDefault, estado:estadoDefault, numero:numeroDefault, cep: cep.toString() })
            .then(()=>{
                setNome('')
                setMacAdress('')
                setCidade('')
                setEstado('')
                setNumero(0)
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
                    Número (Apenas Números):
                    <input type="number" value={numero} onChange={(event)=>setNumero(parseInt(event.target.value))} />
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


