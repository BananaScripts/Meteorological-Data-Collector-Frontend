import { useEffect, useState } from "react"
import "./index.css"
import { Usuario } from "../../../types/usuario"
import axios from "axios"
import Funcionalidades from "./Funcionalidades"

export default function INTERFACE_CONTROLE_USUARIOS() {

    const[usuarios, setUsuarios] = useState<Array<Usuario>>([])
    const [actionType, setActionType] = useState<number | null>(null);

    const atualizarUsuarios = () => {
      axios.get('http://localhost:3002/api/usuarios')
          .then((response) => {
              setUsuarios(response.data); 
          })
          .catch((error) => {
              console.error(error);
          });
  };

  useEffect(() => {
      atualizarUsuarios(); 
  }, []);

  
  const handleAction = (type: number | null) => {
    setActionType(type);

    atualizarUsuarios()
  };

    

    return(
        <>

          <div id="Box_Estacoes">


            <div id="Title_Box">

              <h2> Controle de Usuários </h2>

                {actionType === null && (
                  <button onClick={() => handleAction(2)}>Editar</button>
                )}                   

                {actionType === null && (    
                  <button onClick={() => handleAction(3)}>Deletar</button>
                )}            

                {actionType === null && (
                  <button onClick={() => handleAction(1)}>Cadastrar Usuário</button>
                )}

                {actionType !== null && (
                  <button onClick={() => handleAction(null)}>Cancelar</button>
                )}


            </div>


            {actionType == null && (

            <div id="Scroll_Table">

              <hr />
                
            <table>

              <thead>

                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Cpf</th>
                  <th>Senha</th>
                  <th>Data de Nascimento</th>
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
  
                                </tr>
                            ))}
                        </tbody>


            </table>

            </div>

            )}

                {actionType === 1 && <Funcionalidades.CreateUsuario/>}
                {actionType === 2 && <Funcionalidades.EditUsuario/>}
                {actionType === 3 && <Funcionalidades.DeleteUsuario />}


            </div>
        </>
    )
}