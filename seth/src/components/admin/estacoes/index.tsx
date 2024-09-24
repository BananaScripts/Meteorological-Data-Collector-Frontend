import { useEffect, useState } from "react"
import "./index.css"
import { Estacao } from "../../../types/estacao"
import axios from "axios"

export default function Interface_Controle_Estacoes() {

    const[estacoes, setEstacoes] = useState<Array<Estacao>>([])
    const[id, setId] = useState('')
    const[macAdress, setMacAdress] = useState('')
    const[nome, setNome] = useState('')
    const[cidade, setCidade] = useState('')
    const[estado, setEstado] = useState('')
    const[numero, setNumero] = useState('')
    const[cep, setCep] = useState('')

    const [editando, setEditando] = useState(false)

    useEffect(()=>{
      axios.get('http://localhost:3002/estacao/listar')
      .then((response)=>{
          setEstacoes(response.data)
      })
      .catch((error)=>{
          console.error(error)
      })
    }, [])

    return (
        <>
            <div id="Box_Estacoes">

                <div id="Title_Box">
                    <h2> Controle de Estações Metereológicas </h2>

                    <button>Cadastar Estação</button>
                </div>

                <hr />

            <div id="Scroll_Table">

            <table>

              <thead>

                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Mac Adress</th>
                  <th>Número</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>Cep</th>
                  <th>--------</th>
                  <th>--------</th>
                </tr>

              </thead>
              <tbody>
                    {estacoes.map((estacao)=>(
                                <tr key={estacao.cod_estacao}>
                                    <td>{estacao.cod_estacao}</td>
                                    <td>{estacao.nome}</td>
                                    <td>{estacao.macAdress}</td>
                                    <td>{estacao.numero}</td>
                                    <td>{estacao.cidade}</td>
                                    <td>{estacao.estado}</td>
                                    <td>{estacao.cep}</td>
                                    <td>Editar</td>
                                    <td>Deletar</td>    
                                </tr>
                            ))}
                        </tbody>


            </table>

            </div>

            </div>
        </>
    )
}