import { useEffect, useState } from "react"
import "./index.css"
import { Usuario } from "../../../types/usuario"
import axios from "axios"

export default function Interface_Controle_Usuarios() {

    const[usuarios, setUsuarios] = useState<Array<Usuario>>([])


    const[inAction, setInAction] = useState(false)

    useEffect(()=>{
      axios.get('http://localhost:3002/usuario/listar')
      .then((response)=>{
          setUsuarios(response.data)
      })
      .catch((error)=>{
          console.error(error)
      })
    }, [])

    function OnAction(x: boolean) {
        setInAction(x)
      }
    

    return(
        <>
            <div id="Box_Usuarios">

                <div id="Title_Box">
                    <h2> Controle dos Usuários </h2>

                    {! inAction && (<button onClick={() => OnAction(true)}>Cadastar Usuários</button>)}
                    {  inAction && (<button onClick={() => OnAction(false)}>Cancelar</button>)}
                </div>


            {! inAction && (

            <div id="Scroll_Table">
                
            <table>

              <thead>

                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Cpf</th>
                  <th>Senha</th>
                  <th>Data de Nascimento</th>
                  <th>--------</th>
                  <th>--------</th>
                </tr>

              </thead>
              <tbody>
                    {usuarios.map((usuario)=>(
                                <tr key={usuario.cod_usuario}>
                                    <td>{usuario.cod_usuario}</td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.cpf}</td>
                                    <td>{usuario.senha}</td>
                                    <td>{new Date(usuario.dataNascimento).toLocaleDateString()}</td>

                                    <td>Editar</td>
                                    <td>Deletar</td>    
                                </tr>
                            ))}
                        </tbody>


            </table>

            </div>

            )}

            { inAction && (
              <>

                Cadastro de Usuarios
              </>
            )}


            </div>
        </>
    )
}