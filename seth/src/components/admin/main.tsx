
import "./main.css"


import INTERFACE_CONTROLE_ALARMES from "./alarmes"; 
import INTERFACE_CONTROLE_ESTACOES from "./estacoes";
import INTERFACE_CONTROLE_USUARIOS from "./usuarios";
import INTERFACE_CONTROLE_PARAMETROS from "./tipoParametro";
import INTERFACE_CONFIGURAR_ALARMES from "./alarmes/Funcionalidades/ConfigurarAlarme";
/* import INTERFACE_DADOS_ESTACOES from "./dados"; */

import imagemEstacao from "../../assets/imgs/climate-change(1).png"
import INTERFACE_CONTROLE_PARAMETROSRELACIONADO from "./parametro";



export default function AdminComponent() {

  return (
    <>
      <div id="body_Admin_Page" className="bodyAdmin">
        
      <h1>Página do Administrador</h1>
          <div className="caixacinza" id="Colluns_Admin">


              <div id="Alarmes_Box" className="caixacinzaclaro">

                <INTERFACE_CONTROLE_ALARMES />

              </div>

              <div id="Image_Box" className="caixacinzaclaro">

                <INTERFACE_CONFIGURAR_ALARMES />

              </div>


          </div>

          <div className="caixacinza">
          
            <div id="Usuarios_Box" className="caixacinzaclaro">

              <INTERFACE_CONTROLE_USUARIOS />

            </div>
          </div>
          

          <div className="caixacinza" id="Colluns_Admin">

            <div id="Parametros_Box" className="caixacinzaclaro">

              <INTERFACE_CONTROLE_PARAMETROSRELACIONADO />

            </div>

            <div id="Image_Box" className="caixacinzaclaro">

              <img src={imagemEstacao} alt="Ultimos Uploads de Dados" />

            </div>


          </div>

          <div className="caixacinza">
            <div id="Usuarios_Box" className="caixacinzaclaro">

              <INTERFACE_CONTROLE_PARAMETROS />

            </div>
          </div>

          <br /><br />

          <div className="caixacinza">
          <div id="Estacoes_Box" className="caixacinzaclaro">

            <INTERFACE_CONTROLE_ESTACOES />

          </div><br />
          </div>
          
        
      </div>


    </>
  );
}